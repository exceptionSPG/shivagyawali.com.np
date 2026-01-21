---
template: blog-post
title: Creating LVM on ubuntu 22.04
slug: /creating-lvm-on-ubuntu-22.04
date: 2023-10-17 12:46
description: |-
  lvm, logical volume manager, lvm ubuntu,
  ubuntu lvcreate,
  ubuntu lvm group,
  ubuntu create lvm,
  ubuntu lvm,
  lvm group ubuntu server,
  set up this disk as an lvm group ubuntu,
  ubuntu create logical volume,
  lvm on ubuntu,
  lvm in ubuntu,
  lvm ubuntu installation,
  what is use lvm with the new ubuntu installation,
  use lvm with the new ubuntu installation,
  ubuntu lvm setup,
  ubuntu setup disk as lvm group,
  ubuntu set up this disk as an lvm group,
  lvm group ubuntu,
  install lvm ubuntu,
  ubuntu server lvm group,
  what is lvm in ubuntu,
featuredImage: /assets/bench-accounting-nvzvopqw0gc-unsplash.jpg
---
Creating LVM (Logical Volume Management) on Ubuntu 22.04 allows you to efficiently manage storage resources by combining multiple disks or partitions into a single logical volume. 

In this blog post, we will explore the step-by-step process of creating LVM on Ubuntu 22.04, including adding new disks, creating physical volumes, volume groups, and logical volumes. We will also cover formatting and mounting the newly created logical volumes. Let's dive in and learn how to harness the power of LVM for flexible and scalable storage management.

> Environment:\
> Machine: Ubuntu-22.04 (on VMWare)

## Add new disk to vm

* shutdown VM
* Click settings > Add device

  ![Adding device](/assets/untitled.png "Add new disk to vm")
* then add new disk

  ![add new disk](/assets/untitled-1-.png "add new disk to the device")

  Then, lsblk command will show new disk, sdb for us
*

## Creating LVM on Ubuntu:

This shows the pictorial demonstration of creating LVM.



![LVM ](/assets/pasted-image-20230728064708.png "Logical volume manager")



## Steps in creating LVM:

![steps in creating lvm](/assets/lvm-steps.png "Steps in Creating LVM")



```shell
# check if disk is attached
lsblk
# See output below


# format this sdb disk with gpt
parted /dev/sdb
# this will enter us to parted interactive shell
(parted) mklabel gpt

# create a partition
(parted) mkpart primary ext4 1049KB 100%
(parted) print free
(parted) set 1 lvm on # this will set lvm on to just created ext4 partition
(parted) quit
# See output below


# check disk again, to see our created partition
lsblk
```

Output: lsblk

![lsblk-output](/assets/lvm_lsblk.png "output: lsblk")

output: parted commands:

![ext4 partition](/assets/lvm_ext4partition.png "output: parted with ext4")

See newly created partition:\
Output: lsblk

![newly created partition](/assets/lvm_lsblk-newcreatedpartition.png "Output: Newly created partition")



Till now, We created the partition with new disk, however, physical volume is still not created.



## Create physical volume

```shell
# list physical volumes
pvs

# create physical volume with our partition.
pvcreate /dev/sdb1
```

Output: pvs

![pvs before creating](/assets/lvm_physical-vol-before-creating.png "Output: pvs (before creating new)")

Output after creating pv:

![lvm create pv](/assets/lvm_created_pv.png "output: pvcreate /dev/sdb1")

## create volume group



```shell
vgs

# create new volume group with our created physical volume
vgcreate <vg-name> /dev/sdb1

```

Output: vgs\
vgcreate <vg-name> /dev/sdb1

![lvm: create volume group](/assets/lvm_create_volumegroup.png "output: vgs, vgcreate")







## create logical volume

Now, we are going to create two logical volume, one with 2G and another with 3G size.

```shell
# list available logical volumes
lvs

# create new logical volume from our newly created vg
lvcreate -n <name> -L <size> <vg-name>
lvcreate -n primary-lv -L 2G test-vg

# create another lv from available memory
~~lvcreate -n secondary_lv -L 100%FREE test-vg~~

# don't know why it needs small l
lvcreate -n secondary_lv -l 100%FREE test-vg

lvs
```

**Caution**:

> **\-l :** is for specifying extent, like 50%, or 7 extent. \
> **\-L** : to extend the logical volume by specifying a specific size in units like bytes, kilobytes, megabytes, gigabytes, etc



![lvm create lvm](/assets/lvm_createlvm.png "Output: lvcreate")



## format both lvm with ext4

```shell
mkfs.ext4 /dev/test-vg/primary-test_lv

mkfs.ext4 /dev/test-vg/secondary-test_lv
```



![format lvm with ext4](/assets/pasted-image-20230818111919.png "Format lvm with ext4")



## mount created lvm





```shell

# create two directory to mount
mkdir /test-primary_storage
mkdir /test-secondary_storage

# check initial mounted file systems
df -hT

# mount created lv with mount point
mount <device> <mount-point>
mount /dev/test-vg/primary-test_lv /test-primary_storage
mount /dev/test-vg/secondary-test_lv /test-secondary_storage

# check if our mount is successfull
df -hT
```



![lvm mount lvms](/assets/lvm_mount-lvms.png "LVM mount lvms")



Still, this is not persistently saved. If we now reboot our system, these changes will not be reflected. For this to be implemented persistently, we need to make it persistent.

We will learn how to make this lvm persistent on our another article here.