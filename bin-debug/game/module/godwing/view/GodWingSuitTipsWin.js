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
var GodWingSuitTipsWin = (function (_super) {
    __extends(GodWingSuitTipsWin, _super);
    function GodWingSuitTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ShenYuSuitTipsSkin";
        return _this;
    }
    GodWingSuitTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    GodWingSuitTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this.bgClose, this.onClick);
        this.roleIndex = param[0];
        var mySuitLevel = Wing.ins().getGodWing(this.roleIndex).getSuitLevel();
        var nextSuitLevel = 0;
        if (mySuitLevel) {
            nextSuitLevel = Wing.ins().getNextLevel(mySuitLevel);
        }
        this.gwsConfig = GlobalConfig.GodWingSuitConfig[mySuitLevel];
        if (!this.gwsConfig) {
            for (var i in GlobalConfig.GodWingSuitConfig) {
                this.gwsConfig = GlobalConfig.GodWingSuitConfig[i];
                break;
            }
        }
        if (!mySuitLevel) {
            this.currentState = "unactive";
        }
        else {
            this.nextConfig = GlobalConfig.GodWingSuitConfig[nextSuitLevel];
            if (this.nextConfig) {
                this.currentState = "active";
            }
            else {
                this.currentState = "max";
            }
        }
        this.validateNow();
        this.updateDesc();
    };
    GodWingSuitTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onClick);
        this.removeObserve();
    };
    GodWingSuitTipsWin.prototype.onClick = function () {
        ViewManager.ins().close(this);
    };
    GodWingSuitTipsWin.prototype.updateDesc = function () {
        this.setCurDesc();
        this.setNextDesc();
    };
    GodWingSuitTipsWin.prototype.setCurDesc = function () {
        if (this.currentState == "unactive") {
            var precent = Math.floor(this.gwsConfig.precent / 100);
            var totalSum = Wing.GodWingMaxSlot;
            var mySum = Wing.ins().getGodWing(this.roleIndex).getSuitSum();
            this.content0.text = "\u6FC0\u6D3B\u6761\u4EF6\uFF1A\u5168\u90E8\u795E\u7FBD1\u9636\u53EF\u6FC0\u6D3B\uFF08" + mySum + "/" + totalSum + "\uFF09\n\u6FC0\u6D3B\u5C5E\u6027\uFF1A\u7FBD\u7FFC\u5168\u5C5E\u6027+" + precent + "%";
            this.name0.text = this.gwsConfig.suitname;
        }
        else if (this.currentState == "max") {
            var precent = Math.floor(this.gwsConfig.precent / 100);
            this.content0.text = "\u6FC0\u6D3B\u5C5E\u6027\uFF1A\u7FBD\u7FFC\u5168\u5C5E\u6027+" + precent + "%";
            this.name0.text = this.gwsConfig.suitname;
        }
        else {
            var precent = Math.floor(this.gwsConfig.precent / 100);
            this.content0.text = "\u6FC0\u6D3B\u5C5E\u6027\uFF1A\u7FBD\u7FFC\u5168\u5C5E\u6027+" + precent + "%";
            this.name0.text = this.gwsConfig.suitname;
        }
    };
    GodWingSuitTipsWin.prototype.setNextDesc = function () {
        if (this.currentState == "active") {
            var precent = Math.floor(this.nextConfig.precent / 100);
            var totalSum = Wing.GodWingMaxSlot;
            var slotData = Wing.ins().calcGodWingSlot(this.roleIndex);
            var mySum = 0;
            for (var i = 0; i < slotData.length; i++) {
                if (slotData[i].level >= this.nextConfig.lv) {
                    mySum++;
                }
            }
            var glc = GlobalConfig.GodWingLevelConfig[this.nextConfig.lv][1];
            var showLv = GlobalConfig.GodWingItemConfig[glc.itemId].showlv;
            this.content1.text = "\u6FC0\u6D3B\u6761\u4EF6\uFF1A\u5168\u90E8\u795E\u7FBD" + showLv + "\u9636\u53EF\u6FC0\u6D3B\uFF08" + mySum + "/" + totalSum + "\uFF09\n\u6FC0\u6D3B\u5C5E\u6027\uFF1A\u7FBD\u7FFC\u5168\u5C5E\u6027+" + precent + "%";
            this.name1.text = this.nextConfig.suitname;
        }
    };
    return GodWingSuitTipsWin;
}(BaseEuiView));
__reflect(GodWingSuitTipsWin.prototype, "GodWingSuitTipsWin");
ViewManager.ins().reg(GodWingSuitTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=GodWingSuitTipsWin.js.map