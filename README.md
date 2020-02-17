# cobox-ui

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Repo Process
We're following the [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). Please base off of `develop` when working on `feature/<feature_name>` branches. This should be a branch per feature.

#### Example
A complete example demonstrating a Feature Branch Flow is as follows. Assuming we have a repo setup with a master branch.
```
git checkout master
git checkout -b develop
git checkout -b feature_branch
# work happens on feature branch
git checkout develop
git merge feature_branch
git checkout master
git merge develop
git branch -d feature_branch
```

### TODOs

2020-01-15
* [x] inputing name of new person within a space in SpaceSection
  * [x] input box for that
  * [x] closing the input person if not meant (hide the content)
  * [x] hide the content and place new name if person has been added 

2020-01-17
* [ ] change plus to a cancel if it's open for peerKey (rabbit hole)
* [x] adding global styling
* [ ] dan to replicate spaces functionality in 
  * [x] devices and 
  * [ ] network
* [x] what happens when we click a peers name (figma)
* [ ] what is in network? (figma)
* [x] discuss colors vs avatars (like ssb, deterministic from parentKey)
  * [x] displaying connection status
  * [x] import/inherit color scheme of a peer or assign locally (can i override?)
    * [x] what about color clashes
* [x] refactor network, device and space duplication? (if comes up)
* [x] cobox-core API integration (may be session after next)
* [x] create branch for desired data shape using swagger for kieran to sync with

2020-01-23
* [x] noted questions from session here: https://ledger-git.dyne.org/CoBox/cobox-ui/issues/1
  * [x] related notes: https://hackmd.io/huEdoSnJRLehl681IUqH0w
* [x] figure out CLI commands per UI clickable element e.g.
  * [x] onboarding giving name also `cobox groups create -n {{name}}` && `cobox groups mount -n {{name}}`

2020-01-28
* [ ] different states of a space (network health)
  * [ ] up-to-date
  * [ ] swarming (connected)
  * [ ] disconnected
  * [ ] scheduled
  * [ ] updating / busy
  * [ ] online but no connections

2020-02-13
* [x] profile update name working
* [ ] update websocket needs https://ledger-git.dyne.org/CoBox/cobox-server/pulls/35
* [ ] matt to take on completion of groups
* [ ] dan to take on profile work

2020-02-17
/* due to bug in creating groups have worked on interface and styling  */

* work in progress cobox site: https://sb-cobox.netlify.com/posts/first-designs/
* work in progress style guide: https://gitlab.com/coboxcoop/style-guide

## States within CoBox
### Spaces/Groups
* [ ] different states of a space (network health)
  * [ ] up-to-date
  * [ ] swarming (connected)
  * [ ] disconnected
  * [ ] scheduled
  * [ ] updating / busy
  * [ ] online but no connections
### People/Peers
* [ ] different states a person can be (profile icon)
  * [ ] color assigned (derived from peers publicKey)
  * [ ] online (connected to the network)
  * [ ] offline (not connected to the netork)
  /* connected to the network in this case means connected to wifi
  AND connected to remote olimex */
* [ ] peers publicKey derived profile icon color
  * [ ] human peers connection status
### CoBox hardware devices
* [ ] blind replication groups
  * [ ] uptodate (when there is a peers online and there are no more changes)
  * [ ] connected and pingable
  * [ ] disconnected not pingable
### Disk Usage
/* this can be within hardware device or witin our group/spaces  */
* [ ] disk % usage
  * [ ] full
  * [ ] nearly full
  * [ ] etc
