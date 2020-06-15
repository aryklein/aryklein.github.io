.. title: Publishing your Docker images with Github Actions
.. slug: publishing-your-docker-images-with-github-actions
.. date: 2020-06-14 22:55:50 UTC-03:00
.. tags: Github, Docker, CI
.. category: 
.. link: 
.. description: 
.. type: text

Last weekend I was playing around with Github Actions and it blew my mind! Basically it's another CI tool, like 
`CircleCI <https://circleci.com>`_, `Travis <https://travis-ci.org/>`_, or
`Gitlab CI/CD <https://docs.gitlab.com/ee/ci/>`_ but it is from Github.

I found three things that attracted me:

- It's free for public repositories or 2000 minutes free for private repositories.
- It is easy to use (it uses YAML syntax).
- The CI tool and your code live in the same place.

Having seen these benefits, I decided to learn a little about **Github Actions** and share an example here. In this
post I will show you how to build, test and publish your Docker images using this tool.

Instroduction
-------------
Github calls ``Workflows`` to custom automated processes that you can set up in your repository to build, test,
package, release, or deploy any project on GitHub. These Workflows, defined in yaml syntax, need to be stored in the
``.github/workflows`` directory in the root of your repository. You can create more than one workflow in a repository.
Workflows must have at least one ``job``, and jobs contain a set of ``steps`` that perform individual tasks. ``Steps``
can run commands or use an action. We will see later what an ``action`` is.

.. TEASER_END

Setting up your workflow
------------------------
To start using Github Actions, you need to create the ``.github/workflows`` directory in the root of your repository, 
and then create a ``yaml`` file with the workflow definition. The file name doesn't matter, so feel free to use any
file name, but it must have ``.yaml`` or ``.yml`` extension:

.. code-block:: yaml

  name: Publish Docker

  on:
    push:
      # Publish `master` as Docker `latest` image.
      branches:
        - master

      # Publish `v1.2.3` tags as releases.
      tags:
        - v*

    # Run tests for PRs to master branch.
    pull_request:
      branches:
        - master

  env:
    IMAGE_NAME: hello-world

  jobs:
    # Run tests.
    test:
      runs-on: ubuntu-latest

      steps:
        - uses: actions/checkout@v2

        - name: Run tests
          run: |
            if [ -f docker-compose.test.yml ]; then
              docker-compose --file docker-compose.test.yml build
              docker-compose --file docker-compose.test.yml run sut
            else
              docker build . --file Dockerfile
            fi
    
    push:
      # Ensure test job passes before pushing image.
      needs: test

      runs-on: ubuntu-latest
      if: github.event_name == 'push'

      steps:
        - uses: actions/checkout@v2

        - name: Build image
          run: docker build . --file Dockerfile --tag $IMAGE_NAME

        - name: Log into Docker Hub registry
          run: echo "${{ secrets.DOCKER_PASS }}" | docker login -u ${{ secrets.DOCKER_USER }} --password-stdin

        - name: Push image
          run: |
            IMAGE_ID=${{ secrets.DOCKER_USER }}/$IMAGE_NAME

            # Change all uppercase to lowercase
            IMAGE_ID=$(echo $IMAGE_ID | tr '[A-Z]' '[a-z]')

            # Strip git ref prefix from version
            VERSION=$(echo "${{ github.ref }}" | sed -e 's,.*/\(.*\),\1,')

            # Strip "v" prefix from tag name
            [[ "${{ github.ref }}" == "refs/tags/"* ]] && VERSION=$(echo $VERSION | sed -e 's/^v//')

            # Use Docker `latest` tag convention
            [ "$VERSION" == "master" ] && VERSION=latest

            # verbose
            echo IMAGE_ID=$IMAGE_ID
            echo VERSION=$VERSION

            # tag the built image and push it to Docker Hub
            docker tag $IMAGE_NAME $IMAGE_ID:$VERSION
            docker push $IMAGE_ID:$VERSION


Let's break down this file a little bit to explain every line:

name
~~~~
This key defines the name of the workflow. You can use whaterver name you prefer the most.

on
~~
Determines when this workflow will run:

.. code-block:: yaml

  on:
    push:
      # Publish `master` as Docker `latest` image.
      branches:
        - master

      # Publish `v1.2.3` tags as releases.
      tags:
        - v*

    # Run tests for any PRs.
    pull_request:
      branches:
        - master

In this example GitHub will run this workflow when you push changes to your ``master`` branch, when you push a new tag
starting with ``v`` (for example tag ``v1.2.3``), or when you create a ``pull request`` to the ``master`` branch.
You can find more information `here <https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#on>`_

env
~~~
This key defines global environment variables. In this example we used it for the Docker image name: ``hello-world``

jobs
~~~~
A workflow run is made up of one or more ``jobs``. Jobs run in parallel by default. To run jobs sequentially,
you can define dependencies on other jobs using the ``needs`` key with the job id value.

.. code-block:: yaml
   
  jobs:
    test:
      runs-on: ubuntu-latest
    ...
    ...
    ...

    push:
      needs: test
      runs-on: ubuntu-latest
      if: github.event_name == 'push'


In this Workflow, we defined two jobs: ``test`` and ``push``. ``test`` will be used to perform tests on the built
image, and ``push`` will be used to push the image to Docker Hub. ``push`` depends on ``test`` and will continue its
execution only if the job ``test`` successfully passed. While ``test`` will be always executed, ``push`` will only
happen if the event was a ``git push``. Both jobs will be executed in a virtual **Ubuntu** environment. 

steps
~~~~~
A job is made of small sub-tasks called ``steps``. Each step is responsible to perform a task that performs some
operation. Steps can run commands, run setup tasks, or run an **action**.

**Actions** are individual tasks that you can use to create jobs and customize your workflow. **Actions** are code, so
you can edit, reuse, share, and fork them like code. You can create your own actions, or use actions shared by the
`GitHub community <https://github.com/marketplace?type=actions>`_

.. code-block:: yaml

   steps:
     - uses: actions/checkout@v2

     - name: Run tests
       run: |
         if [ -f docker-compose.test.yml ]; then
           docker-compose --file docker-compose.test.yml build
           docker-compose --file docker-compose.test.yml run sut
         else
           docker build . --file Dockerfile
         fi

In the job ``test``, we will use an **action** that checks-out the repository under ``$GITHUB_WORKSPACE``, and then
execute a system unit test service (sut) if it exist. See also https://docs.docker.com/docker-hub/builds/automated-testing/

Finally if ``test`` successfully passed and the Github event was a push, Github will execute the job ``push``:

.. code-block:: yaml

    push:
      # Ensure test job passes before pushing image.
      needs: test

      runs-on: ubuntu-latest
      if: github.event_name == 'push'

      steps:
        - uses: actions/checkout@v2

        - name: Build image
          run: docker build . --file Dockerfile --tag $IMAGE_NAME

        - name: Log into Docker Hub registry
          run: echo "${{ secrets.DOCKER_PASS }}" | docker login -u ${{ secrets.DOCKER_USER }} --password-stdin

        - name: Push image
          run: |
            IMAGE_ID=${{ secrets.DOCKER_USER }}/$IMAGE_NAME

            # Change all uppercase to lowercase
            IMAGE_ID=$(echo $IMAGE_ID | tr '[A-Z]' '[a-z]')

            # Strip git ref prefix from version
            VERSION=$(echo "${{ github.ref }}" | sed -e 's,.*/\(.*\),\1,')

            # Strip "v" prefix from tag name
            [[ "${{ github.ref }}" == "refs/tags/"* ]] && VERSION=$(echo $VERSION | sed -e 's/^v//')

            # Use Docker `latest` tag convention
            [ "$VERSION" == "master" ] && VERSION=latest

            # verbose
            echo IMAGE_ID=$IMAGE_ID
            echo VERSION=$VERSION

            # tag the built image and push it to Docker Hub
            docker tag $IMAGE_NAME $IMAGE_ID:$VERSION
            docker push $IMAGE_ID:$VERSION


Here we will checks-out again the repository under ``$GITHUB_WORKSPACE`` in a different Ubuntu environment  and then 
it will execute the following tasks:

1. Build the Docker image using ``docker build`` commmand.
2. Log in to Docker Hub (needed to push an image)
3. Tag the Docker built image.
4. Push the tagged image to Docker Hub.

Secrets
-------
As you can see, I used ``secrets``. **Secrets** are encrypted environment variables that you create in your repository
and are only exposed to Github Actions. If you need to use secrets, you can set them from the repository *Settings*.

Conclusions
-----------
I found Github Actions very easy to learn and use. I haven't  other tools like I mentioned before, but I like
