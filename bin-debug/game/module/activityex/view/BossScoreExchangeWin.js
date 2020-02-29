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
var BossScoreExchangeWin = (function (_super) {
    __extends(BossScoreExchangeWin, _super);
    function BossScoreExchangeWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentSelect = 0;
        return _this;
    }
    BossScoreExchangeWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.skinName = "hefuBossjifenSkin";
        this.equiplist.itemRenderer = BossScoreExchangeBtn;
        this.dataArr = new eui.ArrayCollection;
        this.listData = {};
        this.menuData = [];
    };
    BossScoreExchangeWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.activityID = param[0];
        this.initMenu();
        var cfg = GlobalConfig.ActivityType7Config[this.activityID][1];
        if (cfg && cfg.showType == ActivityType7Data.TYPE_RING) {
            this.currentState = "lyring";
            this.exchangelist.itemRenderer = RingBossScoreExchangeItem;
        }
        else {
            this.currentState = "hefu";
            this.equiplist.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTap, this);
            this.exchangelist.itemRenderer = BossScoreExchangeItem;
        }
        this.observe(Activity.ins().postRewardResult, this.onListChange);
        this.observe(Activity.ins().postChangePage, this.ChangePageCallBack);
        this.addTouchEvent(this.bgClose, this.onClick);
        this.addTouchEvent(this.closeBtn, this.onClick);
        if (cfg && cfg.showType != ActivityType7Data.TYPE_RING)
            this.equiplist.selectedIndex = this.currentSelect;
        this.refushInfo();
    };
    BossScoreExchangeWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onClick);
        this.removeTouchEvent(this.closeBtn, this.onClick);
        this.equiplist.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTap, this);
        this.removeObserve();
    };
    BossScoreExchangeWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    BossScoreExchangeWin.prototype.onListChange = function () {
        Activity.ins().sendChangePage(this.activityID);
    };
    BossScoreExchangeWin.prototype.ChangePageCallBack = function () {
        this.refushInfo();
    };
    BossScoreExchangeWin.prototype.initMenu = function () {
        var config = GlobalConfig.ActivityType7Config[this.activityID];
        var index = -1;
        var curTitle = 0;
        for (var k in config) {
            if (curTitle != config[k].title) {
                curTitle = config[k].title;
                index++;
                if (!this.menuData)
                    this.menuData = [];
                this.menuData.push({ id: config[k].Id, index: config[k].index });
            }
            if (!this.listData[index])
                this.listData[index] = [];
            this.listData[index].push(config[k]);
        }
    };
    BossScoreExchangeWin.prototype.refushInfo = function () {
        var data = Activity.ins().getActivityDataById(this.activityID);
        this.suipian.text = "" + data.bossScore;
        this.dataArr.replaceAll(this.listData[this.currentSelect].concat());
        this.exchangelist.dataProvider = this.dataArr;
        this.exchangelist.scrollV = 0;
        this.exchangelist.validateNow();
        var cfg = GlobalConfig.ActivityType7Config[this.activityID][1];
        if (cfg && cfg.showType != ActivityType7Data.TYPE_RING)
            this.equiplist.dataProvider = new eui.ArrayCollection(this.menuData);
    };
    BossScoreExchangeWin.prototype.onListTap = function (e) {
        if (e && e.itemRenderer && e.item) {
            if (this.listData[this.currentSelect][e.itemIndex]) {
            }
        }
    };
    BossScoreExchangeWin.prototype.onTap = function (e) {
        if (e && e.itemRenderer && e.item) {
            this.currentSelect = e.itemIndex;
            this.refushInfo();
        }
    };
    return BossScoreExchangeWin;
}(BaseEuiView));
__reflect(BossScoreExchangeWin.prototype, "BossScoreExchangeWin");
ViewManager.ins().reg(BossScoreExchangeWin, LayerManager.UI_Popup);
//# sourceMappingURL=BossScoreExchangeWin.js.map