---
template: blog-post
title: Send data to views from Controller in Codeigniter
slug: send-data-to-views-from-controller-in-codeigniter
date: 2024-01-31 21:45
description: Codeigniter, kailaba, shiva gyawali, codeigniter data flow,
---
- - -

Read: Codeigniter Installation, and template integration.

- - -

In this article, we are going to see how we can send data from our Controllers to views.

This is essential concept to learn, as this will be foundation for our complex projects. Simple understanding of MVC implementation in any type of languages or framework (laravel, django, etc.) will work in similar fashion. Thus, Our Controller will be the acting member to flow data from our databases (models) to our views, and vice-versa.

Step-by-step guides for sending data from views:

1. Create a view in **application/views/myview.php:**

   ```php
   <?php

   echo "Hello, Shiva";
   ?>
   ```
2. Create a function in **application/controllers/Welcome.php** Controller:

   ```php
   <?php
   defined('BASEPATH') OR exit('No direct script access allowed');

   class Welcome extends CI_Controller {

     /*
     Other functions and code...
     
     */
     public function sendDataToView(){

         $this->load->view('blog_article');
     }
     
   }
   ```
3. Now visit the url as **<base-url>/index.php/Welcome/sendDataToView**

   ![echo Hello shiva](/assets/echo-hello-shiva.png "Our current views in browser")
4. Now, go to our Controller, and change the function **sendDataToView** and send some data to the view.