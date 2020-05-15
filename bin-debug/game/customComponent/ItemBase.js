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
var ItemBase = (function (_super) {
    __extends(ItemBase, _super);
    function ItemBase() {
        var _this = _super.call(this) || this;
        _this.showSpeicalDetail = true;
        _this.isOpenSelectImg = false;
        _this.isCurrency = false;
        _this.showName = false;
        _this.skinName = 'ItemSkin';
        _this.init();
        return _this;
    }
    ItemBase.prototype.init = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    ItemBase.prototype.setSoul = function (isSoul) {
        this.itemIcon.setSoul(isSoul);
    };
    ItemBase.prototype.setItemImg = function (str) {
        this.itemIcon.imgIcon.source = str;
    };
    ItemBase.prototype.setItemHeirloomBgImg = function (v, path) {
        if (path)
            this.itemIcon.imgheirloom.source = path + "_png";
        this.itemIcon.imgheirloom.visible = v;
    };
    ItemBase.prototype.setDataByConfig = function (config, nText) {
        if (this.itemIcon && typeof this.itemIcon.setData == 'function') {
            this.itemIcon.setData(config);
        }
        var type = ItemConfig.getType(config);
        if (type == ItemType.TYPE_0 && config.descIndex != 248 && !this.showName) {
            var nameStr = isNaN(config.zsLevel) ? ((config.level || 1) + "\u7EA7") : (config.zsLevel + "转");
            this.nameTxt.text = nameStr;
            if (UserBag.fitleEquip.indexOf(config.id) != -1) {
                this.nameTxt.text = "无级别";
                this.nameTxt.textColor = ItemConfig.getQualityColor(config);
            }
        }
        else {
            this.nameTxt.text = nText ? nText : config.name;
            this.nameTxt.textColor = ItemConfig.getQualityColor(config);
        }
        if (this.num != undefined) {
            this.setCount(this.num + "");
        }
        if (type == ItemType.TYPE_12)
            this.redPoint.visible = this.getGuildGift(config);
    };
    ItemBase.prototype.dataChanged = function () {
        this.clear();
        var checkRedPoint = false;
        this.redPoint.visible = false;
        if (!isNaN(this.data)) {
            this.itemConfig = GlobalConfig.ItemConfig[this.data];
            this.setDataByConfig(this.itemConfig, this.runeName);
        }
        else if (this.data instanceof ItemData) {
            this.itemConfig = this.data.itemConfig;
            if (!this.itemConfig)
                return;
            this.setDataByConfig(this.itemConfig);
            this.data.count > 1 ? this.setCount(this.data.count + "") : this.setCount("");
            checkRedPoint = true;
        }
        else {
            if (this.data.type == 0) {
                this.itemIcon.imgIcon.source = RewardData.getCurrencyRes(this.data.id);
                var type = 1;
                switch (this.data.id) {
                    case MoneyConst.yuanbao:
                        type = 5;
                        break;
                    case MoneyConst.gold:
                        type = 0;
                        break;
                    case MoneyConst.soul:
                    case MoneyConst.chip:
                        type = 2;
                        break;
                    case MoneyConst.piece:
                        type = 2;
                        this.itemIcon.imgIcon.source = RewardData.CURRENCY_RES[this.data.id];
                        break;
                    case MoneyConst.godweaponExp:
                        type = 2;
                        break;
                    default:
                        break;
                }
                this.isCurrency = true;
                this.itemIcon.imgBg.source = "quality" + type;
                this.nameTxt.text = RewardData.getCurrencyName(this.data.id);
                this.nameTxt.textColor = ItemBase.QUALITY_COLOR[type];
                var count = this.data.count;
                (count != undefined && count > 1) ? this.setCount(count + "") : this.setCount("");
            }
            else if (this.data.type == 1) {
                this.itemConfig = GlobalConfig.ItemConfig[this.data.id];
                if (!this.itemConfig)
                    return;
                this.setDataByConfig(this.itemConfig);
                var count = this.data.count;
                count > 1 ? this.setCount(count + "") : this.setCount("");
            }
            else if (this.data.type == 6) {
                this.itemConfig = GlobalConfig.ItemConfig[this.data.id];
                this.setDataByConfig(this.itemConfig);
                var count = this.data.count;
                (count != undefined && count > 1) ? this.setCount(count + "") : this.setCount("");
            }
        }
        if (!this.redPoint.visible)
            this.redPoint.visible = this.data.canbeUsed;
        this.showEquipEffect();
        if (checkRedPoint) {
            if (this.itemConfig) {
                if (ItemConfig.getType(this.itemConfig) == ItemType.TYPE_8) {
                    var boo = true;
                    if (this.itemConfig.id == ItemConst.EXP_ITEM)
                        boo = Actor.level >= 65;
                    this.redPoint.visible = this.data && this.data.count > 0 && boo;
                    if (this.itemConfig.id == ItemConst.LEVELUP_ITEM) {
                        this.redPoint.visible = true;
                    }
                }
                else if (ItemConfig.getType(this.itemConfig) == ItemType.TYPE_17) {
                    this.redPoint.visible = true;
                }
                else if (ItemConfig.getType(this.itemConfig) == ItemType.TYPE_20) {
                    this.redPoint.visible = this.data.canbeUsed;
                }
                else if (ItemConfig.getType(this.itemConfig) == ItemType.TYPE_25) {
                    this.redPoint.visible = true;
                }
                else {
                    if (this.itemConfig.id == GlobalConfig.TeamFuBenBaseConfig.itemId) {
                        this.redPoint.visible = true;
                    }
                    else {
                        var composeConf = GlobalConfig.ItemComposeConfig[this.itemConfig.id];
                        if (composeConf && composeConf.srcCount <= this.data.count) {
                            this.redPoint.visible = true;
                        }
                    }
                }
            }
        }
        this.setSelect(this.selected);
        this.dataChangeHandler();
    };
    ItemBase.prototype.dataChangeHandler = function () {
    };
    ItemBase.prototype.clear = function () {
        this.itemConfig = null;
        if (this.itemIcon && typeof this.itemIcon.setData == 'function')
            this.itemIcon.setData(null);
        this.count.text = "";
        this.nameTxt.text = "";
        this.nameTxt.textColor = 0xDFD1B5;
        DisplayUtils.removeFromParent(this.EquipEffect);
    };
    ItemBase.prototype.destruct = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    ItemBase.prototype.isShowJob = function (b) {
        this.itemIcon.imgJob.visible = b;
    };
    ItemBase.prototype.onClick = function () {
        this.showCurrency();
        this.showDetail();
    };
    ItemBase.prototype.getItemType = function () {
        if (!this.itemConfig)
            return -1;
        else
            return ItemConfig.getType(this.itemConfig);
    };
    ItemBase.prototype.showCurrency = function () {
        if (!this.isCurrency)
            return;
        switch (this.data.id) {
            case MoneyConst.yuanbao:
            case MoneyConst.feat:
            case MoneyConst.godweaponExp:
                ViewManager.ins().open(ItemCurrencyWin, this.data.id, this.data.count);
                break;
        }
    };
    ItemBase.prototype.showDetail = function () {
        if (!this.itemConfig)
            return;
        if (this.itemConfig.id == GlobalConfig.TeamFuBenBaseConfig.itemId) {
            ViewManager.ins().open(FlowerUseTipsWin);
            return;
        }
        switch (ItemConfig.getType(this.itemConfig)) {
            case ItemType.TYPE_0:
            case ItemType.TYPE_4:
                this.openEquipsTips();
                break;
            case ItemType.TYPE_5:
                ViewManager.ins().open(HejiEquipTipsWin, this.data, false, true);
                break;
            case ItemType.TYPE_1:
                if (this.data.handle && GlobalConfig.ItemComposeConfig[this.itemConfig.id]) {
                    ViewManager.ins().open(ItemUseTipsWin, this.data);
                }
                else if (this.data.handle && this.itemConfig.id == GlobalConfig.ShenShouConfig.battleCountItem) {
                    ViewManager.ins().open(ShenshouDanUseWin, this.itemConfig);
                }
                else if (this.data.handle && this.itemConfig.id == Dress.ins().getIdZhuangBanId(this.itemConfig.id)) {
                    ViewManager.ins().open(DressTipsWin, this.itemConfig);
                }
                else {
                    ViewManager.ins().open(ItemDetailedWin, 0, this.itemConfig.id, this.data.count);
                }
                break;
            case ItemType.TYPE_2:
                if (this.data.handle)
                    ViewManager.ins().open(ItemUseTipsWin, this.data);
                else {
                    if (this.data.count)
                        ViewManager.ins().open(ItemDetailedWin, 0, this.itemConfig.id, this.data.count);
                    else
                        ViewManager.ins().open(ItemDetailedWin, 0, this.itemConfig.id);
                }
                break;
            case ItemType.TYPE_6:
                ViewManager.ins().open(RuneTipsWin, 0, this.itemConfig.id, this.desc, this.desc2);
                break;
            case ItemType.TYPE_9:
                ViewManager.ins().open(BookTipsWin, this.itemConfig.id, 0, this.data.handle);
                break;
            case ItemType.TYPE_10:
                if (this.data.handle) {
                    ViewManager.ins().open(ItemUseTipsWin, this.data);
                }
                else {
                    ViewManager.ins().open(ItemDetailedWin, 0, this.itemConfig.id);
                }
                break;
            case ItemType.TYPE_8:
            case ItemType.TYPE_20:
                if (this.data.type == 1) {
                    ViewManager.ins().open(ItemDetailedWin, 0, this.itemConfig.id, this.data.count);
                }
                else {
                    var count = +(this.count.text);
                    this.showSpeicalDetail = false;
                    var parentDisplay_1 = this.parent;
                    while (parentDisplay_1 && parentDisplay_1.parent) {
                        parentDisplay_1 = parentDisplay_1.parent;
                        if (parentDisplay_1 instanceof BagWin) {
                            this.showSpeicalDetail = true;
                            break;
                        }
                    }
                    if (this.showSpeicalDetail) {
                        ViewManager.ins().open(ItemUseTipsWin, {
                            itemConfig: this.itemConfig,
                            configID: this.itemConfig.id,
                            count: count
                        });
                    }
                    else {
                        ViewManager.ins().open(ItemDetailedWin, 0, this.itemConfig.id, count);
                    }
                }
                break;
            case ItemType.TYPE_12:
                if (!this.data.itemConfig) {
                    ViewManager.ins().open(ItemUseTipsWin, {
                        itemConfig: this.itemConfig,
                        configID: this.itemConfig.id,
                        count: this.data.count
                    }, true);
                }
                else if (this.getGuildGift(this.data)) {
                    ViewManager.ins().open(ItemUseTipsWin, this.data);
                }
                else {
                    ViewManager.ins().open(ItemUseTipsWin, {
                        itemConfig: this.itemConfig,
                        configID: this.itemConfig.id,
                        count: this.data.count
                    }, true);
                }
                break;
            case ItemType.TYPE_11:
                for (var k in GlobalConfig.HeirloomEquipItemConfig) {
                    var hcfg = GlobalConfig.HeirloomEquipItemConfig[k];
                    if (hcfg && hcfg.item == this.itemConfig.id) {
                        ViewManager.ins().open(HeirloomEquipTipsWin, null, hcfg.pos - 1);
                        break;
                    }
                }
                break;
            case ItemType.TYPE_13:
            case ItemType.TYPE_14:
                if (this.data.type == ItemType.TYPE_1) {
                    ViewManager.ins().open(ItemDetailedWin, 0, this.itemConfig.id, this.data.count);
                }
                else {
                    ViewManager.ins().open(ItemUseTipsWin, {
                        itemConfig: this.itemConfig,
                        configID: this.itemConfig.id,
                        count: this.data.count
                    });
                }
                break;
            case ItemType.TYPE_15:
                ViewManager.ins().open(ItemDetailedWin, 0, this.itemConfig.id, this.data ? this.data.count : undefined);
                break;
            case ItemType.TYPE_16:
                var gwConfig = GlobalConfig.GodWingItemConfig[this.itemConfig.id];
                ViewManager.ins().open(GodWingTipsWin, gwConfig);
                break;
            case ItemType.TYPE_17:
                this.showSpeicalDetail = false;
                var parentDisplay = this.parent;
                while (parentDisplay && parentDisplay.parent) {
                    parentDisplay = parentDisplay.parent;
                    if (parentDisplay instanceof BagWin) {
                        this.showSpeicalDetail = true;
                        break;
                    }
                }
                ViewManager.ins().open(this.showSpeicalDetail ? TreasureChuanshiGiftWin : ItemDetailedWin, 0, this.itemConfig.id, this.data.count);
                break;
            case ItemType.TYPE_19:
                ViewManager.ins().open(ExtremeEquipTipsWin, ItemConfig.getSubType(this.itemConfig));
                break;
            case ItemType.TYPE_21:
                ZhanLing.ins().ZhanLingItemTips(this.itemConfig.id);
                break;
            case ItemType.TYPE_22:
                ViewManager.ins().open(ZhanlingZBTipWin, this.itemConfig.id);
                break;
            case ItemType.TYPE_23:
                ViewManager.ins().open(ShenshouEquipTip, 0, 0, this.itemConfig.id);
                break;
            case ItemType.TYPE_24:
                ViewManager.ins().open(HunguTipsWin, false, 0, this.itemConfig.id);
                break;
            case ItemType.TYPE_25:
                ViewManager.ins().open(ItemUseTipsWin, this.data);
                break;
            default:
                ViewManager.ins().open(ItemDetailedWin, 0, this.itemConfig.id);
        }
    };
    ItemBase.prototype.getGuildGift = function (config) {
        var level = 0;
        if (config instanceof ItemConfig) {
            level = config.level;
        }
        else if (config instanceof ItemData) {
            var cfg = GlobalConfig.ItemConfig[config._configID];
            level = cfg.level;
        }
        if (Actor.level >= level && Guild.ins().guildID != 0) {
            return true;
        }
        else {
            return false;
        }
    };
    ItemBase.prototype.setCount = function (str) {
        if (str.length > 4) {
            var wNum = Math.floor(Number(str) / 1000);
            str = wNum / 10 + "万";
        }
        this.count.text = str;
    };
    ItemBase.prototype.openEquipsTips = function () {
        var subType = ItemConfig.getSubType(this.itemConfig);
        if (subType >= EquipPos.HAT && subType <= EquipPos.SHIELD) {
            ViewManager.ins().open(SamsaraEquipTips, this.itemConfig.id);
        }
        else {
            ViewManager.ins().open(EquipDetailedWin, 1, this.data.handle, this.itemConfig.id, this.data);
        }
    };
    ItemBase.prototype.isShowName = function (b) {
        this.nameTxt.visible = b;
    };
    ItemBase.prototype.getItemSoure = function () {
        var str = "";
        if (this.data.type == 0) {
            str = RewardData.getCurrencyRes(this.data.id);
        }
        else {
            str = this.itemIcon.config.icon + '_png';
        }
        return str;
    };
    ItemBase.prototype.getText = function () {
        return this.nameTxt.text;
    };
    ItemBase.prototype.getTextColor = function () {
        return this.nameTxt.textColor;
    };
    ItemBase.prototype.showEquipEffect = function () {
        var quality = ItemConfig.getQuality(this.itemConfig);
        var type = ItemConfig.getType(this.itemConfig);
        if ((!this.itemConfig || quality <= 3) && this.data.id != MoneyConst.yuanbao)
            return;
        var effectName = "";
        this.EquipEffect = this.EquipEffect || new MovieClip();
        this.EquipEffect.touchEnabled = false;
        if (this.data.id == MoneyConst.yuanbao) {
            effectName = "quaeff7";
            this.EquipEffect.x = 44;
            this.EquipEffect.y = 32;
            this.EquipEffect.scaleX = this.EquipEffect.scaleY = 1;
        }
        else if (quality == 4) {
            effectName = "quality_05";
            this.EquipEffect.x = 44;
            this.EquipEffect.y = 36;
        }
        else if (quality == 5) {
            effectName = "chuanqizbeff";
            this.EquipEffect.x = 44;
            this.EquipEffect.y = 36;
            this.EquipEffect.scaleX = this.EquipEffect.scaleY = 1.1;
        }
        this.addChild(this.EquipEffect);
        this.EquipEffect.playFile(RES_DIR_EFF + effectName, -1);
    };
    ItemBase.prototype.clearEffect = function () {
        DisplayUtils.removeFromParent(this.EquipEffect);
        this.EquipEffect = null;
    };
    ItemBase.prototype.HideImgBg = function () {
        this.itemIcon.imgBg.visible = false;
    };
    ItemBase.prototype.showNum = function (isShow) {
        this.count.visible = isShow;
    };
    ItemBase.prototype.setImgBg = function (type) {
        this.itemIcon.imgBg.source = "quality" + type;
    };
    ItemBase.prototype.getItemIcon = function () {
        return this.itemIcon;
    };
    ItemBase.prototype.setSelect = function (selected) {
        if (this.isOpenSelectImg) {
            this.selectFrame.visible = selected;
        }
    };
    ItemBase.prototype.hideName = function () {
        this.nameTxt.visible = false;
    };
    ItemBase.prototype.setName = function (src) {
        this.nameTxt.textFlow = TextFlowMaker.generateTextFlow1(src);
    };
    ItemBase.prototype.setImgBg1 = function (res) {
        this.itemIcon.setImgBg1(res);
    };
    ItemBase.QUALITY_COLOR = [0xe2dfd4, 0x35e62d, 0xd242fb, 0xff750f, 0xf3311e, 0xffd93f];
    ItemBase.additionRange = 15;
    return ItemBase;
}(BaseItemRender));
__reflect(ItemBase.prototype, "ItemBase");
//# sourceMappingURL=ItemBase.js.map