.. title: How to create your blog for free
.. slug: how-to-create-your-blog-for-free
.. date: 2020-04-04 20:23:21 UTC-03:00
.. tags: 
.. category: 
.. link: 
.. description: 
.. type: text

In this post I will explain how to set up for free your personal blog (or website) using
a static site generator and **Github Pages**. In fact, this is how I'm running this cool
blog 😉

There are many site generators available on the Internet, like `Pelican
<https://blog.getpelican.com>`_, `Octopress <http://octopress.org>`_, `Jekyll
<https://jekyllrb.com>`_, `Hugo <https://gohugo.io>`_, etc. Anyway `Nikola
<https://getnikola.com>`_ is the one that convinced me the most. It looks nice, has a
friendly command line interface, supports multiple input formats (reStructuredText is my
favorite one), and it's written in Python ❤

When looking for hosting there are many alternatives as well, but I decided to use `Github
Pages <https://pages.github.com>`_ because it's free, easy to use and **Nikola**
provides a command to deploy the static site there.

.. TEASER_END

Creating a repository for your site
-----------------------------------

To publish your site using **Github Pages**, you need to create an empty repository in
Github (``README.md`` is not needed) and it must be named ``<username>.github.io``, where
``username`` is your username on Github. Unless you're using a custom domain, your site
will be available at ``http(s)://<username>.github.io``. If you want to read more about
**GitHub Pages**, I recommend this `link
<https://help.github.com/en/github/working-with-github-pages>`_.

Once the respository is created, clone it in your computer to start working with
**Nikola**:

.. code-block:: bash

  $ git clone https://github.com/username/<username>.github.io


Installing Nikola
-----------------

The best way to install Nikola is using ``pip3`` in a virtual environment, so I recommend
to create a simple ``Makefile`` in the local repository to manage your Nikola environment:

.. code-block:: bash

  SHELL=bash

  .DEFAULT_GOAL := install

  install: env
        .env/bin/pip install --upgrade "Nikola[extras]"

  env: clean
        python3 -m venv .env
        .env/bin/pip install --upgrade pip setuptools wheel

  clean:
        rm -rf .env

Don't commit any changes yet. That will be handled by **Nikola** later. Now is time to
install **Nikola** using the ``Makefile``:

.. code-block:: bash

  $ make install

At this step you have **Nikola** installed in a virtual environment, so you need to
activate it to start using Nikola.

.. code-block:: bash

  $ source .env/bin/activate
  (.env)$ nikola --version

When you finish working with Nikola, you can deactivate the virtual environment with 
``deactivate`` and if you want to remove it, just run ``make clean``.


Creating your site
------------------

I will only cover how to initialize your site, create a simple ``Hello World`` post and
deploy it to **Github Pages**. I strongly recommend that you read the official `handbook
<https://getnikola.com/handbook.html>`_ for more details about Nikola's commands and how
to tweak your site through the ``conf.py`` file.

To initialize your site, you need to run ``nikola init .`` in your repository. That
will launch a wizard, that will configure your site. After that, you will see new files
and directories, including the config file ``conf.py`` that is used to set many options.


Now you can create your first post running ``nikola new_post``. With the default settings,
this command will create a new ``.rst`` file in the ``posts`` directory. You can use your
favorite text editor (like Vim), to write your first post there. That would be your "Hello
World".

When finish writing your post, you can render the site with ``nikola build``. That will
create all HTML files in the ``output`` directory.

Before deploying it to Github, you can preview your site using the Nikola's development
server. Use ``nikola serve --browser`` to start the development server and open your site
in a web browser.


Deploying your site to Github Pages
-----------------------------------

As I mentioned before, Nikola provides a command ``nikola github_deploy`` to deploy the
site to GitHub Pages. By default, this command is configured but you can change some
parameters in ``conf.py``. For more details, read the `manual
<https://getnikola.com/handbook.html#deploying-to-github>`_

Before running this command, create a ``.gitignore`` file that tells Git which files and
directories to ignore when you make a commit:

.. code-block::

  cache
  .doit.db
  __pycache__
  output
  .env

At this point, you can deploy your site to **Github Pages** running ``nikola
github_deploy``. This command will build the site, commit the ``output`` directory to the
deployment branch (``master``), and push it to GitHub. It will also create a new branch
(``src`` by default) for the site source files.

I recommend to set the source ``src`` branch (created by ``github_deploy``) as the default
branch in Github. The default branch is considered the base branch in your repository,
against which all pull requests and code commits are automatically made, unless you
specify a different branch. If you don't know how to do it, follow `this guide
<https://help.github.com/en/github/administering-a-repository/setting-the-default-branch>`_
.

Custom domain
-------------

To configure your custom domain, like ``blog.example.org``, you need to create a ``CNAME``
record (in your DNS provider) that points to ``<username>.github.io``.

After adding this change, you can check the new DNS record executing:

.. code-block:: bash

  $ dig +nostats +nocomments blog.example.org


Once the change has been applied, you must create a file ``files/CNAME`` on the source
branch with your domain. Following the example:

.. code-block:: bash

  $ echo blog.example.org > files/CNAME


When you deploy the site using ``github_deploy``, Nikola will copy this ``CNAME`` file to
the output directory, commit to the master branch and push it to Github.


Enforcing HTTPS
---------------

Optionally, you can enforce HTTPS encryption for your site. To enable this option, in the
Github website, go to your repository ``<username>.github.io``, *Settings* and check
*Enforce HTTPS*. When HTTPS is enforced, your site will only be servedcover HTTPS.

.. raw:: html

  <p style="text-align:center"><br><small>Did you find any errors? Please send me a
  <a class="reference external"
  href="https://github.com/aryklein/aryklein.github.io/edit/src/posts/how-to-create-your-blog-for-free.rst">
  pull request</a>. The code of this article is available on Github.</small></p>
