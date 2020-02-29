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
var PersonalBossItem = (function (_super) {
    __extends(PersonalBossItem, _super);
    function PersonalBossItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "personalBossItemSkin";
        return _this;
    }
    PersonalBossItem.prototype.dataChanged = function () {
        var tData = this.data;
        var bossBaseConfig = GlobalConfig.MonstersConfig[tData.bossId];
        var str = "";
        if (tData.monthcard) {
            str = "元宝月卡";
        }
        else if (tData.specialCard) {
            str = "至尊";
        }
        else if (tData.privilege) {
            str = "贵族";
        }
        else {
            str = tData.zsLevel > 0 ? tData.zsLevel + "\u8F6C" : tData.levelLimit + "\u7EA7";
        }
        this.nameTxt.text = bossBaseConfig.name + "\u00B7" + str;
        var roleLv = UserZs.ins().lv * 1000 + Actor.level;
        var config = UserFb.ins().getFbDataById(this.data.id);
        var isDie = config.getPlayCount() <= 0;
        var bossLv = this.data.zsLevel * 1000 + this.data.levelLimit;
        if (isDie) {
            this.enabled = false;
            this.currentState = "disabled";
            this.notOpenImg.visible = false;
        }
        else {
            this.enabled = true;
            if (tData.monthcard) {
                this.notOpenImg.visible = Recharge.ins().monthDay ? false : true;
            }
            else if (tData.privilege) {
                this.notOpenImg.visible = Recharge.ins().forevetCard != 2;
            }
            else if (tData.specialCard) {
                this.notOpenImg.visible = Recharge.ins().franchise ? false : true;
            }
            else {
                this.notOpenImg.visible = roleLv < bossLv;
            }
        }
    };
    return PersonalBossItem;
}(BaseItemRender));
__reflect(PersonalBossItem.prototype, "PersonalBossItem");
//# sourceMappingURL=PersonalBossItem.js.map