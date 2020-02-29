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
var UIView1 = (function (_super) {
    __extends(UIView1, _super);
    function UIView1() {
        var _this = _super.call(this) || this;
        _this.ft = new FrameTick;
        return _this;
    }
    UIView1.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "UIView1Skin";
        this.touchEnabled = false;
    };
    UIView1.prototype.initData = function () {
        if (this.ft.checkAndTick(0))
            return;
        CommonUtils.labelIsOverLenght(this.goldTxt, Actor.gold);
        CommonUtils.labelIsOverLenght(this.ybTxt, Actor.yb);
        this.nameTxt.text = Actor.myName;
        this.expChange();
    };
    UIView1.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.observe(GameLogic.ins().postSubRoleChange, this.initData);
        this.observe(Actor.ins().postGoldChange, this.initData);
        this.observe(Actor.ins().postYbChange, this.initData);
        this.observe(Actor.ins().postNameChange, this.initData);
        this.observe(Actor.ins().postPowerChange, this.initData);
        this.observe(Actor.ins().postLevelChange, this.expChange);
        this.addTouchEvent(this.recharge, this.onClick);
        this.addTouchEvent(this.recharge0, this.onClick);
        this.initData();
    };
    UIView1.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.close.call(this, param);
        this.removeTouchEvent(this.recharge, this.onClick);
        this.removeTouchEvent(this.recharge0, this.onClick);
        this.removeObserve();
    };
    UIView1.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.recharge:
                ViewManager.ins().open(ChargeFirstWin);
                break;
            case this.recharge0:
                if (GameServer.serverOpenDay < 2) {
                    UserTips.ins().showTips("|C:0xf3311e&T:开服第三天开启摇钱树|");
                    return;
                }
                ViewManager.ins().open(FuliWin);
                break;
        }
    };
    UIView1.prototype.expChange = function () {
        var lv = Actor.level;
        var zs = UserZs.ins() ? UserZs.ins().lv : 0;
        var strLv = "|C:0xF1D715&T:" + (zs ? zs + "转" : "") + "|";
        strLv = strLv + lv + "级";
        this.lvTxt.textFlow = TextFlowMaker.generateTextFlow(strLv);
    };
    return UIView1;
}(BaseEuiView));
__reflect(UIView1.prototype, "UIView1");
ViewManager.ins().reg(UIView1, LayerManager.UI_Popup);
//# sourceMappingURL=UIView1.js.map