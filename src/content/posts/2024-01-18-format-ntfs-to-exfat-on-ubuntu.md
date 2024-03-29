---
template: blog-post
title: Format NTFS to exFAT on Ubuntu
slug: format-ntfs-to-exfat-on-ubuntu
date: 2024-01-18 11:41
description: format disk, ntfs, exfat, ntfs-to-exfat,
featuredImage: /assets/ntfs-to-extfat.png
---
I have a hard disk, formatted with NTFS file system. 

When I need to use this hard-disk with Ubuntu, and MacOS, I got into the problem. Though Ubuntu supports read-write on NTFS filesystem, MacOS only supports READ content. I can't write to the disk using MacOS. Hence, I decided to convert NTFS to someother compatible filesystem, so that I can use the harddisk on all my OSes. 

From some research, I came to know that I can use exFAT filesystem to format my one of the partition. exFAT is supported read-write on MacOS as well, and on Ubuntu or WIndows. Hence, this would solve my problem at hand.

Here is how I converted the NTFS to exFAT:

![before our journey begins](/assets/ntfs-kailaba.png "Before conversion:  /dev/sdb2 has ntfs filesystem")

1. ## Backup the current disk partition content

   I used rsync to backup content before proceeding with formatting.

   ```
   # dry run to see what runs
   rsync -avPn Kailaba/ Shiva\ Gyawali/Kailaba-disk

   # remove n and then run -> this will actual run
   rsync -avP Kailaba/ Shiva\ Gyawali/Kailaba-disk

   # Now once the files have been transfered to new directory, let's verify it again, and
   # remove the source files
   # dry run first always
   rsync -avPn --remove-source-files Kailaba/ Shiva\ Gyawali/Kailaba-disk

   # once you verified, true run
   rsync -avP --remove-source-files Kailaba/ Shiva\ Gyawali/Kailaba-disk

   ## NOTE: here, Kailaba/ is my source directory
   ##             Shiva\ Gyawali/Kailaba-disk is my destination directory

   ```
2. ## Install exfat on Ubuntu and format with it

   To apply exfat filesystem to this partition, we need to install exfat command and utils on ubuntu. We need to install exfat-fuse and exfat-utils, However on Ubuntu 22 and higher, exfat-utils [is replaced by exfatprogs](https://askubuntu.com/a/1403901)

   ```
   # install exfat-fuse exfat-utils
   # However, exfat-utils is now replaced by exfatprogs 
   sudo apt-get install exfat-fuse exfatprogs

   # unmount the partition 
   # here, my targeted partion is /dev/sdb2 -> change according to yours
   sudo umount /dev/sdb2

   # After then, we need to format /dev/sdb2 with exfat

   sudo mkfs.exfat /dev/sdb2

   ## BUT WAIT, we want to give this partition a name
   sudo mkfs.exfat -n Kailaba /dev/sdb2

   # now to mount the partition, we need to create mount point
   mkdir -p /media/<my-dir/Kailaba

   sudo mount /dev/sdb2 /media/<my-di>/Kailaba

   # run df -hT to see that our filesystem is now changed to exFat from NTFS
   df -hT




   ```

![mkfs.exfat output](/assets/exfat-format-kailaba.png "Output during extFAT formatting")



### After our effort, here, we are with exFAT on /dev/sdb2:

![after our changes](/assets/exfat-kailaba.png "After our changes: /dev/sdb2 has exfat filesystem")



In this way, we can format the particular partition to exfat file system, and enjoy read-write on all OSes. 



Happy learning.