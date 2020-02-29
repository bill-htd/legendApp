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
var TreasureHuntPanel = (function (_super) {
    __extends(TreasureHuntPanel, _super);
    function TreasureHuntPanel() {
        var _this = _super.call(this) || this;
        _this.huntType = 0;
        _this.name = "装备";
        return _this;
    }
    TreasureHuntPanel.prototype.childrenCreated = function () {
        this.init();
    };
    TreasureHuntPanel.prototype.init = function () {
        this.updateDescEx();
        var config;
        if (Activity.ins().IsHefuXunBaoTimer()) {
            this.bdsz.visible = false;
            config = GlobalConfig.TreasureHuntPoolHefuConfig;
        }
        else {
            config = GlobalConfig.TreasureHuntPoolConfig;
        }
        this.id1 = config[1].reward[0].id;
        this.id2 = config[2].reward[0].id;
        this.list1.itemRenderer = ItemBase;
        this.list2.itemRenderer = ItemBase;
        this.list1.dataProvider = new eui.ArrayCollection(config[3].reward);
        this.list2.dataProvider = new eui.ArrayCollection(config[4].reward);
        var itemConfig = GlobalConfig.ItemConfig;
        this.mc1 = new MovieClip();
        this.mc1.x = this.icon1.x + 36;
        this.mc1.y = this.icon1.y + 38;
        this.mc1.scaleX = this.mc1.scaleY = 1.4;
        this.chuanqi.addChild(this.mc1);
        this.mc2 = new MovieClip();
        this.mc2.x = this.icon2.x + 36;
        this.mc2.y = this.icon2.y + 38;
        this.mc2.scaleX = this.mc2.scaleY = 1.4;
        this.chuanqi.addChild(this.mc2);
        this.list.itemRenderer = HuntListRenderer;
        this.listRefush([]);
        this.longZhuEff = new MovieClip;
        this.longZhuEff.x = 75;
        this.longZhuEff.y = 35;
        this.longZhuEff.touchEnabled = false;
        this.eff = new MovieClip;
        this.eff.x = 59;
        this.eff.y = 23;
        this.eff.scaleX = 0.8;
        this.eff.scaleY = 0.8;
        this.eff.touchEnabled = false;
        this.open();
    };
    TreasureHuntPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.longZhuEff.playFile(RES_DIR_EFF + "longzubaozangeff", -1);
        this.titleMcGroup.addChild(this.longZhuEff);
        this.addTouchEvent(this.buy1, this.onBuy);
        this.addTouchEvent(this.buy10, this.onBuy);
        this.addTouchEvent(this.outBag, this.onBuy);
        this.addTouchEvent(this.icon1, this.onClick);
        this.addTouchEvent(this.icon2, this.onClick);
        this.observe(Hunt.ins().postBestListInfo, this.listRefush);
        this.observe(UserBag.ins().postItemAdd, this.setRedStatu);
        this.observe(Hunt.ins().postHuntResult, this.callHuntResult);
        this.mc1.playFile(RES_DIR_EFF + "chuanqizbeff", -1);
        this.mc2.playFile(RES_DIR_EFF + "chuanqizbeff", -1);
        this.listRefush([]);
        Hunt.ins().sendHuntList();
        this.setRedStatu();
    };
    TreasureHuntPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.buy1, this.onBuy);
        this.removeTouchEvent(this.buy10, this.onBuy);
        this.removeTouchEvent(this.icon1, this.onClick);
        this.removeTouchEvent(this.icon2, this.onClick);
        this.removeTouchEvent(this.outBag, this.onBuy);
        DisplayUtils.removeFromParent(this.eff);
        this.removeObserve();
    };
    TreasureHuntPanel.prototype.setRedStatu = function () {
        var boo = Boolean(UserBag.ins().getHuntGoods(0).length);
        if (boo) {
            this.outBag.parent.addChildAt(this.eff, this.getChildIndex(this.outBag));
            this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
        }
        else {
            DisplayUtils.removeFromParent(this.eff);
        }
        this.redPoint2.visible = boo;
    };
    TreasureHuntPanel.prototype.listRefush = function (data) {
        this.list.dataProvider = new eui.ArrayCollection(data);
    };
    TreasureHuntPanel.prototype.onBuy = function (e) {
        switch (e.target) {
            case this.buy1:
                this.buyHunt(0);
                break;
            case this.buy10:
                this.buyHunt(1);
                break;
            case this.outBag:
                ViewManager.ins().open(TreasureStorePanel, DepotType.Equip);
                break;
            default:
                break;
        }
    };
    TreasureHuntPanel.prototype.buyHunt = function (type) {
        this.huntType = type;
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, GlobalConfig.TreasureHuntConfig.huntItem);
        if (item && item.count) {
            Hunt.ins().sendHunt(type);
        }
        else {
            var huntOnce = type == 0 ? GlobalConfig.TreasureHuntConfig.huntOnce : GlobalConfig.TreasureHuntConfig.huntTenth;
            HuntWarnBuyWin.showBuyWarn("TreasureHuntPanel-HuntResultWin" + type, this.huntWarnFun.bind(this), "\u662F\u5426\u6D88\u8017" + huntOnce + "\u5143\u5B9D\u8D2D\u4E70" + GlobalConfig.ItemConfig[GlobalConfig.TreasureHuntConfig.huntItem].name + "*" + (type ? 10 : 1));
        }
    };
    TreasureHuntPanel.prototype.huntWarnFun = function () {
        var huntOnce = this.huntType == 0 ? GlobalConfig.TreasureHuntConfig.huntOnce : GlobalConfig.TreasureHuntConfig.huntTenth;
        if (Actor.yb >= huntOnce) {
            Hunt.ins().sendHunt(this.huntType);
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
        }
    };
    TreasureHuntPanel.prototype.onClick = function (e) {
        switch (e.target) {
            case this.icon1:
                ViewManager.ins().open(EquipDetailedWin, 1, undefined, this.id1);
                break;
            case this.icon2:
                ViewManager.ins().open(EquipDetailedWin, 1, undefined, this.id2);
                break;
            default:
                break;
        }
    };
    TreasureHuntPanel.prototype.callHuntResult = function () {
        this.updateDescEx();
    };
    TreasureHuntPanel.prototype.updateDescEx = function () {
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, GlobalConfig.TreasureHuntConfig.huntItem);
        var sum = item ? item.count : 0;
        this.num1.textFlow = TextFlowMaker.generateTextFlow("<font color=" + (sum ? ColorUtil.GREEN_COLOR : ColorUtil.RED_COLOR) + ">" + sum + "</font> ");
        this.num10.textFlow = TextFlowMaker.generateTextFlow("<font color=" + (sum >= 10 ? ColorUtil.GREEN_COLOR : ColorUtil.RED_COLOR) + ">" + sum + "</font> ");
        this.zb1.text = GlobalConfig.TreasureHuntConfig.huntOnce + "";
        this.zb10.text = GlobalConfig.TreasureHuntConfig.huntTenth + "";
    };
    return TreasureHuntPanel;
}(BaseView));
__reflect(TreasureHuntPanel.prototype, "TreasureHuntPanel");
//# sourceMappingURL=TreasureHuntPanel.js.map