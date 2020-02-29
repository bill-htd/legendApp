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
var BagAddItemWarn = (function (_super) {
    __extends(BagAddItemWarn, _super);
    function BagAddItemWarn() {
        return _super.call(this) || this;
    }
    BagAddItemWarn.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "OpenCellSkin";
        this.price.setType(MoneyConst.yuanbao);
    };
    BagAddItemWarn.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.decBtn, this.onTap);
        this.addTouchEvent(this.addBtn, this.onTap);
        this.addTouchEvent(this.sureBtn, this.onTap);
        this.addTouchEvent(this.cancelBtn, this.onTap);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.setCount(5);
    };
    BagAddItemWarn.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.decBtn, this.onTap);
        this.removeTouchEvent(this.addBtn, this.onTap);
        this.removeTouchEvent(this.sureBtn, this.onTap);
        this.removeTouchEvent(this.cancelBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.bgClose, this.onTap);
    };
    BagAddItemWarn.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.decBtn:
                this.setCount(Number(this.count.text) - 5);
                break;
            case this.addBtn:
                this.setCount(Number(this.count.text) + 5);
                break;
            case this.sureBtn:
                if (Actor.yb >= this.price.getPrice()) {
                    UserBag.ins().sendAddBagGrid(Number(this.count.text) / 5);
                }
                else {
                    UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
                    ViewManager.ins().close(this);
                    break;
                }
            case this.cancelBtn:
            case this.closeBtn:
                ViewManager.ins().close(BagAddItemWarn);
                break;
            case this.bgClose:
                ViewManager.ins().close(BagAddItemWarn);
                break;
        }
    };
    BagAddItemWarn.prototype.setCount = function (num) {
        var config = GlobalConfig.BagBaseConfig;
        var bagExConfig = GlobalConfig.BagExpandConfig;
        var bagExConfigLen = CommonUtils.getObjectLength(bagExConfig);
        var row = (UserBag.ins().bagNum - config.baseSize) / config.rowSize;
        var canOpenNum = (bagExConfigLen - row) * config.rowSize;
        if (num < 5) {
            num = 5;
            UserTips.ins().showTips("|C:0xf3311e&T:已经是最小扩张数|");
        }
        else if (num > canOpenNum) {
            num = canOpenNum;
            UserTips.ins().showTips("|C:0xf3311e&T:已经是最大扩张数|");
        }
        this.count.text = "" + num;
        var ybNum = 0;
        var len = num / config.rowSize;
        for (var i = 1; i <= len; i++) {
            ybNum += bagExConfig[row + i].cost;
        }
        this.price.setPrice(ybNum);
    };
    return BagAddItemWarn;
}(BaseEuiView));
__reflect(BagAddItemWarn.prototype, "BagAddItemWarn");
ViewManager.ins().reg(BagAddItemWarn, LayerManager.UI_Popup);
//# sourceMappingURL=BagAddItemWarn.js.map