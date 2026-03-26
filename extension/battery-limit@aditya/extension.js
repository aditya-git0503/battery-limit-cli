'use strict';

import St from 'gi://St';
import GObject from 'gi://GObject';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import * as Util from 'resource:///org/gnome/shell/misc/util.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

let indicator = null;

const BatteryIndicator = GObject.registerClass(
class BatteryIndicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, 'BatteryLimit');

        const box = new St.BoxLayout({
            style_class: 'panel-status-menu-box'
        });

        const icon = new St.Icon({
            icon_name: 'battery-symbolic',
            style_class: 'system-status-icon'
        });

        box.add_child(icon);
        this.add_child(box);

        // Set limit options ONLY
        this._addItem("Set 60%", "pkexec /usr/local/bin/battery 60");
        this._addItem("Set 80%", "pkexec /usr/local/bin/battery 80");
        this._addItem("Set 100%", "pkexec /usr/local/bin/battery 100");
    }

    _addItem(text, command) {
        const item = new PopupMenu.PopupMenuItem(text);

        item.connect('activate', () => {
            log(`Running: ${command}`);

            Util.spawnCommandLine(command);

            // delayed success notification
            if (text.includes("Set")) {
                setTimeout(() => {
                    Util.spawnCommandLine(`notify-send "Battery Limit" "${text} applied successfully"`);
                }, 5000);
            }
        });

        this.menu.addMenuItem(item);
    }
});

export default class BatteryLimitExtension extends Extension {
    enable() {
        indicator = new BatteryIndicator();
        Main.panel.addToStatusArea('battery-limit', indicator);
    }

    disable() {
        if (indicator) {
            indicator.destroy();
            indicator = null;
        }
    }
}
