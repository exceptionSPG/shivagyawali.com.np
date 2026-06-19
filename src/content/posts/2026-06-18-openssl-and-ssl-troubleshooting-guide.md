---
template: blog-post
title: OpenSSL and SSL troubleshooting guide
slug: /blog/troubleshooting-ssl-guide
date: 2026-06-18 22:58
description: ssl, ssl certificate, openssl
---
# OpenSSL & SSL Complete Commands Reference

- - -

## SECTION 1: CERTIFICATE INSPECTION COMMANDS

### View Certificate Details

```bash
# View certificate details (human-readable)
openssl x509 -in certificate.crt -text -noout

# View certificate details with more info
openssl x509 -in certificate.crt -text -noout -issuer -subject -dates

# View certificate fingerprint
openssl x509 -in certificate.crt -fingerprint -noout

# View certificate SHA256 fingerprint
openssl x509 -in certificate.crt -fingerprint -sha256 -noout

# View certificate serial number
openssl x509 -in certificate.crt -serial -noout

# View certificate validity dates only
openssl x509 -in certificate.crt -startdate -enddate -noout

# View certificate modulus (for matching with private key)
openssl x509 -in certificate.crt -modulus -noout

# View certificate subject alternative names (SANs)
openssl x509 -in certificate.crt -ext subjectAltName -noout

# View certificate purpose/usage
openssl x509 -in certificate.crt -purpose -noout

# View certificate public key
openssl x509 -in certificate.crt -pubkey -noout
```

### View Private Key Details

```bash
# View private key details (unencrypted)
openssl rsa -in private.key -text -noout

# View private key modulus (to match with certificate)
openssl rsa -in private.key -modulus -noout

# View private key with encrypted password
openssl rsa -in private.key -text -noout -passin pass:yourpassword

# View EC private key
openssl ec -in private.key -text -noout

# Check if private key is encrypted
openssl rsa -in private.key -check -noout
```

### View CSR Details

```bash
# View certificate signing request details
openssl req -in request.csr -text -noout

# View CSR subject
openssl req -in request.csr -subject -noout

# View CSR verification
openssl req -in request.csr -verify -noout

# View CSR public key
openssl req -in request.csr -pubkey -noout
```

- - -

## SECTION 2: CERTIFICATE VALIDATION COMMANDS

### Verify Certificate Chain

```bash
# Verify certificate against CA
openssl verify -CAfile ca.crt certificate.crt

# Verify certificate chain (with intermediate)
openssl verify -CAfile root-ca.crt -untrusted intermediate.crt server.crt

# Verify full chain from a bundle file
openssl verify -CAfile root-ca.crt -untrusted bundle.pem server.crt

# Verify certificate with CRL (Certificate Revocation List)
openssl verify -CAfile ca.crt -CRLfile crl.pem certificate.crt

# Verify certificate chain with all details
openssl verify -verbose -CAfile ca.crt certificate.crt
```

### Check Certificate Chain in a Bundle

```bash
# Check if all certificates in bundle are in proper order
openssl crl2pkcs7 -nocrl -certfile bundle.pem | openssl pkcs7 -print_certs -noout

# Count certificates in a bundle
openssl crl2pkcs7 -nocrl -certfile bundle.pem | openssl pkcs7 -print_certs -noout | grep -c "subject"

# Extract server certificate from bundle
openssl x509 -in bundle.pem -out server.crt

# Extract intermediate certificates from bundle
openssl crl2pkcs7 -nocrl -certfile bundle.pem | openssl pkcs7 -print_certs -noout

# Check certificate chain order (server cert must be first)
openssl crl2pkcs7 -nocrl -certfile bundle.pem | openssl pkcs7 -print_certs -noout | grep "subject\|issuer"
```

### Match Private Key with Certificate

```bash
# Compare modulus (should match)
openssl x509 -in certificate.crt -modulus -noout | openssl md5
openssl rsa -in private.key -modulus -noout | openssl md5

# Compare EC keys
openssl x509 -in certificate.crt -pubkey -noout | openssl md5
openssl ec -in private.key -pubout -outform pem | openssl md5
```

- - -

## SECTION 3: SSL/TLS CONNECTION TESTING

### Basic Connection Testing

```bash
# Basic connection test
openssl s_client -connect example.com:443

# Show certificate chain
openssl s_client -connect example.com:443 -showcerts

# Show all certificates in the chain (clean output)
openssl s_client -connect example.com:443 -showcerts </dev/null

# Test with specific TLS version
openssl s_client -connect example.com:443 -tls1_3
openssl s_client -connect example.com:443 -tls1_2
openssl s_client -connect example.com:443 -tls1_1
openssl s_client -connect example.com:443 -tls1

# Test with specific cipher
openssl s_client -connect example.com:443 -cipher ECDHE-RSA-AES256-GCM-SHA384

# Test with SNI (Server Name Indication)
openssl s_client -connect example.com:443 -servername example.com

# Test with certificate verification
openssl s_client -connect example.com:443 -CAfile ca.crt -verify_return_error

# Test connection and save server certificate
openssl s_client -connect example.com:443 -showcerts </dev/null | openssl x509 -out server-cert.crt

# Download entire certificate chain
openssl s_client -connect example.com:443 -showcerts </dev/null | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > chain.pem
```

### Advanced Connection Testing

```bash
# Check SSL/TLS version support
openssl s_client -connect example.com:443 -tls1_3 </dev/null 2>&1 | grep "Protocol"
openssl s_client -connect example.com:443 -tls1_2 </dev/null 2>&1 | grep "Protocol"

# Check supported ciphers
openssl s_client -connect example.com:443 -cipher 'ALL:!LOW:!EXP:!aNULL' 2>&1 | grep -E "Cipher|Protocol"

# Check certificate chain with full output
openssl s_client -connect example.com:443 -showcerts -debug </dev/null

# Check certificate revocation status with OCSP
openssl s_client -connect example.com:443 -status -ocsp -CAfile ca.crt

# Test with HTTP/2 ALPN
openssl s_client -connect example.com:443 -alpn h2

# Test with specific CA bundle
openssl s_client -connect example.com:443 -CAfile /etc/ssl/certs/ca-certificates.crt

# Test with starttls (SMTP)
openssl s_client -connect smtp.example.com:25 -starttls smtp

# Test with starttls (POP3)
openssl s_client -connect pop3.example.com:110 -starttls pop3

# Test with starttls (IMAP)
openssl s_client -connect imap.example.com:143 -starttls imap

# Test with starttls (FTP)
openssl s_client -connect ftp.example.com:21 -starttls ftp

# Test with starttls (XMPP)
openssl s_client -connect xmpp.example.com:5222 -starttls xmpp
```

- - -

## SECTION 4: CERTIFICATE CONVERSION COMMANDS

### Convert Between PEM and DER

```bash
# Convert PEM to DER
openssl x509 -in certificate.pem -outform DER -out certificate.der

# Convert DER to PEM
openssl x509 -in certificate.der -inform DER -outform PEM -out certificate.pem
```

### Convert Between PEM and PKCS12

```bash
# Convert PEM to PKCS12 (with private key and CA chain)
openssl pkcs12 -export -out certificate.pfx -inkey private.key -in certificate.crt -certfile ca-chain.crt

# Convert PEM to PKCS12 (password protected)
openssl pkcs12 -export -out certificate.pfx -inkey private.key -in certificate.crt -certfile ca-chain.crt -passout pass:yourpassword

# Convert PKCS12 to PEM (all certificates and keys)
openssl pkcs12 -in certificate.pfx -out certificate.pem -nodes

# Extract private key from PKCS12
openssl pkcs12 -in certificate.pfx -nocerts -out private.key -nodes

# Extract certificate from PKCS12
openssl pkcs12 -in certificate.pfx -clcerts -nokeys -out certificate.crt

# Extract CA certificates from PKCS12
openssl pkcs12 -in certificate.pfx -cacerts -nokeys -out ca.crt
```

### Convert Between PEM and PKCS7

```bash
# Convert PEM to PKCS7
openssl crl2pkcs7 -nocrl -certfile certificate.pem -out certificate.p7b

# Convert PKCS7 to PEM
openssl pkcs7 -in certificate.p7b -print_certs -out certificate.pem
```

### Convert PEM to Other Formats

```bash
# Convert PEM to P12 (for Windows/IIS)
openssl pkcs12 -export -in certificate.crt -inkey private.key -out certificate.p12

# Convert PEM to JKS (Java Key Store)
keytool -importkeystore -srckeystore certificate.p12 -srcstoretype pkcs12 -destkeystore keystore.jks

# Convert PEM to PFX (for Windows)
openssl pkcs12 -export -in certificate.crt -inkey private.key -out certificate.pfx
```

### Combine Certificates

```bash
# Combine certificate and private key into one file
cat certificate.crt private.key > combined.pem

# Create full chain (server + intermediate)
cat server.crt intermediate.crt > fullchain.pem

# Create full chain with root (for some applications)
cat server.crt intermediate.crt root.crt > fullchain-with-root.pem

# Create bundle with all certificates
cat server.crt intermediate.crt root.crt > bundle.pem
```

- - -

## SECTION 5: CERTIFICATE GENERATION COMMANDS

### Generate Self-Signed Certificate

```bash
# Generate self-signed certificate (interactive)
openssl req -x509 -newkey rsa:4096 -keyout private.key -out certificate.crt -days 365

# Generate self-signed certificate (non-interactive)
openssl req -x509 -newkey rsa:4096 -keyout private.key -out certificate.crt -days 365 -subj "/CN=example.com" -nodes

# Generate self-signed certificate with SAN (alternative names)
openssl req -x509 -newkey rsa:4096 -keyout private.key -out certificate.crt -days 365 -nodes -subj "/CN=example.com" -addext "subjectAltName=DNS:example.com,DNS:*.example.com,DNS:localhost"

# Generate self-signed with SAN using config file
openssl req -x509 -newkey rsa:4096 -keyout private.key -out certificate.crt -days 365 -nodes -config <(cat <<EOF
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no
[req_distinguished_name]
CN = example.com
[v3_req]
subjectAltName = @alt_names
[alt_names]
DNS.1 = example.com
DNS.2 = *.example.com
DNS.3 = localhost
EOF
)

# Generate self-signed ECDSA certificate
openssl ecparam -name prime256v1 -genkey -out private.key
openssl req -x509 -key private.key -out certificate.crt -days 365 -subj "/CN=example.com" -nodes
```

### Generate CSR (Certificate Signing Request)

```bash
# Generate CSR with new private key
openssl req -new -newkey rsa:4096 -keyout private.key -out request.csr -nodes

# Generate CSR from existing private key
openssl req -new -key private.key -out request.csr

# Generate CSR with SAN
openssl req -new -key private.key -out request.csr -config <(cat <<EOF
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no
[req_distinguished_name]
CN = example.com
[v3_req]
subjectAltName = @alt_names
[alt_names]
DNS.1 = example.com
DNS.2 = *.example.com
EOF
)

# Generate CSR with custom subject
openssl req -new -key private.key -out request.csr -subj "/C=US/ST=California/L=San Francisco/O=My Company/OU=IT/CN=example.com"
```

### Generate Certificate with CA

```bash
# Generate certificate with CA (using config)
openssl ca -config openssl.cnf -in request.csr -out certificate.crt -days 365

# Generate certificate with CA and extensions
openssl ca -config openssl.cnf -in request.csr -out certificate.crt -days 365 -extensions v3_req

# Generate certificate with CA (non-interactive)
openssl ca -config openssl.cnf -in request.csr -out certificate.crt -days 365 -batch
```

### Generate Different Key Types

```bash
# Generate RSA private key (2048 bits)
openssl genrsa -out private.key 2048

# Generate RSA private key (4096 bits)
openssl genrsa -out private.key 4096

# Generate RSA private key with password protection
openssl genrsa -aes256 -out private.key 4096

# Generate EC private key (prime256v1)
openssl ecparam -name prime256v1 -genkey -out private.key

# Generate EC private key (secp384r1)
openssl ecparam -name secp384r1 -genkey -out private.key

# Generate EC private key (secp521r1)
openssl ecparam -name secp521r1 -genkey -out private.key

# Generate DSA private key
openssl dsaparam -genkey 2048 -out private.key
```

- - -

## SECTION 6: CERTIFICATE RENEWAL & MANAGEMENT

### Certificate Expiry Check

```bash
# Check certificate expiry date
openssl x509 -in certificate.crt -enddate -noout

# Check certificate expiry with formatting
openssl x509 -in certificate.crt -enddate -noout | cut -d= -f2

# Check if certificate is expired
openssl x509 -in certificate.crt -checkend 86400 -noout && echo "Valid for at least 24 hours" || echo "Expiring soon or expired"

# Check all certificates in a directory
for cert in *.crt; do echo -n "$cert: "; openssl x509 -in "$cert" -enddate -noout; done
```

### Renew Certificate

```bash
# Generate new CSR using existing private key
openssl req -new -key private.key -out new-request.csr -subj "/CN=example.com"

# Renew self-signed certificate (with new expiration)
openssl x509 -x509toreq -in old.crt -signkey private.key -out new.csr
openssl x509 -req -in new.csr -signkey private.key -out new.crt -days 365
```

### Revoke Certificate

```bash
# Generate Certificate Revocation List (CRL)
openssl ca -config openssl.cnf -gencrl -out crl.pem

# Revoke certificate
openssl ca -config openssl.cnf -revoke certificate.crt

# Check CRL
openssl crl -in crl.pem -text -noout
```

- - -

## SECTION 7: SSL/TLS SERVER TESTING

### Start Test SSL Server

```bash
# Start simple SSL server
openssl s_server -accept 8443 -cert certificate.crt -key private.key

# Start SSL server with full chain
openssl s_server -accept 8443 -cert fullchain.pem -key private.key

# Start SSL server with CA file
openssl s_server -accept 8443 -cert certificate.crt -key private.key -CAfile ca.crt -verify

# Start SSL server with HTTP responses
openssl s_server -accept 8443 -cert certificate.crt -key private.key -www

# Start SSL server with specific TLS version
openssl s_server -accept 8443 -cert certificate.crt -key private.key -tls1_3

# Start SSL server with client authentication
openssl s_server -accept 8443 -cert certificate.crt -key private.key -verify_client_once -CAfile ca.crt
```

### Test SMTP/POP3/IMAP

```bash
# Test SMTP with STARTTLS
openssl s_client -connect smtp.example.com:25 -starttls smtp -crlf

# Test POP3 with STARTTLS
openssl s_client -connect pop3.example.com:110 -starttls pop3

# Test IMAP with STARTTLS
openssl s_client -connect imap.example.com:143 -starttls imap

# Test FTPS
openssl s_client -connect ftp.example.com:990

# Test HTTPS with HTTP headers
echo -e "GET / HTTP/1.0\r\nHost: example.com\r\n\r\n" | openssl s_client -connect example.com:443 -quiet

# Test HTTPS and print HTTP headers only
echo -e "HEAD / HTTP/1.0\r\nHost: example.com\r\n\r\n" | openssl s_client -connect example.com:443 -quiet 2>/dev/null
```

- - -

## SECTION 8: ADVANCED TROUBLESHOOTING

### Debug SSL/TLS Issues

```bash
# Debug SSL handshake with verbose output
openssl s_client -connect example.com:443 -debug

# Debug SSL handshake with more details
openssl s_client -connect example.com:443 -state -debug

# Check SSL/TLS version compatibility
openssl s_client -connect example.com:443 -tlsextdebug

# Test with all supported ciphers
openssl ciphers -v 'ALL:!COMPLEMENTOFDEFAULT'

# Test with specific cipher suite
openssl s_client -connect example.com:443 -cipher 'ECDHE+AESGCM'

# Check cipher suite support
for cipher in $(openssl ciphers 'ALL'); do
    echo -n "$cipher: "
    openssl s_client -connect example.com:443 -cipher "$cipher" -tlsextdebug 2>&1 | grep -q "Cipher is" && echo "Supported" || echo "Not supported"
done
```

### Check Certificate Chain Issues

```bash
# Check certificate chain completeness
openssl s_client -connect example.com:443 -showcerts 2>/dev/null | grep -c "BEGIN CERTIFICATE"

# Check certificate chain and save to files
openssl s_client -connect example.com:443 -showcerts 2>/dev/null | awk '/BEGIN CERTIFICATE/,/END CERTIFICATE/' | csplit -sz -f cert- - '/END CERTIFICATE/+1' {*}

# Check certificate chain with root CA bundle
openssl s_client -connect example.com:443 -CApath /etc/ssl/certs/

# Check certificate chain with specific CA
openssl s_client -connect example.com:443 -CAfile root-ca.crt
```

### Check Certificate Transparency Logs

```bash
# Get SCT (Signed Certificate Timestamp) from certificate
openssl s_client -connect example.com:443 -status 2>&1 | grep -A5 "OCSP Response"

# Check certificate has CT logs
openssl x509 -in certificate.crt -text -noout | grep -A5 "Signed Certificate Timestamp"
```

- - -

## SECTION 9: FILE FORMAT COMMANDS

### Check File Formats

```bash
# Check if file is PEM format
grep -q "BEGIN CERTIFICATE" file.crt && echo "PEM format" || echo "Not PEM"

# Check if file is DER format
file certificate.der | grep -q "DER" && echo "DER format" || echo "Not DER"

# Check if file is PKCS12 format
file certificate.pfx | grep -q "PKCS" && echo "PKCS12 format" || echo "Not PKCS12"

# Check if file is PKCS7 format
file certificate.p7b | grep -q "PKCS" && echo "PKCS7 format" || echo "Not PKCS7"
```

### Convert Between Text and Binary

```bash
# Convert certificate to hex
openssl x509 -in certificate.crt -outform DER | xxd -p

# Convert hex to certificate
echo "hexstring" | xxd -r -p | openssl x509 -inform DER -outform PEM
```

- - -

## SECTION 10: CRYPTO OPERATIONS

### Hash and Digest Operations

```bash
# Get certificate hash (for Apache/nginx SSL settings)
openssl x509 -in certificate.crt -hash -noout

# Get certificate hashed name for CA directory
openssl x509 -in certificate.crt -hash -noout && echo ".0"

# Create symlink for CA directory
ln -s certificate.crt $(openssl x509 -in certificate.crt -hash -noout).0

# Get certificate fingerprint
openssl x509 -in certificate.crt -fingerprint -sha256 -noout | sed 's/.*=//g' | tr -d ':'

# Get certificate public key hash (for HPKP)
openssl x509 -in certificate.crt -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | base64
```

### Encryption and Decryption

```bash
# Encrypt file with public key
openssl rsautl -encrypt -inkey public.pem -pubin -in file.txt -out file.enc

# Decrypt file with private key
openssl rsautl -decrypt -inkey private.key -in file.enc -out file.txt

# Sign file with private key
openssl dgst -sha256 -sign private.key -out file.sig file.txt

# Verify signature with public key
openssl dgst -sha256 -verify public.pem -signature file.sig file.txt
```

### Random Data Generation

```bash
# Generate random data for testing
openssl rand -out random.bin 1024

# Generate base64 random string
openssl rand -base64 32

# Generate hex random string
openssl rand -hex 16
```

- - -

## SECTION 11: NGINX & APACHE SPECIFIC COMMANDS

### Nginx SSL Commands

```bash
# Test Nginx SSL configuration
nginx -t

# Test Nginx with specific SSL parameters
nginx -t -c /etc/nginx/nginx.conf

# Check SSL session cache
openssl s_client -connect localhost:443 -session-id 123 2>&1 | grep -i "session-id"

# Generate dhparam for Nginx (Diffie-Hellman parameters)
openssl dhparam -out dhparam.pem 2048
openssl dhparam -out dhparam.pem 4096
```

### Apache SSL Commands

```bash
# Test Apache SSL configuration
apachectl configtest

# Test Apache SSL with verbose
httpd -t -D DUMP_SSL_CERTS

# Check Apache SSL configuration
httpd -t -D DUMP_MODULES | grep ssl

# Generate Apache DH parameters
openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```

- - -

## SECTION 12: PERL ONE-LINERS FOR SSL

```bash
# Extract certificate expiration date
perl -MIO::Socket::SSL -e 'print IO::Socket::SSL->new("example.com:443")->peer_certificate->expires, "\n"'

# Check certificate validity
perl -MIO::Socket::SSL -e 'my $s=IO::Socket::SSL->new("example.com:443"); print $s->peer_certificate->verify_hostname("example.com", "ssl") ? "Valid" : "Invalid"'

# Get certificate issuer
perl -MIO::Socket::SSL -e 'print IO::Socket::SSL->new("example.com:443")->peer_certificate->issuer, "\n"'
```

- - -

## SECTION 13: BASH SCRIPTS FOR SSL MONITORING

### Certificate Expiry Monitor Script

```bash
#!/bin/bash
# Check certificate expiry for multiple domains
domains=("example.com" "google.com" "github.com")
for domain in "${domains[@]}"; do
    expiry=$(echo | openssl s_client -servername "$domain" -connect "$domain:443" 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2)
    expiry_seconds=$(date -d "$expiry" +%s)
    current_seconds=$(date +%s)
    days_left=$(( (expiry_seconds - current_seconds) / 86400 ))
    echo "$domain: $days_left days remaining"
done
```

### Download Certificate Chain Script

```bash
#!/bin/bash
# Download and save certificate chain
domain=$1
if [ -z "$domain" ]; then
    echo "Usage: $0 domain.com"
    exit 1
fi

openssl s_client -connect "$domain:443" -showcerts </dev/null 2>/dev/null | \
    awk '/BEGIN CERTIFICATE/,/END CERTIFICATE/' | \
    csplit -sz -f "$domain-cert-" - '/END CERTIFICATE/+1' {*}

echo "Certificates saved as ${domain}-cert-00, ${domain}-cert-01, ..."
```

### SSL Checker for Multiple Ports

```bash
#!/bin/bash
# Check SSL on multiple ports
ports=(443 8443 465 993 995)
for port in "${ports[@]}"; do
    echo "Testing port $port..."
    echo | openssl s_client -connect localhost:"$port" -servername localhost 2>/dev/null | \
        grep -E "Protocol|Cipher|Verify" | head -3
    echo "---"
done
```

- - -

## SECTION 14: QUICK REFERENCES

### Common OpenSSL Commands Cheat Sheet

```bash
# Quick certificate info
alias certinfo='openssl x509 -in certificate.crt -text -noout'

# Quick CSR info
alias csrinfo='openssl req -in request.csr -text -noout'

# Quick key info
alias keyinfo='openssl rsa -in private.key -text -noout'

# Quick SSL test
alias ssltest='openssl s_client -connect example.com:443 -showcerts'

# Quick expiry check
alias checkexpiry='openssl x509 -in certificate.crt -enddate -noout'

# Quick fingerprint
alias certfp='openssl x509 -in certificate.crt -fingerprint -sha256 -noout'
```

### Common Certificate Paths

```bash
# Linux CA certificates
ls /etc/ssl/certs/
ls /usr/share/ca-certificates/
ls /usr/local/share/ca-certificates/

# Update CA certificates
sudo update-ca-certificates

# Nginx SSL paths
ls /etc/nginx/ssl/
ls /etc/nginx/conf.d/

# Apache SSL paths
ls /etc/apache2/ssl/
ls /etc/httpd/conf.d/ssl.conf
```

### Useful Environment Variables

```bash
# Use for debugging
export OPENSSL_CONF=/etc/ssl/openssl.cnf
export SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
export SSL_CERT_DIR=/etc/ssl/certs/
```

- - -

## SECTION 15: TESTING COMMANDS FOR COMMON SCENARIOS

### Test Common SSL Issues

```bash
# Test for Heartbleed vulnerability
openssl s_client -connect example.com:443 -tlsextdebug 2>&1 | grep -i heartbeat

# Test for POODLE vulnerability (SSLv3)
openssl s_client -connect example.com:443 -ssl3 2>&1 | grep -i error

# Test for ROBOT vulnerability
openssl s_client -connect example.com:443 -cipher RSA -tls1_2

# Test for BEAST vulnerability
openssl s_client -connect example.com:443 -cipher ECDHE+AES

# Test for CRIME vulnerability (TLS compression)
openssl s_client -connect example.com:443 -compression
```

### Test SSL/TLS Performance

```bash
# Time SSL handshake
time openssl s_client -connect example.com:443 -no_ign_eof </dev/null 2>&1 >/dev/null

# Test multiple connections
for i in {1..10}; do
    time openssl s_client -connect example.com:443 -no_ign_eof </dev/null 2>&1 >/dev/null
done

# Test connection with specific SSL version
for tls in tls1 tls1_1 tls1_2 tls1_3; do
    echo -n "$tls: "
    openssl s_client -connect example.com:443 -${tls} </dev/null 2>&1 | grep -q "Protocol" && echo "Supported" || echo "Not supported"
done
```

- - -