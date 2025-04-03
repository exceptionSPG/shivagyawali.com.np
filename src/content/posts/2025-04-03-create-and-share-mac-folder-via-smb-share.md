---
template: blog-post
title: "create and share mac folder via SMB share "
slug: /blog/create-and-share-mac-folder-via-network
date: 2025-04-03 09:48
description: "mac share, mac folder share, macutil, SMB share "
featuredImage: /assets/file-sharing.png
---
In some cases we need to mount or share our mac folder with other server/devices in the network. Let's explore and setup our mac to share it's folder via the network mount.



## Set up in mac

To be able to access our folder in mac from another device in the network, we need to activate and create a File sharing. Go to the Settings --> General --> Sharing

![](/assets/general-sharing.png "Settings --> General --> Sharing")

There, you will see the File Sharing. Enable the toggle button then click on i.

![](/assets/enable-file-sharing.png "Enable File Sharing and click i")

You will be displayed with a pop-up. 



![](/assets/file-sharing.png "Pop Up Display")

Under the Share Folder, create/browse the mac folder you want to enable share access through the network. In the reference image, you can observe few listed folder, which I added earlier. For instance, I have lab3-uefi. Click on your folder, and let's configure the user for this share.

Choose or add new user to make him/her access to this share. If you like to make it available to anyone, give access to Everyone. It's not recommended to enable Everyone user the Read/Write access. Do it exclusively and on your trust.



Hence, we done with our mac setup. Just hold on, before moving to another machine, copy our smb address (or know the IP of your mac).

### Verifying and seeing our smb share

We can utilize `smbutil `command tool in mac to list our smb share folder.

`smbutil view //user@mac-ip `

It will ask for the user's password. Upon correct authentication, it will list all the available SMB share directories.

![](/assets/smbutil-op.png "Viewing our smb share ")



## Access and mount our share folder

Let's access our same share folder from another machine.



If you are trying to mount this share in your ubuntu distribution, first install the cifs utils.

`sudo apt install cifs-utils -y `

``

```
sudo apt-get install cifs-utils -y

# Let's create a folder to mount.
mkdir ~/mac-share

# Let's mount our share
sudo mount -t cifs //192.168.64.1/lab3-uefi ~/mac-share \
-o username=exceptionspg,password=<pwd>,vers=3.0

# Recommended, this will prompt for user password
sudo mount -t cifs //192.168.64.1/lab3-uefi ~/mac-share \
-o username=<your-mac-smb

# Now you can list out all the files and access them from your mount
ls ~/mac-share


```



![](/assets/mounted.png "Mounted and accessed in remote machine")

I hope you could be able to mount your mac folders easily and conveniently. 

Thank you for reading :)