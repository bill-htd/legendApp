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
var HeartMethodSkillTips = (function (_super) {
    __extends(HeartMethodSkillTips, _super);
    function HeartMethodSkillTips() {
        var _this = _super.call(this) || this;
        _this.skinName = 'heartmethodSkillTipSkin';
        return _this;
    }
    HeartMethodSkillTips.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onClick);
        this.observe(HeartMethod.ins().postHeartUpLevel, this.updateUI);
        this.roleId = param[0];
        this.heartId = param[1];
        this.updateUI();
    };
    HeartMethodSkillTips.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onClick);
    };
    HeartMethodSkillTips.prototype.onClick = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    HeartMethodSkillTips.prototype.updateUI = function () {
        var suitLv = HeartMethod.ins().calcHeartSkillLevel(this.roleId, this.heartId);
        var config = GlobalConfig.HeartMethodSuitConfig[this.heartId];
        var maxLv = Object.keys(config).length;
        var curConfig;
        if (!suitLv) {
            this.currentState = "initial";
            curConfig = config[1];
        }
        else if (suitLv >= maxLv) {
            this.currentState = "max";
            curConfig = config[maxLv];
        }
        else {
            this.currentState = "normal";
            curConfig = config[suitLv];
        }
        this.validateNow();
        var hmcfg = GlobalConfig.HeartMethodConfig[this.heartId];
        if (hmcfg) {
            this.skillName.text = hmcfg.name;
            this.skillShow.source = hmcfg.skillShowPic + "_png";
        }
        var color = ItemBase.QUALITY_COLOR[curConfig.level];
        this["curskillDesc0"].textFlow = TextFlowMaker.generateTextFlow1("|C:" + color + "&T:\u3010" + curConfig.skillname + "\u3011");
        var suitCount = "";
        var curCount = HeartMethod.ins().getHeartSuitCount(this.roleId, this.heartId, curConfig.level);
        var maxCount = GlobalConfig.HeartMethodConfig[this.heartId].posList.length;
        suitCount = "(" + curCount + "/" + maxCount + ")";
        if (this.currentState == "initial") {
            this["curskillDesc2"].text = this.getColorDesc(curConfig.level) + suitCount;
            this["curskillDesc3"].text = curConfig.skilldesc;
        }
        else if (this.currentState == "normal") {
            var nextConfig = config[suitLv + 1];
            this["curskillDesc3"].text = curConfig.skilldesc;
            curCount = HeartMethod.ins().getHeartSuitCount(this.roleId, this.heartId, nextConfig.level);
            suitCount = "(" + curCount + "/" + maxCount + ")";
            color = ItemBase.QUALITY_COLOR[nextConfig.level];
            this["nextskillTitle0"].textFlow = TextFlowMaker.generateTextFlow1("|C:" + color + "&T:\u3010" + nextConfig.skillname + "\u3011");
            this["nextskillTitle2"].text = this.getColorDesc(nextConfig.level) + suitCount;
            this["nextskillTitle3"].text = nextConfig.skilldesc;
        }
        else if (this.currentState == "max") {
            this["nextskillTitle0"].textFlow = TextFlowMaker.generateTextFlow1("|C:" + color + "&T:\u3010" + curConfig.skillname + "\u3011");
            this["nextskillTitle3"].text = curConfig.skilldesc;
        }
    };
    HeartMethodSkillTips.prototype.getColorDesc = function (quality) {
        var str = "";
        switch (quality) {
            case 0:
                str = "白色";
                break;
            case 1:
                str = "绿色";
                break;
            case 2:
                str = "紫色";
                break;
            case 3:
                str = "橙色";
                break;
            case 4:
                str = "红色";
                break;
        }
        if (str)
            str = "\u6536\u96C6\u4E00\u5957" + str + "\u5FC3\u6CD5\u6B8B\u9875\u6FC0\u6D3B";
        return str;
    };
    return HeartMethodSkillTips;
}(BaseEuiView));
__reflect(HeartMethodSkillTips.prototype, "HeartMethodSkillTips");
ViewManager.ins().reg(HeartMethodSkillTips, LayerManager.UI_Popup);
//# sourceMappingURL=HeartMethodSkillTips.js.map