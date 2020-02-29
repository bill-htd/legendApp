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
var SpringBeginWin = (function (_super) {
    __extends(SpringBeginWin, _super);
    function SpringBeginWin() {
        var _this = _super.call(this) || this;
        _this.activityPanelList = [];
        _this.selectIndex = 0;
        _this.skinName = "springBeginWin";
        _this.isTopLevel = true;
        return _this;
    }
    SpringBeginWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.menuList.itemRenderer = ActivityBtnRenderer;
    };
    SpringBeginWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.updateView();
        this.addTouchEvent(this, this.onTouch);
        this.addChangeEvent(this.menuList, this.onClickMenu);
        this.addEvent(eui.UIEvent.CHANGE_END, this.menuScroller, this.onChange);
        this.observe(Activity.ins().postActivityIsGetAwards, this.refushRedPoint);
        this.observe(Recharge.ins().postUpdateRecharge, this.refushRedPoint);
        this.observe(Recharge.ins().postRechargeTotalDay, this.refushRedPoint);
        this.observe(UserBag.ins().postItemAdd, this.refushRedPoint);
        this.observe(UserBag.ins().postItemChange, this.refushRedPoint);
        this.observe(UserBag.ins().postItemDel, this.refushRedPoint);
        this.selectIndex = 0;
        if (param && param.length) {
            var id = param[0];
            var i = 0;
            for (var k in this._datas) {
                if (this._datas[k].id == id) {
                    this.selectIndex = i;
                    break;
                }
                i++;
            }
        }
        SoundUtil.ins().playEffect(SoundUtil.WINDOW);
        if (this.selectIndex != 0)
            this.activityPanelList[0].close();
        this.activityPanelList[this.selectIndex].open();
        this.viewStack.selectedIndex = this.selectIndex;
        this.menuList.selectedIndex = this.selectIndex;
        Activity.ins().setPalyEffListById(this.activityPanelList[this.selectIndex].activityID, true);
        this.onChange();
    };
    SpringBeginWin.prototype.close = function () {
        this.removeTouchEvent(this, this.onTouch);
        this.removeEventListener(egret.TouchEvent.CHANGE, this.onClickMenu, this.menuList);
        this.removeEventListener(eui.UIEvent.CHANGE_END, this.onChange, this.menuScroller);
        this.removeObserve();
        for (var i = 0; i < this.activityPanelList.length; i++) {
            this.activityPanelList[i].close();
        }
    };
    SpringBeginWin.prototype.onChange = function () {
        if (this.menuList.scrollH < 20) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = true;
        }
        else if (this.menuList.scrollH > (this.menuList.dataProvider.length - 5) * 88 + 2) {
            this.leftBtn.visible = true;
            this.rightBtn.visible = false;
        }
        else {
            this.leftBtn.visible = true;
            this.rightBtn.visible = true;
        }
        this.leftRed.visible = this.rightRed.visible = false;
        var len = this.menuList.dataProvider.length;
        if (len <= 5) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = false;
        }
        else {
            var curIndex = Math.floor(this.menuList.scrollH / 82) + 4;
            if (this.leftBtn.visible) {
                for (var i = 0; i <= curIndex - 5; i++) {
                    if (Activity.ins().getActivityDataById(this._datas[i].id).canReward()) {
                        this.leftRed.visible = true;
                        break;
                    }
                }
            }
            if (this.rightBtn.visible) {
                for (var i = curIndex + 1; i < len; i++) {
                    if (Activity.ins().getActivityDataById(this._datas[i].id).canReward()) {
                        this.rightRed.visible = true;
                        break;
                    }
                }
            }
        }
    };
    SpringBeginWin.prototype.updateView = function () {
        var i = 0;
        for (i = 0; i < this.viewStack.numElements; i++)
            ObjectPool.push(this.viewStack.getElementAt(i));
        this.viewStack.removeChildren();
        this.activityPanelList = [];
        this._datas = [];
        for (var k in Activity.ins().activityData) {
            if (!Activity.ins().activityData[k])
                continue;
            if (Activity.ins().activityData[k].pageStyle == ActivityPageStyle.SPRINGBEGIN && Activity.ins().getActivityDataById(+k).isOpenActivity() && !Activity.ins().getActivityDataById(+k).getHide())
                this._datas.push(Activity.ins().getbtnInfo(k));
        }
        this._datas.sort(this.sort);
        i = 0;
        for (var k in this._datas) {
            var id = this._datas[k].id;
            var act = Activity.ins().getActivityDataById(+id);
            var panel = ActivityPanel.create(id, act.activityType);
            panel.top = 0;
            panel.left = 0;
            panel.bottom = 0;
            panel.right = 0;
            this.activityPanelList[i] = panel;
            this.viewStack.addChild(this.activityPanelList[i]);
            i++;
        }
        this.dataArr = new eui.ArrayCollection(this._datas);
        this.menuList.dataProvider = this.dataArr;
        this.viewStack.validateNow();
        this.menuList.validateNow();
    };
    SpringBeginWin.prototype.refushRedPoint = function () {
        this.dataArr.replaceAll(this._datas);
        this.menuList.dataProvider = this.dataArr;
    };
    SpringBeginWin.prototype.sort = function (a, b) {
        if (a.sort > b.sort)
            return 1;
        else if (a.sort < b.sort)
            return -1;
        else
            return 0;
    };
    SpringBeginWin.prototype.onTouch = function (e) {
        var num = 92 * 5;
        var scrollH = 0;
        switch (e.target) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.leftBtn:
                scrollH = this.menuList.scrollH - num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH < 0) {
                    scrollH = 0;
                }
                this.menuList.scrollH = scrollH;
                this.onChange();
                break;
            case this.rightBtn:
                scrollH = this.menuList.scrollH + num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH > this.menuList.contentWidth - this.menuScroller.width) {
                    scrollH = this.menuList.contentWidth - this.menuScroller.width;
                }
                this.menuList.scrollH = scrollH;
                this.onChange();
                break;
        }
    };
    SpringBeginWin.prototype.onClickMenu = function (e) {
        if (this.selectIndex != e.currentTarget.selectedIndex) {
            SoundUtil.ins().playEffect(SoundUtil.WINDOW);
            this.activityPanelList[this.selectIndex].close();
        }
        else
            return;
        this.selectIndex = e.currentTarget.selectedIndex;
        this.activityPanelList[this.selectIndex].open();
        this.viewStack.selectedIndex = this.selectIndex;
        this.menuList.selectedIndex = this.selectIndex;
        Activity.ins().setPalyEffListById(this.activityPanelList[this.selectIndex].activityID, true);
    };
    return SpringBeginWin;
}(BaseEuiView));
__reflect(SpringBeginWin.prototype, "SpringBeginWin");
ViewManager.ins().reg(SpringBeginWin, LayerManager.UI_Main);
//# sourceMappingURL=SpringBeginWin.js.map