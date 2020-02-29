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
var CelebrationItem = (function (_super) {
    __extends(CelebrationItem, _super);
    function CelebrationItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'CERechargeItemSkin';
        return _this;
    }
    CelebrationItem.prototype.destruct = function () {
    };
    CelebrationItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CelebrationItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var item = this.data;
        var actData = Activity.ins().getActivityDataById(item.config.Id);
        var state = actData.getRewardStateById(item.config.index);
        this.redPoint.visible = false;
        this.already.visible = false;
        var color = 0xD1C28F;
        this.ball.source = item.config.expAttr[0];
        if (state == Activity.Geted) {
            this.already.visible = true;
            color = 0x00ff00;
            this.ball.source = item.config.expAttr[1];
        }
        else if (state == Activity.CanGet) {
            color = 0x00ff00;
            this.redPoint.visible = true;
        }
        else {
            color = 0xff0000;
        }
        this.now.textFlow = TextFlowMaker.generateTextFlow1("|C:" + color + "&T:" + Math.floor(item.curCost / 100));
        this.target.text = Math.floor(item.config.val / 100) + "";
        this.ball0.visible = false;
    };
    CelebrationItem.prototype.setSelect = function (s) {
        this.ball0.visible = s;
    };
    return CelebrationItem;
}(BaseItemRender));
__reflect(CelebrationItem.prototype, "CelebrationItem");
//# sourceMappingURL=CelebrationItem.js.map