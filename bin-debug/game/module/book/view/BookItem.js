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
var book = GameSystem.book;
var BookItem = (function (_super) {
    __extends(BookItem, _super);
    function BookItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "tujianskinstate";
        _this.tw = egret.Tween.get(_this.kejihuo, { loop: true });
        _this.tw.to({ scaleX: _this.kejihuo.scaleX + 0.3, scaleY: _this.kejihuo.scaleY + 0.3 }, 500).
            to({ scaleX: _this.kejihuo.scaleX, scaleY: _this.kejihuo.scaleY }, 500);
        return _this;
    }
    BookItem.prototype.dataChanged = function () {
        var id = this.data;
        var bookData = Book.ins().getBookById(id);
        var confBase = GlobalConfig.DecomposeConfig[id];
        var level = bookData.level > -1 ? bookData.level : 0;
        var conf = GlobalConfig.CardConfig[id][level];
        var roleJob;
        for (var i in GlobalConfig.SuitConfig) {
            var scfg = GlobalConfig.SuitConfig[i][1];
            var sid = scfg.idList.indexOf(id);
            if (sid == -1) {
                continue;
            }
            roleJob = Book.jobs.indexOf(Number(i));
            if (roleJob != -1) {
                break;
            }
            roleJob = undefined;
        }
        var state = bookData.getState(roleJob);
        this.quality0.source = this.quality1.source = this.quality2.source = this.quality3.source = "tujian_" + confBase.quality + "c";
        this.quality.source = "tujian_" + confBase.quality + "a";
        this.quality4.source = "tujian_" + confBase.quality + "b";
        this.setStar(level);
        var power = UserBag.getAttrPower(conf.attrs);
        power = Book.ins().getBookPowerNum(power, confBase.id);
        if (this.pown) {
            BitmapNumber.ins().changeNum(this.pown, power, '8', 8);
        }
        else {
            this.pown = BitmapNumber.ins().createNumPic(power, '8', 8);
        }
        this.pown.x = 56;
        this.pown.y = 199;
        this.pownGP.addChild(this.pown);
        this.rect.visible = false;
        this.weiji.visible = false;
        this.manji.visible = false;
        this.kejihuo.visible = false;
        if (bookData.level == 10) {
            this.manji.visible = true;
            this.redPoint.visible = false;
            this.imgBox.source = "" + confBase.imgLight;
        }
        else {
            switch (state) {
                case BookState.canOpen:
                    this.imgBox.source = "" + confBase.imgLight;
                    this.redPoint.visible = false;
                    this.rect.visible = true;
                    this.kejihuo.visible = true;
                    break;
                case BookState.haveOpen:
                    this.imgBox.source = "" + confBase.imgLight;
                    var needScore = bookData.getNextLevelCost();
                    this.redPoint.visible = needScore && Book.ins().score >= needScore;
                    break;
                case BookState.noOpen:
                    this.imgBox.source = "" + confBase.imgLight;
                    this.redPoint.visible = false;
                    this.rect.visible = true;
                    this.weiji.visible = true;
                    break;
                default:
                    this.imgBox.source = "" + confBase.imgLight;
                    break;
            }
        }
        this.labelName.text = confBase.name;
        this.labelName.textColor = ItemBase.QUALITY_COLOR[confBase.quality];
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    BookItem.prototype.onRemove = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        egret.Tween.removeTweens(this.kejihuo);
    };
    BookItem.prototype.setRemoveTween = function (v) {
        if (v)
            egret.Tween.removeTweens(this.kejihuo);
    };
    BookItem.prototype.setStar = function (num) {
        for (var i = num; i < 10; i++) {
            this["imgStar" + i].visible = false;
        }
        for (var i = 0; i < num; i++) {
            this["imgStar" + i].visible = true;
        }
    };
    BookItem.prototype.getCurrentState = function () {
        var state = "notactive";
        return state;
    };
    return BookItem;
}(BaseItemRender));
__reflect(BookItem.prototype, "BookItem");
//# sourceMappingURL=BookItem.js.map