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
var OSATarget4Panel = (function (_super) {
    __extends(OSATarget4Panel, _super);
    function OSATarget4Panel() {
        var _this = _super.call(this) || this;
        _this.type4PanelList = [];
        return _this;
    }
    OSATarget4Panel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    OSATarget4Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.cruPanel) {
            this.cruPanel.close();
            DisplayUtils.removeFromParent(this.cruPanel);
        }
        this.observe(Rank.ins().postRankingData, this.initInfo);
        this.initPanelList();
    };
    OSATarget4Panel.prototype.initInfo = function (model) {
        this.openPanel(model);
    };
    OSATarget4Panel.prototype.openPanel = function (model) {
        this.cruPanel = this.type4PanelList[this.activityID + ""];
        this.cruPanel.open(model);
        this.addChild(this.cruPanel);
    };
    OSATarget4Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.cruPanel)
            this.cruPanel.close();
    };
    OSATarget4Panel.prototype.initPanelList = function () {
        var config = GlobalConfig.ActivityConfig[this.activityID];
        if (!this.type4PanelList[this.activityID + ""]) {
            var panel = new OSATarget4Panel2();
            panel.top = 0;
            panel.bottom = 0;
            panel.left = 0;
            panel.right = 0;
            this.type4PanelList[this.activityID + ""] = panel;
            this.type4PanelList[this.activityID + ""].activityID = this.activityID;
        }
        var rankType = GlobalConfig.ActivityType4Config[this.activityID][0].rankType;
        if (rankType && rankType != RankDataType.TYPE_HF_XIAOFEI)
            Rank.ins().sendGetRankingData(rankType);
        else {
            this.openPanel();
        }
    };
    OSATarget4Panel.prototype.updateData = function () {
        this.cruPanel.updateData();
    };
    return OSATarget4Panel;
}(ActivityPanel));
__reflect(OSATarget4Panel.prototype, "OSATarget4Panel");
//# sourceMappingURL=OSATarget4Panel.js.map