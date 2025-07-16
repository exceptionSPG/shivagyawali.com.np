---
template: blog-post
title: "Connect colab to local jupyter runtime "
slug: /blog/connect-colab-to-local-jupyter-runtime
date: 2025-07-16 19:09
description: jupyter notebook, colab, local runtime,
featuredImage: /assets/terminal-blocking-output.png
---
Hey champions, Let's quickly dive into how we can connect our local jupyter runtime to colab notebook.

First, let's setup our environment. install jupyter_http_over_ws package by 

`pip install jupyter_http_over_ws`

Then, enable it by:

`jupyter server extension enable --py jupyter_http_over_ws`

Start jupyter notebook by following command:

`jupyter notebook --NotebookApp.allow_origin='https://colab.research.google.com' --port=8888 --NotebookApp.port_retries=0 --NotebookApp.token='mytoken' &`

This will set our token as 'mytoken'.

![](/assets/server-started-with-token.png)

Now, head over to colab, then click on Connect to Local runtime:

![](/assets/connect-to-local-colab1.png)

Then, enter the link as shown.

![](/assets/connect-to-loca-colab1.png)



If you try to connect without a token, or a wrong token, then it won't connect and shows following error:

![](/assets/terminal-blocking-output.png)