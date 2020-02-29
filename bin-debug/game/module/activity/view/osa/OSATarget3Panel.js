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
var OSATarget3Panel = (function (_super) {
    __extends(OSATarget3Panel, _super);
    function OSATarget3Panel() {
        var _this = _super.call(this) || this;
        _this.type3PanelList = [];
        return _this;
    }
    OSATarget3Panel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.initPanelList();
    };
    OSATarget3Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateData);
        this.observe(Activity.ins().postChangePage, this.updateData);
        this.observe(Activity.ins().postRewardResult, this.updateData);
        this.observe(PActivity.ins().postActivityIsGetAwards, this.updateData);
        this.observe(PActivity.ins().postChangePage, this.updateData);
        this.observe(PActivity.ins().postRewardResult, this.updateData);
        if (this.cruPanel) {
            this.cruPanel.close();
            DisplayUtils.removeFromParent(this.cruPanel);
        }
        var id = this.activityID;
        this.initPanelList();
        this.cruPanel = this.type3PanelList[id + ""];
        this.cruPanel.open();
        this.addChild(this.cruPanel);
    };
    OSATarget3Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        if (this.cruPanel)
            this.cruPanel.close();
    };
    OSATarget3Panel.prototype.initPanelList = function () {
        var clsStr = "";
        var id = this.activityID;
        var config;
        if (this.activityType == ActivityType.Normal) {
            config = GlobalConfig.ActivityType3Config[id];
        }
        else if (this.activityType == ActivityType.Personal) {
            config = GlobalConfig.PActivity3Config[id];
        }
        for (var i in config) {
            if (!OSATarget3Panel.targetIndex[config[i].showType])
                continue;
            clsStr = OSATarget3Panel.targetIndex[config[i].showType];
            break;
        }
        if (!clsStr)
            return;
        if (!this.type3PanelList[id + ""]) {
            var Cls = egret.getDefinitionByName(clsStr);
            this.type3PanelList[id + ""] = new Cls(id);
            this.type3PanelList[id + ""].top = 0;
            this.type3PanelList[id + ""].bottom = 0;
            this.type3PanelList[id + ""].left = 0;
            this.type3PanelList[id + ""].right = 0;
            this.type3PanelList[id + ""].activityID = id;
        }
    };
    OSATarget3Panel.prototype.updateData = function () {
        this.cruPanel && this.cruPanel.updateData();
    };
    OSATarget3Panel.targetIndex = {
        1: "OSATarget3Panel3",
        2: "OSATarget3Panel2",
        3: "OSATarget3Panel4",
        4: "DailyRechargePanel",
        5: "OSATarget3Panel5",
        6: "OSATarget3Panel6",
        7: "OSATarget3Panel7",
        8: "OSATarget3Panel8",
        9: "OSATarget3Panel9",
        10: "OSATarget3Panel10"
    };
    return OSATarget3Panel;
}(ActivityPanel));
__reflect(OSATarget3Panel.prototype, "OSATarget3Panel");
//# sourceMappingURL=OSATarget3Panel.js.map