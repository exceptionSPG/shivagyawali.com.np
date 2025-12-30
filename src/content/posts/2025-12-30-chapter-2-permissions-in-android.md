---
template: blog-post
title: "Chapter 2: Permissions in Android"
slug: /blog/chapter-2-permissions-in-android
date: 2025-12-30 09:15
description: android security, android security internals, shiva gyawali,
  erasmus mundus, erasmus mundus motivation letter
---
In today's article, we are going to learn about Android Permissions.

We will cover:

* Nature of Permissions
* Requesting Permissions
* Permission Management
* Permission protection levels
* Permission Assignment
* Permission Enforcement

  * Kernel-level enforcement
  * Native Daemon-level enforcement
  * Framework-level enforcement
* System Permissions

  * Signature permissions
  * Development permissions
* Shared User ID
* Custom Permissions
* Public and Private Components
* Activity and Service Permissions
* Broadcast Permissions
* Content Provider permissions

  * Static Provider permission
  * Dynamic provider permission
* Pending Intents



## **Permission Assignment**

Higher-level components like applications and system services query package manager to determine which permissions have been assigned to an application and decide whether to grant access. Lower-level components like native daemons typically do not have access to the package manager and rely on the UID, GID, and supplementary GIDs assigned to a process in order to determine which privileges to grant it. Access to device files, unix domain sockets, network sockets are handle by kernel based on the owner and access mode of the target resource and the UID and GIDs of the accessing process. 

**Permissions and Process Attributes**

Package manager assigns an UID and GID to an app at the installation time and the app runs with it's unique UID, GID and dedicated process (as well as with suplimentary GIDs). Permissions in android is mapped as group ID, and If additional permissions have been assigned to the application, they are mapped to GIDs and assigned as supplementary GIDs to the process. 

We can view the assigned GIDs to an app by following command:

```
grep com.kailaba.asi_1 /data/system/packages.list
com.kailaba.asi_1 10177 1 /data/user/0/com.kailaba.asi_1 default:targetSdkVersion=36 3003 0 1 1 @null
```

Here, as described in Chapter 1 article, this app is provided with 3003 supplimentary GID. This corresponds to the INTERNET (INET group) permission. We have INTERNET permission defined in our AndroidManifest.xml file.



If we also add other permission, it will have other supplimentary GIDs.