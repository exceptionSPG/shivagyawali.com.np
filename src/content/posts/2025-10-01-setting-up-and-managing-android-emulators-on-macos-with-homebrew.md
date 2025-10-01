---
template: blog-post
title: Setting Up and Managing Android Emulators on macOS with Homebrew
slug: /blog/setting-up-and-running-android-emulators-in-macos
date: 2025-10-01 15:05
description: android emulator, macos android, emulators in mac
---


## Install homebrew

## **Step 2: Install Android Command Line Tools**

```bash
brew install --cask android-commandlinetools
```

## **Step 3: Set Up Environment Variables**

Add these lines in `~/.zshrc` 

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$PATH
export PATH=$ANDROID_HOME/emulator:$PATH
export PATH=$ANDROID_HOME/platform-tools:$PATH

```

## **Step 4: Download Required System Images**

```bash
sdkmanager "platform-tools" "emulator" "platforms;android-34" "system-images;android-34;google_apis_playstore;arm64-v8a"
```

## **Step 5: Create an AVD**

```bash
avdmanager create avd -n Pixel_6_Pro_API_34_PlayStore_ARM -k "system-images;android-34;google_apis_playstore;arm64-v8a" --device "pixel_6_pro"
```

## **Step 6: List Available AVDs**

```bash
avdmanager list avd

Available Android Virtual Devices:
    Name: Pixel_6_Pro_API_34_PlayStore_ARM
  Device: pixel_6_pro (Google)
    Path: /Users/yourusername/.android/avd/Pixel_6_Pro_API_34_PlayStore_ARM.avd
  Target: Google Play (Google Inc.)
          Based on: Android API 34 Tag/ABI: google_apis_playstore/arm64-v8a
  Sdcard: 512 MB
  
```

## **Step 7: Run the Emulator**

```bash
emulator -avd Pixel_6_Pro_API_34_PlayStore_ARM -gpu on -skin 1440x3120
```

## **Step 8: Remove Unused AVDs**

```bash
avdmanager list avd

avdmanager delete avd -n Pixel_6_Pro_API_34
avdmanager delete avd -n Pixel_6_Pro_API_34_PlayStore
```