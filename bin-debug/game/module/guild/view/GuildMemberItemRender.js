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
var GuildMemberItem2Render = (function (_super) {
    __extends(GuildMemberItem2Render, _super);
    function GuildMemberItem2Render() {
        var _this = _super.call(this) || this;
        _this.skinName = "MemberItem2Skin";
        return _this;
    }
    GuildMemberItem2Render.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        if (!this.hasEventListener(egret.Event.REMOVED_FROM_STAGE)) {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                MessageCenter.ins().removeAll(_this);
            }, this);
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (e.target instanceof eui.Button) {
                return;
            }
            if (_this.data)
                ViewManager.ins().open(PlayerTipsWin, _this.data);
        }, this);
    };
    GuildMemberItem2Render.prototype.onTap = function (e) {
        if (GuildWar.ins().getModel().isWatStart) {
            WarnWin.show("工会战期间,不允许禅让/降职/任命副会长/踢出操作", function () {
            }, this);
            return;
        }
        var info = this.data;
        var roleID = info.roleID;
        switch (e) {
            case this.impeachBtn:
                WarnWin.show("\u662F\u5426\u6D88\u8017" + GlobalConfig.GuildConfig.impeachCost + "\u5143\u5B9D\u5F39\u52BE\u4F1A\u957F\uFF1F\uFF08\u5F39\u52BE\u540E\u6210\u4E3A\u4F1A\u957F\uFF09", function () {
                    if (Actor.yb >= GlobalConfig.GuildConfig.impeachCost) {
                        Guild.ins().sendDemise();
                    }
                    else
                        UserTips.ins().showTips("元宝不足");
                }, this);
                break;
            case this.demiseBtn:
                WarnWin.show("\u662F\u5426\u7985\u8BA9\u4F1A\u957F\u804C\u4F4D\u7ED9[" + info.name + "]", function () {
                    Guild.ins().sendChangeOffice(roleID, GuildOffice.GUILD_BANGZHU);
                }, this);
                break;
            case this.downBtn:
                WarnWin.show("\u662F\u5426\u514D\u9664[" + info.name + "]\u526F\u4F1A\u957F\u4E4B\u804C", function () {
                    Guild.ins().sendChangeOffice(roleID, GuildOffice.GUILD_MEMBER);
                }, this);
                break;
            case this.kickBtn:
                WarnWin.show("\u786E\u5B9A\u5C06[" + info.name + "]\u8E22\u51FA\u516C\u4F1A\uFF1F", function () {
                    Guild.ins().sendKick(roleID);
                }, this);
                break;
            case this.appointBtn:
                WarnWin.show("\u786E\u5B9A\u4EFB\u547D[" + info.name + "]\u4E3A\u526F\u4F1A\u957F\uFF1F", function () {
                    if (Guild.ins().canAppointFHZ()) {
                        Guild.ins().sendChangeOffice(roleID, GuildOffice.GUILD_FUBANGZHU);
                    }
                    else
                        UserTips.ins().showTips("副会长人数已达上限");
                }, this);
                break;
            default:
                ViewManager.ins().open(PlayerTipsWin, this.data);
                break;
        }
    };
    GuildMemberItem2Render.prototype.dataChanged = function () {
        if (this.data instanceof GuildMemberInfo) {
            var info = this.data;
            this.nameLab.textFlow = new egret.HtmlTextParser().parser("[" + GuildLanguage.guildOffice[info.office] + "]<font color='#DFDCDC'>" + info.name + "</font>");
            this.conLab.text = "贡献度：" + info.contribution;
            this.attack.text = "战斗力：" + info.attack;
            this.face.source = "head_" + info.job + info.sex;
            this.headBG.source = ChatListItemRenderer.HEAD_BG[info.sex];
            var downTime = 0;
            var myOfiice = Guild.ins().myOffice;
            if (myOfiice == GuildOffice.GUILD_BANGZHU || myOfiice == GuildOffice.GUILD_FUBANGZHU) {
                this.onLine.visible = true;
                if (info.downTime > 0) {
                    downTime = (GameServer.serverTime - DateUtils.formatMiniDateTime(info.downTime)) * 0.001;
                    this.onLine.textFlow = TextFlowMaker.generateTextFlow1("|C:0xf3311e&T:" + DateUtils.getFormatBySecond(downTime, 7));
                }
                else
                    this.onLine.textFlow = new egret.HtmlTextParser().parser("<font color='#13CE0C'>\u5728\u7EBF</font>");
            }
            else {
                this.onLine.visible = false;
            }
            this.group1.visible = false;
            this.group2.visible = false;
            this.group3.visible = false;
            this.impeachBtn.visible = downTime >= 432000;
            this.vip.removeChildren();
            this.vip.visible = info.vipLevel > 0;
            this.vipTitle.visible = info.vipLevel > 0;
            if (info.vipLevel < 10) {
                this.vipNum = BitmapNumber.ins().createNumPic(info.vipLevel, 'vip_v');
            }
            else {
                this.vipNum = BitmapNumber.ins().createNumPic(1, 'vip_v');
                this.vipNum0 = BitmapNumber.ins().createNumPic(0, 'vip_v');
                this.vipNum0.x = 33;
                this.vipNum0.y = -1;
                this.vip.addChild(this.vipNum0);
            }
            this.vipNum.x = 18;
            this.vipNum.y = -1;
            this.vip.addChild(this.vipNum);
            switch (myOfiice) {
                case GuildOffice.GUILD_BANGZHU:
                    {
                        if (info.office == GuildOffice.GUILD_BANGZHU)
                            break;
                        else if (info.office == GuildOffice.GUILD_FUBANGZHU) {
                            this.group2.visible = true;
                        }
                        else {
                            this.group3.visible = true;
                            this.appointBtn.visible = true;
                        }
                    }
                    break;
                case GuildOffice.GUILD_FUBANGZHU:
                    if (info.office == GuildOffice.GUILD_BANGZHU) {
                        this.group1.visible = true;
                    }
                    else if (info.office == GuildOffice.GUILD_FUBANGZHU)
                        break;
                    else {
                        this.group3.visible = true;
                        this.appointBtn.visible = false;
                    }
                    break;
                case GuildOffice.GUILD_ZHANGLAO:
                case GuildOffice.GUILD_HUFA:
                case GuildOffice.GUILD_TANGZHU:
                    if (info.office == GuildOffice.GUILD_BANGZHU)
                        this.group1.visible = true;
                    break;
                default:
                    break;
            }
        }
    };
    return GuildMemberItem2Render;
}(BaseItemRender));
__reflect(GuildMemberItem2Render.prototype, "GuildMemberItem2Render");
//# sourceMappingURL=GuildMemberItemRender.js.map