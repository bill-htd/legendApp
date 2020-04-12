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
var FuliWin = (function (_super) {
    __extends(FuliWin, _super);
    function FuliWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "FuliMainSkin";
        _this.isTopLevel = true;
        return _this;
    }
    FuliWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.iconList.itemRenderer = FuliActBtnRenderer;
        this.allPanels = [DailyCheckInPanel, SevenDayLogWin, MonthCardWin, FranchiseWin, GameNoticePanle, CdkeyPanle];
        this.panels = [];
        this.arrList = new eui.ArrayCollection();
    };
    FuliWin.prototype.onTouchBtn = function (e) {
        var num = 92 * 5;
        var scrollH = 0;
        switch (e.target) {
            case this.leftBtn:
                scrollH = this.iconList.scrollH - num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH < 0) {
                    scrollH = 0;
                }
                this.iconList.scrollH = scrollH;
                break;
            case this.rightBtn:
                scrollH = this.iconList.scrollH + num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH > this.iconList.contentWidth - this.listBar.width) {
                    scrollH = this.iconList.contentWidth - this.listBar.width;
                }
                this.iconList.scrollH = scrollH;
                break;
        }
        this.onChange();
    };
    FuliWin.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addChangeEvent(this.listBar, this.onChange);
        this.addChangeEvent(this.iconList, this.onClickMenu);
        this.addTouchEvent(this.leftBtn, this.onTouchBtn);
        this.addTouchEvent(this.rightBtn, this.onTouchBtn);
        this.observe(Notice.ins().postGameNotice, this.updateMenuList);
        this.observe(DailyCheckIn.ins().postCheckInData, this.updateMenuList);
        this.observe(Activity.ins().postSevendayAwardCallback, this.updateMenuList);
        this.observe(Recharge.ins().postFranchiseInfo, this.updateMenuList);
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateMenuList);
        this.index = 0;
        if (param[0]) {
            this.index = param[0];
            this.initFunc = function () {
                if (_this.allPanels[_this.index] != _this.panels[_this.index]) {
                    var dif = _this.allPanels.length - _this.panels.length;
                    dif = dif > 0 ? dif : 0;
                    _this.index -= dif;
                }
            };
        }
        this.updateMenuList([true], param[1]);
    };
    FuliWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.cruPanel.close();
    };
    FuliWin.prototype.updateMenuList = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._datas = [];
        this.panels = this.allPanels;
        var change = false;
        var baoji = 0;
        var cfg;
        if (param && param[0]) {
            if (param[0][0])
                change = param[0][0];
            if (param[0][1])
                baoji = param[0][1];
        }
        for (var k in GlobalConfig.WelfareConfig) {
            cfg = GlobalConfig.WelfareConfig[k];
            this._datas.push(cfg);
        }
        var isSuccess = true;
        for (var i in GlobalConfig.LoginRewardsConfig) {
            var config = GlobalConfig.LoginRewardsConfig[i];
            if ((Activity.ins().isAwards >> config.day & 1) == 0) {
                isSuccess = false;
                break;
            }
        }
        if (isSuccess) {
            this.panels = [];
            for (var i = 0, j = 0; i < this._datas.length; j++) {
                cfg = this._datas[i];
                if (cfg.id == 1) {
                    this._datas.splice(i, 1);
                }
                else {
                    this.panels.push(this.allPanels[j]);
                    i++;
                }
            }
        }
        this.arrList.replaceAll(this._datas);
        if (this.initFunc) {
            this.initFunc();
            this.initFunc = null;
        }
        this.iconList.selectedIndex = this.index;
        this.iconList.dataProvider = this.arrList;
        if (change) {
            this.curId = this.iconList.selectedIndex;
            this.updateDetail(param[1]);
        }
        this.btnNum = this._datas.length;
        this.onChange();
    };
    FuliWin.prototype.onClickMenu = function (e) {
        SoundUtil.ins().playEffect(SoundUtil.WINDOW);
        this.curId = this.iconList.selectedIndex;
        this.index = this.curId;
        this.updateDetail();
    };
    FuliWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
        }
    };
    FuliWin.prototype.onChange = function () {
        if (this.iconList.scrollH < 46) {
            this.leftGroup.visible = false;
            this.rightGroup.visible = true;
        }
        else if (this.iconList.scrollH >= this.iconList.contentWidth - this.iconList.width - 46) {
            this.leftGroup.visible = true;
            this.rightGroup.visible = false;
        }
        else {
            this.leftGroup.visible = true;
            this.rightGroup.visible = true;
        }
        if (this.btnNum <= 5) {
            this.leftGroup.visible = false;
            this.rightGroup.visible = false;
        }
    };
    FuliWin.prototype.updateDetail = function (parma) {
        if (this.cruPanel) {
            DisplayUtils.removeFromParent(this.cruPanel);
            this.cruPanel.close();
        }
        this.cruPanel = new this.panels[this.curId];
        if (!UserFuLi.ins().isOpen[this.curId]) {
            UserFuLi.ins().isOpen[this.curId] = true;
            this.updateMenuList();
        }
        if (this.cruPanel) {
            this.cruPanel.left = 0;
            this.cruPanel.right = 0;
            this.cruPanel.top = 0;
            this.cruPanel.bottom = 0;
            this.info.addChild(this.cruPanel);
            this.cruPanel.open(parma);
        }
    };
    return FuliWin;
}(BaseEuiView));
__reflect(FuliWin.prototype, "FuliWin");
ViewManager.ins().reg(FuliWin, LayerManager.UI_Main);
//# sourceMappingURL=FuliWin.js.map