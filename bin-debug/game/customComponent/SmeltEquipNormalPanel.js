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
var SmeltEquipNormalPanel = (function (_super) {
    __extends(SmeltEquipNormalPanel, _super);
    function SmeltEquipNormalPanel() {
        var _this = _super.call(this) || this;
        _this.viewIndex = 0;
        _this.name = "普通装备";
        return _this;
    }
    SmeltEquipNormalPanel.prototype.childrenCreated = function () {
        this.init();
    };
    SmeltEquipNormalPanel.prototype.init = function () {
        this.smeltEquips = [];
        this.smeltEquips.length = 9;
        this.itemList.itemRenderer = SmeltEquipItem;
        this.dataInfo = new eui.ArrayCollection(this.smeltEquips);
        this.itemList.dataProvider = this.dataInfo;
        this.eff = new MovieClip;
        this.eff.x = 158;
        this.eff.y = 38;
        this.eff.scaleX = 1;
        this.eff.scaleY = 1;
        this.eff.touchEnabled = false;
    };
    SmeltEquipNormalPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.smeltBtn, this.onTap);
        this.addTouchEvent(this.oneKeySmeltBtn, this.onTap);
        this.addTouchEvent(this.itemList, this.onTap);
        this.addTouchEvent(this.smeltLable, this.onTap);
        this.addTouchEvent(this.backbtn, this.onTap);
        this.setItemData();
        this.observe(UserEquip.ins().postSmeltEquipComplete, this.smeltComplete);
        this.observe(UserEquip.ins().postEquipCheckList, this.setItemList);
        this.observe(UserEquip.ins().postSmeltEquipComplete, this.smeltShowTips);
        if (Recharge.ins().franchise) {
            this.smeltBtn.visible = false;
            this.tequanimg.visible = false;
            this.oneKeySmeltBtn.x = 25;
        }
        else {
            this.smeltBtn.visible = true;
            this.tequanimg.visible = true;
            this.oneKeySmeltBtn.x = -105;
        }
    };
    SmeltEquipNormalPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.smeltBtn, this.onTap);
        this.removeTouchEvent(this.oneKeySmeltBtn, this.onTap);
        this.removeTouchEvent(this.itemList, this.onTap);
        this.removeTouchEvent(this.smeltLable, this.onTap);
        this.removeTouchEvent(this.backbtn, this.onTap);
        this.removeObserve();
        DisplayUtils.removeFromParent(this.eff);
        TimerManager.ins().remove(this.AutoSmeltEquip, this);
    };
    SmeltEquipNormalPanel.prototype.smeltShowTips = function (itemList) {
        for (var i = 0; i < itemList.length; i++) {
            var idata = itemList[i];
            var equipConfig = GlobalConfig.EquipConfig[idata.itemId];
            if (equipConfig) {
                var itemConfig = GlobalConfig.ItemConfig[equipConfig.id];
                if (itemConfig) {
                    var quality = ItemConfig.getQualityColor(itemConfig);
                    var str = "获得|C:" + quality + "&T:" + itemConfig.name + " x " + idata.count + "|";
                    var p = this.smeltBtn.localToGlobal();
                    UserTips.ins().showEverTips({ str: str, x: p.x - 45, y: p.y - 45 });
                }
            }
        }
    };
    SmeltEquipNormalPanel.prototype.smeltComplete = function () {
        var n = this.itemList.numChildren;
        while (n--) {
            this.itemList.getChildAt(n).playEff();
        }
        this.setItemData();
    };
    SmeltEquipNormalPanel.prototype.setItemData = function () {
        this.smeltEquips = UserBag.ins().getOutEquips();
        this.dataInfo.replaceAll(this.smeltEquips);
        if (this.oneKeySmeltBtn.label != "取消熔炼") {
            this.setBtnLabel();
        }
    };
    SmeltEquipNormalPanel.prototype.setItemList = function (list) {
        this.dataInfo.replaceAll(list);
        this.itemList.dataProvider = this.dataInfo;
    };
    SmeltEquipNormalPanel.prototype.getGuildButton = function () {
        this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
        if (!this.eff.parent)
            this.btnGroup.addChild(this.eff);
        return this.smeltBtn;
    };
    SmeltEquipNormalPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.oneKeySmeltBtn:
                if (Recharge.ins().franchise) {
                    if (this.oneKeySmeltBtn.label == "取消熔炼") {
                        this.setBtnLabel();
                        TimerManager.ins().remove(this.AutoSmeltEquip, this);
                    }
                    else {
                        if (!TimerManager.ins().isExists(this.AutoSmeltEquip, this)) {
                            this.oneKeySmeltBtn.label = "取消熔炼";
                            TimerManager.ins().doTimer(200, 0, this.AutoSmeltEquip, this);
                        }
                    }
                }
                else {
                    WarnWin.show("开通特权月卡立即享受一键熔炼功能，是否前往查看", function () {
                        ViewManager.ins().close(SmeltEquipTotalWin);
                        ViewManager.ins().open(FuliWin, 4);
                    }, this);
                }
                break;
            case this.smeltBtn:
                DisplayUtils.removeFromParent(this.eff);
                var b = UserEquip.ins().sendSmeltEquip(this.viewIndex, this.smeltEquips);
                if (b) {
                    SoundUtil.ins().playEffect(SoundUtil.SMELT);
                }
                break;
            case this.itemList:
                var item = e.target;
                if (item && item.data) {
                    var i = this.smeltEquips.indexOf(item.data);
                    if (i >= 0) {
                        this.smeltEquips.splice(i, 1);
                        item.data = null;
                    }
                }
                break;
            case this.smeltLable:
                break;
            case this.backbtn:
                ViewManager.ins().close(SmeltEquipTotalWin);
                break;
        }
    };
    SmeltEquipNormalPanel.prototype.AutoSmeltEquip = function () {
        DisplayUtils.removeFromParent(this.eff);
        var b = UserEquip.ins().sendSmeltEquip(this.viewIndex, this.smeltEquips);
        if (b) {
            SoundUtil.ins().playEffect(SoundUtil.SMELT);
        }
        else {
            this.setBtnLabel();
            TimerManager.ins().remove(this.AutoSmeltEquip, this);
        }
    };
    SmeltEquipNormalPanel.prototype.setBtnLabel = function () {
        this.oneKeySmeltBtn.label = "一键熔炼";
    };
    return SmeltEquipNormalPanel;
}(BaseComponent));
__reflect(SmeltEquipNormalPanel.prototype, "SmeltEquipNormalPanel");
//# sourceMappingURL=SmeltEquipNormalPanel.js.map