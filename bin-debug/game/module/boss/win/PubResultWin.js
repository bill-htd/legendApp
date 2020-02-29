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
var PubResultWin = (function (_super) {
    __extends(PubResultWin, _super);
    function PubResultWin() {
        return _super.call(this) || this;
    }
    PubResultWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "PubResultSkin";
    };
    PubResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var myRank = param[0];
        var no1Name = param[1];
        var no1Level = param[2];
        var no1Reward = param[3];
        var myReward = param[4];
        this.addTouchEvent(this.closeBtn, this.onTap);
        TimerManager.ins().doTimer(1000, 10, this.updateCloseBtnLabel, this);
        this.txt0.text = "\uFF08" + no1Name + " Lv." + no1Level + "\uFF09";
        for (var i = 0; i < this.container0.numChildren; i++) {
            var element = this.container0.getChildAt(i);
            element.destruct();
        }
        for (var i = 0; i < this.container1.numChildren; i++) {
            var element = this.container1.getChildAt(i);
            element.destruct();
        }
        this.container0.removeChildren();
        this.container1.removeChildren();
        this.txt1.visible = myRank != 1;
        this.txt2.visible = myRank != 1;
        for (var i = 0; i < no1Reward.length; i++) {
            var item = new ItemBase;
            item.data = no1Reward[i];
            this.container0.addChild(item);
        }
        this.s = 10;
        this.closeBtn.name = "退出";
        if (myRank == 1)
            return;
        this.txt2.text = "\uFF08\u4F24\u5BB3\u6392\u540D\uFF1A\u7B2C" + myRank + "\u540D\uFF09";
        for (var i = 0; i < myReward.length; i++) {
            var item = new ItemBase;
            item.data = myReward[i];
            this.container1.addChild(item);
        }
    };
    PubResultWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        if (GameMap.fubenID > 0) {
            UserFb.ins().sendExitFb();
        }
    };
    PubResultWin.prototype.updateCloseBtnLabel = function () {
        this.s--;
        if (this.s <= 0)
            this.onTap();
        this.closeBtn.label = this.closeBtn.name + "(" + this.s + "s)";
    };
    PubResultWin.prototype.onTap = function () {
        ViewManager.ins().close(this);
    };
    return PubResultWin;
}(BaseEuiView));
__reflect(PubResultWin.prototype, "PubResultWin");
ViewManager.ins().reg(PubResultWin, LayerManager.UI_Main);
//# sourceMappingURL=PubResultWin.js.map