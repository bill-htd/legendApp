var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActivityDataFactory = (function () {
    function ActivityDataFactory() {
    }
    ActivityDataFactory.create = function (bytes) {
        var id = bytes.readInt();
        var startTime = bytes.readInt();
        var endTime = bytes.readInt();
        var type = bytes.readShort();
        var len = bytes.readInt();
        var data;
        switch (type) {
            case ActivityDataFactory.ACTIVITY_TYPE_1:
                data = new ActivityType1Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_2:
                data = new ActivityType2Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_3:
                data = new ActivityType3Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_4:
                data = new ActivityType4Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_5:
                data = Activity.ins().getActivityDataById(id);
                if (!data)
                    data = new ActivityType5Data(bytes);
                else
                    data.updateRecord(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_6:
                data = new ActivityType6Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_7:
                data = new ActivityType7Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_8:
                data = new ActivityType8Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_9:
                data = new ActivityType9Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_10:
                data = new ActivityType10Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_11:
                data = new ActivityType11Data(bytes, id, startTime, endTime);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_12:
                if (!Activity.ins().activityData[id])
                    data = new ActivityType12Data(bytes, id);
                else {
                    data = Activity.ins().activityData[id];
                    data.init(bytes, id);
                }
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_17:
                data = new ActivityType17Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_18:
                data = new ActivityType18Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_19:
                data = new ActivityType19Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_20:
                data = new ActivityType20Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_21:
                data = new ActivityType21Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_22:
                data = new ActivityType22Data(bytes);
                break;
            case ActivityDataFactory.ACTIVITY_TYPE_24:
                if (!Activity.ins().activityData[id])
                    data = new ActivityType24Data(bytes, id);
                else {
                    data = Activity.ins().activityData[id];
                    data.init(bytes, id);
                }
                break;
            default: {
                debug.log("错误活动类型:" + type);
                for (var i = 0; i < len; i++) {
                    bytes.readByte();
                }
                return null;
            }
        }
        if (!data)
            return null;
        data.id = id;
        data.startTime = startTime;
        data.endTime = endTime;
        data.type = type;
        data.activityType = ActivityType.Normal;
        var cfg = GlobalConfig.ActivityConfig[id];
        if (cfg) {
            data.timeType = cfg.timeType;
            data.pageStyle = cfg.pageStyle;
            data.pageSkin = cfg.pageSkin;
        }
        return data;
    };
    ActivityDataFactory.createEx = function () {
        var data;
        var actConfig = GlobalConfig.ActivityBtnConfig;
        var serverZeroTime = DateUtils.formatMiniDateTime(GameServer._serverZeroTime);
        var serverHeZeroTime = DateUtils.formatMiniDateTime(GameServer._serverHeZeroTime);
        for (var k in actConfig) {
            var cfg = actConfig[k];
            var curhefuCount = cfg.hfTimes ? cfg.hfTimes : 0;
            var timeType = cfg.timeType ? cfg.timeType : 0;
            if (timeType && timeType == ActivityDataFactory.TimeType_Total && (curhefuCount && curhefuCount != GameServer._hefuCount))
                continue;
            if (cfg.id > 10000) {
                data = new ActivityType0Data(null);
                data.id = cfg.id;
                data.type = cfg.type;
                data.activityType = ActivityType.Normal;
                data.timeType = cfg.timeType;
                if (cfg.pageStyle)
                    data.pageStyle = cfg.pageStyle;
                if (cfg.relyOn) {
                    data.relyOn = cfg.relyOn;
                    for (var i = 0; i < cfg.relyOn.length; i++) {
                        if (Activity.ins().activityData[cfg.relyOn[i]]) {
                            data.startTime = DateUtils.formatMiniDateTime(Activity.ins().activityData[cfg.relyOn[i]].startTime);
                            data.endTime = DateUtils.formatMiniDateTime(Activity.ins().activityData[cfg.relyOn[i]].endTime);
                            break;
                        }
                    }
                }
                else if (cfg.timeType == ActivityDataFactory.TimeType_Normal) {
                    var arr = cfg.startTime.split("-");
                    var openDay = +arr[0];
                    var openTime = arr[1].split(":");
                    var startDate = new Date(serverZeroTime);
                    startDate.setDate(startDate.getDate() + openDay);
                    startDate.setHours(+openTime[0], +openTime[1], 0, 0);
                    data.startTime = startDate.getTime();
                    if (cfg.endTime) {
                        arr = cfg.endTime.split("-");
                        var endDay = +arr[0];
                        var endTime = arr[1].split(":");
                        var endDate = new Date(serverZeroTime);
                        endDate.setDate(endDate.getDate() + endDay);
                        endDate.setHours(+endTime[0], +endTime[1], 0, 0);
                        data.endTime = endDate.getTime();
                    }
                    else {
                        data.endTime = GameServer.serverTime + 30 * 24 * 60 * 60 * 1000;
                    }
                }
                else if (cfg.timeType == ActivityDataFactory.TimeType_Fixed) {
                    data.startTime = (new Date(cfg.startTime)).getTime();
                    data.endTime = (new Date(cfg.endTime)).getTime();
                }
                else if (cfg.timeType == ActivityDataFactory.TimeType_Total) {
                    var arr = [];
                    var endDay = DateUtils.DAYS_PER_WEEK;
                    if (cfg.endTime) {
                        arr = cfg.endTime.split("-");
                        endDay = +arr[0];
                    }
                    switch (cfg.id) {
                        case ActivityBtnType.HEFU_XUNBAO:
                            data.startTime = serverHeZeroTime;
                            data.endTime = serverHeZeroTime + GlobalConfig.TreasureHuntConfig.hefuDay * 24 * 60 * 60 * 1000;
                            break;
                        case ActivityBtnType.HEFU_BOSS:
                        case ActivityBtnType.HEFU_JZLC:
                        case ActivityBtnType.HEFU_CZZS:
                            data.startTime = serverHeZeroTime;
                            data.endTime = serverHeZeroTime + endDay * DateUtils.SECOND_PER_DAY * 1000;
                            break;
                    }
                }
                else {
                    data.startTime = serverZeroTime;
                    data.endTime = GameServer.serverTime + 30 * 24 * 60 * 60 * 1000;
                }
                var endedTime = Math.floor((data.endTime - GameServer.serverTime) / 1000);
                if (endedTime > 0) {
                    Activity.ins().activityData[cfg.id] = data;
                }
                else {
                    if (cfg.id == ActivityBtnType.THREE_HEROES) {
                        if (ThreeHeroes.ins().showIcon3DaysLater)
                            Activity.ins().activityData[cfg.id] = data;
                    }
                }
            }
        }
    };
    ActivityDataFactory.TimeType_Normal = 0;
    ActivityDataFactory.TimeType_Fixed = 1;
    ActivityDataFactory.TimeType_Total = 2;
    ActivityDataFactory.ACTIVITY_TYPE_1 = 1;
    ActivityDataFactory.ACTIVITY_TYPE_2 = 2;
    ActivityDataFactory.ACTIVITY_TYPE_3 = 3;
    ActivityDataFactory.ACTIVITY_TYPE_4 = 4;
    ActivityDataFactory.ACTIVITY_TYPE_5 = 5;
    ActivityDataFactory.ACTIVITY_TYPE_6 = 6;
    ActivityDataFactory.ACTIVITY_TYPE_7 = 7;
    ActivityDataFactory.ACTIVITY_TYPE_8 = 8;
    ActivityDataFactory.ACTIVITY_TYPE_9 = 9;
    ActivityDataFactory.ACTIVITY_TYPE_10 = 10;
    ActivityDataFactory.ACTIVITY_TYPE_11 = 11;
    ActivityDataFactory.ACTIVITY_TYPE_12 = 12;
    ActivityDataFactory.ACTIVITY_TYPE_17 = 17;
    ActivityDataFactory.ACTIVITY_TYPE_18 = 18;
    ActivityDataFactory.ACTIVITY_TYPE_19 = 19;
    ActivityDataFactory.ACTIVITY_TYPE_20 = 20;
    ActivityDataFactory.ACTIVITY_TYPE_21 = 21;
    ActivityDataFactory.ACTIVITY_TYPE_22 = 22;
    ActivityDataFactory.ACTIVITY_TYPE_24 = 24;
    return ActivityDataFactory;
}());
__reflect(ActivityDataFactory.prototype, "ActivityDataFactory");
var ActivityPageStyle;
(function (ActivityPageStyle) {
    ActivityPageStyle[ActivityPageStyle["THANKS"] = 1] = "THANKS";
    ActivityPageStyle[ActivityPageStyle["NEWYEAR"] = 2] = "NEWYEAR";
    ActivityPageStyle[ActivityPageStyle["CHRISTMAS"] = 3] = "CHRISTMAS";
    ActivityPageStyle[ActivityPageStyle["HAPPYSEVENDAY"] = 4] = "HAPPYSEVENDAY";
    ActivityPageStyle[ActivityPageStyle["TOTALRECHARGE"] = 5] = "TOTALRECHARGE";
    ActivityPageStyle[ActivityPageStyle["CELEBRATION"] = 6] = "CELEBRATION";
    ActivityPageStyle[ActivityPageStyle["LABA"] = 7] = "LABA";
    ActivityPageStyle[ActivityPageStyle["YBZHUANPAN"] = 8] = "YBZHUANPAN";
    ActivityPageStyle[ActivityPageStyle["ZHANLING"] = 9] = "ZHANLING";
    ActivityPageStyle[ActivityPageStyle["SPRINGBEGIN"] = 10] = "SPRINGBEGIN";
    ActivityPageStyle[ActivityPageStyle["XIAONIAN"] = 11] = "XIAONIAN";
    ActivityPageStyle[ActivityPageStyle["SPRINGFESTIVAL"] = 12] = "SPRINGFESTIVAL";
    ActivityPageStyle[ActivityPageStyle["SPRINGEIGHTDAY"] = 13] = "SPRINGEIGHTDAY";
    ActivityPageStyle[ActivityPageStyle["KAIMENHONG"] = 14] = "KAIMENHONG";
    ActivityPageStyle[ActivityPageStyle["SANBA"] = 15] = "SANBA";
    ActivityPageStyle[ActivityPageStyle["LONGTAITOU"] = 16] = "LONGTAITOU";
    ActivityPageStyle[ActivityPageStyle["VERSIONCELE"] = 17] = "VERSIONCELE";
})(ActivityPageStyle || (ActivityPageStyle = {}));
//# sourceMappingURL=ActivityDataFactory.js.map