---
template: blog-post
title: creating virtual env and installing jupyter notebook
slug: creating-virtual-env-and-installing-jupyter-notebook
date: 2024-09-12 08:21
description: Python, jupyter notebook, python virtual env
---
Here, in this article, we will create one virtual env and install jupter notebook in it.



Let's begin with installing pythong virtual env package:



```
# Replace "lab-env" with the name you want for your environment
virtualenv lab-env
```



# Step 4: Activate the Virtual Environment

* On Windows, activate the environment with:

```
myenv\Scripts\activate
```

On MacOS and Linux, activate the environment with:

```
source myenv/bin/activate
```



# Step 5: Install Jupyter

While in your virtual environment, install Jupyter:

```
pip install jupyter
```

# Step 6: Install Kernel (within the virtual environment)

You will need to install the IPython kernel in your virtual environment to use it with Jupyter.

```
pip install ipython
pip install ipykernel
```

Replace `lab-env` with the name you want for your Jupyter kernel.



# Step 7: Start Jupyter Notebook

While still in your virtual environment, start Jupyter Notebook:

```
jupyter notebook
```

# Step 8: Select the Virtual Environment Kernel in Jupyter

1. Open a browser window with the Jupyter interface.
2. Navigate to the notebook or create a new one.
3. Click on the “Kernel” menu.
4. Choose “Change Kernel” and select the virtual environment kernel you created (in this case, it will be named “myenv”).

Now, your Jupyter notebook will be using the Python environment from your virtual environment.



# Step 9: Deactivate the Virtual Environment

When you’re finished working in your virtual environment, you can deactivate it by running:

```
deactivate
```

Remember, you’ll need to activate the environment again before using it in the future.