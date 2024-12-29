---
title: Git
published: true
verified: true
tags:
  - Git
  - Web-Dev
  - Skills
  - Tools
createDate: 2023-10-29T00:00:00
---
Quick references for basic task with git

> [!tip] For easier tasks, just [use Smart Git](https://www.syntevo.com/smartgit/) to make things visually. However, **it’s paid**

## Installation & Tools
- Download and install GIT (to use command lines): [Git’s Homepage](https://git-scm.com/)
- Git client tools: [Github Desktop](https://desktop.github.com/) (Windows, MacOS, [Linux](https://github.com/shiftkey/desktop/)), [Smart Git](https://www.syntevo.com/smartgit/) (Windows, Linux, macOS - Native M1), [Source Tree](https://www.sourcetreeapp.com/)
- Git GUI for Terminal: lazygit
## Setting on Local Environments

```bash
# Info User 
git config user.name "namnh198" git config user.email "namnhn98@gmail.com" 

# Save token login (Don't need to login again every time we use this user) 
git config credential.helper store 

# Don't track file & folder permissions change 
git config core.fileMode false 

# Disable pull rebase 
git config pull.rebase false 

# Format display 
git config color.ui true 
git config format.pretty oneline
```
If you want to configure for all repositories. You can use the option `--global`
## Check the status

> [!multi-column]
> 
>> [!info]+ Check status
>> ```bash
>> git status
>> git status -s #modified date
>> ```
> 
>> [!warning]+ Remote
>> ```bash
>> git remote -v
>> ```

Check logs commit:

```bash
# With colors 
git log --online --graph --color --all --decorate 

# --grap: draw text-based branches 
# --decorate: display name and tags 
git log -- <file> 

# Check commit containing <file> 
git log --prep='abc' 

# Look for commits containing "abc" in their name 
git log <from>..<to> 

# display commits from <from> to <to> 
# Check current HEAD 
git log -1 # Something likes HEAD -> <branch-name>
```
Check the changes of some file

```bash
git diff <file> 
git diff <file> > file_name.patch # Save the changes to another file 
git show <file>
```

Check the list of files in the last commit

```bash
# Get the last commit id 
git log --format="%H" -n 1 

# list of files 
git diff-tree --no-commit-id --name-only -r <commit_id>
```
