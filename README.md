# 🔋 Battery Limit CLI (Linux)

Battery Limit CLI is a lightweight tool to control battery charging limits on Linux laptops that support charge thresholds.

It allows you to stop charging at **60%, 80%, or 100%**, helping improve long-term battery health.

---

## ✨ Features

* Set battery charge limit to **60%, 80%, or 100%**
* Automatically detects **BAT0 / BAT1**
* Includes safety checks for unsupported systems
* Simple CLI + GNOME panel integration
* Lightweight and fast

---

## 🖥️ GNOME Extension (Optional)

This repository also includes a GNOME Shell extension that lets you control battery limits directly from the **top panel**.

### Features:

* One-click limit selection (60 / 80 / 100)
* System password prompt via `pkexec`
* Clean panel icon UI

📦 Located at:

```
extension/battery-limit@aditya/
```

---

## 📁 Repository Structure

```
battery-limit-cli/
├── extension/
│   └── battery-limit@aditya/
│       ├── extension.js
│       └── metadata.json
│
├── battery
├── battery-limit.zip
├── README.md
```

---

## ⚙️ Requirements

Your system must support battery charge control via:

```
/sys/class/power_supply/BAT*/charge_control_end_threshold
```

If this file does not exist, the tool will not work.

---

## 📦 Installation

### Option 1 — Install using `.deb`

Download from **Releases**, then:

```bash
sudo dpkg -i battery-limit_1.0_all.deb
```

---

### Option 2 — Manual install

```bash
git clone https://github.com/aditya-git0503/battery-limit-cli.git
cd battery-limit-cli

sudo cp battery /usr/local/bin/battery
sudo chmod +x /usr/local/bin/battery
```

---

## 🚀 Usage

### Set battery limit

```bash
battery 60
battery 80
battery 100
```

---

### Check battery status

```bash
battery status
```

---

## 📊 Example Output

```
Battery Status:
Current Limit: 80%
Charging State: Not charging
Battery Level: 76%
```

---

## 🧩 GNOME Extension Installation

### Manual install

```bash
mkdir -p ~/.local/share/gnome-shell/extensions/

cp -r extension/battery-limit@aditya \
~/.local/share/gnome-shell/extensions/

gnome-extensions enable battery-limit@aditya
```

---

## 🔐 Permissions

* Changing battery limits requires root access
* The GNOME extension uses `pkexec` for secure authentication
* You will see a system password prompt when applying limits

---

## 🧪 Tested On

* ASUS Vivobook S14 (i7-13620H); GNOME version : 46; Ubuntu version : 24.04.4 LTS 

---

## ⚠️ Notes

* Changes take effect immediately
* If battery is above the limit, charging will pause
* Not all laptops support charge limiting

---

## 📌 Future Improvements

* Show live battery % in panel
* Dynamic battery icon
* Support for more hardware

---

## ⭐ Contributing

Feel free to open issues or submit PRs!

---

