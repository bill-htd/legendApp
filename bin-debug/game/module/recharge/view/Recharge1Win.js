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
var Recharge1Win = (function (_super) {
    __extends(Recharge1Win, _super);
    function Recharge1Win() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        return _this;
    }
    Recharge1Win.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.setSkinName();
        this.btnArr = [];
        for (var i = 0; i < 4; i++) {
            this.btnArr.push(this["chong" + i]);
        }
        this.eff = new MovieClip;
        this.eff.x = this.buyed.x + 77;
        this.eff.y = this.buyed.y + 32;
        this.eff.scaleX = 1.15;
        this.eff.scaleY = 1.5;
        this.eff.touchEnabled = false;
    };
    Recharge1Win.prototype.setSkinName = function () {
        this.skinName = "FirstChargeSkin";
    };
    Recharge1Win.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (!OpenSystem.ins().checkSysOpen(SystemType.FIRSTCHARGE)) {
            UserTips.ins().showTips(OpenSystem.ins().getNoOpenTips(SystemType.FIRSTCHARGE));
            return false;
        }
        var rch = Recharge.ins().getRechargeData(0);
        if (!param[0]) {
            if (rch.num == 2) {
                var boo2 = Recharge.ins().getCurDailyRechargeIsAllGet();
                if (!boo2) {
                    ViewManager.ins().open(Recharge2Win);
                }
                else {
                    ViewManager.ins().open(ChargeFirstWin);
                }
                return false;
            }
            return true;
        }
        if (rch.num == 2) {
            ViewManager.ins().open(param[0][0]);
            return false;
        }
        return true;
    };
    Recharge1Win.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.closeCB);
        this.addTouchEvent(this.kefuBtn, this.onTouch);
        this.addTouchEvent(this.buyed, this.onTouch);
        for (var i = 0; i < this.btnArr.length; i++) {
            this.addTouchEvent(this.btnArr[i], this.onTouch);
        }
        this.observe(Recharge.ins().postUpdateRechargeEx, this.setWinData);
        var playPunView = ViewManager.ins().getView(PlayFunView);
        if (playPunView) {
            playPunView.preRecharge = playPunView.recharge.visible = false;
        }
        var job = SubRoles.ins().getSubRoleByIndex(0).job;
        var rrd = this.getRechargeRewardDatas(job);
        if (rrd) {
            for (var j = 0; j < rrd.length; j++) {
                var d = rrd[j];
                var da = { id: d.id, type: d.type, count: d.count };
                this["item" + (j + 1)].data = da;
            }
        }
        var frConfig = GlobalConfig.FirstRechargeClientConfig;
        for (var k in frConfig) {
            if (frConfig[k].job == job) {
                this.weapImg.source = frConfig[k].weaponshow + "_png";
                this.roleImg.source = frConfig[k].bodyshow + "_png";
                break;
            }
        }
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        var firstChargeInfo = window['getfirChargePriceInfo']();
        for (var i = 0; i < firstChargeInfo.length; i++) {
            this.btnArr[i]['status'] = firstChargeInfo[i].status;
            if (this.btnArr[i]['status'] != 1) {
                this.btnArr[i].filters = [colorFlilter];
            }
            this.btnArr[i]['msg'] = firstChargeInfo[i].msg;
            if (firstChargeInfo[i].trueCost == 1) {
                this.btnArr[i]["zhekou"].visible = true;
                this.btnArr[i]["rmb"].visible = false;
                this.btnArr[i]['money'] = parseInt(firstChargeInfo[i].dazhe_num);
            }
            else {
                this.btnArr[i]["zhekou"].visible = false;
                this.btnArr[i]["rmb"].visible = true;
                this.btnArr[i]['money'] = parseInt(firstChargeInfo[i].money_num);
            }
            this.btnArr[i]["rmb"].text = parseInt(firstChargeInfo[i].money_num) + '元';
            this.btnArr[i]["rmb0"].text = parseInt(firstChargeInfo[i].money_num) + '元';
            this.btnArr[i]["rmb1"].text = parseInt(firstChargeInfo[i].dazhe_num) + '元';
            this.btnArr[i]["yuanbao"].text = firstChargeInfo[i].award;
            this.btnArr[i]['yuanbao'] = firstChargeInfo[i].award;
        }
        this.setWinData();
    };
    Recharge1Win.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        DisplayUtils.removeFromParent(this.eff);
        egret.Tween.removeTweens(this);
        this.cleanEff();
    };
    Recharge1Win.prototype.closeCB = function (e) {
        ViewManager.ins().close(this);
    };
    Recharge1Win.prototype.onTouch = function (e) {
        var num = 0;
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.kefuBtn:
                var url = window['getkefuUrl']();
                if (window['getNative']() == 'web') {
                    window.open(url);
                }
                else {
                    egret.ExternalInterface.call("openURL", url);
                }
                break;
            case this.buyed:
                if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
                    ViewManager.ins().open(BagFullTipsWin);
                    return;
                }
                Recharge.ins().changeRecharge1Data();
                break;
            default:
                for (var i = 0; i < 4; i++) {
                    if (e.currentTarget == this.btnArr[i]) {
                        if (this.btnArr[i]['status'] == 1) {
                            Recharge.ins().showReCharge(this.btnArr[i]["money"], this.btnArr[i]['yuanbao'], 0);
                        }
                        else {
                            WarnWin.show(this.btnArr[i]['msg'], function () { }, this, function () { }, this, 'sure');
                        }
                        break;
                    }
                }
                break;
        }
    };
    Recharge1Win.prototype.onBtnTouch = function (e) {
        var index = this.btnArr.indexOf(e.target);
    };
    Recharge1Win.prototype.onTabTouch = function (e) {
        if (e.currentTarget.selectedIndex == this._index)
            return;
        this._index = e.currentTarget.selectedIndex;
        this.setWinData();
    };
    Recharge1Win.prototype.setEff = function (index) {
        switch (index) {
            case 0:
                break;
            case 1:
                this.cleanEff();
                break;
            default:
                break;
        }
    };
    Recharge1Win.prototype.cleanEff = function () {
        for (var i = 0; i < 6; i++) {
            egret.Tween.removeTweens(this["item" + (i + 1)]);
        }
    };
    Recharge1Win.prototype.setWinData = function (parma) {
        var _this = this;
        var type = parma ? parma.type : Recharge.ins().recharge_type;
        this._data = Recharge.ins().getRechargeData(type);
        if (!this._data.num) {
            this.buyed.visible = false;
            this.unbuy.visible = true;
            for (var i = 0; i < 6; i++) {
                this["item" + (i + 1)].visible = true;
            }
            DisplayUtils.removeFromParent(this.eff);
            this.setEff(0);
        }
        else if (this._data.num == 1) {
            this.buyed.visible = true;
            this.unbuy.visible = false;
            for (var i = 0; i < 6; i++) {
                this["item" + (i + 1)].visible = true;
            }
            if (!this.eff.parent) {
                this.buyGroup.addChild(this.eff);
                this.eff.x = this.buyed.width / 2;
                this.eff.y = this.buyed.height / 2;
                this.eff.touchEnabled = this.buyGroup.touchEnabled = false;
                this.eff.playFile(RES_DIR_EFF + "chongzhi", -1);
            }
            this.setEff(0);
        }
        else if (this._data.num == 2) {
            this.buyed.visible = false;
            this.unbuy.visible = false;
            DisplayUtils.removeFromParent(this.eff);
            this.cleanEff();
            var uiView2 = ViewManager.ins().getView(UIView2);
            var bagBtn = uiView2.getBagBtn();
            var _loop_1 = function (i) {
                var t = egret.Tween.get(this_1["item" + (i + 1)]);
                t.to({ x: bagBtn.x, y: bagBtn.y }, 1000).call(function () {
                    _this["item" + (i + 1)].visible = false;
                });
            };
            var this_1 = this;
            for (var i = 0; i < 5; i++) {
                _loop_1(i);
            }
            var tt = egret.Tween.get(this);
            tt.wait(1000).call(function () {
                ViewManager.ins().close(Recharge1Win);
            });
        }
    };
    Recharge1Win.prototype.getRechargeRewardDatas = function (index) {
        var frConfig = GlobalConfig.FirstRechargeClientConfig;
        for (var k in frConfig) {
            if (frConfig[k].job == index) {
                var gcz = frConfig[k].RechargeRewardData;
                return gcz;
            }
        }
        return null;
    };
    Recharge1Win.prototype.getRemindByIndex = function (index) {
        return ((Recharge.ins().getRechargeData(0).isAwards >> index) & 1) == 1;
    };
    return Recharge1Win;
}(BaseEuiView));
__reflect(Recharge1Win.prototype, "Recharge1Win");
ViewManager.ins().reg(Recharge1Win, LayerManager.UI_Main);
//# sourceMappingURL=Recharge1Win.js.map