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
var kfArenaMemberItemRender = (function (_super) {
    __extends(kfArenaMemberItemRender, _super);
    function kfArenaMemberItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "kfArenaMemberItemSkin";
        return _this;
    }
    kfArenaMemberItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.itemData = new GuildMemberInfo();
        this.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    kfArenaMemberItemRender.prototype.dataChanged = function () {
        if (this.data instanceof GuildMemberInfo) {
            this.itemData = this.data;
        }
        if (!this.data)
            return;
        this.nameLab.text = this.itemData.name;
        this.powerLab.text = "\u6218\u529B\uFF1A" + CommonUtils.overLength(this.itemData.attack);
        this.scoreLab.text = "\u79EF\u5206\uFF1A" + this.itemData.score;
        this.winRateLab.text = "\u80DC\u7387\uFF1A" + this.itemData.winRate + "%";
        this.face.source = "head_" + this.itemData.job + this.itemData.sex;
        this.vipTitle.visible = this.itemData.vipLevel != 0;
    };
    kfArenaMemberItemRender.prototype.onTap = function (e) {
        KfArenaSys.ins().sendInvite(this.itemData.roleID);
    };
    kfArenaMemberItemRender.prototype.destruct = function () {
        this.inviteBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    return kfArenaMemberItemRender;
}(BaseItemRender));
__reflect(kfArenaMemberItemRender.prototype, "kfArenaMemberItemRender");
//# sourceMappingURL=kfArenaMemberItemRender.js.map