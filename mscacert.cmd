@echo off
REM MSCACERT.CMD BRIAN HOWSON 2015
REM Script to generate MSCACERT.PEM suitable for openssl/curl/etc from MS CTL
REM   to test if MS Edge/IE/Chrome on Windows Trust a website
REM   1. use certutil to sync all CRT files
REM      Must be run on Windows computer with direct access to internet.
REM      certutil.exe doesn't work for proxies.  Be on internet to allow access
REM      to all OCSP/CRL servers!
REM   2. Verify them to make sure each is valid
REM      Is a CA Certificate
REM      For server authentication(includes all) - 1.3.6.1.5.5.7.3.1
REM      Not Expired / revoked
REM   3. encode to base64/PEM format
REM   4. Append to mscacert.pem
REM
REM   Requires direct internet access (non-proxied) to Microsoft.
REM   Files are retrieved over plaintext (http), but then locally verified

for /f "tokens=2,3,4 delims=/ " %%a in ('date/t') do set mydt=%%c%%a%%b
REM set basedir=%temp%\WU_%MYDT%
set basedir=.\WU_%MYDT%
set target=%~dpn0.PEM

if not exist %windir%\system32\certutil.exe (
    Echo %windir%\system32\certutil.exe not found, is required!
    goto :eof
)

if not exist %basedir% md %basedir%
if exist %basedir%\authrootstl.cab goto makeca

%windir%\system32\certutil.exe -syncwithWu %basedir%

:makeca
   if exist %~dpn0.PEM del %~dpn0.PEM
   for /f %%i in ('dir /b /s %basedir%\*.crt') do (
     call :check1 "%%i"
   )
   Echo Successfully made %target%
   Echo Use it wisely.
goto :eof

:check1
  certutil -verify %1 1.3.6.1.5.5.7.3.1 > %basedir%\%~n1.out

  find "Cert is a CA certificate" %basedir%\%~n1.out
  if errorlevel 1 echo Warning %~n1 not CA Cert >> %~dpn0.err
REM this is commented out.  x.509 v1 certs don't say they're CA
REM   if errorlevel 1 goto :eof 

  find "The certificate is not valid for the requested usage." %basedir%\%~n1.out
  if errorlevel 1 (
     find "CERT_TRUST_IS_NOT_" %basedir%\%~n1.out
     if errorlevel 1 ( 
        copy %basedir%\%~n1.out %basedir%\%~n1.good
        del %basedir%\%~n1.out
        if exist "%~dpn1.pem" del "%~dpn1.pem"
        certutil -encode %1 "%~dpn1.pem"
        type "%~dpn1.pem" >> %target%
     )
  )
goto :eof
