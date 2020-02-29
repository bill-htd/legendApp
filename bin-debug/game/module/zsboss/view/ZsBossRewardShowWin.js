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
var ZsBossRewardShowWin = (function (_super) {
    __extends(ZsBossRewardShowWin, _super);
    function ZsBossRewardShowWin() {
        return _super.call(this) || this;
    }
    ZsBossRewardShowWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ZSBossRewardSkin";
        this.tab.dataProvider = new eui.ArrayCollection(ZsBoss.ins().getBarList());
        this.itemList1.itemRenderer = ItemBase;
        this.itemList2.itemRenderer = ItemBase;
        this.itemList3.itemRenderer = ItemBase;
        this.itemList4.itemRenderer = ItemBase;
        this.isTopLevel = true;
    };
    ZsBossRewardShowWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addChangeEvent(this.tab, this.selectIndexChange);
        this.selectIndexChange(null);
    };
    ZsBossRewardShowWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
    };
    ZsBossRewardShowWin.prototype.selectIndexChange = function (e) {
        var cruIndex = this.tab.selectedIndex;
        var config = GlobalConfig.OtherBoss1Config[cruIndex + 1];
        this.bossName.text = GlobalConfig.MonstersConfig[config.bossId].name + "(" + config.llimit + "-" + config.hlimit + "转)";
        this.ranklabel1.text = config.rankname[0];
        this.ranklabel2.text = config.rankname[1];
        this.ranklabel3.text = config.rankname[2];
        this.ranklabel4.text = config.rankname[3];
        this.ranklabel5.text = config.rankname[4];
        this.ranklabel6.text = config.rankname[5];
        this.itemList1.dataProvider = new eui.ArrayCollection(config.rank1);
        this.itemList2.dataProvider = new eui.ArrayCollection(config.rank2);
        this.itemList3.dataProvider = new eui.ArrayCollection(config.rank3);
        this.itemList4.dataProvider = new eui.ArrayCollection(config.rank4);
        this.itemList5.data = config.killReward;
        this.itemList6.data = config.shield[0].reward;
    };
    ZsBossRewardShowWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
        }
    };
    return ZsBossRewardShowWin;
}(BaseEuiView));
__reflect(ZsBossRewardShowWin.prototype, "ZsBossRewardShowWin");
ViewManager.ins().reg(ZsBossRewardShowWin, LayerManager.UI_Popup);
//# sourceMappingURL=ZsBossRewardShowWin.js.map