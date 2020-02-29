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
var CharItem = (function (_super) {
    __extends(CharItem, _super);
    function CharItem() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        _this._itemImg = new eui.Image;
        _this._itemImg.x = (-56 * 0.6) >> 1;
        _this._itemImg.y = (-56 * 0.6) >> 1;
        _this._itemImg.scaleX = _this._itemImg.scaleY = 0.6;
        _this.addChild(_this._itemImg);
        _this._roatImg = new eui.Image("point3");
        _this._roatImg.anchorOffsetX = 5;
        _this._roatImg.anchorOffsetY = 5;
        _this._roatImg.alpha = 0;
        _this.addChild(_this._roatImg);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
            _this.removeRoatEffect();
        }, _this);
        return _this;
    }
    CharItem.prototype.setData = function (item) {
        if (item.type) {
            this._itemImg.source = GlobalConfig.ItemConfig[item.id].icon + "_png";
        }
        else {
            if (item.id == MoneyConst.gold) {
                this._itemImg.source = "icgoods117_png";
            }
            else if (item.id == MoneyConst.yuanbao) {
                this._itemImg.source = "icgoods121_png";
            }
            else if (item.id == MoneyConst.soul) {
                this._itemImg.source = "200136_png";
            }
            else if (item.id == MoneyConst.rune) {
                this._itemImg.source = "500007_png";
            }
        }
    };
    CharItem.prototype.addRoatEffect = function () {
        this.removeRoatEffect();
        var t = egret.Tween.get(this._roatImg, { loop: true });
        t.to({ alpha: 1 }, 200).to({ rotation: 90 }, 1000).to({ alpha: 0 }, 200).wait(300);
    };
    CharItem.prototype.removeRoatEffect = function () {
        this._roatImg.alpha = 0;
        this._roatImg.rotation = 0;
        egret.Tween.removeTweens(this._roatImg);
    };
    return CharItem;
}(egret.DisplayObjectContainer));
__reflect(CharItem.prototype, "CharItem");
//# sourceMappingURL=CharItem.js.map