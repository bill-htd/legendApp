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
var HuntBoxsTips = (function (_super) {
    __extends(HuntBoxsTips, _super);
    function HuntBoxsTips() {
        var _this = _super.call(this) || this;
        _this.type = 0;
        return _this;
    }
    HuntBoxsTips.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "TreasureRuneGift";
    };
    HuntBoxsTips.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.index = param[0];
        if (param.length >= 2) {
            this.type = param[1];
            this.activityID = param[2];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
        this.gift.itemRenderer = ItemBase;
        if (this.type == 3)
            this.initActivity();
        else if (this.type == 2)
            this.initHeirloom();
        else
            this.initInfo();
    };
    HuntBoxsTips.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
    };
    HuntBoxsTips.prototype.initInfo = function () {
        var config = GlobalConfig.FuwenTreasureRewardConfig[this.index];
        if (!config)
            return;
        this.gift.dataProvider = new eui.ArrayCollection(config.reward);
        this.num0.text = Rune.ins().runeCount.toString();
        if (Rune.ins().boxs[this.index - 1] == Rune.UNGET) {
            var sum = config.needTime - Rune.ins().runeCount;
            this.num1.text = sum > 0 ? sum + "" : "0";
            this.already.visible = false;
        }
        else {
            this.num1.visible = this.num2.visible = this.num3.visible = false;
            this.already.visible = true;
        }
    };
    HuntBoxsTips.prototype.initHeirloom = function () {
        var config = GlobalConfig.HeirloomTreasureRewardConfig[this.index];
        if (!config)
            return;
        this.gift.dataProvider = new eui.ArrayCollection(config.reward);
        this.num0.text = Heirloom.ins().huntTimes.toString();
        if (Heirloom.ins().huntBoxInfo[this.index - 1] == Heirloom.UNGET) {
            var sum = config.needTime - Heirloom.ins().huntTimes;
            this.num1.text = sum > 0 ? sum + "" : "0";
            this.already.visible = false;
        }
        else {
            this.num1.visible = this.num2.visible = this.num3.visible = false;
            this.already.visible = true;
        }
    };
    HuntBoxsTips.prototype.initActivity = function () {
        var config = GlobalConfig.ActivityType18Config[this.activityID][this.index];
        this.gift.dataProvider = new eui.ArrayCollection(config.rewards);
        var data = Activity.ins().getActivityDataById(this.activityID);
        this.num0.text = data.num + "";
        var sum = config.dbCount - data.num;
        this.num1.text = sum > 0 ? sum + "" : "0";
        if (data.getStateByIndex(this.index) == 1) {
            this.already.visible = true;
        }
        else {
            this.already.visible = false;
        }
    };
    HuntBoxsTips.prototype.onTap = function () {
        ViewManager.ins().close(this);
    };
    return HuntBoxsTips;
}(BaseEuiView));
__reflect(HuntBoxsTips.prototype, "HuntBoxsTips");
ViewManager.ins().reg(HuntBoxsTips, LayerManager.UI_Popup);
//# sourceMappingURL=HuntBoxsTips.js.map