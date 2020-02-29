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
var RuneConfigMgr = (function (_super) {
    __extends(RuneConfigMgr, _super);
    function RuneConfigMgr() {
        var _this = _super.call(this) || this;
        _this.exchangeList = [];
        return _this;
    }
    RuneConfigMgr.ins = function () {
        return _super.ins.call(this);
    };
    RuneConfigMgr.prototype.getBaseCfg = function (item, next) {
        if (next === void 0) { next = false; }
        var runeBaseConfigs = GlobalConfig.RuneBaseConfig;
        if (Assert(runeBaseConfigs, "RuneBaseConfigs is null"))
            return null;
        var id = next ? item.configID + 1 : item.configID;
        return runeBaseConfigs[id];
    };
    RuneConfigMgr.prototype.getBaseCfgByItemConfig = function (item) {
        var runeBaseConfigs = GlobalConfig.RuneBaseConfig;
        if (Assert(runeBaseConfigs, "RuneBaseConfigs is null"))
            return null;
        return runeBaseConfigs[item.id];
    };
    RuneConfigMgr.prototype.getConverCfgByItemConfig = function (item) {
        var runeConverConfigs = GlobalConfig.RuneConverConfig;
        if (Assert(runeConverConfigs, "RuneConverConfigs is null"))
            return null;
        return runeConverConfigs[item.configID];
    };
    RuneConfigMgr.prototype.getLockCfg = function (pos) {
        var runeLockPosConfigs = GlobalConfig.RuneLockPosConfig;
        if (Assert(runeLockPosConfigs, "RuneLockPosConfigs is null"))
            return null;
        return runeLockPosConfigs[pos];
    };
    RuneConfigMgr.prototype.getNameCfg = function (type) {
        var runeNameConfigs = GlobalConfig.RuneNameConfig;
        if (Assert(runeNameConfigs, "RuneNameConfigs is null"))
            return null;
        return runeNameConfigs[type];
    };
    RuneConfigMgr.prototype.getOtherCfg = function () {
        var runeOtherConfig = GlobalConfig.RuneOtherConfig;
        if (Assert(runeOtherConfig, "RuneOtherConfig is null"))
            return null;
        return runeOtherConfig;
    };
    RuneConfigMgr.prototype.getcfgAttrData = function (cfg, isName) {
        if (isName === void 0) { isName = true; }
        if (!cfg)
            return "";
        var str = "";
        str += this.getAttrNamesByList(cfg.attr, 0, isName);
        str += this.getAttrNamesByList(cfg.equipAttr, 1, isName);
        str += this.getAttrNamesByList(cfg.exAttr, 2, isName);
        str += this.getAttrNamesByList(cfg.specialAttr, 3, isName);
        return str;
    };
    RuneConfigMgr.prototype.getAttrNamesByList = function (attr, type, isName) {
        var str = "";
        if (!attr || attr.length <= 0)
            return "";
        switch (type) {
            case 0:
                for (var index in attr) {
                    if (attr[index]) {
                        if (isName)
                            str += AttributeData.getAttrStrByType(attr[index].type) + "\n";
                        else
                            str += "+" + attr[index].value + "\n";
                    }
                }
                break;
            case 1:
                for (var index in attr) {
                    if (attr[index]) {
                        if (isName)
                            str += AttributeData.getEEquipAttrStrByType(attr[index].type) + "\n";
                        else
                            str += "+" + attr[index].value + "%\n";
                    }
                }
                break;
            case 2:
                for (var index in attr) {
                    if (attr[index]) {
                        if (isName)
                            str += AttributeData.getExtAttrStrByType(attr[index].type) + "\n";
                        else
                            str += "+" + attr[index].value + "\n";
                    }
                }
                break;
            case 3:
                for (var index in attr) {
                    if (attr[index]) {
                        if (isName)
                            str += (attr[index].type == 1 ? "\u91D1\u5E01" : "\u7ECF\u9A8C") + "\n";
                        else
                            str += "+" + attr[index].value + "%\n";
                    }
                }
                break;
        }
        return str;
    };
    RuneConfigMgr.prototype.getcfgAttrDesc = function (cfg, specialType) {
        if (specialType === void 0) { specialType = false; }
        if (!cfg)
            return "";
        var str = "";
        str += this.getAttrDescByList(cfg.attr, 0, specialType);
        str += this.getAttrDescByList(cfg.equipAttr, 1, specialType);
        str += this.getAttrDescByList(cfg.exAttr, 2, specialType);
        str += this.getAttrDescByList(cfg.specialAttr, 3, specialType);
        if (str.lastIndexOf('\n') == (str.length - 1)) {
            str = str.substring(0, str.length - 1);
        }
        return str;
    };
    RuneConfigMgr.prototype.getAttrDescByList = function (attr, type, specialType) {
        if (specialType === void 0) { specialType = false; }
        var str = "";
        if (!attr || attr.length <= 0)
            return "";
        switch (type) {
            case 0:
                for (var index in attr) {
                    if (attr[index]) {
                        if (specialType) {
                            if (attr[index].type == 5) {
                            }
                            else if (attr[index].type == 6) {
                                str += "\u7269\u9632\u3001\u9B54\u9632 +" + attr[index].value + "\n";
                            }
                            else {
                                str += AttributeData.getAttrNameByAttrbute(attr[index], true, " + ") + "\n";
                            }
                        }
                        else {
                            str += AttributeData.getAttrNameByAttrbute(attr[index], true, " + ") + "\n";
                        }
                    }
                }
                break;
            case 1:
                for (var index in attr) {
                    if (attr[index]) {
                        str += AttributeData.getEEquipAttrStrByType(attr[index].type) + "  +" + attr[index].value + "%\n";
                    }
                }
                break;
            case 2:
                for (var index in attr) {
                    if (attr[index]) {
                        str += AttributeData.getExAttrNameByAttrbute(attr[index], true, " + ") + "\n";
                    }
                }
                break;
            case 3:
                for (var index in attr) {
                    if (attr[index]) {
                        str += (attr[index].type == 1 ? "\u91D1\u5E01" : "\u7ECF\u9A8C") + "  +" + attr[index].value + "%\n";
                    }
                }
                break;
        }
        return str;
    };
    RuneConfigMgr.prototype.getAttrByList = function (attr, type, specialType) {
        if (specialType === void 0) { specialType = false; }
        var str = "";
        if (!attr || attr.length <= 0)
            return "";
        switch (type) {
            case 0:
                for (var index in attr) {
                    if (attr[index]) {
                        str += AttributeData.getAttrNameByAttrbute(attr[index], true, "：", false, 0xF8B141) + "\n";
                    }
                }
                break;
            case 1:
                for (var index in attr) {
                    if (attr[index]) {
                        str += AttributeData.getEEquipAttrStrByType(attr[index].type) + "\uFF1A|C:" + 0xF8B141 + "&T:" + attr[index].value + "%\n";
                    }
                }
                break;
            case 2:
                for (var index in attr) {
                    if (attr[index]) {
                        str += AttributeData.getExAttrNameByAttrbute(attr[index], true, "：", 0xF8B141) + "\n";
                    }
                }
                break;
            case 3:
                for (var index in attr) {
                    if (attr[index]) {
                        str += (attr[index].type == 1 ? "\u91D1\u5E01" : "\u7ECF\u9A8C") + "\uFF1A|C:" + 0xF8B141 + "&T:" + attr[index].value + "%\n";
                    }
                }
                break;
        }
        return str;
    };
    RuneConfigMgr.prototype.getExchangeDataList = function () {
        if (this.exchangeList.length > 0)
            return this.exchangeList;
        var cfg = GlobalConfig.RuneConverConfig;
        for (var key in cfg) {
            this.exchangeList.push(cfg[key]);
        }
        this.exchangeList.sort(this.sortExchange);
        return this.exchangeList;
    };
    RuneConfigMgr.prototype.sortExchange = function (a, b) {
        if (a.checkpoint < b.checkpoint) {
            return -1;
        }
        else if (a.checkpoint > b.checkpoint) {
            return 1;
        }
        return a.id - b.id;
    };
    return RuneConfigMgr;
}(BaseClass));
__reflect(RuneConfigMgr.prototype, "RuneConfigMgr");
//# sourceMappingURL=RuneConfigMgr.js.map