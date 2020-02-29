var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.trimSpace = function (str) {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    };
    StringUtils.getStringLength = function (str) {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            }
            else {
                length += 1;
            }
        }
        return length;
    };
    StringUtils.isChinese = function (str) {
        var reg = /^[\u4E00-\u9FA5]+$/;
        if (!reg.test(str)) {
            return true;
        }
        return false;
    };
    StringUtils.strByteLen = function (str) {
        var byteLen = 0;
        var strLen = str.length;
        for (var i = 0; i < strLen; i++) {
            byteLen += str.charCodeAt(i) >= 0x7F ? 2 : 1;
        }
        return byteLen;
    };
    StringUtils.complementByChar = function (str, length, char, ignoreHtml) {
        if (char === void 0) { char = " "; }
        if (ignoreHtml === void 0) { ignoreHtml = true; }
        var byteLen = this.strByteLen(ignoreHtml ? str.replace(StringUtils.HTML, "") : str);
        return str + this.repeatStr(char, length - byteLen);
    };
    StringUtils.repeatStr = function (str, count) {
        var s = "";
        for (var i = 0; i < count; i++) {
            s += str;
        }
        return s;
    };
    StringUtils.addColor = function (content, color) {
        var colorStr;
        if (typeof (color) == "string")
            colorStr = String(color);
        else if (typeof (color) == "number")
            colorStr = Number(color).toString(10);
        return "<font color=\"" + colorStr + "\">" + content + "</font>";
    };
    StringUtils.addColor1 = function (content, color) {
        var obj = new Object;
        obj["style"] = new Object;
        obj["text"] = content;
        obj["textColor"] = Number(color).toString(16);
        return obj;
    };
    StringUtils.substitute = function (str) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var reg = RegExpUtil.REPLACE_STRING;
        var replaceReg = str.match(reg);
        if (replaceReg && replaceReg.length) {
            var len = replaceReg.length;
            for (var t_i = 0; t_i < len; t_i++) {
                str = str.replace(replaceReg[t_i], rest[t_i]);
            }
        }
        return str;
    };
    StringUtils.replaceStr = function (src, tar, des) {
        if (src.indexOf(tar) == -1)
            return src;
        var list = src.split(tar);
        return list[0] + des + list[1];
    };
    StringUtils.replaceStrColor = function (src, color) {
        var tci = src.indexOf("0x");
        var tci2 = tci;
        var arghr2 = "";
        var arghr3 = "";
        while (tci2 != -1) {
            arghr2 = src.substring(tci, tci + 8);
            src = src.replace(arghr2, color);
            tci += 8;
            arghr3 = src.substring(tci);
            tci2 = arghr3.indexOf("0x");
            tci = tci + tci2;
        }
        return src;
    };
    StringUtils.replace = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < args.length; i++) {
            str = str.replace("%s", args[i] + "");
        }
        return str;
    };
    StringUtils.getStrByRegExp = function (src, reg) {
        if (reg === void 0) { reg = /\d+/g; }
        var newStrlist = [];
        var newStr = src.replace(reg, function () {
            newStrlist.push(arguments[0]);
            if (typeof arguments[0] == "number")
                return arguments[0].toString();
            else
                return arguments[0];
        });
        return newStrlist;
    };
    StringUtils.ChineseToNumber = function (chnStr) {
        var rtn = 0;
        var section = 0;
        var number = 0;
        var secUnit = false;
        var str = chnStr.split('');
        for (var i = 0; i < str.length; i++) {
            var num = StringUtils.chnNumCharCN[str[i]];
            if (typeof num !== 'undefined') {
                number = num;
                if (i === str.length - 1) {
                    section += number;
                }
            }
            else {
                var unit = StringUtils.chnNameValueCN[str[i]].value;
                secUnit = StringUtils.chnNameValueCN[str[i]].secUnit;
                if (secUnit) {
                    section = (section + number) * unit;
                    rtn += section;
                    section = 0;
                }
                else {
                    section += (number * unit);
                }
                number = 0;
            }
        }
        return rtn + section;
    };
    StringUtils.NumberToChinese = function (num) {
        var unitPos = 0;
        var strIns = '', chnStr = '';
        var needZero = false;
        var chnNumChar = StringUtils.chnNumChar;
        var chnUnitSection = StringUtils.chnUnitSection;
        if (num === 0) {
            return chnNumChar[0];
        }
        while (num > 0) {
            var section = num % 10000;
            if (needZero) {
                chnStr = chnNumChar[0] + chnStr;
            }
            strIns = StringUtils.SectionToChinese(section);
            strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
            chnStr = strIns + chnStr;
            needZero = (section < 1000) && (section > 0);
            num = Math.floor(num / 10000);
            unitPos++;
        }
        return chnStr;
    };
    StringUtils.SectionToChinese = function (section) {
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        var chnNumChar = StringUtils.chnNumChar;
        var chnUnitChar = StringUtils.chnUnitChar;
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            }
            else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    };
    StringUtils.HTML = /<[^>]+>/g;
    StringUtils.chnNumCharCN = {
        "零": 0,
        "一": 1,
        "二": 2,
        "三": 3,
        "四": 4,
        "五": 5,
        "六": 6,
        "七": 7,
        "八": 8,
        "九": 9
    };
    StringUtils.chnNameValueCN = {
        "十": { value: 10, secUnit: false },
        "百": { value: 100, secUnit: false },
        "千": { value: 1000, secUnit: false },
        "万": { value: 10000, secUnit: true },
        "亿": { value: 100000000, secUnit: true }
    };
    StringUtils.chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    StringUtils.chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    StringUtils.chnUnitChar = ["", "十", "百", "千"];
    return StringUtils;
}());
__reflect(StringUtils.prototype, "StringUtils");
//# sourceMappingURL=StringUtils.js.map