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
var SelectRewardItemRenderer = (function (_super) {
    __extends(SelectRewardItemRenderer, _super);
    function SelectRewardItemRenderer() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.skinName = "SelectRewardItemSkin";
        _this.choosePeople.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        _this.list.itemRenderer = GuildWarMemberHeadRender;
        _this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        _this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        return _this;
    }
    SelectRewardItemRenderer.prototype.dataChanged = function () {
        var reward = GuildWar.ins().getModel().creatGuildRankReward(GuildWar.ins().getModel().guildWarRank, this.itemIndex);
        this.goods.data = reward[0];
        this.boxname.text = GlobalConfig.ItemConfig[reward[0].id].name;
        this.sendNum = GuildWar.ins().getModel().getCanSendNumByRank(this.itemIndex);
        var data = GuildWar.ins().getModel().getSelectDataByIndex(this.itemIndex);
        var count = 0;
        if (data.length > 0) {
            for (var k in data) {
                count += data[k].num;
            }
        }
        this.chooseNum.text = count + "/" + this.sendNum;
        this.list.dataProvider = new eui.ArrayCollection(data);
    };
    SelectRewardItemRenderer.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.choosePeople:
                GuildWar.ins().getModel().rewardIndex = this.itemIndex;
                ViewManager.ins().open(SelectMemberPanelWin, this.itemIndex, this.sendNum);
                break;
            case this.rightBtn:
                var gap = this.list.layout['gap'];
                var dis = this.list.getChildAt(0);
                if (!dis)
                    return;
                var step = dis.width + gap;
                var showNum = Math.ceil(this.list.width / step);
                this.index = Math.ceil(this.list.scrollH / step);
                if (this.index + showNum >= this.list.numElements)
                    return;
                this.index++;
                egret.Tween.removeTweens(this.list);
                var t = egret.Tween.get(this.list);
                t.to({ scrollH: step * this.index }, 100);
                break;
            case this.leftBtn:
                gap = this.list.layout['gap'];
                dis = this.list.getChildAt(0);
                if (!dis)
                    return;
                step = dis.width + gap;
                showNum = Math.ceil(this.list.width / step);
                this.index = Math.ceil(this.list.scrollH / step);
                if (this.index <= 0)
                    return;
                this.index--;
                egret.Tween.removeTweens(this.list);
                t = egret.Tween.get(this.list);
                t.to({ scrollH: step * this.index }, 100);
                break;
        }
    };
    return SelectRewardItemRenderer;
}(BaseItemRender));
__reflect(SelectRewardItemRenderer.prototype, "SelectRewardItemRenderer");
//# sourceMappingURL=SelectRewardItemRenderer.js.map