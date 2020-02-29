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
var LabaChangeItemRender = (function (_super) {
    __extends(LabaChangeItemRender, _super);
    function LabaChangeItemRender() {
        return _super.call(this) || this;
    }
    LabaChangeItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward.itemRenderer = ItemBase;
        this.get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    LabaChangeItemRender.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var config = this.data.config;
        var state = this.data.state;
        var actData = Activity.ins().getActivityDataById(config.Id);
        if (!this._dataCollect) {
            this._dataCollect = new ArrayCollection();
            this.reward.dataProvider = this._dataCollect;
        }
        this.result.data = config.rewards[0];
        var items = [];
        for (var i in config.items) {
            var itemcfg = GlobalConfig.ItemConfig[config.items[i].id];
            var item = { id: config.items[i].id, count: config.items[i].count, type: ItemConfig.getType(itemcfg) };
            items.push(item);
        }
        this._dataCollect.replaceAll(items);
        this.reward.validateNow();
        for (var i = 0; i < this.reward.numElements; i++) {
            var render = this.reward.getVirtualElementAt(i);
            var datas = this.reward.dataProvider.getItemAt(i);
            var itemData = UserBag.ins().getBagItemById(datas.id);
            var curCount = itemData ? itemData.count : 0;
            var color = curCount >= datas.count ? 0x00ff00 : 0xff0000;
            render.setName("|C:" + color + "&T:(" + curCount + "/" + datas.count + ")");
        }
        var colorStr = 0;
        if (state == Activity.CanGet) {
            this.get.enabled = true;
            this.get.currentState = "up";
            colorStr = 0x00ff00;
        }
        else {
            this.get.enabled = false;
            this.get.currentState = "disabled";
            colorStr = 0xff0000;
        }
        var sum = 0;
        if (config.count) {
            sum = config.count - actData.personalRewardsSum[config.index];
            sum = sum > 0 ? sum : 0;
            this.limitchange1.textFlow = TextFlowMaker.generateTextFlow1("\u5269\u4F59\uFF1A" + sum);
        }
        else if (config.dailyCount) {
            sum = config.dailyCount - actData.exchange[config.index];
            sum = sum > 0 ? sum : 0;
            this.limitchange1.textFlow = TextFlowMaker.generateTextFlow1("\u4ECA\u65E5\u5269\u4F59\uFF1A" + sum);
        }
        if (config.scount) {
            this.slimit.visible = true;
            sum = config.scount - actData.worldRewardsSum[config.index];
            sum = sum > 0 ? sum : 0;
            this.limitchange1.textFlow = TextFlowMaker.generateTextFlow1("\u4ECA\u65E5\u5168\u670D\u53EF\u5151\u6362\u6B21\u6570\uFF1A" + sum);
        }
        else {
            this.slimit.visible = false;
        }
        this.redPoint.visible = this.get.enabled;
        var maxitems = 3;
        for (var i = 0; i < maxitems; i++) {
            if (!config.items[maxitems - i - 1]) {
                if (this["add" + (maxitems - i - 1)])
                    DisplayUtils.removeFromParent(this["add" + (maxitems - i - 1)]);
            }
        }
    };
    LabaChangeItemRender.prototype.onTap = function (e) {
        if (!this.data || !this.data.config) {
            UserTips.ins().showTips("\u6570\u636E\u5F02\u5E38");
            return;
        }
        if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
            ViewManager.ins().open(BagFullTipsWin);
            return;
        }
        Activity.ins().sendReward(this.data.config.Id, this.data.config.index);
    };
    LabaChangeItemRender.prototype.destruct = function () {
        this.get.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    return LabaChangeItemRender;
}(BaseItemRender));
__reflect(LabaChangeItemRender.prototype, "LabaChangeItemRender");
//# sourceMappingURL=LabaChangeItemRender.js.map