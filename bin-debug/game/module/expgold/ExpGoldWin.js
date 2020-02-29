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
var ExpGoldWin = (function (_super) {
    __extends(ExpGoldWin, _super);
    function ExpGoldWin() {
        return _super.call(this) || this;
    }
    ExpGoldWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "exprefineSkin";
    };
    ExpGoldWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.goUpBtn, this.onTap);
        this.observe(UserExpGold.ins().postExpUpdate, this.refreshShow);
        this.refreshShow();
    };
    ExpGoldWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.goUpBtn, this.onTap);
    };
    ExpGoldWin.prototype.refreshShow = function () {
        if (UserExpGold.ins().checkIsOver()) {
            this.getAll.visible = true;
            this.group.visible = false;
        }
        else {
            this.group.visible = true;
            this.getAll.visible = false;
            this.constImg.source = "exprefine_json.explz_" + UserExpGold.ins().index;
            var str = "可立即提升至<font color='#35e62d'>" + UserExpGold.ins().checkUpLevel() + "</font>级";
            this.depictLabel0.textFlow = new egret.HtmlTextParser().parser(str);
            var needGold = GlobalConfig.RefinesystemExpConfig[UserExpGold.ins().index].yuanBao;
            if (Actor.yb >= needGold) {
                this.goldConst.setText("<font color='#35e62d'>" + UserExpGold.ins().getIndexNeedGold() + "</font>");
            }
            else {
                this.goldConst.setText("<font color='#f3311e'>" + UserExpGold.ins().getIndexNeedGold() + "</font>");
            }
            var endedTime = UserExpGold.ins().remainTime;
            this.depictLabel.text = "剩余时间：" + DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    ExpGoldWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
            case this.goUpBtn:
                UserExpGold.ins().checkIsCanPlay();
                break;
        }
    };
    return ExpGoldWin;
}(BaseEuiView));
__reflect(ExpGoldWin.prototype, "ExpGoldWin");
ViewManager.ins().reg(ExpGoldWin, LayerManager.UI_Main);
//# sourceMappingURL=ExpGoldWin.js.map