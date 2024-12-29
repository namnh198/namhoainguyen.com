---
title: Fresh Install Magento
createDate: 2024-12-10
updateDate: 2024-12-10
tags:
  - MacOS
draft: true
published: true
---
> [!warning] This note for me only

## Create boot Installer USB

- Download a full macOS installer from Apple
- Format USB to "MacOS Extended" (USB must be >= 32GB)
- Use terminal to create the bootable installer

```shell
# Sequoia
sudo /Applications/Install\ macOS\ Sequoia.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# Sonoma
sudo /Applications/Install\ macOS\ Sonoma.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# Ventura
sudo /Applications/Install\ macOS\ Ventura.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```

## Keyboard & Trackpad Settings

Go to **Keyboard Settings** and then

1. Should choose "U.S" instead of "U.S. International" because with the later, we have underline score below special symbols like `"`
2. For Vietnamese Input method, **Don't** choose built-in VN input options. Use [OpenKey](https://open-key.org/) instead (Need to allow this app in _Privacy & Security_ if you don't want to turn off _Gate keeper_) because there have uncomfortable underline when we type and I have problem when typing in some apps like Messenger,...
   - The [OpenKey](https://open-key.org/) support auto switch input method smart: You're using Skype with `V` mode but when you switch to Terminal the input method will be automatically `E` mode
   - The [OpenKey](https://open-key.org/) support both **Telex** and **VNI** but I recommend you should use **VNI** to avoid conflicts when typing English in `V` mode such as `as => á`, etc
3. Turn off "Use F1, F2 etc. keys as standard function keys" if you rarely uses them.
4. Key repeat rate -> Fast, Delay until repeat -> Short to skip delay when holding key

### Other useful keyboard tips

1. Enabled "Three finders to drag": \*\*System Settings -> Accessibility -> Pointer Control -> Trackpad Options"
2. Short switch new desktops: **Settings -> Keyboard -> Keyboard Shortcut -> Missing Control** -> Checked all **"Switch to Desktop"**

## Brew

### Installation

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# After installation, don't forget adding to PATH
echo 'eval $(/opt/homebrew/bin/brew shellenv)' >> ~/.zprofile
eval $(/opt/homebrew/bin/brew shellenv)
```

### Some commands

```shell
# install package
brew install package

# install app
brew install --cask app

# search package
brew search package

# list packages need to upgrade
brew outdated

# upgrade packages
brew upgrade
```

## Installation & Configuration CLI Tools

Checkout Repository: [https://github.com/namnh198/dotfiles](https://github.com/namnh198/dotfiles)

```shell

# download dotfiles
git clone https://github.com/namnh198/dotfiles ~/.dotfiles

# go to .dotfiles directory
cd ~/.dotfiles

# install packages
brew bundle --file=~/.dotfiles/brew/Brewfile

# config zsh
stow zsh

# config nvim
stow nvim

...
```

## Other Settings

1. Remove delay dock: `defaults write com.apple.dock "autohide-delay" -float "0" && killall Dock`
2. Paste as plain text `Cmd + Shift + V`
3. Cut & Paste file: `Cmd + C -> Cmd + V`
