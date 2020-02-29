var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PeakedData = (function () {
    function PeakedData() {
    }
    PeakedData.STATE_TYPE_CN = ["", "", "", "16\u8FDB8\u5F3A", "8\u8FDB4\u5F3A", "\u534A\u51B3\u8D5B", "\u51B3\u8D5B", ""];
    PeakedData.STATE_TYPE_AWARD_CN = ["", "", "\u53C2\u4E0E\u5956", "16\u5F3A", "8\u5F3A", "4\u5F3A", "\u4E9A\u519B", "\u51A0\u519B"];
    PeakedData.STATE_ICON_CN = ["", "\u62A5\u540D", "\u6DD8\u6C70\u8D5B", "8\u5F3A\u8D5B", "4\u5F3A\u8D5B", "\u534A\u51B3\u8D5B", "\u51B3\u8D5B", "\u8DE8\u670D\u8D5B"];
    PeakedData.STATE_KF_TYPE_CN = ["", "", "64\u8FDB32\u5F3A", "32\u8FDB16\u5F3A", "16\u8FDB8\u5F3A", "8\u8FDB4\u5F3A", "\u534A\u51B3\u8D5B", "\u51B3\u8D5B", ""];
    PeakedData.STATE_KF_TYPE_AWARD_CN = ["", "\u53C2\u4E0E\u5956", "64\u5F3A", "32\u5F3A", "16\u5F3A", "8\u5F3A", "4\u5F3A", "\u4E9A\u519B", "\u51A0\u519B"];
    PeakedData.STATE_KF_ICON_CN = ["\u8DE8\u670D\u8D5B", "\u6DD8\u6C70\u8D5B", "32\u5F3A\u8D5B", "16\u5F3A\u8D5B", "8\u5F3A\u8D5B", "4\u5F3A\u8D5B", "\u534A\u51B3\u8D5B", "\u51B3\u8D5B"];
    PeakedData.SERV_CN = ["\u672C\u670D\u8D5B", "\u8DE8\u670D\u8D5B"];
    return PeakedData;
}());
__reflect(PeakedData.prototype, "PeakedData");
var PeakPlayerData = (function () {
    function PeakPlayerData(bytes) {
        if (bytes)
            this.readBaseData(bytes);
    }
    PeakPlayerData.prototype.readBaseData = function (bytes, isKF) {
        if (isKF === void 0) { isKF = false; }
        var count = bytes.readByte();
        this.playerList = [];
        for (var i = 0; i < count; i++) {
            var info = new PeakPlayerInfo();
            if (isKF)
                info.readKFData(bytes);
            else
                info.readData(bytes);
            this.playerList.push(info);
        }
        this.winId = bytes.readInt();
        count = bytes.readByte();
        this.reportList = [];
        for (var i = 0; i < count; i++) {
            this.reportList.push(bytes.readInt());
        }
    };
    PeakPlayerData.prototype.readToData = function (bytes) {
        this.winId = bytes.readInt();
        var count = bytes.readByte();
        this.reportList = [];
        for (var i = 0; i < count; i++) {
            this.reportList.push(bytes.readInt());
        }
    };
    return PeakPlayerData;
}());
__reflect(PeakPlayerData.prototype, "PeakPlayerData");
var PeakPlayerInfo = (function () {
    function PeakPlayerInfo(bytes) {
        this.serverId = 0;
        if (bytes)
            this.readData(bytes);
    }
    PeakPlayerInfo.prototype.readData = function (bytes) {
        this.roleId = bytes.readInt();
        this.playerName = bytes.readString();
        this.job = bytes.readByte();
        this.sex = bytes.readByte();
        this.pos = bytes.readByte();
    };
    PeakPlayerInfo.prototype.readKFData = function (bytes) {
        this.roleId = bytes.readInt();
        this.serverId = bytes.readInt();
        this.playerName = bytes.readString();
        this.job = bytes.readByte();
        this.sex = bytes.readByte();
        this.pos = bytes.readByte();
    };
    return PeakPlayerInfo;
}());
__reflect(PeakPlayerInfo.prototype, "PeakPlayerInfo");
var PeakTopRankData = (function () {
    function PeakTopRankData(bytes) {
        if (bytes)
            this.readData(bytes);
    }
    PeakTopRankData.prototype.readData = function (bytes) {
        this.playerId = bytes.readInt();
        this.playerName = bytes.readString();
        this.servId = bytes.readInt();
        this.likeNum = bytes.readInt();
    };
    return PeakTopRankData;
}());
__reflect(PeakTopRankData.prototype, "PeakTopRankData");
var PeakBetData = (function () {
    function PeakBetData(bytes) {
        if (bytes)
            this.readData(bytes);
    }
    PeakBetData.prototype.readData = function (bytes) {
        this.status = bytes.readByte();
        this.playerId = bytes.readInt();
        this.batNum = bytes.readInt();
    };
    return PeakBetData;
}());
__reflect(PeakBetData.prototype, "PeakBetData");
var PeakBattleReportData = (function () {
    function PeakBattleReportData() {
    }
    return PeakBattleReportData;
}());
__reflect(PeakBattleReportData.prototype, "PeakBattleReportData");
var KonckReportData = (function () {
    function KonckReportData() {
    }
    KonckReportData.prototype.readBFData = function (bytes) {
        this.id = bytes.readInt();
        this.player = bytes.readString();
        this.result = bytes.readByte();
    };
    KonckReportData.prototype.readKFData = function (bytes) {
        this.id = bytes.readInt();
        this.player = bytes.readString();
        this.servId = bytes.readInt();
        this.result = bytes.readByte();
    };
    return KonckReportData;
}());
__reflect(KonckReportData.prototype, "KonckReportData");
var BF_PeakStatus;
(function (BF_PeakStatus) {
    BF_PeakStatus[BF_PeakStatus["None"] = 0] = "None";
    BF_PeakStatus[BF_PeakStatus["SignUp"] = 1] = "SignUp";
    BF_PeakStatus[BF_PeakStatus["Knockout"] = 2] = "Knockout";
    BF_PeakStatus[BF_PeakStatus["Prom16"] = 3] = "Prom16";
    BF_PeakStatus[BF_PeakStatus["Prom8"] = 4] = "Prom8";
    BF_PeakStatus[BF_PeakStatus["Prom4"] = 5] = "Prom4";
    BF_PeakStatus[BF_PeakStatus["Finals"] = 6] = "Finals";
    BF_PeakStatus[BF_PeakStatus["Over"] = 7] = "Over";
})(BF_PeakStatus || (BF_PeakStatus = {}));
var KF_PeakStatus;
(function (KF_PeakStatus) {
    KF_PeakStatus[KF_PeakStatus["None"] = 0] = "None";
    KF_PeakStatus[KF_PeakStatus["Knockout"] = 1] = "Knockout";
    KF_PeakStatus[KF_PeakStatus["Prom64"] = 2] = "Prom64";
    KF_PeakStatus[KF_PeakStatus["Prom32"] = 3] = "Prom32";
    KF_PeakStatus[KF_PeakStatus["Prom16"] = 4] = "Prom16";
    KF_PeakStatus[KF_PeakStatus["Prom8"] = 5] = "Prom8";
    KF_PeakStatus[KF_PeakStatus["Prom4"] = 6] = "Prom4";
    KF_PeakStatus[KF_PeakStatus["Finals"] = 7] = "Finals";
    KF_PeakStatus[KF_PeakStatus["Over"] = 8] = "Over";
})(KF_PeakStatus || (KF_PeakStatus = {}));
//# sourceMappingURL=PeakedData.js.map