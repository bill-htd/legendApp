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
var FireRingFb = (function (_super) {
    __extends(FireRingFb, _super);
    function FireRingFb() {
        var _this = _super.call(this) || this;
        _this.isUse = false;
        _this.name = "\u526F\u672C";
        return _this;
    }
    FireRingFb.prototype.open = function () {
        this.addTouchEvent(this, this.onTap);
        this.observe(UserFb.ins().postFbRingInfo, this.onUpdate);
        this.observe(UserBag.ins().postItemCountChange, this.UseToItem);
        this.onUpdate();
    };
    FireRingFb.prototype.close = function () {
        this.removeTouchEvent(this, this.onTap);
        this.removeObserve();
        DisplayUtils.removeFromParent(this.eff);
        this.eff = null;
    };
    FireRingFb.prototype.onUpdate = function () {
        this.isUse = false;
        var fbExp = UserFb.ins().fbRings;
        var index = 0;
        if (fbExp.canTakeAward) {
            index = 1;
            this.currentState = "free";
        }
        else if (Recharge.ins().franchise) {
            if (UserFb.ins().fbRings.challengeTime > 0) {
                this.currentState = "sdget";
                index = 1;
            }
            else {
                this.currentState = "sdfb";
                index = 0;
            }
        }
        else {
            index = 0;
            this.currentState = "challenge";
        }
        this.validateNow();
        this.onInitIndex(index);
    };
    FireRingFb.prototype.UseToItem = function () {
        if (this.isUse) {
            this.isUse = false;
            UserFb.ins().sendChallengeFbRing();
        }
    };
    FireRingFb.prototype.getChangeNum = function (lv) {
        if (lv == undefined)
            lv = UserVip.ins().lv;
        var count = GlobalConfig.ActorExRingFubenConfig.freeCount;
        return (GlobalConfig.ActorExRingFubenConfig.vipCount[lv] || 0) + count;
    };
    FireRingFb.prototype.onInitIndex = function (index) {
        var fbExp = UserFb.ins().fbRings;
        var awards = GlobalConfig.ActorExRingFubenConfig.reward;
        var exp = awards[0].count;
        if (index == 0) {
            this.lbTime.text = "\u4ECA\u65E5\u53EF\u6311\u6218\u6B21\u6570\uFF1A" + fbExp.challengeTime;
            this.lbExp.text = "" + exp;
            if (fbExp.challengeTime) {
                this.btnChallenge.enabled = true;
            }
            else {
                var curTime = this.getChangeNum();
                var nextLv = UserVip.ins().lv + 1;
                var nextTime = this.getChangeNum(nextLv);
                while (nextTime != undefined && nextTime >= curTime) {
                    nextLv += 1;
                    nextTime = this.getChangeNum(nextLv);
                    if (GlobalConfig.ActorExRingFubenConfig.vipCount[nextLv] == undefined) {
                        break;
                    }
                }
                if (nextTime - curTime > 0) {
                    this.lbTime.text = "VIP" + nextLv + "\u53EF\u6311\u6218\u6B21\u6570+" + (nextTime - curTime);
                }
            }
        }
        else if (index == 1) {
            var recPrice = GlobalConfig.ActorExRingFubenConfig.recPrice;
            var index_1 = 0;
            for (var i in recPrice) {
                this['lbExp' + index_1].textFlow = TextFlowMaker.generateTextFlow1("  " + exp * (+i + 1));
                var needGold = GlobalConfig.ActorExRingFubenConfig.recPrice[i];
                this['gold' + index_1].setPrice(needGold);
                index_1 += 1;
            }
            if (Recharge.ins().franchise)
                this.lbSweepTime.text = "\u4ECA\u65E5\u53EF\u6311\u6218\u6B21\u6570\uFF1A" + fbExp.challengeTime;
            if (Setting.ins().getValue(ClientSet.expFirst) == 0) {
                if (!this.eff) {
                    this.eff = new MovieClip();
                    this.eff.scaleX = 0.75;
                    this.eff.scaleY = 0.75;
                    this.eff.touchEnabled = false;
                    this.eff.x = this.btnGet2.x + this.btnGet2.width / 2;
                    this.eff.y = this.btnGet2.y + this.btnGet2.height / 2;
                    this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
                    this.g2.addChild(this.eff);
                }
            }
            if (Actor.level < 80) {
                this.g1.visible = this.g2.visible = false;
                this.g0.horizontalCenter = 0;
            }
            else {
                this.g1.visible = this.g2.visible = true;
                this.g0.horizontalCenter = -182;
            }
        }
    };
    FireRingFb.prototype.onTap = function (e) {
        var tar = e.target;
        var fbExp = UserFb.ins().fbRings;
        if (this.checkBtnGet(tar)) {
        }
        else if (tar == this.btnChallenge) {
            if (UserFb.ins().checkInFB())
                return;
            if (fbExp.challengeTime <= 0) {
                var tipText = "";
                var item_1 = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, ItemConst.FIRE_FB);
                if (item_1) {
                    tipText = "\u786E\u5B9A\u4F7F\u75281\u4E2A<font color='#FFB82A'>" + item_1.itemConfig.name + "</font>\u9053\u5177\u8FDB\u5165\u6311\u6218\uFF1F\n";
                    WarnWin.show(tipText, function () {
                        this.isUse = true;
                        UserBag.ins().sendUseItem(item_1.configID, 1);
                    }, this);
                    return;
                }
                if (fbExp.buyTime < (GlobalConfig.ActorExRingFubenConfig.vipCount[UserVip.ins().lv] || 0)) {
                    tipText = "\u662F\u5426\u82B1\u8D39" + GlobalConfig.ActorExRingFubenConfig.vipcost + "\u5143\u5B9D\u6311\u6218\u70C8\u7130\u526F\u672C\uFF1F";
                    WarnWin.show(tipText, function () {
                        UserFb.ins().sendChallengeFbRing();
                    }, this);
                    return;
                }
                tipText = "|C:0xff0000&T:\u6311\u6218\u6B21\u6570\u4E0D\u8DB3,\u65E0\u6CD5\u6311\u6218";
                UserTips.ins().showTips(tipText);
                return;
            }
            UserFb.ins().sendChallengeFbRing();
        }
    };
    FireRingFb.prototype.checkBtnGet = function (tar) {
        var index = 0;
        if (tar == this.btnGet0) {
            index = 1;
        }
        else if (tar == this.btnGet1) {
            index = 2;
        }
        else if (tar == this.btnGet2) {
            index = 3;
        }
        if (index > 0) {
            var cost = GlobalConfig.ActorExRingFubenConfig.recPrice[index - 1];
            if (Actor.yb < cost) {
                UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
                return;
            }
            var fbRings = UserFb.ins().fbRings;
            if (fbRings.canTakeAward) {
                UserFb.ins().sendFbRingTakeAward(index);
            }
            else if (Recharge.ins().franchise) {
                UserFb.ins().sendRingSweep(index);
            }
            else {
                UserFb.ins().sendFbRingTakeAward(index);
            }
        }
        return index > 0;
    };
    return FireRingFb;
}(BaseView));
__reflect(FireRingFb.prototype, "FireRingFb");
//# sourceMappingURL=FireRingFb.js.map