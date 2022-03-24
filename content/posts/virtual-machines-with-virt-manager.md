---
title: "Virtual machines in Linux with virt-manager"
date: 2022-03-24T01:00:00-03:00
draft: false
---

# Virtual machines in Linux with virt-manager

virt-manager is a graphical tool for managing virtual machines through `libvirt`. Most usage is with QEMU/KVM virtual
machines, but Xen and libvirt LXC containers are well supported.

## Install virt-manager on Arch Linux

To install `virt-manager` on Arch Linux you just need to install the following packages:

```sh
sudo pacman -S virt-manager dnsmasq
```

`virt-manager` uses `libvirt` so you need to start `libvirtd.service` systemd unit.

**Note**: virt-manager uses dnsmasq in NAT network mode but you don't need to start the `dnsmasq` service.

You could enable the systemd unit at boot time but I prefer to keep it disabled and only start the service when I am
going to use it:

```sh
sudo systemd start libvirtd.service
```

The easiest way to ensure your user has access to the `libvirt` daemon is by adding your user to the `libvirt` group.
Members of the libvirt group have passwordless access to the RW daemon socket by default.

```sh
sudo usermod -a -G libvirt <user>
```
## Running VMs

If you use the NAT network mode, you will need to define and start a network in libvirt. By default `libvirt` has an
XML network defined in `/etc/libvirt/qemu/networks/default.xml`. You can just use it easily by running: 

```sh
sudo virsh
```

Then, in the `virsh` CLI, you can start it by:

```
virsh # net-start default
```

Alternatively, if you want to have it enabled by default every time you start the `libvirtd` service, you can run:

```
virsh # net-start default
virsh # net-autostart default
```

<br><hr>
<p style="text-align:center"><br><small>Did you find any errors? Please send me a <a class="reference external"
href="https://github.com/aryklein/aryklein.github.io/edit/src/content/posts/virtual-machines-with-virt-manager.md">
pull request</a>. The code of this article is available on Github <i class="nf nf-fa-github"></i>.</small></p>
