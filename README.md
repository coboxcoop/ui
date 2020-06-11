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
### Run two UIs ontop of two different servers (mimic two seperate users)

To run two seperate instances alongside eachother so you can get spaces/seeders replicating locally you can run the following:

```
# these two commands mimic one user
# from the [cobox-server](https://gitlab.com/coboxcoop/cobox-server/src/branch/development) repo in one terminal run:
yarn dev:server --port 1234 --mount ~/cobox/mount/one --storage ~/cobox/one

# from the [cobox-ui](https://gitlab.com/coboxcoop/cobox-ui/src/branch/develop) repo in another terminal run:
API_PORT=1234 yarn serve

# the first UI which is run will be launched at http://localhost:8080/ (check the logs)

# these next two commands mimic another user
# from the [cobox-server](https://gitlab.com/coboxcoop/cobox-server/src/branch/development) repo in one terminal run:
yarn dev:server --port 2345 --mount ~/cobox/mount/two --storage ~/cobox/two

# from the [cobox-ui](https://gitlab.com/coboxcoop/cobox-ui/src/branch/develop) repo in another terminal run:
API_PORT=2345 yarn serve

# the second UI which is run will be launched at http://localhost:8081/ (check the logs)
```

Lastly if you want to mimic what it would be like to have a Cobox physical seeder running on the local are network then you can run. When you have it running you should be able to run through the setup seeder workflow.

```
# this command from the [cobox-hub](https://gitlab.com/coboxcoop/cobox-hub/src/branch/development) repo:
yarn dev
```

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
