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
var OSATarget9Panel3ItemRender = (function (_super) {
    __extends(OSATarget9Panel3ItemRender, _super);
    function OSATarget9Panel3ItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "luckyTurntableItemSkin";
        return _this;
    }
    OSATarget9Panel3ItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this["isget"].addEventListener(egret.TouchEvent.TOUCH_END, this.onTap, this);
    };
    OSATarget9Panel3ItemRender.prototype.onTap = function (e) {
        var itemicon = this["gift"].getItemIcon();
        this.flyItemEx(itemicon);
        this.ins.sendReward(this.activityID, 0, this.index + 1);
    };
    OSATarget9Panel3ItemRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data || (!(this.data.config instanceof ActivityType9Config) && !(this.data.config instanceof PActivity9Config)))
            return;
        this.actType = this.data.actType;
        var config = this.data.config;
        this.activityID = config.Id;
        var i = this.index = this.data.index;
        var data;
        if (this.actType == ActivityType.Normal) {
            this.ins = Activity.ins();
            data = this.ins.activityData[config.Id];
        }
        else if (this.actType == ActivityType.Personal) {
            this.ins = PActivity.ins();
            data = this.ins.activityData[config.Id];
        }
        if (!data)
            return;
        this.targetTime.text = "/" + config.reward[i].times;
        this["gift"].data = { id: config.reward[i].id, type: config.reward[i].type, count: config.reward[i].count };
        this["gift"].isShowName(false);
        this["lingqu"].touchEnabled = false;
        var color = 0;
        var curCount = data.count >= config.reward[i].times ? config.reward[i].times : data.count;
        if (data.record >> (i + 1) & 1) {
            this["lingqu"].visible = true;
            this["isget"].touchEnabled = false;
            color = 0x00ff00;
        }
        else {
            this["lingqu"].visible = false;
            if (data.count >= config.reward[i].times) {
                this["isget"].touchEnabled = true;
                color = 0x00ff00;
            }
            else {
                var prerewards = config.reward[i - 1];
                var curCount_1 = data.count;
                var totalCount = config.reward[i].times;
                if (prerewards) {
                    curCount_1 = data.count - prerewards.times;
                    totalCount = config.reward[i].times - prerewards.times;
                }
                curCount_1 = curCount_1 > 0 ? curCount_1 : 0;
                this["isget"].touchEnabled = false;
                color = 0xff0000;
            }
        }
        this.alreadyTime.textFlow = TextFlowMaker.generateTextFlow1("|C:" + color + "&T:" + curCount);
        this.updateRedPoint(this.activityID, i);
    };
    OSATarget9Panel3ItemRender.prototype.updateRedPoint = function (activityID, idx) {
        var b = this.ins.isGetRollReward(activityID, idx);
        this["redPoint"].visible = b;
    };
    OSATarget9Panel3ItemRender.prototype.flyItemEx = function (itemicon) {
        var flyItem = new eui.Image(itemicon.imgIcon.source);
        flyItem.x = itemicon.imgIcon.x;
        flyItem.y = itemicon.imgIcon.y;
        flyItem.width = itemicon.imgIcon.width;
        flyItem.height = itemicon.imgIcon.height;
        flyItem.scaleX = itemicon.imgIcon.scaleX;
        flyItem.scaleY = itemicon.imgIcon.scaleY;
        itemicon.imgIcon.parent.addChild(flyItem);
        GameLogic.ins().postFlyItemEx(flyItem);
    };
    return OSATarget9Panel3ItemRender;
}(BaseItemRender));
__reflect(OSATarget9Panel3ItemRender.prototype, "OSATarget9Panel3ItemRender");
//# sourceMappingURL=OSATarget9Panel3ItemRender.js.map