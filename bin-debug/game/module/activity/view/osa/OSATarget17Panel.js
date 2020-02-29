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
var OSATarget17Panel = (function (_super) {
    __extends(OSATarget17Panel, _super);
    function OSATarget17Panel() {
        return _super.call(this) || this;
    }
    OSATarget17Panel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.panelList = [];
    };
    OSATarget17Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateData);
        this.observe(Activity.ins().postChangePage, this.updateData);
        this.observe(Activity.ins().postRewardResult, this.updateData);
        this.showPanel();
    };
    OSATarget17Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        if (this.curPanel)
            this.curPanel.close();
    };
    OSATarget17Panel.prototype.showPanel = function (type) {
        if (type === void 0) { type = 1; }
        if (!this.panelList[type]) {
            var Cls = egret.getDefinitionByName("OSATarget17Panel" + type);
            this.panelList[type] = new Cls();
            this.panelList[type].top = 0;
            this.panelList[type].bottom = 0;
            this.panelList[type].left = 0;
            this.panelList[type].right = 0;
            this.panelList[type].activityID = this.activityID;
            this.panelList[type].showPanel = this.showPanel.bind(this);
        }
        if (this.curPanel) {
            this.curPanel.close();
            DisplayUtils.removeFromParent(this.curPanel);
        }
        this.curPanel = this.panelList[type];
        this.curPanel.open();
        this.addChild(this.curPanel);
    };
    OSATarget17Panel.prototype.updateData = function () {
        this.curPanel && this.curPanel.updateData();
    };
    return OSATarget17Panel;
}(ActivityPanel));
__reflect(OSATarget17Panel.prototype, "OSATarget17Panel");
//# sourceMappingURL=OSATarget17Panel.js.map