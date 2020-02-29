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
var MineChoseWorkerRender = (function (_super) {
    __extends(MineChoseWorkerRender, _super);
    function MineChoseWorkerRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChoseWorkerItemSkin";
        _this.reward.itemRenderer = ItemBase;
        return _this;
    }
    MineChoseWorkerRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        this.nameTxt.text = data.name;
        this.nameTxt.textColor = data.color;
        var awards = [].concat(data.rewards);
        if (data.rewardItem && data.rewardItem.length) {
            awards = awards.concat(data.rewardItem);
            this.label.visible = true;
            this.noRobBg.visible = true;
        }
        else {
            this.label.visible = false;
            this.noRobBg.visible = false;
        }
        this.reward.dataProvider = new eui.ArrayCollection(awards);
        var npcConfig = GlobalConfig.NpcBaseConfig[data.npcId];
        this.worker.source = npcConfig.icon;
        if (data.id == (Mine.ins().mineId || 1)) {
            this.arrow.visible = true;
            this.selectedImg.visible = true;
        }
        else {
            this.arrow.visible = false;
            this.selectedImg.visible = false;
        }
    };
    return MineChoseWorkerRender;
}(BaseItemRender));
__reflect(MineChoseWorkerRender.prototype, "MineChoseWorkerRender");
//# sourceMappingURL=MineChoseWorkerRender.js.map