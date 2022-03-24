---
title: "How to Create Your Blog for Free"
date: 2020-04-04T20:23:21-03:00
draft: false
---

In this post I will explain how to set up for free your personal blog (or website) using
a static site generator and **Github Pages**. In fact, this is how I'm running this cool
blog 😉

There are many site generators available on the Internet, like
[Pelican](https://blog.getpelican.com), [Octopress](http://octopress.org),
[Jekyll](https://jekyllrb.com), [Hugo](https://gohugo.io), etc. Anyway
[Nikola](https://getnikola.com)is the one that convinced me the most. It looks nice, has a
friendly command line interface, supports multiple input formats (reStructuredText is my
favorite one), and it's written in Python ❤

When looking for hosting there are many alternatives as well, but I decided to use [Github
Pages](https://pages.github.com) because it's free, easy to use and **Nikola**
provides a command to deploy the static site there.


## Creating a repository for your site

To publish your site using **Github Pages**, you need to create an empty repository in
Github (`README.md` is not needed) and it must be named `<username>.github.io`, where
`username` is your username on Github. Unless you're using a custom domain, your site
will be available at `http(s)://<username>.github.io`. If you want to read more about
**GitHub Pages**, I recommend this [link} (https://help.github.com/en/github/working-with-github-pages)

Once the respository is created, clone it in your computer to start working with
**Nikola**:

```bash
git clone https://github.com/username/<username>.github.io
```

## Installing Nikola

The best way to install Nikola is using `pip3` in a virtual environment, so I recommend
to create a simple `Makefile` in the local repository to manage your Nikola environment:


```bash
SHELL=bash

.DEFAULT_GOAL := install

install: env
      .env/bin/pip install --upgrade "Nikola[extras]"

env: clean
      python3 -m venv .env
      .env/bin/pip install --upgrade pip setuptools wheel

clean:
      rm -rf .env
```

Don't commit any changes yet. That will be handled by **Nikola** later. Now is time to
install **Nikola** using the `Makefile`:

``` sh
make install
```

At this step you have **Nikola** installed in a virtual environment, so you need to
activate it to start using Nikola.

```bash
$ source .env/bin/activate
(.env)$ nikola --version
```

When you finish working with Nikola, you can deactivate the virtual environment with 
`deactivate` and if you want to remove it, just run `make clean`.


## Creating your site

I will only cover how to initialize your site, create a simple `Hello World` post and
deploy it to **Github Pages**. I strongly recommend that you read the official 
[handbook](https://getnikola.com/handbook.html) for more details about Nikola's commands
and how to tweak your site through the `conf.py` file.

To initialize your site, you need to run `nikola init .` in your repository. That
will launch a wizard, that will configure your site. After that, you will see new files
and directories, including the config file `conf.py` that is used to set many options.


Now you can create your first post running `nikola new_post`. With the default settings,
this command will create a new `.rst` file in the `posts` directory. You can use your
favorite text editor (like Vim), to write your first post there. That would be your "Hello
World".

When finish writing your post, you can render the site with `nikola build`. That will
create all HTML files in the `output` directory.

Before deploying it to Github, you can preview your site using the Nikola's development
server. Use `nikola serve --browser` to start the development server and open your site
in a web browser.


## Deploying your site to Github Pages

As I mentioned before, Nikola provides a command `nikola github_deploy` to deploy the
site to GitHub Pages. By default, this command is configured but you can change some
parameters in `conf.py`. For more details, read the
[manual](https://getnikola.com/handbook.html#deploying-to-github)

Before running this command, create a `.gitignore` file that tells Git which files and
directories to ignore when you make a commit:

```
cache
.doit.db
__pycache__
output
.env
```

At this point, you can deploy your site to **Github Pages** running `nikola
github_deploy`. This command will build the site, commit the `output` directory to the
deployment branch (`master`), and push it to GitHub. It will also create a new branch
(`src` by default) for the site source files.

I recommend to set the source `src` branch (created by `github_deploy`) as the default
branch in Github. The default branch is considered the base branch in your repository,
against which all pull requests and code commits are automatically made, unless you
specify a different branch. If you don't know how to do it, follow
[this guide](https://help.github.com/en/github/administering-a-repository/setting-the-default-branch).

## Deploying your site using Github Actions

Once you have deployed your site manually with `nikola github_deploy` (previous step),
you can create a **Github Action Workflow** that automatically deploys your site every
time you push a change in the `src` branch.

Create the `.github/workflows` directory in the root of the `src` branch, and then
add the following workflow `.github/workflows/main.yml`:

```yaml

name: Nikola Publish

on:
  push:
    branches:
      - src
jobs:
  publish:
    runs-on: ubuntu-latest
    if: github.event_name == 'push'

    steps:
      - uses: actions/checkout@v2
        with:
          ref: 'src'
          persist-credentials: true
          fetch-depth: 0

      - name: Set up Python 3.8
        uses: actions/setup-python@v2
        with:
          python-version: 3.8

      - name: Install Nikola
        run: |
          pip install --upgrade pip setuptools wheel
          pip install --upgrade -r requirements.txt
      - name: Build and deploy Nikola
        run: |
          git config --global user.email "${{ secrets.USER_EMAIL }}"
          git config --global user.name "Ary Kleinerman"
          nikola build
          nikola github_deploy -m "Published with Github Actions"
```

Github will execute this workflow every time you push a code change in the `src` branch.
This workflow checks-out the repository in an Ubuntu environment, sets up a Python 3.8
environment, installs Nikola and executes `nikola github_deploy`.

## Custom domain

To configure your custom domain, like `blog.example.org`, you need to create a `CNAME`
record (in your DNS provider) that points to `<username>.github.io`.

After adding this change, you can check the new DNS record executing:

```bash
dig +nostats +nocomments blog.example.org
```

Once the change has been applied, you must create a file `files/CNAME` on the source
branch with your domain. Following the example:

```bash
echo blog.example.org > files/CNAME
```


When you deploy the site using `github_deploy`, Nikola will copy this `CNAME` file to
the output directory, commit to the master branch and push it to Github.


## Enforcing HTTPS

Optionally, you can enforce HTTPS encryption for your site. To enable this option, in the
Github website, go to your repository `<username>.github.io`, *Settings* and check
*Enforce HTTPS*. When HTTPS is enforced, your site will only be servedcover HTTPS.

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.1/css/all.css"> <br><hr>
<p style="text-align:center"><br><small>Did you find any errors? Please send me a <a class="reference external"
href="https://github.com/aryklein/aryklein.github.io/edit/src/content/posts/how-to-create-your-blog-for-free.md">
pull request</a>. The code of this article is available on <i class="fab fa-github"></i>
<br>This blog is written with <i class="fas fa-heart"></i></small></p>
