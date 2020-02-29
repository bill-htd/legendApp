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
var Actor = (function (_super) {
    __extends(Actor, _super);
    function Actor() {
        var _this = _super.call(this) || this;
        _this._power = 0;
        _this._gold = 0;
        _this._yb = 0;
        _this._feats = 0;
        _this._togeatter1 = -1;
        _this._togeatter2 = -1;
        _this._weiWang = 0;
        _this._chip = 0;
        _this.sysId = PackageID.Default;
        _this.regNetMsg(1, _this.postInit);
        _this.regNetMsg(7, _this.postExp);
        return _this;
    }
    Actor.ins = function () {
        return _super.ins.call(this);
    };
    Actor.prototype.postExp = function (bytes) {
        var lastLV = this._level;
        this._level = bytes.readInt();
        this._exp = bytes.readInt();
        var exp = bytes.readInt();
        if (lastLV < this._level) {
            this.postLevelChange();
            ReportData.getIns().roleUp();
            var char = EntityManager.ins().getNoDieRole();
            if (!char)
                return;
            var mc = new MovieClip;
            mc.playFile(RES_DIR_EFF + "levelUpEffect", 1);
            char.addChild(mc);
        }
        return exp;
    };
    Actor.prototype.postInit = function (bytes) {
        Actor.handle = bytes.readDouble();
        Actor.actorID = bytes.readInt();
        GameServer.serverID = bytes.readInt();
        this.postNameChange(bytes.readUTFBytes(33));
        this._level = bytes.readInt();
        this._exp = bytes.readInt();
        bytes.readDouble();
        this.postGoldChange(bytes.readNumber());
        this.postYbChange(bytes.readNumber());
        UserVip.ins().lv = bytes.readInt();
        this.postSoulChange(bytes.readNumber());
        UserBag.ins().bagNum = bytes.readInt();
        this.postFeatsChange(bytes.readNumber());
        Actor.runeShatter = bytes.readNumber();
        Actor.runeExchange = bytes.readNumber();
        this.postUpdateTogeatter(bytes.readNumber(), 1);
        this.postUpdateTogeatter(bytes.readNumber(), 2);
        this.postWeiWang(bytes.readInt());
        SysSetting.ins().init();
        ReportData.getIns().enterGame();
    };
    Actor.prototype.postNameChange = function (value) {
        if (this._myName != value) {
            this._myName = value;
        }
    };
    Actor.prototype.postGoldChange = function (value) {
        if (this._gold != value) {
            if (this._gold > 0) {
                var addGold = value - this._gold;
                if (addGold > 0) {
                    var str = "|C:0xffd93f&T:\u91D1\u5E01  +" + addGold + "|";
                    UserTips.ins().showTips(str);
                }
            }
            this._gold = value;
        }
    };
    Actor.prototype.postYbChange = function (value) {
        if (this._yb != value) {
            if (this._yb > 0) {
                var addYB = value - this._yb;
                if (addYB > 0) {
                    var str = "|C:0xffd93f&T:\u5143\u5B9D  +" + addYB + "|";
                    UserTips.ins().showTips(str);
                }
            }
            this._yb = value;
        }
    };
    Actor.prototype.postFeatsChange = function (value) {
        if (this._feats != value) {
            if (this._feats > 0) {
                var u64 = value - this._feats;
                var addFeats = parseInt(u64.toString());
                if (addFeats > 0) {
                    var str = "|C:0xffd93f&T:\u83B7\u5F97" + addFeats + "\u529F\u52CB|";
                    UserTips.ins().showTips(str);
                }
            }
            this._feats = value;
        }
    };
    Actor.prototype.postZsExpChange = function (value) {
        var str = "|C:0x00ff00&T:\u4FEE\u4E3A+" + value + "|";
        UserTips.ins().showTips(str);
    };
    Actor.prototype.postUpdateTogeatter = function (value, type) {
        var oldValue = 0;
        if (type == 1) {
            oldValue = this._togeatter1;
        }
        else {
            oldValue = this._togeatter2;
        }
        if (oldValue != value) {
            if (oldValue != -1) {
                var addValue = value - oldValue;
                if (addValue > 0) {
                    var name_1 = type == 1 ? RewardData.getCurrencyName(MoneyConst.punch1) : RewardData.getCurrencyName(MoneyConst.punch2);
                    var str = "|C:0xffd93f&T:\u83B7\u5F97" + addValue + name_1 + "|";
                    UserTips.ins().showTips(str);
                }
            }
            oldValue = value;
        }
        if (type == 1) {
            this._togeatter1 = oldValue;
        }
        else {
            this._togeatter2 = oldValue;
        }
        return { value: value, type: type };
    };
    Actor.prototype.postLevelChange = function () {
    };
    Actor.prototype.postSoulChange = function (value) {
        if (this._soul > 0) {
            var addSoul = value - this._soul;
            if (addSoul > 0) {
                var str = "\u83B7\u5F97|C:0xd242fb&T:\u7CBE\u70BC\u77F3 x " + addSoul + "|";
                UserTips.ins().showTips(str);
            }
        }
        this._soul = value;
    };
    Actor.prototype.postPowerChange = function (value) {
        if (this._power != value) {
            if (this._power < value && this._power > 0) {
                UserTips.ins().showBoostPower(value, this._power);
            }
            this._power = value;
        }
    };
    Actor.prototype.postWeiWang = function (value) {
        if (this._weiWang > 0 && value - this._weiWang > 0)
            UserTips.ins().showTips("|C:0xff00ff&T:\u83B7\u5F97" + (value - this._weiWang) + RewardData.getCurrencyName(MoneyConst.weiWang) + "|");
        this._weiWang = value;
    };
    Actor.prototype.postChip = function (value) {
        if (this._chip > 0 && value - this._chip > 0)
            UserTips.ins().showTips("|C:0xff00ff&T:\u83B7\u5F97" + (value - this._chip) + RewardData.getCurrencyName(MoneyConst.chip) + "|");
        this._chip = value;
    };
    Actor.canZhuanSheng = function () {
        return this.ins()._level >= this.zhuanShengLv;
    };
    Object.defineProperty(Actor, "level", {
        get: function () {
            return this.ins()._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor, "exp", {
        get: function () {
            return this.ins()._exp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor, "power", {
        get: function () {
            return this.ins()._power;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor, "myName", {
        get: function () {
            return this.ins()._myName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor, "gold", {
        get: function () {
            return this.ins()._gold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor, "yb", {
        get: function () {
            return this.ins()._yb;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor, "soul", {
        get: function () {
            return this.ins()._soul;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor, "feats", {
        get: function () {
            return this.ins()._feats;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor, "togeatter1", {
        get: function () {
            return this.ins()._togeatter1 < 0 ? 0 : this.ins()._togeatter1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor, "togeatter2", {
        get: function () {
            return this.ins()._togeatter2 < 0 ? 0 : this.ins()._togeatter2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor, "samsaraLv", {
        get: function () {
            var data = SamsaraModel.ins().samsaraInfo;
            return data ? data.lv : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor, "weiWang", {
        get: function () {
            return this.ins()._weiWang;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor, "chip", {
        get: function () {
            return this.ins()._chip;
        },
        enumerable: true,
        configurable: true
    });
    Actor.zhuanShengLv = 80;
    Actor.runeShatter = 0;
    Actor.runeExchange = 0;
    return Actor;
}(BaseSystem));
__reflect(Actor.prototype, "Actor");
var GameSystem;
(function (GameSystem) {
    GameSystem.actor = Actor.ins.bind(Actor);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Actor.js.map