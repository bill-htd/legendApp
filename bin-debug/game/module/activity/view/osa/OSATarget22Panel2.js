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
var OSATarget22Panel2 = (function (_super) {
    __extends(OSATarget22Panel2, _super);
    function OSATarget22Panel2(id) {
        var _this = _super.call(this) || this;
        _this.activityID = id;
        _this.setCurSkin();
        return _this;
    }
    OSATarget22Panel2.prototype.setCurSkin = function () {
        var aCon = GlobalConfig.ActivityConfig[this.activityID];
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "FDStoreSkin";
    };
    OSATarget22Panel2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.listView.itemRenderer = FDstoreItemRender;
    };
    OSATarget22Panel2.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setCurSkin();
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateData);
        this.observe(UserBag.ins().postItemAdd, this.updateMaterial);
        this.observe(UserBag.ins().postItemChange, this.updateMaterial);
        this.observe(UserBag.ins().postItemDel, this.updateMaterial);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.addTouchEvent(this, this.onTouch);
        this.updateData();
        this.updateMaterial();
        this.setTime();
    };
    OSATarget22Panel2.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this, this.onTouch);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
        if (this.objList) {
            var obj = void 0;
            for (var i = 0; i < this.objList.length; i++) {
                obj = this.objList.shift();
                egret.Tween.removeTweens(obj);
                DisplayUtils.removeFromParent(obj);
            }
            this.objList = null;
        }
    };
    OSATarget22Panel2.prototype.updateData = function () {
        if (!this._collect) {
            this._collect = new ArrayCollection();
            this.listView.dataProvider = this._collect;
        }
        var data = Activity.ins().activityData[this.activityID];
        var datas = [];
        var items = data.shopItems;
        var len = items ? items.length : 0;
        for (var i = 0; i < len; i++)
            datas.push({ data: items[i], activityID: this.activityID });
        this.noGoods.visible = !datas || !datas.length;
        this._collect.source = datas;
        this.redPoint.visible = data.refreshFree;
        this.refresh.visible = this.priceTxt.visible = this.moneyIcon.visible = !data.refreshFree;
        var cfg1 = GlobalConfig.ActivityType22_1Config[this.activityID][1];
        this.priceTxt.text = cfg1.freshPrice + "";
        this.refreshFree.visible = data.refreshFree;
        this.icon.source = GlobalConfig.ItemConfig[cfg1.costItem].icon + "_png";
        items = data.limitItems;
        len = items ? items.length : 0;
        var vo;
        var limitItem;
        for (var i = 0; i < 5; i++) {
            limitItem = this["itemShow" + i];
            if (i <= len - 1) {
                vo = items[i];
                limitItem.visible = true;
                limitItem.update({ itemID: vo.itemID, max: vo.buyMax, buy: vo.buyCount });
            }
            else
                limitItem.visible = false;
        }
    };
    OSATarget22Panel2.prototype.updateMaterial = function () {
        var itemData = UserBag.ins().getBagItemById(GlobalConfig.ActivityType22_1Config[this.activityID][1].costItem);
        var count = itemData ? itemData.count : 0;
        this.point.text = "X" + count;
        this.point.textColor = count ? 0x00FF00 : 0xFF0000;
    };
    OSATarget22Panel2.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.refreshShopBtn:
                var data = Activity.ins().activityData[this.activityID];
                if (data.refreshFree)
                    Activity.ins().sendReward(this.activityID, 0, 5, 0);
                else {
                    var price = GlobalConfig.ActivityType22_1Config[this.activityID][1].freshPrice;
                    if (Actor.yb < price)
                        UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
                    else {
                        Activity.ins().sendReward(this.activityID, 0, 5, 0);
                        this.flyRMB(price);
                    }
                }
                break;
        }
    };
    OSATarget22Panel2.prototype.flyRMB = function (rmb) {
        var _this = this;
        if (!this.objList)
            this.objList = [];
        var obj = new eui.BitmapLabel();
        obj.font = 'num_2_fnt';
        obj.y = -10;
        obj.x = 460;
        obj.scaleX = obj.scaleY = 1.5;
        obj.text = "-" + rmb;
        this.addChild(obj);
        this.objList.push(obj);
        egret.Tween.get(obj).to({ y: obj.y + 50 }, 1000).call(function () {
            DisplayUtils.removeFromParent(obj);
            _this.objList.shift();
        });
    };
    OSATarget22Panel2.prototype.setTime = function () {
        var data = Activity.ins().activityData[this.activityID];
        var time = data.getRefreshTime();
        this.refreshTime.text = DateUtils.getFormatBySecond(time > 0 ? time : 0, DateUtils.TIME_FORMAT_1, 5);
        this.refreshTime.visible = this.refreshTip.visible = time > 0;
    };
    return OSATarget22Panel2;
}(BaseView));
__reflect(OSATarget22Panel2.prototype, "OSATarget22Panel2");
//# sourceMappingURL=OSATarget22Panel2.js.map