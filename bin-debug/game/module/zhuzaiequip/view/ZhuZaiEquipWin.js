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
var ZhuZaiEquipWin = (function (_super) {
    __extends(ZhuZaiEquipWin, _super);
    function ZhuZaiEquipWin() {
        return _super.call(this) || this;
    }
    ZhuZaiEquipWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ZhuzaiEquipSkin";
    };
    ZhuZaiEquipWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.closeBtn0, this.onClick);
        this.selectRole = param[1];
        this.select = param[2];
        this.tab.selectedIndex = param ? param[0] : 0;
        this.viewStack.selectedIndex = this.tab.selectedIndex;
        this.onTabChange();
        this.addChangeEvent(this.tab, this.onTabChange);
        this.observe(ZhuzaiEquip.ins().postZhuZaiData, this.updateRedPoint);
        this.observe(ZhuzaiEquip.ins().postShengjie, this.playEff);
        this.updateRedPoint();
    };
    ZhuZaiEquipWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onClick);
        this.removeTouchEvent(this.closeBtn0, this.onClick);
        this.growPanel.close();
        this.advancePanel.close();
        this.fenjiePanel.close();
        this.removeObserve();
    };
    ZhuZaiEquipWin.prototype.onTabChange = function (e) {
        this.viewStack.selectedChild['open'](this.selectRole, this.select);
    };
    ZhuZaiEquipWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
        }
    };
    ZhuZaiEquipWin.prototype.updateRedPoint = function () {
        var ins = ZhuzaiEquip.ins();
        this.redPoint0.visible = ins.canAllLevelup();
        this.redPoint1.visible = ins.canAllAdvance();
        this.redPoint2.visible = false;
    };
    ZhuZaiEquipWin.prototype.playEff = function (b) {
        var mc = ObjectPool.pop("MovieClip");
        mc.scaleX = mc.scaleY = 1;
        mc.rotation = 0;
        mc.x = 250;
        mc.y = 330;
        mc.playFile(RES_DIR_EFF + (b ? "successeff" : "faileff"), 1, function () { ObjectPool.push(mc); });
        this.addChild(mc);
    };
    return ZhuZaiEquipWin;
}(BaseEuiView));
__reflect(ZhuZaiEquipWin.prototype, "ZhuZaiEquipWin");
ViewManager.ins().reg(ZhuZaiEquipWin, LayerManager.UI_Main);
//# sourceMappingURL=ZhuZaiEquipWin.js.map