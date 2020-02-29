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
var NobilityItem = (function (_super) {
    __extends(NobilityItem, _super);
    function NobilityItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'NobilityItemSkin';
        _this.goOnTxt.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + _this.goOnTxt.text + "</u></a>");
        _this.goOnTxt.touchEnabled = true;
        return _this;
    }
    NobilityItem.prototype.dataChanged = function () {
        var data = this.data;
        if (data) {
            var config = UserTask.ins().getAchieveConfById(data.id);
            var str = config.name + "|C:0x35e62d&T:(" + data.value + "/" + config.target + ")|";
            this.nameTxt.textFlow = TextFlowMaker.generateTextFlow(str);
            if (data.state > 0) {
                this.sureImg.visible = true;
                this.goOnTxt.visible = false;
            }
            else {
                this.sureImg.visible = false;
                this.goOnTxt.visible = Boolean(config.control);
            }
        }
    };
    return NobilityItem;
}(BaseItemRender));
__reflect(NobilityItem.prototype, "NobilityItem");
//# sourceMappingURL=NobilityItem.js.map