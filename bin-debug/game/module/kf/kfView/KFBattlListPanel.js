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
var KFBattlListPanel = (function (_super) {
    __extends(KFBattlListPanel, _super);
    function KFBattlListPanel() {
        var _this = _super.call(this) || this;
        _this.count = 1;
        _this.name = "\u8DE8\u670D";
        return _this;
    }
    KFBattlListPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    KFBattlListPanel.prototype.open = function () {
        this.addTouchEvent(this, this.onTap);
        this.refRedpoint();
    };
    KFBattlListPanel.prototype.onTap = function (e) {
        switch (e.target) {
            case this.btn0:
                ViewManager.ins().open(WJBattlefieldWin);
                break;
            case this.helpLink0:
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[25].text);
                break;
        }
    };
    KFBattlListPanel.prototype.refRedpoint = function () {
        for (var i = 0; i < this.count; i++) {
            this["redPoint" + i].visible = KFBattleRedPoint.ins()["postRedPoint" + (i + 1)]();
        }
    };
    return KFBattlListPanel;
}(BaseComponent));
__reflect(KFBattlListPanel.prototype, "KFBattlListPanel");
//# sourceMappingURL=KFBattlListPanel.js.map