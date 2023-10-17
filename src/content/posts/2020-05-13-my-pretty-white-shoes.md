---
template: blog-post
title: accessing google sheet from python
slug: /accessing-google-sheets-from-python
date: 2023-10-17 12:55
description: |-
  How to access google sheets using python? 
  python gspread package.
featuredImage: /assets/fredrick-tendong-hvyepjyehdq-unsplash.jpg
---
# Accessing google sheet from python

In this article, we will be accessing google sheet from python code.

Firstly, create service account by following:

1. Go to <https://console.developers.google.com/> and create new or select existing project

![Google api console search](/assets/untitled.png)

![Google sheets api](/assets/untitled-1.png)

Also enable Google Drive Api following the same above steps.

## Creating service account credentials

1. Go to Credentials, Create Credentials

   ![Untitled](/assets/untitled-5.png)
2. Choose Service Account:

   ![Untitled](/assets/untitled-3.png)
3. Give service account name, and description. You can skip all other optional things.

   ![Untitled](/assets/untitled-4.png)
4. Press “Manage service accounts” above Service Accounts.
5. Press on **⋮** near recently created service account and select “Manage keys” and then click on “ADD KEY > Create new key”.

![Untitled](/assets/untitled-5.png)

1. Select JSON key type and press “Create”.

![Untitled](/assets/untitled-6.png)

This will automatically downloads the json key file to your computer.

Now, move to your working directory.

```python
#Create virtual-env:
python -m venv googlesheets-env

#Activate the virtual env
source googlesheets-env/bin/activate
# install gspread package
pip install gspread

# Now we are ready to go.
```

Awww, before moving ahead, Go to <https://docs.google.com/spreadsheets/u/0/> and create new spreadsheets.

Give it a name, python-script.

Open downloaded json file, it has **client_email** entry. Share the created spreadsheet with the client_email in the downloaded json, as shown.

![Untitled](/assets/untitled-7.png)

![Untitled](/assets/untitled-8.png)

Bangg, now write Hello world on cell A1.

![Untitled](/assets/untitled-9.png)

let’s Access this cell content from python. Write below code as hello.py:

```python
import gspread

gc = gspread.service_account(filename="path/to/downloaded/json/service_account.json")

sh = gc.open("python-script")

print(sh.sheet1.get('A1'))
```

run it as python hello.py

This will output as:

![Untitled](/assets/untitled-10.png)



This way, we can access our sheets from python code and do some tasks automatically.



We will be doing some more cool stuffs. Stay connected.