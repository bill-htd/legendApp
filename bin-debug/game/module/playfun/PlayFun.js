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
var PlayFunShow;
(function (PlayFunShow) {
    PlayFunShow[PlayFunShow["topMain"] = 1] = "topMain";
    PlayFunShow[PlayFunShow["leftGroup"] = 2] = "leftGroup";
    PlayFunShow[PlayFunShow["rightGroup"] = 4] = "rightGroup";
    PlayFunShow[PlayFunShow["downGroup"] = 8] = "downGroup";
    PlayFunShow[PlayFunShow["topGroup"] = 16] = "topGroup";
})(PlayFunShow || (PlayFunShow = {}));
var PlayFun = (function (_super) {
    __extends(PlayFun, _super);
    function PlayFun() {
        var _this = _super.call(this) || this;
        _this.showTipsObj = null;
        _this.observe(UserBoss.ins().postBossData, _this.publicBossRelive);
        _this.observe(UserFb.ins().postAddEnergy, _this.updateAutoPk);
        _this.observe(GameLogic.ins().postEnterMap, function () {
            var fbID = GameMap.fubenID;
            if (!CityCC.ins().isCity) {
                if (!fbID || GameMap.fbType == UserFb.FB_TYPE_GUANQIABOSS) {
                    if (!ViewManager.ins().isShow(PlayFunView))
                        ViewManager.ins().open(PlayFunView);
                    if (GameMap.fbType == UserFb.FB_TYPE_GUANQIABOSS)
                        _this.postShowViews(PlayFunShow.topMain);
                    else
                        _this.postShowViews(PlayFun.showAll);
                    return;
                }
                ViewManager.ins().close(PlayFunView);
            }
        });
        return _this;
    }
    PlayFun.ins = function () {
        return _super.ins.call(this);
    };
    PlayFun.prototype.closeAuto = function () {
        var view = ViewManager.ins().getView(PlayFunView);
        if (view)
            view.autoPkBoss.selected = false;
        this.updateAutoPk();
    };
    PlayFun.prototype.openAuto = function () {
        var view = ViewManager.ins().getView(PlayFunView);
        if (view)
            view.autoPkBoss.selected = true;
        this.updateAutoPk();
    };
    PlayFun.prototype.publicBossRelive = function (params) {
        var isShow = params[0];
        var bossName = params[1];
        var view = ViewManager.ins().getView(PlayFunView);
        if (view)
            view.publicBossRelive(isShow, bossName);
    };
    PlayFun.prototype.upDataWillBoss = function (id) {
        var view = ViewManager.ins().getView(PlayFunView);
        if (view)
            view.upDataWillBoss(id);
    };
    PlayFun.prototype.updateAutoPk = function () {
        if (UserFb.ins().bossIsChallenged)
            return;
        var m = UserFb.ins().energy;
        var v = UserFb.ins().currentEnergy;
        var view = ViewManager.ins().getView(PlayFunView);
        if (view && view.autoPkBoss.selected && v >= m) {
            if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
                view.autoPkBoss.selected = false;
                UserTips.ins().showTips("背包剩余空位不足，请先清理");
                this.removePkArrowTips();
            }
            else {
                if (UserFb.ins().guanqiaID < GlobalConfig.InstanceBaseConfig.maxCheckPoint) {
                    this.addPkArrowTips();
                }
                else {
                    UserTips.ins().showCenterTips("\u5F53\u524D\u5DF2\u8FBE\u6700\u5927\u5173\u5361");
                    this.removePkArrowTips();
                }
            }
        }
        else {
            this.removePkArrowTips();
        }
    };
    PlayFun.prototype.postShowViews = function (handle, reverse) {
        if (reverse === void 0) { reverse = false; }
        return [handle, reverse];
    };
    PlayFun.prototype.addPkArrowTips = function () {
        var _this = this;
        var view = ViewManager.ins().getView(PlayFunView);
        if (view && !this.showTipsObj) {
            this.showTipsObj = {};
            view.showTaskTips("\u80FD\u91CF\u5DF2\u6EE1\uFF0C\u5373\u5C06\u81EA\u52A8\u6311\u6218\u5173\u5361BOSS");
            egret.Tween.get(this.showTipsObj).wait(1500).call(function () {
                if (view.autoPkBoss.selected) {
                    GameLogic.ins().startPkBoss();
                    _this.removePkArrowTips();
                }
            });
        }
    };
    PlayFun.prototype.removePkArrowTips = function () {
        if (this.showTipsObj) {
            egret.Tween.removeTweens(this.showTipsObj);
            this.showTipsObj = null;
        }
    };
    PlayFun.showAll = PlayFunShow.topMain | PlayFunShow.leftGroup | PlayFunShow.rightGroup | PlayFunShow.downGroup | PlayFunShow.topGroup;
    return PlayFun;
}(BaseSystem));
__reflect(PlayFun.prototype, "PlayFun");
var GameSystem;
(function (GameSystem) {
    GameSystem.playfun = PlayFun.ins.bind(PlayFun);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=PlayFun.js.map