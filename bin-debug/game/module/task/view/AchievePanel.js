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
var AchievePanel = (function (_super) {
    __extends(AchievePanel, _super);
    function AchievePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "AchievePanelSkin";
        _this.name = "成就";
        _this.list.itemRenderer = AchieveItem;
        return _this;
    }
    AchievePanel.prototype.open = function () {
        this.addTouchEvent(this.list, this.onSendFunc);
        this.observe(UserTask.ins().postTaskChangeData, this.setPanel);
        this.setPanel();
    };
    AchievePanel.prototype.close = function () {
        this.removeTouchEvent(this.list, this.onSendFunc);
        this.removeObserve();
    };
    AchievePanel.prototype.onSendFunc = function (e) {
        if (!(e.target instanceof eui.Button))
            return;
        var item = e.target.parent;
        switch (e.target) {
            case item.gotoBtn:
                GameGuider.taskGuidance(item.data.id, 1);
                break;
            case item.awardsBtn:
                UserTask.ins().sendGetAchieve(item.data.achievementId);
                break;
        }
    };
    AchievePanel.prototype.setPanel = function () {
        this._achieve = UserTask.ins().achiEvement;
        this.list.dataProvider = new eui.ArrayCollection(this._achieve);
    };
    return AchievePanel;
}(BaseView));
__reflect(AchievePanel.prototype, "AchievePanel");
//# sourceMappingURL=AchievePanel.js.map