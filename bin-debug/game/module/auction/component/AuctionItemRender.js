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
var AuctionItemRender = (function (_super) {
    __extends(AuctionItemRender, _super);
    function AuctionItemRender() {
        var _this = _super.call(this) || this;
        _this.STATE_SHOW = 0;
        _this.STATE_AUCTION = 1;
        _this.STATE_END = 2;
        _this.state = 0;
        _this.leftTime = 0;
        return _this;
    }
    AuctionItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    AuctionItemRender.prototype.dataChanged = function () {
        var vo = this.data;
        var cfg = GlobalConfig.AuctionItem[vo.aID];
        if (!cfg)
            return;
        this.item.data = cfg.item;
        this.price = cfg.buy;
        this.price2 = cfg.bid + Math.floor(cfg.bid * vo.auctionTimes * GlobalConfig.AuctionConfig.priceIncrease / 10000);
        this.btn1.visible = cfg.buy > 0;
        this.zb0.text = this.price + "";
        this.jingjia.text = this.price2 + "";
        this.labelMy.visible = vo.owner > 0;
        this.labelMy.source = vo.owner ? (vo.owner == 1 ? "labelMy" : "labelGuild") : "";
        this.zb1.text = (cfg.bid + Math.floor(cfg.bid * (vo.auctionTimes > 0 ? vo.auctionTimes - 1 : 0) * GlobalConfig.AuctionConfig.priceIncrease / 10000)) + "";
        if (!this.hasEventListener(egret.TouchEvent.REMOVED_FROM_STAGE))
            this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRemove, this);
        if (!this.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.checkTime();
        if (this.openedWard)
            this.showWarn();
    };
    AuctionItemRender.prototype.showWarn = function () {
        WarnWin.show("\u662F\u5426\u82B1\u8D39|C:" + 0x20cb30 + "&T:" + (this.isYiKouJia ? this.price : this.price2) + "|\u5143\u5B9D" + (this.isYiKouJia ? "\u7ACB\u5373\u62CD\u4E0B\u5546\u54C1" : "\u53C2\u4E0E\u7ADE\u62CD"), this.onAuction.bind(this), this, this.onAuction2.bind(this), this);
    };
    AuctionItemRender.prototype.checkTime = function () {
        TimerManager.ins().removeAll(this);
        var vo = this.data;
        var endTime = DateUtils.formatMiniDateTime(vo.endTime);
        var serverTime = GameServer.serverTime;
        var putAwayTime = DateUtils.formatMiniDateTime(vo.putAwayTime);
        this.leftTime = 0;
        this.showTime.textColor = 0xFF0000;
        if (serverTime >= endTime) {
            this.state = this.STATE_END;
            this.showTime.text = "00:00:00";
            Auction.ins().deleteVo(vo);
            Auction.ins().postUpdate();
        }
        else if (Math.floor((serverTime - putAwayTime) / 1000) < (vo.type ? GlobalConfig.AuctionConfig.globalShowTime : GlobalConfig.AuctionConfig.guildShowTime)) {
            this.state = this.STATE_SHOW;
            this.showTime.textColor = 0xFFD93F;
            this.leftTime = (vo.type ? GlobalConfig.AuctionConfig.globalShowTime : GlobalConfig.AuctionConfig.guildShowTime) - Math.floor((serverTime - putAwayTime) / 1000);
        }
        else {
            this.state = this.STATE_AUCTION;
            this.showTime.textColor = 0x00FF00;
            this.leftTime = Math.floor((endTime - serverTime) / 1000);
        }
        if (this.leftTime) {
            this.repeat();
            TimerManager.ins().doTimer(1000, 0, this.repeat, this);
        }
        this.jingjiazhong.visible = vo.auctionTimes > 0;
        this.jingjiazhong.textFlow = TextFlowMaker.generateTextFlow("|C:" + (vo.myAuPrice ? 0xFFD93F : 0x20CB30) + "&T:" + (vo.myAuPrice ? "\u6211\u7684\u7ADE\u4EF7" : "\u7ADE\u4EF7\u4E2D"));
    };
    AuctionItemRender.prototype.repeat = function () {
        this.showTime.text = DateUtils.getFormatBySecond(this.leftTime, DateUtils.TIME_FORMAT_12) + (this.state == this.STATE_SHOW ? "\u540E\u5F00\u59CB" : "\u540E\u7ED3\u675F");
        if (this.state == this.STATE_AUCTION && this.leftTime <= GlobalConfig.AuctionConfig.rushTime && this.showTime.textColor != 0xFF0000)
            this.showTime.textColor = 0xFF0000;
        if (this.leftTime <= 0) {
            this.checkTime();
            return;
        }
        this.leftTime--;
    };
    AuctionItemRender.prototype.onRemove = function () {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRemove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        TimerManager.ins().removeAll(this);
        this.openedWard = false;
    };
    AuctionItemRender.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.yikoujia:
            case this.yikoujia0:
                if (this.state == this.STATE_END) {
                    UserTips.ins().showTips("\u7269\u54C1\u62CD\u5356\u7ED3\u675F");
                    return;
                }
                else if (this.state == this.STATE_SHOW) {
                    UserTips.ins().showTips("\u7269\u54C1\u5C55\u793A\u65F6\u95F4");
                    return;
                }
                this.openedWard = true;
                this.isYiKouJia = e.target == this.yikoujia;
                this.showWarn();
                break;
        }
    };
    AuctionItemRender.prototype.onAuction = function () {
        this.openedWard = false;
        if (Actor.yb < (this.isYiKouJia ? this.price : this.price2)) {
            this.noMoney();
            return;
        }
        var vo = this.data;
        if (this.isYiKouJia)
            Auction.ins().sendBuy(vo.id, vo.type);
        else
            Auction.ins().sendAUction(vo.id, vo.type, vo.auctionTimes + 1);
    };
    AuctionItemRender.prototype.noMoney = function () {
        UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
    };
    AuctionItemRender.prototype.onAuction2 = function () {
        this.openedWard = false;
    };
    __decorate([
        callDelay(150)
    ], AuctionItemRender.prototype, "noMoney", null);
    return AuctionItemRender;
}(BaseItemRender));
__reflect(AuctionItemRender.prototype, "AuctionItemRender");
//# sourceMappingURL=AuctionItemRender.js.map