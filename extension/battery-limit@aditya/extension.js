import Gio from 'gi://Gio';
import St from 'gi://St';
import GObject from 'gi://GObject';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

const BATTERY_COMMAND = '/usr/local/bin/battery';

const BatteryIndicator = GObject.registerClass(
class BatteryIndicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, 'BatteryLimit');

        const box = new St.BoxLayout({
            style_class: 'panel-status-menu-box',
        });

        const icon = new St.Icon({
            icon_name: 'battery-symbolic',
            style_class: 'system-status-icon',
        });

        box.add_child(icon);
        this.add_child(box);

        this._addLimitItem('60%');
        this._addLimitItem('80%');
        this._addLimitItem('100%');
    }

    _addLimitItem(limit) {
        const item = new PopupMenu.PopupMenuItem(`Set ${limit}`);

        item.connect('activate', () => {
            this._setLimit(limit, item);
        });

        this.menu.addMenuItem(item);
    }

    async _setLimit(limit, item) {
        item.reactive = false;

        try {
            const process = Gio.Subprocess.new(
                [BATTERY_COMMAND, limit.replace('%', '')],
                Gio.SubprocessFlags.STDOUT_PIPE |
                Gio.SubprocessFlags.STDERR_PIPE
            );

            const [stdout, stderr] = await process.communicate_utf8_async(null, null);

            if (!process.get_successful()) {
                const message = stderr?.trim() || 'The battery limit could not be changed.';
                Main.notifyError('Battery Limit', message);
                log(`Battery Limit failed: ${message}`);
                return;
            }

            Main.notify('Battery Limit', `Charge limit set to ${limit}`);
            log(`Battery limit set to ${limit}: ${stdout?.trim() || 'success'}`);
        } catch (error) {
            Main.notifyError(
                'Battery Limit',
                'Could not run /usr/local/bin/battery. Make sure the CLI is installed.'
            );
            logError(error, 'Battery Limit command failed');
        } finally {
            item.reactive = true;
        }
    }
});

export default class BatteryLimitExtension extends Extension {
    enable() {
        this._indicator = new BatteryIndicator();
        Main.panel.addToStatusArea(this.uuid, this._indicator);
    }

    disable() {
        this._indicator?.destroy();
        this._indicator = null;
    }
}
