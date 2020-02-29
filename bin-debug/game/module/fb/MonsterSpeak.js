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
var SpeakType;
(function (SpeakType) {
    SpeakType[SpeakType["appear"] = 1] = "appear";
    SpeakType[SpeakType["hit"] = 2] = "hit";
    SpeakType[SpeakType["die"] = 3] = "die";
})(SpeakType || (SpeakType = {}));
var MonsterSpeak = (function (_super) {
    __extends(MonsterSpeak, _super);
    function MonsterSpeak() {
        var _this = _super.call(this) || this;
        _this.speakDic = {};
        _this.observe(GameLogic.ins().postHpChange, function (_a) {
            var target = _a[0], value = _a[1];
            if (GameMap.fubenID != 40001)
                return;
            if (target instanceof CharRole)
                return;
            _this.trigger(target.infoModel.configID, value > 0 ? SpeakType.hit : SpeakType.die);
        });
        return _this;
    }
    MonsterSpeak.ins = function () {
        return _super.ins.call(this);
    };
    MonsterSpeak.prototype.clear = function () {
        this.speakDic = {};
    };
    MonsterSpeak.prototype.trigger = function (monsterID, action) {
        if (this.speakDic[monsterID] && this.speakDic[monsterID][action]) {
            return;
        }
        if (!GlobalConfig.MonsterSpeakConfig)
            return;
        var config = GlobalConfig.MonsterSpeakConfig[monsterID];
        if (config && config[action]) {
            this.postMonsterSpeak(config[action].speak);
            this.speakDic[monsterID] = this.speakDic[monsterID] || {};
            this.speakDic[monsterID][action] = 1;
        }
    };
    MonsterSpeak.prototype.postMonsterSpeak = function (tips) {
        return tips;
    };
    return MonsterSpeak;
}(BaseSystem));
__reflect(MonsterSpeak.prototype, "MonsterSpeak");
var GameSystem;
(function (GameSystem) {
    GameSystem.monsterSpeak = MonsterSpeak.ins.bind(MonsterSpeak);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=MonsterSpeak.js.map