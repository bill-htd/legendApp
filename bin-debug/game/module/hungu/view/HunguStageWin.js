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
var HunguStageWin = (function (_super) {
    __extends(HunguStageWin, _super);
    function HunguStageWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "hunguStageSkin";
        return _this;
    }
    HunguStageWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    HunguStageWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.roleId = param[0];
        this.pos = param[1];
        this.getItemList.itemRenderer = ItemBase;
        this.addTouchEvent(this.lvUpBtn, this.onTouch);
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.addTouchEvent(this.closeBtn, this.onTouch);
        this.observe(Hungu.ins().postHunguItemUpgrade, this.updateUI);
        this.attrNow = [this.attr1Now0, this.attr2Now0, this.attr3Now0];
        this.arrtNext = [this.attr1Next0, this.attr2Next0, this.attr3Next0];
        this.updateUI();
    };
    HunguStageWin.prototype.updateUI = function () {
        var ins = Hungu.ins();
        var curId = ins.getCurHunguId(this.roleId, this.pos);
        var nextId = ins.getNextHunguId(this.roleId, this.pos);
        var curConfig = GlobalConfig.HunGuEquip[curId];
        var nextConfig = GlobalConfig.HunGuEquip[nextId];
        for (var i in this.attrNow) {
            if (curConfig && curConfig.attrs[i]) {
                this.attrNow[i].visible = true;
                this.attrNow[i].text = this.parserStr(curConfig.attrs[i]);
            }
            else {
                this.attrNow[i].visible = false;
            }
            if (nextConfig && nextConfig.attrs[i]) {
                this.arrtNext[i].visible = true;
                this.arrtNext[i].text = this.parserStr(nextConfig.attrs[i]);
            }
            else {
                this.arrtNext[i].visible = false;
            }
        }
        var curCount = curConfig && curConfig.hunyuNum ? curConfig.hunyuNum : 0;
        var nextCount = nextConfig && nextConfig.hunyuNum ? nextConfig.hunyuNum : 0;
        this.hunyuNow.text = "\u9B42\u7389\u6570\u91CF\uFF1A" + curCount;
        this.hunyuNext.text = "\u9B42\u7389\u6570\u91CF\uFF1A" + nextCount;
        this.redPoint.visible = ins.getUpgradeRedPoint(curConfig && curConfig.id ? curConfig.id : 0);
        if (curConfig && curConfig.addStageCost) {
            this.getItemList.dataProvider = new eui.ArrayCollection(curConfig.addStageCost);
            this.getItemList.validateNow();
            for (var i = 0; i < this.getItemList.numElements; i++) {
                var render = this.getItemList.getVirtualElementAt(i);
                var itemdata = this.getItemList.dataProvider.getItemAt(i);
                var color = ColorUtil.GREEN_COLOR_N;
                var itemData = UserBag.ins().getBagItemById(itemdata.id);
                var curCount_1 = itemData ? itemData.count : 0;
                if (curCount_1 < itemdata.count) {
                    color = ColorUtil.RED_COLOR_N;
                }
                render.setName("|C:" + color + "&T:" + curCount_1 + "/" + itemdata.count);
            }
        }
        if (curConfig) {
            this.nowItemIcon.data = curConfig.id;
            this.nowItemIcon.isShowJob(false);
            this.nowItemIcon.showNum(false);
            var power = 0;
            power += UserBag.getAttrPower(curConfig.attrs);
            var expower = curConfig.expower ? curConfig.expower : 0;
            power += expower;
            this.powerPanel0.setPower(power);
        }
        if (nextConfig) {
            this.nextItemIcon.data = nextConfig.id;
            this.nextItemIcon.isShowJob(false);
            this.nextItemIcon.showNum(false);
            var power = 0;
            power += UserBag.getAttrPower(nextConfig.attrs);
            var expower = nextConfig.expower ? nextConfig.expower : 0;
            power += expower;
            this.powerPanel1.setPower(power);
        }
    };
    HunguStageWin.prototype.parserStr = function (attr) {
        return AttributeData.getAttrStrByType(attr.type) + ":" + attr.value;
    };
    HunguStageWin.prototype.onTouch = function (e) {
        switch (e.currentTarget) {
            case this.lvUpBtn:
                if (this.redPoint.visible) {
                    Hungu.ins().sendHunguItemUpgrade(this.roleId, this.pos);
                }
                else {
                    UserTips.ins().showTips("\u6750\u6599\u4E0D\u8DB3");
                }
                break;
            case this.bgClose:
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    return HunguStageWin;
}(BaseEuiView));
__reflect(HunguStageWin.prototype, "HunguStageWin");
ViewManager.ins().reg(HunguStageWin, LayerManager.UI_Popup);
//# sourceMappingURL=HunguStageWin.js.map