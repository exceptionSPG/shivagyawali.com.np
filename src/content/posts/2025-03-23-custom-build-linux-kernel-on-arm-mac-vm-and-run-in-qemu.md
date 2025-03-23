---
template: blog-post
title: Custom build Linux kernel on ARM mac VM and run in qemu
slug: /blog/compile-custom-kernel-on-VM-in-arm-macOS-run-on-qemu
date: 2025-03-23 18:46
description: custom kernel build, kernel build in arm vm, qemu, qemu-system-arm,
  aarch64, linux kernel development
featuredImage: /assets/image-1.png
---
Have you ever tried building your own kernel? 

I know how it feels - the thrill, and the frustration — like two sides of a same coin. Anyway, we won’t stop until `uname -a` shows our custom name. Let’s goooo

So many resources… yet, there is always something that is not serving to you. Hence, I am dumping my frustration here, just to refer back myself. 

My approach is a bit hit-and-trial method. First, grabbing the source code, and directly following the kernel build process… if it fails, google it — install package and retry. Retry, until I succeed.  

## Grabbing the Linux source code

Okay, first let’s create a directory, os-sec. Inside it, let’s clone the git source code:

```bash
# I am using Linux-5.10.174, you can choose any.
wget https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.10.174.tar.xz
unxz linux-5.10.174.tar.xz
tar xvf linux-5.10.174.tar
```

### Config

Start by copying the existing config

```bash
# Go to linux-5.10.174 directory 
cd linux-5.10.174
cp /boot/config-$(uname -r) .config

# Let's make config based on old default config
make olddefconfig

# Disable signing
./scripts/config --file .config --disable MODULE_SIG

# set LOCALVERSION to something your name, it will show if you do `uname -a` :
# Linux (none) 5.10.174-kailaba #1 SMP Sun Mar 23 10:20:42 UTC 2025 aarch64 GNU/Linux
./scripts/config --file .config --set-str LOCALVERSION "-kailaba"

# run 
make all

# at this point I got an issue 
# I disabled them: 
scripts/config --disable SYSTEM_TRUSTED_KEYS
scripts/config --disable SYSTEM_REVOCATION_KEYS

# Then run
make all
```

Cert issue:

![](/assets/cert-error.png "debian certificate issue.")



After few minutes, I got my kernel built at
`arch/arm64/boot/Image.gz` Let’s test this with `qemu-system-arm`

### Run aarch64

```bash
# this results in kernel panic
qemu-system-aarch64 -M virt -cpu cortex-a57  -kernel linux-5.10.174/arch/arm64/boot/Image.gz -nographic -append "earlyprintk=serial,ttyS0" 
```

This time, we encountered `kernel-panic` . This is because, we haven’t yet given our root fs. Let’s build it with [`busybox`](https://busybox.net/) (or [initramfs](https://wiki.gentoo.org/wiki/Custom_Initramfs))

### Downloading and building busybox

```bash
#Inside os-sec directory, where we have our linux-5.... directory

~ curl https://busybox.net/downloads/busybox-1.33.2.tar.bz2 --output busybox-1.33.2.tar.bz2
~ tar -xjf busybox-1.33.2.tar.bz2
~ rm -f busybox-1.33.2.tar.bz2

# Configure and 

~ cd busybox-1.33.2
~ mkdir -pv build
# create a .config file w/ a lot of yes's. We're getting
# a lot of Busybox features, probably more than we need.
# I don't know enough to start with an allnoconfig
# and enable only the bare minimum so this is it.
# The built size might be bigger than our 1.5ish MB kernel. Let's see.
~ make O=./build/ defconfig
# open the config UI
~ make O=./build/ menuconfig
```

Once config UI is open, select "Settings" (via return) and then "Build Busybox as a static binary" (via space bar). This is because there won't be any shared libraries on the filesystem in our empty kernel userspace to start.

![image.png](Custom%20compile%20Linux%20kernel%20on%20ARM%20mac%20VM%20and%20run%20%201bf158970079801ead33df7fbd759f86/image.png "Busybox configuration")

Now, let’s start the build:

```bash
# type make help to see options here,
# but essentially, we can do `make all` or `make busybox`.
# former also bulds docs. latter only builds busybox.
~ make O=./build/ -j8 busybox
```

and this creates busybox:

`ls -la ./build/ --block-size=KB | grep busybox`

We only care `busybox` here.

![](/assets/busybox-output.png "Busybox output")



### **Create initial directory structure**

```bash
~ mkdir initramfs && cd initramfs
# create some basic directories we want in our Linux userspace
# dev, proc and sys are for kernel-related stuff like procfs, sysfs and devices.
# etc is to store configuration for stuff we might configure in the future.
# root is the place where we'll operate.
# bin is to store excecutables.
~ mkdir {bin,dev,etc,proc,root,sys}
# busybox expects these additional directories as well
# so let's create them for it
~ mkdir {usr/bin,usr/sbin,sbin}
# we want busybox to be included in our initramfs
~ cp ../busybox-1.33.2/build/busybox bin/busybox
```

### **Create init process**

`touch init && chmod +x init `

`vim init ` and paste below:

```bash
#!/bin/busybox sh

# Get busybox to create soft links to commands
/bin/busybox --install -s

# Mount the /proc and /sys filesystems.
# You can omit this if you like. Just seemed nice to have.
mount -t proc none /proc
mount -t sysfs none /sys

# Load shell, which should now be soft linked to busybox
exec /bin/sh
```

### **Create initramfs cpio**

```bash
~ find . -print0 | cpio --null --create --verbose --format=newc | gzip --best > ./custom-initramfs.cpio.gz
.
./etc
./root
./sys
./dev
./bin
./bin/busybox
./init
./proc
cpio: File ./custom-initramfs.cpio.gz grew, 1310720 new bytes not copied
./custom-initramfs.cpio.gz
7824 blocks
```

### **Run Linux on qemu with Busybox (via initramfs)**

```bash
qemu-system-aarch64 -M virt -cpu cortex-a57  -kernel linux-5.10.174/arch/arm64/boot/Image.gz -nographic -append "earlyprintk=serial,ttyS0" --initrd ./initramfs/
```

This time, boom, we are able to see our shell and if you run `uname -a` , look what you can see:

![image.png](/assets/image-1.png "Output of our kernel")

### Resources:

1. <https://www.subrat.info/build-kernel-and-userspace/>
2. <https://stackoverflow.com/questions/58028789/how-to-build-and-boot-linux-aarch64-with-u-boot-with-buildroot-on-qemu>
3.