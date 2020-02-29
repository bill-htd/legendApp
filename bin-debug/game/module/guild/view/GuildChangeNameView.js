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
var GuildChangeNameView = (function (_super) {
    __extends(GuildChangeNameView, _super);
    function GuildChangeNameView() {
        var _this = _super.call(this) || this;
        _this.skinName = "guildNameChange";
        return _this;
    }
    GuildChangeNameView.prototype.open = function () {
        this.addTouchEvent(this.sureBtn, this.onTap);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
    };
    GuildChangeNameView.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        switch (tar) {
            case this.bgClose:
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.sureBtn:
                this.onChangeName();
                break;
        }
    };
    GuildChangeNameView.prototype.onChangeName = function () {
        if (this.input.text == "")
            UserTips.ins().showTips("请输入行会名字");
        else {
            Guild.ins().sendGuildChangeName(this.input.text);
            ViewManager.ins().close(this);
        }
    };
    return GuildChangeNameView;
}(BaseEuiView));
__reflect(GuildChangeNameView.prototype, "GuildChangeNameView");
ViewManager.ins().reg(GuildChangeNameView, LayerManager.UI_Popup);
//# sourceMappingURL=GuildChangeNameView.js.map