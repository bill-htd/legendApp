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
var RedBagDetailsWin = (function (_super) {
    __extends(RedBagDetailsWin, _super);
    function RedBagDetailsWin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedBagDetailsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "RedBagDetailsSkin";
        this.list.itemRenderer = RedBagRenderer;
        this.effect = new MovieClip;
        this.effect.x = 244;
        this.effect.y = 300;
    };
    RedBagDetailsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
        this.num.text = GuildWar.ins().getModel().robYbNum + "";
        this.list.dataProvider = new eui.ArrayCollection(GuildWar.ins().getModel().rebList);
        if (param[0]) {
            this.effect.playFile(RES_DIR_EFF + "yanhuaeff", 1);
            this.addChild(this.effect);
        }
    };
    RedBagDetailsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onTap);
        DisplayUtils.removeFromParent(this.effect);
    };
    RedBagDetailsWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(RedBagDetailsWin);
                break;
        }
    };
    return RedBagDetailsWin;
}(BaseEuiView));
__reflect(RedBagDetailsWin.prototype, "RedBagDetailsWin");
ViewManager.ins().reg(RedBagDetailsWin, LayerManager.UI_Main);
//# sourceMappingURL=RedBagDetailsWin.js.map