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
* [ ] adding global styling
* [ ] dan to replicate spaces functionality in devices and network
* [ ] what happens when we click a peers name (figma)
* [ ] what is in network? (figma)
* [ ] discuss colors vs avatars 
  * [ ] displaying connection status
  * [ ] import/inherit color scheme of a peer or assign locally (can i override?)
    * [ ] what about color clashes
* [ ] refactor network, device and space duplication? (if comes up)
* [ ] cobox-core API integration (may be session after next)
* [ ] create branch for desired data shape using swagger for kieran to sync with
