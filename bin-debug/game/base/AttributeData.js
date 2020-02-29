var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AttributeData = (function () {
    function AttributeData(type, value) {
        if (type === void 0) { type = 0; }
        if (value === void 0) { value = 0; }
        this.type = type;
        this.value = value;
    }
    AttributeData.AttrAddition = function (attr1, attr2) {
        if (!attr1 || attr1.length <= 0)
            return attr2 ? attr2.concat() : null;
        if (!attr2 || attr2.length <= 0)
            return attr1 ? attr1.concat() : null;
        var attr = attr1.concat(attr2);
        var newObj = [];
        var len = attr.length;
        var obj = new Object();
        for (var i = 0; i < len; i++) {
            if (obj[attr[i].type] == undefined)
                obj[attr[i].type] = 0;
            obj[attr[i].type] += attr[i].value;
        }
        for (var key in obj)
            newObj.push(new AttributeData((+key), (+obj[key])));
        return newObj;
    };
    AttributeData.AttrDel = function (attr1, attr2) {
        var attr = [];
        for (var i = 0; i < attr1.length; i++) {
            var attrData = new AttributeData();
            attrData.type = attr1[i].type != 0 ? attr1[i].type : attr2[i].type;
            attrData.value = attr1[i].value - attr2[i].value;
            attr.push(attrData);
        }
        return attr;
    };
    AttributeData.AttrMultiply = function (attr1, attr2) {
        var attr = [];
        for (var i = 0; i < attr1.length; i++) {
            var attrData = new AttributeData();
            attrData.type = attr1[i].type != 0 ? attr1[i].type : attr2[i].type;
            attrData.value = attr1[i].value * (1 + attr2[i].value / 10000);
            attr.push(attrData);
        }
        return attr;
    };
    AttributeData.transformAttr = function (attrObj) {
        var attrList = [];
        for (var key in attrObj) {
            var attr = new AttributeData;
            attr.type = attrObj[key].type;
            attr.value = attrObj[key].value;
            attrList.push(attr);
        }
        for (var i = 0; i < attrList.length - 1; i++) {
            for (var j = 0; j < attrList.length - i - 1; j++) {
                if (attrList[j] < attrList[j + 1]) {
                    var temp = attrList[j + 1];
                    attrList[j + 1] = attrList[j];
                    attrList[j] = temp;
                }
            }
        }
        return attrList;
    };
    AttributeData.getAttStr = function (att, intervals, newline, sign, isInserte, isShowAttName, info, endSign) {
        if (intervals === void 0) { intervals = 4; }
        if (newline === void 0) { newline = 1; }
        if (sign === void 0) { sign = "+"; }
        if (isInserte === void 0) { isInserte = false; }
        if (isShowAttName === void 0) { isShowAttName = true; }
        var str = "";
        var space = 0;
        if (att instanceof AttributeData)
            return this.getAttStrByType(att, intervals, sign, isInserte, isShowAttName);
        else if (att instanceof Array) {
            var atts = att;
            var len = atts.length - 1;
            for (var i = 0; i < atts.length; i++) {
                if (atts[i].type == 0)
                    continue;
                if (atts[i].type == AttributeType.atHpEx ||
                    atts[i].type == AttributeType.atAtkEx ||
                    atts[i].type == AttributeType.atDamageReduction ||
                    atts[i].type == AttributeType.atDefEx ||
                    atts[i].type == AttributeType.atResEx) {
                    space = -1;
                    continue;
                }
                str += this.getAttStrByType(atts[i], intervals, sign, isInserte, isShowAttName);
                if (info && info.attr_add) {
                    str += "+" + Math.floor(atts[i].value * (info.attr_add / 100));
                }
                if (endSign)
                    str += endSign;
                if (i < len + space) {
                    for (var j = 0; j < newline; j++)
                        str += "\n";
                }
            }
        }
        else {
            var objAtts = [];
            for (var k in this.translate) {
                if (isNaN(att[k]))
                    continue;
                var a = new AttributeData;
                a.type = parseInt(this.translate[k]);
                a.value = att[k];
                objAtts.push(a);
            }
            return this.getAttStr(objAtts, intervals, newline, sign, isInserte);
        }
        if (space < 0) {
            var index = str.lastIndexOf("\n");
            str = str.substring(0, index);
        }
        return str;
    };
    AttributeData.getAttStr1 = function (att, format) {
        var str = "";
        for (var i = 0; i < att.length; i++) {
            str += this.getAttStrByType1(att[i], format);
            if (i < att.length - 1) {
                str += StringUtils.repeatStr("\n", format.emptyLine + 1);
            }
        }
        return str;
    };
    AttributeData.getAttStrByType1 = function (att, format) {
        var typeName = AttributeData.getAttrStrByType(att.type);
        var type = att.type;
        var sign = format.sign;
        var valueStr = "";
        if (type == AttributeType.atCrit)
            valueStr = (att.value / 100) + "%";
        else if (type == AttributeType.atTogetherHolyDamege || type == AttributeType.atHolyDamege)
            valueStr = att.value.toString();
        else if (type >= AttributeType.atHpEx)
            if (type == AttributeType.atStunTime)
                valueStr = (att.value / 1000) + "秒";
            else if (type == AttributeType.atAtkEx)
                valueStr = (att.value / 100) + "%";
            else if (type == AttributeType.atCritHurt)
                valueStr = (att.value >> 0) + "";
            else
                valueStr = ((att.value / 100) >> 0) + "%";
        else
            valueStr = att.value.toString();
        var str = StringUtils.addColor(typeName + format.sign, format.wordColor);
        if (format.isShowAttName)
            str = StringUtils.complementByChar(str, format.intervals);
        var result = str + StringUtils.addColor(valueStr, format.attrColor);
        return result;
    };
    AttributeData.getAttStrByType = function (att, interval, sign, isInserte, isShowAttName) {
        if (interval === void 0) { interval = 4; }
        if (sign === void 0) { sign = "+"; }
        if (isInserte === void 0) { isInserte = true; }
        if (isShowAttName === void 0) { isShowAttName = true; }
        var str = "";
        if (isShowAttName) {
            if (isInserte) {
                str = StringUtils.complementByChar(AttributeData.getAttrStrByType(att.type), interval * 8);
            }
            else {
                str = AttributeData.getAttrStrByType(att.type);
            }
        }
        switch (att.type) {
            case AttributeType.atCrit:
            case AttributeType.atZhuiMingPro:
                str += sign + (att.value / 100) + "%";
                break;
            case AttributeType.atStunTime:
                str += sign + (att.value / 1000) + "秒";
                break;
            case AttributeType.atJob1HpEx:
            case AttributeType.atJob2HpEx:
            case AttributeType.atJob3HpEx:
            case AttributeType.atHp:
            case AttributeType.atMp:
            case AttributeType.atMaxHp:
            case AttributeType.atMaxMp:
            case AttributeType.atAttack:
            case AttributeType.atDef:
            case AttributeType.atRes:
            case AttributeType.atTough:
            case AttributeType.atMoveSpeed:
            case AttributeType.atAttackSpeed:
            case AttributeType.maxNeiGong:
            case AttributeType.atNeiGongRestore:
            case AttributeType.atJob1AtkEx:
            case AttributeType.atJob2AtkEx:
            case AttributeType.atJob3AtkEx:
            case AttributeType.atJob1DefEx:
            case AttributeType.atJob2DefEx:
            case AttributeType.atJob3DefEx:
            case AttributeType.atJob1ResEx:
            case AttributeType.atJob2ResEx:
            case AttributeType.atJob3ResEx:
            case AttributeType.atHolyDamege:
            case AttributeType.atTogetherHolyDamege:
            case AttributeType.atZhuiMingVal:
            case AttributeType.atCritHurt:
            case AttributeType.atHuiXinDamage:
            case AttributeType.atDeadLyHurt:
            case AttributeType.atDeadLyHurtResist:
            case AttributeType.atCritHurtResist:
            case AttributeType.atHearthDamege:
                str += sign + att.value;
                break;
            default:
                str += sign + ((att.value / 100).toFixed(1)) + "%";
        }
        if (att.type == AttributeType.atYuPeiDeterDam)
            str = "|C:0xFF0000&T:" + str + "|";
        return str;
    };
    AttributeData.getExtAttStrByType = function (att, interval, sign, isInserte, isShowAttName) {
        if (interval === void 0) { interval = 4; }
        if (sign === void 0) { sign = "+"; }
        if (isInserte === void 0) { isInserte = false; }
        if (isShowAttName === void 0) { isShowAttName = true; }
        var str = "";
        if (isShowAttName)
            str = StringUtils.complementByChar(AttributeData.getExtAttrStrByType(att.type), interval * 8);
        if (att.type == ExAttributeType.eatGodBlessRate || att.type == ExAttributeType.eatGodBlessProbability || att.type == ExAttributeType.eatAttackAddHpProbability || att.type == ExAttributeType.eatDeathCurseProbability
            || att.type == ExAttributeType.eatAddWarriorDamageInc || att.type == ExAttributeType.eatAddMageDamageInc || att.type == ExAttributeType.eatAddTaoistDamageInc
            || att.type == ExAttributeType.eatAddToTaoistDamageInc || att.type == ExAttributeType.eatSubWarriorDamageInc || att.type == ExAttributeType.eatSubMageDamageInc
            || att.type == ExAttributeType.eatSubTaoistDamageInc || att.type == ExAttributeType.eatTogetherHitFree || att.type == ExAttributeType.eatMiss
            || att.type == ExAttributeType.eatTogetherHitMonDamageInc || att.type == ExAttributeType.eatTogetherHitRoleDamageInc
            || att.type == ExAttributeType.eatAddToWarriorDamageInc || att.type == ExAttributeType.eatAddToMageDamageInc || att.type == ExAttributeType.eatAddToMageDamageInc
            || att.type == ExAttributeType.eatDeathCurseDamageIncrease)
            str += sign + (att.value / 100) + "%";
        else if (att.type == ExAttributeType.eatDeathCurseTime) {
            str += sign + (att.value / 1000) + "秒";
        }
        else if (att.type == ExAttributeType.eatIgnoreReflect) {
            str += "";
        }
        else
            str += sign + att.value;
        return str;
    };
    AttributeData.inserteBlank = function (str, blankNum, location) {
        if (location === void 0) { location = 1; }
        var strLen = str.length;
        var blank = "";
        while (blankNum--) {
            blank += " ";
        }
        var nStr = "";
        switch (location) {
            case 0:
                nStr = blank + str;
                break;
            case 1:
                nStr = str.slice(0, strLen / 2) + blank + str.slice(strLen / 2);
                break;
            case 2:
                nStr = str + blank;
                break;
        }
        return nStr;
    };
    AttributeData.getAttrInfoByItemData = function (data) {
        var config = GlobalConfig.EquipConfig[data.configID];
        var attrStr = "";
        var type = 0;
        for (var k in this.translate) {
            if (config[k] <= 0)
                continue;
            for (var i = 0; i < data.att.length; i++) {
                type = data.att[i].type;
                if (this.translate[k] == type) {
                    attrStr += AttributeData.getAttrStrByType(type) + ": ";
                    attrStr += config[k] + ' +' + data.att[i].value + "\n";
                }
            }
        }
        return attrStr;
    };
    AttributeData.getAttrStrByType = function (type) {
        var str = "";
        switch (type) {
            case AttributeType.atHp:
                str = "\u5F53\u524D\u751F\u547D";
                break;
            case AttributeType.atMp:
                str = "\u5F53\u524D\u9B54\u6CD5";
                break;
            case AttributeType.atMaxHp:
                str = "\u751F\u547D";
                break;
            case AttributeType.atMaxMp:
                str = "\u9B54\u6CD5";
                break;
            case AttributeType.atAttack:
                str = "\u653B\u51FB";
                break;
            case AttributeType.atDef:
                str = "\u7269\u9632";
                break;
            case AttributeType.atRes:
                str = "\u9B54\u9632";
                break;
            case AttributeType.atCrit:
                str = "\u66B4\u51FB";
                break;
            case AttributeType.atTough:
                str = "\u6297\u66B4";
                break;
            case AttributeType.atMoveSpeed:
                str = "\u79FB\u901F";
                break;
            case AttributeType.atAttackSpeed:
                str = "\u653B\u901F";
                break;
            case AttributeType.atHpEx:
                str = "\u751F\u547D\u52A0\u6210";
                break;
            case AttributeType.atAtkEx:
                str = "\u653B\u51FB\u52A0\u6210";
                break;
            case AttributeType.atStunPower:
                str = "\u9EBB\u75F9\u51E0\u7387";
                break;
            case AttributeType.atStunRes:
                str = "\u9EBB\u75F9\u62B5\u6297";
                break;
            case AttributeType.atStunTime:
                str = "\u9EBB\u75F9\u65F6\u95F4";
                break;
            case AttributeType.atDamageReduction:
                str = "\u4F24\u5BB3\u51CF\u514D";
                break;
            case AttributeType.atCritHurt:
                str = "\u66B4\u51FB\u4F24\u5BB3";
                break;
            case AttributeType.atCritEnhance:
                str = "\u66B4\u51FB\u4F24\u5BB3\u52A0\u5F3A";
                break;
            case AttributeType.atRoleDamageEnhance:
                str = "[\u5168\u6012]\u5BF9\u6240\u6709\u804C\u4E1A\u4F24\u5BB3\u589E\u52A0";
                break;
            case AttributeType.atRoleDamageReduction:
                str = "[\u5168\u5236]\u53D7\u5230\u6240\u6709\u804C\u4E1A\u4F24\u5BB3\u51CF\u5C11";
                break;
            case AttributeType.atDefEx:
                str = "\u7269\u7406\u9632\u5FA1\u767E\u5206\u6BD4";
                break;
            case AttributeType.atResEx:
                str = "\u9B54\u6CD5\u9632\u5FA1\u767E\u5206\u6BD4";
                break;
            case AttributeType.atJob1HpEx:
                str = "\u6218\u58EB\u751F\u547D";
                break;
            case AttributeType.atJob2HpEx:
                str = "\u6CD5\u5E08\u751F\u547D";
                break;
            case AttributeType.atJob3HpEx:
                str = "\u9053\u58EB\u751F\u547D";
                break;
            case AttributeType.atNeiGongRestore:
                str = "\u95F4\u96943\u79D2\u6062\u590D\u5185\u529F\u503C";
                break;
            case AttributeType.cruNeiGong:
                str = "\u5F53\u524D\u5185\u529F\u503C";
                break;
            case AttributeType.maxNeiGong:
                str = "\u5185\u529F\u503C";
                break;
            case AttributeType.neigongAbsorbHurt:
                str = "\u4F24\u5BB3\u5438\u6536";
                break;
            case AttributeType.atJob1AtkEx:
                str = "\u6218\u58EB\u653B\u51FB";
                break;
            case AttributeType.atJob2AtkEx:
                str = "\u6CD5\u5E08\u653B\u51FB";
                break;
            case AttributeType.atJob3AtkEx:
                str = "\u9053\u58EB\u653B\u51FB";
                break;
            case AttributeType.atJob1DefEx:
                str = "\u6218\u58EB\u9632\u5FA1";
                break;
            case AttributeType.atJob2DefEx:
                str = "\u6CD5\u5E08\u9632\u5FA1";
                break;
            case AttributeType.atJob3DefEx:
                str = "\u9053\u58EB\u9632\u5FA1";
                break;
            case AttributeType.atJob1ResEx:
                str = "\u6218\u58EB\u9B54\u9632";
                break;
            case AttributeType.atJob2ResEx:
                str = "\u6CD5\u5E08\u9B54\u9632";
                break;
            case AttributeType.atJob3ResEx:
                str = "\u9053\u58EB\u9B54\u9632";
                break;
            case AttributeType.atYuPeiDeterDam:
                str = "\u5A01\u6151";
                break;
            case AttributeType.atCritEnhanceResist:
                str = "\u66B4\u51FB\u4F24\u5BB3\u51CF\u514D";
                break;
            case AttributeType.atHolyDamege:
                str = "\u795E\u5723\u4F24\u5BB3";
                break;
            case AttributeType.atHolyMaster:
                str = "\u795E\u5723\u7CBE\u901A";
                break;
            case AttributeType.atTogetherHolyDamege:
                str = "\u5408\u51FB\u795E\u5723\u4F24\u5BB3";
                break;
            case AttributeType.atZhuiMingVal:
                str = "\u65E0\u5F71\u4F24\u5BB3";
                break;
            case AttributeType.atHuiXinDamage:
                str = "\u66B4\u51FB\u5F3A\u5EA6";
                break;
            case AttributeType.atNeiGongEx:
                str = "\u5185\u529F\u52A0\u6210";
                break;
            case AttributeType.atDeadLyPro:
                str = "\u81F4\u547D\u4E00\u51FB\u7387";
                break;
            case AttributeType.atDeadLyMaster:
                str = "\u81F4\u547D\u4E00\u51FB\u4F24\u5BB3";
                break;
            case AttributeType.atDeadLyResist:
                str = "\u81F4\u547D\u4E00\u51FB\u4F24\u5BB3\u51CF\u514D";
                break;
            case AttributeType.atBladeMailPer:
                str = "\u53CD\u4F24";
                break;
            case AttributeType.atDefPen:
                str = "\u7269\u9632\u7A7F\u900F";
                break;
            case AttributeType.atResPen:
                str = "\u9B54\u9632\u7A7F\u900F";
                break;
            case AttributeType.atDeadLyHurt:
                str = "\u81F4\u547D\u4E00\u51FB\u4F24\u5BB3";
                break;
            case AttributeType.atDeadLyHurtResist:
                str = "\u81F4\u547D\u4E00\u51FB\u51CF\u514D";
                break;
            case AttributeType.atCritHurtResist:
                str = "\u66B4\u51FB\u4F24\u5BB3\u51CF\u514D";
                break;
            case AttributeType.atHearthDamege:
                str = "\u593A\u547D\u8FFD\u4F24";
                break;
            default:
        }
        return str;
    };
    AttributeData.getExtAttrStrByType = function (type) {
        var str = "";
        switch (type) {
            case ExAttributeType.eatReflectProbability:
                str = "\u53CD\u4F24\u6982\u7387";
                break;
            case ExAttributeType.eatReflectRate:
                str = "\u53CD\u4F24\u6BD4\u7387";
                break;
            case ExAttributeType.eatIgnoreReflect:
                str = "\u653B\u51FB\u65E0\u89C6\u53CD\u4F24\u6548\u679C\uFF0C\u589E\u52A0\u81EA\u8EAB2%\u653B\u51FB\u529B";
                break;
            case ExAttributeType.eatGodBlessProbability:
                str = "\u795E\u4F51\u89E6\u53D1 \u6982\u7387";
                break;
            case ExAttributeType.eatGodBlessRate:
                str = "\u795E\u4F51\u590D\u6D3B\u4E07\u5206\u6BD4";
                break;
            case ExAttributeType.eatDeathCurseProbability:
                str = "\u6B7B\u5492\u89E6\u53D1\u6982\u7387";
                break;
            case ExAttributeType.eatDeathCurseDamageIncrease:
                str = "\u6B7B\u5492\u589E\u52A0\u4F24\u5BB3";
                break;
            case ExAttributeType.eatDeathCurseTime:
                str = "\u6B7B\u5492\u6548\u679C\u5C55\u793A\u65F6\u95F4";
                break;
            case ExAttributeType.eatAllCrit:
                str = "\u66B4\u51FB\u7387";
                break;
            case ExAttributeType.eatAllCritTime:
                str = "AllCrit\u66B4\u51FB\u89E6\u53D1\u540E\uFF0C\u6301\u7EED\u7684\u65F6\u95F4, \u5355\u4F4D:\u79D2";
                break;
            case ExAttributeType.eatBeHitTimesDodge:
                str = "\u53D7\u5230X\u6B21\u653B\u51FB\u65F6\u5FC5\u5B9A\u95EA\u907F";
                break;
            case ExAttributeType.eatAttackTimesCrit:
                str = "\u653B\u51FBX\u6B21\u5FC5\u5B9A\u4EA7\u751F\u66B4\u51FB\uFF08\u66B4\u51FB\uFF09";
                break;
            case ExAttributeType.eatAttackAddHpProbability:
                str = "\u6CBB\u7597\u6212\u6307,\u653B\u51FB\u65F6\u5019\u8865\u8840\u7684\u6982\u7387";
                break;
            case ExAttributeType.eatAttackAddHpValue:
                str = "\u6CBB\u7597\u6212\u6307,\u653B\u51FB\u7684\u65F6\u5019\u8865\u8840\u6570";
                break;
            case ExAttributeType.eatAddToWarriorDamageInc:
                str = "[\u6012\u6218]\u5BF9\u6218\u58EB\u4F24\u5BB3\u589E\u52A0";
                break;
            case ExAttributeType.eatAddToMageDamageInc:
                str = "[\u6012\u6CD5]\u5BF9\u6CD5\u5E08\u4F24\u5BB3\u589E\u52A0";
                break;
            case ExAttributeType.eatAddToTaoistDamageInc:
                str = "[\u6012\u9053]\u5BF9\u9053\u58EB\u4F24\u5BB3\u589E\u52A0";
                break;
            case ExAttributeType.eatSubWarriorDamageInc:
                str = "[\u5236\u6218]\u53D7\u5230\u6218\u58EB\u4F24\u5BB3\u51CF\u5C11";
                break;
            case ExAttributeType.eatSubMageDamageInc:
                str = "[\u5236\u6CD5]\u53D7\u5230\u6CD5\u5E08\u4F24\u5BB3\u51CF\u5C11";
                break;
            case ExAttributeType.eatSubTaoistDamageInc:
                str = "[\u5236\u9053]\u53D7\u5230\u9053\u58EB\u4F24\u5BB3\u51CF\u5C11";
                break;
            case ExAttributeType.eatTogetherHitFree:
                str = "\u5408\u51FB\u53D7\u5230\u7684\u4F24\u5BB3\u51CF\u5C11";
                break;
            case ExAttributeType.eatTogetherHitMonDamageInc:
                str = "\u5408\u51FB\u6280\u80FD\u5BF9\u602A\u7269\u4F24\u5BB3";
                break;
            case ExAttributeType.eatTogetherHitRoleDamageInc:
                str = "\u5408\u51FB\u6280\u80FD\u5BF9\u73A9\u5BB6\u4F24\u5BB3";
                break;
            case ExAttributeType.eatTogetherHitCdSub:
                str = "\u6012\u6C14\u6062\u590D\u901F\u5EA6";
                break;
            case ExAttributeType.eatAdditionalHarm:
                str = "\u4F24\u5BB3\u589E\u52A0\u56FA\u5B9A\u503C";
                break;
            case ExAttributeType.eatReductionHarm:
                str = "\u4F24\u5BB3\u51CF\u514D\u56FA\u5B9A\u503C";
                break;
            case ExAttributeType.eatMiss:
                str = "\u95EA\u907F";
                break;
            case ExAttributeType.eatBaseSkillExArg:
                str = "\u57FA\u7840\u53CA\u80FD\u989D\u5916\u7CFB\u6570\u52A0\u6210";
                break;
            case ExAttributeType.eatMultipleCrit:
                str = "\u591A\u91CD\u66B4\u51FB\u51E0\u7387";
                break;
            case ExAttributeType.eatMultipleCritCoeff:
                str = "\u5E78\u8FD0\u4E00\u51FB\u7684\u4F24\u5BB3\u52A0\u6DF1";
                break;
            case ExAttributeType.atMultipleCritHurt:
                str = "\u5E78\u8FD0\u4E00\u51FB\u7684\u56FA\u5B9A\u4F24\u5BB3\u52A0\u6DF1";
                break;
            case ExAttributeType.eatAddWarriorDamageInc:
                str = "\u6218\u58EB\u4F24\u5BB3";
                break;
            case ExAttributeType.eatAddMageDamageInc:
                str = "\u6CD5\u5E08\u4F24\u5BB3";
                break;
            case ExAttributeType.eatAddTaoistDamageInc:
                str = "\u9053\u58EB\u4F24\u5BB3";
                break;
            case ExAttributeType.eatMultipleCritTime:
                str = "\u5E78\u8FD0\u4E00\u51FB\u7684\u51B7\u5374\u65F6\u95F4";
                break;
            case ExAttributeType.eatAttackAddHpTime:
                str = "\u6CBB\u7597\u6212\u6307,\u653B\u51FB\u7684\u65F6\u5019\u8865\u8840\u7684\u51B7\u5374\u65F6\u95F4";
                break;
            case ExAttributeType.eatHit:
                str = "\u547D\u4E2D";
                break;
            default:
        }
        return str;
    };
    AttributeData.getExAttrNameByAttrbute = function (att, showValue, sign, valueColor) {
        if (showValue === void 0) { showValue = false; }
        if (sign === void 0) { sign = "："; }
        if (valueColor === void 0) { valueColor = undefined; }
        var str = AttributeData.getExtAttrStrByType(att.type);
        var value = "";
        if (showValue) {
            switch (att.type) {
                case ExAttributeType.eatAddWarriorDamageInc:
                case ExAttributeType.eatAddMageDamageInc:
                case ExAttributeType.eatAddTaoistDamageInc:
                case ExAttributeType.eatSubWarriorDamageInc:
                case ExAttributeType.eatSubMageDamageInc:
                case ExAttributeType.eatSubTaoistDamageInc:
                case ExAttributeType.eatTogetherHitFree:
                case ExAttributeType.eatTogetherHitMonDamageInc:
                case ExAttributeType.eatTogetherHitRoleDamageInc:
                case ExAttributeType.eatAllCrit:
                case ExAttributeType.eatHit:
                case ExAttributeType.eatMiss:
                    value = att.value / 100 + "%";
                    break;
                default:
                    value += att.value;
            }
        }
        if (valueColor != undefined) {
            str = "" + str + sign + "|C:" + valueColor + "&T:" + value + "|";
        }
        else {
            str += sign + value;
        }
        return str;
    };
    AttributeData.getEEquipAttrStrByType = function (type) {
        var str = "";
        switch (type) {
            case EquipAddAttrType.EquipSlotType_Weapon:
                str = "\u6B66\u5668\u57FA\u7840\u5C5E\u6027";
                break;
            case EquipAddAttrType.EquipSlotType_Helmet:
                str = "\u5934\u76D4\u57FA\u7840\u5C5E\u6027";
                break;
            case EquipAddAttrType.EquipSlotType_Coat:
                str = "\u8863\u670D\u57FA\u7840\u5C5E\u6027";
                break;
            case EquipAddAttrType.EquipSlotType_Necklace:
                str = "\u9879\u94FE\u57FA\u7840\u5C5E\u6027";
                break;
            case EquipAddAttrType.EquipSlotType_Accessory1:
                str = "\u624B\u956F\u57FA\u7840\u5C5E\u6027";
                break;
            case EquipAddAttrType.EquipSlotType_Accessory2:
                str = "\u8170\u5E26\u57FA\u7840\u5C5E\u6027";
                break;
            case EquipAddAttrType.EquipSlotType_Ring1:
                str = "\u6212\u6307\u57FA\u7840\u5C5E\u6027";
                break;
            case EquipAddAttrType.EquipSlotType_Ring2:
                str = "\u978B\u5B50\u57FA\u7840\u5C5E\u6027";
                break;
        }
        return str;
    };
    AttributeData.getAttrStrAdd = function (attrbute, viplv) {
        var attr = [];
        if (UserVip.ins().lv >= viplv) {
            var num_1 = GlobalConfig.VipConfig[viplv].attrAddition["percent"];
            num_1 = num_1 ? num_1 : 0;
            attrbute.forEach(function (element) {
                var attrdata = new AttributeData();
                attrdata.type = element.type;
                attrdata.value = (element.value * (100 + num_1) / 100) >> 0;
                attr.push(attrdata);
            });
        }
        else
            attr = attrbute;
        return attr;
    };
    AttributeData.getAttrStarAdd = function (attrbute, count) {
        var attr = [];
        attrbute.forEach(function (element) {
            var attrdata = new AttributeData();
            attrdata.type = element.type;
            attrdata.value = (element.value * count) >> 0;
            attr.push(attrdata);
        });
        return attr;
    };
    AttributeData.getAttrNameByAttrbute = function (att, showValue, sign, isInserte, valueColor) {
        if (showValue === void 0) { showValue = false; }
        if (sign === void 0) { sign = "："; }
        if (isInserte === void 0) { isInserte = false; }
        if (valueColor === void 0) { valueColor = undefined; }
        var str = AttributeData.getAttrStrByType(att.type);
        if (isInserte)
            str = AttributeData.inserteBlank(str, 7);
        var value = "";
        if (showValue) {
            switch (att.type) {
                case AttributeType.atCrit:
                case AttributeType.atTough:
                    value = att.value / 100 + "%";
                    break;
                default:
                    value = att.value + "";
            }
        }
        if (valueColor != undefined) {
            str = "" + str + sign + "|C:" + valueColor + "&T:" + value + "|";
        }
        else {
            str += sign + value;
        }
        return str;
    };
    AttributeData.getPercentAttr = function (arrAttr, percent) {
        var newarrAttr = [];
        for (var i = 0; i < arrAttr.length; i++) {
            var attrData = new AttributeData();
            attrData.type = arrAttr[i].type;
            attrData.value = Math.floor(arrAttr[i].value * (1 + percent));
            newarrAttr.push(attrData);
        }
        return newarrAttr;
    };
    AttributeData.getPowerBy = function (arrAttr) {
        if (!arrAttr)
            return 0;
        var power = 0;
        return power;
    };
    AttributeData.sortAttribute = function (a, b) {
        return Algorithm.sortAsc(a.type, b.type);
    };
    AttributeData.copyAttrbute = function (attr) {
        var att = new AttributeData();
        att.type = attr.type;
        att.value = attr.value;
        return att;
    };
    AttributeData.addAttrToList = function (list, ele) {
        if (!list[ele.type]) {
            var newAttr = new AttributeData;
            newAttr.type = ele.type;
            newAttr.value = 0;
            list[ele.type] = newAttr;
        }
        var listItem = list[ele.type];
        listItem.value += ele.value;
    };
    AttributeData.FILTER_EXTDATA_ID = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 35, 37, 38, 39];
    AttributeData.FILTER_BASE_DATA_ID = [18, 20];
    AttributeData.translate = {
        'hp': AttributeType.atMaxHp,
        'atk': AttributeType.atAttack,
        'def': AttributeType.atDef,
        'res': AttributeType.atRes,
        'crit': AttributeType.atCrit,
        'tough': AttributeType.atTough
    };
    AttributeData.exRelate = {
        '2': AttributeType.atHpEx,
        '4': AttributeType.atAtkEx,
        '5': AttributeType.atDefEx,
        '6': AttributeType.atResEx
    };
    return AttributeData;
}());
__reflect(AttributeData.prototype, "AttributeData");
//# sourceMappingURL=AttributeData.js.map