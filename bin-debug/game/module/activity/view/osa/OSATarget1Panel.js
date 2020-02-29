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
var OSATarget1Panel = (function (_super) {
    __extends(OSATarget1Panel, _super);
    function OSATarget1Panel(id) {
        var _this = _super.call(this) || this;
        _this._time = 0;
        return _this;
    }
    OSATarget1Panel.prototype.setCurSkin = function () {
        var aCon;
        if (this.activityType == ActivityType.Normal) {
            aCon = GlobalConfig.ActivityConfig[this.activityID];
        }
        else if (this.activityType == ActivityType.Personal) {
            aCon = GlobalConfig.PActivityConfig[this.activityID];
        }
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "OSATarget1";
    };
    OSATarget1Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setCurSkin();
        this.content.itemRenderer = OSATargetItemRenderer;
        var ins;
        if (this.activityType == ActivityType.Normal) {
            ins = Activity.ins();
        }
        else if (this.activityType == ActivityType.Personal) {
            ins = PActivity.ins();
        }
        this.observe(ins.postRewardResult, this.GetCallBack);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.updateData();
    };
    OSATarget1Panel.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime0.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    OSATarget1Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    OSATarget1Panel.prototype.GetCallBack = function (activityID) {
        if (this.activityID != activityID)
            return;
        var ins;
        var activityData;
        if (this.activityType == ActivityType.Normal) {
            ins = Activity.ins();
            activityData = ins.getActivityDataById(this.activityID);
        }
        else if (this.activityType == ActivityType.Personal) {
            ins = PActivity.ins();
            activityData = ins.getActivityDataById(this.activityID);
        }
        if (!ins.isSuccee) {
            if (!UserBag.ins().getSurplusCount()) {
                UserTips.ins().showTips("背包已满");
            }
            else {
                UserTips.ins().showTips("领取失败");
                ins.sendChangePage(activityData.id);
            }
        }
        ins.isSuccee = false;
        this.updateData();
    };
    OSATarget1Panel.prototype.updateData = function () {
        if (!this.listData) {
            this.listData = new ArrayCollection();
            this.content.dataProvider = this.listData;
        }
        var ins;
        var activityData;
        var tmplist;
        var aconfig;
        if (this.activityType == ActivityType.Normal) {
            ins = Activity.ins();
            activityData = ins.getActivityDataById(this.activityID);
            tmplist = GlobalConfig.ActivityType1Config[activityData.id];
            aconfig = GlobalConfig.ActivityConfig;
        }
        else if (this.activityType == ActivityType.Personal) {
            ins = PActivity.ins();
            activityData = ins.getActivityDataById(this.activityID);
            tmplist = GlobalConfig.PActivityType1Config[activityData.id];
            aconfig = GlobalConfig.PActivityConfig;
        }
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(activityData.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(activityData.endTime) - GameServer.serverTime) / 1000);
        if (beganTime >= 0) {
            this.actTime0.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.actTime0.text = "活动已结束";
        }
        else {
            this._time = endedTime;
            if (this._time < 0)
                this._time = 0;
            this.actTime0.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        this.actInfo0.text = aconfig[this.activityID].desc;
        var listData = [];
        for (var k in tmplist) {
            listData.push(tmplist[k]);
        }
        listData = listData.slice();
        var listDataSort = [];
        var listDataSortTotal = [];
        for (var i = 0; i < listData.length; i++) {
            var state = activityData.getRewardStateById(listData[i].index);
            if (state == Activity.Geted) {
                listDataSortTotal.push(listData[i]);
            }
            else {
                listDataSort.push(listData[i]);
            }
        }
        if (listData[0].showType == ShowType.LEVEL) {
            var listDataZsLevel = [];
            var listDataLevel = [];
            listDataLevel = this.sortLevelList(listDataSort);
            listDataZsLevel = this.sortLevelList(listDataSortTotal);
            listData = listDataLevel.concat(listDataZsLevel);
            this.listData.replaceAll(listData);
        }
        else {
            listDataSort.sort(this.sortFunc);
            listDataSortTotal.sort(this.sortFunc);
            listData = listDataSort.concat(listDataSortTotal);
            this.listData.replaceAll(listData);
        }
        var aBtn = ins.getbtnInfo(this.activityID.toString());
        this.title.source = aBtn.title;
        this.setDesc(activityData);
    };
    OSATarget1Panel.prototype.setDesc = function (activityData) {
        var config;
        if (this.activityType == ActivityType.Normal) {
            config = GlobalConfig.ActivityType1Config[activityData.id][1];
        }
        else if (this.activityType == ActivityType.Personal) {
            config = GlobalConfig.PActivityType1Config[activityData.id][1];
        }
        var myAttr = "";
        var val = "";
        switch (config.showType) {
            case ShowType.LEVEL:
                myAttr = "我的等级:";
                if (config.zslevel)
                    val += UserZs.ins().lv + "转";
                if (config.level)
                    val += Actor.level + "级";
                break;
            case ShowType.WING:
                myAttr = "我的翅膀等阶:";
                val = WingsData.getWingAllLevel() + "";
                break;
            case ShowType.ZHUZAO:
                myAttr = "我的铸造等级:";
                val = Role.getAllForgeLevelByType(PackageID.Zhuling) + "";
                break;
            case ShowType.LONGHUN:
                myAttr = "我的龙魂等级:";
                val = LongHunData.getLongHunAllLevel() + "";
                break;
            case ShowType.BOOK:
                var power = Book.ins().getBookPowerNumEx();
                myAttr = "我的图鉴战力:";
                val = power + "";
                break;
            case ShowType.EQUIP:
                myAttr = "我的装备评分:";
                val = UserBag.ins().getEquipsScoreByRolesOfBody() + "";
                break;
            case ShowType.XIAOFEI:
                myAttr = "我的消费:";
                val = activityData.hFTotalConsumption + "";
                break;
            case ShowType.RING:
                myAttr = "我的烈焰戒指等级:";
                var data = SpecialRing.ins().getSpecialRingDataById(SpecialRing.FIRE_RING_ID);
                var stage = SpecialRing.ins().getRingStair(data.level);
                var star = SpecialRing.ins().getRingStar(data.level);
                val = stage + "阶" + star + "星";
                break;
            case ShowType.SAMSARA:
                myAttr = "\u6211\u7684\u8F6E\u56DE\u7B49\u7EA7:";
                var lv1 = SamsaraModel.ins().getSamsara(Actor.samsaraLv);
                var lv2 = SamsaraModel.ins().getSamsaraLv(Actor.samsaraLv);
                val = Actor.samsaraLv + " " + SamsaraModel.ins().getSamsaraDesc(lv1) + "·" + SamsaraModel.ins().getSamsaraLvDesc(lv2);
                break;
            case ShowType.ZHANLING:
                myAttr = "\u6211\u7684\u6218\u7075\u7B49\u9636:";
                var lv = ZhanLingModel.ins().getZhanLingDataByLevel(0);
                val = Math.ceil(lv / 10) + "阶" + (lv % 10 == 0 ? (lv ? 10 : 0) : lv % 10) + "星";
                break;
        }
        this.attr.text = myAttr;
        this.myAttrValue.text = val;
    };
    OSATarget1Panel.prototype.sortLevelList = function (datalist) {
        var listDataSort = [];
        var lhead = [];
        var ltotal = [];
        for (var i = 0; i < datalist.length; i++) {
            if (datalist[i].zslevel)
                ltotal.push(datalist[i]);
            else
                lhead.push(datalist[i]);
        }
        lhead.sort(this.sortFunc);
        ltotal.sort(this.sortFunc);
        listDataSort = lhead.concat(ltotal);
        return listDataSort;
    };
    OSATarget1Panel.prototype.sortFunc = function (aConfig, bConfig) {
        var activityData;
        if (GlobalConfig.PActivityBtnConfig[aConfig.Id]) {
            activityData = PActivity.ins().getActivityDataById(aConfig.Id);
        }
        else {
            activityData = Activity.ins().getActivityDataById(aConfig.Id);
        }
        var aState = activityData.getRewardStateById(aConfig.index);
        var bState = activityData.getRewardStateById(bConfig.index);
        if (aConfig.showType == ShowType.LEVEL) {
            if (aConfig.zslevel < bConfig.zslevel)
                return -1;
            if (aConfig.zslevel > bConfig.zslevel)
                return 1;
            if (aConfig.level < bConfig.level)
                return -1;
            if (aConfig.level > bConfig.level)
                return 1;
        }
        if (aConfig.showType == ShowType.WING) {
            if (aConfig.wingLv < bConfig.wingLv)
                return -1;
            if (aConfig.wingLv > bConfig.wingLv)
                return 1;
        }
        if (aConfig.showType == ShowType.ZHUZAO) {
            if (aConfig.zzLv < bConfig.zzLv)
                return -1;
            if (aConfig.zzLv > bConfig.zzLv)
                return 1;
        }
        if (aConfig.showType == ShowType.LONGHUN) {
            if (aConfig.lhLv < bConfig.lhLv)
                return -1;
            if (aConfig.lhLv > bConfig.lhLv)
                return 1;
        }
        if (aConfig.showType == ShowType.BOOK) {
            if (aConfig.tjPower < bConfig.tjPower)
                return -1;
            if (aConfig.tjPower > bConfig.tjPower)
                return 1;
        }
        if (aConfig.showType == ShowType.EQUIP) {
            if (aConfig.equipPower < bConfig.equipPower)
                return -1;
            if (aConfig.equipPower > bConfig.equipPower)
                return 1;
        }
        if (aConfig.showType == ShowType.XIAOFEI) {
            if (aConfig.consumeYuanbao < bConfig.consumeYuanbao)
                return -1;
            if (aConfig.consumeYuanbao > bConfig.consumeYuanbao)
                return 1;
        }
        if (aConfig.showType == ShowType.SAMSARA) {
            if (aConfig.lunhLv < bConfig.lunhLv)
                return -1;
            if (aConfig.lunhLv > bConfig.lunhLv)
                return 1;
        }
        if (aConfig.showType == ShowType.ZHANLING) {
            if (aConfig.zhanlingLv < bConfig.zhanlingLv)
                return -1;
            if (aConfig.zhanlingLv > bConfig.zhanlingLv)
                return 1;
        }
        return 0;
    };
    return OSATarget1Panel;
}(ActivityPanel));
__reflect(OSATarget1Panel.prototype, "OSATarget1Panel");
//# sourceMappingURL=OSATarget1Panel.js.map