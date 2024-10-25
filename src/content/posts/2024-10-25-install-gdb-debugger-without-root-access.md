---
template: blog-post
title: Install gdb debugger without root access
slug: /blog/install-gdb-debugger-without-sudo-access
date: 2024-10-25 12:37
description: gdb, gdb debugger, Shiva Gyawali, kailaba,
featuredImage: /assets/gdb-not-found.png
---
Recently, while reading book: Hacking: The art of exploitation, I came an urge to use [gdb](https://www.sourceware.org/gdb/) - every hacker's best friend. But, I wanted it to install on my shared-hosting server, so that I can access it from anywhere, literally anywhere and do my reading ease and accessible.
But, to do so, I compiled my c Code, with gcc, great. But, while trying `gdb -q ./a.out`, I got "gdb: command not found" error. This is because my server doesn't have gdb installed. I need to install it.
But, to install it using package manager such as apt, I need to have sudo access. Lol, it's my shared hosting, where I have very limited acess. Thus, I downloaded .tar.gz of gdb and extracted as:

```
wget https://ftp.gnu.org/gnu/gdb/gdb-15.2.tar.gz

tar -zxvf gdb-15.2.tar.gz
cd gdb-15.2
./configure --prefix=$HOME/gdb
```

Then, I tried configure with prefix path Home/gdb, which I stumbled into another error:

```webassembly
configure command failed with:
configure: error: Building GDB requires GMP 4.2+, and MPFR 3.1.0+.
Try the --with-gmp and/or --with-mpfr options to specify
```

This time, it is with another GNU components, gmp and mpfr, which are available in incompatible version. 
Next, I head down to respective project page, and downloaded gmp and mpfr, then,  https://gmplib.org/#DOWNLOAD\
https://www.mpfr.org/mpfr-current/

configure them to use home path, then, make and install... 

```
wget https://gmplib.org/download/gmp/gmp-6.3.0.tar.gz
tar -zxvf gmp-6.3.0.tar.gz
cd gmp-6.3.0/
./configure --prefix=$HOME/gmp
make && make install

wget https://www.mpfr.org/mpfr-current/mpfr-4.2.1.tar.gz
tar -zxvf mpfr-4.2.1.tar.gz
cd mpfr-4.2.1/
./configure --prefix=$HOME/mpfr
make && make install
```

\
Life was running smooth..

So, I now configured gdb with providing path to my gmp and mpfr library:

```
cd gdb-15.2
./configure --prefix=$HOME/gdb --with-gmp=$HOME/gmp --with-mpfr=$HOME/mpfr
make && make install
```



Installation successful... wow:

![gdb-install success](/assets/installed-success.png "gdb Installation successful")

However, if I hit gdb, it shows command not found error again:

![gdb command not found](/assets/gdb-not-found.png "gdb command not found")



So, I hit the full path, and (awuahh!!), see, what I get, beloved gdb:

![gdb with full path](/assets/gdb-run.png "gdb with Full path")

Lastly, I exported the path of gdb, so that I can just hit gdb as typing its path every time I need gdb is cumbersome job ;)

```
export PATH=$PATH:$HOME/gdb/bin
```

Now, bangg, just hit gdb, and enjoy your debugging....

![gdb bangg](/assets/gdb-export.png "gdb export path.")