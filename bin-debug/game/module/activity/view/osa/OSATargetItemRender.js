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
var OSATargetItemRenderer = (function (_super) {
    __extends(OSATargetItemRenderer, _super);
    function OSATargetItemRenderer() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    OSATargetItemRenderer.prototype.init = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
        this.isGet = true;
    };
    OSATargetItemRenderer.prototype.onClick = function (e) {
        switch (e.target) {
            case this.get:
                var config = void 0;
                var ins = void 0;
                if (GlobalConfig.PActivityBtnConfig[this.actId]) {
                    config = GlobalConfig.PActivityType1Config[this.actId][this.index];
                    ins = PActivity.ins();
                }
                else {
                    config = GlobalConfig.ActivityType1Config[this.actId][this.index];
                    ins = Activity.ins();
                }
                if (this.isGet) {
                    ins.sendReward(this.actId, this.index);
                }
                else {
                    var tipsLevel = 0;
                    switch (config.showType) {
                        case ShowType.LEVEL:
                            if (Actor.level < config.level)
                                tipsLevel = config.level - Actor.level;
                            else if (UserZs.ins().lv < config.zslevel)
                                tipsLevel = config.zslevel - UserZs.ins().lv;
                            break;
                        case ShowType.WING:
                            if (WingsData.getWingAllLevel() < config.wingLv)
                                tipsLevel = config.wingLv - WingsData.getWingAllLevel();
                            break;
                        case ShowType.ZHUZAO:
                            if (Role.getAllForgeLevelByType(PackageID.Zhuling) < config.zzLv)
                                tipsLevel = config.zzLv - Role.getAllForgeLevelByType(PackageID.Zhuling);
                            break;
                        case ShowType.LONGHUN:
                            if (LongHunData.getLongHunAllLevel() < config.lhLv)
                                tipsLevel = config.lhLv - LongHunData.getLongHunAllLevel();
                            break;
                        case ShowType.BOOK:
                            var power = Book.ins().getBookPowerNumEx();
                            if (power < config.tjPower)
                                tipsLevel = config.tjPower - power;
                            break;
                        case ShowType.EQUIP:
                            var point = UserBag.ins().getEquipsScoreByRolesOfBody();
                            if (point < config.equipPower)
                                tipsLevel = config.equipPower - point;
                            break;
                        case ShowType.XIAOFEI:
                            var act = Activity.ins().getActivityDataById(this.actId);
                            if (act.hFTotalConsumption < config.consumeYuanbao)
                                tipsLevel = config.consumeYuanbao - act.hFTotalConsumption;
                            break;
                        case ShowType.RING:
                            var lvl = 0;
                            var data = SpecialRing.ins().getSpecialRingDataById(SpecialRing.FIRE_RING_ID);
                            if (data && data.level)
                                lvl = data.level;
                            if (lvl < config.huoyanRingLv) {
                                tipsLevel = config.huoyanRingLv - lvl;
                            }
                            break;
                        case ShowType.SAMSARA:
                            if (Actor.samsaraLv < config.lunhLv)
                                tipsLevel = config.lunhLv - Actor.samsaraLv;
                            break;
                    }
                    if (!tipsLevel) {
                        Activity.ins().sendReward(this.actId, this.index);
                        return;
                    }
                    if (config.showType == ShowType.LEVEL && UserZs.ins().lv < config.zslevel)
                        UserTips.ins().showTips(+tipsLevel + "转之后即可领取奖励");
                    else if (config.showType == ShowType.BOOK)
                        UserTips.ins().showTips("再升" + tipsLevel + "图鉴战力之后即领取奖励");
                    else if (config.showType == ShowType.EQUIP)
                        UserTips.ins().showTips("再升" + tipsLevel + "装备评分之后即领取奖励");
                    else if (config.showType == ShowType.XIAOFEI)
                        UserTips.ins().showTips("再消费" + tipsLevel + "之后即领取奖励");
                    else
                        UserTips.ins().showTips("再升" + tipsLevel + "级即可领取奖励");
                }
                break;
        }
    };
    OSATargetItemRenderer.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var config = this.data;
        var data;
        if (GlobalConfig.PActivityBtnConfig[config.Id]) {
            data = PActivity.ins().getActivityDataById(config.Id);
        }
        else {
            data = Activity.ins().getActivityDataById(config.Id);
        }
        this.ActivityShowType(config);
        var role = SubRoles.ins().getSubRoleByIndex(0);
        var idx = 0;
        for (var i = 0; i < 3; i++) {
            this["item" + i].visible = false;
        }
        for (var i = 0; i < config.rewards.length; i++) {
            var rd = config.rewards[i];
            if (rd.job && rd.job != role.job)
                continue;
            this["item" + idx].visible = true;
            this["item" + idx].data = { type: rd.type, count: rd.count, id: rd.id };
            idx++;
        }
        var btnType = data.getRewardStateById(config.index);
        var curget = data.rewardsSum[config.index];
        var sum = config.total ? (config.total - curget) : 1;
        sum = sum > 0 ? sum : 0;
        this.redPoint.visible = false;
        switch (btnType) {
            case Activity.NotReached:
                if (sum > 0) {
                    this.currentState = "can";
                }
                else {
                    this.currentState = "zero";
                }
                this.isGet = false;
                break;
            case Activity.CanGet:
                if (sum > 0) {
                    this.currentState = "can";
                    this.redPoint.visible = true;
                }
                else {
                    this.currentState = "zero";
                }
                break;
            case Activity.Geted:
                this.currentState = "already";
                break;
        }
        this.get.touchEnabled = this.redPoint.visible;
        if (this.get.touchEnabled) {
            this.get.label = "领取";
            this.get.currentState = "up";
        }
        else {
            this.get.label = "未完成";
            this.get.currentState = "disabled";
        }
        this.num.visible = true;
        if (config.total)
            this.num.text = "剩余" + sum + "份";
        else
            this.num.visible = false;
        this.actId = config.Id;
        this.index = config.index;
        if (config.showType == ShowType.XIAOFEI) {
            this.target.visible = this.recharge.visible = true;
            this.target.visible = false;
            this.recharge.text = data.hFTotalConsumption + "/" + config.consumeYuanbao;
        }
        else {
            this.target.visible = this.recharge.visible = false;
        }
        this.validateNow();
    };
    OSATargetItemRenderer.prototype.getRedPoint = function (config) {
        switch (config.showType) {
            case ShowType.LEVEL:
                var lv = config.level ? config.level : 0;
                var zslv = config.zslevel ? config.zslevel : 0;
                if (Actor.level >= lv && UserZs.ins().lv >= zslv)
                    return true;
                break;
            case ShowType.LEVEL:
                if (WingsData.getWingAllLevel() >= config.wingLv)
                    return true;
                break;
            case ShowType.ZHUZAO:
                if (Role.getAllForgeLevelByType(PackageID.Zhuling) >= config.zzLv)
                    return true;
                break;
            case ShowType.LONGHUN:
                if (LongHunData.getLongHunAllLevel() >= config.lhLv)
                    return true;
                break;
            case ShowType.BOOK:
                var power = Book.ins().getBookPowerNumEx();
                if (power >= config.tjPower)
                    return true;
                break;
            case ShowType.EQUIP:
                var point = UserBag.ins().getEquipsScoreByRolesOfBody();
                if (point >= config.equipPower)
                    return true;
                break;
            case ShowType.XIAOFEI:
                var act = Activity.ins().getActivityDataById(this.actId);
                if (act.hFTotalConsumption >= config.consumeYuanbao) {
                    return true;
                }
                break;
            case ShowType.RING:
                var lvl = 0;
                var data = SpecialRing.ins().getSpecialRingDataById(SpecialRing.FIRE_RING_ID);
                if (data && data.level)
                    lvl = data.level;
                return (lvl >= config.huoyanRingLv);
            case ShowType.SAMSARA:
                if (Actor.samsaraLv >= config.lunhLv)
                    return true;
                break;
            default:
                return false;
        }
    };
    OSATargetItemRenderer.prototype.destruct = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    OSATargetItemRenderer.prototype.ActivityShowType = function (config) {
        switch (config.showType) {
            case ShowType.LEVEL:
                this.lvName.text = "等级";
                if (!config.zslevel)
                    this.lvName0.text = config.level + "";
                else {
                    this.lvName0.text = config.zslevel + "转";
                }
                if (config.Id == 15) {
                    this.lvName.text = "转生数";
                    this.lvName0.text = config.zslevel + "转";
                }
                break;
            case ShowType.WING:
                this.lvName.text = "总等阶";
                this.lvName0.text = config.wingLv + "";
                break;
            case ShowType.ZHUZAO:
                this.lvName.text = "总等级";
                this.lvName0.text = config.zzLv + "";
                break;
            case ShowType.LONGHUN:
                this.lvName.text = "总星数";
                this.lvName0.text = config.lhLv + "";
                break;
            case ShowType.BOOK:
                this.lvName.text = "战力";
                this.lvName0.text = config.tjPower + "";
                break;
            case ShowType.EQUIP:
                this.lvName.text = "评分";
                this.lvName0.text = config.equipPower + "";
                break;
            case ShowType.XIAOFEI:
                this.lvName.text = "消费";
                this.lvName0.text = config.consumeYuanbao + "";
                break;
            case ShowType.RING:
                this.lvName.text = "特戒等级";
                var level = config.huoyanRingLv;
                var stage = SpecialRing.ins().getRingStair(level);
                var star = SpecialRing.ins().getRingStar(level);
                this.lvName0.text = stage + "阶" + star + "星";
                break;
            case ShowType.SAMSARA:
                this.lvName.text = "轮回等级";
                var lv1 = SamsaraModel.ins().getSamsara(config.lunhLv);
                var lv2 = SamsaraModel.ins().getSamsaraLv(config.lunhLv);
                var desc = SamsaraModel.ins().getSamsaraDesc(lv1) + "·" + SamsaraModel.ins().getSamsaraLvDesc(lv2);
                this.lvName0.textFlow = TextFlowMaker.generateTextFlow1(config.lunhLv + "\n|S:16&T:" + desc);
                break;
            case ShowType.ZHANLING:
                this.lvName.text = "战灵等阶";
                var lv = config.zhanlingLv;
                this.lvName0.text = Math.ceil(lv / 10) + "阶" + (lv % 10 == 0 ? (lv ? 10 : 0) : lv % 10) + "星";
                break;
        }
    };
    return OSATargetItemRenderer;
}(BaseItemRender));
__reflect(OSATargetItemRenderer.prototype, "OSATargetItemRenderer");
//# sourceMappingURL=OSATargetItemRender.js.map