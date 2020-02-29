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
var JimMaiItem = (function (_super) {
    __extends(JimMaiItem, _super);
    function JimMaiItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "JinMaiItemSkin";
        _this.guang.visible = false;
        return _this;
    }
    JimMaiItem.prototype.setLights = function (type) {
        var _this = this;
        if (type == 0 && this.mc) {
            this.mc.stop();
            this.mc.visible = false;
            return;
        }
        if (this.mc == null) {
            this.mc = new MovieClip();
            this.mc.x = this.mc.y = 20;
            this.addChild(this.mc);
        }
        this.mc.visible = true;
        if (!this.mc.parent)
            this.addChild(this.mc);
        if (type == 1)
            this.mc.playFile(RES_DIR_EFF + "bally1", -1);
        else if (type == 2)
            this.mc.playFile(RES_DIR_EFF + "bally2", -1);
        else if (type == 3) {
            var t = egret.Tween.get(this);
            this.mc.playFile(RES_DIR_EFF + "bally3", 1, null, false);
            t.wait(800).call(function () {
                _this.mc.playFile(RES_DIR_EFF + "bally2", -1);
            });
        }
        else if (type == 4)
            this.mc.playFile(RES_DIR_EFF + "bally3", 1, function () {
                DisplayUtils.removeFromParent(_this.mc);
                _this.mc = null;
            }, true);
    };
    return JimMaiItem;
}(BaseComponent));
__reflect(JimMaiItem.prototype, "JimMaiItem");
//# sourceMappingURL=JinMaiItem.js.map