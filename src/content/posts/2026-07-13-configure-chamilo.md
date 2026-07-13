---
template: blog-post
title: "Configure Chamilo "
slug: /blog/advanced-configuration-chamilo-lms
date: 2026-07-13 21:12
description: "chamilo, LMS, "
featuredImage: /assets/app-config.php.png
category: Self-Hosting
tags:
  - chamilo
  - lms
  - kailaba
  - ""
---
 [Kailaba for Student ](https://student.kailaba.com), is self-hosted [Chamilo project.](https://chamilo.org/en/)  However, We need to configure it sometimes to respect with our personal requirements. 

One of such, was to add custom (required) field on user registration. As We were doing some kind of collaboration with other creators, I wanted to have some kind of tracing mechanism, to actually know, who came from whose referral. 

I was successful on adding custom field, however, to make it "required", it took a bit of effort. Voila, the lazy me, didn't documented it earlier, and hence, upgrade to Chamilo 1.11.38 overwrote my earlier custom changes. 

Again, I had to search through my documentation notion notes, hoping I might have documented it, but no, hell, yeah, no. 

So, let me put it here for myself.



Buddy, next time, go to app/config/configuration.php and find this section, which will be commented initially,

```
// Set extra fields as required in the inscription.php page */
$_configuration['required_extra_fields_in_inscription'] = [
    'options' => [
        'sharemltoothers',
        'linkedin_url',
    ],
];

```

and then, add the labels of your extra field, as shown in Administration --> Profiling --> 

eg: <https://student.kailaba.com/main/admin/extra_fields.php?type=user>

![](/assets/extra-field-labels.png)



If you are Erasmus Mundus enthusiast, and would love me to help you reviewing your Motivation Letter and CV, then, definitely, check out <https://student.kailaba.com>



Thanks for reading!!
