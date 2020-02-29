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
var OSATargetItemRender1 = (function (_super) {
    __extends(OSATargetItemRender1, _super);
    function OSATargetItemRender1() {
        var _this = _super.call(this) || this;
        _this.skinName = 'OSADailyGiftItemSkin';
        _this.init();
        return _this;
    }
    OSATargetItemRender1.prototype.init = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
        this.reward.itemRenderer = ItemBase;
    };
    OSATargetItemRender1.prototype.onClick = function (e) {
        switch (e.target) {
            case this.get:
                if (this.isGet) {
                    if (this.data instanceof ActivityType2Config) {
                        Activity.ins().sendReward(this.actId, this.index);
                    }
                    else if (this.data instanceof PActivity2Config) {
                        PActivity.ins().sendReward(this.actId, this.index);
                    }
                }
                else {
                    var config = this.data;
                    if (config) {
                        if (UserVip.ins().lv < config.vip)
                            UserTips.ins().showTips("|C:0xff0000&T:VIP\u7B49\u7EA7\u4E0D\u6EE1\u8DB3\u8981\u6C42|");
                        else
                            UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
                    }
                }
                break;
        }
    };
    OSATargetItemRender1.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var config;
        var act2Data;
        if (this.data instanceof ActivityType2Config) {
            config = this.data;
            act2Data = Activity.ins().getActivityDataById(config.Id);
        }
        else if (this.data instanceof PActivity2Config) {
            config = this.data;
            act2Data = PActivity.ins().getActivityDataById(config.Id);
        }
        if (!config || !act2Data) {
            this.isGet = false;
            return;
        }
        this.redPoint.visible = false;
        if (act2Data.buyData[config.index] >= config.count) {
            this.isGet = false;
            this.already.visible = true;
        }
        else {
            this.isGet = UserVip.ins().lv >= config.vip && Actor.yb >= config.price;
            this.already.visible = false;
            this.redPoint.visible = this.getRedPoint(config);
        }
        var cur = config.count - act2Data.buyData[config.index];
        cur = cur <= 0 ? 0 : cur;
        var colorStr = cur ? 0x00ff00 : 0xff0000;
        this.times.textFlow = TextFlowMaker.generateTextFlow1("\u53EF\u8D2D\u4E70\uFF1A|C:" + colorStr + "&T:" + cur + "|/" + config.count);
        this.times.visible = this.get.visible = !this.already.visible;
        this.original.text = config.originalPrice + "";
        this.now.text = config.price + "";
        this.reward.dataProvider = new eui.ArrayCollection(config.rewards);
        this.actId = config.Id;
        this.index = config.index;
        this.discountNum.text = config.discount + "";
        if (config.vip) {
            this.vip.visible = true;
            this.vipLv.text = config.vip + "";
        }
        else {
            this.vip.visible = false;
        }
        if (Actor.level < ActivityType2Data.LimitLevel)
            this.redPoint.visible = false;
    };
    OSATargetItemRender1.prototype.getRedPoint = function (config) {
        return UserVip.ins().lv >= config.vip && Actor.yb >= config.price;
    };
    OSATargetItemRender1.prototype.destruct = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    return OSATargetItemRender1;
}(BaseItemRender));
__reflect(OSATargetItemRender1.prototype, "OSATargetItemRender1");
//# sourceMappingURL=OSATargetItemRender1.js.map