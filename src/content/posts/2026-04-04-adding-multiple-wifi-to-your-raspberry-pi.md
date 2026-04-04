---
template: blog-post
title: "Adding multiple WiFi to your Raspberry pi "
slug: /blog/adding-multiple-wifi-to-your-raspberry-pi
date: 2026-04-04 18:03
description: "raspberry pi 5, raspberry pi, homelab, raspberry pi wifi, add wifi
  to raspberry pi, "
featuredImage: /assets/switched-to-new-profile.png
---
Bingoooooo, I got my first cutie Pi 5 running.... but, I burned the pi image in my USB with my friend's homenetwork, now I need to move my pi to my home. Do I again have to re-burn image changing wifi?



No, we can configure multiple wifi connection profile to our pi (at least once you got it running and have \`ssh\` connection). 

In this article, briefly, I will list down commands on how can you add multiple wifi connection profiles, and switch to new profile (without putting your current connection down).



```
nmcli
nmcli dev status #to check status of all interfaces
nmcli d wifi list
nmcli con  # Get the NAME of the WiFi connection
nmcli con down "connection_name_here"

sudo nmcli d wifi connect "ssid_here" password "password_here" ifname wlan1



nmcli device show #to show details of known devices
nmcli connection show # get an overview on active connection profiles.


#Add wifi connection profile
sudo nmcli connection add type wifi con-name "added-o2-24" ifname wlan0 ssid "o2-WLAN-2.4GHz-3BEE"

# modify password for just added connection profile
 sudo nmcli connection modify "added-o2-24" wifi-sec.key-mgmt wpa-psk wifi-sec.psk "YOUR_WIFI_PASSWORD"

# connect to new connection profile, without putting down the current one:
sudo nmcli connection up <con-name>

```



Few things to care here:

`con-name> : is reference for your pi, it need not be same as your SSID. For example, you can add same network multiple times with same/different credentials on different connection profile.

caution: Your SSH connection might hang when you change your wifi connection, as your pi might got different IP than through which you were connected to it. So, make sure that you will always get the IP to connect back with it again. 



For automatically adding few SSIDs connection profile, see my ansible playbook for this. 



Happy reading, happy homelabbing........:) merci!!