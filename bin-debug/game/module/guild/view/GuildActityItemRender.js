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
var GuildActityItemRender = (function (_super) {
    __extends(GuildActityItemRender, _super);
    function GuildActityItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "GuildActityItemSkin";
        return _this;
    }
    GuildActityItemRender.prototype.onTap = function (e) {
        switch (e) {
            case this.goBtn0:
                this.conBtnOnCLick();
                break;
        }
    };
    GuildActityItemRender.prototype.conBtnOnCLick = function () {
        var info = this.data;
        if (GuildRobber.ins().robberTotal - GuildRobber.ins().robberDealNum <= 0) {
            UserTips.ins().showTips("|C:0xf3311e&T:公会兽人军团已经全部被击杀了！|");
            return;
        }
        if (info.id == 1) {
            ViewManager.ins().close(GuildActivityWin);
        }
    };
    GuildActityItemRender.prototype.dataChanged = function () {
        var info = this.data;
        if (info) {
            if (info.id)
                this.taskIcon.source = "guildActity_" + info.id;
            if (info.context) {
                var content = info.context;
                if (info.openDay) {
                    if (GameServer.serverOpenDay < info.openDay - 1) {
                        var dayStr = TextFlowMaker.getCStr(info.openDay);
                        content = content.replace("\n", ("|C:0x35e62d&S:14&T:\uFF08\u5F00\u670D\u7B2C" + dayStr + "\u5929\u5F00\u542F\uFF09|\n"));
                    }
                }
                this.nameLab.textFlow = TextFlowMaker.generateTextFlow1(content);
            }
            if (info.id == 1) {
                this.descLab.text = "\u672C\u8F6E\u5269\u4F59\u5F3A\u76D7\uFF1A" + (GuildRobber.ins().robberTotal - GuildRobber.ins().robberDealNum) + "/" + GuildRobber.ins().robberTotal;
            }
        }
    };
    return GuildActityItemRender;
}(BaseItemRender));
__reflect(GuildActityItemRender.prototype, "GuildActityItemRender");
//# sourceMappingURL=GuildActityItemRender.js.map