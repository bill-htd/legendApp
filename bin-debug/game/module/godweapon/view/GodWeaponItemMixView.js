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
var GodweaponItemMixView = (function (_super) {
    __extends(GodweaponItemMixView, _super);
    function GodweaponItemMixView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isHintEffectPlay = false;
        _this.isPlay = false;
        _this.COMPOUND_STATE = "mix";
        _this.FUSE_STATE = "ultramix";
        _this.PAGE_SIZE = 5;
        return _this;
    }
    GodweaponItemMixView.prototype.open = function () {
        this.mix1.touchChildren = false;
        this.mix2.touchChildren = false;
        this.mix3.touchChildren = false;
        this.targetGroup.touchChildren = false;
        this.mix.enabled = false;
        this.list.itemRenderer = GodweaponItem;
        this.labelEffect = new MovieClip;
        this.labelEffect.scaleX = 0.6;
        this.labelEffect.scaleY = 0.5;
        this.labelEffect.touchEnabled = false;
        this.hintEffect = new MovieClip;
        this.hintEffect.touchEnabled = false;
        this.descTxt.alpha = 1;
        this.MaterialItemId = ItemConst.GODWEAPON_ITEM;
        this.addCustomEvent();
        this.updateView();
    };
    GodweaponItemMixView.prototype.close = function () {
        this.cleanTween();
    };
    GodweaponItemMixView.prototype.addCustomEvent = function () {
        this.addTouchEvent(this.turn, this.changeState);
        this.addTouchEvent(this.leftButton, this.prevPage);
        this.addTouchEvent(this.rightButton, this.nextPage);
        this.addTouchEvent(this.mix1, this.touchMixItem);
        this.addTouchEvent(this.mix2, this.touchMixItem);
        this.addTouchEvent(this.mix3, this.touchMixItem);
        this.addTouchEvent(this.targetGroup, this.touchTargetItem);
        this.addTouchEvent(this.mix, this.operate);
        this.addTouchEvent(this.mixMaterial, this.onTouch);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListChange, this);
        this.observe(GodWeaponItemCC.ins().postCompound, this.onCompound);
        this.observe(GodWeaponItemCC.ins().postFuse, this.onFuse);
    };
    GodweaponItemMixView.prototype.operate = function () {
        if (!this.mix.enabled)
            return;
        if (this.currentState == this.FUSE_STATE) {
            GodWeaponItemCC.ins().requestFuse(this.mixData1.id, this.mixData2.id, this.isMaterial ? 1 : 0);
        }
        else {
            GodWeaponItemCC.ins().requestCompound(this.mixData1.id, this.mixData2.id, this.mixData3.id);
        }
    };
    GodweaponItemMixView.prototype.onCompound = function (data) {
        var _this = this;
        this.mix.enabled = false;
        this.isMaterial = false;
        this.addEffect();
        TimerManager.ins().doTimerDelay(300, 0, 1, function () {
            _this.addEffect(function () {
                _this.updateView();
                _this.updateTargetItem(data.id);
                _this.addResultEffect(data.isSuccess, data.id, true);
            });
        }, this);
    };
    GodweaponItemMixView.prototype.addResultEffect = function (success, id, isForceFly) {
        var _this = this;
        if (isForceFly === void 0) { isForceFly = false; }
        var effect = new MovieClip;
        effect.x = this.targetGroup.width / 2;
        this.targetGroup.addChild(effect);
        var effectPath;
        if (success) {
            effectPath = RES_DIR_EFF + "forgeSuccess";
            effect.y = this.targetGroup.height / 2 - 15;
        }
        else {
            effectPath = RES_DIR_EFF + "litboom";
            effect.y = this.targetGroup.height / 2;
        }
        effect.playFile(effectPath, 1, function () {
            if (!isForceFly) {
                _this.cleanEff();
            }
            if (id && (isForceFly || success)) {
                _this.flyItem(id);
            }
        });
    };
    GodweaponItemMixView.prototype.playEff = function (fun) {
        var _this = this;
        if (this.isPlay) {
            return;
        }
        var effSour = RES_DIR_EFF + "jljdt";
        this.isPlay = true;
        var speed = 1;
        var leff = new MovieClip();
        leff.playFile(effSour, -1);
        this.leftEff.addChild(leff);
        var reff = new MovieClip();
        reff.playFile(effSour, -1);
        this.rightEff.addChild(reff);
        var beff = new MovieClip();
        beff.playFile(effSour, -1);
        this.buttonEff.addChild(beff);
        beff.x += 14;
        beff.$setRotation(90);
        var maxX = 0.23;
        var t1 = egret.Tween.get(leff);
        var t2 = egret.Tween.get(reff);
        t2.to({ scaleX: maxX }, 250 * speed);
        t1.to({ scaleX: maxX }, 250 * speed).call(function () {
            var t3 = egret.Tween.get(beff);
            t3.to({ scaleX: 0.35 }, 250 * speed).call(function () {
                _this.isPlay = false;
                if (fun)
                    fun.call(_this);
            });
        });
    };
    GodweaponItemMixView.prototype.cleanEff = function () {
        this.leftEff.removeChildren();
        this.rightEff.removeChildren();
        this.buttonEff.removeChildren();
    };
    GodweaponItemMixView.prototype.addEffect = function (fun) {
        var _this = this;
        var effect = new MovieClip;
        effect.scaleX = 3;
        effect.scaleY = 3;
        effect.x = this.targetGroup.width / 2 - 4;
        effect.y = this.targetGroup.height / 2 - 7;
        this.targetGroup.addChild(effect);
        var path = DisplayUtils.getEffectPath("forceguildeff");
        effect.playFile(path, 1, function () {
            if (fun)
                fun.call(_this);
        });
    };
    GodweaponItemMixView.prototype.onFuse = function (data) {
        var _this = this;
        this.mix.enabled = false;
        this.isMaterial = false;
        var success = data.isSuccess;
        var weaponData;
        if (!success && this.mixData1) {
            weaponData = new GodweaponItemData(this.mixData1.id, this.mixData1.count, this.mixData1.quality);
        }
        this.playEff(function () {
            _this.updateView();
            _this.updateTargetItem(data.id);
            if (!success && weaponData) {
                _this.updateMixItem(1, weaponData);
                if (_this.mixData1 && _this.currentState == _this.FUSE_STATE) {
                    _this.dataSource = new PageArray(_this.updateMixData(), _this.PAGE_SIZE);
                    _this.setPageData();
                }
            }
            _this.addResultEffect(success, data.id);
        });
    };
    GodweaponItemMixView.prototype.flyItem = function (itemId) {
        var itemBase = new ItemBase();
        itemBase.x = this.targetGroup.x;
        itemBase.y = this.targetGroup.y;
        itemBase.data = itemId;
        itemBase.anchorOffsetX = itemBase.width / 2;
        itemBase.anchorOffsetY = itemBase.height / 2;
        this.targetGroup.parent.addChild(itemBase);
        GameLogic.ins().postFlyItemEx(itemBase);
    };
    GodweaponItemMixView.prototype.touchMixItem = function (e) {
        var group = e.target;
        var index = 1;
        if (group == this.mix1) {
            index = 1;
        }
        else if (group == this.mix2) {
            index = 2;
        }
        else if (group == this.mix3) {
            index = 3;
        }
        if (!this["mixData" + index]) {
            this.addHintEffect();
        }
        this.updateMixItem(index);
        if (this.currentState != this.FUSE_STATE) {
            this.setCompoundState(false);
        }
        else {
            this.updateTargetItem();
            if (index == 1)
                this.updateMixItem(2);
        }
        this.dataSource = new PageArray(this.updateMixData(), this.PAGE_SIZE);
        this.setPageData();
    };
    GodweaponItemMixView.prototype.touchTargetItem = function () {
        var isFuse = this.isCanFuse();
        if (!isFuse)
            this.updateTargetItem();
    };
    GodweaponItemMixView.prototype.updateTargetItem = function (itemId) {
        if (itemId === void 0) { itemId = 0; }
        if (itemId) {
            var item = GlobalConfig.ItemConfig[itemId];
            this.targetImg.visible = true;
            this.targetImg.source = item.icon + '_png';
            this.targetLabel.text = item.name;
            this.targetLabel.textColor = ItemConfig.getQualityColor(item);
        }
        else {
            var isCanCompound = this.isCanCompound();
            this.setCompoundState(isCanCompound);
            this.targetLabel.textColor = 0xd1c28f;
            this.targetImg.source = "";
            this.targetImg.visible = false;
        }
    };
    GodweaponItemMixView.prototype.setCompoundState = function (isCanCompound) {
        var desc;
        if (isCanCompound) {
            desc = "随机圣物";
        }
        else {
            desc = "";
        }
        this.targetLabel.text = desc;
        this.targetRandom.visible = isCanCompound;
        this.mixline0Effect.visible = isCanCompound;
        this.mixline1Effect.visible = isCanCompound;
    };
    GodweaponItemMixView.prototype.updateMixItem = function (itemIndex, itemData) {
        if (itemData === void 0) { itemData = null; }
        var img = this["mix" + itemIndex + "Img"];
        var label = this["mix" + itemIndex + "Name"];
        if (itemData) {
            img.visible = true;
            var item = GlobalConfig.ItemConfig[itemData.id];
            img.source = item.icon + "_png";
            label.text = item.name;
            label.textColor = ItemConfig.getQualityColor(item);
        }
        else {
            label.text = "";
            img.visible = false;
        }
        this["mixData" + itemIndex] = itemData;
    };
    GodweaponItemMixView.prototype.addHintEffect = function () {
        var _this = this;
        if (this.isHintEffectPlay)
            return;
        DisplayUtils.removeFromParent(this.hintEffect);
        this.list.addChild(this.hintEffect);
        this.isHintEffectPlay = true;
        this.hintEffect.x = 241;
        this.hintEffect.y = 49;
        var path = DisplayUtils.getEffectPath("mixhint");
        this.hintEffect.playFile(path, 1, function () {
            _this.isHintEffectPlay = false;
        });
    };
    GodweaponItemMixView.prototype.onListChange = function () {
        var data = this.list.selectedItem;
        var isSuccess = this.setMixData(data);
        if (isSuccess) {
            var isFuse = this.isCanFuse();
            if (!isFuse)
                this.updateTargetItem();
            this.dataSource = new PageArray(this.updateMixData(), this.PAGE_SIZE);
            this.setPageData();
        }
        else {
            UserTips.ins().showTips("物品格已满");
        }
    };
    GodweaponItemMixView.prototype.setMixData = function (data) {
        if (this.currentState == this.FUSE_STATE) {
            var isFuse = this.isCanFuse();
            if (isFuse)
                return false;
            var index = 1;
            if (!this.mixData1) {
                this.mixData1 = data;
                index = 1;
            }
            else if (!this.mixData2) {
                this.mixData2 = data;
                index = 2;
            }
            this.updateMixItem(index, data);
            return true;
        }
        else {
            var isCompound = this.isCanCompound();
            if (isCompound)
                return false;
            var index = 1;
            if (!this.mixData1) {
                this.mixData1 = data;
                index = 1;
            }
            else if (!this.mixData2) {
                this.mixData2 = data;
                index = 2;
            }
            else if (!this.mixData3) {
                this.mixData3 = data;
                index = 3;
            }
            this.updateMixItem(index, data);
            return true;
        }
    };
    GodweaponItemMixView.prototype.isCanCompound = function () {
        return (this.mixData1 && this.mixData2 && this.mixData3 && this.currentState != this.FUSE_STATE);
    };
    GodweaponItemMixView.prototype.isCanFuse = function () {
        return (this.mixData1 && this.mixData2 && this.currentState == this.FUSE_STATE);
    };
    GodweaponItemMixView.prototype.updateMixData = function () {
        var result = this.dataList.concat();
        if (this.currentState == this.FUSE_STATE) {
            if (this.mixData1) {
                result = GodweaponItemModel.ins().filterFuseItemList(this.mixData1, result);
            }
            if (this.mixData2) {
                result = GodweaponItemModel.ins().filterFuseItemList(this.mixData2, result);
            }
            var isFuse = this.isCanFuse();
            this.mix.enabled = isFuse;
            if (isFuse)
                this.updateTargetItem(GodweaponItemModel.ins().getFuseTargetItem(this.mixData1.id, this.mixData2.id));
        }
        else {
            if (this.mixData1) {
                result = GodweaponItemModel.ins().filterCompoundItemList(this.mixData1, result);
            }
            if (this.mixData2) {
                result = GodweaponItemModel.ins().filterCompoundItemList(this.mixData2, result);
            }
            if (this.mixData3) {
                result = GodweaponItemModel.ins().filterCompoundItemList(this.mixData3, result);
            }
            this.mix.enabled = this.isCanCompound();
        }
        return result;
    };
    GodweaponItemMixView.prototype.changeState = function () {
        if (this.currentState == this.FUSE_STATE) {
            this.currentState = this.COMPOUND_STATE;
        }
        else {
            this.currentState = this.FUSE_STATE;
        }
        this.updateView();
    };
    GodweaponItemMixView.prototype.prevPage = function () {
        this.dataSource.prev();
        this.setPageData();
    };
    GodweaponItemMixView.prototype.nextPage = function () {
        this.dataSource.next();
        this.setPageData();
    };
    GodweaponItemMixView.prototype.setPageData = function () {
        this.leftButton.visible = this.dataSource.havePre();
        this.rightButton.visible = this.dataSource.haveNext();
        this.list.dataProvider = new ArrayCollection(this.dataSource.pageData);
    };
    GodweaponItemMixView.prototype.clearView = function () {
        for (var i = 1; i < 4; i++) {
            this["mixData" + i] = null;
            this.updateMixItem(i);
        }
        this.updateTargetItem();
    };
    GodweaponItemMixView.prototype.updateView = function () {
        var data;
        var labelDesc;
        var isCanOperate;
        this.clearView();
        if (this.currentState == this.FUSE_STATE) {
            data = GodweaponItemModel.ins().getFuseItemList();
            labelDesc = "圣物合成";
            isCanOperate = GodweaponItemModel.ins().isCanCompound();
            this.startTween();
        }
        else {
            data = GodweaponItemModel.ins().getCompoundItemList();
            labelDesc = "圣物融合";
            isCanOperate = GodweaponItemModel.ins().isCanFuse();
            this.cleanTween();
        }
        if (isCanOperate) {
            this.addLabelEffect();
        }
        else {
            this.removeLabelEffect();
        }
        this.turn.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + labelDesc + "</u></a>");
        this.dataList = GodweaponItemModel.ins().toList(data);
        this.noItemDesc.visible = (this.dataList.length == 0);
        this.dataSource = new PageArray(this.dataList, this.PAGE_SIZE);
        this.setPageData();
        this.updateShengWu();
    };
    GodweaponItemMixView.prototype.addLabelEffect = function () {
        var _this = this;
        TimerManager.ins().doNext(function () {
            DisplayUtils.removeFromParent(_this.labelEffect);
            _this.labelEffect.x = _this.turn.x + 37;
            _this.labelEffect.y = _this.turn.y + 11;
            if (_this.labelEffect.parent == null) {
                _this.turn.parent.addChild(_this.labelEffect);
            }
            _this.labelEffect.playFile(RES_DIR_EFF + "chargeff1", -1);
        }, this);
    };
    GodweaponItemMixView.prototype.removeLabelEffect = function () {
        this.labelEffect.stop();
        DisplayUtils.removeFromParent(this.labelEffect);
    };
    GodweaponItemMixView.prototype.onTouch = function (e) {
        switch (e.currentTarget) {
            case this.mixMaterial:
                if (this.isMaterial) {
                    this.isMaterial = false;
                    this.addShengWu();
                }
                else {
                    var itemData = UserBag.ins().getBagItemById(this.MaterialItemId);
                    if (itemData) {
                        this.isMaterial = true;
                        this.addShengWu();
                    }
                    else {
                        this.isMaterial = false;
                        UserWarn.ins().setBuyGoodsWarn(this.MaterialItemId);
                    }
                }
                break;
        }
    };
    GodweaponItemMixView.prototype.updateShengWu = function () {
        this.descTxt.text = this.isMaterial ? "100%成功率" : "点击添加";
        if (this.isMaterial) {
            this.setLight(this.mixMaterialImg);
            this.setLight(this.mixlabel);
        }
        else {
            this.setGray(this.mixMaterialImg);
            this.setGray(this.mixlabel);
        }
    };
    GodweaponItemMixView.prototype.addShengWu = function () {
        this.updateShengWu();
        if (this.isMaterial) {
            this.cleanTween();
        }
        else {
            this.startTween();
        }
    };
    GodweaponItemMixView.prototype.startTween = function () {
        if (!this.isMaterial) {
            this.cleanTween();
            this.descTxt.alpha = 0;
            this.playTween();
        }
    };
    GodweaponItemMixView.prototype.playTween = function () {
        if (this.tw)
            return;
        this.tw = egret.Tween.get(this.descTxt, { "loop": true });
        var alpha = this.descTxt.alpha ? 0 : 1;
        this.tw.to({ "alpha": alpha }, 600).to({ "alpha": (1 - alpha) }, 600);
    };
    GodweaponItemMixView.prototype.cleanTween = function () {
        this.descTxt.alpha = 1;
        if (this.tw)
            egret.Tween.removeTweens(this.descTxt);
        this.tw = null;
    };
    GodweaponItemMixView.prototype.setGray = function (pic) {
        var colorMatrix = [0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0];
        pic.filters = [new egret.ColorMatrixFilter(colorMatrix)];
        this.materialTxt.visible = this.materialTxtImg.visible = true;
    };
    GodweaponItemMixView.prototype.setLight = function (pic) {
        pic.filters = [];
        this.materialTxt.visible = this.materialTxtImg.visible = false;
    };
    return GodweaponItemMixView;
}(BaseView));
__reflect(GodweaponItemMixView.prototype, "GodweaponItemMixView");
//# sourceMappingURL=GodWeaponItemMixView.js.map