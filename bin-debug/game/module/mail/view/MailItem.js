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
var MailItem = (function (_super) {
    __extends(MailItem, _super);
    function MailItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "MailItemSkin";
        return _this;
    }
    MailItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    MailItem.prototype.dataChanged = function () {
        var mailData = this.data;
        if (mailData instanceof MailData) {
            var str = "|C:0xA89C88&T:" + mailData.title + "|";
            str = str + "|C:" + (mailData.type ? "0X5b5b5b" : "0X00cc33") + "&T:" + (mailData.type ? "(已读)" : "(未读)") + "|";
            this.nameLabel.textFlow = TextFlowMaker.generateTextFlow(str);
            this.dateLabel.text = DateUtils.getFormatBySecond(mailData.times, 2);
            this.treasure.source = mailData.receive == 0 ? "220003_png" : "";
        }
    };
    return MailItem;
}(BaseItemRender));
__reflect(MailItem.prototype, "MailItem");
//# sourceMappingURL=MailItem.js.map