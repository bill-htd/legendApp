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
var TreasureRunePanel = (function (_super) {
    __extends(TreasureRunePanel, _super);
    function TreasureRunePanel() {
        var _this = _super.call(this) || this;
        _this.huntType = 0;
        _this.name = "战纹";
        return _this;
    }
    TreasureRunePanel.prototype.childrenCreated = function () {
        this.init();
    };
    TreasureRunePanel.prototype.init = function () {
        this.updateDescEx();
        var config = GlobalConfig.FuwenTreasureLevelConfig;
        var lv = SkyLevelModel.ins().cruLevel;
        var useCfg = null;
        for (var str in config) {
            var cfg = config[str];
            if (lv >= cfg.level && lv <= cfg.levelend) {
                useCfg = cfg;
                break;
            }
        }
        this.list1.itemRenderer = ItemBase;
        this.list1.dataProvider = new eui.ArrayCollection(useCfg.showicon);
        this.eff = new MovieClip;
        this.eff.x = 59;
        this.eff.y = 23;
        this.eff.scaleX = 0.8;
        this.eff.scaleY = 0.8;
        this.eff.touchEnabled = false;
        this.open();
    };
    TreasureRunePanel.prototype.sortFunc = function (a, b) {
        var rune1 = GlobalConfig.ItemConfig[a.id];
        var rune2 = GlobalConfig.ItemConfig[b.id];
        var r1 = GlobalConfig.RuneNameConfig[ItemConfig.getSubType(rune1)];
        var r2 = GlobalConfig.RuneNameConfig[ItemConfig.getSubType(rune2)];
        if (r1.type < r2.type)
            return -1;
        else
            return 1;
    };
    TreasureRunePanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.buy1, this.onBuy);
        this.addTouchEvent(this.buy10, this.onBuy);
        this.addTouchEvent(this.outBag, this.onBuy);
        this.addTouchEvent(this.outBag0, this.onBuy);
        this.observe(Rune.ins().postHuntRuneInfo, this.callRuneResult);
        for (var i = 0; i < Rune.BoxSum; i++) {
            this.addTouchEvent(this["box" + i], this.onTab);
        }
        this.observe(UserBag.ins().postHuntStore, this.setRedStatu);
        this.observe(Rune.ins().postRuneBoxGift, this.callback);
        Hunt.ins().sendHuntList();
        this.setRedStatu();
        this.setBoxData();
        for (var i = 0; i < this.list1.numElements; i++) {
            var item = this.list1.getElementAt(i);
            if (item) {
                item.clearEffect();
                item.HideImgBg();
            }
        }
        var leftDate = DateUtils.calcWeekFirstDay();
        this.endedTime = leftDate.getTime() / 1000;
        TimerManager.ins().remove(this.timeClock, this);
        TimerManager.ins().doTimer(1000, 0, this.timeClock, this);
    };
    TreasureRunePanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.buy1, this.onBuy);
        this.removeTouchEvent(this.buy10, this.onBuy);
        this.removeTouchEvent(this.outBag, this.onBuy);
        DisplayUtils.removeFromParent(this.eff);
        for (var i = 0; i < Rune.BoxSum; i++) {
            this.removeTouchEvent(this["box" + i], this.onTab);
        }
        this.removeObserve();
        TimerManager.ins().remove(this.timeClock, this);
    };
    TreasureRunePanel.prototype.timeClock = function () {
        this.endedTime -= 1;
        if (this.endedTime <= 0) {
            var leftDate = DateUtils.calcWeekFirstDay();
            this.endedTime = leftDate.getTime() / 1000;
        }
        this.leftTime.text = "\u7D2F\u8BA1\u91CD\u7F6E\u5269\u4F59\u65F6\u95F4\uFF1A" + DateUtils.getFormatBySecond(this.endedTime, DateUtils.TIME_FORMAT_5, 4);
    };
    TreasureRunePanel.prototype.setRedStatu = function () {
        var boo = Boolean(UserBag.ins().getHuntGoods(1).length);
        if (boo) {
            this.outBag.parent.addChildAt(this.eff, this.getChildIndex(this.outBag));
            this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
        }
        else {
            DisplayUtils.removeFromParent(this.eff);
        }
        this.redPoint2.visible = boo;
        this.redPoint0.visible = RuneRedPointMgr.ins().checkCanExchange();
    };
    TreasureRunePanel.prototype.onBuy = function (e) {
        switch (e.target) {
            case this.buy1:
                this.buyHunt(0);
                break;
            case this.buy10:
                this.buyHunt(1);
                break;
            case this.outBag:
                ViewManager.ins().open(TreasureStorePanel, DepotType.Rune);
                break;
            case this.outBag0:
                ViewManager.ins().open(RuneExchangeShopWin);
                break;
            default:
                break;
        }
    };
    TreasureRunePanel.prototype.onTab = function (e) {
        for (var i = 0; i < Rune.BoxSum; i++) {
            if (e.target == this["box" + i]) {
                if (Rune.ins().boxs[i] == Rune.UNGET) {
                    ViewManager.ins().open(HuntBoxsTips, i + 1);
                    break;
                }
                else if (Rune.ins().boxs[i] == Rune.ISNGET) {
                    ViewManager.ins().open(HuntBoxsTips, i + 1);
                    break;
                }
                this.boxId = i + 1;
                Rune.ins().sendRuneBoxGift(i + 1);
                break;
            }
        }
    };
    TreasureRunePanel.prototype.buyHunt = function (type) {
        this.huntType = type;
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, GlobalConfig.FuwenTreasureConfig.huntItem);
        if (item && item.count) {
            Rune.ins().sendHuntRune(type);
        }
        else {
            var huntOnce = type == 0 ? GlobalConfig.FuwenTreasureConfig.huntOnce : GlobalConfig.FuwenTreasureConfig.huntTenth;
            HuntWarnBuyWin.showBuyWarn("TreasureRunePanel-HuntResultWin" + type, this.huntWarnFun.bind(this), "\u662F\u5426\u6D88\u8017" + huntOnce + "\u5143\u5B9D\u8D2D\u4E70" + GlobalConfig.ItemConfig[GlobalConfig.FuwenTreasureConfig.huntItem].name + "*" + (type ? 10 : 1));
        }
    };
    TreasureRunePanel.prototype.huntWarnFun = function () {
        var huntOnce = this.huntType == 0 ? GlobalConfig.FuwenTreasureConfig.huntOnce : GlobalConfig.FuwenTreasureConfig.huntTenth;
        if (Actor.yb >= huntOnce) {
            Rune.ins().sendHuntRune(this.huntType);
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
        }
    };
    TreasureRunePanel.prototype.callback = function () {
        if (this.boxId) {
            var cfg = GlobalConfig.FuwenTreasureRewardConfig[this.boxId];
            if (cfg)
                for (var i = 0; i < cfg.reward.length; i++) {
                    UserTips.ins().showTips("|C:0xff00ff&T:\u83B7\u5F97\u6218\u7EB9\u788E\u7247X" + cfg.reward[i].count);
                }
            this.boxId = 0;
        }
        this.setBoxData();
    };
    TreasureRunePanel.prototype.setBoxData = function () {
        this.times.text = Rune.ins().runeCount + "";
        for (var i = 0; i < Rune.BoxSum; i++) {
            var config = GlobalConfig.FuwenTreasureRewardConfig[i + 1];
            var count = config.needTime ? config.needTime : 0;
            switch (Rune.ins().boxs[i]) {
                case Rune.UNGET:
                    this["time" + i].text = count + "次";
                    this["time" + i].visible = true;
                    this["done" + i].visible = !this["time" + i].visible;
                    this["box" + i].source = "200116_0_png";
                    this["boxPoint" + i].visible = false;
                    break;
                case Rune.CANGET:
                    this["time" + i].text = count + "次";
                    this["time" + i].visible = false;
                    this["done" + i].visible = !this["time" + i].visible;
                    this["done" + i].text = "可领取";
                    this["box" + i].source = "200116_png";
                    this["boxPoint" + i].visible = true;
                    break;
                case Rune.ISNGET:
                    this["time" + i].text = count + "次";
                    this["time" + i].visible = false;
                    this["done" + i].visible = !this["time" + i].visible;
                    this["done" + i].text = "已领取";
                    this["box" + i].source = "200116_0_png";
                    this["boxPoint" + i].visible = false;
                    break;
            }
        }
    };
    TreasureRunePanel.prototype.callRuneResult = function () {
        this.updateDescEx();
    };
    TreasureRunePanel.prototype.updateDescEx = function () {
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, GlobalConfig.FuwenTreasureConfig.huntItem);
        var sum = item ? item.count : 0;
        this.num1.textFlow = TextFlowMaker.generateTextFlow("<font color=" + (sum ? ColorUtil.GREEN_COLOR : ColorUtil.RED_COLOR) + ">" + sum + "</font> ");
        this.num10.textFlow = TextFlowMaker.generateTextFlow("<font color=" + (sum >= 10 ? ColorUtil.GREEN_COLOR : ColorUtil.RED_COLOR) + ">" + sum + "</font> ");
        this.zw1.text = GlobalConfig.FuwenTreasureConfig.huntOnce + "";
        this.zw10.text = GlobalConfig.FuwenTreasureConfig.huntTenth + "";
        this.hopeValue.text = Rune.ins().hope + "";
        this.maskImage();
    };
    TreasureRunePanel.prototype.maskImage = function () {
        var curPross = Rune.ins().hope;
        var maxPross = GlobalConfig.FuwenTreasureConfig.maxBlissVal;
        var percent = Math.floor(0.0096 * Math.pow(curPross, 0.6719) * maxPross) / maxPross;
        percent = percent < 1 ? percent : 1;
        if (percent >= 1) {
            DisplayUtils.removeFromParent(this.masksp);
            this.masksp = null;
            return;
        }
        var imgHeight = 118;
        if (!this.masksp) {
            this.masksp = new egret.Sprite();
            var square = new egret.Shape();
            square.graphics.beginFill(0xffff00);
            square.graphics.drawRect(this.maxHopeValue.x, this.maxHopeValue.y, 90, imgHeight);
            square.graphics.endFill();
            this.masksp.addChild(square);
            this.maxHopeValue.parent.addChild(this.masksp);
            this.maxHopeValue.mask = this.masksp;
        }
        this.masksp.y = imgHeight * (1 - percent);
    };
    return TreasureRunePanel;
}(BaseView));
__reflect(TreasureRunePanel.prototype, "TreasureRunePanel");
//# sourceMappingURL=TreasureRunePanel.js.map