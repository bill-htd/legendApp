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
var OSATarget19Panel = (function (_super) {
    __extends(OSATarget19Panel, _super);
    function OSATarget19Panel() {
        return _super.call(this) || this;
    }
    OSATarget19Panel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.panelList = [];
    };
    OSATarget19Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateData);
        this.observe(Activity.ins().postChangePage, this.updateData);
        this.observe(Activity.ins().postRewardResult, this.updateData);
        this.showPanel();
    };
    OSATarget19Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        if (this.curPanel)
            this.curPanel.close();
    };
    OSATarget19Panel.prototype.showPanel = function () {
        var config = GlobalConfig.ActivityType19Config[this.activityID];
        if (!config)
            return;
        var showType = config[1].showType;
        if (!this.panelList[showType]) {
            var Cls = egret.getDefinitionByName("OSATarget19Panel" + showType);
            this.panelList[showType] = new Cls();
            this.panelList[showType].top = 0;
            this.panelList[showType].bottom = 0;
            this.panelList[showType].left = 0;
            this.panelList[showType].right = 0;
            this.panelList[showType].activityID = this.activityID;
            this.panelList[showType].showPanel = this.showPanel.bind(this);
        }
        if (this.curPanel) {
            this.curPanel.close();
            DisplayUtils.removeFromParent(this.curPanel);
        }
        this.curPanel = this.panelList[showType];
        this.curPanel.open();
        this.addChild(this.curPanel);
    };
    OSATarget19Panel.prototype.updateData = function () {
        this.curPanel && this.curPanel.updateData();
    };
    return OSATarget19Panel;
}(ActivityPanel));
__reflect(OSATarget19Panel.prototype, "OSATarget19Panel");
//# sourceMappingURL=OSATarget19Panel.js.map