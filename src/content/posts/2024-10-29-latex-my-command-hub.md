---
template: blog-post
title: LaTex - my command Hub
slug: /blog/latex-compilation
date: 2024-10-29 10:03
description: Shiva Gyawali, LaTeX, writing research, research paper
featuredImage: https://upload.wikimedia.org/wikipedia/commons/e/e0/TeXmaker_New_Logo.svg
---
In this article, I will gather up all useful LaTeX command for ease access to me. 

LaTeX? Visit [here](https://www.latex-project.org/).

Locally, I use [Texmaker](https://www.xm1math.net/texmaker/). Online, I also use [overleaf](https://www.overleaf.com/).

## introduction

- documentClass
    
    In the beginning of our LaTeX `.tex` file, we have to declare/define what type of document is we are going to create. Some example includes: [see here.](https://libguides.utsa.edu/c.php?g=522165&p=3570198)
    
    - **article** - for articles in scientific journals, presentations, short reports, program documentation, etc...
    - **IEEEtran** - for articles with the IEEE Transactions format.
    - **report** - for longer reports containing several chapters, small books, thesis, etc...
    - **boo**k - for real books
    - **slides** - for slides.
    - **letter** - for writing letters.
    
    ```latex
    \documentclass[]{article}
    ```
    
    Here, [] → is an optional argument where we can pass the font size, eg. [11pt], or leave it blank or even remove it
    
- begin, end <br>
    
    Until now, we haven’t done anything which would give us any output. For this, we have to use `\begin{}` class and `\end{}` class. If we only use `\begin{}` class, then it will not produce any output as it will look for ending of the document. In between begin and end, we can write our text or any text. Then, compile to see the word in pdf generated.
    
    ```latex
    \begin{document}
    Heyy, This is my first LaTeX file.
    \end{document}
    
    ```
    
    Bang, if we enclose LaTeX with ‘`\`' in both side of LaTeX, like `\LaTeX\` , then, we will get wonderful effect.
    
- newline<br>
    
    two ways:
    
    - Hardcoded one blank line —> creates new paragraph with indented
    - softcoded: use `\\` at the end of line, not indented
        
        ```latex
        \begin{document}
        Heyy, This is my first \LaTeX\ file.\\
        Thhis is just sentence in same paragraph with new line
        
        This is new paragraph
        \end{document}
        ```
        
- math mode<br>
    
    We need to enclose with $ symbols to indicate mathematical format, which writes in italic.<br>
    
    eg. `$(x+1)$` <br>
    Further, to write an quadratic equation:<br>
    `$A(x) = X^2 + X + 1$`  <br>but if our equation goes in two lines with splitted and we want to have on a single line, then, we need to enclose in `{ }` braces.
    e.g. `${A(x) = X^2 + X + 1}$` <br>

    
    One thing to notice is, If we use two `$$` symbols, then, the match equation is written in center with its own line.
    
    Further 
    
  - dots

    
    `\ldots`  —> lower 3 dots $\ldots$
    `\cdots` —> center 3 dots $\cdots$
    
  - using package
    
    To use some packages, use this after `\documentclass$\cdots$` :<br> `\usepackage{comma,separated,names,of,packages}` 
    
  - space
    
    use `\vspace{distance}` eg. `\vspace{1cm}`  will add vertical space of 1 cm.
    
  - useful tools
    
    ✍️ Use `\hline` for horizontal line <br>
    ✍️ two figures in two columns in single row: [answer from](https://tex.stackexchange.com/questions/249571/multiple-figures-in-a-two-column-latex-file)
    
    ```latex
    \usepackage{multicol}
    \usepackage{graphicx}
    
    \begin{document}
    
    \begin{figure*}
    \begin{multicols}{2}
        \includegraphics[width=\linewidth]{figure name}\par
        \includegraphics[width=\linewidth]{figure name}\par
        \end{multicols}
    \begin{multicols}{2}
        \includegraphics[width=\linewidth]{figure name}\par
        \includegraphics[width=\linewidth]{figure name}\par
    \end{multicols}
    \caption{caption here}
    \end{figure*}
    
    \end{document}
    
    ```
    
  - some (adding later)

## mathematical notations

- superscripts<br>
    
    Use dollar `$` symbol to indicate math mode<br>
    `$2x^3$`  → 2<br>
    `$2x^34$` —> gives 2$x^3$4 but what if we want to write 2$x^{34}$<br>
    `$2x^{34}$` —>  2$x^{34}$ <br>
    `$2x^{3x+4}$` —>  2$x^{3x+4}$ <br>
    `$$2x^{3x+4}$$` —> $2x^{3x+4}$ <br>
    `$$2x^{3^{x^{45}+5}+6}+7$$`  —> $2x^{3^{x^{45}+5}+6}+7$ <br>
    
    <br>
- subscripts<br>
    
    `$$x_1$$` —>  $x_1$ <br>
    `$$x_12$$` —> $x_12$ <br>
    `$$x_{12}$$`  —>  $x_{12}$ <br>
    `$$x_{y_{2_3}}$$` —>  $x_{y_{2_3}}$ <br>
    `$$x_{y_{2_3}}$$` —> $x_{y_{2_3}}$ <br>
    `$$a_0,a_1, a_2, \ldots, a_{100}$$` —>  $a_0,a_1, a_2, \ldots, a_{100}$ <br><br>


    
- greek letter<br>
    
    `$$\pi$$` —> $\pi$ <br>
    `$$\Pi$$` —> $\Pi$ <br>
    `$$\alpha$$` —> $\alpha$ <br>
    `$$A=\pir^2$$`  —> this gives error as it can’t identify pi, so give one space between pi and r <br>
    `$$A=\pi r^2$$` —> $A=\pi r^2$ <br>
    <br>
- trigonometry function<br>
    
    `$$y=sin x$$` —> $y=sin x$ (this is not our way, so not use like this, instead do:) <br>
    `$$y=\sin x$$` —> $y=\sin x$ <br>
    `$$y=\cos x$$` —>  $y=\cos x$ </br>
    `$$y=\csc \theta$$` —> $y=\csc \theta$ </br>
    `$$y=\sin^{-1} 1$$` —> $y=\sin^{-1} 1$ <br>
    `$$y=\arcsin x$$` —> $y=\arcsin x$ <br>
     
     
    <br>
- Log <br>
    
    `$$y=\log x$$` —> $y=\log x$ <br>
    `$$y=\log_5 x$$` —> $y=\log_5 x$<br>
    `$$y=\ln x$$` —> $y=\ln x$ <br>
      
    <br>
- roots <br>
    
    `$$y=\sqrt{2}$$` —> $y=\sqrt{2}$ <br>
    `$$y=\sqrt[3]{x^4}$$` —> $y=\sqrt[3]{x^4}$ <br>
    `$$\sqrt{x^2 + y^2 }$$`  —> $\sqrt{x^2 + y^2}$ <br>
    `$$\sqrt{ 1+\sqrt{x} }$$` → $\sqrt{ 1+\sqrt{x}}$ <br>
    <br>
- Fraction <br>
    
    `$$\frac{Numerator}{Denominator} $$` —> $\frac{Numerator}{Dinominator}$ <br>
    `$$\frac{2}{3}$$` —> $\frac{2}{3}$ <br>
    `$\dfrac{2}{3}$`  —> $\dfrac{2}{3}$ —> to make fraction a little larger in inline format, use `dfrac` instead of `frac`, `dfrac` is display frac.  <br><br>
    
    ⚠️ Double dollar symbol `$$...$$` already includes display math mode… <br>
    
    `$$\displaystyle frac{2}{3}$$` —> $\displaystyle \frac{2}{3}$  —> We can also use<br> `\displaystyle` <br>
    `\frac{Numerator}{Denominator}` <br><br>
    ⚠️ While showing fraction, two lines may look very near, and in such case, we can specify some distance between line with line breaker symbol at the end i.e. `\\` like, `\\[6pt]` this will actually place some space between two lines, giving fraction to be visible fine.
    
    ❗Further, we can also remove the page number by putting below line after the `\documentclass$\cdots$` : `\pagestyle{empty}` 
    
    ❗To use packages, use `\usepackage{package,name,with,comma,separation}` 
    If we use some functions without mentioning package name, then, we may encounter error like: `!Undefined control sequence. $$\dfrac` 
    
    `$$\frac{\sqrt{x+1}}{\sqrt{x+2}}$$` —> 
    
    $\frac{\sqrt{x+1}}{\sqrt{x+2}}$
    `$$\frac{1}{1+\sqrt{x}}$$`-→ 
    
    $\frac{1}{1+\sqrt{x}}$
    `$$\sqrt{\frac{x+1}{y+2}}$$` —> 
    
    $\sqrt{\frac{x+1}{y+2}}$
    
- brackets
    
    We need to use packages to use braces: `\usepackages{amsmaths,amsfonts,amssymb}` 
    
    ✍️ parenthesis:
    `$a(b+c) = ab+ac$ for all $a, b, c \in \mathbb{R}$` → $a(a+b) = ab+ac$ for all $a, b, c \in \mathbb{R}$ 
    
    ✍️ bracket:
    `$a$ is $[a]$` —> a is $[a]$
    
    ✍️ curly braces
     $A$ is defined to be ${1,2,3}$ —> this will not display { } braces.
    we have to escape them as they are special symbol in the LaTeX. 
    `$\{1,2,3\}$`-→ {1,2,3}
    
    ✍️ dollar symbol $:
    To write `$` , we have to escape it: `$\$ 23$` —> $ 23
    
- braces in fraction
    
    ✍️`$$2(\frac{1}{x^2-1})$$`  —> $2(\frac{1}{x^2-1})$ —> In LaTeX, if we don’t use `\left` and `\right` , then, our parenthesis will not cover our fraction.
    `$$2\left(\frac{1}{x^2-1}\right)$$` —> $2\left(\frac{1}{x^2-1}\right)$
    `$$2\left\{\frac{1}{x^2-1}\right\}$$`
    `$$ 2 \left[\frac{1}{x^2-1}\right] $$`
    
- angular braces
    
    We need to use `\langle` and `\rangle`
    
    `$$ 2 \left\langle\frac{1}{x^2-1}\right\rangle $$` —> $2 \left\langle\frac{1}{x^2-1}\right\rangle$
    
- differentiation $\frac{dy}{dx}$
    
    
    `$$\frac{dy}{dx}|_{x=1}$$` —> $\frac{dy}{dx}|_{x=1}$
    
    `$$\left.\frac{dy}{dx}\right|_{x=1}$$` —> $\left.\frac{dy}{dx}\right|_{x=1}$  
    ✍️ Here, since we can't use `$\right$` alone, we must have to have equivalent pairing `$\left$`. Hence, we added one `$\left$`. But, we don't wan't it to display, hence, we put one period `(.)` there so that it will not be displayed.
    
    `$$ \left(\frac{1}{1+\left(\frac{1}{1+x}\right)}\right) $$` —> 
    
    $\left(\frac{1}{1+\left(\frac{1}{1+x}\right)}\right)$
    
- table
    
    ✍️ We add new tabular block with `\begin{tabular}` and `\end{tabular}` 
    ✍️ Here, we mentioned `$ccc $\ldots$ $` not for columns, but for actually the `alignment`. This c represent center alignment, other values that can go here is l -> left, r -> right align.\\
    Default separation is & , but if we want to use  as column separator, we can specify in definition as: {|c|c|c|} so on.\\
    
    ```latex
    \begin{tabular}{cccccc}
    x & 1 & 2 & 3 & 4 & 5\\
    Here, we mentioned ccc $\ldots$ not for columns, but for actually the alignment. This c represent center alignment, other values that can go here is l -> left, r -> right align.\\
    Default separation is , but if we want to use  as separator, we can specify in definition as: {|c|c|c|} so on.\\
    
    \\[16pt]
    \end{tabular}
    ```
    
    ```latex
    
    \begin{tabular}{|c||c|c|c|c|c|}
    \hline
    x & 1 & 2 & 3 & 4 & 5\\ \hline
    $f(x)$ & 1 & 4 & 9 & 16 & 25 \\ \hline
    
    \end{tabular}
    
    \vspace{1cm}
    
    But adding this table type, actually places our table based on where it will be best-fitted in our page, hence, it has moved it to top.\\
    However, we can explicitly tell to put the table wherever I have coded it to be. to do so, we need to add $[H]$ with table definition and also have to add package: float\\
    Why we are wrapping tabular with a table block is because when using fraction in a table, the value is not showing good enough, hence, to add a little bit of space there.\\
    we have to define a arraystretch after begin table:
    \begin{table}[H]
    \def\arraystretch{1.5}
    \centering  to put our table in the center
    
    \begin{tabular}{|c||c|c|c|c|c|}
    \hline
    x & 1 & 2 & 3 & 4 & 5\\ \hline
    $f(x)$ & $\frac{1}{2}$ & 4 & 9 & 16 & 25 \\ \hline
    
    \end{tabular}
    \caption{These values present the function of $f(x)$}
    
    \end{table}
    
    ```
    
    ✍️ Adding caption to our table: before `\end{table}` and after `\end{tabular}` 
    watch from `31:04` , J’ai sommeil. Bonne nuit!!