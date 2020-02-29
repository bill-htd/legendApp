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
var WeaponSoulBreakWin = (function (_super) {
    __extends(WeaponSoulBreakWin, _super);
    function WeaponSoulBreakWin() {
        var _this = _super.call(this) || this;
        _this.calldesc = "";
        _this.skinName = 'weaponSoulBreak';
        return _this;
    }
    WeaponSoulBreakWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.btnjihuo, this.onClick);
        this.removeTouchEvent(this.btntupo, this.onClick);
        this.removeTouchEvent(this.btnlianhua, this.onClick);
        this.removeTouchEvent(this.bgClose, this.onClick);
        TimerManager.ins().remove(this.timeClock, this);
        this.removeObserve();
        DisplayUtils.removeFromParent(this.upLvEff);
        DisplayUtils.removeFromParent(this.finisheff);
        for (var i = 0; i < this.effs.length; i++)
            DisplayUtils.removeFromParent(this.effs[i]);
    };
    WeaponSoulBreakWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.btnjihuo, this.onClick);
        this.addTouchEvent(this.btntupo, this.onClick);
        this.addTouchEvent(this.btnlianhua, this.onClick);
        this.addTouchEvent(this.bgClose, this.onClick);
        this.observe(Weapons.ins().postWeaponsUpLevel, this.callback);
        this.tipsType = param[0];
        this.roleId = param[1];
        this.slot = param[2];
        this.effs = [];
        this.flys = [];
        this.update();
    };
    WeaponSoulBreakWin.prototype.callback = function () {
        UserTips.ins().showTips(this.calldesc + "\u6210\u529F");
        if (this.calldesc == "激活") {
            this.star.visible = true;
            this.lock.visible = false;
            this.tipsType = WeaponSoulBreakWin.SHENGJI;
            this.callbackToUpdate();
        }
        else if (this.calldesc == "升级") {
            this.playUpLvEff();
        }
        else if (this.calldesc == "突破") {
            this.playflyEff();
        }
    };
    WeaponSoulBreakWin.prototype.callbackToUpdate = function () {
        var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
        var wsinfo = role.weapons.getSlotByInfo(this.slot);
        Assert(wsinfo, "WeaponSoulBreakWin slot:" + this.slot + ", roleId:" + this.roleId);
        if (wsinfo.assault)
            this.tipsType = WeaponSoulBreakWin.TUPO;
        else if (this.calldesc == "突破") {
            this.btntupo.touchEnabled = true;
            this.tipsType = WeaponSoulBreakWin.SHENGJI;
        }
        this.update();
    };
    WeaponSoulBreakWin.prototype.update = function () {
        var wspconfig = GlobalConfig.WeaponSoulPosConfig[this.slot];
        if (this.tipsType == WeaponSoulBreakWin.JIHUO) {
            this.title.text = "激活";
            this.star.visible = false;
            this.lock.visible = true;
            this.jihuo.visible = true;
            this.tupo.visible = false;
            this.lianhua.visible = false;
            this.item1.imgIcon.source = "b_" + wspconfig[0].icon + "_png";
            this.item1.imgBg.visible = false;
            this.item1.imgJob.visible = false;
            this.name1.text = wspconfig[0].name;
            var itemData = UserBag.ins().getBagItemById(wspconfig[0].costItem);
            var costItemLen = itemData ? itemData.count : 0;
            this.material1.data = { costItem: wspconfig[0].costItem, costNum: wspconfig[0].costNum, sum: costItemLen };
            if (wspconfig[1].attr) {
                var attname = AttributeData.getAttrStrByType(wspconfig[1].attr[0].type);
                this.jhattr0.text = attname + "+" + wspconfig[1].attr[0].value;
                this.jhattr1.visible = true;
                if (wspconfig[1].attr[1]) {
                    attname = AttributeData.getAttrStrByType(wspconfig[1].attr[1].type);
                    this.jhattr1.text = attname + "+" + wspconfig[1].attr[1].value;
                }
                else
                    this.jhattr1.visible = false;
            }
            this.needItemId = wspconfig[0].costItem;
            this.curSum = costItemLen;
            this.maxSum = wspconfig[0].costNum;
        }
        else if (this.tipsType == WeaponSoulBreakWin.TUPO) {
            this.title.text = "突破";
            this.star.visible = true;
            this.lock.visible = false;
            var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
            var winfo = role.weapons.getSlotByInfo(this.slot);
            this.jihuo.visible = false;
            this.tupo.visible = true;
            this.lianhua.visible = false;
            this.item1.imgIcon.source = "b_" + wspconfig[0].icon + "_png";
            this.item1.imgBg.visible = false;
            this.item1.imgJob.visible = false;
            this.name3.text = wspconfig[0].name;
            this.tpattr1.text = winfo.showlv + "";
            this.tpattr2.text = winfo.assault + "";
            this.tpright0.x = this.tpattr1.x + this.tpattr1.width;
            this.tpattr2.x = this.tpright0.x + this.tpright0.width;
            if (winfo.attr) {
                this.tpattr0.text = AttributeData.getAttrStrByType(winfo.attr[0].type);
                this.tpattr3.text = winfo.attr[0].value + "";
                var nextconfig = GlobalConfig.WeaponSoulPosConfig[winfo.id][winfo.level + 1];
                this.tpattr4.text = nextconfig.attr[0].value + "";
                this.tpright1.x = this.tpattr3.x + this.tpattr3.width;
                this.tpattr4.x = this.tpright1.x + this.tpright1.width;
                if (winfo.attr[1] && nextconfig.attr[1]) {
                    this.g2.visible = true;
                    this.tpattr5.text = AttributeData.getAttrStrByType(winfo.attr[1].type);
                    this.tpattr6.text = winfo.attr[1].value + "";
                    this.tpattr7.text = nextconfig.attr[1].value + "";
                    this.tpright2.x = this.tpattr6.x + this.tpattr6.width;
                    this.tpattr7.x = this.tpright2.x + this.tpright2.width;
                }
                else {
                    this.g2.visible = false;
                }
            }
            var itemData = UserBag.ins().getBagItemById(winfo.costItem);
            var costItemLen = itemData ? itemData.count : 0;
            this.material.data = { costItem: winfo.costItem, costNum: winfo.costNum, sum: costItemLen };
            this.needItemId = winfo.costItem;
            this.curSum = costItemLen;
            this.maxSum = winfo.costNum;
        }
        else if (this.tipsType == WeaponSoulBreakWin.SHENGJI) {
            this.title.text = "炼化";
            this.star.visible = true;
            this.lock.visible = false;
            this.lianhua.visible = true;
            this.jihuo.visible = false;
            this.tupo.visible = false;
            var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
            var winfo = role.weapons.getSlotByInfo(this.slot);
            var wspconfig_1 = GlobalConfig.WeaponSoulPosConfig[winfo.id][0];
            var nextconfig = GlobalConfig.WeaponSoulPosConfig[winfo.id][winfo.level + 1];
            if (!nextconfig) {
                this.costgroup0.visible = false;
                this.btnlianhua.visible = this.costgroup0.visible;
                this.lhright1.visible = this.costgroup0.visible;
                this.lhright0.visible = this.costgroup0.visible;
                this.lhattr4.visible = this.costgroup0.visible;
                this.lhattr6.visible = this.costgroup0.visible;
                this.maxdesc0.visible = !this.costgroup0.visible;
                this.lhright2.visible = this.costgroup0.visible;
                this.lhattr8.visible = this.costgroup0.visible;
                if (winfo.attr) {
                    this.lhattr3.text = winfo.showlv + "";
                    this.lhattr1.text = AttributeData.getAttrStrByType(winfo.attr[0].type);
                    this.lhattr5.text = winfo.attr[0].value + "";
                    if (winfo.attr[1]) {
                        this["attr2"].visible = true;
                        this.lhattr2.text = AttributeData.getAttrStrByType(winfo.attr[1].type);
                        this.lhattr7.text = winfo.attr[1].value + "";
                    }
                    else {
                        this["attr2"].visible = false;
                    }
                }
                this.name2.text = wspconfig_1.name;
                this.item1.imgIcon.source = "b_" + wspconfig_1.icon + "_png";
                this.item1.imgBg.visible = false;
                this.item1.imgJob.visible = false;
                this.updateEff();
                this.addCheckEff();
                return;
            }
            this.item1.imgIcon.source = "b_" + wspconfig_1.icon + "_png";
            this.item1.imgBg.visible = false;
            this.item1.imgJob.visible = false;
            this.name2.text = wspconfig_1.name;
            if (winfo.attr) {
                this.lhattr3.text = winfo.showlv + "";
                this.lhattr4.text = nextconfig.showlv + "";
                this.lhright1.x = this.lhattr3.x + this.lhattr3.width + this.lhright1.width;
                this.lhattr4.x = this.lhright1.x;
                this.lhattr1.text = AttributeData.getAttrStrByType(winfo.attr[0].type);
                this.lhattr5.text = winfo.attr[0].value + "";
                this.lhattr6.text = nextconfig.attr[0].value + "";
                this.lhright0.x = this.lhattr5.x + this.lhattr5.width + this.lhright0.width;
                this.lhattr6.x = this.lhright0.x;
                if (winfo.attr[1] && nextconfig.attr[1]) {
                    this["attr2"].visible = true;
                    this.lhattr2.text = AttributeData.getAttrStrByType(winfo.attr[1].type);
                    this.lhattr7.text = winfo.attr[1].value + "";
                    this.lhattr8.text = nextconfig.attr[1].value + "";
                    this.lhright2.x = this.lhattr7.x + this.lhattr7.width + this.lhright2.width;
                    this.lhattr8.x = this.lhright2.x;
                }
                else {
                    this["attr2"].visible = false;
                }
                var itemData = UserBag.ins().getBagItemById(winfo.costItem);
                var costItemLen = itemData ? itemData.count : 0;
                var itemconfig = GlobalConfig.ItemConfig[winfo.costItem];
                this.micon0.source = itemconfig.icon + "_png";
                var colorStr = void 0;
                if (costItemLen >= winfo.costNum)
                    colorStr = ColorUtil.GREEN;
                else
                    colorStr = ColorUtil.RED;
                this.countLabel1.textFlow = TextFlowMaker.generateTextFlow1("|C:" + colorStr + "&T:" + costItemLen + "|/|C:0xD1C28F&T:" + winfo.costNum);
                this.needItemId = winfo.costItem;
                this.curSum = costItemLen;
                this.maxSum = winfo.costNum;
            }
        }
        this.updateEff();
        this.addCheckEff();
    };
    WeaponSoulBreakWin.prototype.updateEff = function () {
        if (this.star.visible) {
            var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
            var winfo = role.weapons.getSlotByInfo(this.slot);
            if (!winfo) {
                UserTips.ins().showTips("显示异常");
                return;
            }
            this.cirimg.visible = true;
            if (!winfo.level) {
                for (var i = 0; i < WeaponSoulBreakWin.maxCir; i++) {
                    this["s" + i].visible = false;
                }
                this.cirimg.visible = false;
                return;
            }
            if (this.maxdesc0.visible || this.tipsType == WeaponSoulBreakWin.TUPO) {
                for (var i = 0; i < WeaponSoulBreakWin.maxCir; i++) {
                    this["s" + i].visible = true;
                }
                DisplayUtils.drawCir(this._shap, (this.star.width >> 1), 360);
                return;
            }
            var lv = winfo.level % 10;
            for (var i = 0; i < WeaponSoulBreakWin.maxCir; i++) {
                if (!lv)
                    this["s" + i].visible = false;
                else
                    this["s" + i].visible = lv > i;
                if (!this._shap)
                    this._shap = new egret.Shape();
                if (!this._shap.parent) {
                    this.star.addChild(this._shap);
                    this.cirimg.mask = this._shap;
                    this._shap.x = this._shap.y = this.star.width >> 1;
                    this._shap.rotation = -90;
                }
                if (i > 0 && lv > 0) {
                    DisplayUtils.drawCir(this._shap, (this.star.width >> 1), (lv - 1) * 360 / WeaponSoulBreakWin.maxCir);
                }
                else
                    this._shap.graphics.clear();
            }
        }
    };
    WeaponSoulBreakWin.prototype.addCheckEff = function () {
        for (var i = 0; i < WeaponSoulBreakWin.maxCir; i++) {
            if (this["s" + i].visible) {
                if (!this.effs[i]) {
                    var mc = new MovieClip;
                    this.effs[i] = mc;
                }
                if (!this.effs[i].parent) {
                    this["star" + i].addChild(this.effs[i]);
                }
                this.effs[i].x = 21;
                this.effs[i].y = 21;
                this.effs[i].playFile(RES_DIR_EFF + "bally2", -1);
            }
            else {
                if (this.effs[i] && this.effs[i].parent) {
                    DisplayUtils.removeFromParent(this.effs[i]);
                }
            }
        }
    };
    WeaponSoulBreakWin.prototype.playUpLvEff = function () {
        if (!this.upLvEff)
            this.upLvEff = new MovieClip;
        if (!this.upLvEff.parent)
            this.star.addChild(this.upLvEff);
        this.upLvEff.x = 145;
        this.upLvEff.y = 140;
        var self = this;
        this.upLvEff.playFile(RES_DIR_EFF + "forgeSuccess", 1, function () {
            DisplayUtils.removeFromParent(self.upLvEff);
        });
        self.callbackToUpdate();
    };
    WeaponSoulBreakWin.prototype.playflyEff = function () {
        var self = this;
        var _loop_1 = function (i) {
            if (this_1.effs[i] && this_1.effs[i].parent) {
                this_1.flys[i] = true;
                var point = this_1.item1.localToGlobal();
                this_1['star' + i].globalToLocal(point.x + 38, point.y + 38, point);
                egret.Tween.get(this_1.effs[i]).to({ x: point.x, y: point.y }, 500).call(function () {
                    self.flys[i] = false;
                    egret.Tween.removeTweens(self.effs[i]);
                    DisplayUtils.removeFromParent(self.effs[i]);
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.effs.length; i++) {
            _loop_1(i);
        }
        TimerManager.ins().remove(this.timeClock, this);
        TimerManager.ins().doTimer(100, 0, this.timeClock, this);
    };
    WeaponSoulBreakWin.prototype.timeClock = function () {
        for (var i = 0; i < this.flys.length; i++) {
            if (this.flys[i])
                return;
        }
        TimerManager.ins().remove(this.timeClock, this);
        if (!this.finisheff)
            this.finisheff = new MovieClip;
        if (!this.finisheff.parent)
            this.star.addChild(this.finisheff);
        this.finisheff.x = 145;
        this.finisheff.y = 140;
        var self = this;
        this.finisheff.playFile(RES_DIR_EFF + "spirittupo", 1, function () {
            self.callbackToUpdate();
            DisplayUtils.removeFromParent(self.finisheff);
        });
    };
    WeaponSoulBreakWin.prototype.onClick = function (e) {
        switch (e.target) {
            case this.btnjihuo:
            case this.btntupo:
                if (e.target == this.btnjihuo)
                    this.calldesc = "激活";
                else {
                    this.calldesc = "突破";
                    this.btntupo.touchEnabled = false;
                }
                if (this.curSum < this.maxSum) {
                    UserTips.ins().showTips("材料不足");
                    UserWarn.ins().setBuyGoodsWarn(this.needItemId);
                    return;
                }
                Weapons.ins().sendWeaponsUpLevel(this.roleId, this.slot);
                SoundUtil.ins().playEffect(SoundUtil.FORGE);
                break;
            case this.btnlianhua:
                if (this.curSum < this.maxSum) {
                    UserTips.ins().showTips("材料不足");
                    UserWarn.ins().setBuyGoodsWarn(this.needItemId);
                    return;
                }
                this.calldesc = "升级";
                Weapons.ins().sendWeaponsUpLevel(this.roleId, this.slot);
                SoundUtil.ins().playEffect(SoundUtil.FORGE);
                break;
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    WeaponSoulBreakWin.TUPO = 1;
    WeaponSoulBreakWin.JIHUO = 2;
    WeaponSoulBreakWin.SHENGJI = 3;
    WeaponSoulBreakWin.maxCir = 9;
    return WeaponSoulBreakWin;
}(BaseEuiView));
__reflect(WeaponSoulBreakWin.prototype, "WeaponSoulBreakWin");
ViewManager.ins().reg(WeaponSoulBreakWin, LayerManager.UI_Popup);
//# sourceMappingURL=WeaponSoulBreakWin.js.map