---
template: blog-post
title: Format NTFS to exFAT on Ubuntu
slug: format-ntfs-to-exfat-on-ubuntu
date: 2024-01-18 11:41
description: format disk, ntfs, exfat, ntfs-to-exfat,
---
I have a hard disk, formatted with NTFS file system. 

When I need to use this hard-disk with Ubuntu, and MacOS, I got into the problem. Though Ubuntu supports read-write on NTFS filesystem, MacOS only supports READ content. I can't write to the disk using MacOS. Hence, I decided to convert NTFS to someother compatible filesystem, so that I can use the harddisk on all my OSes. 

From some research, I came to know that I can use exFAT filesystem to format my one of the partition. exFAT is supported read-write on MacOS as well, and on Ubuntu or WIndows. Hence, this would solve my problem at hand.

Here is how I converted the NTFS to exFAT:

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
2. Install exfat on Ubuntu

   To apply exfat filesystem to this partition, we need to install exfat command and utils on ubuntu.