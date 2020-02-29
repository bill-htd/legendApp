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
var VipGiftWin = (function (_super) {
    __extends(VipGiftWin, _super);
    function VipGiftWin() {
        var _this = _super.call(this) || this;
        _this.VipPanelList = [];
        _this.skinName = "VipGiftMainSkin";
        _this.isTopLevel = true;
        return _this;
    }
    VipGiftWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    VipGiftWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addChangingEvent(this.tab, this.onTabTouching);
        this.addTouchEvent(this.closeBtn, this.onTouch);
        this.observe(UserVip.ins().postVipGiftBuy, this.updateRedPoint);
        this.curIndex = param[0] ? param[0] : 0;
        this.checkIndex();
        this.create();
        this.updateView();
    };
    VipGiftWin.prototype.checkIndex = function () {
        var page = UserVip.ins().getVipPage();
        if (UserVip.ins().checkVipSuccess(page[this.curIndex])) {
            for (var i = 0; i < page.length; i++) {
                if (this.curIndex == i)
                    continue;
                var hfcount = page[i];
                if (UserVip.ins().checkVipSuccess(hfcount))
                    continue;
                this.curIndex = i;
                break;
            }
        }
    };
    VipGiftWin.prototype.updateView = function () {
        this.VipPanelList[this.curIndex].open(this.curIndex);
        this.tab.selectedIndex = this.viewStack.selectedIndex = this.curIndex;
        this.updateRedPoint();
        var maxVipPage = UserVip.ins().getVipPage();
        for (var i = 0; i < maxVipPage.length; i++) {
            var hfcount = maxVipPage[i];
            var b = UserVip.ins().checkVipSuccess(hfcount);
            if (b) {
                DisplayUtils.removeFromParent(this.VipPanelList[i]);
                DisplayUtils.removeFromParent(this["redPoint" + i]);
            }
        }
    };
    VipGiftWin.prototype.updateRedPoint = function () {
        var maxVipPage = UserVip.ins().getVipPage();
        for (var i = 0; i < maxVipPage.length; i++) {
            var hfcount = maxVipPage[i];
            this["redPoint" + i].visible = false;
            for (var k in GlobalConfig.VipGiftConfig) {
                var hfTimes = GlobalConfig.VipGiftConfig[k].hfTimes ? GlobalConfig.VipGiftConfig[k].hfTimes : 0;
                if (hfcount != hfTimes)
                    continue;
                this["redPoint" + i].visible = UserVip.ins().getVipGiftRedPoint(GlobalConfig.VipGiftConfig[k].id);
                if (this["redPoint" + i].visible)
                    break;
            }
        }
    };
    VipGiftWin.prototype.onTabTouching = function (e) {
        if (!this.checkIsOpen(e.currentTarget.selectedIndex)) {
            e.preventDefault();
            return;
        }
    };
    VipGiftWin.prototype.onTouch = function (e) {
        ViewManager.ins().close(this);
    };
    VipGiftWin.prototype.onTabTouch = function (e) {
        this.setOpenIndex(e.currentTarget.selectedIndex);
    };
    VipGiftWin.prototype.setOpenIndex = function (selectedIndex) {
        this.VipPanelList[selectedIndex].open(this.hfcount[selectedIndex]);
    };
    VipGiftWin.prototype.checkIsOpen = function (index) {
        if (index > GameServer._hefuCount) {
            UserTips.ins().showTips("\u672C\u670D\u672A\u5230" + index + "\u6B21\u5408\u670D");
            return false;
        }
        return true;
    };
    VipGiftWin.prototype.close = function () {
        for (var i = 0; i < this.VipPanelList.length; i++) {
            this.VipPanelList[i].close();
        }
    };
    VipGiftWin.prototype.create = function () {
        this.viewStack.removeChildren();
        this.redPointGroup.removeChildren();
        this.hfcount = UserVip.ins().getVipPage();
        for (var i = 0; i < this.hfcount.length; i++) {
            var panel = new VipGiftPanel(this.hfcount[i]);
            if (!panel)
                continue;
            panel.top = 0;
            panel.left = 0;
            panel.bottom = 0;
            panel.right = 0;
            var config = UserVip.ins().getVipIndex(this.hfcount[i]);
            if (config)
                panel.name = config.pageName ? config.pageName : "";
            this.VipPanelList[i] = panel;
            this.viewStack.addChild(this.VipPanelList[i]);
            this.redPointGroup.addChild(this["redPoint" + i]);
            this["redPoint" + i].visible = false;
        }
    };
    VipGiftWin.prototype.getVipPanel = function (index) {
        for (var i = 0; i < this.VipPanelList.length; i++) {
            if (this.VipPanelList[i].curIndex == index) {
                return this.VipPanelList[i];
            }
        }
        return null;
    };
    return VipGiftWin;
}(BaseEuiView));
__reflect(VipGiftWin.prototype, "VipGiftWin");
ViewManager.ins().reg(VipGiftWin, LayerManager.UI_Main);
//# sourceMappingURL=VipGiftWin.js.map