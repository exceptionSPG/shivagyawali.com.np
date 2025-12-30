---
template: blog-post
title: "Chapter 1: Android Security Model"
slug: /blog/chapter-1-android-security-model
date: 2025-12-29 14:51
description: android security, android security internals, android security
  model, shiva gyawali, erasmus mundus, erasmus mundus motivation letter
featuredImage: /assets/1_architecture.png
---
In this article, we will see:

* Android architecture

  * Linux kernel
  * Native userspace
  * Dalvik VM
  * Java Runtime Libraries
  * System Services
  * Inter process communication
  * Binder
  * Android Framework libraries
  * System and User-installed applications
* Android's security model

  * Application Sandboxing
  * Permissions
  * IPC
  * Code signing and Platform keys
  * Multi-User support
  * SELinux
  * System Updates
  * Verified Boot

Below diagram shows high-level architecture of Android ecosystem:

![Android Architecture](/assets/1_architecture.png "Figure: Android ecosystem architecture")



1. Linux Kernel

   Android is built on top of the Linux kernel. It is supported by **Android Mainlining Project**.  Android kernel is slightly different from a “regular” Linux kernel due to the addition of a set of new features to support Android. These added new features are collectively known as **Androidisms**. Some of the main Androidisms are the low memory killer, wakelocks (integrated as part of wakeup sources support in the mainline Linux kernel), anonymous shared memory (ashmem), alarms, paranoid networking, and Binder. 


2. Native Userspaces (Init, Native Daemons, Native Libraries, and HAL)

   On top of Linux kernel are the init binary (the first process started, that starts all other processes), native daemons and native libraries. It also consists of Hardware Abstraction Layer (HAL) that Mediates between hardware drivers and higher-level APIs. Native Libraries are written in C/C++ and provides functionalities like WebKit, SQLite. 


3. Dalvik VM