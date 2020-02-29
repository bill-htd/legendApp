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
var HeirloomCom = (function (_super) {
    __extends(HeirloomCom, _super);
    function HeirloomCom() {
        var _this = _super.call(this) || this;
        _this.skinName = "heirloomCom";
        return _this;
    }
    HeirloomCom.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.curIndex = 0;
    };
    HeirloomCom.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(UserBag.ins().postItemDel, this.updateData);
        this.observe(UserBag.ins().postItemCountChange, this.updateData);
        this.observe(Heirloom.ins().postHeirloomInfo, this.updateData);
        this.addTouchEvent(this.rect, this.onClick);
        this.addTouchEvent(this.getItemTxt0, this.onClick);
        this.addTouchEvent(this.jihuo0, this.onClick);
        for (var i = 0; i < 8; i++) {
            this.addTouchEvent(this["item" + i], this.onTap);
        }
        this.initData();
    };
    HeirloomCom.prototype.initData = function () {
        this.model.visible = false;
        for (var i = 0; i < 8; i++) {
            var config_1 = HeirloomData.getInfoBySoltFirst(i);
            this["item" + i].data = { pos: i, info: config_1 };
            this["item" + i].cleanEff();
        }
        this["item0"].selectIcon.visible = true;
        var config = HeirloomData.getInfoBySoltFirst(0);
        this.setModel(config);
        this.setCost(config);
    };
    HeirloomCom.prototype.updateData = function () {
        var pos = this.curIndex;
        var config = HeirloomData.getInfoBySoltFirst(pos);
        this["item" + pos].data = { pos: pos, info: config };
        this["item" + pos].cleanEff();
        this.setCost(config);
    };
    HeirloomCom.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        for (var i = 0; i < 8; i++) {
            this.removeTouchEvent(this["pos" + i], this.onTap);
        }
        this.removeTouchEvent(this.rect, this.onClick);
        this.removeTouchEvent(this.getItemTxt0, this.onClick);
        this.removeTouchEvent(this.jihuo0, this.onClick);
        this.removeObserve();
        this.removeAni();
    };
    HeirloomCom.prototype.removeAni = function () {
        DisplayUtils.removeFromParent(this.modelAni);
        this.modelAni = null;
    };
    HeirloomCom.prototype.onClick = function (e) {
        var cfg;
        var itemData;
        var config;
        switch (e.currentTarget) {
            case this.rect:
                ViewManager.ins().close(this);
                break;
            case this.getItemTxt0:
                config = GlobalConfig.HeirloomEquipItemConfig[this.curIndex + 1];
                ViewManager.ins().open(ShopGoodsWarn).setData(config.expend.id);
                break;
            case this.jihuo0:
                config = GlobalConfig.HeirloomEquipItemConfig[this.curIndex + 1];
                if (this.curIndex + 1 == HeirloomSlot.wq || this.curIndex + 1 == HeirloomSlot.yf) {
                    itemData = UserBag.ins().getBagItemById(config.item);
                    if (itemData) {
                        UserTips.ins().showTips("|C:0x00ff00&T:已拥有该道具 请激活穿戴");
                        return;
                    }
                }
                itemData = UserBag.ins().getBagItemById(config.expend.id);
                var cost = itemData ? itemData.count : 0;
                if (cost >= config.expend.count)
                    Heirloom.ins().sendHeirloomAdd(this.curIndex + 1);
                else
                    UserTips.ins().showTips("材料不足");
                break;
        }
    };
    HeirloomCom.prototype.onTap = function (e) {
        for (var i = 0; i < 8; i++) {
            this["item" + i].selectIcon.visible = false;
            switch (e.currentTarget) {
                case this["item" + i]:
                    if (this.curIndex == i) {
                        this["item" + i].selectIcon.visible = true;
                        break;
                    }
                    this.curIndex = i;
                    this["item" + i].selectIcon.visible = true;
                    var config = HeirloomData.getInfoBySoltFirst(i);
                    this.setModel(config);
                    this.setCost(config);
                    break;
            }
        }
    };
    HeirloomCom.prototype.setModel = function (config) {
        var eff = "";
        if (!config) {
            return;
        }
        eff = config.model;
        if (!this.modelAni) {
            this.modelAni = new MovieClip;
            this.modelAni.playFile(RES_DIR_EFF + eff, -1);
            this.modelAni.x = this.model.x + this.model.width / 2;
            this.modelAni.y = this.model.y + this.model.height / 2;
            this.model.parent.addChildAt(this.modelAni, this.model.parent.getChildIndex(this.model));
            return;
        }
        this.modelAni.playFile(RES_DIR_EFF + eff, -1);
    };
    HeirloomCom.prototype.setCost = function (config) {
        if (!config) {
            return;
        }
        var cfg = GlobalConfig.HeirloomEquipItemConfig[config.slot];
        var expend = cfg.expend;
        var equipConfig = GlobalConfig.ItemConfig[expend.id];
        if (!equipConfig) {
            return;
        }
        this.icon0.source = equipConfig.icon.toString() + "_png";
        var itemData = UserBag.ins().getBagItemById(expend.id);
        var cost = itemData ? itemData.count : 0;
        var costItemLen = cost;
        var colorStr = "";
        if (costItemLen >= expend.count)
            colorStr = ColorUtil.GREEN_COLOR;
        else
            colorStr = ColorUtil.RED_COLOR;
        this.countLabel0.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + costItemLen + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + expend.count + "</font> ");
        var labelbtn = "|U&T:\u83B7\u53D6\u5B9D\u94BB";
        if (config.slot == HeirloomSlot.wq) {
            labelbtn = "|U&T:\u83B7\u53D6\u4F20\u4E16\u4E4B\u5203";
        }
        else if (config.slot == HeirloomSlot.yf) {
            labelbtn = "|U&T:\u83B7\u53D6\u4F20\u4E16\u795E\u7532";
        }
        this.getItemTxt0.textFlow = TextFlowMaker.generateTextFlow(labelbtn);
    };
    return HeirloomCom;
}(BaseEuiView));
__reflect(HeirloomCom.prototype, "HeirloomCom");
ViewManager.ins().reg(HeirloomCom, LayerManager.UI_Popup);
//# sourceMappingURL=HeirloomCom.js.map