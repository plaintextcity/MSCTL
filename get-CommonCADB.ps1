<#
.SYNOPSIS
    get-CommonCADB.ps1
.DESCRIPTION
    Get Common CA DB from Mozilla
.EXAMPLE
    PS C:\> get-commonCADB.ps1
    downloads CSV file and parses for reasons
.INPUTS
    Inputs (if any)
.OUTPUTS
    Output to JSON formatted sets.js
.NOTES
    https://ccadb.org/resources
    http://ccadb-public.secure.force.com/mozilla/AllCertificateRecordsCSVFormat

    Not in CADB:
    Swisscom (Switzerland) Ltd \ "Swisscom Root CA 2" 
    test-emerald-ca-2.pre.swissdigicert.ch - expired


#>

#function Verb-Noun {
    [CmdletBinding()]
    param (
        [switch]$Progress,
        [switch]$Mozilla,
        [switch]$Microsoft,
        [switch]$Google
    )
    
    begin {
        $ElapsedTime = [System.Diagnostics.Stopwatch]::StartNew()
        $CurrentSSL = [System.Net.ServicePointManager]::SecurityProtocol
        [System.Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        $ProgressSaved = $global:ProgressPreference
        if (-not $Progress) {
            $global:progressPreference = 'silentlyContinue'
        }
    
        $allcerts = "http://ccadb-public.secure.force.com/mozilla/AllCertificateRecordsCSVFormat"
        $googleroots = "https://pki.google.com/roots.pem"
        [System.Collections.ArrayList]$Keys = @()
    }
    
    process {
        Invoke-WebRequest -Uri $googleroots -OutFile "googleroots.pem"
        $googleRoots = (get-content .\googleroots.pem | select-string -pattern "SHA256 FINGERPRINT" ) -split " " | where-object {$_.length -gt 20} | foreach-object{$_ -replace ":",""}

        Invoke-WebRequest -Uri $allcerts -OutFile "AllCertificateRecords.csv"
        $rootcerts = import-csv -path "AllCertificateRecords.csv" | where-object { `
            $_."Certificate Record Type" -eq "Root Certificate" `
            -and (($_."Mozilla Status" -eq "Included" -and $Mozilla) `
              -or ($_."Microsoft Status" -like "Included*" -and $Microsoft))  }
   
        $rootcerts | select-object -property "CA Owner" -unique | foreach-object {
            $caowner = $_."CA Owner"
            [System.Collections.ArrayList]$subdomains = @()
            $rootcerts | where-object {$_."CA Owner" -eq $caowner} | foreach-object {
                $catrust = ""
                $certsha256 = $_."SHA-256 Fingerprint"
                $certname = $_."Certificate Name"              
                $validURL = $_."Test Website URL - Valid"

                if ($_."Microsoft Status" -like "Included*" -and $Microsoft) {
                    $catrust += "MS"
                }
                if ($_."Mozilla Status" -like "Included*" -and $Mozilla) {
                    $catrust += "Moz"
                } 
                if ($certsha256 -in $googleRoots -and $Google) {
                    $catrust += "Goog"
                }

                $validURL = $validURL -Replace "https://", ""   
                $subdomain = [PSCustomObject]@{
                    subdomain = "$certname ($catrust)`:$validURL"
                }
                $null = $subdomains.Add($subdomain)
            }
            $rootcert = [PSCustomObject]@{
                heading = "$caowner"
                success = "yes"
                fail = "no"
                subdomains = $subdomains
            }
            $null = $Keys.Add($rootcert)
        }

        "var sets = " > "sets.js"
        # could use -compress  but makes changes opaque
        $Keys | ConvertTo-Json -depth 3 >> "sets.js"

    }
    
    end {
        [System.Net.ServicePointManager]::SecurityProtocol = $CurrentSSL
        $global:ProgressPreference = $ProgressSaved
        write-verbose "Elapsed Time: $($ElapsedTime.Elapsed.ToString())"
        write-host "Elapsed Time: $($ElapsedTime.Elapsed.ToString())"   
    }
#}
