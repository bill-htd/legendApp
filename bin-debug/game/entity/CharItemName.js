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
var CharItemName = (function (_super) {
    __extends(CharItemName, _super);
    function CharItemName() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        _this._nameTxt = new eui.Label;
        _this._nameTxt.stroke = 1;
        _this._nameTxt.strokeColor = 0x000000;
        _this._nameTxt.size = 14;
        _this._nameTxt.y = -25;
        _this._nameTxt.width = 120;
        _this._nameTxt.x = -60;
        _this._nameTxt.textAlign = egret.HorizontalAlign.CENTER;
        _this.addChild(_this._nameTxt);
        return _this;
    }
    CharItemName.prototype.setData = function (item) {
        if (item.type) {
            if (item.id == 500007) {
                this._nameTxt.text = "" + item.count;
            }
            else {
                var itemName = GlobalConfig.ItemConfig[item.id].name;
                if (item.count > 1) {
                    this._nameTxt.text = item.count + itemName;
                }
                else {
                    this._nameTxt.text = itemName;
                }
            }
            this._nameTxt.textColor = ItemConfig.getQualityColor(GlobalConfig.ItemConfig[item.id]);
        }
        else {
            if (item.id == MoneyConst.gold) {
                this._nameTxt.text = "" + item.count;
                this._nameTxt.textColor = ItemBase.QUALITY_COLOR[0];
            }
            else if (item.id == MoneyConst.yuanbao) {
                this._nameTxt.text = item.count + "\u5143\u5B9D";
                this._nameTxt.textColor = ItemBase.QUALITY_COLOR[5];
            }
            else if (item.id == MoneyConst.soul) {
                this._nameTxt.text = item.count + "\u7CBE\u70BC\u77F3";
                this._nameTxt.textColor = ItemBase.QUALITY_COLOR[2];
            }
            else if (item.id == MoneyConst.rune) {
                this._nameTxt.text = item.count + "\u7CBE\u534E";
                this._nameTxt.textColor = ItemBase.QUALITY_COLOR[1];
            }
        }
    };
    return CharItemName;
}(egret.DisplayObjectContainer));
__reflect(CharItemName.prototype, "CharItemName");
//# sourceMappingURL=CharItemName.js.map