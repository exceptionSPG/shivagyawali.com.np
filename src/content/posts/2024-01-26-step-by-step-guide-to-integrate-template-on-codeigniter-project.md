---
template: blog-post
title: Step by Step guide to integrate template on Codeigniter Project
slug: step-by-step-guide-to-integrate-template-on-codeigniter-project
date: 2024-01-26 12:31
description: codeigniter, codeigniter3, integrate template in codeigniter
featuredImage: /assets/codeigniter-header-footer.png
---
Hi guys,

In this tutorial, I am guiding you to integrate any template to Codeigniter project. For this article, We will use NOVA Template. Please download it.

## Codeigniter download and install

Download Codeigniter starter project from [Codeigniter download page.](https://codeigniter.com/userguide3/installation/downloads.html) We will be using [Codeigniter3.1.10](https://codeload.github.com/bcit-ci/CodeIgniter/zip/3.1.10)

Download it, extract, and place under **/var/www/html/codeigniter-starter** Or C://xampp/htdocs/codeigniter-starter/

After extracting, you can visit **http://localhost/codeigniter-starter/,** You will see the page looks like below:

![Codeigniter starter](/assets/codeigniter-starter-webbrowser.png "Codeigniter starter output")

Now we are ready to go.

Open the codeigniter-starter folder in vscode.

```
cd /var/www/html/codeigniter-starter
# open the codeigniter-starter folder in vscode.
code .
```

### Directory and Files Hierarcy overview

Codeigniter has its own unique way of implementing MVC framework. It has following directory and files heirarchy:

![Codeigniter files and directories.](/assets/codeig-files.png "Directories and files in Codeigniter")

There are many files under these folders. However, mainly we will work in application directory and its subdirectory. Some important files under these directory are shown in the above diagram.

### MVC implementation in Codeigniter

// TODO: include mvc implementation approach in codeigniter

## Download Template

Download the [NOVA Project from here.](https://drive.google.com/file/d/1GKmlSR8NJkkSJVCm76xcuwBBTusKsohl/view?usp=sharing) Extract it and open it in vscode in new window.

## Step-by-Step procedure:

Here is the TODO List:

1. Copy **index.html** from template to **codeigniter-starter/application/views/index.html**
2. Copy **css, js, images, and fonts directories** from template to **codeigniter-starter/ directory**.
3. Modify Controller code (**application/controllers/Welcome.php**) to load index.html

   ```
   .
   .
   .
   public function index(){
     $this->load->view('index.html');
   }
   ```
4. Now visit your site: **http://localhost/codeigniter-starter.** You will see your template being shown on instead of codeigniter welcome page.

   ![Codeigniter loading template](/assets/codeigniter-template-load.png "Boom: Our template is loaded under codeigniter")
5. Now we have to refactor our code, so that we can separate our common part from the template.

   Since, our header and footer part is common to all the pages, we can paste them in separate file, which we can reuse in all of our pages.

   1. Create include directory inside **application/views/ on vscode** 
   2. Create files: **header.php, and footer.php**
   3. Copy below code, and paste in respective file from **views/index.html:**

      **header.php**

      ```
      <!DOCTYPE html>
      <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
      <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
      <!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
      <!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
      <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
          <title>Home | Nova</title>
          <meta name="description" content="">
          <meta name="viewport" content="width=device-width">

          <link rel="stylesheet" href="css/bootstrap.min.css">
          <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
          <link rel="stylesheet" href="css/font-awesome.min.css">
          <link rel="stylesheet" href="css/main.css">
          <link rel="stylesheet" href="css/sl-slide.css">

          <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>

          <!-- Le fav and touch icons -->
          <link rel="shortcut icon" href="images/ico/favicon.ico">
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="images/ico/apple-touch-icon-144-precomposed.png">
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="images/ico/apple-touch-icon-114-precomposed.png">
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/ico/apple-touch-icon-72-precomposed.png">
          <link rel="apple-touch-icon-precomposed" href="images/ico/apple-touch-icon-57-precomposed.png">
      </head>

      <body>

          <!--Header-->
          <header class="navbar navbar-fixed-top">
              <div class="navbar-inner">
                  <div class="container">
                      <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                      </a>
                      <a id="logo" class="pull-left" href="index.html"></a>
                      <div class="nav-collapse collapse pull-right">
                          <ul class="nav">
                              <li class="active"><a href="index.html">Home</a></li>
                              <li><a href="about-us.html">About Us</a></li>
                              <li><a href="services.html">Services</a></li>
                              <li><a href="portfolio.html">Portfolio</a></li>
                              <li class="dropdown">
                                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">Pages <i class="icon-angle-down"></i></a>
                                  <ul class="dropdown-menu">
                                      <li><a href="career.html">Career</a></li>
                                      <li><a href="blog-item.html">Blog Single</a></li>
                                      <li><a href="faq.html">FAQ</a></li>
                                      <li><a href="pricing.html">Pricing</a></li>
                                      <li><a href="404.html">404</a></li>
                                      <li><a href="typography.html">Typography</a></li>
                                      <li><a href="registration.html">Registration</a></li>
                                      <li class="divider"></li>
                                      <li><a href="privacy.html">Privacy Policy</a></li>
                                      <li><a href="terms.html">Terms of Use</a></li>
                                  </ul>
                              </li>
                              <li><a href="blog.html">Blog</a></li> 
                              <li><a href="contact-us.html">Contact</a></li>
                              <li class="login">
                                  <a data-toggle="modal" href="#loginForm"><i class="icon-lock"></i></a>
                              </li>
                          </ul>        
                      </div><!--/.nav-collapse -->
                  </div>
              </div>
          </header>
          <!-- /header -->
      ```

      **footer.php**

      ```
      <!--Footer-->
      <footer id="footer">
          <div class="container">
              <div class="row-fluid">
                  <div class="span5 cp">
                      &copy; 2013 <a target="_blank" href="http://shapebootstrap.net/" title="Free Twitter Bootstrap WordPress Themes and HTML templates">ShapeBootstrap</a>. All Rights Reserved.
                  </div>
                  <!--/Copyright-->

                  <div class="span6">
                      <ul class="social pull-right">
                          <li><a href="#"><i class="icon-facebook"></i></a></li>
                          <li><a href="#"><i class="icon-twitter"></i></a></li>
                          <li><a href="#"><i class="icon-pinterest"></i></a></li>
                          <li><a href="#"><i class="icon-linkedin"></i></a></li>
                          <li><a href="#"><i class="icon-google-plus"></i></a></li>                       
                          <li><a href="#"><i class="icon-youtube"></i></a></li>
                          <li><a href="#"><i class="icon-tumblr"></i></a></li>                        
                          <li><a href="#"><i class="icon-dribbble"></i></a></li>
                          <li><a href="#"><i class="icon-rss"></i></a></li>
                          <li><a href="#"><i class="icon-github-alt"></i></a></li>
                          <li><a href="#"><i class="icon-instagram"></i></a></li>                   
                      </ul>
                  </div>

                  <div class="span1">
                      <a id="gototop" class="gototop pull-right" href="#"><i class="icon-angle-up"></i></a>
                  </div>
                  <!--/Goto Top-->
              </div>
          </div>
      </footer>
      <!--/Footer-->

      <!--  Login form -->
      <div class="modal hide fade in" id="loginForm" aria-hidden="false">
          <div class="modal-header">
              <i class="icon-remove" data-dismiss="modal" aria-hidden="true"></i>
              <h4>Login Form</h4>
          </div>
          <!--Modal Body-->
          <div class="modal-body">
              <form class="form-inline" action="index.html" method="post" id="form-login">
                  <input type="text" class="input-small" placeholder="Email">
                  <input type="password" class="input-small" placeholder="Password">
                  <label class="checkbox">
                      <input type="checkbox"> Remember me
                  </label>
                  <button type="submit" class="btn btn-primary">Sign in</button>
              </form>
              <a href="#">Forgot your password?</a>
          </div>
          <!--/Modal Body-->
      </div>
      <!--  /Login form -->

      <script src="js/vendor/jquery-1.9.1.min.js"></script>
      <script src="js/vendor/bootstrap.min.js"></script>
      <script src="js/main.js"></script>
      <!-- Required javascript files for Slider -->
      <script src="js/jquery.ba-cond.min.js"></script>
      <script src="js/jquery.slitslider.js"></script>
      <!-- /Required javascript files for Slider -->

      <!-- SL Slider -->
      <script type="text/javascript"> 
      $(function() {
          var Page = (function() {

              var $navArrows = $( '#nav-arrows' ),
              slitslider = $( '#slider' ).slitslider( {
                  autoplay : true
              } ),

              init = function() {
                  initEvents();
              },
              initEvents = function() {
                  $navArrows.children( ':last' ).on( 'click', function() {
                      slitslider.next();
                      return false;
                  });

                  $navArrows.children( ':first' ).on( 'click', function() {
                      slitslider.previous();
                      return false;
                  });
              };

              return { init : init };

          })();

          Page.init();
      });
      </script>
      <!-- /SL Slider -->
      </body>
      </html>
      ```
   4. Modify the Controller (**application/controllers/Welcome.php**) to load these header and footer, placing our welcome message page in-between header and footer:

      ```php
      	public function index()
      	{
      		$this->load->view('include/header.php');
      		$this->load->view('welcome_message');
      		$this->load->view('include/footer.php');
      	}
      ```
   5. visit the **http://localhost/codeigniter-starter** you will see below:

      ![Codeigniter header footer separated](/assets/create2.png "Boom: our welcome message with out template's header and footer.")
6. Now, we are bang. Till now, everything is great. However, still we have to organize our css, js, images, and fonts files. We have placed them directly on root folder. 

   1. Create assets directory in our root directory.
   2. Move all css, js, images, and fonts folder into the assets folder. So our directory tree looks like:

      ```
      .
      ├── application
      │   ├── cache
      │   ├── config
      │   ├── controllers
      │   ├── core
      │   ├── helpers
      │   ├── hooks
      │   ├── language
      │   ├── libraries
      │   ├── logs
      │   ├── models
      │   ├── third_party
      │   └── views
      ├── assets
      │   ├── css
      │   ├── font
      │   ├── images
      │   └── js
      ```

      Note: use this command to see these tree structure:

      ```
      tree -L 2 -P "application assets"
      ```
   3. Now, we need to give appropriate path to our resources. So, First we need to configure some useful configurations:

      1. Go to application/config/config.php and at line 26, set up your base-url. For this article, my base_url is: $config\['base_url'] = 'http://localhost/codeigniter-starter/';

         ```
         $config['base_url'] = 'http://localhost/codeigniter-starter/
         ```
      2. Go to application/config/autoload.php at line 92, we need to load [URL Helper library](https://codeigniter.com/userguide3/helpers/url_helper.html).

         ```
         $autoload['helper'] = array('url');
         ```
      3. Now, add below correct path to every anchor tag, href value:

         ```
         // We need to put these code just before current path:
         <?php echo base_url(); ?>assets/

         //Some examples

             <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/bootstrap.min.css">
             <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/bootstrap-responsive.min.css">
             <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/font-awesome.min.css">
             <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/main.css">
             <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/sl-slide.css">
         ```

         Do this for all the href values in header and footer file.
      4. Now we resolved all the path for our resources. Now, re-visit and refresh our website. You will see everything as working fine.
7. This way, we can integrate any theme/template in our codeigniter project. 

I Hope this helps you. Thank you for reading. Happy learning :)