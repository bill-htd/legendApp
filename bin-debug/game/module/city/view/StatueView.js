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
var StatueView = (function (_super) {
    __extends(StatueView, _super);
    function StatueView(title, name, body) {
        var _this = _super.call(this) || this;
        _this.title = new MovieClip;
        _this.title.playFile(RES_DIR_EFF + title, -1);
        _this.addChild(_this.title);
        _this.roleName = new eui.Label();
        _this.roleName.size = 14;
        _this.roleName.strokeColor = 0;
        _this.roleName.stroke = 1;
        _this.roleName.text = "" + name;
        _this.roleName.x = -_this.roleName.width >> 1;
        _this.addChild(_this.roleName);
        _this.model = new eui.Image();
        _this.model.source = RES_DIR_CITY + "/" + body + ".png";
        _this.model.once(egret.Event.COMPLETE, function () {
            _this.model.x = -_this.model.width >> 1;
            _this.model.y = -_this.model.height;
            _this.roleName.y = _this.model.y - 20;
            _this.title.y = _this.roleName.y - 50;
        }, _this);
        _this.addChild(_this.model);
        return _this;
    }
    Object.defineProperty(StatueView.prototype, "weight", {
        get: function () {
            return this.y;
        },
        enumerable: true,
        configurable: true
    });
    return StatueView;
}(egret.DisplayObjectContainer));
__reflect(StatueView.prototype, "StatueView");
//# sourceMappingURL=StatueView.js.map