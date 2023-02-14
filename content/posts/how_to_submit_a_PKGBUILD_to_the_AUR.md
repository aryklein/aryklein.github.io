---
title: "How to submit a PKGBUILD to the AUR"
date: 2023-02-04T01:00:00-03:00
draft: false
---

In this post I will explain how I did to create and share a PKGBUILD script using the AUR (Arch User Repostitory).
This isn’t a complete or a beginner friendly guide, but it should help some people with basic Arch Linux knowledge to
share their PKGBUILD scritps.

The manual page for PKGBUILD and the Arch wiki are a good starting point. I encourage you to read the following
articles and maybe you do not need my post:

- https://wiki.archlinux.org/title/PKGBUILD
- https://wiki.archlinux.org/title/Creating_packages
- https://wiki.archlinux.org/title/Arch_package_guidelines
- https://wiki.archlinux.org/title/AUR_submission_guidelines

## Step 1: create an AUR user account

If you're going to share your PKGBUILD (not binary files) thru the AUR, you need to have an account and upload your
SSH public key. To create the account just follow the register steps [here](https://aur.archlinux.org/register).

## Step 2: create a repostitory

This step could be confusing as you don't have an option in the AUR to create a Git repostitory like you may have
in other registries.

The way to do this is by cloning an empty repository from the AUR with the name of your package:

```sh
git clone ssh://aur@aur.archlinux.org/PKG_NAME.git
```

A good practice is to create the `.gitignore` file that ignores everything:

```sh
echo "*" > .gitignore
```

In this way you have to explicitly `add` files to your repository by using the `-f` flag.

```sh
git add -f <file>
```

## Step 3: Write your PKGBUILD

This is a shell script that contains the information required to build the package. Packages in Arch Linux are
built using the `makepkg` utility. When `makepkg` is run, it searches for a `PKGBUILD` file in the current directory
and follows the instructions defined in it to either compile or acquire the files to build a package archive called
(`PKG_NAME.pkg.tar.zst`). The resulting package contains binary files and installation instructions, readily
installable with `pacman -U PKG_NAME.pkg.tar.zst`.

In this post I don't cover how to write a `PKGBUILD` but you can find more information in the man pages or in the previous
link that posted before. You can also use `/usr/share/pacman/PKGBUILD.proto` as a starting point. Be aware though that
this is a full PKGBUILD containing tons of things that you may not actually need.

> **Note**: You will notice that many other PKGBUILDs, in the `package()` function, use the `install` command to copy
things into the file system. This is because it can copy files and set permissions in one go.

To update the package checksums in the PKGBUILD file, run `updpkgsums`, which belongs to the `pacman-contrib` package.

## Step 4: build the package

In the directory containing the PKGBUILD you can run the following command to build the package:

```sh
makepkg -s
```

This will download the sources and create a `.tar.zst` file and a directory structure. This is where the `.gitignore`
file comes into play, avoiding pushing junk to the repository. If you want to test or install the package, you can
execute:

```sh
sudo pacman -U PKG_NAME.pkg.tar.zst
```

## Step 5: Create the .SRCINFO file

The `.SRCINFO` file contains package metadata in a simple, unambiguous format, so that tools such as the AUR's Web
back-end or AUR helpers may retrieve a package's metadata without parsing the PKGBUILD directly.

To create this file, in the working directory you need to execute:

```sh
makepkg --printsrcinfo > .SRCINFO
```

## Step 6: Publish to the AUR

```sh
git add -f .SRCINFO PKGBUILD
git commit .SRCINFO PKGBUILD -m "Some cool commit message"
git push origin master
```

> **Note**: every time you modify the PKGBUILD, you need to update the checksums and the
`.SRCINFO` file.


<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.1/css/all.css"><br><hr>
<p style="text-align:center"><br><small>Did you find any errors? Please send me a <a class="reference external"
href="https://github.com/aryklein/aryklein.github.io/edit/src/content/posts/how_to_submit_a_PKGBUILD_to_the_AUR.md">
pull request</a>. The code of this article is available on <i class="fab fa-github"></i>
<br>This blog is written with <i class="fas fa-heart"></i></small></p>
