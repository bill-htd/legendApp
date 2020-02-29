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
var UserExpGold = (function (_super) {
    __extends(UserExpGold, _super);
    function UserExpGold() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.ExpGold;
        _this.regNetMsg(1, _this.doRemainTimeAndIndex);
        return _this;
    }
    UserExpGold.ins = function () {
        return _super.ins.call(this);
    };
    UserExpGold.prototype.doRemainTimeAndIndex = function (bytes) {
        this.remainTime = bytes.readUnsignedInt();
        this.index = bytes.readInt();
        this.postExpUpdate();
    };
    UserExpGold.prototype.postExpUpdate = function () {
    };
    UserExpGold.prototype.sendBuyExp = function () {
        this.sendBaseProto(2);
    };
    Object.defineProperty(UserExpGold.prototype, "remainTime", {
        get: function () {
            return this._remainTime;
        },
        set: function (value) {
            if (this._remainTime != value) {
                this._remainTime = value;
                TimerManager.ins().remove(this.downTime, this);
                TimerManager.ins().doTimer(1000, this._remainTime, this.downTime, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    UserExpGold.prototype.downTime = function () {
        this._remainTime -= 1;
        if (this._remainTime <= 0) {
            this.postExpUpdate();
        }
    };
    UserExpGold.prototype.getIndexNeedGold = function () {
        return GlobalConfig.RefinesystemExpConfig[this.index].yuanBao;
    };
    UserExpGold.prototype.checkIsOver = function () {
        if (GlobalConfig.RefinesystemExpConfig[this.index]) {
            return false;
        }
        return true;
    };
    UserExpGold.prototype.checkIsCanPlay = function () {
        if (UserVip.ins().lv < 3) {
            UserTips.ins().showTips("|C:0xf3311e&T:vip3可炼制|");
            return;
        }
        var needGold = GlobalConfig.RefinesystemExpConfig[this.index].yuanBao;
        if (Actor.yb >= needGold) {
            UserExpGold.ins().sendBuyExp();
            return;
        }
        UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
        ViewManager.ins().open(ChargeFirstWin);
    };
    UserExpGold.prototype.isOpenBtn = function () {
        if (Actor.level >= 60 && this.remainTime > 0) {
            return !this.checkIsOver();
        }
        return false;
    };
    UserExpGold.prototype.checkUpLevel = function () {
        var cruLevel = Actor.level;
        var getExp = GlobalConfig.RefinesystemExpConfig[this.index].exp;
        var cruNeed = GlobalConfig.ExpConfig[cruLevel].exp - Actor.exp;
        if (getExp >= cruNeed) {
            ++cruLevel;
            getExp -= cruNeed;
            for (cruLevel; cruLevel < 150; cruLevel++) {
                cruNeed = GlobalConfig.ExpConfig[cruLevel].exp;
                if (getExp - cruNeed < 0) {
                    break;
                }
                else {
                    getExp -= cruNeed;
                }
            }
        }
        return cruLevel;
    };
    return UserExpGold;
}(BaseSystem));
__reflect(UserExpGold.prototype, "UserExpGold");
var GameSystem;
(function (GameSystem) {
    GameSystem.userexpgold = UserExpGold.ins.bind(UserExpGold);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserExpGold.js.map