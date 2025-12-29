---
template: blog-post
title: "Android Security Internals #0: Introduction"
slug: /blog/android-security-internals-0-introduction
date: 2025-09-18 11:19
description: "android security, android framework, "
---
I am following the book "Android Security Internals" to understand the depth of android security and it's security model. I will write chapter-wise summary/understanding here for my future reference and to share with the community.

This is first article in the series, and here I link to other articles and my aproach in learning.

Android powers billions of devices, and more than 71% of smarphones. 

Interacting with android device via `adb` : 

* Download [SDK platform tools here](https://developer.android.com/tools/releases/platform-tools#downloads).
* Then, unzip and open the enclosing folder in terminal. 
* execute `./adb`  you will see list of ADB commands. 

Execute ./adb devices to see the list of devices.

Execute ./adb shell to open shell.



[Chapter 1: Introduction to Android Security Model](https://shivagyawali.com.np/blog/chapter-1-android-security-model)

Chapter 2: Android Permissions