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
var KaiMenItem = (function (_super) {
    __extends(KaiMenItem, _super);
    function KaiMenItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'KMHRechargeItem';
        _this.init();
        return _this;
    }
    KaiMenItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    KaiMenItem.prototype.init = function () {
        this.reward.itemRenderer = ItemBase;
        this.get.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    KaiMenItem.prototype.onClick = function () {
        if (!this.data || !(this.data instanceof KaiMenData))
            return;
        if (this.data.already) {
            UserTips.ins().showTips("\u5DF2\u8D2D\u4E70");
            return;
        }
        if (this.data.unready) {
            UserTips.ins().showTips("\u5DF2\u8FC7\u671F");
            return;
        }
        if (this.data.type == 3) {
            if (!this.data.redPoint) {
                ViewManager.ins().open(ChargeFirstWin);
                return;
            }
        }
        else if (this.data.type == 1) {
            if (!this.data.redPoint) {
                UserTips.ins().showTips("\u672A\u8FBE\u5230\u6761\u4EF6");
                return;
            }
        }
        Activity.ins().sendReward(this.data.id, this.data.index);
    };
    KaiMenItem.prototype.dataChanged = function () {
        if (!this.data || !(this.data instanceof KaiMenData))
            return;
        this.unready.visible = this.data.unready;
        this.already.visible = this.data.already;
        this.redPoint.visible = this.data.redPoint;
        this.reward.dataProvider = new eui.ArrayCollection(this.data.reward);
        if (this.data.type == 3) {
            if (this.unready.visible) {
                this.get.visible = false;
            }
            else {
                this.get.visible = !this.already.visible;
            }
            this.day.text = "\u7B2C" + this.data.day + "\u5929";
            DisplayUtils.removeFromParent(this.daySchedule);
            if (!this.get.parent)
                this.buyGroup.addChild(this.get);
        }
        else if (this.data.type == 1) {
            if (this.unready.visible) {
                this.get.visible = false;
            }
            else {
                this.get.visible = this.redPoint.visible;
                if (!this.get.parent)
                    this.buyGroup.addChild(this.get);
            }
            this.unready.visible = false;
            this.day.text = "\u8FDE\u5145" + this.data.day + "\u5929";
            if (this.already.visible)
                DisplayUtils.removeFromParent(this.daySchedule);
            else {
                if (!this.daySchedule.parent)
                    this.buyGroup.addChild(this.daySchedule);
            }
        }
        if (!this.get.visible) {
            DisplayUtils.removeFromParent(this.get);
        }
        if (this.data.type == 3 && !this.data.redPoint) {
            this.get.label = "充值";
        }
        else {
            this.get.label = "领取";
        }
        if (this.daySchedule.parent) {
            var act = Activity.ins().getActivityDataById(this.data.id);
            var color = 0x00ff00;
            this.daySchedule.textFlow = TextFlowMaker.generateTextFlow1("\u7D2F\u5145|C:" + color + "&T:" + act.dabiao[this.data.index - 1] + "|/" + this.data.day + "\u5929");
        }
    };
    KaiMenItem.prototype.destruct = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    return KaiMenItem;
}(BaseItemRender));
__reflect(KaiMenItem.prototype, "KaiMenItem");
var KaiMenData = (function () {
    function KaiMenData() {
    }
    return KaiMenData;
}());
__reflect(KaiMenData.prototype, "KaiMenData");
//# sourceMappingURL=KaiMenItem.js.map