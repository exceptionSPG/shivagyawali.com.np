---
template: blog-post
title: shhhhhh! I show you how to see Azure Key Vault's secret from Azure Devops
  Pipeline
slug: /blog/how-to-view-azure-key-vault-secret-from-azure-devops-pipeline
date: 2026-06-22 20:07
description: "azure, azure devops, azure key vault, azure devops pipeline, cicd pipeline, "
featuredImage: /assets/tara-yo-kura-kasailai-navannu-ni-feri.gif
---
No, nana, your pipeline sucks!!

"Unauthorized. The secrets MyDummyKey: \*\*\*\* is expired."

You know by heart the secret it is complaining, is working fine, it isn't expired, and so it msut work well. It worked on your terminal, so does it have to work on pipeline too ;)



Often time, we encounter the moments where we need to debug failed pipelines, build failures and so on. Specially, I had been encountered such scenario where pipeline fails with error message saying 'your key \*\** is expired', while I know, it is not expired. So, you want to see, what values it is fetching from Azure Key Vaults?

But, But, But, What?

Azure, Microsoft (as my friend says, it's shit), won't let you see the secrets values. Why? obvious reason bro, it's secret....ssshhhhhhh (BTW, text in featured image says, "I am telling you this, BUT, Don't tell this thing to anyone, please/svp/...)

I got you. I accidentally, exposed the SECRETS fetched from Azure Key Vault by my pipeline. Cool, I am afraid that if Microsoft came to know about this secret, they might fix it and let us suffer again. Anyway, too much talk (that's what I do, apparently), let's see it in action.



Pre-requisite/ Assumptions:

* Azure subscription with Key vaults having some secrets to fetch
* Azure Devops Organization --> Projects
* Service Connection to connect to Azure Key Vault
* Curiosity to learn



alors, on y va!