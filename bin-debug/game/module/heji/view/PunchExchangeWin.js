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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PunchExchangeWin = (function (_super) {
    __extends(PunchExchangeWin, _super);
    function PunchExchangeWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentSelect = 0;
        return _this;
    }
    PunchExchangeWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.skinName = "PunchExchangeSkin";
        this.goturn.textFlow = [{ text: "\u788E\u7247\u5151\u6362", style: { underline: true } }];
        this.exchangelist.itemRenderer = PunchExchangeItem;
        this.equiplist.itemRenderer = PunchExchangeBtn;
        this.initMenu();
    };
    PunchExchangeWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.data = param[0];
        this.equiplist.addEventListener(egret.Event.CHANGING, this.checkIsOpen, this);
        this.observe(Actor.ins().postUpdateTogeatter, this.onListChange);
        this.addTouchEvent(this.goturn, this.onTap);
        this.equiplist.selectedIndex = this.currentSelect;
        this.refushInfo();
    };
    PunchExchangeWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.equiplist.removeEventListener(egret.TouchEvent.CHANGING, this.checkIsOpen, this);
        this.removeTouchEvent(this.goturn, this.onTap);
        this.removeObserve();
    };
    PunchExchangeWin.prototype.onListChange = function (egret) {
        this.currentSelect = this.equiplist.selectedIndex;
        this.refushInfo();
    };
    PunchExchangeWin.prototype.initMenu = function () {
        this.menuArr = [];
        this.exchangeArr = [];
        var config = GlobalConfig.TogetherHitEquipPageConfig;
        var index = 0;
        var zlv = UserSkill.ins().getMaxzLv();
        for (var k in config) {
            var id0 = config[k].id[0];
            var conf = GlobalConfig.TogetherHitEquipExchangeConfig[id0];
            if (conf.zsLevel > zlv[0] || conf.level > zlv[1]) {
                break;
            }
            this.menuArr.push({ config: config[k], index: +k });
            this.exchangeArr[index] = [];
            for (var i in config[k].id) {
                var item = GlobalConfig.TogetherHitEquipExchangeConfig[config[k].id[i]];
                this.exchangeArr[index].push(item);
            }
            index++;
        }
    };
    PunchExchangeWin.prototype.refushInfo = function () {
        this.suipian.text = "" + Actor.togeatter1;
        this.suipian1.text = "" + Actor.togeatter2;
        this.equiplist.dataProvider = new eui.ArrayCollection(this.menuArr);
        var currentList = this.exchangeArr[this.currentSelect];
        this.exchangelist.dataProvider = new eui.ArrayCollection(currentList);
    };
    PunchExchangeWin.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        if (tar == this.goturn) {
            ViewManager.ins().open(PunchTransformWin);
        }
    };
    PunchExchangeWin.prototype.checkIsOpen = function (e) {
        var list = e.target;
        var config = this.exchangeArr[list.selectedIndex][0];
        var zsLv = config.zsLevel || 0;
        var lv = config.level;
        var boo = true;
        if (!boo) {
            var str = Actor.level >= lv ? zsLv + "\u8F6C\u5F00\u542F" : lv + "\u7EA7\u5F00\u542F";
            UserTips.ins().showTips(str + "\u5F00\u542F");
            e.$cancelable = true;
            e.preventDefault();
            return;
        }
        else {
            this.onListChange(null);
        }
    };
    __decorate([
        callLater
    ], PunchExchangeWin.prototype, "onListChange", null);
    return PunchExchangeWin;
}(BaseEuiView));
__reflect(PunchExchangeWin.prototype, "PunchExchangeWin");
ViewManager.ins().reg(PunchExchangeWin, LayerManager.UI_Main);
//# sourceMappingURL=PunchExchangeWin.js.map