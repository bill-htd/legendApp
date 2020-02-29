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
var TreasureChuanshiPanel = (function (_super) {
    __extends(TreasureChuanshiPanel, _super);
    function TreasureChuanshiPanel() {
        var _this = _super.call(this) || this;
        _this.addBoxEvent = false;
        _this.huntType = 0;
        _this.name = "传世";
        return _this;
    }
    TreasureChuanshiPanel.prototype.childrenCreated = function () {
        this.init();
    };
    TreasureChuanshiPanel.prototype.init = function () {
        var len = GlobalConfig.HeirloomTreasureConfig.boxes.length;
        var gift;
        for (var i = 0; i < len; i++) {
            gift = this["gift" + i];
            gift.data = GlobalConfig.HeirloomTreasureConfig.boxes[i];
        }
        this.eff = new MovieClip;
        this.eff.x = 59;
        this.eff.y = 23;
        this.eff.scaleX = 0.8;
        this.eff.scaleY = 0.8;
        this.eff.touchEnabled = false;
        this.list.itemRenderer = HuntListRenderer;
        this.zb1.text = GlobalConfig.HeirloomTreasureConfig.huntOnce + "";
        this.zb10.text = GlobalConfig.HeirloomTreasureConfig.huntTenth + "";
    };
    TreasureChuanshiPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.buy1, this.onBuy);
        this.addTouchEvent(this.buy10, this.onBuy);
        this.addTouchEvent(this.outBag, this.onBuy);
        this.observe(Heirloom.ins().postHuntRecord, this.listRefush);
        this.observe(UserBag.ins().postItemAdd, this.setRedStatu);
        this.observe(Heirloom.ins().postHuntBoxInfo, this.updateBox);
        this.observe(Heirloom.ins().postHuntResult, this.updateMaterial);
        this.listRefush();
        Heirloom.ins().sendHuntRecord();
        this.updateBox();
        this.addBoxEvent = true;
        this.updateMaterial();
        this.setRedStatu();
        var leftDate = DateUtils.calcWeekFirstDay();
        this.endedTime = leftDate.getTime() / 1000;
        TimerManager.ins().remove(this.timeClock, this);
        TimerManager.ins().doTimer(1000, 0, this.timeClock, this);
    };
    TreasureChuanshiPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.buy1, this.onBuy);
        this.removeTouchEvent(this.buy10, this.onBuy);
        this.removeTouchEvent(this.outBag, this.onBuy);
        this.removeObserve();
        DisplayUtils.removeFromParent(this.eff);
        TimerManager.ins().remove(this.timeClock, this);
        this.addBoxEvent = false;
    };
    TreasureChuanshiPanel.prototype.timeClock = function () {
        this.endedTime -= 1;
        if (this.endedTime <= 0) {
            var leftDate = DateUtils.calcWeekFirstDay();
            this.endedTime = leftDate.getTime() / 1000;
        }
        this.leftTimeTxt.text = DateUtils.getFormatBySecond(this.endedTime, DateUtils.TIME_FORMAT_5, 4);
    };
    TreasureChuanshiPanel.prototype.listRefush = function () {
        this.list.dataProvider = new eui.ArrayCollection(Heirloom.ins().huntRecords);
    };
    TreasureChuanshiPanel.prototype.onBuy = function (e) {
        switch (e.target) {
            case this.buy1:
                this.buyHunt(0);
                break;
            case this.buy10:
                this.buyHunt(1);
                break;
            case this.outBag:
                ViewManager.ins().open(TreasureStorePanel, DepotType.Heirloom);
                break;
            default:
                break;
        }
    };
    TreasureChuanshiPanel.prototype.buyHunt = function (type) {
        if (type == 0 && Heirloom.ins().huntFreeTimes > 0) {
            Heirloom.ins().sendHunt(type);
            return;
        }
        this.huntType = type;
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, GlobalConfig.HeirloomTreasureConfig.huntItem);
        if (item && item.count) {
            Heirloom.ins().sendHunt(type);
        }
        else {
            var huntOnce = type == 0 ? GlobalConfig.HeirloomTreasureConfig.huntOnce : GlobalConfig.HeirloomTreasureConfig.huntTenth;
            HuntWarnBuyWin.showBuyWarn("TreasureChuanshiPanel-HuntResultWin" + type, this.huntWarnFun.bind(this), "\u662F\u5426\u6D88\u8017" + huntOnce + "\u5143\u5B9D\u8D2D\u4E70" + GlobalConfig.ItemConfig[GlobalConfig.HeirloomTreasureConfig.huntItem].name + "*" + (type ? 10 : 1));
        }
    };
    TreasureChuanshiPanel.prototype.huntWarnFun = function () {
        var huntOnce = this.huntType == 0 ? GlobalConfig.HeirloomTreasureConfig.huntOnce : GlobalConfig.HeirloomTreasureConfig.huntTenth;
        if (Actor.yb >= huntOnce) {
            Heirloom.ins().sendHunt(this.huntType);
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
        }
    };
    TreasureChuanshiPanel.prototype.setRedStatu = function () {
        var boo = Boolean(UserBag.ins().getHuntGoods(2).length);
        if (boo) {
            this.outBag.parent.addChildAt(this.eff, this.getChildIndex(this.outBag));
            this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
        }
        else {
            DisplayUtils.removeFromParent(this.eff);
        }
        this.redPoint2.visible = boo;
    };
    TreasureChuanshiPanel.prototype.updateBox = function () {
        var lenBox = Heirloom.ins().huntBoxInfo.length;
        var state;
        var config;
        var i = 0;
        for (var k in GlobalConfig.HeirloomTreasureRewardConfig) {
            config = GlobalConfig.HeirloomTreasureRewardConfig[k];
            this["time" + i].text = config.needTime + "次";
            this["time" + i].visible = true;
            this["done" + i].visible = false;
            this["boxPoint" + i].visible = false;
            this["bar" + i].value = 0;
            this["box" + i].source = "200116_0_png";
            this["box" + i].name = "box" + (i + 1);
            if (!this.addBoxEvent)
                this.addTouchEvent(this["box" + i], this.onGetAward);
            if (i < lenBox) {
                state = Heirloom.ins().huntBoxInfo[i];
                if (state == Heirloom.CANGET) {
                    this["box" + i].source = "200116_png";
                    this["bar" + i].value = 100;
                    this["boxPoint" + i].visible = true;
                }
                else if (state == Heirloom.ISNGET) {
                    this["time" + i].visible = false;
                    this["done" + i].visible = true;
                    this["bar" + i].value = 100;
                }
            }
            i++;
        }
        this.hopeValue0.text = Heirloom.ins().huntHope + "";
        this.times.text = Heirloom.ins().huntTimes + "";
        this.maskImage();
        this.redPoint3.visible = Heirloom.ins().huntFreeTimes > 0;
        this.buy1.label = Heirloom.ins().huntFreeTimes > 0 ? "免费寻宝" : "寻宝一次";
    };
    TreasureChuanshiPanel.prototype.maskImage = function () {
        var curPross = Heirloom.ins().huntHope;
        var maxPross = GlobalConfig.HeirloomTreasureConfig.maxBlissVal;
        var percent = Math.floor(0.01 * Math.pow(curPross, 0.74) * maxPross) / maxPross;
        percent = percent < 1 ? percent : 1;
        if (percent >= 1) {
            if (this.maxHopeValue0.mask)
                this.maxHopeValue0.mask = null;
            if (this.maskShape) {
                this.maskShape.graphics.clear();
                this.maskShape = null;
            }
            return;
        }
        if (!this.maxHopeValue0.mask) {
            this.maskShape = new egret.Shape();
            this.maskShape.graphics.beginFill(0xffff00);
            this.maskShape.graphics.drawRect(this.maxHopeValue0.x, this.maxHopeValue0.y, this.maxHopeValue0.width, this.maxHopeValue0.height);
            this.maxHopeValue0.parent.addChild(this.maskShape);
            this.maxHopeValue0.mask = this.maskShape;
        }
        this.maskShape.y = this.maxHopeValue0.height * (1 - percent);
    };
    TreasureChuanshiPanel.prototype.onGetAward = function (e) {
        var index = e.target.name.slice(3, 4);
        var state = Heirloom.ins().huntBoxInfo[index - 1];
        if (state == Heirloom.CANGET)
            Heirloom.ins().sendHuntAward(index);
        else
            ViewManager.ins().open(HuntBoxsTips, index, 2);
    };
    TreasureChuanshiPanel.prototype.updateMaterial = function () {
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, GlobalConfig.HeirloomTreasureConfig.huntItem);
        var sum = item ? item.count : 0;
        this.num1.textFlow = TextFlowMaker.generateTextFlow("|C:" + (sum ? ColorUtil.GREEN_COLOR_N : ColorUtil.RED_COLOR_N) + "&T:" + sum + "|");
        this.num10.textFlow = TextFlowMaker.generateTextFlow("|C:" + (sum >= 10 ? ColorUtil.GREEN_COLOR_N : ColorUtil.RED_COLOR_N) + "&T:" + sum + "|");
    };
    return TreasureChuanshiPanel;
}(BaseView));
__reflect(TreasureChuanshiPanel.prototype, "TreasureChuanshiPanel");
//# sourceMappingURL=TreasureChuanshiPanel.js.map