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
var PriceIcon = (function (_super) {
    __extends(PriceIcon, _super);
    function PriceIcon() {
        var _this = _super.call(this) || this;
        _this.skinName = "PriceIconSkin";
        return _this;
    }
    PriceIcon.prototype.childrenCreated = function () {
        this.priceLabel.textColor = ColorUtil.NORMAL_COLOR;
    };
    PriceIcon.prototype.getPrice = function () {
        return this._price;
    };
    PriceIcon.prototype.setPrice = function (value, value2) {
        if (value2 === void 0) { value2 = -1; }
        if (value == this._price && value2 == -1)
            return;
        this._price = value;
        if (value2 >= 0) {
            var colorStr = "";
            if (value2 >= value)
                colorStr = ColorUtil.GREEN_COLOR;
            else
                colorStr = ColorUtil.RED_COLOR;
            this.priceLabel.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + value2 + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + value + "</font> ");
        }
        else {
            this.priceLabel.text = "" + this._price;
        }
    };
    PriceIcon.prototype.setText = function (str) {
        this.priceLabel.textFlow = new egret.HtmlTextParser().parser(str);
    };
    PriceIcon.prototype.setData = function (data) {
        var str = "";
        if (data) {
            var awards = data;
            if (awards.type == 0) {
                switch (awards.id) {
                    case MoneyConst.exp:
                        str = "exp_png";
                        break;
                    case MoneyConst.gold:
                        str = "szjinbi";
                        break;
                    case MoneyConst.yuanbao:
                        str = "szyuanbao";
                        break;
                    case MoneyConst.fame:
                        str = "fame";
                        break;
                    case MoneyConst.soul:
                        str = "soul";
                        break;
                    case MoneyConst.wing:
                        str = "yumao_png";
                        break;
                    case MoneyConst.piece:
                        str = "500008_png";
                        break;
                }
            }
            else if (awards.type == 1) {
                switch (awards.id) {
                    case 200001:
                        str = "yumao_png";
                        break;
                    case 200002:
                        str = "forge";
                        break;
                    case 200003:
                        str = "gem";
                        break;
                    case 200004:
                        str = "spirit";
                        break;
                    case 200005:
                        str = "vigor";
                        break;
                    case 200006:
                        str = "shield";
                        break;
                }
            }
            this._type = awards.id;
            this.setPrice(awards.count);
        }
        else if (data) {
            var itemData = data;
            switch (itemData.itemConfig.id) {
                case 200001:
                    str = "yumao_png";
                    break;
                case 200002:
                    str = "szyuanbao";
                    break;
                case 200003:
                    str = "szyuanbao";
                    break;
                case 200004:
                    str = "szyuanbao";
                    break;
                case 200005:
                    str = "szyuanbao";
                    break;
                case 200006:
                    str = "szyuanbao";
                    break;
            }
            this._type = itemData.itemConfig.id;
            this.setPrice(itemData.count);
        }
        this.iconImg.source = str;
    };
    PriceIcon.prototype.getType = function () {
        return this._type;
    };
    PriceIcon.prototype.setType = function (value) {
        if (this._type == value)
            return;
        this._type = value;
        var str = "";
        switch (this._type) {
            case MoneyConst.exp:
                str = "exp";
                break;
            case MoneyConst.gold:
                str = "szjinbi";
                break;
            case MoneyConst.yuanbao:
                str = "szyuanbao";
                break;
            case MoneyConst.fame:
                str = "fame";
                break;
            case MoneyConst.soul:
                str = "soul";
                break;
            case MoneyConst.wing:
                str = "yumao_png";
                break;
        }
        this.iconImg.source = str;
    };
    Object.defineProperty(PriceIcon.prototype, "labelColor", {
        get: function () {
            return this._labelColor;
        },
        set: function (value) {
            if (this._labelColor != value) {
                this._labelColor = value;
                this.priceLabel.textColor = this._labelColor;
            }
        },
        enumerable: true,
        configurable: true
    });
    return PriceIcon;
}(BaseComponent));
__reflect(PriceIcon.prototype, "PriceIcon");
//# sourceMappingURL=PriceIcon.js.map