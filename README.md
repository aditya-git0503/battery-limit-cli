# Battery Limit CLI (Linux)

Battery Limit CLI is a lightweight utility for controlling battery charging limits on Linux laptops that support charge threshold management.

It allows users to stop charging at 60%, 80%, or 100%, helping improve long-term battery health and reduce battery wear.

An officially approved GNOME Shell extension is also available, providing a graphical interface directly from the GNOME top panel.

## Features

* Set battery charge limits to 60%, 80%, or 100%
* Display current battery status and configured charge limit
* Automatically detects a supported battery under `/sys/class/power_supply/BAT*`
* Includes safety checks for unsupported systems
* Simple command-line interface
* GNOME Shell extension integration
* Lightweight with no third-party runtime dependencies

## GNOME Shell Extension

The project includes an officially approved GNOME Shell extension that allows battery charge limits to be changed directly from the GNOME panel.

> **Important:** The GNOME Shell extension requires the `battery` CLI to be installed separately. Installing the extension from GNOME Extensions or Extension Manager does **not** install the CLI automatically.

### Extension Features

* One-click charge limit selection (60%, 80%, 100%)
* Uses the `battery` CLI for battery limit changes
* Secure authentication using `pkexec`
* Reports command failures instead of claiming success
* Native GNOME Shell integration
* Minimal and lightweight user interface

### GNOME Extension

Install the extension from GNOME Extensions:

https://extensions.gnome.org/extension/9584/battery-limit/

### CLI Requirement

The `battery` CLI must be installed before using the GNOME Shell extension.

Install the CLI with:

```bash
git clone https://github.com/aditya-git0503/battery-limit-cli.git
cd battery-limit-cli

sudo install -Dm755 battery /usr/local/bin/battery
