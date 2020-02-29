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
var PActivityType3Data = (function (_super) {
    __extends(PActivityType3Data, _super);
    function PActivityType3Data(bytes) {
        var _this = _super.call(this, bytes) || this;
        _this.dabiao = [];
        _this.chongzhiNum = 0;
        _this.chongzhiTotal = 0;
        _this.btn1 = false;
        _this.btn2 = false;
        _this.image1 = false;
        _this.image2 = false;
        _this.updateData(bytes);
        _this.recrod = bytes.readInt();
        return _this;
    }
    PActivityType3Data.prototype.update = function (bytes) {
        _super.prototype.update.call(this, bytes);
        var rewardID = bytes.readShort();
        this.recrod = bytes.readInt();
    };
    PActivityType3Data.prototype.openDay = function () {
        var configs = GlobalConfig['PActivity3Config'][this.id];
        if (configs && configs[0]) {
            return configs[0].day;
        }
        return 7;
    };
    PActivityType3Data.prototype.canReward = function () {
        var configs = GlobalConfig['PActivity3Config'][this.id];
        var records = this.recrod;
        var curIndex = -1;
        var i = 0;
        for (var k in configs) {
            var record = (records >> configs[k].index) & 1;
            if (configs[k].type == 1) {
                if (this.dabiao[i] >= configs[k].day) {
                    if (record == 0)
                        return true;
                }
            }
            else if (configs[k].type == 2 && configs[k].val <= this.chongzhiTotal) {
                if (record == 0)
                    return true;
            }
            else if (configs[k].type == 3 && configs[k].val <= this.chongzhiNum) {
                if (curIndex == -1) {
                    curIndex = this.getCurIndex(3);
                }
                if (curIndex == configs[k].index && record == 0)
                    return true;
            }
            i++;
        }
        return false;
    };
    PActivityType3Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    PActivityType3Data.prototype.updateData = function (bytes) {
        var num = bytes.readShort();
        this.dabiao = [];
        for (var i = 0; i < num; i++) {
            this.dabiao.push(bytes.readShort());
        }
        this.chongzhiNum = bytes.readInt();
        this.chongzhiTotal = bytes.readInt();
    };
    Object.defineProperty(PActivityType3Data.prototype, "day7text", {
        get: function () {
            var configs = GlobalConfig['PActivity3Config'][this.id];
            for (var k in configs) {
                if (configs[k].type == 1) {
                    this.rewards1 = configs[k].rewards;
                    this._day7text = "\u7D2F\u8BA1" + ("<font color='#ffff00'>" + configs[k].day + "</font>") + "\u5929\uFF0C\u6BCF\u65E5\u5145\u503C" + ("<font color='#ffff00'>" + configs[k].val + "</font>") + "\u5143\u5B9D\u53EF\u9886\u53D6";
                }
            }
            return this._day7text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PActivityType3Data.prototype, "totaltext", {
        get: function () {
            var configs = GlobalConfig['PActivity3Config'][this.id];
            for (var k in configs) {
                if (configs[k].type == 2) {
                    this.maxTotal = configs[k].val;
                    this.rewards2 = configs[k].rewards;
                    this._totaltext = "\u6D3B\u52A8\u671F\u95F4\u7D2F\u8BA1\u5145\u503C" + ("<font color='#ffff00'>" + configs[k].val + "</font>") + "\u5143\u5B9D\u53EF\u9886\u53D6";
                }
            }
            return this._totaltext;
        },
        enumerable: true,
        configurable: true
    });
    PActivityType3Data.prototype.canOnlyReward = function () {
        var configs = GlobalConfig['PActivity3Config'][this.id];
        var records = this.recrod;
        this.btn1 = false;
        this.btn2 = false;
        this.image1 = false;
        this.image2 = false;
        for (var k in configs) {
            var record = (records >> configs[k].index) & 1;
            if (configs[k].type == 1 && this.dabiao) {
                if (this.dabiao[0] >= configs[k].day) {
                    if (record == 0)
                        this.btn1 = true;
                    if (record == 1)
                        this.image1 = true;
                }
            }
            if (configs[k].type == 2 && configs[k].val <= this.chongzhiTotal) {
                if (record == 0)
                    this.btn2 = true;
                if (record == 1)
                    this.image2 = true;
            }
        }
    };
    PActivityType3Data.prototype.getDateTime = function (str) {
        var arr = str.split(/[-,.,:]/g);
        var date = new Date(+arr[0], +arr[1] - 1, +arr[2], +arr[3] || 0, +arr[4] || 0);
        return date.getTime();
    };
    PActivityType3Data.prototype.curOpenDay = function () {
        var openTime = Math.floor(GameServer.serverTime - (DateUtils.formatMiniDateTime(this.startTime)) / 1000 / 3600 / 24);
        return openTime;
    };
    PActivityType3Data.prototype.getCurIndex = function (type) {
        var actConfig = GlobalConfig.PActivityConfig[this.id];
        var type3Config = GlobalConfig.PActivity3Config[this.id];
        var day = 0;
        if (this.startTime) {
            day = this.curOpenDay();
        }
        var types = {};
        for (var t in type3Config) {
            types[type3Config[t].type] = 1;
        }
        var keys = Object.keys(types);
        if (keys.length == 1 || type == undefined) {
            type = +keys[0];
        }
        var configArr = [];
        var i;
        for (i in type3Config) {
            if (type3Config[i].type == type) {
                configArr.push(type3Config[i]);
            }
        }
        configArr.sort(function (a, b) {
            if (a.day < b.day)
                return -1;
            return 1;
        });
        for (var _i = 0, configArr_1 = configArr; _i < configArr_1.length; _i++) {
            var conf = configArr_1[_i];
            i = conf.index;
            if (type == 1 || type == 2) {
                if (day < conf.day) {
                    return +i;
                }
            }
            else if (type == 3) {
                if (day < conf.day) {
                    return +i;
                }
            }
        }
        return +i;
    };
    PActivityType3Data.prototype.getLeftTime = function () {
        if (this.endTime) {
            var leftTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
            if (leftTime < 0) {
                leftTime = 0;
            }
            return leftTime;
        }
        return 0;
    };
    PActivityType3Data.prototype.getRewardStateById = function (index) {
        var config = GlobalConfig.PActivity3Config[this.id][index];
        switch (config.showType) {
            case Show3Type.TYPE6:
            case Show3Type.TYPE8:
                if (this.chongzhiTotal < config.val)
                    return Activity.NotReached;
                break;
            case Show3Type.TYPE7:
                if (this.dabiao[index - 1] < config.day)
                    return Activity.NotReached;
                break;
        }
        var record = (this.recrod >> config.index) & 1;
        return record ? Activity.Geted : Activity.CanGet;
    };
    return PActivityType3Data;
}(ActivityBaseData));
__reflect(PActivityType3Data.prototype, "PActivityType3Data");
var PShow1Type;
(function (PShow1Type) {
    PShow1Type[PShow1Type["TYPE1"] = 1] = "TYPE1";
    PShow1Type[PShow1Type["TYPE2"] = 2] = "TYPE2";
    PShow1Type[PShow1Type["TYPE3"] = 3] = "TYPE3";
    PShow1Type[PShow1Type["TYPE4"] = 4] = "TYPE4";
    PShow1Type[PShow1Type["TYPE5"] = 5] = "TYPE5";
    PShow1Type[PShow1Type["TYPE6"] = 6] = "TYPE6";
    PShow1Type[PShow1Type["TYPE7"] = 7] = "TYPE7";
    PShow1Type[PShow1Type["TYPE8"] = 8] = "TYPE8";
})(PShow1Type || (PShow1Type = {}));
//# sourceMappingURL=PActivityType3Data.js.map