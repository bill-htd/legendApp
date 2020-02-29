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
var GameBlackView = (function (_super) {
    __extends(GameBlackView, _super);
    function GameBlackView() {
        return _super.call(this) || this;
    }
    GameBlackView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.black = new eui.Rect();
        this.black.fillColor = 0x24201f;
        this.black.left = 0;
        this.black.right = 0;
        this.black.top = 0;
        this.black.bottom = 0;
        this.addChild(this.black);
    };
    GameBlackView.prototype.destoryView = function () { };
    return GameBlackView;
}(BaseEuiView));
__reflect(GameBlackView.prototype, "GameBlackView");
ViewManager.ins().reg(GameBlackView, LayerManager.Game_Main);
//# sourceMappingURL=GameBlackView.js.map