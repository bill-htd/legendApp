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
var HunguWin = (function (_super) {
    __extends(HunguWin, _super);
    function HunguWin() {
        var _this = _super.call(this) || this;
        _this.wireEffs = [];
        return _this;
    }
    HunguWin.prototype.childrenCreated = function () {
    };
    HunguWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.cleanWireEff();
        for (var i = 0; i < GlobalConfig.HunGuConf.equipCount; i++) {
            this.cleanEff(i);
        }
    };
    HunguWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.getItemTxt0, this.onTap);
        this.addTouchEvent(this.executeBtn, this.onTap);
        this.addTouchEvent(this.executeBtn0, this.onTap);
        this.addTouchEvent(this.xiangxishuxing, this.onTap);
        this.addTouchEvent(this.fenjie, this.onTap);
        for (var i = 0; i < GlobalConfig.HunGuConf.equipCount; i++) {
            this.addTouchEvent(this["equip" + i], this.onSelect);
        }
        this.observe(HunguRedPoint.ins().postRoleRedPoint, this.updateUI);
        this.observe(Hungu.ins().postNothing2Wear, this.HunguItemsResult);
        this.observe(Hungu.ins().postWear2Noting, this.HunguItemsResult);
        this.roleId = param[0];
        this.pos = param[1];
        this.initEff();
        this.updateUI();
    };
    HunguWin.prototype.initEff = function () {
        this.posXian0 = [this.HGliangxianzhi0, this.HGliangxianxie0];
        this.posXian1 = [this.HGliangxianzhi1];
        this.posXian2 = [this.HGliangxianzhi2, this.HGliangxianxie2];
        this.posXian3 = [this.HGliangxianzhi3, this.HGliangxianxie3];
        this.posXian4 = [this.HGliangxianzhi4, this.HGliangxianxie4];
        this.posXian5 = [this.HGliangxianzhi5, this.HGliangxianxie5];
        this.posXian6 = [this.HGliangxianzhi6, this.HGliangxianxie6];
        this.posXian7 = [this.HGliangxianzhi7, this.HGliangxianxie7];
        this.effectPos = [this.effectPos0, this.effectPos1, this.effectPos2, this.effectPos3, this.effectPos4, this.effectPos5, this.effectPos6, this.effectPos7];
        this.liangdian = [this.liangdian0, this.liangdian1, this.liangdian2, this.liangdian3, this.liangdian4, this.liangdian5, this.liangdian6, this.liangdian7];
        var mc = new MovieClip();
        mc.playFile(RES_DIR_EFF + "hguieffect1", -1);
        this.effect1quanshen.addChild(mc);
        this.updateEff();
    };
    HunguWin.prototype.updateEff = function () {
        var hunguData = Hungu.ins().hunguData[this.roleId];
        if (!hunguData) {
            return;
        }
        var isSuccess = true;
        for (var i = 0; i < 8; i++) {
            if (hunguData.items[i].itemId) {
                for (var j in this["posXian" + i]) {
                    this["posXian" + i][j].visible = true;
                }
                this.liangdian[i].visible = true;
            }
            else {
                isSuccess = false;
            }
        }
        var suitEffects = [null, this.effect2toubu, this.effect3xia];
        for (var s in GlobalConfig.HunGuConf.suit) {
            var suitId = +s;
            if (!suitId)
                continue;
            if (suitEffects[suitId]) {
                var suit = Hungu.ins().getSuitData(this.roleId);
                for (var i in suit[suitId]) {
                    if (suit[suitId][i].count.length < (+i))
                        continue;
                    var stage = suit[suitId][i].stage;
                    var config = GlobalConfig.HunGuSuit[suitId][i][stage];
                    if (config.effectId) {
                        var mc = void 0;
                        if (!suitEffects[suitId].numElements) {
                            mc = new MovieClip();
                            suitEffects[suitId].addChild(mc);
                        }
                        else {
                            mc = suitEffects[suitId].getChildAt(0);
                        }
                        mc.playFile(RES_DIR_EFF + config.effectId, -1);
                    }
                }
            }
        }
    };
    HunguWin.prototype.onSelect = function (e) {
        for (var i = 0; i < GlobalConfig.HunGuConf.equipCount; i++) {
            if (this["equip" + i]) {
                this["equip" + i].select.visible = false;
                if (e.currentTarget == this["equip" + i]) {
                    this.pos = i;
                    this["equip" + i].select.visible = true;
                    var hunguData = Hungu.ins().hunguData[this.roleId];
                    if (!hunguData || !hunguData.items[i].itemId) {
                        var itemData = Hungu.ins().getHunguItemsList(i);
                        if (itemData.length) {
                            Hungu.ins().sendHunguItems(this.roleId, i, itemData[0].configID);
                        }
                        else {
                            UserTips.ins().showTips("\u672A\u62E5\u6709\u5F53\u524D\u90E8\u4F4D\u9B42\u9AA8");
                        }
                    }
                    else {
                        ViewManager.ins().open(HunguTipsWin, true, this.roleId, hunguData.items[i].itemId);
                    }
                }
            }
        }
    };
    HunguWin.prototype.updateUI = function () {
        var ins = Hungu.ins();
        var power = ins.getResonancePower(this.roleId);
        var suit = ins.getSuitData(this.roleId);
        for (var i = 0; i < GlobalConfig.HunGuConf.equipCount; i++) {
            this.updateItem(i);
            power += ins.getHunguPosPower(this.roleId, i, suit, true);
            this.powerPanel0.setPower(power);
        }
        this.getItemTxt0.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + this.getItemTxt0.text);
    };
    HunguWin.prototype.updateItem = function (index) {
        if (index === void 0) { index = 0; }
        var equipItem = this["equip" + index];
        if (!equipItem)
            return;
        var ins = Hungu.ins();
        var itemIcon = equipItem.itemIcon;
        itemIcon.imgJob.visible = false;
        equipItem.level.visible = false;
        itemIcon.imgIcon.source = "hungu" + index;
        equipItem.select.visible = (this.pos == index) ? true : false;
        itemIcon.imgBg.source = index <= 1 ? "wupingkuangNB" : "quality0";
        var hunguData = ins.hunguData[this.roleId];
        if (hunguData && hunguData.items[index].itemId) {
            var itemId = hunguData.items[index].itemId;
            var config = GlobalConfig.ItemConfig[itemId];
            itemIcon.imgIcon.source = config.icon + "_png";
        }
        else {
            for (var j in this["posXian" + index]) {
                this["posXian" + index][j].visible = false;
            }
        }
        equipItem["redPoint"].visible = this.getRedPoint(index);
    };
    HunguWin.prototype.getRedPoint = function (pos) {
        return HunguRedPoint.ins().HunguItemRedPoint(this.roleId, pos);
    };
    HunguWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.getItemTxt0:
                UserWarn.ins().setBuyGoodsWarn(GlobalConfig.HunGuConf.gainItemId);
                break;
            case this.executeBtn:
                ViewManager.ins().open(HunguGroupWin, this.roleId, 1);
                break;
            case this.executeBtn0:
                ViewManager.ins().open(HunguGroupWin, this.roleId, 2);
                break;
            case this.xiangxishuxing:
                ViewManager.ins().open(HunguAttrWin, this.roleId);
                break;
            case this.fenjie:
                ViewManager.ins().open(SmeltItemTotalWin, this.getSmeltList());
                break;
        }
    };
    HunguWin.prototype.getSmeltList = function () {
        var list = [];
        var canFenjieItem = GlobalConfig.HunGuConf.canFenjieItem;
        for (var i in canFenjieItem) {
            var itemData = UserBag.ins().getBagItemById(canFenjieItem[i]);
            if (itemData) {
                list.push(itemData);
            }
        }
        return list;
    };
    HunguWin.prototype.HunguItemsResult = function (arr) {
        var control = arr[0];
        var pos = arr[1];
        if (control)
            this.playEff(pos);
        else
            this.cleanEff(pos);
    };
    HunguWin.prototype.cleanEff = function (ipos) {
        if (ipos === void 0) { ipos = 0; }
        for (var i in this["posXian" + ipos]) {
            this["posXian" + ipos][i].visible = false;
        }
        this.liangdian[ipos].visible = false;
        var suitId = 0;
        for (var i in GlobalConfig.HunGuConf.suit) {
            if (GlobalConfig.HunGuConf.suit[i].indexOf(ipos) != -1) {
                suitId = (+i);
                break;
            }
        }
        var suitEffects = [null, this.effect2toubu, this.effect3xia];
        if (suitEffects[suitId]) {
            suitEffects[suitId].removeChildren();
        }
    };
    HunguWin.prototype.playEff = function (ipos) {
        if (ipos === void 0) { ipos = 0; }
        var playTime = 1000;
        var posTime = [];
        var tw = 0;
        for (var i in this["posXian" + ipos]) {
            tw += this["posXian" + ipos][i].width;
            this["posXian" + ipos][i].scrollRect = new egret.Rectangle(0, 0, 0, this["posXian" + ipos][i].height);
            this["posXian" + ipos][i].visible = true;
        }
        var ts = 0;
        for (var i in this["posXian" + ipos]) {
            if (Number(i) == this["posXian" + ipos].length - 1) {
                posTime[i] = playTime - ts;
            }
            else {
                posTime[i] = this["posXian" + ipos][i].width / tw * playTime;
                ts += posTime[i];
            }
        }
        this.playWireEff(this["posXian" + ipos], posTime, 0, ipos);
        var suitEffects = [null, this.effect2toubu, this.effect3xia];
        var suitId = 0;
        for (var i in GlobalConfig.HunGuConf.suit) {
            if (GlobalConfig.HunGuConf.suit[i].indexOf(ipos) != -1) {
                suitId = (+i);
                break;
            }
        }
        if (suitEffects[suitId]) {
            var suit = Hungu.ins().getSuitData(this.roleId);
            for (var i in suit[suitId]) {
                if (suit[suitId][i].count.length < (+i))
                    continue;
                var stage = suit[suitId][i].stage;
                var config = GlobalConfig.HunGuSuit[suitId][i][stage];
                if (config.effectId) {
                    var mc = void 0;
                    if (!suitEffects[suitId].numElements) {
                        mc = new MovieClip();
                        suitEffects[suitId].addChild(mc);
                    }
                    else {
                        mc = suitEffects[suitId].getChildAt(0);
                    }
                    mc.playFile(RES_DIR_EFF + config.effectId, -1);
                }
            }
        }
    };
    HunguWin.prototype.playWireEff = function (posXian, posTime, playIndex, ipos) {
        var _this = this;
        if (playIndex === void 0) { playIndex = 0; }
        if (ipos === void 0) { ipos = 0; }
        if (!posXian[playIndex])
            return;
        var tw = egret.Tween.get(posXian[playIndex].scrollRect);
        tw.to({ "width": posXian[playIndex].width }, posTime[playIndex]).call(function () {
            egret.Tween.removeTweens(tw);
            posXian[playIndex].scrollRect.width = posXian[playIndex].width;
            playIndex++;
            if (playIndex >= posXian.length) {
                var mc = new MovieClip();
                mc.playFile(RES_DIR_EFF + "hguieffect0", 1);
                _this.effectPos[ipos].addChild(mc);
                _this.liangdian[ipos].visible = true;
            }
            else {
                _this.playWireEff(posXian, posTime, playIndex, ipos);
            }
        }, this);
        if (!this.wireEffs[ipos])
            this.wireEffs[ipos] = [];
        if (this.wireEffs[ipos][playIndex]) {
            egret.Tween.removeTweens(this.wireEffs[ipos][playIndex]);
        }
        this.wireEffs[ipos][playIndex] = tw;
    };
    HunguWin.prototype.cleanWireEff = function () {
        if (!this.wireEffs)
            return;
        for (var i = 0; i < this.wireEffs.length; i++) {
            if (!this.wireEffs[i])
                continue;
            for (var j in this.wireEffs[i]) {
                egret.Tween.removeTweens(this.wireEffs[i][j]);
            }
        }
    };
    return HunguWin;
}(BaseView));
__reflect(HunguWin.prototype, "HunguWin");
//# sourceMappingURL=HunguWin.js.map