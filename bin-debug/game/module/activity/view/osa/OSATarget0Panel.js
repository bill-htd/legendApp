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
var OSATarget0Panel = (function (_super) {
    __extends(OSATarget0Panel, _super);
    function OSATarget0Panel() {
        var _this = _super.call(this) || this;
        _this.type0PanelList = [];
        return _this;
    }
    OSATarget0Panel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.initPanelList();
    };
    OSATarget0Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.cruPanel) {
            this.cruPanel.close();
            DisplayUtils.removeFromParent(this.cruPanel);
        }
        var id = this.activityID - 10000;
        this.initPanelList();
        this.cruPanel = this.type0PanelList[id + ""];
        this.cruPanel.open();
        this.addChild(this.cruPanel);
    };
    OSATarget0Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.cruPanel)
            this.cruPanel.close();
    };
    OSATarget0Panel.prototype.initPanelList = function () {
        var aconfg = GlobalConfig.ActivityBtnConfig[this.activityID];
        var id = this.activityID - 10000;
        if (!this.type0PanelList[id + ""]) {
            var clsStr = OSATarget0Panel.targetIndex[aconfg.showType] || "OSATarget0Panel1";
            var Cls = egret.getDefinitionByName(clsStr);
            this.type0PanelList[id + ""] = new Cls(this.activityID);
            this.type0PanelList[id + ""].top = 0;
            this.type0PanelList[id + ""].bottom = 0;
            this.type0PanelList[id + ""].left = 0;
            this.type0PanelList[id + ""].right = 0;
            this.type0PanelList[id + ""].activityID = this.activityID;
        }
    };
    OSATarget0Panel.prototype.updateData = function () {
        this.cruPanel.updateData();
    };
    OSATarget0Panel.targetIndex = {
        1: "OSATarget0Panel1",
        2: "OSATarget0Panel2",
        3: "OSATarget0Panel3",
        4: "OSA3HeroesPanel",
        5: "HefuXunbaoPanel",
        6: "HefuAncientBossPanel",
        7: "HefuLCZBPanel",
        8: "OSATarget0Panel8",
        9: "OSATarget0Panel9",
        11: "OSATarget0Panel4",
    };
    return OSATarget0Panel;
}(ActivityPanel));
__reflect(OSATarget0Panel.prototype, "OSATarget0Panel");
//# sourceMappingURL=OSATarget0Panel.js.map