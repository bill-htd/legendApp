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
var PropGainTipsWin = (function (_super) {
    __extends(PropGainTipsWin, _super);
    function PropGainTipsWin() {
        return _super.call(this) || this;
    }
    PropGainTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "PropGainTipsSkin";
        this.itemIcon.imgJob.visible = false;
        this.gainList.itemRenderer = GainGoodsNoSkinItem;
    };
    PropGainTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var type = param[0];
        var id = param[1];
        var num = param[2];
        this.gainList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchList, this);
        this.addTouchEndEvent(this, this.otherClose);
        this.setData(type, id, num);
    };
    PropGainTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.gainList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchList, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this);
    };
    PropGainTipsWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(this);
    };
    PropGainTipsWin.prototype.onTouchList = function (e) {
        var item = e.item;
        if (e.item == null) {
            return;
        }
        var openSuccess = ViewManager.ins().viewOpenCheck(item[1], item[2]);
        if (openSuccess) {
            var isShow = true;
            if (item[1] == "Recharge2Win") {
                var rdata = Recharge.ins().getRechargeData(0);
                if (!rdata || !rdata.num) {
                    isShow = false;
                    ViewManager.ins().open(Recharge1Win);
                }
            }
            if (isShow)
                GameGuider.guidance(item[1], item[2], item[3]);
            ViewManager.ins().close(ShopGoodsWarn);
            ViewManager.ins().close(BookUpWin);
            ViewManager.ins().close(WeaponPanel);
            ViewManager.ins().close(WeaponSoulBreakWin);
            if (item[1] != "HeirloomCom")
                ViewManager.ins().close(HeirloomCom);
            if (item[1] == "LadderWin")
                ViewManager.ins().close(ForgeWin);
            if (item[1] == "PlayFunView") {
                ViewManager.ins().close(ShopWin);
            }
        }
    };
    PropGainTipsWin.prototype.setData = function (type, id, num) {
        var numStr = "";
        if (num == undefined) {
            var data = UserBag.ins().getBagGoodsByTypeAndId(type, id);
            numStr = data ? (data.count + "") : "0";
        }
        else
            numStr = num + "";
        var config = GlobalConfig.ItemConfig[id];
        this.nameLabel.text = config.name;
        this.nameLabel.textColor = ItemConfig.getQualityColor(config);
        this.itemIcon.setData(config);
        this.lv.text = (config.level || 1) + "级";
        this.num.text = numStr;
        this.description0.textFlow = TextFlowMaker.generateTextFlow(config.desc);
        if (ItemConfig.getType(config) == 2) {
            var sID = MiJiSkillConfig.getSkillIDByItem(config.id);
            this.power.text = "评分：" + GlobalConfig.MiJiSkillConfig[sID].power;
        }
        else
            this.power.text = "";
        var gainConfig = GlobalConfig.GainItemConfig[id];
        if (gainConfig) {
            this.gainList.dataProvider = new eui.ArrayCollection(gainConfig.gainWay);
        }
        else {
            this.gainList.dataProvider = new eui.ArrayCollection([]);
        }
    };
    return PropGainTipsWin;
}(BaseEuiView));
__reflect(PropGainTipsWin.prototype, "PropGainTipsWin");
ViewManager.ins().reg(PropGainTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=PropGainTipsWin.js.map