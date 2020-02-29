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
var FbExpPanel = (function (_super) {
    __extends(FbExpPanel, _super);
    function FbExpPanel() {
        var _this = _super.call(this) || this;
        _this.name = "\u7ECF\u9A8C\u526F\u672C";
        return _this;
    }
    FbExpPanel.prototype.open = function () {
        this.addTouchEvent(this, this.onTap);
        this.observe(UserFb.ins().postFbExpInfo, this.onUpdate);
        this.onUpdate();
    };
    FbExpPanel.prototype.close = function () {
        this.removeTouchEvent(this, this.onTap);
        this.removeObserve();
        DisplayUtils.removeFromParent(this.eff);
        this.eff = null;
    };
    FbExpPanel.prototype.onUpdate = function () {
        var fbExp = UserFb.ins().fbExp;
        var index = 0;
        if (!fbExp.cid && !fbExp.sid) {
            if (fbExp.useTime <= this.getChangeNum()) {
                index = 0;
                this.currentState = "challenge";
            }
            else {
                index = 2;
                this.currentState = "sdfb";
            }
        }
        else {
            if (fbExp.cid) {
                index = 1;
                this.currentState = "free";
            }
            else {
                index = 3;
                this.currentState = "sdget";
            }
        }
        this.validateNow();
        this.onInitIndex(index);
    };
    FbExpPanel.prototype.getChangeNum = function (lv) {
        if (lv == undefined)
            lv = UserVip.ins().lv;
        var count = GlobalConfig.ExpFubenBaseConfig.freeCount;
        return (GlobalConfig.ExpFubenBaseConfig.vipCount[lv] || 0) + count;
    };
    FbExpPanel.prototype.getSdNum = function (vip) {
        return GlobalConfig.ExpFubenBaseConfig.buyCount + GlobalConfig.ExpFubenBaseConfig.vipBuyCount[vip];
    };
    FbExpPanel.prototype.onInitIndex = function (index) {
        var fbExp = UserFb.ins().fbExp;
        var fbId = UserFb.ins().getExpFbId();
        var discount = GlobalConfig.MonthCardConfig.expFubenPrecent / 100;
        var addValue = Recharge.ins().getIsForeve() ? 1 + discount : 1;
        var exp = Math.floor(GlobalConfig.ExpFubenConfig[fbId].exp * addValue);
        if (index == 0) {
            this.lbTime.text = "\u4ECA\u65E5\u53EF\u6311\u6218\u6B21\u6570\uFF1A" + (this.getChangeNum() - fbExp.useTime);
            this.lbExp.text = "" + exp;
            if (this.getChangeNum() > fbExp.useTime) {
                this.btnChallenge.enabled = true;
            }
            else {
                this.btnChallenge.enabled = false;
                var nextLv = UserVip.ins().lv + 1;
                var nextTime = this.getChangeNum(nextLv);
                while (nextTime != undefined && nextTime <= fbExp.useTime) {
                    nextLv += 1;
                    nextTime = this.getChangeNum(nextLv);
                    if (GlobalConfig.ExpFubenBaseConfig.vipCount[nextLv] == undefined) {
                        break;
                    }
                }
                if (nextTime - fbExp.useTime > 0) {
                    this.lbTime.text = "VIP" + nextLv + "\u53EF\u6311\u6218\u6B21\u6570+" + (nextTime - fbExp.useTime);
                }
            }
        }
        else if (index == 2) {
            this.barGroup.visible = false;
            this.btnSD.visible = true;
            this.bar.value = 0;
            this.lbExp.text = "" + exp;
            var sdTime = this.getSdNum(UserVip.ins().lv);
            if (fbExp.sdTime >= (sdTime || 0)) {
                var nextLv = UserVip.ins().lv + 1;
                var nextTime = this.getSdNum(nextLv);
                while (nextTime != undefined && nextTime <= sdTime) {
                    nextLv += 1;
                    nextTime = this.getSdNum(nextLv);
                }
                this.lbVip0.visible = false;
                if (nextTime && nextTime > sdTime) {
                    this.lbVip.textFlow = TextFlowMaker.generateTextFlow1("|C:0xf3311e&T:VIP" + nextLv + "|\u53EF\u989D\u5916\u626B\u8361" + (nextTime - sdTime) + "\u6B21");
                    this.lbVip.visible = true;
                    this.btnSD.enabled = false;
                }
                else if (nextTime == undefined) {
                    this.lbVip.textFlow = TextFlowMaker.generateTextFlow1("\u4ECA\u65E5\u626B\u8361\u6B21\u6570\u5DF2\u7528\u5B8C");
                    this.lbVip.visible = true;
                    this.btnSD.enabled = false;
                }
                else {
                    this.lbVip.visible = false;
                    this.btnSD.enabled = true;
                }
            }
            else {
                this.lbVip.visible = false;
                this.lbVip0.visible = true;
                this.lbVip0.textFlow = TextFlowMaker.generateTextFlow1("\u4ECA\u65E5\u53EF\u626B\u8361\u6B21\u6570" + (sdTime - fbExp.sdTime) + "\u6B21");
                this.btnSD.enabled = true;
            }
        }
        else if (index == 1 || index == 3) {
            var exp_1 = GlobalConfig.ExpFubenConfig[fbExp.cid || fbExp.sid].exp * addValue;
            for (var i = 0; i < 3; i++) {
                this['lbExp' + i].textFlow = TextFlowMaker.generateTextFlow1("\u7ECF\u9A8C\uFF1A" + exp_1 * (i + 1));
                var needGold = 0;
                if (index == 1) {
                    needGold = GlobalConfig.ExpFubenBaseConfig.recPrice[i];
                }
                else {
                    needGold = GlobalConfig.ExpFubenBaseConfig.buyPrice[i];
                }
                this['gold' + i].setPrice(needGold);
            }
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
    FbExpPanel.prototype.onTap = function (e) {
        var tar = e.target;
        if (this.checkBtnGet(tar)) {
        }
        else if (tar == this.btnChallenge) {
            if (UserFb.ins().checkInFB())
                return;
            UserFb.ins().sendChallengeExpFb();
        }
        else if (tar == this.btnSD) {
            if (this.barGroup.visible == false) {
                this.barGroup.visible = true;
                this.btnSD.visible = false;
                this.lbVip.visible = false;
                this.lbVip0.visible = false;
                this.bar.maximum = 100;
                this.bar.value = 0;
                egret.Tween.get(this.bar).to({ value: 100 }, 1500).call(function () {
                    UserFb.ins().sendSaodang();
                });
            }
        }
    };
    FbExpPanel.prototype.checkBtnGet = function (tar) {
        var _this = this;
        var fbExp = UserFb.ins().fbExp;
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
            var type_1 = fbExp.cid ? 0 : 1;
            var cost = GlobalConfig.ExpFubenBaseConfig.recPrice[index - 1];
            if (Actor.yb < cost) {
                UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
                return;
            }
            if (index != 3 && Setting.ins().getValue(ClientSet.expFirst) == 0) {
                if (index == 1 && Actor.level < 80) {
                    this.sendGetAward(type_1, index, tar);
                    DisplayUtils.removeFromParent(this.eff);
                    this.eff = null;
                }
                else {
                    var str = "\u662F\u5426\u9886\u53D6" + index + "\u500D\u5956\u52B1\uFF0C\u9886\u53D6\u540E\u60A8\u7684\u7B49\u7EA7\u5C06\u4F1A\u843D\u540E\u4E00\u5927\u622A\uFF0C\u5F3A\u70C8\u63A8\u83503\u500D\u9886\u53D6";
                    if (cost != 0)
                        str = "\u662F\u5426\u82B1\u8D39<font color='#FFB82A'>" + cost + "\u5143\u5B9D</font>\u9886\u53D6" + index + "\u500D\u5956\u52B1\uFF0C\u9886\u53D6\u540E\u60A8\u7684\u7B49\u7EA7\u5C06\u4F1A\u843D\u540E\u4E00\u5927\u622A\uFF0C\u5F3A\u70C8\u63A8\u83503\u500D\u9886\u53D6";
                    var win = WarnWin.show(str, function () {
                        _this.sendGetAward(type_1, index, tar);
                        Setting.ins().setValue(ClientSet.expFirst, 1);
                        DisplayUtils.removeFromParent(_this.eff);
                        _this.eff = null;
                    }, this);
                    win.setBtnLabel("\u9886\u53D6");
                }
                return;
            }
            if (cost == 0) {
                this.sendGetAward(type_1, index, tar);
            }
            else {
                this.sendGetAward(type_1, index, tar);
            }
        }
        return index > 0;
    };
    FbExpPanel.prototype.sendGetAward = function (type, index, tar) {
        var fbExp = UserFb.ins().fbExp;
        var config = GlobalConfig.ExpFubenConfig[fbExp.cid || fbExp.sid];
        if (!config)
            return;
        var exp = config.exp;
        var flyTime = this.getFlyTime(exp * index);
        var count = Math.floor(flyTime / 15);
        TimerManager.ins().doTimer(15, count, function () {
            UserFb.ins().postExpFly(tar.parent.localToGlobal(tar.x + tar.width / 2, tar.y + tar.height / 2));
            if (index > 1) {
                UserFb.ins().postExpFly(tar.parent.localToGlobal(tar.x + tar.width / 2, tar.y + tar.height / 2));
            }
            if (index > 2) {
                UserFb.ins().postExpFly(tar.parent.localToGlobal(tar.x + tar.width / 2, tar.y + tar.height / 2));
            }
        }, this);
        egret.Tween.get(tar).wait(1100).call(function () {
            UserFb.ins().sendGetAwardMul(type, index);
        });
    };
    FbExpPanel.prototype.getFlyTime = function (exp) {
        var addLevel = 0;
        var oldLevel = Actor.level;
        var oldExp = Actor.exp;
        var maxExp = GlobalConfig.ExpConfig[oldLevel].exp;
        while (exp > 0 && exp > (maxExp - oldExp)) {
            addLevel += 1;
            oldLevel += 1;
            exp -= (maxExp - oldExp);
            maxExp = GlobalConfig.ExpConfig[oldLevel].exp;
            oldExp = 0;
        }
        if (addLevel == 0) {
            return 400;
        }
        return (addLevel + 1) * 400 - 200;
    };
    return FbExpPanel;
}(BaseView));
__reflect(FbExpPanel.prototype, "FbExpPanel");
//# sourceMappingURL=FbExpPanel.js.map