
\subsection{Compromised keys}
There are several scenarios where keys can become compromised.
\begin{enumerate}
\item A hacker could get full and unrestricted access to the database holding all site keys and userid hashes.
\par
The hacker can then start cracking the \E{AES} encryption by capturing all
login traffic to the site for a long period of time.
Since there is just a single block of 128 bits used for each login,
which consists purely of random data,
there is not much to go on.
\item A hacker could obtain the keyring from a user.
\par
The hacker would also need to know with which key(s) the keyring is encrypted.
Should the hacker know that too, it would still need to know which key is used for what.
If the hacker should know a key, then he or she can login to that site.
He or she has obtained a single login.
\par
The site name is often entered using the keyboard.
If possible,
selecting a key from the keyring should be done using a graphical interface,
so a simple key-logging Trojan would not be usable to gain knowledge about which key is used for which site.
\item A hacker could steal the backup copies of the Secret keys from a vault.
\par
With just the Secret keys compromised, no harm is done.
Only when the database is also available, the hacker has full control.
This full control is just for that site, and no other site is in any way compromised as well.
\item A hacker could break the SSL/TLS encryption of the HTTPS connection and
view all traffic between user and website in plain text.
\par
The hacker would learn nothing, except which $\E{SHA}$ hash code the user uses for that site.
Using the hash to login requires a special replacement login program, to insert the hash directly in the data stream.
It is hard to find a login that produces the same hash.
\par
All other login data is random and encrypted at that.
\end{enumerate}
