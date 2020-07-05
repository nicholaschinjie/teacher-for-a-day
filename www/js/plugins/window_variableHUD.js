/*:
*
* @plugindesc For the variable window and the bars of the teacher.
*
* @author Trevin Wong
*
*
*/

var successPoints = 100;

terb_scene_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    terb_scene_start.call(this);
}

function Window_VariableHUD() {
    this.initialize.apply(this, arguments);
}

Window_VariableHUD.prototype = Object.create(Window_Base.prototype);
Window_VariableHUD.prototype.constructor = Window_VariableHUD;
Window_VariableHUD.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_VariableHUD.prototype.windowWidth = function() {
    return 300;
};

Window_VariableHUD.prototype.windowHeight = function() {
    return 150;
};

Window_VariableHUD.prototype.refresh = function() {
    this.contents.clear();
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    this.drawGauge(0, 0, 10, $gameVariables.value(13) / 4, color1, color2);
};

Window_VariableHUD.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

Window_VariableHUD.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, 20, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, 20, color1, color2);
    this.drawText("Success", x, y, 100);
    this.drawCurrentAndMax($gameVariables.value(13), 100, x, y, 260,
                           this.normalColor(), this.normalColor());
};
    
var terb_map_start = Scene_Map.prototype.start;    
Scene_Map.prototype.start = function() {
    terb_map_start.call(this);
    this._varWindow = new Window_VariableHUD();
    this.addWindow(this._varWindow);
};

var terb_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    terb_map_update.call(this);
    this._varWindow.refresh();
};