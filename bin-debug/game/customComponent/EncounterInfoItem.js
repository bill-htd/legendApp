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
var EncounterInfoItem = (function (_super) {
    __extends(EncounterInfoItem, _super);
    function EncounterInfoItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ZaoYuInfoItem";
        return _this;
    }
    EncounterInfoItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.nameTxt.text = "";
        this.moneyTxt.text = "";
        this.expTxt.text = "";
        this.soulTxt.text = "";
        this.challengeBtn.touchChildren = false;
    };
    EncounterInfoItem.prototype.updateTime = function () {
    };
    EncounterInfoItem.prototype.dataChanged = function () {
        if (this.data) {
            var data = this.data;
            this.currentState = "have";
            var lv = data.zsLv > 0 ? data.zsLv * 1000 : Math.min(data.lv, 80);
            var config = GlobalConfig.SkirmishRewardConfig[lv];
            this.nameTxt.text = "" + data.name;
            this.nameTxt0.text = "" + (data.zsLv ? data.zsLv + "\u8F6C" : "") + data.lv + "\u7EA7";
            this.moneyTxt.text = config.rewards.gold + "";
            this.expTxt.text = config.rewards.exp + "";
            this.soulTxt.text = config.rewards.essence + "";
            this.face.source = "head_" + data.subRole[0].job + data.subRole[0].sex;
            this.headBG.source = "touxiangkuang" + data.subRole[0].sex;
            if (EncounterFight.ins().encounterIndex != data.index)
                this.challengeBtn.label = "挑 战";
            else
                this.challengeBtn.label = "挑战中";
        }
        else {
            this.currentState = "none";
            this.nameTxt0.text = "\u6682\u65E0\u9644\u8FD1\u73A9\u5BB6";
        }
    };
    return EncounterInfoItem;
}(BaseItemRender));
__reflect(EncounterInfoItem.prototype, "EncounterInfoItem");
//# sourceMappingURL=EncounterInfoItem.js.map