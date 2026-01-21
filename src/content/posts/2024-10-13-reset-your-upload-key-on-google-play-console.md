---
template: blog-post
title: Reset your upload key on Google Play Console
slug: /blog/reset-your-upload-key-on-google-play-console
date: 2024-10-13 23:32
description: >-
  android development, google play console, upload key reset, android app
  update, google play console reset upload key,

  request upload key reset,

  reset keystore google play,

  there is a pending request for resetting the upload key of this app,

  google play console keystore,

  reset upload key google play console,

  google play console reset upload key play app signing,

  request upload key reset google play console,

  lost keystore file google play,

  reset upload key play console,

  reset upload key google play,

  google play console request upload key reset,

  reset upload key play console help,

  reset upload key play console support,

  reset your upload key play console help,
featuredImage: /assets/play-console-request.png
---
Dear all, 

Do you have an app published on google play store? And, you want to push a new update to your users?

We need to sign our app with our upload key (keystore) and upload it to the store. However, while working on new release of [EL Computer](https://play.google.com/store/apps/details?id=com.kailaba.computer), I came to realize that I have lost my upload key. And, here is how I reset it on play console.

You need to follow below steps:

1. Go to your google play console, under Setup >> App Signing, scroll down to: Request upload key reset, click reset.
2. It shows the radio boxes for the reason to request reset. Choose your case. For me, it was: I lost my upload key.
3. Then, generate your new keystore by running:

   `keytool -genkey -v -keystore upload.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias upload`

   Note: set strong password upon prompting for password, and remember it. Use the same password for keyPassword and storePassword. This command outputs a .jks or .keystore file, which is java key store.

   ![Generating upload key](/assets/generating-upload-jks.png "Generating keystore file for android app signing.")
4. Then, generate your .pem file using the keystore file just created:

   `keytool -export -rfc -keystore upload.keystore -alias upload -file upload_certificate_elcomputer.pem`

   Upon prompt for password, enter the same password you set on step 3.

   ![Creating .pem file from keystore file.](/assets/make-pem-file.png "Generating .pem file from .keystore file.")
5. Upload this .pem file to the google play console. Then, click on send request. 



Congratulations!! You successfully sent your request to reset your upload key. They will review your request and update your new upload key in 2-3 business days. Before validating or approval, we can't upload app bundles signed with this. Hence, wait till it is approved.



I host my websites using babal host service. If you are looking for efficient hosting, I genuinely recommend based on my own experience:



<a href="https://clients.babal.host/aff.php?aff=537&gocart=true"><img src="https://babal.host/img/affiliate/970x90LargeLeaderboard.png" width="970" height="90" border="0"></a>