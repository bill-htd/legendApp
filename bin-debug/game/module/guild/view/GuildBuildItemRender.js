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
var GuildBuildItemRender = (function (_super) {
    __extends(GuildBuildItemRender, _super);
    function GuildBuildItemRender() {
        var _this = _super.call(this) || this;
        _this._maxLevel = 0;
        _this._curLevel = 0;
        _this._nextMoney = 0;
        _this.skinName = "GuildManageItemSkin";
        return _this;
    }
    GuildBuildItemRender.prototype.onTap = function (e) {
        switch (e) {
            case this.upBtn:
                var type = this.data;
                if (Guild.ins().myOffice < GuildOffice.GUILD_FUBANGZHU) {
                    UserTips.ins().showTips("仅会长可操作");
                    return;
                }
                else if (type == GuildBuilding.GUILD_HALL && this._curLevel >= this._maxLevel) {
                    UserTips.ins().showTips("等级已满");
                    return;
                }
                else if (type != GuildBuilding.GUILD_HALL && this._curLevel >= Guild.ins().guildLv) {
                    UserTips.ins().showTips("请先升级管理大厅");
                    return;
                }
                else if (Guild.ins().money < this._nextMoney) {
                    UserTips.ins().showTips("资金不足");
                    return;
                }
                Guild.ins().sendUpBuilding(type);
                break;
        }
    };
    GuildBuildItemRender.prototype.dataChanged = function () {
        var type = this.data;
        this.buildImg.visible = type == 1;
        this._curLevel = Guild.ins().getBuildingLevels(type - 1) || 0;
        var glc = GlobalConfig.GuildLevelConfig[type];
        var dp = null;
        var dpNext = null;
        for (var key in glc) {
            if (glc.hasOwnProperty(key)) {
                var element = glc[key];
                this._maxLevel = element.level > this._maxLevel ? element.level : this._maxLevel;
                if (element.level == this._curLevel)
                    dp = element;
                if (element.level == this._curLevel + 1)
                    dpNext = element;
            }
        }
        if (dp || dpNext || (type == GuildBuilding.GUILD_LIANGONGFANG)) {
            this.nameLab.text = GlobalConfig.GuildConfig.buildingNames[type - 1];
            this.levelLab.text = "等级 " + (this._curLevel == null ? 0 : this._curLevel);
            if (dpNext && this._curLevel < this._maxLevel) {
                this._nextMoney = dpNext.upFund;
                this.upLevelLab.text = type == GuildBuilding.GUILD_HALL ? "" : "\u5347\u7EA7\u8981\u6C42\uFF1A\u7BA1\u7406\u5927\u5385\u8FBE\u5230" + (this._curLevel + 1) + "\u7EA7";
                this.money.text = Guild.ins().money + "/" + dpNext.upFund;
                this.needMoney.text = "\u9700\u8D44\u91D1\uFF1A" + dpNext.upFund;
                this.progress.maximum = dpNext.upFund;
                this.progress.value = Guild.ins().money;
                this.progress.visible = true;
            }
            else {
                this.upLevelLab.text = "等级已满";
                if (dp)
                    this.money.text = Guild.ins().money + "/" + dp.upFund;
                else
                    this.money.text = "已满级";
                this.needMoney.text = "";
                this.progress.visible = false;
            }
            this.buildingLab.text = GlobalConfig.GuildConfig.buildingTips[type - 1];
        }
        this.manege.source = "guildmn" + type + "_png";
        if (type == GuildBuilding.GUILD_SHOP) {
            this.progress.visible = this.progressbg.visible = this.progressblack.visible = this.levelLab.visible = this.needMoney.visible = this.money.visible = false;
            this.upBtn.touchEnabled = false;
            this.upBtn.label = "敬请期待";
            this.upBtn.currentState = "disabled";
            this.upBtn.verticalCenter = 0;
        }
        this.updateRedPoint();
    };
    GuildBuildItemRender.prototype.updateRedPoint = function () {
        var type = this.data;
        if (type == GuildBuilding.GUILD_SHOP) {
            this.redPoint.visible = false;
            return;
        }
        if (Guild.ins().myOffice < GuildOffice.GUILD_FUBANGZHU) {
            this.redPoint.visible = false;
            return;
        }
        else if (type == GuildBuilding.GUILD_HALL && this._curLevel >= this._maxLevel) {
            this.redPoint.visible = false;
            return;
        }
        else if (type != GuildBuilding.GUILD_HALL && this._curLevel >= Guild.ins().guildLv) {
            this.redPoint.visible = false;
            return;
        }
        else if (Guild.ins().money < this._nextMoney) {
            this.redPoint.visible = false;
            return;
        }
        this.redPoint.visible = true;
    };
    return GuildBuildItemRender;
}(BaseItemRender));
__reflect(GuildBuildItemRender.prototype, "GuildBuildItemRender");
//# sourceMappingURL=GuildBuildItemRender.js.map