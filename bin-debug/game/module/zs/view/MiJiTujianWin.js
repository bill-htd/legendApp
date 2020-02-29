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
var MiJiTujianWin = (function (_super) {
    __extends(MiJiTujianWin, _super);
    function MiJiTujianWin() {
        return _super.call(this) || this;
    }
    MiJiTujianWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "MijiPhotoSkin";
        this.mijiList.itemRenderer = ItemBaseNoTap;
        this.isTopLevel = true;
    };
    MiJiTujianWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.mijiList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.addTouchEvent(this.mijiOpen, this.onTap);
        this.updateData();
    };
    MiJiTujianWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.mijiList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.removeTouchEvent(this.mijiOpen, this.onTap);
    };
    MiJiTujianWin.prototype.updateData = function () {
        this.mijiOpen.textFlow = (new egret.HtmlTextParser()).parser("<font><u>通过王者争霸玩法获得</u></font>");
        var mijiAry = [];
        for (var _i = 0, _a = GlobalConfig.ItemConfig; _i < _a.length; _i++) {
            var config = _a[_i];
            if (ItemConfig.getType(config) == 2) {
                mijiAry.push(config.id);
            }
        }
        this.mijiList.dataProvider = new eui.ArrayCollection(mijiAry);
        if (mijiAry.length) {
            this.setData(mijiAry[0]);
            this.mijiList.selectedIndex = 0;
        }
    };
    MiJiTujianWin.prototype.onItemTap = function (e) {
        var data = this.mijiList.dataProvider.getItemAt(e.itemIndex);
        this.setData(data);
    };
    MiJiTujianWin.prototype.setData = function (data) {
        var itemConfig = GlobalConfig.ItemConfig[data];
        ;
        this.mijiIcon.setData(itemConfig);
        var color = ItemConfig.getQualityColor(itemConfig).toString(16);
        this.info.textFlow = new egret.HtmlTextParser().parser("<font color='#" + color + "'>" + itemConfig.name + "</font>\n" + itemConfig.desc);
        this.mijiIcon.visible = true;
        var miji = 10;
        for (var _i = 0, _a = GlobalConfig.MiJiSkillConfig; _i < _a.length; _i++) {
            var config = _a[_i];
            if (config.item == data) {
                miji = config.id;
            }
        }
        this.power.text = "评分：" + GlobalConfig.MiJiSkillConfig[miji].power;
    };
    MiJiTujianWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.mijiOpen:
                ViewManager.ins().close(this);
                UserWarn.ins().setBuyGoodsWarn(200099, 1);
                break;
        }
    };
    return MiJiTujianWin;
}(BaseEuiView));
__reflect(MiJiTujianWin.prototype, "MiJiTujianWin");
ViewManager.ins().reg(MiJiTujianWin, LayerManager.UI_Main);
//# sourceMappingURL=MiJiTujianWin.js.map