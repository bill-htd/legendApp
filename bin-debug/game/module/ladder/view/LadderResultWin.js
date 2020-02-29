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
var LadderResultWin = (function (_super) {
    __extends(LadderResultWin, _super);
    function LadderResultWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ladderresultwinskin";
        return _this;
    }
    LadderResultWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.listData = new eui.ArrayCollection();
        this.mc = new MovieClip;
        this.mc.scaleX = this.mc.scaleY = 1.2;
        this.starList.addChildAt(this.mc, 0);
    };
    LadderResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.isWin = param[0];
        var list = param[1];
        var upLevel = param[2];
        var upId = param[3];
        var upStar = param[4];
        this.bg.source = this.isWin ? "win_png" : "lost_png";
        this.result.source = this.isWin ? "win_02" : "lost_02";
        this.sureBtn.name = this.isWin ? "\u9886\u53D6\u5956\u52B1" : "\u9000\u51FA";
        this.s = 5;
        this.updateCloseBtnLabel();
        TimerManager.ins().doTimer(1000, 5, this.updateCloseBtnLabel, this);
        this.listData.source = list;
        this.list.dataProvider = this.listData;
        this.refushStarInfo(upLevel, upId, upStar);
        this.addTouchEvent(this.sureBtn, this.onTap);
        this.playEffect();
    };
    LadderResultWin.prototype.playEffect = function () {
        if (!this.isWin)
            return;
        this.mc.playFile(RES_DIR_EFF + "laddercircle", -1);
        this.mc.x = this.starList.width >> 1;
        this.mc.y = this.starList.height >> 1;
    };
    LadderResultWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().remove(this.updateCloseBtnLabel, this);
        this.removeTouchEvent(this.sureBtn, this.onTap);
        egret.Tween.removeTweens(this.starList);
        DisplayUtils.removeFromParent(this.mc);
        if (GameMap.fubenID > 0) {
            UserFb.ins().sendExitFb();
            ViewManager.ins().open(LadderWin, 1);
        }
    };
    LadderResultWin.prototype.refushStarInfo = function (level, id, starNum) {
        var info = Ladder.ins().getLevelConfig(level, id);
        this.upLevel = level;
        this.upId = id;
        this.starList.updataStarInfo(info);
        this.lastlevel = info.showDan;
        this.lastRank = info.level;
        this.star1.visible = false;
        this.star2.visible = false;
        for (var i = 0; i < starNum; i++) {
            this["star" + (i + 1)].visible = true;
            this["star" + (i + 1)].currentState = this.isWin ? "light" : "black";
        }
        this.upStar.visible = Ladder.ins().getLevelConfig().showDan > 0;
        if (starNum > 0) {
            var self_1 = this;
            var playFun_1 = function () {
                TimerManager.ins().remove(playFun_1, self_1);
                self_1.setStarInfoChange(info.showStar, starNum);
            };
            TimerManager.ins().doTimer(500, 1, playFun_1, self_1);
        }
    };
    LadderResultWin.prototype.setStarInfoChange = function (index, num) {
        if (num > 0) {
            this.starList.upStarStatu(index + 1, num, this.isWin);
        }
    };
    LadderResultWin.prototype.cheackIsChangeLevel = function (num) {
        var _this = this;
        if (this.upLevel == Ladder.ins().level && this.upId == Ladder.ins().nowId) {
            return;
        }
        var t = egret.Tween.get(this.starList);
        t.to({ "alpha": 1 }, 300).call(function () {
            if (_this.isWin) {
                if (num >= 1) {
                    _this.starList.upStarStatu(1, num, _this.isWin);
                }
            }
            var info = Ladder.ins().getLevelConfig();
            var currentLevel = info.showDan;
            var currentRank = info.level;
            if (_this.lastRank < currentRank) {
                _this.starList.showRankUp(currentRank);
                _this.starList.showLvUp(currentLevel);
            }
            else {
                if (_this.lastlevel < currentLevel) {
                    _this.starList.showLvDown(currentLevel);
                }
                else if (_this.lastlevel > currentLevel) {
                    _this.starList.showLvUp(currentLevel);
                }
            }
            _this.starList.updataStarInfo(info, false);
            egret.Tween.removeTweens(_this.starList);
        }, this);
    };
    LadderResultWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.sureBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    LadderResultWin.prototype.updateCloseBtnLabel = function () {
        this.s--;
        if (this.s <= 0)
            ViewManager.ins().close(this);
        this.sureBtn.label = this.sureBtn.name + "(" + this.s + "s)";
    };
    return LadderResultWin;
}(BaseEuiView));
__reflect(LadderResultWin.prototype, "LadderResultWin");
ViewManager.ins().reg(LadderResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=LadderResultWin.js.map