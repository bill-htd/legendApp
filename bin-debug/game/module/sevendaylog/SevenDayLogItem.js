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
var SevenDayLogItem = (function (_super) {
    __extends(SevenDayLogItem, _super);
    function SevenDayLogItem() {
        var _this = _super.call(this) || this;
        _this.day = 0;
        _this.state = 0;
        _this.skinName = 'SevenDayLogItemSkin';
        _this.awardsList.itemRenderer = ItemBase;
        return _this;
    }
    SevenDayLogItem.prototype.dataChanged = function () {
        var data = this.data;
        if (data) {
            this.day = data.day;
            this.dayTxt.text = "第" + SevenDayLogItem.ChineseNum[this.day] + "天";
            if (Activity.ins().dayNum >= this.day) {
                if (this.getRemindByIndex(this.day)) {
                    this.sureBtn.visible = false;
                    this.sureImg.visible = true;
                }
                else {
                    this.sureBtn.visible = true;
                    this.sureImg.visible = false;
                }
            }
            else {
                this.sureBtn.visible = false;
                this.sureImg.visible = false;
            }
            this.awardsList.dataProvider = new eui.ArrayCollection(data.rewards);
        }
    };
    SevenDayLogItem.prototype.getRemindByIndex = function (index) {
        return ((Activity.ins().isAwards >> index) & 1) == 1;
    };
    SevenDayLogItem.ChineseNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    return SevenDayLogItem;
}(BaseItemRender));
__reflect(SevenDayLogItem.prototype, "SevenDayLogItem");
//# sourceMappingURL=SevenDayLogItem.js.map