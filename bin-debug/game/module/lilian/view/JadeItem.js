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
var JadeItem = (function (_super) {
    __extends(JadeItem, _super);
    function JadeItem() {
        var _this = _super.call(this) || this;
        _this.perLevel = 11;
        _this._oldLevel = -1;
        _this._oldJade = 0;
        _this._mcList = [];
        return _this;
    }
    JadeItem.prototype.setLevel = function (level, showFire) {
        var _this = this;
        if (level == this._oldLevel)
            return;
        this._oldLevel = level;
        var jade = Math.floor(level / (this.perLevel * 9));
        var phase = (Math.floor(level / this.perLevel) + 1) % 9;
        this.skinName = "YuPei" + jade + "Skin";
        if (phase == 0)
            phase = 9;
        if (this._nexMc && this._nexMc.parent)
            this._nexMc.parent.removeChild(this._nexMc);
        var mc;
        var showNext;
        for (var i = 1; i <= 9; i++) {
            mc = this._mcList[i - 1];
            if (mc && mc.parent)
                mc.parent.removeChild(mc);
            if (this._oldJade != jade && mc)
                mc.stop();
            if (i > 1)
                this["line" + (i - 2)].visible = false;
            showNext = false;
            if (i <= phase) {
                if (i < phase || (level % this.perLevel) == 10) {
                    if (!mc) {
                        mc = new MovieClip();
                        this._mcList[i - 1] = mc;
                    }
                    this["processEff" + (i - 1)].addChild(mc);
                    if (i == phase && showFire) {
                        if (!mc.isPlaying) {
                            var t = egret.Tween.get(this);
                            mc.playFile(RES_DIR_EFF + "bally3", 1, null, false);
                            t.wait(800).call(function () {
                                _this._mcList[phase - 1].playFile(RES_DIR_EFF + "ballb2", -1);
                            });
                        }
                    }
                    else if (!mc.isPlaying)
                        mc.playFile(RES_DIR_EFF + "ballb2", -1);
                    if (i > 1)
                        this["line" + (i - 2)].visible = true;
                }
                else
                    showNext = true;
            }
            else
                showNext = !this._nexMc || !this._nexMc.parent;
            if (showNext) {
                if (!this._nexMc)
                    this._nexMc = new MovieClip();
                this["processEff" + (i - 1)].addChild(this._nexMc);
                if (!this._nexMc.isPlaying)
                    this._nexMc.playFile(RES_DIR_EFF + "ballb1", -1);
                if (i > 1)
                    this["line" + (i - 2)].visible = true;
            }
        }
        this._oldJade = jade;
    };
    JadeItem.prototype.close = function () {
        _super.prototype.close.call(this);
        Tween.removeTweens(this);
        var len = this._mcList.length;
        for (var i = 0; i < len; i++) {
            this._mcList[i].dispose();
            this._mcList[i] = null;
        }
        this._mcList.length = 0;
        this._mcList = null;
        if (this._nexMc) {
            this._nexMc.dispose();
            this._nexMc = null;
        }
    };
    return JadeItem;
}(BaseComponent));
__reflect(JadeItem.prototype, "JadeItem");
//# sourceMappingURL=JadeItem.js.map