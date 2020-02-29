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
var WanBaGiftWin = (function (_super) {
    __extends(WanBaGiftWin, _super);
    function WanBaGiftWin() {
        return _super.call(this) || this;
    }
    WanBaGiftWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GiftNoticeSkin";
    };
    WanBaGiftWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var day = param[0];
        var result = param[1];
        this.currentState = result ? "success" : "fail";
        this.addTouchEvent(this.okBtn, this.onTap);
        var config = GlobalConfig.WanBaGiftbagBasic[day];
        var s = "";
        for (var i = 0; i < config.items.length; i++) {
            if (config.items[i].type == 0)
                s += RewardData.getCurrencyName(config.items[i].id);
            else
                s += GlobalConfig.ItemConfig[config.items[i].id].name;
            s += "×" + config.items[i].count;
            if (i + 1 < config.items.length)
                s += "、";
        }
        this.text.text = s;
    };
    WanBaGiftWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.okBtn, this.onTap);
    };
    WanBaGiftWin.prototype.onTap = function (e) {
        ViewManager.ins().close(this);
    };
    return WanBaGiftWin;
}(BaseEuiView));
__reflect(WanBaGiftWin.prototype, "WanBaGiftWin");
ViewManager.ins().reg(WanBaGiftWin, LayerManager.UI_Main);
//# sourceMappingURL=WanBaGiftWin.js.map