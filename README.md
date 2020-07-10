<div align="center">
  <img src="https://cobox.cloud/src/svg/logo.svg">
</div>

# Desktop UI

## Table of Contents

* [About](#about)
* [Installing and Updating](#installing-and-updating)
  * [Install & Update Script](#install-and-update-script)
  * [Troubleshooting on Linux](#troubleshooting-on-linux)
  * [Verify Installation](#verify-installation)
  * [NPM Install](#npm-install)
  * [Git Install](#git-install)
* [Usage](#usage)
* [Concepts](#concepts)
* [Docs](#docs)
* [Development](#development)
* [Contributing](#contributing)
* [License](#license)

## About

**CoBox** is an encrypted p2p file system and distributed back-up tool. You can read more at [docs.cobox.cloud/](https://docs.cobox.cloud/).

CoBox was developed using funding from the [EU Ledger NGI](https://ledgerproject.eu/) programme.

Its aim is to facilitate a transition to a sovereign commons-based data infrastructure and a co-operative distributed cloud architecture.

CoBox is built on Dat. Dat is a modular peer-to-peer technology stack. You can find a good explanation of how it works in the guide ['how Dat works’](https://datprotocol.github.io/how-dat-works/), and you can find out how we’ve made use of Dat in [our docs](https://docs.cobox.cloud/core_technologies.html). CoBox uses the hypercore protocol and the hyperswarm distributed hash table (DHT) to connect peers in a distributed network. All data is encrypted locally, before being replicated securely across a swarm of peers.

For CoBox, we’ve used Dat to build fully encrypted private spaces that synchronise seamlessly across multiple devices. This means you, your friends and colleagues no longer have to rely on corporate servers to store your files, you can hold onto them for each-other.

CoBox Server is a core component of the CoBox App. It exposes a VueJS UI, an ExpressJS JSON API, and a Yargs CLI for interacting with CoBox 'spaces', 'backups' and 'seeders'. Check out our [concepts](#concepts) section for more details on what a space is, how backups work and... what's a 'seeder'?

CoBox Seeder is an 'always on' blind replicator device designed to be hosted in your office or home. It exposes an ExpressJS HTTP JSON API, pairing with [CoBox Server](https://gitlab.com/coboxcoop/server) using UDP packets, and a Yargs CLI over the LAN, as well as processing remote commands from a registered and authenticated CoBox Server instance over the [Hyperswarm DHT](https://github.com/hyperswarm/hyperswarm) using the [Hypercore Protocol](https://github.com/mafintosh/hypercore-protocol/).

## Installing and Updating

TODO

# Contributing

To be written

# License

[`AGPL-3.0-or-later`](./LICENSE)
