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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TargetListPanel = (function (_super) {
    __extends(TargetListPanel, _super);
    function TargetListPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "TargetListSkin";
        _this.list1.itemRenderer = WorldBossHeadRender;
        _this.list2.itemRenderer = TargetMemberHeadRender;
        _this.list3.itemRenderer = TargetMemberHeadRender;
        _this.list2Dt = new eui.ArrayCollection;
        _this.list2Dt.source = TargetListCC.ins().canAttackHandles;
        _this.list2.dataProvider = _this.list2Dt;
        return _this;
    }
    TargetListPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(GameLogic.ins().postChangeTarget, this.updateTarget);
        this.observe(TargetListCC.ins().postTargetList, this.updateBeAttackList);
        this.observe(TargetListCC.ins().postChangeCanAttackHandle, this.updateCanAttackList);
        this.update();
        this.attackGroup0.visible = false;
    };
    TargetListPanel.prototype.update = function () {
        this.updateTarget();
        this.updateBeAttackList();
        this.updateCanAttackList();
    };
    TargetListPanel.prototype.showTarget = function (b) {
        this.attackGroup0.visible = b;
    };
    TargetListPanel.prototype.updateTarget = function () {
        if (!this.attackGroup0.visible)
            return;
        if (!this.list1.dataProvider) {
            this.list1.dataProvider = new eui.ArrayCollection([GameLogic.ins().currAttackHandle]);
        }
        else {
            var dataPro = this.list1.dataProvider;
            dataPro.replaceAll([GameLogic.ins().currAttackHandle]);
        }
    };
    TargetListPanel.prototype.updateBeAttackList = function () {
        var data = TargetListCC.ins().attackMeHandles;
        this.beAttackGroup0.visible = data.length > 0;
        if (!this.beAttackGroup0.visible)
            return;
        if (!this.list3.dataProvider) {
            this.list3.dataProvider = new eui.ArrayCollection(data);
        }
        else {
            var dataPro = this.list3.dataProvider;
            dataPro.replaceAll(data);
        }
    };
    TargetListPanel.prototype.updateCanAttackList = function () {
        var data = TargetListCC.ins().canAttackHandles;
        this.canAttackGroup0.visible = data.length > 0;
        if (!this.canAttackGroup0.visible)
            return;
        this.list2Dt.replaceAll(TargetListCC.ins().canAttackHandles);
    };
    __decorate([
        callLater
    ], TargetListPanel.prototype, "updateTarget", null);
    __decorate([
        callLater
    ], TargetListPanel.prototype, "updateBeAttackList", null);
    __decorate([
        callLater
    ], TargetListPanel.prototype, "updateCanAttackList", null);
    return TargetListPanel;
}(BaseEuiView));
__reflect(TargetListPanel.prototype, "TargetListPanel");
var GameSystem;
(function (GameSystem) {
    GameSystem.targetlistpanel = function () {
        ViewManager.ins().reg(TargetListPanel, LayerManager.Main_View);
    };
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=TargetListPanel.js.map