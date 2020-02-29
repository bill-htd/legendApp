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
var ItemStage = (function (_super) {
    __extends(ItemStage, _super);
    function ItemStage() {
        var _this = _super.call(this) || this;
        _this.skinName = "LvSkin";
        return _this;
    }
    ItemStage.prototype.convert = function (strNum) {
        for (var i = 0; i < strNum.length; i++) {
            strNum[i] = StringUtils.NumberToChinese(Number(strNum[i]));
        }
        return strNum;
    };
    ItemStage.prototype.dataChanged = function () {
        if (!this.data || !(typeof this.data == "string"))
            return;
        var strNum = StringUtils.getStrByRegExp(this.data);
        var strChn = StringUtils.getStrByRegExp(this.data, /[\u4E00-\u9FA5]+/g);
        var stage = "";
        var tempF = [];
        var tempA = [];
        var tempFindex = this.data.indexOf(strNum[0]);
        var tempAindex = this.data.indexOf(strChn[0]);
        if (tempFindex >= 0 && tempAindex >= 0) {
            if (tempFindex < tempAindex) {
                tempF = this.convert(strNum);
                tempA = strChn;
            }
            else {
                tempF = strChn;
                tempA = this.convert(strNum);
            }
        }
        else {
            if (tempFindex == -1) {
                tempF = strChn;
            }
            else {
                tempF = this.convert(strNum);
            }
        }
        for (var i = 0; i < tempF.length; i++) {
            stage += tempF[i];
            if (tempA[i]) {
                stage += tempA[i];
            }
        }
        this.lv0.text = stage;
    };
    ItemStage.prototype.destruct = function () {
    };
    return ItemStage;
}(BaseItemRender));
__reflect(ItemStage.prototype, "ItemStage");
//# sourceMappingURL=ItemStage.js.map