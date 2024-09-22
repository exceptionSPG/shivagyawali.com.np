---
template: blog-post
title: How to host domain of one service provider to another service provider
slug: /add-dns-record-of-one-service-providers-to-another-service-provider
date: 2024-09-22 18:20
description: Hosting, website hosting, ionos hosting, bluehost hosting
featuredImage: /assets/3_dns_record_details.png
---
In this aticle, we will see how to host domain registered in one service providers (for example, [IONOS](https://ionos.co.uk)) to another service provider (eg. [Bluehost](https://www.bluehost.com)).

## Adding domain in your bluehost hosting:

Firstly, Go to your bluehost account, and click on Add site:

![Add site bluehost](/assets/0_bluehost-add-site.png "Bluehost Add Site")

Add your domain, enter the necessary details. 

## Viewing/Accessing DNS information in Bluehost:

Now, click on your added website in our first step. Then, under Domains tab, you will see **DNS Status** : *Finish Setup*.

![Bluehost: domains tab for DNS status - finish setup](/assets/1_showing-bluehost.png "Bluehost: domains tab for DNS status - finish setup")

Click on Finish Setup button, it will leads you to Site Settings page, where you will see nameservers to update on your domain registrar service provider (namely, [IONOS](https://ionos.co.uk) in our case)

But, down below, you will see "***Or try connecting with a DNS A Record***" link. Click on that:

![Bluehost: Site settings - Or try connecting with a DNS A Record](/assets/2_try_dns_records.png "Bluehost: Site settings - Or try connecting with a DNS A Record")

There, you will find the necessary information on what records you need to update on your domain registrar dns records. 

![Bluehost: Site settings - DNS information](/assets/3_dns_record_details.png "Bluehost: Site settings - DNS information")

Copy your new A record address, then head over to your domain registrar service provider (in our case, IONOS).

## Finding DNS setting for your domain in IONOS

Now, we just need to update our DNS record in the domain registrant service provider's dns setting, so that we can successfully host our thing in another service provider. For this, go to IONOS account, and under **MENU**, choose ***Domains and SSLs***. 

From the list of your domains, click on 3 dots (...) and click on DNS

![IONOS finding DNS settings](/assets/4_ionos_find_dns.png "IONOS finding DNS settings")

Bangg, you got your dns settings for the domain. Go to the DNS tab.

## Updating the DNS A-record

Now its the time to edit our existing A-record and update field value with copied A-record address from Bluehost (hosting service provider) we obtained from our second step. 

Click on edit icon there and just paste the IP address copied, and save the changes.

![IONOS updating A record](/assets/5_dns_record_a_ionos.png "IONOS updating A record")

I hope this article helps you on setting up your hosting service in different hosting provider, along with keeping all domain registered in one service provider. 

If you want to connect your cloudflare website to your github website, watch below video:



<iframe width="560" height="315" src="https://www.youtube.com/embed/LcQZs6ii2Zk?si=upIzyfn0idyN-_mO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>