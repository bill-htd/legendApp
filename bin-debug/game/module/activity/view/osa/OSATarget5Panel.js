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
var OSATarget5Panel = (function (_super) {
    __extends(OSATarget5Panel, _super);
    function OSATarget5Panel() {
        var _this = _super.call(this) || this;
        _this.type5PanelList = [];
        return _this;
    }
    OSATarget5Panel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.initPanelList();
    };
    OSATarget5Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateData);
        this.observe(Activity.ins().postChangePage, this.updateData);
        this.observe(Activity.ins().postRewardResult, this.updateData);
        if (this.cruPanel) {
            this.cruPanel.close();
            DisplayUtils.removeFromParent(this.cruPanel);
        }
        var id = this.activityID;
        this.initPanelList();
        this.cruPanel = this.type5PanelList[id + ""];
        this.cruPanel.open();
        this.addChild(this.cruPanel);
    };
    OSATarget5Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        if (this.cruPanel)
            this.cruPanel.close();
    };
    OSATarget5Panel.prototype.initPanelList = function () {
        var id = this.activityID;
        if (!this.type5PanelList[id + ""]) {
            var clsStr = OSATarget5Panel.targetIndex[id] || ("OSATarget5Panel" + GlobalConfig.ActivityType5Config[id][1].showType);
            var Cls = egret.getDefinitionByName(clsStr);
            this.type5PanelList[id + ""] = new Cls(this.activityID);
            this.type5PanelList[id + ""].top = 0;
            this.type5PanelList[id + ""].bottom = 0;
            this.type5PanelList[id + ""].left = 0;
            this.type5PanelList[id + ""].right = 0;
            this.type5PanelList[id + ""].activityID = this.activityID;
        }
    };
    OSATarget5Panel.prototype.updateData = function () {
        this.cruPanel.updateData();
    };
    OSATarget5Panel.targetIndex = {
        157: "OSATarget5Panel1",
        210: "OSATarget5Panel2",
        2005: "OSATarget5Panel4"
    };
    return OSATarget5Panel;
}(ActivityPanel));
__reflect(OSATarget5Panel.prototype, "OSATarget5Panel");
//# sourceMappingURL=OSATarget5Panel.js.map