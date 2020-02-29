var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ReportData = (function () {
    function ReportData() {
        this.isComplete = false;
        this.httpRequest = new egret.HttpRequest();
        this.httpRequestUrl = [];
    }
    ReportData.getIns = function () {
        this._ins = this._ins || new ReportData();
        return this._ins;
    };
    ReportData.prototype.report = function (str, reportType) {
        return;
        var roleCount = LocationProperty.roleCount;
        reportType = reportType || ReportData.LOAD;
        if (reportType == ReportData.LOAD) {
            if (roleCount != 0)
                return;
        }
        if (reportType == ReportData.ERROR && str == this.lastErrMsg) {
            return;
        }
        this.lastErrMsg = str;
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            ua = "1";
        }
        else if (/android/.test(ua)) {
            ua = "2";
        }
        else
            ua = "0";
        var key = md5.hex_md5(md5.hex_md5(reportType + "027a47eabf1ebcb409b7fe680ff69008"));
        var data = "&data=";
        data += LocationProperty.pfid;
        data += "|" + LocationProperty.srvid;
        data += "|" + LocationProperty.openID;
        data += "|" + reportType;
        data += "|" + str;
        data += "|" + LocationProperty.isnew;
        data += "|" + ua;
        data += "|" + LocationProperty.login_ip;
        data += "|" + DateUtils.getFormatBySecond(Math.floor((GameServer.serverTime || Date.now()) / 1000), 2);
        data += "|" + LocationProperty.appid;
        if (reportType != ReportData.ERROR)
            data += "|" + Actor.level || 1;
        this.reportUrl(LocationProperty.loadurl + "/report?appv=1.0&counter=" + reportType + "&key=" + key + data);
    };
    ReportData.prototype.reportChat = function (str, chatType) {
        if (LocationProperty.isLocation) {
            return;
        }
        var arr = window['getChatControlUrl']();
        var paraUrl = arr
            + "logdate=" + DateUtils.getFormatBySecond(Math.floor((GameServer.serverTime || Date.now()) / 1000), 2)
            + "&actorid=" + LocationProperty.roleID
            + "&user_level=" + Actor.level
            + "&counter=" + str
            + "&value=" + chatType
            + "&kingdom=" + LocationProperty.serverIP
            + "&serverid=" + LocationProperty.srvid;
        this.reportUrl(paraUrl);
    };
    ReportData.prototype.advice = function (str, func, funcThis) {
        UserTips.ins().showTips("提交问题成功！");
        func.call(funcThis);
        var arr = window['getChatControlUrl']();
        var paraUrl = arr
            + "logdate=" + DateUtils.getFormatBySecond(Math.floor((GameServer.serverTime || Date.now()) / 1000), 2)
            + "&actorid=" + LocationProperty.roleID
            + "&user_level=" + Actor.level
            + "&counter=" + str
            + "&value=" + 10
            + "&kingdom=" + LocationProperty.serverIP
            + "&serverid=" + LocationProperty.srvid;
        this.reportUrl(paraUrl);
        return;
        var f = function (v) {
            this.httpRequest.removeEventListener(egret.Event.COMPLETE, f, this);
            var request = v.currentTarget;
            if (request.response == "true" || request.response == "true\n") {
                UserTips.ins().showTips("提交问题成功！");
                func.call(funcThis);
            }
            else
                UserTips.ins().showTips("网络出故障，请重新提交问题！");
        };
        this.httpRequest.addEventListener(egret.Event.COMPLETE, f, this);
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            ua = "1";
        }
        else if (/android/.test(ua)) {
            ua = "2";
        }
        else
            ua = "0";
        var counter = 'gm';
        str = str.replace(/\|/g, '、');
        var data = "&data=";
        data += LocationProperty.pfid;
        data += "|" + LocationProperty.srvid;
        data += "|" + LocationProperty.openID;
        data += "|" + counter;
        data += "|" + str;
        data += "|" + LocationProperty.isnew;
        data += "|" + ua;
        data += "|" + LocationProperty.login_ip;
        data += "|" + DateUtils.getFormatBySecond(Math.floor((GameServer.serverTime || Date.now()) / 1000), 2);
        data += "|" + LocationProperty.appid;
        data += "|" + Actor.level;
        console.log(data);
        this.reportUrl(LocationProperty.loadurl + "/report?appv=1.0&counter=" + counter + "&key=d413074da338f01ab95010fac6f0c81a" + data);
    };
    ReportData.prototype.roleUp = function () {
        window['roleUp'](Actor.actorID, Actor.myName, Actor.level);
    };
    ReportData.prototype.enterGame = function () {
        window['enterGame'](Actor.actorID, Actor.myName, Actor.level);
    };
    ReportData.prototype.createRole = function (roleId) {
        window['createRole'](roleId);
    };
    ReportData.prototype.advice1 = function (str, func, funcThis) {
        UserTips.ins().showTips("提交问题成功！");
        func.call(funcThis);
        return;
        var f = function (v) {
            this.httpRequest.removeEventListener(egret.Event.COMPLETE, f, this);
            var request = v.currentTarget;
            if (request.response == "ok") {
                UserTips.ins().showTips("提交问题成功！");
                func.call(funcThis);
            }
            else
                UserTips.ins().showTips("网络出故障，请重新提交问题！");
        };
        this.httpRequest.addEventListener(egret.Event.COMPLETE, f, this);
        str = str.replace(/@/g, "");
        str = str.replace(/#/g, "");
        var data = "&serverid=" + LocationProperty.srvid;
        data += "&sign=" + md5.hex_md5("" + (LocationProperty.srvid || 0) + Actor.actorID + "enter_reportfeedbackqiyaohudongyule!@#");
        data += "&actorid=" + Actor.actorID;
        data += "&actorname=" + Actor.myName;
        data += "&feedcnt=" + str;
        data += "&openid=" + LocationProperty.openID;
        data += "&userlevel=" + Actor.level;
        data += "&viplevel=" + UserVip.ins().lv;
        data += "&appid=" + LocationProperty.appid;
        this.reportUrl(LocationProperty.loadurl + "/api/load?counter=enter_report" + data);
    };
    ReportData.prototype.reportUrl = function (url, method) {
        var vo = new HrInfo();
        vo.url = url;
        vo.method = method;
        this.httpRequestUrl.push(vo);
        this.sendReportUrl();
    };
    ReportData.prototype.sendReportUrl = function () {
        if (this.isComplete == false && this.httpRequestUrl.length > 0) {
            var url = this.httpRequestUrl[0].url;
            var method = this.httpRequestUrl[0].method;
            this.httpRequest.open(url, method ? method : egret.HttpMethod.GET);
            this.httpRequest.send();
            this.isComplete = true;
            this.httpRequest.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            this.httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        }
    };
    ReportData.prototype.onGetComplete = function (event) {
        this.isComplete = false;
        this.httpRequestUrl.shift();
        this.sendReportUrl();
    };
    ReportData.prototype.onGetIOError = function (event) {
        this.isComplete = false;
        this.sendReportUrl();
    };
    ReportData.LOAD = "load";
    ReportData.GM = "gm";
    ReportData.ERROR = "error";
    return ReportData;
}());
__reflect(ReportData.prototype, "ReportData");
var HrInfo = (function () {
    function HrInfo() {
    }
    return HrInfo;
}());
__reflect(HrInfo.prototype, "HrInfo");
//# sourceMappingURL=ReportData.js.map