var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SettingView = (function (_super) {
    __extends(SettingView, _super);
    function SettingView() {
        var _this = _super.call(this) || this;
        _this.skinName = "settingskin";
        return _this;
    }
    SettingView.prototype.open = function () {
        this.addTouchEvent(this.cbSound, this.onTouch);
        this.addTouchEvent(this.cbShake, this.onTouch);
        this.addTouchEvent(this.cbHeji, this.onTouch);
        this.addTouchEvent(this.cbQuanPing, this.onTouch);
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.cbSound.selected = SysSetting.ins().getBool(SysSetting.SOUND_EFFECT);
        this.cbShake.selected = SysSetting.ins().getBool(SysSetting.SHAKE_WIN);
        this.cbHeji.selected = SysSetting.ins().getBool(SysSetting.AUTO_HEJI);
        this.cbQuanPing.selected = this.isFullScree();
    };
    SettingView.prototype.isFullScree = function () {
        return window['isFullScree']() || false;
    };
    SettingView.prototype.onTouch = function (e) {
        var tar = e.currentTarget;
        if (tar == this.cbSound) {
            SysSetting.ins().setBool(SysSetting.SOUND_EFFECT, tar.selected);
            UserTips.ins().showTips("");
        }
        else if (tar == this.cbShake) {
            SysSetting.ins().setBool(SysSetting.SHAKE_WIN, tar.selected);
        }
        else if (tar == this.cbHeji) {
            SysSetting.ins().setBool(SysSetting.AUTO_HEJI, tar.selected);
        }
        else if (tar == this.cbQuanPing) {
            if (tar.selected) {
                window['FullScree']();
            }
            else {
                window['exitfullscreen']();
            }
        }
        else if (tar == this.bgClose) {
            ViewManager.ins().close(this);
        }
    };
    return SettingView;
}(BaseEuiView));
__reflect(SettingView.prototype, "SettingView");
ViewManager.ins().reg(SettingView, LayerManager.UI_Popup);
//# sourceMappingURL=SettingView.js.map