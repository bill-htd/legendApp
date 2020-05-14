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
var OSATarget0Panel2 = (function (_super) {
    __extends(OSATarget0Panel2, _super);
    function OSATarget0Panel2() {
        var _this = _super.call(this) || this;
        _this.arrAll = [];
        _this.skinName = "Days42Recharge";
        return _this;
    }
    OSATarget0Panel2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.content.useVirtualLayout = true;
        this.content.itemRenderer = OSATargetDays42ItemRender;
        this.bigReward.itemRenderer = OSATargetDays42ItemRender2;
    };
    OSATarget0Panel2.prototype.open = function () {
        if (this.content.dataProvider) {
            this.updateData();
        }
        else {
            this.updateList();
        }
        this.observe(Recharge.ins().postRechargeTotalDay, this.updateData);
    };
    OSATarget0Panel2.prototype.updateList = function () {
        var arr = [];
        var bigArr = [];
        var ybAward = new RewardData();
        ybAward.count = 0;
        ybAward.id = 2;
        ybAward.type = 0;
        var byConfig = { id: 100, awardList: [ybAward] };
        bigArr.push(byConfig);
        var list = Recharge.ins().getRechargeList();
        for (var id in list) {
            var conf = list[id];
            this.arrAll.push(conf);
            ybAward.id = conf.awardList[0].id;
            ybAward.type = conf.awardList[0].type;
            ybAward.count += conf.awardList[0].count;
        }
        this.arrAll.sort(this.sort);
        for (var i = 0; i < 15; i++) {
            arr.push(this.arrAll[i]);
            if (this.arrAll[i].awardList.length > 1) {
                bigArr.push(this.arrAll[i]);
            }
        }
        bigArr.sort(this.sort2);
        this.content.dataProvider = new eui.ArrayCollection(arr.splice(0, 4));
        this.delayUpdate(arr);
        this.bigReward.dataProvider = new eui.ArrayCollection(bigArr);
        var data = Activity.ins().getbtnInfo(this.activityID);
        this.actDesc.text = data.acDesc;
    };
    OSATarget0Panel2.prototype.delayUpdate = function (arr) {
        var ac = this.content.dataProvider;
        ac.addItem(arr.shift());
        if (arr.length)
            this.delayUpdate(arr);
    };
    OSATarget0Panel2.prototype.sort = function (a, b) {
        var hasGetDay = Recharge.ins().rechargeTotal.hasGetDays;
        if (hasGetDay.indexOf(a.id) >= 0 && hasGetDay.indexOf(b.id) < 0)
            return 1;
        else if (hasGetDay.indexOf(a.id) < 0 && hasGetDay.indexOf(b.id) >= 0)
            return -1;
        if (a.id < b.id)
            return -1;
        return 1;
    };
    OSATarget0Panel2.prototype.sort2 = function (a, b) {
        if (a.id < b.id)
            return 1;
        return -1;
    };
    OSATarget0Panel2.prototype.close = function () {
        this.removeObserve();
    };
    OSATarget0Panel2.prototype.updateData = function () {
        var arr = [];
        var bigArr = [];
        this.arrAll.sort(this.sort);
        for (var i = 0; i < 15; i++) {
            arr.push(this.arrAll[i]);
            if (this.arrAll[i].awardList.length > 1) {
                bigArr.push(this.arrAll[i]);
            }
        }
        this.content.dataProvider = new eui.ArrayCollection(arr.splice(0, 4));
        this.delayUpdate(arr);
        bigArr.sort(this.sort2);
        this.bigReward.dataProvider = new eui.ArrayCollection(bigArr);
    };
    __decorate([
        callLater
    ], OSATarget0Panel2.prototype, "delayUpdate", null);
    return OSATarget0Panel2;
}(BaseView));
__reflect(OSATarget0Panel2.prototype, "OSATarget0Panel2");
//# sourceMappingURL=OSATarget0Panel2.js.map