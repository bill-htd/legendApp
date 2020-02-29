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
var ThanksGivingWin = (function (_super) {
    __extends(ThanksGivingWin, _super);
    function ThanksGivingWin() {
        var _this = _super.call(this) || this;
        _this.activityPanelList = [];
        _this.skinName = "ActivityWinSkin";
        _this.isTopLevel = true;
        _this.selectIndex = 0;
        return _this;
    }
    ThanksGivingWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.menuList.itemRenderer = ActivityBtnRenderer;
    };
    ThanksGivingWin.prototype.checkIndexByActivityId = function (actId) {
        for (var i = 0; i < this.activityPanelList.length; i++) {
            if (this.activityPanelList[i].activityID == actId) {
                return i;
            }
        }
        return 0;
    };
    ThanksGivingWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        for (var k in Activity.ins().activityData) {
            if (!Activity.ins().activityData[k])
                continue;
            if (Activity.ins().activityData[k].pageStyle != ActivityPageStyle.THANKS)
                continue;
            if (Activity.ins().getActivityDataById(+k).isOpenActivity()) {
                return true;
            }
        }
        UserTips.ins().showTips("|C:0xff0000&T:\u5F88\u9057\u61BE,\u611F\u6069\u8282\u6D3B\u52A8\u5DF2\u7ECF\u7ED3\u675F\u4E86");
        return false;
    };
    ThanksGivingWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.actId = param[0];
        this.updateView();
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.closeBtn0, this.onClick);
        this.addChangeEvent(this.menuList, this.onClickMenu);
        this.addTouchEvent(this.leftBtn, this.onTouchBtn);
        this.addTouchEvent(this.rightBtn, this.onTouchBtn);
        this.observe(Activity.ins().postActivityPanel, this.updatePanel);
        this.observe(Activity.ins().postActivityIsGetAwards, this.refushRedPoint);
        this.observe(Recharge.ins().postUpdateRecharge, this.refushRedPoint);
        this.observe(Recharge.ins().postRechargeTotalDay, this.refushRedPoint);
        this.observe(Recharge.ins().postUpdateRechargeEx, this.refushRedPoint);
        this.observe(Activity.ins().postChangePage, this.ChangePageCallBack);
        this.addChangeEvent(this.menuScroller, this.onChange);
    };
    ThanksGivingWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onClick);
        this.removeTouchEvent(this.closeBtn0, this.onClick);
        this.menuList.removeEventListener(egret.Event.CHANGE, this.onClickMenu, this);
        this.removeTouchEvent(this.leftBtn, this.onTouchBtn);
        this.removeTouchEvent(this.rightBtn, this.onTouchBtn);
        this.menuScroller.removeEventListener(egret.Event.CHANGE, this.onChange, this);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
        for (var i = 0; i < this.activityPanelList.length; i++) {
            this.activityPanelList[i].close();
        }
    };
    ThanksGivingWin.prototype.refushRedPoint = function () {
        this.dataArr.replaceAll(this.BtnArr);
        this.menuList.dataProvider = this.dataArr;
    };
    ThanksGivingWin.prototype.updateView = function () {
        var index = 0;
        var i = 0;
        for (var i_1 = 0; i_1 < this.viewStack.numElements; i_1++) {
            ObjectPool.push(this.viewStack.getElementAt(i_1));
        }
        this.viewStack.removeChildren();
        this.activityPanelList = [];
        this._datas = [];
        i = 0;
        for (var k in Activity.ins().activityData) {
            if (!Activity.ins().activityData[k])
                continue;
            if (Activity.ins().activityData[k].pageStyle != ActivityPageStyle.THANKS) {
                continue;
            }
            if (Activity.ins().getActivityDataById(+k).isOpenActivity()) {
                var data = Activity.ins().getbtnInfo(k);
                if (!ErrorLog.Assert(data, "ThanksGivingWin  data   " + k))
                    this._datas.push(data);
            }
        }
        this._datas.sort(this.sort);
        this.BtnArr = [];
        for (var k in this._datas) {
            var id = this._datas[k].id;
            var act = void 0;
            if (this._datas[k].activityType == ActivityType.Normal) {
                act = Activity.ins().getActivityDataById(+id);
            }
            else if (this._datas[k].activityType == ActivityType.Personal) {
                act = PActivity.ins().getActivityDataById(+id);
            }
            if (act && act.id == id) {
                var hide = act.getHide();
                if (!hide) {
                    var panel = ActivityPanel.create(id, act.activityType);
                    if (!panel)
                        continue;
                    panel.top = 0;
                    panel.left = 0;
                    panel.bottom = 0;
                    panel.right = 0;
                    this.activityPanelList[i] = panel;
                    this.viewStack.addChild(this.activityPanelList[i]);
                    this.BtnArr.push(this._datas[k]);
                    if (this.actId && this.actId == id) {
                        index = i;
                    }
                    i++;
                }
            }
        }
        this.dataArr = new eui.ArrayCollection(this.BtnArr);
        this.menuList.dataProvider = this.dataArr;
        this.onChange();
        if (this.viewStack.numElements > 0) {
            this.setOpenIndex(index);
        }
        this.viewStack.validateNow();
        this.menuList.validateNow();
        if (index >= 5) {
            var scrollH = 92 * index;
            if (scrollH > this.menuList.contentWidth - this.menuScroller.width) {
                scrollH = this.menuList.contentWidth - this.menuScroller.width;
            }
            this.menuList.scrollH = scrollH;
        }
        this.title.source = "biaoti_ganen";
    };
    ThanksGivingWin.prototype.updatePanel = function (activityID) {
        for (var k in this.activityPanelList) {
            if (this.activityPanelList[k].activityID == activityID) {
                this.activityPanelList[k].updateData();
                break;
            }
        }
    };
    ThanksGivingWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
        }
    };
    ThanksGivingWin.prototype.setOpenIndex = function (selectedIndex) {
        this.activityPanelList[selectedIndex].open();
        this.viewStack.selectedIndex = selectedIndex;
        this.menuList.selectedIndex = selectedIndex;
        Activity.ins().setPalyEffListById(this.activityPanelList[selectedIndex].activityID, true);
        this.refushRedPoint();
    };
    ThanksGivingWin.prototype.onClickMenu = function (e) {
        this.actId = 0;
        if (this.selectIndex != e.currentTarget.selectedIndex) {
            SoundUtil.ins().playEffect(SoundUtil.WINDOW);
            if (this.activityPanelList[this.selectIndex])
                this.activityPanelList[this.selectIndex].close();
        }
        this.selectIndex = e.currentTarget.selectedIndex;
        if (this.activityPanelList[this.selectIndex].activityID > 10000)
            this.setOpenIndex(this.selectIndex);
        else {
            var config = GlobalConfig.ActivityConfig[this.activityPanelList[this.selectIndex].activityID];
            if (config) {
                if (config.activityType == 3) {
                    this.setOpenIndex(this.selectIndex);
                }
                else {
                    Activity.ins().sendChangePage(this.activityPanelList[this.selectIndex].activityID);
                }
            }
        }
    };
    ThanksGivingWin.prototype.ChangePageCallBack = function () {
        if (this.actId)
            this.selectIndex = this.checkIndexByActivityId(this.actId);
        this.setOpenIndex(this.selectIndex);
    };
    ThanksGivingWin.prototype.onChange = function () {
        if (this.menuList.scrollH < 46) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = true;
        }
        else if (this.menuList.scrollH >= this.menuList.contentWidth - this.menuList.width - 46) {
            this.leftBtn.visible = true;
            this.rightBtn.visible = false;
        }
        else {
            this.leftBtn.visible = true;
            this.rightBtn.visible = true;
        }
        if (this.viewStack.numElements <= 5) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = false;
        }
        this.leftRed.visible = this.leftBtn.visible;
        this.rightRed.visible = this.rightBtn.visible;
    };
    ThanksGivingWin.prototype.onTouchBtn = function (e) {
        var num = 92 * 5;
        var scrollH = 0;
        switch (e.target) {
            case this.leftBtn:
                scrollH = this.menuList.scrollH - num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH < 0) {
                    scrollH = 0;
                }
                this.menuList.scrollH = scrollH;
                break;
            case this.rightBtn:
                scrollH = this.menuList.scrollH + num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH > this.menuList.contentWidth - this.menuScroller.width) {
                    scrollH = this.menuList.contentWidth - this.menuScroller.width;
                }
                this.menuList.scrollH = scrollH;
                break;
        }
        this.onChange();
    };
    ThanksGivingWin.prototype.sort = function (a, b) {
        if (a.sort > b.sort)
            return 1;
        else if (a.sort < b.sort)
            return -1;
        else
            return 0;
    };
    return ThanksGivingWin;
}(BaseEuiView));
__reflect(ThanksGivingWin.prototype, "ThanksGivingWin");
ViewManager.ins().reg(ThanksGivingWin, LayerManager.UI_Main);
//# sourceMappingURL=ThanksGivingWin.js.map