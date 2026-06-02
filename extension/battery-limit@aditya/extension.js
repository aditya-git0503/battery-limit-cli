1	'use strict';
2	
3	import St from 'gi://St';
4	import GObject from 'gi://GObject';
5	import * as Main from 'resource:///org/gnome/shell/ui/main.js';
6	import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
7	import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
8	import * as Util from 'resource:///org/gnome/shell/misc/util.js';
9	import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
10	
11	let indicator = null;
12	
13	const BatteryIndicator = GObject.registerClass(
14	class BatteryIndicator extends PanelMenu.Button {
15	    _init() {
16	        super._init(0.0, 'BatteryLimit');
17	
18	        const box = new St.BoxLayout({
19	            style_class: 'panel-status-menu-box'
20	        });
21	
22	        const icon = new St.Icon({
23	            icon_name: 'battery-symbolic',
24	            style_class: 'system-status-icon'
25	        });
26	
27	        box.add_child(icon);
28	        this.add_child(box);
29	
30	        this._addItem("Set 60%", "pkexec /usr/local/bin/battery 60");
31	        this._addItem("Set 80%", "pkexec /usr/local/bin/battery 80");
32	        this._addItem("Set 100%", "pkexec /usr/local/bin/battery 100");
33	    }
34	
35	    _addItem(text, command) {
36	        const item = new PopupMenu.PopupMenuItem(text);
37	
38	        item.connect('activate', () => {
39	            log(`Running: ${command}`);
40	            Util.spawnCommandLine(command);
41	
42	            if (text.includes("Set")) {
43	                Main.notify("Battery Limit", `${text} selected`);
44	            }
45	        });
46	
47	        this.menu.addMenuItem(item);
48	    }
49	});
50	
51	export default class BatteryLimitExtension extends Extension {
52	    enable() {
53	        indicator = new BatteryIndicator();
54	        Main.panel.addToStatusArea('battery-limit', indicator);
55	    }
56	
57	    disable() {
58	        if (indicator) {
59	            indicator.destroy();
60	            indicator = null;
61	        }
62	    }
63	}
