# SLWP
Secure Login Without Passwords

A zero-knowledge authentication protocol that eliminates passwords, by using keypairs instead (one on the server, one for the user).
This protocol has been designed primarily for logins on websites, to get rid of the centralized storage of passwords.

The server sends the user an encrypted random value that the user must decrypt and return a hash of (showing it has the right user key).
The user sends the server a (different) encrypted random value that the server must decrypt (by means of a dedicated login server)
and return a hash of (showing it has the right server key). If both are able to provide the other with the right hash value,
both are authenticated. This authentication of the server by the user is totally independent of any SSL/TLS certificate.
