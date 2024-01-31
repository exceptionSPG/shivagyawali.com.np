---
template: blog-post
title: Send data to views from Controller in Codeigniter
slug: send-data-to-views-from-controller-in-codeigniter
date: 2024-01-31 21:45
description: Codeigniter, kailaba, shiva gyawali, codeigniter data flow,
---
- - -

Read: [Codeigniter Installation, and template integration.](https://shivagyawali.com.np/step-by-step-guide-to-integrate-template-on-codeigniter-project)

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

   ```php
   <?php
   defined('BASEPATH') OR exit('No direct script access allowed');

   class Welcome extends CI_Controller {

     /*
     Other functions and code...
     
     */
     public function sendDataToView($name="Gyawali"){
         $data['nam'] = $name;
         $this->load->view('blog_article', $data);
     }
     
   }
   ```



   1. Here, We added argument to our function **sendDataToView(),** We may also not use argument, and directly send some data from within the function, or take some argument and pass that argument to the views. Whatever the use-case is, we must pass data to the view.

      One important thing to understand is, we can pass data in codeigniter as an **Associative Array.** Thus, We have to make one single Associative Array even though we have to send many more datas. ( We will shortly look into this in more depth.)

      So, here I have created an array, **data**,and used key to store name variable in **nam. Now, we can access this value ($name) from our views using the key we hold/stored in our Associative array.** That means, on our views, we will have access to the key of our array as a variable. 

      Still didn't get my point? Let's first see it. 

      Before moving to the views code, care the load view statement: **$this->load->view('blog_article', $data);** Here, We have sent our array name to the view **blog_article**.


   2. On the views: **blog_article.php**, change code so that we will display the name we receive from the controller:

      ```php
      <?php

      echo "Hello, $nam";
      ?>
      ```

      See, here we are directly accessing our Array's key-name to extract its value. Awesome.

      Let's refresh the page, and we will see ***Hello, Gyawali*** as we have sent **Gyawali** as a data from controller.