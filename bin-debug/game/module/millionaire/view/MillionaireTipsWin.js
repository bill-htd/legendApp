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
var MillionaireTipsWin = (function (_super) {
    __extends(MillionaireTipsWin, _super);
    function MillionaireTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "richmanRewardSkin";
        return _this;
    }
    MillionaireTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    MillionaireTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Millionaire.ins().postRoundReward, this.callbackRoundReward);
        this.addTouchEndEvent(this.bgClose, this.onClick);
        this.addTouchEndEvent(this.getreward, this.onClick);
        this.pos = param[0];
        this.getlabel.touchEnabled = false;
        this.init();
    };
    MillionaireTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onClick);
        this.removeObserve();
    };
    MillionaireTipsWin.prototype.callbackRoundReward = function () {
        this.init();
    };
    MillionaireTipsWin.prototype.init = function () {
        var cfg = GlobalConfig.RichManRoundAwardConfig[this.pos];
        if (cfg) {
            if (Millionaire.ins().roundReward >> this.pos & 1) {
                this.counttext.visible = false;
                this.getreward.visible = true;
                this.getreward.touchEnabled = false;
                this.getlabel.visible = this.getreward.visible;
                this.getlabel.text = "已领取";
                this.getreward.source = "btn42";
            }
            else {
                this.getreward.touchEnabled = true;
                this.getlabel.text = "领取";
                this.getreward.source = "btn40";
                if (Millionaire.ins().round >= cfg.round) {
                    this.counttext.visible = false;
                    this.getreward.visible = !this.counttext.visible;
                    this.getlabel.visible = this.getreward.visible;
                }
                else {
                    this.counttext.visible = true;
                    this.getreward.visible = !this.counttext.visible;
                    this.getlabel.visible = this.getreward.visible;
                }
            }
            this.count.text = "" + (cfg.round - Millionaire.ins().round);
            this.partname.text = "\u7B2C" + cfg.round + "\u5708\u5956\u52B1";
            this.itemIcon.data = { type: cfg.award[0].type, id: cfg.award[0].id, count: cfg.award[0].count };
        }
    };
    MillionaireTipsWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.getreward:
                var cfg = GlobalConfig.RichManRoundAwardConfig[this.pos];
                if (cfg) {
                    if (Millionaire.ins().roundReward >> this.pos & 1) {
                        UserTips.ins().showTips("|C:0xff0000&T:\u5DF2\u9886\u53D6");
                    }
                    else {
                        if (Millionaire.ins().round >= cfg.round) {
                            Millionaire.ins().sendRoundReward(this.pos);
                        }
                        else {
                            UserTips.ins().showTips("|C:0xff0000&T:\u6240\u9700\u5708\u6570:" + cfg.round);
                        }
                    }
                }
                break;
        }
    };
    return MillionaireTipsWin;
}(BaseEuiView));
__reflect(MillionaireTipsWin.prototype, "MillionaireTipsWin");
ViewManager.ins().reg(MillionaireTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=MillionaireTipsWin.js.map