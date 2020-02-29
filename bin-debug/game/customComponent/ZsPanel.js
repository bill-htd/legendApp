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
var ZsPanel = (function (_super) {
    __extends(ZsPanel, _super);
    function ZsPanel() {
        var _this = _super.call(this) || this;
        _this.lastZsLevel = -1;
        return _this;
    }
    ZsPanel.prototype.childrenCreated = function () {
        this.init();
    };
    ZsPanel.prototype.init = function () {
        this.link.textFlow = new egret.HtmlTextParser().parser("<u>\u83B7\u53D6\u4FEE\u4E3A</u>");
        this.eff = new MovieClip;
        this.eff.x = 420;
        this.eff.y = 100;
        this.eff.touchEnabled = false;
        this.eff.scaleX = 0.6;
        this.eff.scaleY = 0.5;
        this.upLevelEff = new MovieClip;
        this.upLevelEff.x = 284;
        this.upLevelEff.y = 314;
        this.upLevelEff.scaleX = this.upLevelEff.scaleY = 2;
        this.upLevelEff.touchEnabled = false;
        this.maxGroup.touchEnabled = false;
    };
    ZsPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addEvents();
    };
    ZsPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEvent();
    };
    ZsPanel.prototype.addEvents = function () {
        this.addTouchEvent(this.getBtn, this.onTap);
        this.addTouchEvent(this.link, this.onTap);
        this.observe(UserZs.ins().postZsData, this.setData);
        this.observe(Actor.ins().postLevelChange, this.setData);
    };
    ZsPanel.prototype.removeEvent = function () {
        this.removeTouchEvent(this.getBtn, this.onTap);
        this.removeTouchEvent(this.link, this.onTap);
        DisplayUtils.removeFromParent(this.eff);
        DisplayUtils.removeFromParent(this.upLevelEff);
        this.removeObserve();
    };
    ZsPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.getBtn:
                var ins = UserZs.ins();
                var config = GlobalConfig.ZhuanShengLevelConfig[ins.lv + 1];
                if (ins.exp < config.exp) {
                    UserTips.ins().showTips("修为不足");
                    return;
                }
                UserZs.ins().sendZsUpgrade();
                break;
            case this.link:
                ViewManager.ins().open(GainZsWin);
                break;
        }
    };
    ZsPanel.prototype.setData = function () {
        this.curAtt.lineSpacing = 5;
        this.nextAtt.lineSpacing = 5;
        var ins = UserZs.ins();
        this.redPoint.visible = ins.canUpgrade();
        this.curZsLv.text = "\u5F53\u524D\u8F6C\u751F\u7B49\u7EA7\uFF1A" + ins.lv + "\u8F6C";
        this.haveTxt.text = ins.exp + "";
        var config = GlobalConfig.ZhuanShengLevelConfig[ins.lv];
        this.curAtt.text = AttributeData.getAttStr(config, 1);
        var objAtts = [];
        for (var k in AttributeData.translate) {
            if (isNaN(config[k]))
                continue;
            var a = new AttributeData;
            a.type = parseInt(AttributeData.translate[k]);
            a.value = config[k];
            objAtts.push(a);
        }
        var len = SubRoles.ins().subRolesLen;
        this._totalPower = UserBag.getAttrPower(objAtts) * len;
        this.powerPanel.setPower(this._totalPower);
        var nextAttConfig = GlobalConfig.ZhuanShengLevelConfig[ins.lv + 1];
        if (nextAttConfig) {
            this.nextAtt.text = AttributeData.getAttStr(nextAttConfig, 1);
            this.useTxt.text = nextAttConfig.exp + "";
            this.maxGroup.visible = false;
            this.normalGroup.visible = true;
        }
        else {
            var currAttConfig = GlobalConfig.ZhuanShengLevelConfig[ins.lv];
            this.group.visible = false;
            this.curAtt.horizontalCenter = 0;
            this.maxTxt.visible = true;
            this.arrowImg.visible = false;
            this.nextAtt.visible = false;
            this.normalGroup.visible = false;
            this.maxGroup.visible = true;
            var count = 0;
            var maxCount = 4;
            for (var i = 0; i < objAtts.length; i++) {
                if (i >= 4)
                    break;
                this["attr" + i].text = AttributeData.getAttStr(objAtts[i], 0.5);
            }
        }
        if (this.lastZsLevel != -1 && this.lastZsLevel != ins.lv) {
            if (!this.upLevelEff.parent)
                this.mainGroup.addChild(this.upLevelEff);
            this.upLevelEff.playFile(RES_DIR_EFF + "zhuanshengeff", 1);
        }
        else {
            DisplayUtils.removeFromParent(this.upLevelEff);
        }
        this.lastZsLevel = ins.lv;
        if (ins.canGet() && nextAttConfig) {
            if (!this.eff.parent)
                this.group.addChild(this.eff);
            this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
        }
        else
            DisplayUtils.removeFromParent(this.eff);
    };
    return ZsPanel;
}(BaseView));
__reflect(ZsPanel.prototype, "ZsPanel");
//# sourceMappingURL=ZsPanel.js.map