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
var RenameWin = (function (_super) {
    __extends(RenameWin, _super);
    function RenameWin() {
        var _this = _super.call(this) || this;
        _this.skinName = 'NameChangeSkin';
        return _this;
    }
    RenameWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.sureBtn, this.onTap);
    };
    RenameWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeTouchEvent(this.sureBtn, this.onTap);
        this.input.text = '';
    };
    RenameWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(RenameWin);
                break;
            case this.sureBtn:
                if (this.input.text.length == 0) {
                    UserTips.ins().showTips('您尚未输入名字！');
                }
                else if (UserBag.ins().getBagItemById(ItemConst.RENAME) != null) {
                    GameLogic.ins().sendRename(this.input.text);
                }
                break;
        }
    };
    return RenameWin;
}(BaseEuiView));
__reflect(RenameWin.prototype, "RenameWin");
ViewManager.ins().reg(RenameWin, LayerManager.UI_Popup);
//# sourceMappingURL=RenameWin.js.map