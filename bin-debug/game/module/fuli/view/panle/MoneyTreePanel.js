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
var MoneyTreePanel = (function (_super) {
    __extends(MoneyTreePanel, _super);
    function MoneyTreePanel() {
        var _this = _super.call(this) || this;
        _this.posY = 180;
        _this.skinName = "MoneyTreeSkin";
        _this.mc1 = new MovieClip;
        _this.mc1.x = 140;
        _this.mc1.y = 46;
        _this.mc2 = new MovieClip;
        _this.mc2.x = 222;
        _this.mc2.y = 46;
        _this.mc3 = new MovieClip;
        _this.mc3.x = 370;
        _this.mc3.y = 46;
        _this.expMc = new MovieClip();
        _this.expMc.x = 376;
        _this.expMc.y = _this.posY;
        _this.addChildAt(_this.expMc, 3);
        _this.baojiMc = new MovieClip();
        _this.baojiMc.x = 207;
        _this.baojiMc.y = 270;
        _this.movieExp = new MovieClip();
        return _this;
    }
    MoneyTreePanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Notice.ins().postGameNotice, this.refushInfo);
        this.observe(UserFuLi.ins().postMoneyInfoChange, this.refushInfo);
        this.addTouchEvent(this.goUpBtn, this.onTap);
        this.addTouchEvent(this.image1, this.onTap);
        this.addTouchEvent(this.image2, this.onTap);
        this.addTouchEvent(this.image3, this.onTap);
        this.addTouchEvent(this.descBtn, this.onTap);
        this.addTouchEvent(this.expMc, this.onTap);
        this.refushInfo([true]);
        this.expMc.playFile(RES_DIR_EFF + "moneytreebar");
    };
    MoneyTreePanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.goUpBtn, this.onTap);
        this.removeTouchEvent(this.image1, this.onTap);
        this.removeTouchEvent(this.image2, this.onTap);
        this.removeTouchEvent(this.image3, this.onTap);
        this.removeTouchEvent(this.descBtn, this.onTap);
    };
    MoneyTreePanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.goUpBtn:
                if (UserFuLi.ins().playNum >= UserFuLi.ins().cruMaxNum) {
                    if (UserVip.ins().lv >= 10) {
                        UserTips.ins().showTips("|C:0xf3311e&T:今日次数已用完|");
                    }
                    else {
                        UserTips.ins().showTips("|C:0xf3311e&T:提高vip等级，获得更多次数|");
                    }
                    return;
                }
                if (Actor.yb >= this.costNum) {
                    UserFuLi.ins().sendPlayYaoYao();
                    return;
                }
                UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
                break;
            case this.image1:
                ViewManager.ins().open(MoneyTreeBoxWin, 1);
                break;
            case this.image2:
                ViewManager.ins().open(MoneyTreeBoxWin, 2);
                break;
            case this.image3:
                ViewManager.ins().open(MoneyTreeBoxWin, 3);
                break;
            case this.descBtn:
                ViewManager.ins().open(ZsBossRuleSpeak, 6);
                break;
            case this.expMc:
                ViewManager.ins().open(ZsBossRuleSpeak, 6);
                break;
        }
    };
    MoneyTreePanel.prototype.refushInfo = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var boo = false;
        var baoji = 0;
        var model = UserFuLi.ins();
        var info = model.getIndexCost();
        var nowAdd = model.getNowCoefficientinfo();
        var nextAdd = model.getNowCoefficientinfo(1);
        if (param && param[0]) {
            if (param[0][0])
                boo = param[0][0];
            if (param[0][1])
                baoji = param[0][1];
        }
        if (model.playNum == model.maxNum) {
        }
        else {
            this.costNum = info.yuanbao;
        }
        if (!boo)
            this.moveExpMc();
        var value = 0;
        if (nextAdd == null) {
        }
        else {
            value = 60 * (1 / -2 + 1 - (model.exp / nextAdd.needExp));
        }
        this.refushBoxInfo();
        if (baoji > 1) {
            this.baojiMc.playFile(RES_DIR_EFF + "moneytreecrit", 1);
            this.addChild(this.baojiMc);
        }
    };
    MoneyTreePanel.prototype.moveExpMc = function () {
        this.movieExp.x = 189;
        this.movieExp.y = 257;
        this.movieExp.playFile(RES_DIR_EFF + "moneytreeexp", 1);
        this.addChild(this.movieExp);
        var t = egret.Tween.get(this.movieExp);
        t.to({ "y": 180, "x": 376 }, 420);
    };
    MoneyTreePanel.prototype.refushBoxInfo = function () {
        var model = UserFuLi.ins();
        for (var i = 1; i < 4; i++) {
            var mc = this["mc" + i];
            if (model.checkBoxIsCanget(i)) {
                this.playEffect(mc);
            }
            else {
                if (mc.parent) {
                    DisplayUtils.removeFromParent(mc);
                }
            }
        }
    };
    MoneyTreePanel.prototype.playEffect = function (mc) {
        mc.playFile(RES_DIR_EFF + "taskBox", 100);
        this.addChild(mc);
    };
    MoneyTreePanel.MAXNUMBER = 50;
    return MoneyTreePanel;
}(BaseView));
__reflect(MoneyTreePanel.prototype, "MoneyTreePanel");
//# sourceMappingURL=MoneyTreePanel.js.map