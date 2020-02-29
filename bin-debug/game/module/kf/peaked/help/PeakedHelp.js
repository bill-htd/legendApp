var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PeakedHelp = (function () {
    function PeakedHelp() {
    }
    PeakedHelp.calcTimerNode = function () {
        var baseDP = GlobalConfig.PeakRaceBase;
        var timeDps = GlobalConfig.PeakRaceTime;
        var sysDt = PeakedSys.ins();
        this.bfStatusTimer = [];
        this.kfStatusTimer = [];
        var curTime = Math.floor(DateUtils.formatMiniDateTime(sysDt.curStateTime) / DateUtils.MS_PER_SECOND);
        console.log(PeakedSys.ins().bfStatus, PeakedSys.ins().bfStatusIsEnd);
        if (PeakedSys.ins().bfStatus >= BF_PeakStatus.Finals && PeakedSys.ins().bfStatusIsEnd) {
            if (!GlobalConfig.PeakRaceBase.interval)
                GlobalConfig.PeakRaceBase.interval = 14;
            curTime -= GlobalConfig.PeakRaceBase.interval * DateUtils.MS_PER_DAY / DateUtils.MS_PER_SECOND;
        }
        this.bfStatusTimer[BF_PeakStatus.None] = curTime;
        this.bfStatusTimer[BF_PeakStatus.Over] = curTime + baseDP.crossRelTime;
        console.log('本服结束时间 :  ' + this.bfStatusTimer[BF_PeakStatus.Over]);
        for (var status_1 = 1; status_1 <= BF_PeakStatus.Finals; status_1++) {
            this.bfStatusTimer[status_1] = curTime + timeDps[status_1].relTime;
        }
        timeDps = GlobalConfig.PeakRaceCrossTime;
        this.kfStatusTimer[KF_PeakStatus.None] = curTime;
        for (var status_2 = 1; status_2 <= KF_PeakStatus.Finals; status_2++) {
            this.kfStatusTimer[status_2] = curTime + timeDps[status_2].relTime;
        }
    };
    PeakedHelp.getTimerRuleStr = function () {
        var baseDP = GlobalConfig.PeakRaceBase;
        var colorStr = "|C:" + ColorUtil.GREEN + "&T:";
        var str = "1\u3001\u62A5\u540D\u7B49\u7EA7\uFF1A\u8FBE\u5230" + colorStr + baseDP.needZsLv + "|\u8F6C\n";
        var TIME_FORMAT = DateUtils.TIME_FORMAT_13;
        var sTime = DateUtils.getFormatBySecond(this.bfStatusTimer[BF_PeakStatus.SignUp], TIME_FORMAT);
        var eTime = DateUtils.getFormatBySecond(this.bfStatusTimer[BF_PeakStatus.Knockout], TIME_FORMAT);
        str += "2\u3001\u62A5\u540D\u65F6\u95F4\uFF1A" + colorStr + sTime + "|\u5230" + colorStr + eTime + "|\n";
        sTime = DateUtils.getFormatBySecond(this.bfStatusTimer[BF_PeakStatus.Knockout], TIME_FORMAT);
        str += "3\u3001\u6DD8\u6C70\u8D5B\uFF1A" + colorStr + sTime + "|\u4E3E\u884C\uFF0C\u6240\u6709\u62A5\u540D\u73A9\u5BB6\u4E89\u593A16\u5F3A\u5E2D\u4F4D\n";
        sTime = DateUtils.getFormatBySecond(this.bfStatusTimer[BF_PeakStatus.Prom16], TIME_FORMAT);
        str += "4\u3001\u516B\u5F3A\u8D5B\uFF1A" + colorStr + sTime + "|\u4E3E\u884C\n";
        sTime = DateUtils.getFormatBySecond(this.bfStatusTimer[BF_PeakStatus.Prom8], TIME_FORMAT);
        str += "5\u3001\u56DB\u5F3A\u8D5B\uFF1A" + colorStr + sTime + "|\u4E3E\u884C\n";
        sTime = DateUtils.getFormatBySecond(this.bfStatusTimer[BF_PeakStatus.Prom4], TIME_FORMAT);
        str += "6\u3001\u534A\u51B3\u8D5B\uFF1A" + colorStr + sTime + "|\u4E3E\u884C\n";
        sTime = DateUtils.getFormatBySecond(this.bfStatusTimer[BF_PeakStatus.Finals], TIME_FORMAT);
        str += "7\u3001\u51B3\u8D5B\uFF1A" + colorStr + sTime + "|\u4E3E\u884C\n";
        return str;
    };
    PeakedHelp.getKFTimerRuleStr = function () {
        var colorStr = "|C:" + ColorUtil.GREEN + "&T:";
        var str = "1\u3001\u62A5\u540D\u6761\u4EF6\uFF1A\u5355\u670D16\u5F3A\u81EA\u52A8\u62A5\u540D\n";
        var TIME_FORMAT = DateUtils.TIME_FORMAT_13;
        var sTime = DateUtils.getFormatBySecond(this.kfStatusTimer[KF_PeakStatus.Knockout], TIME_FORMAT);
        str += "2\u3001\u6DD8\u6C70\u8D5B\uFF1A" + colorStr + sTime + "|\u4E3E\u884C\uFF0C\u51B3\u51FA64\u5F3A\n";
        sTime = DateUtils.getFormatBySecond(this.kfStatusTimer[KF_PeakStatus.Prom64], TIME_FORMAT);
        str += "3\u300132\u5F3A\u8D5B\uFF1A" + colorStr + sTime + "|\u4E3E\u884C\n";
        sTime = DateUtils.getFormatBySecond(this.kfStatusTimer[KF_PeakStatus.Prom32], TIME_FORMAT);
        str += "4\u300116\u5F3A\u8D5B\uFF1A" + colorStr + sTime + "|\u4E3E\u884C\n";
        sTime = DateUtils.getFormatBySecond(this.kfStatusTimer[KF_PeakStatus.Prom16], TIME_FORMAT);
        str += "4\u3001\u516B\u5F3A\u8D5B\uFF1A" + colorStr + sTime + "|\u4E3E\u884C\n";
        sTime = DateUtils.getFormatBySecond(this.kfStatusTimer[KF_PeakStatus.Prom8], TIME_FORMAT);
        str += "5\u3001\u56DB\u5F3A\u8D5B\uFF1A" + colorStr + sTime + "|\u4E3E\u884C\n";
        sTime = DateUtils.getFormatBySecond(this.kfStatusTimer[KF_PeakStatus.Prom4], TIME_FORMAT);
        str += "6\u3001\u534A\u51B3\u8D5B\uFF1A" + colorStr + sTime + "|\u4E3E\u884C\n";
        sTime = DateUtils.getFormatBySecond(this.kfStatusTimer[KF_PeakStatus.Finals], TIME_FORMAT);
        str += "7\u3001\u51B3\u8D5B\uFF1A" + colorStr + sTime + "|\u4E3E\u884C\n";
        return str;
    };
    PeakedHelp.calcEliminateWinNum = function () {
        var count = 0;
        if (PeakedSys.ins().isKf()) {
            for (var _i = 0, _a = PeakedSys.ins().kfKonckReportList; _i < _a.length; _i++) {
                var data = _a[_i];
                if (data.result)
                    count++;
            }
        }
        else {
            for (var _b = 0, _c = PeakedSys.ins().bfKonckReportList; _b < _c.length; _b++) {
                var data = _c[_b];
                if (data.result)
                    count++;
            }
        }
        return count;
    };
    PeakedHelp.getPlayerData = function (group1, group2) {
        var sys = PeakedSys.ins();
        if (group1 == this.PK_GROUP_1) {
            return sys.player16List[group2 - 1];
        }
        else if (group1 == this.PK_GROUP_2) {
            if (sys.player8List[group2 - 1])
                return sys.player8List[group2 - 1];
            else {
                return this.findLastDt(group2, sys.player16List);
            }
        }
        else if (group1 == this.PK_GROUP_3) {
            if (sys.player4List[group2 - 1])
                return sys.player4List[group2 - 1];
            else {
                return this.findLastDt(group2, sys.player8List);
            }
        }
        else {
            if (sys.player2Data)
                return sys.player2Data;
            else
                return this.findLastDt(group2, sys.player4List);
        }
    };
    PeakedHelp.getKFPlayerData = function (group1, group2, idx, isSixteen) {
        if (idx === void 0) { idx = 0; }
        if (isSixteen === void 0) { isSixteen = false; }
        var sys = PeakedSys.ins();
        if (group1 == this.PK_GROUP_1) {
            if (isSixteen) {
                if (sys.kfPlayer16List[group2 - 1])
                    return sys.kfPlayer16List[group2 - 1];
                else
                    return this.findLastDt(group2, sys.kfPlayer64List);
            }
            else {
                return sys.kfPlayer64List.slice(idx * 8, idx * 8 + 8)[group2 - 1];
            }
        }
        else if (group1 == this.PK_GROUP_2) {
            if (isSixteen) {
                if (sys.kfPlayer8List[group2 - 1])
                    return sys.kfPlayer8List[group2 - 1];
                else
                    return this.findLastDt(group2, sys.kfPlayer16List);
            }
            else {
                if (sys.kfPlayer32List.slice(idx * 4, idx * 4 + 4)[group2 - 1])
                    return sys.kfPlayer32List.slice(idx * 4, idx * 4 + 4)[group2 - 1];
                else
                    return this.findLastDt(group2, sys.kfPlayer64List.slice(idx * 8, idx * 8 + 8));
            }
        }
        else if (group1 == this.PK_GROUP_3) {
            if (isSixteen) {
                if (sys.kfPlayer4List[group2 - 1])
                    return sys.kfPlayer4List[group2 - 1];
                else
                    return this.findLastDt(group2, sys.kfPlayer8List);
            }
            else {
                if (sys.kfPlayer16List.slice(idx * 2, idx * 2 + 2)[group2 - 1])
                    return sys.kfPlayer16List.slice(idx * 2, idx * 2 + 2)[group2 - 1];
                else
                    return this.findLastDt(group2, sys.kfPlayer32List.slice(idx * 4, idx * 4 + 4));
            }
        }
        else {
            if (sys.kfPlayer2Data)
                return sys.kfPlayer2Data;
            else
                return this.findLastDt(group2, sys.kfPlayer4List);
        }
    };
    PeakedHelp.findLastDt = function (ix, list) {
        if (list && list[(ix - 1) * 2 + 1]) {
            var aid = list[(ix - 1) * 2 >> 0].winId;
            var bid = list[(ix - 1) * 2 + 1 >> 0].winId;
            var dt = new PeakPlayerData();
            dt.playerList = [];
            dt.playerList.push(this.findPlayerDtById(aid));
            dt.playerList.push(this.findPlayerDtById(bid));
            dt.reportList = [];
            return dt;
        }
        else
            return null;
    };
    PeakedHelp.findPlayerDtById = function (id, list) {
        if (!list) {
            if (PeakedSys.ins().isKf()) {
                list = PeakedSys.ins().kfPlayer64List;
            }
            else {
                list = PeakedSys.ins().player16List;
            }
        }
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var playerData = list_1[_i];
            for (var _a = 0, _b = playerData.playerList; _a < _b.length; _a++) {
                var data = _b[_a];
                if (id == data.roleId)
                    return data;
            }
        }
    };
    PeakedHelp.checkIsWinById = function (id, status, list) {
        if (!list) {
            if (PeakedSys.ins().isKf()) {
                list = PeakedHelp.getPlayerListByStage(status);
            }
            else {
                list = PeakedHelp.getPlayerListByStage(status);
            }
        }
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var data = list_2[_i];
            if (id == data.winId)
                return true;
        }
        return false;
    };
    PeakedHelp.getPlayerListByStage = function (curStatus) {
        if (PeakedSys.ins().isKf()) {
            switch (curStatus) {
                case KF_PeakStatus.Knockout:
                case KF_PeakStatus.Prom64:
                    return PeakedSys.ins().kfPlayer64List;
                case KF_PeakStatus.Prom32:
                    return PeakedSys.ins().kfPlayer32List;
                case KF_PeakStatus.Prom16:
                    return PeakedSys.ins().kfPlayer16List;
                case KF_PeakStatus.Prom8:
                    return PeakedSys.ins().kfPlayer8List;
                case KF_PeakStatus.Prom4:
                    return PeakedSys.ins().kfPlayer4List;
                case KF_PeakStatus.Finals:
                    return [PeakedSys.ins().kfPlayer2Data];
            }
        }
        else {
            switch (curStatus) {
                case BF_PeakStatus.Prom16:
                case BF_PeakStatus.Knockout:
                    return PeakedSys.ins().player16List;
                case BF_PeakStatus.Prom8:
                    return PeakedSys.ins().player8List;
                case BF_PeakStatus.Prom4:
                    return PeakedSys.ins().player4List;
                case BF_PeakStatus.Finals:
                    return [PeakedSys.ins().player2Data];
            }
        }
    };
    PeakedHelp.countMyRecordData = function () {
        var prm16 = PeakedSys.ins().player16List;
        var prm8 = PeakedSys.ins().player8List;
        var prm4 = PeakedSys.ins().player4List;
        var prm2 = PeakedSys.ins().player2Data;
        var collectReport = function (pkPlayerData, tReportList, stateType) {
            var n = pkPlayerData.playerList.length;
            for (var i = 0; i < n; i++) {
                var pdt = pkPlayerData.playerList[i];
                if (pdt.roleId == Actor.actorID) {
                    var enemyName = n > 1 ? pkPlayerData.playerList[i == 0 ? 1 : 0].playerName : "轮空";
                    if (pkPlayerData.reportList.length == 0 && !pkPlayerData.playerList[1] && stateType < PeakedSys.ins().bfStatus) {
                        var reportData = new PeakBattleReportData();
                        reportData.stateType = stateType;
                        reportData.playerName = enemyName;
                        reportData.result = 1;
                        reportData.round = 0;
                        tReportList.push(reportData);
                    }
                    else {
                        var round = 0;
                        for (var _i = 0, _a = pkPlayerData.reportList; _i < _a.length; _i++) {
                            var pId = _a[_i];
                            var reportData = new PeakBattleReportData();
                            reportData.stateType = stateType;
                            reportData.playerName = enemyName;
                            reportData.result = pId == Actor.actorID ? 1 : 0;
                            reportData.round = ++round;
                            tReportList.push(reportData);
                        }
                    }
                    break;
                }
            }
        };
        var dtList = [];
        for (var _i = 0, prm16_1 = prm16; _i < prm16_1.length; _i++) {
            var pData = prm16_1[_i];
            collectReport(pData, dtList, BF_PeakStatus.Prom16);
        }
        for (var _a = 0, prm8_1 = prm8; _a < prm8_1.length; _a++) {
            var pData = prm8_1[_a];
            collectReport(pData, dtList, BF_PeakStatus.Prom8);
        }
        for (var _b = 0, prm4_1 = prm4; _b < prm4_1.length; _b++) {
            var pData = prm4_1[_b];
            collectReport(pData, dtList, BF_PeakStatus.Prom4);
        }
        collectReport(prm2, dtList, BF_PeakStatus.Finals);
        return dtList;
    };
    PeakedHelp.countKFMyRecordData = function () {
        var prm64 = PeakedSys.ins().kfPlayer64List;
        var prm32 = PeakedSys.ins().kfPlayer32List;
        var prm16 = PeakedSys.ins().kfPlayer16List;
        var prm8 = PeakedSys.ins().kfPlayer8List;
        var prm4 = PeakedSys.ins().kfPlayer4List;
        var prm2 = PeakedSys.ins().kfPlayer2Data;
        var collectReport = function (pkPlayerData, tReportList, stateType) {
            var n = pkPlayerData.playerList.length;
            for (var i = 0; i < n; i++) {
                var pdt = pkPlayerData.playerList[i];
                if (pdt.roleId == Actor.actorID) {
                    var enemyName = n > 1 ? pkPlayerData.playerList[i == 0 ? 1 : 0].playerName : "轮空";
                    if (pkPlayerData.reportList.length == 0 && !pkPlayerData.playerList[1] && stateType < PeakedSys.ins().kfStatus) {
                        var reportData = new PeakBattleReportData();
                        reportData.stateType = stateType;
                        reportData.playerName = enemyName;
                        reportData.result = 1;
                        reportData.round = 0;
                        tReportList.push(reportData);
                    }
                    else {
                        var round = 0;
                        for (var _i = 0, _a = pkPlayerData.reportList; _i < _a.length; _i++) {
                            var pId = _a[_i];
                            var reportData = new PeakBattleReportData();
                            reportData.stateType = stateType;
                            reportData.playerName = enemyName;
                            reportData.result = pId == Actor.actorID ? 1 : 0;
                            reportData.round = ++round;
                            tReportList.push(reportData);
                        }
                    }
                    break;
                }
            }
        };
        var dtList = [];
        for (var _i = 0, prm64_1 = prm64; _i < prm64_1.length; _i++) {
            var pData = prm64_1[_i];
            collectReport(pData, dtList, KF_PeakStatus.Prom64);
        }
        for (var _a = 0, prm32_1 = prm32; _a < prm32_1.length; _a++) {
            var pData = prm32_1[_a];
            collectReport(pData, dtList, KF_PeakStatus.Prom32);
        }
        for (var _b = 0, prm16_2 = prm16; _b < prm16_2.length; _b++) {
            var pData = prm16_2[_b];
            collectReport(pData, dtList, KF_PeakStatus.Prom16);
        }
        for (var _c = 0, prm8_2 = prm8; _c < prm8_2.length; _c++) {
            var pData = prm8_2[_c];
            collectReport(pData, dtList, KF_PeakStatus.Prom8);
        }
        for (var _d = 0, prm4_2 = prm4; _d < prm4_2.length; _d++) {
            var pData = prm4_2[_d];
            collectReport(pData, dtList, KF_PeakStatus.Prom4);
        }
        collectReport(prm2, dtList, KF_PeakStatus.Finals);
        return dtList;
    };
    PeakedHelp.findBetInfoById = function (id, status, betInfoList) {
        if (!betInfoList) {
            var isKF = PeakedSys.ins().isKf();
            betInfoList = isKF ? PeakedSys.ins().kfBetInfo : PeakedSys.ins().betInfo;
        }
        if (!betInfoList)
            return null;
        for (var _i = 0, betInfoList_1 = betInfoList; _i < betInfoList_1.length; _i++) {
            var info = betInfoList_1[_i];
            if (info.playerId == id && info.status == status)
                return info;
        }
        return null;
    };
    PeakedHelp.getStatusByGroup = function (group) {
        if (PeakedSys.ins().isKf()) {
            if (PeakedSys.ins().isKFSixteen()) {
                switch (group) {
                    case this.PK_GROUP_1:
                        return KF_PeakStatus.Prom16;
                    case this.PK_GROUP_2:
                        return KF_PeakStatus.Prom8;
                    case this.PK_GROUP_3:
                        return KF_PeakStatus.Prom4;
                    case this.PK_GROUP_4:
                        return KF_PeakStatus.Finals;
                }
            }
            else {
                switch (group) {
                    case this.PK_GROUP_1:
                        return KF_PeakStatus.Prom64;
                    case this.PK_GROUP_2:
                        return KF_PeakStatus.Prom32;
                }
            }
        }
        else {
            switch (group) {
                case this.PK_GROUP_1:
                    return BF_PeakStatus.Prom16;
                case this.PK_GROUP_2:
                    return BF_PeakStatus.Prom8;
                case this.PK_GROUP_3:
                    return BF_PeakStatus.Prom4;
                case this.PK_GROUP_4:
                    return BF_PeakStatus.Finals;
            }
        }
    };
    PeakedHelp.checkIsBet = function (list, group) {
        var groupNum = parseInt(group);
        var isKF = PeakedSys.ins().isKf();
        for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
            var dt = list_3[_i];
            if (!dt)
                continue;
            var betInfo = this.findBetInfoById(dt.roleId, this.getStatusByGroup(parseInt(group)));
            if (betInfo) {
                if (isKF) {
                    if (PeakedSys.ins().isKFSixteen()) {
                        if (groupNum == this.PK_GROUP_1 && betInfo.status == KF_PeakStatus.Prom16)
                            return true;
                        else if (groupNum == this.PK_GROUP_2 && betInfo.status == KF_PeakStatus.Prom8)
                            return true;
                        else if (groupNum == this.PK_GROUP_3 && betInfo.status == KF_PeakStatus.Prom4)
                            return true;
                        else if (groupNum == this.PK_GROUP_4 && betInfo.status == KF_PeakStatus.Finals)
                            return true;
                    }
                    else {
                        if (groupNum == this.PK_GROUP_1 && betInfo.status == KF_PeakStatus.Prom64)
                            return true;
                        else if (groupNum == this.PK_GROUP_2 && betInfo.status == KF_PeakStatus.Prom32)
                            return true;
                    }
                }
                else {
                    if (groupNum == this.PK_GROUP_1 && betInfo.status == BF_PeakStatus.Prom16)
                        return true;
                    else if (groupNum == this.PK_GROUP_2 && betInfo.status == BF_PeakStatus.Prom8)
                        return true;
                    else if (groupNum == this.PK_GROUP_3 && betInfo.status == BF_PeakStatus.Prom4)
                        return true;
                    else if (groupNum == this.PK_GROUP_4 && betInfo.status == BF_PeakStatus.Finals)
                        return true;
                }
            }
        }
        return false;
    };
    PeakedHelp.findPlayerIndexById = function (id, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].roleId == id) {
                return i;
            }
        }
        return -1;
    };
    PeakedHelp.setImgGroupSource = function (group, source) {
        for (var i = 0; i < group.numChildren; i++) {
            var img = group.getChildAt(i);
            if (img)
                img.source = source;
        }
    };
    PeakedHelp.statusIsOver = function (status, isKf) {
        if (isKf) {
            return PeakedSys.ins().kfStatus > status || (PeakedSys.ins().kfStatus == status && PeakedSys.ins().kfStatusIsEnd != 0);
        }
        else {
            return PeakedSys.ins().bfStatus > status || (PeakedSys.ins().bfStatus == status && PeakedSys.ins().bfStatusIsEnd != 0);
        }
    };
    PeakedHelp.statusIsOverByGroup = function (group) {
        var isOver = false;
        if (PeakedSys.ins().isKf()) {
            if (PeakedSys.ins().isKFSixteen()) {
                if (group == this.PK_GROUP_1)
                    isOver = PeakedHelp.statusIsOver(KF_PeakStatus.Prom16, false);
                else if (group == this.PK_GROUP_2)
                    isOver = PeakedHelp.statusIsOver(KF_PeakStatus.Prom8, false);
                else if (group == this.PK_GROUP_3)
                    isOver = PeakedHelp.statusIsOver(KF_PeakStatus.Prom4, false);
                else
                    isOver = PeakedHelp.statusIsOver(KF_PeakStatus.Finals, false);
            }
            else {
                if (group == this.PK_GROUP_1)
                    isOver = PeakedHelp.statusIsOver(KF_PeakStatus.Prom64, false);
                else if (group == this.PK_GROUP_2)
                    isOver = PeakedHelp.statusIsOver(KF_PeakStatus.Prom32, false);
            }
        }
        else {
            if (group == this.PK_GROUP_1)
                isOver = PeakedHelp.statusIsOver(BF_PeakStatus.Prom16, false);
            else if (group == this.PK_GROUP_2)
                isOver = PeakedHelp.statusIsOver(BF_PeakStatus.Prom8, false);
            else if (group == this.PK_GROUP_3)
                isOver = PeakedHelp.statusIsOver(BF_PeakStatus.Prom4, false);
            else
                isOver = PeakedHelp.statusIsOver(BF_PeakStatus.Finals, false);
        }
        return isOver;
    };
    PeakedHelp.pushPlayerList = function (toList, soList, playerList, index) {
        if (toList[index * 2]) {
            var dt = PeakedHelp.findPlayerDtById(toList[index * 2].winId, soList);
            if (dt)
                playerList.push(dt);
        }
        if (toList[index * 2 + 1]) {
            var dt = PeakedHelp.findPlayerDtById(toList[index * 2 + 1].winId, soList);
            if (dt)
                playerList.push(dt);
        }
    };
    PeakedHelp.isSixteenById = function (id) {
        for (var _i = 0, _a = PeakedSys.ins().player16List; _i < _a.length; _i++) {
            var dt = _a[_i];
            if (dt) {
                for (var _b = 0, _c = dt.playerList; _b < _c.length; _b++) {
                    var info = _c[_b];
                    if (info.roleId == id)
                        return true;
                }
            }
        }
        return false;
    };
    PeakedHelp.sortBetFun = function (a, b) {
        if (a.status > b.status)
            return 1;
        else if (a.status < b.status)
            return -1;
        else
            return 0;
    };
    PeakedHelp.findKFGroupById = function (id) {
        var index = 0;
        for (var _i = 0, _a = PeakedSys.ins().kfPlayer64List; _i < _a.length; _i++) {
            var dt = _a[_i];
            for (var _b = 0, _c = dt.playerList; _b < _c.length; _b++) {
                var playInfo = _c[_b];
                if (playInfo.roleId == id) {
                    return index / 16 >> 0;
                }
                index++;
            }
        }
        return -1;
    };
    PeakedHelp.findBetKFGroup = function () {
        var kfStatus = PeakedSys.ins().kfStatus;
        var index = 0;
        for (var _i = 0, _a = PeakedSys.ins().kfBetInfo; _i < _a.length; _i++) {
            var dt = _a[_i];
            if ((dt.status == KF_PeakStatus.Prom64 && kfStatus == KF_PeakStatus.Knockout)
                || (dt.status == KF_PeakStatus.Prom32 && kfStatus == KF_PeakStatus.Prom64)) {
                return this.findKFGroupById(dt.playerId);
            }
        }
        return -1;
    };
    PeakedHelp.canSupport = function () {
        var curT = this.kfStatusTimer[KF_PeakStatus.None] + DateUtils.DAYS_PER_WEEK * DateUtils.SECOND_PER_DAY;
        if (GameServer.serverTime / DateUtils.MS_PER_SECOND > curT && PeakedSys.ins().kfStatus >= KF_PeakStatus.Finals && PeakedSys.ins().kfStatusIsEnd) {
            return false;
        }
        return true;
    };
    PeakedHelp.PK_GROUP_1 = 1;
    PeakedHelp.PK_GROUP_2 = 2;
    PeakedHelp.PK_GROUP_3 = 3;
    PeakedHelp.PK_GROUP_4 = 4;
    return PeakedHelp;
}());
__reflect(PeakedHelp.prototype, "PeakedHelp");
//# sourceMappingURL=PeakedHelp.js.map