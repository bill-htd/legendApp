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
var LevelUpWayWin = (function (_super) {
    __extends(LevelUpWayWin, _super);
    function LevelUpWayWin() {
        var _this = _super.call(this) || this;
        _this.gainWay = [["通关关卡", "GuanQiaRewardWin", 0, 3], ["通天塔", "FbWin", 2, 5], ["击杀附近的人", "LadderWin", 0, 4], ["经验副本", "FbWin", 1, 5]];
        return _this;
    }
    LevelUpWayWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "LevelUpWaySkin";
        this.gainList.itemRenderer = GainGoodsItem;
    };
    LevelUpWayWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
        this.gainList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchList, this);
        this.gainList.dataProvider = new eui.ArrayCollection(this.gainWay);
        this.gainList.validateNow();
        for (var i = 0; i < this.gainList.numElements; i++) {
            var gitem = this.gainList.getElementAt(i);
            if (gitem) {
                var isOpen = false;
                var needLv = void 0;
                var needZs = void 0;
                var guanka = void 0;
                if (i <= 0) {
                    isOpen = true;
                }
                else if (i == 1) {
                    isOpen = UserZs.ins().lv >= GlobalConfig.FbChallengeConfig[1].zsLevelLimit && Actor.level >= GlobalConfig.FbChallengeConfig[1].levelLimit;
                    needLv = GlobalConfig.FbChallengeConfig[1].levelLimit;
                    needZs = GlobalConfig.FbChallengeConfig[1].zsLevelLimit;
                }
                else if (i == 2) {
                    isOpen = UserFb.ins().guanqiaID >= GlobalConfig.SkirmishBaseConfig.openLevel;
                    guanka = GlobalConfig.SkirmishBaseConfig.openLevel;
                }
                else if (i == 3) {
                    isOpen = Actor.level >= GlobalConfig.ExpFubenBaseConfig.openLv;
                    needLv = GlobalConfig.ExpFubenBaseConfig.openLv;
                }
                gitem.gainData(isOpen, this.gainWay[i][3], { needLv: needLv, needZs: needZs, guanka: guanka });
            }
        }
    };
    LevelUpWayWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.gainList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchList, this);
    };
    LevelUpWayWin.prototype.onTouchList = function (e) {
        var item = e.item;
        if (e.item == null) {
            return;
        }
        var openSuccess = ViewManager.ins().viewOpenCheck(item[1], item[2]);
        if (openSuccess) {
            ViewManager.ins().closeTopLevel();
            if (item[1] == "GuanQiaRewardWin") {
                if (UserFb.ins().guanqiaID < UserFb.AUTO_GUANQIA) {
                    UserFb.ins().setAutoPk();
                    ViewManager.ins().close(LevelUpWayWin);
                    return;
                }
                PlayFun.ins().openAuto();
                GameGuider.challengeBoss();
                ViewManager.ins().close(LevelUpWayWin);
                return;
            }
            GameGuider.guidance(item[1], item[2]);
            ViewManager.ins().close(LevelUpWayWin);
        }
    };
    LevelUpWayWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return LevelUpWayWin;
}(BaseEuiView));
__reflect(LevelUpWayWin.prototype, "LevelUpWayWin");
ViewManager.ins().reg(LevelUpWayWin, LayerManager.UI_Popup);
//# sourceMappingURL=LevelUpWayWin.js.map