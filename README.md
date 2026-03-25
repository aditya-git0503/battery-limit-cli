# Battery Limit CLI (Linux)

Battery Limit CLI is a simple command-line tool to control battery charging limits on Linux laptops that support charge thresholds.

It allows you to set your battery to stop charging at 60%, 80%, or 100%, helping improve long-term battery health.

---

## Features

* Set battery charge limit to 60%, 80%, or 100%
* Check current battery status (limit, charging state, percentage)
* Automatically detects BAT0 or BAT1
* Includes safety checks for unsupported systems
* Lightweight and easy to use

---

## Requirements

Your system must support battery charge control via:

/sys/class/power_supply/BAT*/charge_control_end_threshold

If this file does not exist on your system, the tool will not work.

---

## Installation

Download the latest release from the Releases section.

Then run:

sudo dpkg -i battery-limit_1.0_all.deb

---

### Option 2: Install manually

Clone the repository:

git clone https://github.com/aditya-git0503/battery-limit-cli.git

cd battery-limit-cli

Copy the script to a system path:

sudo cp battery /usr/local/bin/battery

sudo chmod +x /usr/local/bin/battery

---

## Usage

Set battery limit:

battery 60

battery 80

battery 100

Check battery status:

battery status

---

## Example Output

Battery Status:

Current Limit: 80%

Charging State: Not charging

Battery Level: 76%

---

## Notes

* You may be prompted for your password when setting limits (this is expected)
* Changes take effect immediately
* If your current battery level is above the limit, charging will stop until it drops below the limit

---

## Tested On

* ASUS Vivobook S14 (i7-13620H)

---
