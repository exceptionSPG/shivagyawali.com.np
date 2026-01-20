---
template: blog-post
title: Installing Ansible on MacOS
slug: /blog/installing-ansible-on-macos
date: 2025-10-07 18:46
description: "ansible, configuration management, devops, "
---




Install ansible using HomeBrew:

\`brew install ansible\`



Verify installation by:

`ansible --version'

It shows:

![](/assets/1-installation.png)



```
ansible --version
ansible [core 2.20.1]
  config file = None
  configured module search path = ['/Users/exceptionspg/.ansible/plugins/modules', '/usr/share/ansible/plugins/modules']
  ansible python module location = /opt/homebrew/Cellar/ansible/13.2.0_3/libexec/lib/python3.14/site-packages/ansible
  ansible collection location = /Users/exceptionspg/.ansible/collections:/usr/share/ansible/collections
  executable location = /opt/homebrew/bin/ansible
  python version = 3.14.2 (main, Dec  5 2025, 16:49:16) [Clang 17.0.0 (clang-1700.4.4.1)] (/opt/homebrew/Cellar/ansible/13.2.0_3/libexec/bin/python)
  jinja version = 3.1.6
  pyyaml version = 6.0.3 (with libyaml v0.2.5)
```

So, we don't have any configuration file. 

Let's generate the default configuration file: ([Check more here](https://docs.ansible.com/projects/ansible/latest/installation_guide/intro_configuration.html#getting-the-latest-configuration).)

```
ansible-config init --disabled -t all > ~/.ansible/ansible.cfg

OR,
ansible-config init --disabled > ~/.ansible/ansible.cfg
```

After generating config file, let's again check the version:

![](/assets/2-config-file.png)

```
ansible --version
ansible [core 2.20.1]
  config file = /Users/exceptionspg/.ansible/ansible.cfg
  configured module search path = ['/Users/exceptionspg/.ansible/plugins/modules', '/usr/share/ansible/plugins/modules']
  ansible python module location = /opt/homebrew/Cellar/ansible/13.2.0_3/libexec/lib/python3.14/site-packages/ansible
  ansible collection location = /Users/exceptionspg/.ansible/collections:/usr/share/ansible/collections
  executable location = /opt/homebrew/bin/ansible
  python version = 3.14.2 (main, Dec  5 2025, 16:49:16) [Clang 17.0.0 (clang-1700.4.4.1)] (/opt/homebrew/Cellar/ansible/13.2.0_3/libexec/bin/python)
  jinja version = 3.1.6
  pyyaml version = 6.0.3 (with libyaml v0.2.5)
```

It shows our config file.