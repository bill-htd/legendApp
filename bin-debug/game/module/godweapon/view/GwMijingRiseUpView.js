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
var GwMijingRiseUpView = (function (_super) {
    __extends(GwMijingRiseUpView, _super);
    function GwMijingRiseUpView() {
        var _this = _super.call(this) || this;
        _this.isMax1 = false;
        _this.isMax2 = false;
        return _this;
    }
    GwMijingRiseUpView.prototype.initUI = function () {
        this.skinName = "GwRiseUpSkin";
    };
    GwMijingRiseUpView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.gold.selected = true;
        this.addTouchEvent(this.gold, this.onTap);
        this.addTouchEvent(this.yuanbao, this.onTap);
        this.addTouchEvent(this.sureBtn, this.onTap);
        this.addTouchEvent(this.cancelBtn, this.onTap);
        this.observe(GodWeaponCC.ins().postFubenInfo, this.updateView);
        this.updateView();
    };
    GwMijingRiseUpView.prototype.updateView = function () {
        var data = GodWeaponCC.ins().fubenInfoData;
        var addNum = data.getBuyCount * 10;
        this.now.text = "\u5F53\u524D\u9F13\u821E  \u4F24\u5BB3 +" + addNum + "%";
        this.goldCost.text = GlobalConfig.GodWeaponBaseConfig.buyBuff[0].moneyCount + "";
        this.yuanbaoCost.text = GlobalConfig.GodWeaponBaseConfig.buyBuff[1].moneyCount + "";
        var dataType = data.buyTypeData(1);
        if (dataType[1] >= GlobalConfig.GodWeaponBaseConfig.buyBuff[0].maxCount) {
            this.gold.visible = false;
            this.goldImg.visible = false;
            this.goldCost.visible = false;
            this.goldText.text = "\u91D1\u5E01\u9F13\u821E\u6B21\u6570\u5DF2\u6EE1";
            this.isMax1 = true;
            this.gold.selected = false;
        }
        dataType = data.buyTypeData(2);
        if (dataType[1] >= GlobalConfig.GodWeaponBaseConfig.buyBuff[1].maxCount) {
            this.yuanbao.visible = false;
            this.yuanbaoCost.visible = false;
            this.yuanbaoImg.visible = false;
            this.yuanbaoText.text = "\u5143\u5B9D\u9F13\u821E\u6B21\u6570\u5DF2\u6EE1";
            this.isMax2 = true;
        }
    };
    GwMijingRiseUpView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.gold, this.onTap);
        this.removeTouchEvent(this.yuanbao, this.onTap);
        this.removeTouchEvent(this.cancelBtn, this.onTap);
        this.removeTouchEvent(this.cancelBtn, this.onTap);
        this.removeObserve();
    };
    GwMijingRiseUpView.prototype.onTap = function (e) {
        switch (e.target) {
            case this.gold:
                this.yuanbao.selected = false;
                this.gold.selected = true;
                break;
            case this.yuanbao:
                this.yuanbao.selected = true;
                this.gold.selected = false;
                break;
            case this.cancelBtn:
                ViewManager.ins().close(this);
                break;
            case this.sureBtn:
                if (this.isMax2 && this.isMax1) {
                    UserTips.ins().showTips("\u9F13\u821E\u6B21\u6570\u5DF2\u6EE1");
                    return;
                }
                if (!this.yuanbao.selected && !this.gold.selected) {
                    UserTips.ins().showTips("\u8BF7\u9009\u62E9\u8D2D\u4E70\u7684\u91D1\u94B1\u7C7B\u578B");
                    return;
                }
                if (this.gold.selected) {
                    if (Actor.gold < GlobalConfig.GodWeaponBaseConfig.buyBuff[0].moneyCount) {
                        UserTips.ins().showCenterTips("\u91D1\u5E01\u4E0D\u8DB3");
                        return;
                    }
                }
                else {
                    if (Actor.yb < GlobalConfig.GodWeaponBaseConfig.buyBuff[1].moneyCount) {
                        UserTips.ins().showCenterTips("\u5143\u5B9D\u4E0D\u8DB3");
                        return;
                    }
                }
                GodWeaponCC.ins().buybuff(this.gold.selected ? 1 : 2);
                var maxCount = GlobalConfig.GodWeaponBaseConfig.buyBuff[1].maxCount + GlobalConfig.GodWeaponBaseConfig.buyBuff[0].maxCount;
                if (GodWeaponCC.ins().fubenInfoData.getBuyCount == maxCount - 1) {
                    ViewManager.ins().close(this);
                }
                break;
        }
    };
    return GwMijingRiseUpView;
}(BaseEuiView));
__reflect(GwMijingRiseUpView.prototype, "GwMijingRiseUpView");
ViewManager.ins().reg(GwMijingRiseUpView, LayerManager.UI_Popup);
//# sourceMappingURL=GwMijingRiseUpView.js.map