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
var OSATarget22Panel1 = (function (_super) {
    __extends(OSATarget22Panel1, _super);
    function OSATarget22Panel1(id) {
        var _this = _super.call(this) || this;
        _this.activityID = id;
        _this.setCurSkin();
        return _this;
    }
    OSATarget22Panel1.prototype.setCurSkin = function () {
        var aCon = GlobalConfig.ActivityConfig[this.activityID];
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "activityStoreSkin";
    };
    OSATarget22Panel1.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.goodsOverView.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + this.goodsOverView.text);
        this.listView.itemRenderer = ActivityStoreItemRender;
    };
    OSATarget22Panel1.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setCurSkin();
        var aCon = GlobalConfig.ActivityConfig[this.activityID];
        this.actInfo0.text = aCon.desc;
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateData);
        this.observe(UserBag.ins().postItemAdd, this.updateMaterial);
        this.observe(UserBag.ins().postItemChange, this.updateMaterial);
        this.observe(UserBag.ins().postItemDel, this.updateMaterial);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.addTouchEvent(this, this.onTouch);
        this.currentState = "activityStore";
        this.updateData();
        this.updateMaterial();
    };
    OSATarget22Panel1.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this, this.onTouch);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    OSATarget22Panel1.prototype.updateMaterial = function () {
        var itemData = UserBag.ins().getBagItemById(GlobalConfig.ActivityType22_1Config[this.activityID][1].freshItem);
        var count = itemData ? itemData.count : 0;
        this.refreshItemNum.textFlow = TextFlowMaker.generateTextFlow("|C:" + (count ? 0x00ff00 : 0xff0000) + "&T:" + count);
        this._isEnough = count > 0;
        if (this.currentState == "activityStore") {
            var data = Activity.ins().activityData[this.activityID];
            this.redPoint1.visible = data.refreshFree || this._isEnough;
        }
    };
    OSATarget22Panel1.prototype.updateData = function () {
        if (!this._collect) {
            this._collect = new ArrayCollection();
            this.listView.dataProvider = this._collect;
        }
        var data = Activity.ins().activityData[this.activityID];
        var datas = [];
        var items = this.currentState == "activityStore" ? data.shopItems : data.scoreItems;
        var len = items ? items.length : 0;
        for (var i = 0; i < len; i++)
            datas.push({ data: items[i], isScore: this.currentState == "integralStore", activityID: this.activityID });
        this._collect.source = datas;
        if (this.currentState == "activityStore") {
            this.costGroup.visible = !data.refreshFree;
            this.price.text = GlobalConfig.ActivityType22_1Config[this.activityID][1].freshPrice + "";
            this.refreshShopBtn.label = data.refreshFree ? "免费刷新" : "刷   新";
            this.redPoint1.visible = data.refreshFree || this._isEnough;
            var config = Activity.ins().getConfig22_3(this.activityID);
            this.redPoint0.visible = config && data.tScore >= config.score;
        }
        this.integralNum.text = data.tScore + "";
        var itemcfg = GlobalConfig.ItemConfig[GlobalConfig.ActivityType22_1Config[this.activityID][1].freshItem];
        this.refreshItem.source = itemcfg ? itemcfg.icon + "_png" : "";
    };
    OSATarget22Panel1.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.goodsOverView:
                ViewManager.ins().open(ActivityStoreRewardShowWin, this.activityID);
                break;
            case this.integralStoreBtn:
                this.currentState = this.currentState == "integralStore" ? "activityStore" : "integralStore";
                this.updateData();
                break;
            case this.refreshShopBtn:
                var data = Activity.ins().activityData[this.activityID];
                if (data.refreshFree)
                    Activity.ins().sendReward(this.activityID, 0, 5, 0);
                else {
                    if (Actor.yb < GlobalConfig.ActivityType22_1Config[this.activityID][1].freshPrice && !this._isEnough)
                        UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
                    else
                        Activity.ins().sendReward(this.activityID, 0, 5, 0);
                }
                break;
        }
    };
    OSATarget22Panel1.prototype.setTime = function () {
        var data = Activity.ins().activityData[this.activityID];
        this.actTime0.text = data.getRemainTime();
        var time = data.getRefreshTime();
        this.refreshTime.text = DateUtils.getFormatBySecond(time > 0 ? time : 0, DateUtils.TIME_FORMAT_1, 5);
    };
    return OSATarget22Panel1;
}(BaseView));
__reflect(OSATarget22Panel1.prototype, "OSATarget22Panel1");
//# sourceMappingURL=OSATarget22Panel1.js.map