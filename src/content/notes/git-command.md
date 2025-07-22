---
title: Git Command
createDate: 2024-11-16
published: true
tags:
  - Git
  - Tools
  - Skills
draft: true
---

> [!example]+ Clone a repo
>
> ```shell
> git clone repo-link
> # or using gh
> ```

> [!example]+ Check status (What are in stage or unstage)
>
> ```shell
> git status
> ```

> [!example]+ Show list of commit
>
> ```shell
> # local, current branch
> git log --graph --decorate --oneline
> # press "q" to quit
>
> # remote branch b1 (local may have different commits)
> git fetch origin
> git log origin/b1 --graph --decorate --oneline
> ```

> [!example]+ Working with branches
>
> ```shell
> # create a new branch from a commit
> git checkout -b new_branch_name commit_hash
>
> # create a new branch based on another branch
> git checkout -b new_branch_name existing_branch_name
>
> # push to remote
> git push -u origin branch_name
>
> # force to push
> git push -u origin branch_name --force
>
> # rename currently local branch
> git branch -m old_branch new_branch
>
> # verify branch
> git branch
>
> # remote
> git branch -r
>
> push renamed branch to remote and delete the one on remote
> git push origin -u new_branch
> git push origin --delete old_branch
>
> # remove a local branch
> git branch -d branch_name
>
> # force
> git branch -D branch_name
>
> # remove a remote branch
> git push origin --delete branch_name
> ```

> [!example]+ Stage and Unstage
>
> ```shell
> # stage file
> git add file
>
> # stage multi-files
> git add file_1 file_2
>
> # folder
> git add folder
>
> # stage all changes
> git add .
>
> # unstage file
> git restore --staged file
>
> # or
> git reset file
> ```

> [!example]+ Discard changes
>
> ```shell
> # discard changes in a file
> git restore file
>
> # discard all changes (unstaged)
> git restore .
>
> # discard all staged and unstaged
> git rest --hard # don't apply for newly created files
>
> # clean new file
> git clean -df
> ```

> [!example]+ Pull
>
> ```shell
> # fetch all
> git fetch --all
>
> # pull latest commit of branch_name
> git pull origin branch_name
> ```

> [!example]+ Merge
>
> ```shell
> # merge current branch (b1) in (b2)
> git checkout b2
> git merge b1
>
> # if there are conflicts -> modify manually and then
> git add conflict_file_name
> git commit
>
> # check the commit history
> git log --graph --decorate --oneline
> ```

> [!example]+ Reset current branch to a commit
>
> ```shell
> # Soft  - Keep all changes
> # (all files in commits that come after the chosen commit)
> # will be kept as staged, all unstagged changes will be kept as they are)
> git reset --soft commit_hash
>
> # uncommit (undo the recent commit)
> git reset --soft HEAD~1
>
> # hard - discard all changes
> git reset --hard commit_hash
>
> # mixed - keep working copy and reset index
> # (all files in commit that come after the chosen commit)
> # will be kept as unstagged, all unstagged will be kept as they are)
> git reset --mixed commit_hash
> ```

> [!example]+ Revert commit
>
> ```shell
> git revert commit_hash
> ```

> [!example] Cherry-pick commit
>
> ```shell
> # cherry pick a commit to the current branch
> git cherry-pick commit_hash
>
> # to another branch
> git checkout another_branch
> git cherry-pick commit_hash
>
> # resolve conflicts if any
> git add file_name
> git cherry-pick --continue
>
> # abort
> git cherry-pick --abort
> ```

_to be continued..._
