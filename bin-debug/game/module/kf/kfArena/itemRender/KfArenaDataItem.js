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
var KfArenaDataItem = (function (_super) {
    __extends(KfArenaDataItem, _super);
    function KfArenaDataItem() {
        return _super.call(this) || this;
    }
    KfArenaDataItem.prototype.dataChanged = function () {
        if (this.data instanceof KfArenaData) {
            this.rankTxt.text = this.data.rank + "";
            this.nameTxt.text = this.data.playerName + "";
            this.kaTxt.text = this.data.killNum + "/" + 10;
            this.collectionTxt.text = this.data.collectNum + "";
            this.scoreTxt.text = this.data.curScore + "";
            this.arenaPointTxt.text = this.data.curGetScore + "";
            this.arenaScoreTxt.text = this.data.totalScore + "";
            this.mvp.visible = this.data.isMvp;
            if (this.data.isOnWin) {
                this.tags.visible = true;
            }
            else if (this.data.isDeserter) {
                this.tags.visible = true;
            }
            else {
                this.tags.visible = false;
            }
        }
    };
    return KfArenaDataItem;
}(BaseItemRender));
__reflect(KfArenaDataItem.prototype, "KfArenaDataItem");
//# sourceMappingURL=KfArenaDataItem.js.map