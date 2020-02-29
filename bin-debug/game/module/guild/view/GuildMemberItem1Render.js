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
var GuildMemberItem1Render = (function (_super) {
    __extends(GuildMemberItem1Render, _super);
    function GuildMemberItem1Render() {
        var _this = _super.call(this) || this;
        _this.skinName = "MemberItemSkin";
        return _this;
    }
    GuildMemberItem1Render.prototype.dataChanged = function () {
        if (this.data instanceof GuildMemberInfo) {
            var info = this.data;
            if (info) {
                this.nameLab.text = info.name;
                this.office.text = GuildLanguage.guildOffice[info.office];
                this.conLab.text = info.contribution + "";
                this.monthcard.visible = false;
                this.vip.removeChildren();
                this.vip.visible = info.vipLevel > 0;
                this.vipTitle.visible = info.vipLevel > 0;
                if (info.vipLevel < 10) {
                    this.vipNum = BitmapNumber.ins().createNumPic(info.vipLevel, 'vip_v');
                }
                else {
                    this.vipNum = BitmapNumber.ins().createNumPic(1, 'vip_v');
                    this.vipNum0 = BitmapNumber.ins().createNumPic(0, 'vip_v');
                    this.vipNum0.x = 33;
                    this.vipNum0.y = -1;
                    this.vip.addChild(this.vipNum0);
                }
                this.vipNum.x = 18;
                this.vipNum.y = -1;
                this.vip.addChild(this.vipNum);
            }
        }
    };
    return GuildMemberItem1Render;
}(BaseItemRender));
__reflect(GuildMemberItem1Render.prototype, "GuildMemberItem1Render");
//# sourceMappingURL=GuildMemberItem1Render.js.map