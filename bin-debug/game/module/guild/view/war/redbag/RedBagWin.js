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
var RedBagWin = (function (_super) {
    __extends(RedBagWin, _super);
    function RedBagWin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedBagWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "RedBagWinSkin";
        this.model = GuildWar.ins().getModel();
        this.num1.restrict = "0-9";
        this.num2.restrict = "0-9";
    };
    RedBagWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.rob, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.send, this.onTap);
        this.addTouchEvent(this.btn1, this.onTap);
        this.addTouchEvent(this.btn2, this.onTap);
        this.addTouchEvent(this.btn3, this.onTap);
        this.addTouchEvent(this.btn4, this.onTap);
        this.addTouchEvent(this.btn5, this.onTap);
        this.addTouchEvent(this.btn6, this.onTap);
        this.addChangeEvent(this.num1, this.onTxtChange);
        this.addChangeEvent(this.num2, this.onTxtChange);
        if (this.model.canRod) {
            this.currentState = "rob";
            this.refushInfo();
        }
        else {
            this.currentState = "send";
            this.refushSendInfo();
        }
    };
    RedBagWin.prototype.onTxtChange = function (e) {
        var _this = this;
        var index = 1;
        switch (e.currentTarget) {
            case this.num1:
                index = 1;
                break;
            case this.num2:
                index = 2;
                break;
        }
        TimerManager.ins().doTimer(500, 1, function () {
            _this.checkInputChange(index);
        }, this);
    };
    RedBagWin.prototype.checkInputChange = function (index) {
        var num;
        switch (index) {
            case 1:
                num = Number(this.num1.text);
                if (num > this.sendYBMaxNum) {
                    num = this.sendYBMaxNum;
                }
                this.sendYb = num;
                this.num1.text = this.sendYb + "";
                break;
            case 2:
                num = Number(this.num2.text);
                if (num > this.sendMaxNum) {
                    num = this.sendMaxNum;
                }
                this.sendNum = num;
                this.num2.text = this.sendNum + "";
                break;
        }
        this.checkPercentage();
    };
    RedBagWin.prototype.refushSendInfo = function () {
        this.sendYb = this.sendYBMaxNum = this.model.remainYB;
        this.sendMaxNum = this.sendNum = Guild.ins().getMemberNum();
        this.price.setPrice(this.sendYb);
        this.num1.text = this.sendYb + '';
        this.num2.text = this.sendNum + '';
    };
    RedBagWin.prototype.refushInfo = function () {
        this.remainBag.text = this.model.remainRedNum + "/" + this.model.maxRedNum;
    };
    RedBagWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(RedBagWin);
                break;
            case this.rob:
                GuildWar.ins().requestRobRedBag();
                break;
            case this.send:
                GuildWar.ins().requestSendRedBag(this.sendYb, this.sendNum);
                break;
            case this.btn1:
                --this.sendYb;
                if (this.sendYb < this.sendNum) {
                    this.sendYb = this.sendNum;
                }
                this.num1.text = this.sendYb + "";
                break;
            case this.btn2:
                ++this.sendYb;
                if (this.sendYb > this.sendYBMaxNum) {
                    this.sendYb = this.sendYBMaxNum;
                }
                this.num1.text = this.sendYb + "";
                break;
            case this.btn3:
                --this.sendNum;
                if (this.sendNum < 1) {
                    this.sendNum = 1;
                }
                this.num2.text = this.sendNum + "";
                break;
            case this.btn4:
                ++this.sendNum;
                if (this.sendNum > this.sendMaxNum) {
                    this.sendNum = this.sendMaxNum;
                }
                this.num2.text = this.sendNum + "";
                break;
            case this.btn5:
                this.sendYb = this.sendYBMaxNum;
                this.num1.text = this.sendYb + "";
                break;
            case this.btn6:
                this.sendNum = this.sendMaxNum;
                this.num2.text = this.sendNum + "";
                break;
        }
    };
    RedBagWin.prototype.checkPercentage = function () {
        if (this.sendYb < this.sendNum) {
            this.sendYb = this.sendNum;
            this.num1.text = this.sendYb + "";
        }
    };
    return RedBagWin;
}(BaseEuiView));
__reflect(RedBagWin.prototype, "RedBagWin");
ViewManager.ins().reg(RedBagWin, LayerManager.UI_Main);
//# sourceMappingURL=RedBagWin.js.map