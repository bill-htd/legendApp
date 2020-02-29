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
var RSpecialRingWin = (function (_super) {
    __extends(RSpecialRingWin, _super);
    function RSpecialRingWin() {
        var _this = _super.call(this) || this;
        _this.ringLv = 0;
        _this.skinName = "RingTips";
        return _this;
    }
    RSpecialRingWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.iconMc = new MovieClip();
        this.iconMc.x = 170;
        this.iconMc.y = 160;
        this.gainList0.itemRenderer = RingGainItem;
        this.btnUse.visible = false;
    };
    RSpecialRingWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.index = param[0];
        if (param[1] == null)
            param[1] = 0;
        this._otherPlayerData = param[2];
        this.roleSelect.setCurRole(param[1]);
        if (this.iconMc && !this.iconMc.parent)
            this.mcGroup.addChild(this.iconMc);
        this.addTouchEvent(this.colorCanvas0, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addChangeEvent(this.roleSelect, this.roleChange);
        this.gainList0.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchList, this);
        var config = GlobalConfig.ExRingConfig[this.index];
        var gainConfig = GlobalConfig.GainItemConfig[config.costItem];
        this.gainList0.dataProvider = new eui.ArrayCollection(gainConfig.gainWay);
        this.roleChange();
    };
    RSpecialRingWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.colorCanvas0, this.onTap);
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.roleSelect.removeEventListener(egret.Event.CHANGE, this.roleChange, this);
        this.gainList0.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchList, this);
        DisplayUtils.removeFromParent(this.iconMc);
        this.removeObserve();
    };
    RSpecialRingWin.prototype.onTouchList = function (e) {
        var item = e.item;
        if (e.item == null) {
            return;
        }
        var openSuccess = ViewManager.ins().viewOpenCheck(item[1], item[2]);
        if (openSuccess) {
            GameGuider.guidance(item[1], item[2], true);
        }
    };
    RSpecialRingWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.colorCanvas0:
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    RSpecialRingWin.prototype.showIcon = function () {
        var effSoure = this.index ? "hushen" : "mabi";
        this.iconMc.playFile(RES_DIR_EFF + effSoure, -1);
    };
    RSpecialRingWin.prototype.roleChange = function (isUpgrade) {
        if (isUpgrade === void 0) { isUpgrade = false; }
        var select = this.roleSelect.getCurRole();
        this.ringLv = this._otherPlayerData.roleData[select].getExRingsData(this.index);
        this.showIcon();
        var config = GlobalConfig.ExRingConfig[this.index];
        var ringConfig = GlobalConfig["ExRing" + this.index + "Config"][0];
        var ringNextConfig = GlobalConfig["ExRing" + this.index + "Config"][1];
        if (this.ringLv == 0) {
            this.currentState = "lock";
            this.tips.source = "tjweijihuo";
        }
        else {
            this.currentState = "actived";
            this.tips.source = "tjyijihuo";
        }
        if (ringNextConfig) {
            var attName = "";
            var value = 0;
            var i = 0;
            var index = 0;
            var str = "";
            for (var j = 0; j < ringNextConfig.attrAward.length; j++) {
                i = ringNextConfig.attrAward[j].type;
                if (i == 15 || i == 13)
                    continue;
                attName = AttributeData.getAttrStrByType(i);
                value = ringNextConfig.attrAward[j].value;
                if (attName.length < 3)
                    attName = AttributeData.inserteBlank(attName, 7);
                this["attr" + index].text = attName + "\uFF1A";
                if (i > 1 && i < 9) {
                    if (i == 7 || i == 8) {
                        str = value / 100 + "%";
                    }
                    else {
                        str = value.toString();
                    }
                }
                else if (i > 12 && i < 15 || i > 15) {
                    if (i == AttributeType.atCritEnhance)
                        str = (value / 100 + 150) + "%";
                    else
                        str = value / 100 + "%";
                }
                this["value" + index].text = str;
                index++;
            }
            var power = UserBag.getAttrPower(ringNextConfig.attrAward);
            this.powerPanel.setPower(power);
            this.powerPanel.setMcVisible(false);
            this.validateNow();
            var itemCfg = GlobalConfig.ItemConfig[config.costItem];
            this.specialAttr.textFlow = TextFlowMaker.generateTextFlow1(itemCfg.desc);
            this.nameLabel.text = "" + config.name;
        }
    };
    return RSpecialRingWin;
}(BaseEuiView));
__reflect(RSpecialRingWin.prototype, "RSpecialRingWin");
ViewManager.ins().reg(RSpecialRingWin, LayerManager.UI_Main);
//# sourceMappingURL=RSpecialRingWin.js.map