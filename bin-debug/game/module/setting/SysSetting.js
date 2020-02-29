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
var SysSetting = (function (_super) {
    __extends(SysSetting, _super);
    function SysSetting() {
        var _this = _super.call(this) || this;
        _this._storage = {};
        _this._tempStorage = {};
        _this.defaultValue = {
            sound_effect: 1,
            shake_win: 1,
            auto_heji: 0,
            dice: 0
        };
        _this.init();
        return _this;
    }
    SysSetting.ins = function () {
        return _super.ins.call(this);
    };
    SysSetting.prototype.setItem = function (key, value) {
        if (this._storage[key] != value) {
            this._storage[key] = value;
            if (key == SysSetting.SOUND_EFFECT) {
                SoundManager.ins().setEffectOn(this.getBool(key));
            }
            else if (key == SysSetting.SHAKE_WIN) {
                DisplayUtils.setShakeOn(this.getBool(key));
            }
            else if (key == SysSetting.DICE) {
                Millionaire.ins().autoTurnDice = value;
            }
            if (!TimerManager.ins().isExists(this.storage, this)) {
                TimerManager.ins().doNext(this.storage, this);
            }
        }
    };
    SysSetting.prototype.getItem = function (key) {
        return this._storage[key];
    };
    SysSetting.prototype.setBool = function (key, b) {
        this.setItem(key, b ? 1 : 0);
    };
    SysSetting.prototype.getBool = function (key) {
        return !!this.getItem(key);
    };
    SysSetting.prototype.setValue = function (key, value) {
        this._tempStorage[key] = value;
    };
    SysSetting.prototype.getValue = function (key) {
        return this._tempStorage[key];
    };
    SysSetting.prototype.init = function () {
        try {
            var str = egret.localStorage.getItem(this.getStorageKey());
            if (str) {
                this._storage = JSON.parse(str) || {};
            }
            else {
                this._storage = {};
            }
        }
        catch (e) {
            console.log(e);
            this._storage = {};
        }
        this.initValue();
    };
    SysSetting.prototype.initValue = function () {
        for (var key in this.defaultValue) {
            if (this._storage[key] == undefined) {
                this._storage[key] = this.defaultValue[key];
            }
        }
        SoundManager.ins().setEffectOn(this.getBool(SysSetting.SOUND_EFFECT));
        DisplayUtils.setShakeOn(this.getBool(SysSetting.SHAKE_WIN));
    };
    SysSetting.prototype.storage = function () {
        try {
            var str = JSON.stringify(this._storage);
            egret.localStorage.setItem(this.getStorageKey(), str);
        }
        catch (e) {
        }
    };
    SysSetting.prototype.getStorageKey = function () {
        return (Actor.actorID + "") || "game_longlin";
    };
    SysSetting.SOUND_EFFECT = "sound_effect";
    SysSetting.SHAKE_WIN = "shake_win";
    SysSetting.AUTO_HEJI = "auto_heji";
    SysSetting.DICE = "dice";
    return SysSetting;
}(BaseClass));
__reflect(SysSetting.prototype, "SysSetting");
var GameSystem;
(function (GameSystem) {
    GameSystem.syssetting = SysSetting.ins.bind(Setting);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=SysSetting.js.map