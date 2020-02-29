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
var BoxOpenWin = (function (_super) {
    __extends(BoxOpenWin, _super);
    function BoxOpenWin() {
        var _this = _super.call(this) || this;
        _this.rewardList = [];
        _this.items = [];
        _this.rollNum = 0;
        _this.index = 0;
        _this.skinName = "ChestOpenRewardSkin";
        _this.list.itemRenderer = ItemBase;
        _this.isTopLevel = true;
        return _this;
    }
    BoxOpenWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var para = param[0];
        this.conf = GlobalConfig.TreasureBoxConfig[para];
        this.rewardList = param[1];
        this.list.dataProvider = new eui.ArrayCollection(this.rewardList);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.showTween();
    };
    BoxOpenWin.prototype.close = function () {
    };
    BoxOpenWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(BoxOpenWin);
                break;
        }
    };
    BoxOpenWin.prototype.showTween = function () {
        var _this = this;
        this.imgBox.source = this.conf.imgClose;
        this.rollNum = 0;
        var t = egret.Tween.get(this.imgBox, { loop: true });
        t.to({ x: 265 }, 20).to({ x: 245 }, 20).to({ x: 265 }, 20).call(function () {
            ++_this.rollNum;
            if (_this.rollNum >= 9) {
                egret.Tween.removeTweens(_this.imgBox);
                _this.rotationComplete();
            }
        }, this);
    };
    BoxOpenWin.prototype.rotationComplete = function () {
        this.imgBox.source = this.conf.imgOpen;
        this.movieComplete();
    };
    BoxOpenWin.prototype.movieComplete = function () {
        var count = this.rewardList.length;
        var waitTime = 0;
        for (var i = 0; i < count; i++) {
            this.items[i] = this.createItem(this.rewardList[i]);
            var t = egret.Tween.get(this.items[i]);
            var posX = (i % 5) * 96 + 3;
            var posY = Math.floor(i / 5) * 106 + 205;
            this.items[i].alpha = 0;
            t.wait(waitTime).to({ x: posX, y: posY, alpha: 1 }, 200);
            waitTime += 500;
        }
        this.boxBgMc = this.boxBgMc || new MovieClip();
        this.boxBgMc.x = 0;
        this.boxBgMc.y = 50;
        this.boxBgMc.playFile(RES_DIR_EFF + "laddercircle", -1);
        this.bgGroup.addChild(this.boxBgMc);
    };
    BoxOpenWin.prototype.createItem = function (data) {
        var item = new ItemBase();
        this.listCon.addChild(item);
        item.data = data;
        item.x = 204;
        item.y = 52;
        return item;
    };
    BoxOpenWin.prototype.showUp = function () {
        var tar = this.list.getElementAt(this.index);
        ++this.index;
        tar.visible = true;
        var t = egret.Tween.get(tar);
        t.to({ alpha: 0 }, 200);
    };
    return BoxOpenWin;
}(BaseEuiView));
__reflect(BoxOpenWin.prototype, "BoxOpenWin");
ViewManager.ins().reg(BoxOpenWin, LayerManager.UI_Main);
//# sourceMappingURL=BoxOpenWin.js.map