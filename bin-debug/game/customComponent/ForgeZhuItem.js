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
var ForgeZhuItem = (function (_super) {
    __extends(ForgeZhuItem, _super);
    function ForgeZhuItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'CastingZBItemSkin';
        return _this;
    }
    ForgeZhuItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    ForgeZhuItem.prototype.init = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
        this.bitmapNum = BitmapNumber.ins().createNumPic(0, "lv_");
        this.addChild(this.bitmapNum);
        this.bitmapNum.x = this.num0.x;
        this.bitmapNum.y = this.num0.y;
        this.lockbitmapNum = BitmapNumber.ins().createNumPic(0, "lvk_");
        this.unlock1.addChild(this.lockbitmapNum);
        this.lockbitmapNum.anchorOffsetX = this.lockbitmapNum.width / 2;
        this.lockbitmapNum.anchorOffsetX = this.lockbitmapNum.height / 2;
        this.lockbitmapNum.x = this.unlock1.x;
        this.lockbitmapNum.y = this.unlock1.y - 10;
        this.unlock.addChild(this.lockbitmapNum);
        this.itemIcon.imgJob.visible = false;
    };
    ForgeZhuItem.prototype.onClick = function (e) {
    };
    ForgeZhuItem.prototype.hideAdd = function () {
        this.add.visible = false;
        this.bitmapNum.visible = false;
    };
    ForgeZhuItem.prototype.updateItem = function (item, pos, lv, itemNum, isZZ) {
        if (isZZ === void 0) { isZZ = true; }
        this.add.visible = lv > 0 ? true : false;
        var openConfig = GlobalConfig.StoneOpenConfig[pos];
        if (Actor.level >= openConfig.openLv) {
            var costConfig = UserForge.ins().getStoneLevelCostConfigByLv(lv + 1);
            var cost = 0;
            if (costConfig) {
                cost = costConfig.soulNum;
            }
            var colorStr = "";
            var isCost = itemNum >= cost ? true : false;
            this.state.visible = isCost;
            if (lv >= 80) {
                this.state.visible = false;
            }
            BitmapNumber.ins().changeNum(this.bitmapNum, lv, "lv_");
            if (item) {
                this.setItemImg(item.icon + "_png");
            }
            else {
                this.setItemImg("xb_" + (pos + 10).toString());
            }
            this.unlock.visible = false;
            this.lockbitmapNum.visible = false;
        }
        else {
            this.state.visible = false;
            this.unlock.visible = true;
            this.lockbitmapNum.visible = true;
            this.add.visible = false;
            this.setItemImg("xb_" + (pos + 10));
            BitmapNumber.ins().changeNum(this.lockbitmapNum, openConfig.openLv, "lvk_");
            if (Math.floor(openConfig.openLv / 100) != 0 || openConfig.openLv == 100) {
                this.lockbitmapNum.x = this.unlock1.x - 10;
            }
            else {
                this.lockbitmapNum.x = this.unlock1.x - 5;
            }
        }
        this.bitmapNum.visible = this.add.visible;
        if (!isZZ)
            this.state.visible = false;
    };
    ForgeZhuItem.prototype.setItemImg = function (str) {
        this.itemIcon.imgIcon.source = str;
    };
    ForgeZhuItem.prototype.setItemData = function (item) {
        this.setItemImg(item.icon.toString() + "_png");
    };
    ForgeZhuItem.prototype.dataChanged = function () {
        this.updateItem(this.data.item, this.data.pos, this.data.lv, this.data.itemNum);
    };
    return ForgeZhuItem;
}(BaseItemRender));
__reflect(ForgeZhuItem.prototype, "ForgeZhuItem");
//# sourceMappingURL=ForgeZhuItem.js.map