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
var GuildBossItemRender = (function (_super) {
    __extends(GuildBossItemRender, _super);
    function GuildBossItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "GuildBossItemSkin";
        _this.bosshp.maximum = 100;
        _this.bosshp.slideDuration = 0;
        return _this;
    }
    GuildBossItemRender.prototype.dataChanged = function () {
        var id = GuildBoss.ins().passId;
        var index = this.data + 1;
        var config = GlobalConfig.GuildBossInfoConfig[index];
        var bossConfig = GlobalConfig.MonstersConfig[config.boss["monId"]];
        this.bossImage.source = config.ShowImg;
        if (this.data < id) {
            this.bossname.textColor = 0x9F946D;
            this.bosshp.value = 0;
            var state = GuildBoss.ins().passRecord[index];
            this.passImg.visible = true;
            this.redPoint0.visible = GuildBoss.ins().isOpen() && (state == 1);
        }
        else if (this.data == id) {
            this.bossname.textColor = 0xD1C28F;
            this.bosshp.value = Math.ceil(((bossConfig.hp - GuildBoss.ins().bossHP) / bossConfig.hp) * 10000) / 100 >> 0;
            this.redPoint0.visible = GuildBoss.ins().isOpen() && GuildBoss.ins().leftTimes > 0 ? true : false;
            this.passImg.visible = false;
        }
        else {
            this.bossname.textColor = 0xD1C28F;
            this.bosshp.value = 100;
            this.redPoint0.visible = false;
            this.passImg.visible = false;
        }
        this.bossname.text = index + "." + bossConfig.name;
    };
    GuildBossItemRender.prototype.isOpen = function () {
        return new Date().getDay() != GlobalConfig.GuildBossConfig.notOpenDayOfWeek;
    };
    return GuildBossItemRender;
}(BaseItemRender));
__reflect(GuildBossItemRender.prototype, "GuildBossItemRender");
//# sourceMappingURL=GuildBossItemRender.js.map