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
var RuneTipsWin = (function (_super) {
    __extends(RuneTipsWin, _super);
    function RuneTipsWin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RuneTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "RuneTipsSkin";
        this.cur_desc = "";
    };
    RuneTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var id = param[0];
        this.item_config_id = param[1];
        this.cur_desc = param[2];
        this.cur_desc2 = param[3];
        this.addTouchEndEvent(this, this.otherClose);
        this.addTouchEndEvent(this.userBtn, this.onUser);
        this.setData(this.item_config_id);
    };
    RuneTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this);
    };
    RuneTipsWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(this);
    };
    RuneTipsWin.prototype.onUser = function (evt) {
        var conf = Rune.ins().getRuneMergeByID(this.item_config_id);
        if (conf) {
            ViewManager.ins().open(BagWin, 3, MergeType.Rune, conf.mixId[1], Rune.ins().getMergeIndexByType(conf.mixId[1], conf.id));
        }
    };
    RuneTipsWin.prototype.setData = function (id) {
        var itemCfg = GlobalConfig.ItemConfig[id];
        if (!itemCfg) {
            return;
        }
        this.itemIcon.setData(itemCfg);
        var lvstr = "";
        var itemLv = itemCfg.id % 100;
        if (itemLv == 0) {
            if (!this.cur_desc2) {
                lvstr = " lv." + itemLv;
            }
        }
        else {
            if (ItemConfig.getSubType(itemCfg) != 0) {
                lvstr = " lv." + itemLv;
            }
        }
        this.nameLabel.textFlow = new egret.HtmlTextParser().parser("<font color = '" + ItemConfig.getQualityColor(itemCfg) + "'>" + itemCfg.name + lvstr + "</font>");
        this.userBtn.visible = false;
        if (Rune.ins().isOpen() && Rune.ins().getRuneMergeByID(itemCfg.id))
            this.userBtn.visible = true;
        var desc = "";
        var isRune = false;
        if (ItemConfig.getType(itemCfg) == 1) {
            this.randomAttr.text = itemCfg.desc;
        }
        else {
            var runeCfg = GlobalConfig.RuneBaseConfig[id];
            if (!runeCfg) {
                this.randomAttr.visible = true;
                this.randomAttr.text = itemCfg.desc;
                if (this.cur_desc2)
                    this.attrDes.text = "\u901A\u5173" + this.cur_desc2 + "\u89E3\u9501";
                else
                    this.attrDes.visible = false;
            }
            else {
                isRune = true;
                this.attrName.text = RuneConfigMgr.ins().getcfgAttrData(runeCfg);
                this.attrValue.text = RuneConfigMgr.ins().getcfgAttrData(runeCfg, false);
                this.attrName.x = this.runeAttr.width / 2 - (this.attrName.width + this.attrValue.width) / 2;
                this.attrValue.x = this.attrName.x + this.attrName.width;
                this.attrDes.text = this.cur_desc;
            }
        }
        this.attrName.visible = this.attrValue.visible = isRune;
        this.randomAttr.visible = !isRune;
    };
    return RuneTipsWin;
}(BaseEuiView));
__reflect(RuneTipsWin.prototype, "RuneTipsWin");
ViewManager.ins().reg(RuneTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=RuneTipsWin.js.map