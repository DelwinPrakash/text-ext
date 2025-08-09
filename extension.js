/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import GObject from 'gi://GObject';
import St from 'gi://St';
import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';

import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, _('display top text'));

        this._label = new St.Label({
            text: "DELWIN",
            y_align: Clutter.ActorAlign.CENTER,
            opacity: 255
        });

        this.add_child(this._label);

        this._phrases = ["hello world", "gm gm", "how are you?", "you alright?", "code code code", "shipping soon", "vibe coding", "build build build", "rebooting", "dev mode on", "still loading...", "touch grass", "error 404: sleep", "ERROR:404", "ping me later", "commit and push", "sudo relax", "DELWIN", "drink water", "caffeine++", "tab >>> spaces", "no bugs today", "typing...", "one more deploy", "trust the process", "it's fine :)", "ctrl + z", "late night coding", "weekend? never heard of it", "running on coffee", "I'm fine :/", "Clrt C + Clrt V", "git commit -m 'shit, it works'", "just one more line", "syntax error", "refactor later", "love you <3", "ship it", "code is poetry", "it works on my machine", "brain not braining", "wifi down", "console.log('hello world')", "rm -rf /", "AI did it", "kernel panic", "git push --force", "trash code", "I copied your code", "that's not my code"];

        this._timeoutId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 30, () => {
            this._animateTextChange();
            return GLib.SOURCE_CONTINUE;
        });
    }
    
    _animateTextChange(){
        this._label.ease({
            opacity: 0,
            duration: 500,
            mode: Clutter.AnimationMode.EASE_OUT_QUAD,
            onComplete: () => {
                let randomIndex = Math.floor(Math.random() * this._phrases.length);
                this._label.set_text(this._phrases[randomIndex]);

                this._label.ease({
                    opacity: 255,
                    duration: 500,
                    mode: Clutter.AnimationMode.EASE_IN_QUAD
                });
            }
        });
    }

    destroy(){
        if(this._timeoutId){
            GLib.Source.remove(this._timeoutId);
            this._timeoutId = null;
        }
        super.destroy();
    }
});

export default class IndicatorExampleExtension extends Extension {
    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this.uuid, this._indicator, 2, 'left');
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}
