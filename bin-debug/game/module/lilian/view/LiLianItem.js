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
var LiLianItem = (function (_super) {
    __extends(LiLianItem, _super);
    function LiLianItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'LiLianItemSkin';
        _this.isClose = false;
        _this.goOnTxt.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + _this.goOnTxt.text + "</u></a>");
        _this.goOnTxt.touchEnabled = true;
        return _this;
    }
    LiLianItem.prototype.dataChanged = function () {
        var data = this.data;
        if (data) {
            var config = GlobalConfig.DailyConfig[data.id];
            this.nameTxt.text = config.name;
            this.descTxt.textFlow = TextFlowMaker.generateTextFlow("|C:0x35e62d&T:" + data.value + "/" + config.target + "|");
            this.liLianNumTxt.text = config.trainExp + "历练";
            if (data.state > 0) {
                this.sureImg.visible = true;
                this.goOnTxt.visible = false;
            }
            else {
                this.sureImg.visible = false;
                this.goOnTxt.visible = true;
            }
            if (data.id == 1 || data.id == 3 || data.id == 4 || data.id == 5 ||
                data.id == 6 || data.id == 7 || data.id == 8 ||
                data.id == 9 || data.id == 10) {
                this.isClose = true;
            }
        }
    };
    return LiLianItem;
}(BaseItemRender));
__reflect(LiLianItem.prototype, "LiLianItem");
//# sourceMappingURL=LiLianItem.js.map