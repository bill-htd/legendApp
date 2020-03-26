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
var KFBossSceneWin = (function (_super) {
    __extends(KFBossSceneWin, _super);
    function KFBossSceneWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "kfBossSceneSkin";
        return _this;
    }
    KFBossSceneWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.observe(KFBossSys.ins().postBroadcastResult, this.bossEnd);
        this.endGroup.visible = false;
        var curFbId = GameMap.fubenID;
        for (var key in GlobalConfig.CrossBossConfig) {
            if (curFbId == GlobalConfig.CrossBossConfig[key].fbid) {
                var dp = GlobalConfig.CrossBossConfig[key];
                var info = KFBossSys.ins().fbInfo[dp.id];
                var serverName = window['getServerName'](info.serverId);
                this.nameTxt.text = dp.sceneName == "\u8DE8\u670D\u6218\u573A" ? "[" + serverName + "]\u8DE8\u670D\u6218\u573A" : "\u82CD\u6708\u5C9B";
                break;
            }
        }
    };
    KFBossSceneWin.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        TimerManager.ins().removeAll(this);
        Tween.removeTweens(this.endGroup);
    };
    KFBossSceneWin.prototype.bossEnd = function (winner) {
        var _this = this;
        if (GameMap.fbType == UserFb.FB_TYPE_KF_BOSS) {
            this.endGroup.visible = true;
            this.endGroup.alpha = 1;
            this.winnerName.text = "\u6700\u7EC8\u5F52\u5C5E\u8005\u662F\uFF1A" + winner;
            TimerManager.ins().doTimer(10000, 1, function () {
                Tween.get(_this.endGroup).to({ "alpha": 0 }, 300).call(function () {
                    _this.endGroup.visible = false;
                });
            }, this);
        }
    };
    return KFBossSceneWin;
}(BaseEuiView));
__reflect(KFBossSceneWin.prototype, "KFBossSceneWin");
ViewManager.ins().reg(KFBossSceneWin, LayerManager.UI_Main);
//# sourceMappingURL=KFBossSceneWin.js.map