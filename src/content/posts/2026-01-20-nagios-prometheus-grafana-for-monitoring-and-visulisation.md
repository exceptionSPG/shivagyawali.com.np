---
template: blog-post
title: Nagios + Prometheus + Grafana for monitoring and visulisation
slug: /blog/nagios-prometheus-grafana-for-monitoring-and-visualisation
date: 2026-01-20 09:53
description: devops, devsecops, nagios, prometheus, grafana,
---
In today's article, we will deep-dive into the stack Nagios + Prometheus + Grafana to monitor and visualize time series data/statistics. 



# Environment setup

We will run our environment using docker (docker-compose in fact). 

For this, we will setup and run Nagios in a docker-compose as shown below:

```
volumes:
  nagios_data:
    driver: local

services:
  nagios:
    image: manios/nagios:latest
    privileged: true
    container_name: monitoring_nagios
    ports:
      - 8081:80
    restart: always
    volumes:
      - ./nagios/objects:/opt/nagios/etc/objects
      - ./nagios/nagios.cfg:/opt/nagios/etc/nagios.cfg
      - nagios_data:/opt/nagios/var/
    environment:
      - NAGIOSADMIN_USER=nagiosadmin
      - NAGIOSADMIN_PASS=nagiosadmin
      - NAGIOS_TIMEZONE=UTC
      - NAGIOS_WEB_USER=nagiosadmin
      - NAGIOS_WEB_PASS=nagiosadmin
```

Here, we are defining our container name as \`monitoring_nagios\`, which will expose to 8081 of our host machine (is mapped to 80 of the container). 

We need to setup some configuration files at first, and we are volume mounting these files, so that we can make changes from outside the container and additionally, the changes will persists and be saved to disk, instead of lost on restart or container destroy. 

So, create folder nagios/ which will have two things:

* nagios.cfg - main config file nagios runs with. we map this to \`/opt/nagios/etc/nagios.cfg\` of the container.
* objects - directory which will contain other objects config files, and is mapped to /opt/nagios/etc/objects directory of the container. 



After setting up these things, let's spin up our container:

\`docker-compose up -d\` 

This should start our container, confirm by:

\`docker ps\` or \`docker-compose ps\` 

Now, visit http://localhost:8081, and you shall see the nagios UI:



similarly, we run prometheus and grafana as shown below: