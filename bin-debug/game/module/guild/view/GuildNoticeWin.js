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
var GuildNoticeWin = (function (_super) {
    __extends(GuildNoticeWin, _super);
    function GuildNoticeWin() {
        return _super.call(this) || this;
    }
    GuildNoticeWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GuildNoticeSkin";
    };
    GuildNoticeWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.closeBtn1, this.onTap);
        this.addTouchEvent(this.saveBtn, this.onTap);
        this.addTouchEvent(this.bgrect, this.onTap);
        this.textInput.text = Guild.ins().notice;
    };
    GuildNoticeWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.closeBtn1, this.onTap);
        this.removeTouchEvent(this.saveBtn, this.onTap);
        this.removeTouchEvent(this.bgrect, this.onTap);
    };
    GuildNoticeWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn0:
            case this.closeBtn1:
            case this.bgrect:
                ViewManager.ins().close(this);
                break;
            case this.saveBtn:
                Guild.ins().notice = this.textInput.text;
                Guild.ins().sendChangeNotice(this.textInput.text);
                ViewManager.ins().close(this);
                break;
        }
    };
    return GuildNoticeWin;
}(BaseEuiView));
__reflect(GuildNoticeWin.prototype, "GuildNoticeWin");
ViewManager.ins().reg(GuildNoticeWin, LayerManager.UI_Main);
//# sourceMappingURL=GuildNoticeWin.js.map