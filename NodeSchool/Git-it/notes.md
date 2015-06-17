#Git-it
https://github.com/jlord/git-it

Get git

    $ git --version
    $ git config -l
        user.name=<name>
        user.email=<email>
        user.editor=Atom --wait(not sure why '--wait')

Repository

    $ mkdir classroom (or any other name)
    $ cd classroom
    $ git init
        - initializes directory as git repository
        - enables git commands to apply to 'classroom'

Commit To It

- create a readme.txt file in classroom locally

    $ git status ==> Untracked: readme.txt
    $ git add readme.txt
    $ git commit -m "<commit message>"

- add a line to readme.txt

    $ git diff ==> displays changes

Githubbin'

    $ git config --global user.username (Professor Professorson?)
        - not too sure what this is about
        - do it for each account? or each repo?

Remote Control

- create remote repository with same name

    $ git remote add origin <URL from Github>
        - links local repo to remote

    $ git push origin master
        - push TO origin
        - local master

- also

    $ git pull <remote name> <branch name>
    $ git remote -v
