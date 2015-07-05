#Git-it
https://github.com/jlord/git-it

###Get git
```
$ git --version
$ git config -l
    user.name=<name>
    user.email=<email>
    user.editor=Atom --wait(not sure why '--wait')
```

###Repository
```
$ mkdir classroom
```
    - or any other name
```
$ cd classroom
$ git init
```
    - initializes directory as git repository
    - enables git commands to apply to 'classroom'

###Commit To It
- create a readme.txt file in classroom locally using text editor
    ```
    $ git status ==> Untracked: readme.txt
    $ git add readme.txt
    $ git commit -m "<commit message>"
    ```
- add a line to readme.txt
    ```
    $ git diff ==> displays changes
    ```

###Githubbin'
```
$ git config --global user.username
```
    - Professor Professorson?
    - not too sure what this is about
    - do it for each account? or each repo?

###Remote Control
- create remote repository with same name
    ```
    $ git remote add origin <URL from Github>
    ```
        - links local repo to remote
    ```
    $ git push origin master
    ```
        - push TO origin
        - local master
- also
    ```
    $ git pull <remote name> <branch name>
    $ git remote -v
    ```

###Forks & Clones

- fork jlord/patchwork in browser
    ```
    $ cd ..
    ```
        - backs out of current dir one level
    ```
    $ git clone <URL from Github>
    $ cd patchwork
    $ git remote add upstream <jlord/patchwork URL>
    ```
        - upstream
            - common designation
            - could use anything

###Branches Aren't Just For Birds
```
$ git status
```
    - identify current branch
```
$ git branch <BRANCHNAME>
```
    - creates new branch
```
$ git checkout <BRANCHNAME>
```
    - like 'cd' into branch
    - **Make changes/additions**
    - next check-in changes
```
$ git status
```
    - on branch "BRANCHNAME"
```
$ git add <filename>
$ git commit -m 'commit message'
$ git push origin <BRANCHNAME>
```
- also
    ```
    $ git checkout -b <BRANCHNAME>
    ```
        - creates branch and switches to it
    ```
    $ git branch -m <NEWBRANCHNAME>
    ```
        - renames current branch

###It's A Small World
- from fork page
    - settings -> collaborators -> add

###Pull Never Out Of Date
```
$ git pull origin add-Chrinkus
```
    _not sure if add-Chrinkus was a file or branchname_
    - see what collaborators have added
    - also
        ```
        $ git fetch --dry-run
        ```
            - see changes before pull

###Requesting You Pull, Please
- clicky-click on main page at top
- **Addition**
    - there is a way to create a pull request from the bash

###Merge Tada!
```
$ git checkout gh-pages
```
    - move into ranch you want to merge into
```
$ git merge <BRANCHNAME>
$ git branch -d <BRANCHNAME>
```
    - delete branch
```
$ git push <remote name> --delete <BRANCHNAME>
```
    - delete branch from remote (origin) fork on github
```
$ git pull upstream gh-pages
```
    - pull in updates from upstream

###Syncing A fork
```
$ cd <local project directory>
$ git fetch upstream
```
    - fetches current upstream repository
```
$ git checkout master
```
    - checkout fork's local master branch
```
$ git merge upstream/master
```
    - merge changes from upstream master branch into local master branch
    - syncs local master w/upstream master w/o losing local changes
```
$ git push origin master
```
    - pushes local code into remote master c/w upstream changes (it already had) and local changes
    - origin -> remote repository
    - master -> master branch

END OF WORKSHOP
