
var sets = [
  {
    heading: "Amazon Trust Services",
    success: "yes",
    fail: "no",
    subdomains: [
      {subdomain: "Amazon Root CA 1:good.sca1a.amazontrust.com"},
      {subdomain: "Amazon Root CA 2:good.sca2a.amazontrust.com"},
      {subdomain: "Amazon Root CA 3:good.sca3a.amazontrust.com"},
      {subdomain: "Amazon Root CA 4:good.sca4a.amazontrust.com"},
      {subdomain: "Starfield Services Root Certificate Authority:good.sca0a.amazontrust.com"}
      
    ]
  },
  {
    heading: "Google Trust Services",
    success: "yes",
    fail: "no",
      subdomains: [
      {subdomain: "GTS Root R1:good.r1demo.pki.goog"},
      {subdomain: "GTS Root R2:good.r2demo.pki.goog"},
      {subdomain: "GTS Root R3:good.r3demo.pki.goog"},
      {subdomain: "GTS Root R4:good.r4demo.pki.goog"},
      {subdomain: "GS Root R2:2021.globalsign.com"},
      {subdomain: "GS Root R4:2038r4.globalsign.com"},
      {subdomain: "Google Internet Authority G2:cert-test.sandbox.google.com"}        
    ]
  },
  {
    heading: "Comodo",
    success: "yes",
    fail: "no",
      subdomains: [
{subdomain: "Comodo AAA Services root:aaacertificateservices.comodoca.com"},
//{subdomain: "AddTrust Low-Value Services Root:AddTrust Low-Value Services Root"},
{subdomain: "AddTrust External Root:addtrustexternalcaroot-ev.comodoca.com"},
//{subdomain: "AddTrust Public Services Root:AddTrust Public Services Root"},
//{subdomain: "AddTrust Qualified Certificates Root:AddTrust Qualified Certificates Root"},
//{subdomain: "COMODO Certification Authority:COMODO Certification Authority"},
{subdomain: "COMODO ECC Certification Authority:comodoecccertificationauthority-ev.comodoca.com"},
{subdomain: "COMODO RSA Certification Authority:comodorsacertificationauthority-ev.comodoca.com"},
//{subdomain: "Comodo Secure Services root:Comodo Secure Services root"},
//{subdomain: "Comodo Trusted Services root:Comodo Trusted Services root"},
{subdomain: "USERTrust ECC Certification Authority:usertrustecccertificationauthority-ev.comodoca.com"}//,
//{subdomain: "USERTrust RSA Certification Authority:USERTrust RSA Certification Authority"},
//{subdomain: "UTN USERFirst Hardware Root CA:utnuserfirsthardware-ev.comodoca.com"}
    ]
  },

  {
    heading: "DigiCert",
    success: "yes",
    fail: "no",
      subdomains: [
{subdomain: "Baltimore CyberTrust Root:baltimore.omniroot.com"},
{subdomain: "Cybertrust Global Root:ev.omniroot.com"},
{subdomain: "DigiCert Assured ID Root CA:assured-id-root.digicert.com/testroot"},
{subdomain: "DigiCert Assured ID Root G2:assured-id-root-g2.digicert.com"},
{subdomain: "DigiCert Assured ID Root G3:assured-id-root-g3.digicert.com"},
{subdomain: "DigiCert Global Root CA:global-root.digicert.com/testroot"},
{subdomain: "DigiCert Global Root G2:global-root-g2.digicert.com"},
{subdomain: "DigiCert Global Root G3:global-root-g3.digicert.com"},
{subdomain: "DigiCert High Assurance EV Root CA:ev-root.digicert.com/testroot"},
{subdomain: "DigiCert Trusted Root G4:trusted-root-g4.digicert.com"}
    ]
  },
  {
    heading: "Entrust Datacard (including Affirmtrust brand)",
    success: "yes",
    fail: "no",
      subdomains: [
{subdomain: "Entrust Root Certification Authority:validev.entrust.net"},
{subdomain: "Entrust.net Premium 2048 Secure Server CA:2048test.entrust.net"},
{subdomain: "Entrust Root Certificate Authority—G2:validg2.entrust.net"},
{subdomain: "Entrust Root Certificate Authority—EC1:validec.entrust.net"},
{subdomain: "AffirmTrust Commercial:commercial.affirmtrust.com"},
{subdomain: "AffirmTrust Networking:networking.affirmtrust.com:4431"},
{subdomain: "AffirmTrust Premium:premium.affirmtrust.com:4432"},
{subdomain: "AffirmTrust Premium ECC:premiumecc.affirmtrust.com:4433"}
    ]
  },
  {
    heading: "GlobalSign",
    success: "yes",
    fail: "no",
      subdomains: [
{subdomain: "GlobalSign Root CA - R1:r1.globalsign.com"},
{subdomain: "GlobalSign Root CA - R2:2021.globalsign.com"},
{subdomain: "GlobalSign Root CA - R3:2029.globalsign.com"},
//{subdomain: "GlobalSign ECC Root CA - R4:2038r4.globalsign.com"},
{subdomain: "GlobalSign ECC Root CA - R5:2038r5.globalsign.com"}
//{subdomain: "GlobalSign Root CA - R6:CABFBaselineRequirementSection2.2ValidURL"},
//{subdomain: "GlobalSign Root CA - R8:CABFBaselineRequirementSection2.2ValidURL"},

    ]
  },
  {
    heading: "Go Daddy",
    success: "yes",
    fail: "no",
      subdomains: [
{subdomain: "Go Daddy Root Certificate Authority - G2:valid.gdig2.catest.godaddy.com"},
{subdomain: "Starfield Root Certificate Authority - G2:valid.sfig2.catest.starfieldtech.com"},
{subdomain: "Starfield Class 2 CA:valid.sfi.catest.starfieldtech.com"},
{subdomain: "Go Daddy Class 2 CA:valid.gdi.catest.godaddy.com"}
    ]
  },

  {
    heading: "Let's Encrypt",
    success: "yes",
    fail: "no",
      subdomains: [
{subdomain: "ISRG Root X1:valid-isrgrootx1.letsencrypt.org/"}
    ]
  },
  {
    heading: "Symantec",
    success: "yes",
    fail: "no",
      subdomains: [
{subdomain: "Equifax Secure CA:ssltest15.bbtest.net"},
{subdomain: "GeoTrust Global CA:ssltest14.bbtest.net"},
{subdomain: "GeoTrust Global CA 2:ssltest19.bbtest.net"},
{subdomain: "GeoTrust Primary Certification Authority:ssltest22.bbtest.net"},
{subdomain: "GeoTrust Primary Certification Authority - G2:ssltest42.ssl.symclab.com"},
{subdomain: "GeoTrust Primary Certification Authority - G3:ssltest21.bbtest.net"},
{subdomain: "GeoTrust Universal CA:ssltest20.bbtest.net"},
{subdomain: "GeoTrust Universal CA 2:ssltest34.bbtest.net"},
{subdomain: "thawte Primary Root CA:ssltest6.bbtest.net"},
{subdomain: "thawte Primary Root CA - G2:ssltest40.ssl.symclab.com"},
{subdomain: "thawte Primary Root CA - G3:ssltest8.bbtest.net"},
{subdomain: "Verisign Class 3 Public Primary Certification Authority - G3:ssltest3.bbtest.net"},
{subdomain: "VeriSign Class 3 Public Primary Certification Authority - G4:ssltest48.ssl.symclab.com"},
{subdomain: "VeriSign Class 3 Public Primary Certification Authority - G5:ssltest1.bbtest.net"},
{subdomain: "VeriSign Universal Root Certification Authority:ssltest26.bbtest.net"}
    ]
  },
  {
    heading: "Trustwave",
    success: "yes",
    fail: "no",
      subdomains: [
{subdomain: "Trustwave:sgcatest.trustwave.com"},
{subdomain: "Trustwave:stcatest.trustwave.com"},
{subdomain: "Trustwave:xgcatest.trustwave.com"}
    ]
  }

  //,
//  {
//    heading: "AffirmTrust (Entrust DataCard)",
//    success: "yes",
//    fail: "no",
//      subdomains: [
//{subdomain: "AffirmTrust Commercial:commercial.affirmtrust.com"},
//{subdomain: "AffirmTrust Networking:networking.affirmtrust.com:4431"},
//{subdomain: "AffirmTrust Premium:premium.affirmtrust.com:4432"},
//{subdomain: "AffirmTrust Premium ECC:premiumecc.affirmtrust.com:4433"}
//    ]
//  } 

/*,
  {
    heading: "Bad Sites",
    success: "yes",
    fail: "no",
      subdomains: [
{subdomain: "BenjaminMoore:benjaminmoore.com"}
    ]
  }
*/

];
