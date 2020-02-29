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
var MijiItemEx = (function (_super) {
    __extends(MijiItemEx, _super);
    function MijiItemEx() {
        var _this = _super.call(this) || this;
        _this.skinName = "MijiWithNameItemSkin";
        _this.init();
        return _this;
    }
    MijiItemEx.prototype.dataChanged = function () {
        if (!this.data)
            return;
        this.miji.data = this.data;
        var config = GlobalConfig.MiJiSkillConfig[this.data];
        var cfg = GlobalConfig.ItemConfig[config.item];
        this.nameTF.text = cfg.name;
    };
    MijiItemEx.prototype.init = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    MijiItemEx.prototype.onClick = function () {
        var config = GlobalConfig.MiJiSkillConfig[this.data];
        ViewManager.ins().open(PropGainTipsWin, 0, config.item);
    };
    return MijiItemEx;
}(BaseItemRender));
__reflect(MijiItemEx.prototype, "MijiItemEx");
//# sourceMappingURL=MijiItemEx.js.map