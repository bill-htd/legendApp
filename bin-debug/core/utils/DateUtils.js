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
var DateStyle = (function (_super) {
    __extends(DateStyle, _super);
    function DateStyle(format, from, to, isFormatNum) {
        var _this = _super.call(this) || this;
        _this.format = [];
        _this.from = 0;
        _this.to = 0;
        _this.isFormatNum = false;
        _this.format = format;
        _this.from = from;
        _this.to = to;
        _this.isFormatNum = isFormatNum;
        return _this;
    }
    return DateStyle;
}(BaseClass));
__reflect(DateStyle.prototype, "DateStyle");
var DateUtils = (function () {
    function DateUtils() {
    }
    DateUtils.getFormatTimeByStyle = function (second, style) {
        if (style === void 0) { style = DateUtils.STYLE_1; }
        if (second < 0) {
            second = 0;
            debug.log("输入参数有误!时间为负数:" + second);
        }
        if (style.from > style.to) {
            debug.log("输入参数有误!to参数必须大于等于from参数,请检查style参数的值");
            return "";
        }
        second = second >> 0;
        var result = "";
        for (var i = style.to; i >= style.from; i--) {
            var time = second / this.mul[i];
            var timeStr = "";
            if (i != style.to)
                time = time % this.mod[i];
            if (style.isFormatNum && time < 10)
                timeStr = "0" + (time >> 0).toString();
            else
                timeStr = (time >> 0).toString();
            result += (timeStr + style.format[i]);
        }
        return result;
    };
    DateUtils.getFormatTimeByStyle1 = function (ms, style) {
        if (style === void 0) { style = DateUtils.STYLE_1; }
        return this.getFormatTimeByStyle(ms / this.MS_PER_SECOND);
    };
    DateUtils.formatMiniDateTime = function (mdt) {
        return DateUtils.MINI_DATE_TIME_BASE + (mdt & 0x7FFFFFFF) * DateUtils.MS_PER_SECOND;
    };
    DateUtils.formatServerTime = function (time) {
        return (time - DateUtils.MINI_DATE_TIME_BASE) / DateUtils.MS_PER_SECOND;
    };
    DateUtils.getFormatBySecond = function (second, type, showLength) {
        if (type === void 0) { type = 1; }
        if (showLength === void 0) { showLength = 2; }
        var str = "";
        var ms = second * 1000;
        switch (type) {
            case this.TIME_FORMAT_1:
                str = this.format_1(ms);
                break;
            case this.TIME_FORMAT_2:
                str = this.format_2(ms);
                break;
            case this.TIME_FORMAT_3:
                str = this.format_3(ms);
                break;
            case this.TIME_FORMAT_4:
                str = this.format_4(ms);
                break;
            case this.TIME_FORMAT_5:
                str = this.format_5(ms, showLength);
                break;
            case this.TIME_FORMAT_6:
                str = this.format_6(ms);
                break;
            case this.TIME_FORMAT_7:
                str = this.format_7(ms);
                break;
            case this.TIME_FORMAT_8:
                str = this.format_8(ms);
                break;
            case this.TIME_FORMAT_9:
                str = this.format_9(ms);
                break;
            case this.TIME_FORMAT_10:
                str = this.format_10(ms);
                break;
            case this.TIME_FORMAT_11:
                str = this.format_11(ms);
                break;
            case this.TIME_FORMAT_12:
                str = this.format_12(ms);
                break;
            case this.TIME_FORMAT_13:
                str = this.format_13(ms);
                break;
            case this.TIME_FORMAT_14:
                str = this.format_14(ms);
                break;
            case this.TIME_FORMAT_15:
                str = this.format_15(ms);
                break;
        }
        return str;
    };
    DateUtils.getRenainSecond = function (ms) {
        var tmpDate = ms ? new Date(ms) : new Date();
        var ptime = (DateUtils.getTodayZeroSecond(tmpDate) + 60 * 60 * 24) - tmpDate.getTime() / 1000;
        return ptime.toFixed(0);
    };
    DateUtils.getTodayPassedSecond = function () {
        var tmpDate = new Date();
        var tdyPassTime = ((Date.now() - (new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()).getTime())) / 1000).toFixed(0);
        return parseInt(tdyPassTime);
    };
    DateUtils.getTodayZeroSecond = function (tdate) {
        var tmpDate = tdate ? tdate : new Date();
        return parseInt(((new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()).getTime()) / 1000).toFixed(0));
    };
    DateUtils.showWeekFirstDay = function () {
        var Nowdate = new Date();
        var day = Nowdate.getDay();
        day = day ? day : 7;
        var WeekFirstDay = new Date(Nowdate - (day - 1) * 86400000);
        return WeekFirstDay;
    };
    DateUtils.showWeekLastDay = function () {
        var Nowdate = new Date();
        var WeekFirstDay = DateUtils.showWeekFirstDay();
        var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
        return WeekLastDay;
    };
    DateUtils.calcWeekFirstDay = function () {
        var Nowdate = new Date();
        var curDay = Nowdate.getDay();
        curDay = curDay > 0 ? curDay : 7;
        var difday = 7 - curDay;
        var hours = Nowdate.getHours();
        var minutes = Nowdate.getMinutes();
        var seconds = Nowdate.getSeconds();
        var sum = difday * 86400 * 1000 + 86400 * 1000 - (hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000);
        return new Date(sum);
    };
    DateUtils.format_1 = function (ms) {
        var n = 0;
        var result = "##:##:##";
        n = Math.floor(ms / DateUtils.MS_PER_HOUR);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        if (n)
            ms -= n * DateUtils.MS_PER_HOUR;
        n = Math.floor(ms / DateUtils.MS_PER_MINUTE);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        if (n)
            ms -= n * DateUtils.MS_PER_MINUTE;
        n = Math.floor(ms / 1000);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        return result;
    };
    DateUtils.format_2 = function (ms) {
        var date = new Date(ms);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
    };
    DateUtils.format_3 = function (ms) {
        var str = this.format_1(ms);
        var strArr = str.split(":");
        return strArr[1] + ":" + strArr[2];
    };
    DateUtils.format_4 = function (ms) {
        if (ms < this.MS_PER_HOUR) {
            return Math.floor(ms / this.MS_PER_MINUTE) + "分钟前";
        }
        else if (ms < this.MS_PER_DAY) {
            return Math.floor(ms / this.MS_PER_HOUR) + "小时前";
        }
        else {
            return Math.floor(ms / this.MS_PER_DAY) + "天前";
        }
    };
    DateUtils.format_5 = function (ms, showLength) {
        if (showLength === void 0) { showLength = 2; }
        var result = "";
        var unitStr = ["天", "时", "分", "秒"];
        var arr = [];
        var d = Math.floor(ms / this.MS_PER_DAY);
        arr.push(d);
        ms -= d * this.MS_PER_DAY;
        var h = Math.floor(ms / this.MS_PER_HOUR);
        arr.push(h);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        arr.push(m);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        arr.push(s);
        for (var k in arr) {
            if (arr[k] > 0) {
                result += this.formatTimeNum(arr[k], Number(k)) + unitStr[k];
                showLength--;
                if (showLength <= 0)
                    break;
            }
        }
        return result;
    };
    DateUtils.format_6 = function (ms) {
        var date = new Date(ms);
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return this.formatTimeNum(hours) + ":" + this.formatTimeNum(minute) + ":" + this.formatTimeNum(second);
    };
    DateUtils.format_7 = function (ms) {
        if (ms < this.MS_PER_HOUR) {
            return "<1小时";
        }
        else if (ms < this.MS_PER_DAY) {
            return Math.floor(ms / this.MS_PER_HOUR) + "小时";
        }
        else {
            return Math.floor(ms / this.MS_PER_DAY) + "天";
        }
    };
    DateUtils.format_8 = function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute;
    };
    DateUtils.format_9 = function (ms) {
        var h = Math.floor(ms / this.MS_PER_HOUR);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return h + "小时" + m + "分钟" + s + "秒";
    };
    DateUtils.format_10 = function (ms) {
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return m + "分" + s + "秒";
    };
    DateUtils.format_11 = function (ms) {
        var h = Math.floor(ms / this.MS_PER_HOUR);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return h + "时" + m + "分" + s + "秒";
    };
    DateUtils.format_12 = function (ms) {
        var h = Math.floor(ms / this.MS_PER_HOUR);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return DateUtils.formatTimeNum(h) + ":" + DateUtils.formatTimeNum(m) + ":" + DateUtils.formatTimeNum(s);
    };
    DateUtils.format_13 = function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var week = date.getDay();
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return month + "月" + day + "日(周" + this.WEEK_CN[week] + ") " + DateUtils.formatTimeNum(hours) + ":" + DateUtils.formatTimeNum(minute);
    };
    DateUtils.format_14 = function (time) {
        var date = new Date(time);
        var hours = date.getHours();
        var minute = date.getMinutes();
        return hours + "时" + minute + "分";
    };
    DateUtils.format_15 = function (time) {
        var date = new Date(time);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return DateUtils.formatTimeNum(month) + "-" + DateUtils.formatTimeNum(day) + " " + DateUtils.formatTimeNum(hours) + ":" + DateUtils.formatTimeNum(minute);
    };
    DateUtils.formatTimeNum = function (t, k) {
        return t >= 10 ? t.toString() : (k == 0 ? t.toString() : "0" + t);
    };
    DateUtils.checkTime = function (time, days) {
        var currentDate = new Date().getTime();
        var t = (time > (currentDate + days * this.MS_PER_DAY));
        return t;
    };
    DateUtils.formatFullTime = function (time) {
        var format;
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var weekDay = date.getDay();
        var hour = date.getHours();
        var hourStr;
        if (hour < 10) {
            hourStr = "0" + hour;
        }
        else {
            hourStr = hour.toString();
        }
        var min = date.getMinutes();
        var minStr;
        if (min < 10) {
            minStr = "0" + min;
        }
        else {
            minStr = min.toString();
        }
        var weekDayStr;
        switch (weekDay) {
            case 1:
                weekDayStr = "一";
                break;
            case 2:
                weekDayStr = "二";
                break;
            case 3:
                weekDayStr = "三";
                break;
            case 4:
                weekDayStr = "四";
                break;
            case 5:
                weekDayStr = "五";
                break;
            case 6:
                weekDayStr = "六";
                break;
            case 0:
                weekDayStr = "日";
                break;
        }
        format = year + "年" + month + "月" + day + "日（周" + weekDayStr + "） " + hourStr + ":" + minStr;
        return format;
    };
    DateUtils.formatStrTimeToMs = function (str) {
        var date = new Date();
        var strList = str.split(".");
        date.setFullYear(strList[0]);
        date.setMonth((+strList[1]) - 1);
        var strL2 = strList[2].split("-");
        date.setDate(strL2[0]);
        var strL3 = strL2[1].split(":");
        date.setHours(strL3[0]);
        date.setMinutes(strL3[1]);
        date.setSeconds(0);
        return date.getTime();
    };
    DateUtils.TIME_FORMAT_1 = 1;
    DateUtils.TIME_FORMAT_2 = 2;
    DateUtils.TIME_FORMAT_3 = 3;
    DateUtils.TIME_FORMAT_4 = 4;
    DateUtils.TIME_FORMAT_5 = 5;
    DateUtils.TIME_FORMAT_6 = 6;
    DateUtils.TIME_FORMAT_7 = 7;
    DateUtils.TIME_FORMAT_8 = 8;
    DateUtils.TIME_FORMAT_9 = 9;
    DateUtils.TIME_FORMAT_10 = 10;
    DateUtils.TIME_FORMAT_11 = 11;
    DateUtils.TIME_FORMAT_12 = 12;
    DateUtils.TIME_FORMAT_13 = 13;
    DateUtils.TIME_FORMAT_14 = 14;
    DateUtils.TIME_FORMAT_15 = 15;
    DateUtils.MS_PER_SECOND = 1000;
    DateUtils.MS_PER_MINUTE = 60 * 1000;
    DateUtils.MS_PER_HOUR = 60 * 60 * 1000;
    DateUtils.MS_PER_DAY = 24 * 60 * 60 * 1000;
    DateUtils.SECOND_PER_HOUR = 3600;
    DateUtils.SECOND_PER_DAY = 86400;
    DateUtils.SECOND_PER_MONTH = 2592000;
    DateUtils.SECOND_PER_YEAR = 31104000;
    DateUtils.DAYS_PER_WEEK = 7;
    DateUtils.YEAR_PER_YEAR = 1;
    DateUtils.MONTH_PER_YEAR = 12;
    DateUtils.DAYS_PER_MONTH = 30;
    DateUtils.HOURS_PER_DAY = 24;
    DateUtils.MUNITE_PER_HOUR = 60;
    DateUtils.SECOND_PER_MUNITE = 60;
    DateUtils.SECOND_PER_SECOND = 1;
    DateUtils.SECOND_2010 = 1262275200;
    DateUtils.mod = [DateUtils.SECOND_PER_MUNITE, DateUtils.MUNITE_PER_HOUR, DateUtils.HOURS_PER_DAY, DateUtils.DAYS_PER_MONTH, DateUtils.MONTH_PER_YEAR, DateUtils.YEAR_PER_YEAR];
    DateUtils.mul = [DateUtils.SECOND_PER_SECOND, DateUtils.SECOND_PER_MUNITE, DateUtils.SECOND_PER_HOUR, DateUtils.SECOND_PER_DAY, DateUtils.SECOND_PER_MONTH, DateUtils.SECOND_PER_YEAR];
    DateUtils.MINI_DATE_TIME_BASE = Date.UTC(2010, 0) + new Date().getTimezoneOffset() * DateUtils.MS_PER_MINUTE;
    DateUtils.TIME_ZONE_OFFSET = 8 * DateUtils.MS_PER_HOUR;
    DateUtils.TO_SECOND = 0;
    DateUtils.TO_MINUTE = 1;
    DateUtils.TO_HOUR = 2;
    DateUtils.TO_DAY = 3;
    DateUtils.TO_MONTH = 4;
    DateUtils.TO_YEAR = 5;
    DateUtils.FORMAT_1 = ["秒", "分", "时", "天", "月", "年"];
    DateUtils.FORMAT_2 = [":", ":", ":", ":", ":", ":"];
    DateUtils.WEEK_CN = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
    DateUtils.STYLE_1 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_HOUR, false);
    DateUtils.STYLE_2 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_DAY, false);
    DateUtils.STYLE_3 = new DateStyle(DateUtils.FORMAT_2, DateUtils.TO_SECOND, DateUtils.TO_HOUR, true);
    DateUtils.STYLE_4 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_MINUTE, true);
    return DateUtils;
}());
__reflect(DateUtils.prototype, "DateUtils");
//# sourceMappingURL=DateUtils.js.map