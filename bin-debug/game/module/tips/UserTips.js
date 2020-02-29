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
var UserTips = (function (_super) {
    __extends(UserTips, _super);
    function UserTips() {
        return _super.call(this) || this;
    }
    Object.defineProperty(UserTips.prototype, "view", {
        get: function () {
            if (!this._view || !this._view.parent) {
                ViewManager.ins().open(TipsView);
                this._view = ViewManager.ins().getView(TipsView);
            }
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    UserTips.prototype.showTips = function (str, func) {
        if (str == "\u5143\u5B9D\u4E0D\u8DB3" || str == "|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|") {
            var w = WarnWin.show("\u5143\u5B9D\u4E0D\u8DB3\uFF0C\u662F\u5426\u524D\u5F80\u5145\u503C\uFF1F", null, null, function () {
                var rdata = Recharge.ins().getRechargeData(0);
                if (!rdata || rdata.num != 2) {
                    ViewManager.ins().open(Recharge1Win);
                }
                else {
                    ViewManager.ins().open(ChargeFirstWin);
                }
                if (func && typeof func == "function")
                    func();
            });
            w.setBtnLabel("\u53D6\u6D88", "\u524D\u5F80");
            return;
        }
        DelayOptManager.ins().addDelayOptFunction(this.view, this.view.showTips, str);
    };
    UserTips.prototype.showCenterTips = function (str) {
        DelayOptManager.ins().addDelayOptFunction(this.view, this.view.showCenterTips, str);
    };
    UserTips.prototype.showCenterTips2 = function (str) {
        DelayOptManager.ins().addDelayOptFunction(this.view, this.view.showCenterTips2, str);
    };
    UserTips.prototype.showCenterTips3 = function (str) {
        DelayOptManager.ins().addDelayOptFunction(this.view, this.view.showCenterTips3, str);
    };
    UserTips.prototype.showSceneTips = function (str) {
        DelayOptManager.ins().addDelayOptFunction(this.view, this.view.showSceneTips, str);
    };
    UserTips.prototype.showTaskTips = function (str) {
        DelayOptManager.ins().addDelayOptFunction(this.view, this.view.showTaskTips, str);
    };
    UserTips.prototype.showAttrTips = function (type, value) {
        DelayOptManager.ins().addDelayOptFunction(this.view, this.view.showAttrTips, [type, value]);
    };
    UserTips.prototype.showGoodEquipTips = function (itemData) {
        this.view.showGoodEquipTip(itemData);
    };
    UserTips.prototype.showSkillTips = function (skillID) {
        this.view.showSkillTip(skillID);
    };
    UserTips.prototype.showItemTips = function (itemID) {
        this.view.showItemTip(itemID);
    };
    UserTips.prototype.showHeartItemTips = function (itemID) {
        this.view.showHeartItemTip(itemID);
    };
    UserTips.prototype.showBoxTips = function (id) {
        this.view.showBoxTip(id);
    };
    UserTips.prototype.showBoostPower = function (currentValue, lastValue) {
        ViewManager.ins().open(BoostPowerView).showBoostPower(currentValue, lastValue);
    };
    UserTips.prototype.showFuncNotice = function (lv) {
        ViewManager.ins().open(FuncNoticeWin).showWin(lv);
    };
    UserTips.prototype.showRewardBox = function (type) {
        this.view.showRewardBox(type);
    };
    UserTips.prototype.showEverTips = function (str) {
        DelayOptManager.ins().addDelayOptFunction(this.view, this.view.showEverTips, str);
    };
    UserTips.prototype.showHintTips = function (pic) {
        DelayOptManager.ins().addDelayOptFunction(this.view, this.view.showHintTips, pic);
    };
    UserTips.prototype.showGoodRewardTips = function (itemData) {
        this.view.showGoodRewardTip(itemData);
    };
    return UserTips;
}(BaseClass));
__reflect(UserTips.prototype, "UserTips");
//# sourceMappingURL=UserTips.js.map