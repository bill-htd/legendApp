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
var JadeUpTipsWin = (function (_super) {
    __extends(JadeUpTipsWin, _super);
    function JadeUpTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "YuPeiUpTipsSkin";
        _this.isTopLevel = true;
        return _this;
    }
    JadeUpTipsWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTouch);
        var info = args[0];
        var itemConfig = GlobalConfig.ItemConfig[info.id];
        this.itemIcon.setData(itemConfig);
        this.nameLabel.text = itemConfig.name;
        this.use.text = info.used + "/" + info.curMax;
        this.num.text = info.count + "";
        this.attr.textFlow = TextFlowMaker.generateTextFlow1(itemConfig.desc);
        var maxPhase = Math.floor((Object.keys(GlobalConfig.JadePlateLevelConfig).length - 1) / GlobalConfig.JadePlateBaseConfig.perLevel) + 1;
        var cfg;
        var show = false;
        var i;
        for (i = info.jade; i <= maxPhase; i++) {
            cfg = GlobalConfig.JadePlateLevelConfig[(i - 1) * GlobalConfig.JadePlateBaseConfig.perLevel];
            if (cfg.upgradeItemInfo && cfg.upgradeItemInfo[info.id] && (+cfg.upgradeItemInfo[info.id]) > info.curMax) {
                show = true;
                break;
            }
        }
        if (show) {
            this.info.visible = true;
            this.num0.text = i + "阶";
        }
        else
            this.info.visible = false;
    };
    JadeUpTipsWin.prototype.close = function () {
        this.removeTouchEvent(this, this.onTouch);
    };
    JadeUpTipsWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return JadeUpTipsWin;
}(BaseEuiView));
__reflect(JadeUpTipsWin.prototype, "JadeUpTipsWin");
ViewManager.ins().reg(JadeUpTipsWin, LayerManager.UI_Main);
//# sourceMappingURL=JadeUpTipsWin.js.map