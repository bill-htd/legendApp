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
var KffieldPanel = (function (_super) {
    __extends(KffieldPanel, _super);
    function KffieldPanel() {
        return _super.call(this) || this;
    }
    KffieldPanel.prototype.open = function () {
        this.addTouchEvent(this, this.onTouch);
        this.observe(KFBattleRedPoint.ins().postRedPoint, this.refRedPoint);
        this.observe(DevildomRedPoint.ins().postRedPoint, this.refRedPoint);
        this.observe(KfArenaRedPoint.ins().postRedPoint, this.refRedPoint);
        this.initData();
        this.refRedPoint();
    };
    KffieldPanel.prototype.close = function () {
        this.$onClose();
        DisplayUtils.removeFromParent(this.kfBossMc);
    };
    KffieldPanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.island0:
                ViewManager.ins().open(KFBossWin);
                break;
            case this.island1:
                ViewManager.ins().open(KfArenaWin);
                break;
            case this.island2:
                break;
            case this.island3:
                ViewManager.ins().open(DevildomWin, DevildomBossModel.ins().getCurFbIndex());
                break;
        }
    };
    KffieldPanel.prototype.initData = function () {
        var _this = this;
        this.island0.currentState = "unlock";
        this.island0["title"].source = "kf_function_boss";
        this.island0["island"].source = "";
        this.island3.currentState = "unlock";
        egret.callLater(function () {
            _this.island3["title"].source = "kf_function_invasion";
            _this.island3["island"].source = "kf_field_invasion";
        }, this);
        if (!this.kfBossMc) {
            this.kfBossMc = new MovieClip();
            this.kfBossMc.scaleX = this.kfBossMc.scaleY = .45;
            this.kfBossMc.x = 0;
            this.kfBossMc.y = 35;
        }
        this.island0["boossGroup"].addChild(this.kfBossMc);
        var showBody = GlobalConfig.CrossBossBase.showBoss ? GlobalConfig.CrossBossBase.showBoss : "monster10041_3s";
        this.kfBossMc.playFile(RES_DIR_MONSTER + showBody, -1);
        egret.callLater(function () {
            _this.island1["title"].source = "kf_function_ladder";
            _this.island1["island"].source = "kf_field_ladder";
        }, this);
        this.island1.currentState = "unlock";
        this.island2.currentState = "lock";
    };
    KffieldPanel.prototype.refRedPoint = function () {
        this.island0["redPoint"].visible = KFBattleRedPoint.ins().redPoint2;
        this.island1["redPoint"].visible = KfArenaRedPoint.ins().redpoint;
        this.island3["redPoint"].visible = DevildomRedPoint.ins().redPoint;
    };
    return KffieldPanel;
}(BaseView));
__reflect(KffieldPanel.prototype, "KffieldPanel");
//# sourceMappingURL=KffieldPanel.js.map