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
var BlackListItemRender = (function (_super) {
    __extends(BlackListItemRender, _super);
    function BlackListItemRender() {
        return _super.call(this) || this;
    }
    BlackListItemRender.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            Friends.ins().sendDelete(4, _this.data.id);
            e.stopPropagation();
            e.stopImmediatePropagation();
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.data)
                ViewManager.ins().open(PlayerTipsWin, _this.data);
        }, this);
    };
    BlackListItemRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        this.label_name.text = data.name + "(" + (data.zs > 0 ? data.zs + "转" : "") + data.lv + "级)";
        this.img_userIcon.source = "head_" + data.job + data.sex + (data.online == 1 ? "" : "b");
        this.labelGuild.text = data.guildName;
        this.headBg.source = ChatListItemRenderer.HEAD_BG[data.sex];
    };
    return BlackListItemRender;
}(BaseItemRender));
__reflect(BlackListItemRender.prototype, "BlackListItemRender");
//# sourceMappingURL=BlackListItemRender.js.map