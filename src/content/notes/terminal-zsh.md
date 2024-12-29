---
title: Terminal & ZSH
published: true
createDate: 2024-04-19T00:00:00
tags:
  - Tools
  - MacOS
  - Linux
updateDate: 2024-08-04
---
- Make your terminal looks like better. A collection of console terminal in serveral operations sytem.
- In this note, I used [Weterm](https://wezfurlong.org/wezterm/) for MacOS. If you use windows, you can use Windows Terminal + WSL
- Checkout my dotfiles in [Github Repository](https://github.com/namnh198/dotfiles)
## Install zsh + zinit
### Install ZSH

- Ubuntu + WSL

```bash frame="none"
sudo apt install zsh

# change zsh to default shell
sudo chsh -s $(which zsh)

```

- From MacOS Catalina, the default shell changed to the ZSH shell, you do not need to change.
### Install Zinit

- Automatic

```bash frame="none"
bash -c "$(curl --fail --show-error --silent --location https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```

- Manual

In your `.zshrc` add the following snippet:

```zsh title=".zshrc"
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
[ ! -d $ZINIT_HOME ] && mkdir -p "$(dirname $ZINIT_HOME)"
[ ! -d $ZINIT_HOME/.git ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"
```

Plugins

- zdharma-continuum/fast-syntax-highlighting
- zsh-users/zsh-autosuggestions
- zsh-users/zsh-completions

```zsh title=".zshrc"
zinit wait lucid light-mode for \
  atinit"zicompinit; zicdreplay" \
    zdharma-continuum/fast-syntax-highlighting \
  atload"_zsh_autosuggest_start" \
    zsh-users/zsh-autosuggestions \
  blockf atpull'zinit creinstall -q .' \
    zsh-users/zsh-completions
```

## Font & Themes

Install Nerd fonts (It provides for programing hight number icons)
- Manual: Go to Github Repository -> Choose fonts you want to use -> Download & Install
- Install by script:
  
```bash frame="none"
git clone https://github.com/ryanoasis/nerd-fonts.git 
cd nerd-fonts ./install.sh # (in Powershell run ./install.ps1
```

Install themes (Catppuccin Mocha)
1. Go to [https://catppuccin.com/ports](https://catppuccin.com/ports)
2. Search tools that you want to change theme
3. Follow their step to install

Install starship (theme zsh)

- Add this code below in your `.zshrc`
  
```bash
zinit ice as"command" from"gh-r" \
          atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
          atpull"%atclone" src"init.zsh"
zinit light starship/starship
```

- To get started configuring starship, create the following file: `~/.config/starship.toml`. Follow official guide to configure: [https://starship.rs/config/](https://starship.rs/config/)
- My Preset starship: [https://raw.githubusercontent.com/namnh198/dotfiles/main/zsh/.config/starship.toml](https://raw.githubusercontent.com/namnh198/dotfiles/main/zsh/.config/starship.toml)

## Aliases 
Sometimes you may encounter commands that are too long than necessary. Typing out such commands can become time-consuming and inefficient, especially if you regularly use the command. That’s where command aliases come into play.

You can define alias in file `.zshrc` follow:

```bash
alias <flag> <alias_name>="<command>"

#example
alias vim = 'nvim' # replace vim to neovim
alias g = 'git'
alias ll="eza -l -a --icons --group-directories-first"
alias ls="eza --color=always --long --git --no-filesize --icons=always --no-time --no-user --no-permissions --group-directories-first"
alias tree="eza --tree --all --color=always --icons --group-directories-first"
```

or install via zinit snippet

```bash
# turbo mode
zinit wait lucid for \ OMZL::git.zsh \ atload"unalias grv" \ OMZP::git

# without turbo mode
zinit snippet OMZL::git
```