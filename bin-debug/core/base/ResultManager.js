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
var ResultManager = (function (_super) {
    __extends(ResultManager, _super);
    function ResultManager() {
        return _super.call(this) || this;
    }
    ResultManager.ins = function () {
        return _super.ins.call(this);
    };
    ResultManager.prototype.create = function (fb) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var fbType = fb ? fb : GameMap.fbType;
        switch (fbType) {
            case UserFb.FB_TYPE_PERSONAL:
            case UserFb.FB_TYPE_GUARD_WEAPON:
                (_a = ViewManager.ins()).open.apply(_a, [PersonalResultWin].concat(param));
                break;
            case UserFb.FB_TYPE_TIAOZHAN:
                (_b = ViewManager.ins()).open.apply(_b, [TongResultWin].concat(param));
                break;
            case UserFb.FB_TYPE_FIRE_RING:
            case UserFb.FB_TYPE_MATERIAL:
                if (fbType == UserFb.FB_TYPE_FIRE_RING && param != undefined && param[0] != undefined && param[0] == 0) {
                    Activity.ins().removeEvent();
                }
                (_c = ViewManager.ins()).open.apply(_c, [MaterialResultWin].concat(param));
                break;
            case UserFb.FB_TYPE_NEW_WORLD_BOSS:
                ViewManager.ins().open(NewWorldBossResultPanel);
                break;
            case UserFb.FB_TYPE_CITY:
                ViewManager.ins().open(CityResultWin, param[1], param[4]);
                break;
            case UserFb.FB_TYPE_ALLHUMENBOSS:
            case UserFb.FB_TYPE_ZHUANSHENGBOSS:
            case UserFb.FB_TYPE_HOMEBOSS:
            case UserFb.FB_TYPE_LABA:
            case UserFb.FB_TYPE_DARK_BOSS:
            case UserFb.FB_TYPE_HIDE_BOSS:
                ViewManager.ins().open(BossResultWin, param[1], param[4]);
                break;
            case UserFb.FB_TYPE_GOD_WEAPON:
            case UserFb.FB_TYPE_GOD_WEAPON_TOP:
                break;
            case UserFb.FB_TYPE_KF_BOSS:
                ViewManager.ins().open(KFBossResultWin, param[0], param[1]);
                break;
            default:
                (_d = ViewManager.ins()).open.apply(_d, [ResultWin].concat(param));
                break;
        }
        var _a, _b, _c, _d;
    };
    return ResultManager;
}(BaseClass));
__reflect(ResultManager.prototype, "ResultManager");
//# sourceMappingURL=ResultManager.js.map