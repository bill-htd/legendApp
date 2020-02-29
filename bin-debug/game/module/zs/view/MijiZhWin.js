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
var MijiZhWin = (function (_super) {
    __extends(MijiZhWin, _super);
    function MijiZhWin() {
        return _super.call(this) || this;
    }
    MijiZhWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "MijiZhSkin";
        this.itemList.itemRenderer = ItemBaseNoTap;
        this.itemScroller.viewport = this.itemList;
        this.touchChildren = true;
        this.mijiItem0.touchEnabled = true;
        this.mijiItem0.touchChildren = true;
        this.mijiItem1.touchEnabled = true;
        this.mijiItem1.touchChildren = true;
        this.mijiItem2.touchEnabled = true;
        this.mijiItem2.touchChildren = true;
        this.mcEff1 = new MovieClip();
        this.mcEff1.x = 20 + 43;
        this.mcEff1.y = 60 + 39;
        this.mcEff2 = new MovieClip();
        this.mcEff2.x = 153;
        this.mcEff2.y = 60 + 39;
        this.mcEff3 = new MovieClip();
        this.mcEff3.x = 243;
        this.mcEff3.y = 60 + 39;
        this.nameArr = [];
        this.isTopLevel = true;
    };
    MijiZhWin.prototype.onItemTap = function (e) {
        if (this.mijiItem0.data && this.mijiItem1.data && this.mijiItem2.data)
            return;
        var count = e.item.count;
        var id = MiJiSkillConfig.getSkillIDByItem(e.item.configID);
        if (this.mijiItem0.data == id)
            count--;
        if (this.mijiItem1.data == id)
            count--;
        if (this.mijiItem2.data == id)
            count--;
        var str = "秘籍不足";
        if (!count) {
            UserTips.ins().showTips(str);
            return;
        }
        if (!this.mijiItem0.data) {
            this.mijiItem0.data = id;
            this.nameArr[0] = e.item.itemConfig.name;
        }
        else if (!this.mijiItem1.data) {
            this.mijiItem1.data = id;
            this.nameArr[1] = e.item.itemConfig.name;
        }
        else if (!this.mijiItem2.data) {
            this.mijiItem2.data = id;
            this.nameArr[2] = e.item.itemConfig.name;
        }
        this.mijiItem3.data = "";
    };
    MijiZhWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.smeltBtn, this.onTap);
        this.addTouchEvent(this.mijiItem0, this.onTap);
        this.addTouchEvent(this.mijiItem1, this.onTap);
        this.addTouchEvent(this.mijiItem2, this.onTap);
        this.addTouchEvent(this.mijiItem3, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.observe(UserBag.ins().postItemAdd, this.updateItem);
        this.observe(UserBag.ins().postItemDel, this.updateItem);
        this.observe(UserBag.ins().postItemChange, this.updateItem);
        this.observe(UserMiji.ins().postMijiChange, this.showResult);
        this.clearData();
        this.updateItem();
    };
    MijiZhWin.prototype.sortFun = function (aItem, bItem) {
        if (aItem.configID < bItem.configID)
            return -1;
        if (aItem.configID > bItem.configID)
            return 1;
        return 0;
    };
    MijiZhWin.prototype.updateItem = function () {
        var arr = UserBag.ins().getBagGoodsByType(2);
        arr.sort(this.sortFun);
        this.itemList.dataProvider = new eui.ArrayCollection(arr);
    };
    MijiZhWin.prototype.clearData = function () {
        this.itemList.selectedIndex = -1;
        this.mijiItem0.data = "";
        this.mijiItem1.data = "";
        this.mijiItem2.data = "";
        this.mijiItem3.data = "";
    };
    MijiZhWin.prototype.playEffect = function () {
        this.mcEff1.playFile(RES_DIR_EFF + "forgeSuccess", 1);
        this.anigroup.addChild(this.mcEff1);
        this.mcEff2.playFile(RES_DIR_EFF + "forgeSuccess", 1);
        this.anigroup.addChild(this.mcEff2);
        this.mcEff3.playFile(RES_DIR_EFF + "forgeSuccess", 1);
        this.anigroup.addChild(this.mcEff3);
    };
    MijiZhWin.prototype.onTap = function (e) {
        var _this = this;
        switch (e.currentTarget) {
            case this.smeltBtn:
                if (!this.mijiItem0.data || !this.mijiItem1.data || !this.mijiItem2.data) {
                    UserTips.ins().showTips("请先放入3本秘籍");
                    return;
                }
                WarnWin.show("是否消耗《" + this.nameArr[0] + "》、《" + this.nameArr[1] + "》、《" + this.nameArr[2] + "》随机置换一本新的秘籍？", function () {
                    var skillID1 = _this.mijiItem0.data;
                    var skillID2 = _this.mijiItem1.data;
                    var skillID3 = _this.mijiItem2.data;
                    UserMiji.ins().sendMijiChange(skillID1, skillID2, skillID3);
                    _this.clearData();
                    _this.playEffect();
                }, this);
                break;
            case this.closeBtn:
            case this.closeBtn0:
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.mijiItem0:
            case this.mijiItem1:
            case this.mijiItem2:
                e.currentTarget.data = "";
                break;
            case this.mijiItem3:
                if (this.mijiItem3 && this.mijiItem3.data) {
                    var tempData = GlobalConfig.MiJiSkillConfig[this.mijiItem3.data];
                    if (tempData) {
                        var tempItem = UserBag.ins().getBagItemById(tempData.item);
                        if (tempItem)
                            ViewManager.ins().open(ItemDetailedWin, 0, tempItem.itemConfig.id, tempItem.count);
                    }
                }
                break;
        }
    };
    MijiZhWin.prototype.showResult = function (itemID) {
        this.mijiItem3.data = MiJiSkillConfig.getSkillIDByItem(itemID);
    };
    MijiZhWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.smeltBtn, this.onTap);
        this.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.removeTouchEvent(this.mijiItem0, this.onTap);
        this.removeTouchEvent(this.mijiItem1, this.onTap);
        this.removeTouchEvent(this.mijiItem2, this.onTap);
        this.removeObserve();
        DisplayUtils.removeFromParent(this.mcEff1);
        DisplayUtils.removeFromParent(this.mcEff2);
        DisplayUtils.removeFromParent(this.mcEff3);
    };
    return MijiZhWin;
}(BaseEuiView));
__reflect(MijiZhWin.prototype, "MijiZhWin");
ViewManager.ins().reg(MijiZhWin, LayerManager.UI_Popup);
//# sourceMappingURL=MijiZhWin.js.map