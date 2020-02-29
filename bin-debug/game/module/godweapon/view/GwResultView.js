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
var GwResultView = (function (_super) {
    __extends(GwResultView, _super);
    function GwResultView() {
        var _this = _super.call(this) || this;
        _this._pFNum = 4;
        _this.secNum = 5;
        return _this;
    }
    GwResultView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GwResultSkin";
        this.addTouchEvent(this.closeBtn, this.touchHandler);
        this.addTouchEvent(this.get, this.touchHandler);
        this.addTouchEvent(this.closenoget, this.touchHandler);
        this._ary = new eui.ArrayCollection();
        this.listCoin.dataProvider = this._ary;
        this.listCoin.itemRenderer = MijingItemBase2;
    };
    GwResultView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._fubenId = param[0];
        this._pFNum = param[1];
        var useTime = param[2] == null ? -1 : param[2];
        var conf;
        var floor;
        for (var key in GlobalConfig.GodWeaponFubenConfig) {
            if (GlobalConfig.GodWeaponFubenConfig[key].fbId == this._fubenId) {
                conf = GlobalConfig.GodWeaponFubenConfig[key];
                floor = parseInt(key);
                break;
            }
        }
        var b;
        if (useTime == -1) {
            this.time.text = "未击杀BOSS";
            this.gaptime.visible = false;
            this.get.visible = true;
            this.closenoget.visible = true;
            this.closeBtn.visible = false;
            this.noget.visible = true;
            b = false;
        }
        else {
            this.time.text = DateUtils.getFormatBySecond(useTime, DateUtils.TIME_FORMAT_3);
            if (this._pFNum != 1) {
                this.gaptime.visible = true;
                this.get.visible = true;
                this.closenoget.visible = true;
                this.closeBtn.visible = false;
                var numTime = Math.abs(useTime - GlobalConfig.GodWeaponBaseConfig.fbGrade[0]);
                this.gaptime.text = "\uFF08\u8DDD\u79BBS\u53EA\u5DEE" + numTime + "\u79D2\uFF09";
                this.noget.visible = true;
                b = false;
            }
            else {
                this.gaptime.visible = false;
                this.get.visible = false;
                this.closenoget.visible = false;
                this.closeBtn.visible = true;
                this.noget.visible = false;
                b = true;
            }
        }
        this._isB = b;
        var ary = conf.award[this._pFNum].concat();
        var num = UserFb.ins().oldMijingPoint;
        if (UserFb.ins().oldMijingPoint != 1 && this._pFNum == 1) {
            var firstAry = conf.firstAward.concat();
            ary = ary.concat(firstAry);
        }
        var newAry = [];
        for (var i = 0; i < ary.length; i++) {
            var data = new MijinglistData();
            data.data = ary[i];
            data.index = i + 1;
            data.start = conf.award[1].length;
            data.floorNum = floor;
            newAry.push(data);
        }
        this._ary.replaceAll(newAry);
        this.rank.source = "godweapon_rank" + this._pFNum;
        if (b) {
            this.updateCloseBtnLabel();
            var temp = this.secNum;
            TimerManager.ins().doTimer(1000, temp, this.updateCloseBtnLabel, this);
        }
    };
    GwResultView.prototype.updateCloseBtnLabel = function () {
        this.secNum--;
        if (this.secNum <= 0) {
            ViewManager.ins().close(this);
            GodWeaponCC.ins().requestGetAward();
        }
        this.closeBtn.label = "\u9000\u51FA(" + this.secNum + "s)";
    };
    GwResultView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.touchHandler);
        this.removeTouchEvent(this.get, this.touchHandler);
        this.removeTouchEvent(this.closenoget, this.touchHandler);
        this.listCoin.dataProvider = null;
        TimerManager.ins().remove(this.updateCloseBtnLabel, this);
        if (GameMap.fubenID > 0) {
            UserFb.ins().sendExitFb();
        }
        if (GameMap.fbType == UserFb.FB_TYPE_MIJING) {
            ViewManager.ins().open(GodWeaponWin, 1);
        }
    };
    GwResultView.prototype.touchHandler = function (e) {
        if (e.currentTarget == this.closeBtn) {
            GodWeaponCC.ins().requestGetAward();
            ViewManager.ins().close(this);
        }
        else if (e.currentTarget == this.get) {
            GodWeaponCC.ins().requestGetAward();
            ViewManager.ins().close(this);
        }
        else if (e.currentTarget == this.closenoget) {
            ViewManager.ins().close(this);
        }
    };
    return GwResultView;
}(BaseEuiView));
__reflect(GwResultView.prototype, "GwResultView");
ViewManager.ins().reg(GwResultView, LayerManager.UI_Popup);
var MijingItemBase2 = (function (_super) {
    __extends(MijingItemBase2, _super);
    function MijingItemBase2() {
        return _super.call(this) || this;
    }
    MijingItemBase2.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.getImg.visible = false;
    };
    return MijingItemBase2;
}(MijingItemBase));
__reflect(MijingItemBase2.prototype, "MijingItemBase2");
//# sourceMappingURL=GwResultView.js.map