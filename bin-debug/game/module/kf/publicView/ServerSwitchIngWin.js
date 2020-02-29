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
var ServerSwitchIngWin = (function (_super) {
    __extends(ServerSwitchIngWin, _super);
    function ServerSwitchIngWin() {
        var _this = _super.call(this) || this;
        _this.symbolStrs = [".", '..', '...'];
        _this._tick = 0;
        _this.skinName = "KFSwitchServerSkin";
        return _this;
    }
    ServerSwitchIngWin.prototype.open = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._tick = 0;
        TimerManager.ins().doTimer(500, 0, function () {
            _this._tick++;
            _this.switchLabel.text = "\u670D\u52A1\u5668\u5207\u6362\u4E2D" + _this.symbolStrs[_this._tick % 3];
        }, this);
    };
    ServerSwitchIngWin.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        TimerManager.ins().removeAll(this);
    };
    return ServerSwitchIngWin;
}(BaseEuiView));
__reflect(ServerSwitchIngWin.prototype, "ServerSwitchIngWin");
ViewManager.ins().reg(ServerSwitchIngWin, LayerManager.UI_Popup);
//# sourceMappingURL=ServerSwitchIngWin.js.map