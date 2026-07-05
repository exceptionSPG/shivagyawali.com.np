---
template: homelab-post
title: Tailscale on Android 6.0 - Shiva Gyawali
slug: /homelab/tailscale-on-android-6
date: 2026-07-05 09:20
description: homelab, tailscale, android vpn
featuredImage: /assets/tailscale-android.jpg
category: Android
tags:
  - homelab
  - android-vpn
  - tailscale
---
I have Alcatel A3 5046U android device, very old, doesn't have Type-C charging port, neither supports ADB connection over wifi, and is running Android 6.0. 



I got a bizarre idea of converting this old guy into my exit node for Tailscale VPN setup, thus, I could just let it be anywhere and I can browse internet through it. (I tried installing directly the Tailscale client on Router -- but hell no). 



Lol, even funnier is, I just found out that I couldn't even connect to my phone HotSpot network on this device as Wifi. My University WAN wasn't working since 3-days. Out of frustration, I remembered accidentally looking one 'google-term' that people were searching for "how to access internet via bluetooth". I did remember this well, because at that very moment, I thought, "What? You can browse internet through bluetooth? niceee". Because, I had only shared files via bluetooth. 



Lol, it would than allow me to connect to internet via wifi even on those devices which doesn't have wifi in it (eg. Nokia 5300 model -- luckily, my first phone ;) and yes, I do still miss those days ).

Anyway, no, you can't connect to internet via Bluetooth on all-kinds of devices. The device itself also needs to support "Use for Internet" options on it's Bluetooth setting. 

![](/assets/bluetooth-intent.jpg)

Good, at least my Alcatel A3 supports Bluetooth Internet. Hence, I now can internet on it. 



Next, to install Tailscale Android Client. Woof, [official Tailscale Android ](https://github.com/tailscale/tailscale-android)only support Android 8.0 or later. Anyway, I duckducked any way to have Tailscale client on Android 6.0, there were few discussions - [\#1,](https://github.com/tailscale/tailscale/issues/13045) [\#2](https://github.com/termux/termux-packages/issues/10166),  but none helped me. So, best way for me would be to find older version of Tailscale Android client natively supported for Android 6.0. 

I got one [here](https://tailscale.en.uptodown.com/android/download/1012269734-x). I browsed internet from my Bluetooth tethering, and then downloaded the earliest version that supports android 5.1+, for me it [was](https://tailscale.en.uptodown.com/android/download/1012269734-x) (
