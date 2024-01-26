---
template: blog-post
title: Step by Step guide to integrate template on Codeigniter Project
slug: step-by-step-guide-to-integrate-template-on-codeigniter-project
date: 2024-01-26 12:31
description: codeigniter, codeigniter3, integrate template in codeigniter
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

1. Copy index.html from template to codeigniter-starter/application/views/index.html
2. Copy css, js, images, and fonts directories from template to codeigniter-starter/ directory.
3. Modify Controller code to load index.html

   ```
   .
   .
   .
   public function index(){
     $this->load->view('index.html');
   }
   ```
4. Now visit your site: http://localhost/codeigniter-starter. You will see your template being shown on instead of codeigniter welcome page.

   ![Codeigniter loading template](/assets/codeigniter-template-load.png "Boom: Our template is loaded under codeigniter")


5.