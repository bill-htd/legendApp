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
var TreasureChuanshiGiftWin = (function (_super) {
    __extends(TreasureChuanshiGiftWin, _super);
    function TreasureChuanshiGiftWin() {
        var _this = _super.call(this) || this;
        _this.lastSelected = -1;
        _this.maxNum = 0;
        _this.skinName = "TreasureChuanshiGift";
        return _this;
    }
    TreasureChuanshiGiftWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.type = args[0];
        this.id = args[1];
        this.num = args[2];
        this.addTouchEvent(this, this.onTouch);
        this.observe(UserBag.ins().postGiftResult, this.otherClose);
        this.addTouchEndEvent(this.minBtn0, this.onTap);
        this.addTouchEndEvent(this.maxBtn0, this.onTap);
        this.addTouchEndEvent(this.sub1Btn0, this.onTap);
        this.addTouchEndEvent(this.add1Btn0, this.onTap);
        this.addChangeEvent(this.numLabel0, this.onTxtChange);
        this.numLabel0.restrict = "0-9";
        this.numLabel0.text = "0";
        this.add.touchEnabled = false;
        this.add.touchChildren = false;
        this.update();
    };
    TreasureChuanshiGiftWin.prototype.update = function () {
        var config = GlobalConfig.OptionalGiftConfig[this.id];
        this.gift.itemRenderer = TreasureChuanshiItemRender;
        if (config.show[0]["reward"].length <= 4) {
            this.currentState = "special";
        }
        else {
            this.currentState = "normal";
        }
        this.validateNow();
        this.gift.dataProvider = new eui.ArrayCollection(config.show[0]["reward"]);
        this.gift.validateNow();
        this.choose.textFlow = TextFlowMaker.generateTextFlow1(config.show[0]["str"]);
        this.maxNum = this.num;
        this.useNum = 0;
    };
    TreasureChuanshiGiftWin.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.removeTouchEvent(this, this.onTouch);
        this.lastSelected = -1;
    };
    TreasureChuanshiGiftWin.prototype.onTouch = function (e) {
        if (e.target == this.get) {
            if (this.gift.selectedIndex < 0) {
                UserTips.ins().showTips("请选择一个奖励");
                return;
            }
            if (!this.useNum) {
                UserTips.ins().showTips("请选择开启的数量");
                return;
            }
            UserBag.ins().sendChoosableGift(this.id, this.useNum, this.gift.selectedIndex);
        }
        else if (e.target.parent == this.gift) {
            if (this.lastSelected >= 0)
                this.gift.getChildAt(this.lastSelected).checkSelcted(this.gift.selectedIndex);
            this.lastSelected = this.gift.selectedIndex;
            if (this.gift.dataProvider && this.lastSelected > -1 && this.lastSelected < this.gift.dataProvider.length) {
                this.gift.getChildAt(this.lastSelected).checkSelcted(this.gift.selectedIndex);
            }
            this.add.touchChildren = true;
            this.useNum = this.num;
            this.numLabel0.text = this.useNum + "";
        }
        else if (e.target == this.bgClose)
            this.otherClose();
    };
    TreasureChuanshiGiftWin.prototype.otherClose = function () {
        ViewManager.ins().close(this);
    };
    TreasureChuanshiGiftWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.minBtn0:
                this.useNum = 1;
                break;
            case this.maxBtn0:
                this.useNum = this.maxNum;
                break;
            case this.sub1Btn0:
                this.useNum--;
                if (this.useNum <= 0) {
                    this.useNum = 1;
                }
                break;
            case this.add1Btn0:
                this.useNum++;
                if (this.useNum > this.maxNum) {
                    this.useNum = this.maxNum;
                }
                break;
        }
        this.numLabel0.text = this.useNum + "";
    };
    TreasureChuanshiGiftWin.prototype.onTxtChange = function (e) {
        var num = Number(this.numLabel0.text);
        if (num > this.maxNum) {
            num = this.maxNum;
        }
        else if (num <= 0) {
            num = 1;
        }
        this.useNum = num;
        this.numLabel0.text = this.useNum + "";
    };
    return TreasureChuanshiGiftWin;
}(BaseEuiView));
__reflect(TreasureChuanshiGiftWin.prototype, "TreasureChuanshiGiftWin");
ViewManager.ins().reg(TreasureChuanshiGiftWin, LayerManager.UI_Popup);
//# sourceMappingURL=TreasureChuanshiGiftWin.js.map