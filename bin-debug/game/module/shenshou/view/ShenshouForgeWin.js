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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ShenshouForgeWin = (function (_super) {
    __extends(ShenshouForgeWin, _super);
    function ShenshouForgeWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "SsEquipForgeSkin";
        return _this;
    }
    ShenshouForgeWin.prototype.childrenCreated = function () {
        this.list.itemRenderer = ShenshouEquipItem1;
        this.listDt = new eui.ArrayCollection();
        this.list.dataProvider = this.listDt;
        this.nowList = [];
        this.exp.value = 0;
        this.exp.labelFunction = function (value, max) {
            return ShenshouSys.ins().exp + "/" + max;
        };
    };
    ShenshouForgeWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.shenshouId = args[0];
        this.pos = args[1];
        this.curItemDp = args[2];
        this.filterList = [];
        this.addTouchEvent(this.departBtn, this.onTouch);
        this.addTouchEvent(this.lvUpBtn, this.onTouch);
        this.addTouchEvent(this.closeBtn, this.onTouch);
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.addTouchEvent(this.list, this.onList);
        this.observe(ShenshouSys.ins().postUpEquip, this.onUpEquip);
        this.observe(ShenshouSys.ins().postUpdateExp, this.refUIData);
        this.observe(ShenshouSys.ins().postDepartEquip, this.onDecompose);
        this.observe(ShenshouRedpoint.ins().postRedPoint2, this.refRedpoint);
        this.refRedpoint();
        this.refUIData();
        this.refList();
    };
    ShenshouForgeWin.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        DisplayUtils.removeFromParent(this.forgetMC);
    };
    ShenshouForgeWin.prototype.onUpExp = function () {
        this.exp.value = ShenshouSys.ins().exp;
        this.exp.maximum = GlobalConfig.ShenShouEquip[this.curItemDp.id].exp;
        this.exp.value = ShenshouSys.ins().exp;
        this.exp.labelDisplay.text = ShenshouSys.ins().exp + "/" + this.exp.maximum;
    };
    ShenshouForgeWin.prototype.onUpEquip = function (equipId) {
        this.curItemDp = GlobalConfig.ItemConfig[equipId];
        this.refUIData();
        if (!this.forgetMC) {
            this.forgetMC = new MovieClip();
            this.forgetMC.x = 62;
            this.forgetMC.y = 62;
        }
        this.forgetMC.playFile(RES_DIR_EFF + "forgeSuccess", 1);
        this.iconGroup.addChild(this.forgetMC);
    };
    ShenshouForgeWin.prototype.refUIData = function () {
        var shenshouEquip = GlobalConfig.ShenShouEquip[this.curItemDp.id];
        this.curScore = UserBag.getAttrPower(shenshouEquip.attrs);
        if (shenshouEquip.expower)
            this.curScore += shenshouEquip.expower;
        this.powerPanel.setPower(this.curScore * SubRoles.ins().subRolesLen);
        this.equipName.text = this.curItemDp.name;
        this.equipName.textColor = ItemConfig.getQualityColor(this.curItemDp);
        this.itemIcon.data = this.curItemDp.id;
        this.itemIcon.hideName();
        var lv = ShenshouModel.ins().getEquipLv(this.curItemDp.id);
        this.attrPanel["lvNow"].text = "Lv." + lv;
        this.attrPanel["lvNext"].text = "Lv." + (lv + 1);
        this.maxExpImg.visible = false;
        this.maxExpTxt.visible = false;
        var nextEquip = GlobalConfig.ShenShouEquip[this.curItemDp.id + 1];
        if (!nextEquip) {
            this.lvUpBtn.enabled = false;
            this.attrPanel.currentState = "max";
            this.exp.visible = false;
            this.maxExpImg.visible = true;
            this.maxExpTxt.visible = true;
        }
        for (var i = 0; i < 3; i++) {
            if (shenshouEquip.attrs[i]) {
                this.attrPanel["attr" + (i + 1) + "Now"].visible = true;
                this.attrPanel["attr" + (i + 1) + "Next"].visible = nextEquip && nextEquip.attrs[i];
                this.attrPanel["attr" + (i + 1) + "Now"].text = AttributeData.getAttStrByType(shenshouEquip.attrs[i], 0, ":");
                if (nextEquip && nextEquip.attrs[i]) {
                    this.attrPanel["attr" + (i + 1) + "Next"].text = AttributeData.getAttStrByType(nextEquip.attrs[i], 0, ":");
                }
            }
            else {
                this.attrPanel["attr" + (i + 1) + "Next"].visible = false;
                this.attrPanel["attr" + (i + 1) + "Now"].visible = false;
            }
        }
        this.onUpExp();
    };
    ShenshouForgeWin.prototype.onDecompose = function () {
        var num = this.list.numChildren;
        for (var i = 0; i < num; i++) {
            var item = this.list.getChildAt(i);
            if (item) {
                item.playDepartMc();
            }
        }
        TimerManager.ins().doTimer(500, 1, this.refList, this);
    };
    ShenshouForgeWin.prototype.refList = function () {
        var items = UserBag.ins().getBagGoodsByType(ItemType.TYPE_23);
        this.nowList = [];
        var max = 13;
        while (--max >= 0) {
            if (items[max]) {
                if (items[max].count > 1) {
                    for (var i = 0; i < items[max].count; i++) {
                        if (this.filterList.indexOf(items[max].configID) > -1 || !this.checkCurEquip(items[max].configID))
                            continue;
                        this.nowList.push(items[max].configID);
                    }
                }
                else {
                    if (this.filterList.indexOf(items[max].configID) > -1 || !this.checkCurEquip(items[max].configID))
                        continue;
                    this.nowList.push(items[max].configID);
                }
            }
        }
        this.listDt.replaceAll(this.nowList);
    };
    ShenshouForgeWin.prototype.checkCurEquip = function (id) {
        var equipData = GlobalConfig.ShenShouEquip[id];
        var score = equipData ? UserBag.getAttrPower(equipData.attrs) : 0;
        return this.curScore >= score;
    };
    ShenshouForgeWin.prototype.onList = function (e) {
        if (e.target instanceof ShenshouEquipItem1 && this.filterList.indexOf(e.target.data) == -1) {
            this.filterList.push(e.target.data);
        }
        this.refList();
    };
    ShenshouForgeWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.closeBtn:
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.lvUpBtn:
                if (ShenshouSys.ins().exp < this.exp.maximum) {
                    UserTips.ins().showCenterTips("\u5F53\u524D\u517D\u795E\u7CBE\u9B44\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u5347\u7EA7\uFF01");
                    return;
                }
                ShenshouSys.ins().sendUpEquip(this.shenshouId, this.pos);
                break;
            case this.departBtn:
                if (!this.nowList.length) {
                    UserTips.ins().showCenterTips("\u5F53\u524D\u6CA1\u6709\u53EF\u5206\u89E3\u7684\u88C5\u5907");
                    return;
                }
                ShenshouSys.ins().sendDepartEquip(this.nowList);
                break;
        }
    };
    ShenshouForgeWin.prototype.refRedpoint = function () {
        this.rightRed.visible = ShenshouRedpoint.ins().redpointEquips2[this.shenshouId][this.pos];
    };
    __decorate([
        callLater
    ], ShenshouForgeWin.prototype, "onUpExp", null);
    __decorate([
        callLater
    ], ShenshouForgeWin.prototype, "refRedpoint", null);
    return ShenshouForgeWin;
}(BaseEuiView));
__reflect(ShenshouForgeWin.prototype, "ShenshouForgeWin");
ViewManager.ins().reg(ShenshouForgeWin, LayerManager.UI_Popup);
//# sourceMappingURL=ShenshouForgeWin.js.map