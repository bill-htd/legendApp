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
var SelectMemberRewardWin = (function (_super) {
    __extends(SelectMemberRewardWin, _super);
    function SelectMemberRewardWin() {
        var _this = _super.call(this) || this;
        _this.dataLen = [];
        return _this;
    }
    SelectMemberRewardWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "SelectMemberRewardSkin";
        this.list.itemRenderer = SelectRewardItemRenderer;
    };
    SelectMemberRewardWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        GuildWar.ins().requestOwnMyGuildRank();
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.sendReward, this.onTap);
        this.observe(GuildWar.ins().postSendListChange, this.refushList);
        this.refushPanelInfo();
    };
    SelectMemberRewardWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeTouchEvent(this.sendReward, this.onTap);
        this.removeObserve();
        ViewManager.ins().open(GuildMap);
    };
    SelectMemberRewardWin.prototype.refushPanelInfo = function () {
        this.rankLabel.text = "本次龙城争霸公会排名：第" + GuildWar.ins().getModel().guildWarRank + "名";
        this.dataLen.length = GuildWar.ins().getModel().getCanSendNumByRank();
        this.refushList();
    };
    SelectMemberRewardWin.prototype.refushList = function () {
        this.list.dataProvider = new eui.ArrayCollection(this.dataLen);
    };
    SelectMemberRewardWin.prototype.onTap = function (e) {
        var _this = this;
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(SelectMemberRewardWin);
                break;
            case this.sendReward:
                TimerManager.ins().doTimer(100, 1, function () {
                    if (GuildWar.ins().getModel().checkISSendAll()) {
                        GuildWar.ins().sendFenReward(_this.dataLen.length, GuildWar.ins().getModel().sendList);
                    }
                }, this);
                break;
        }
    };
    return SelectMemberRewardWin;
}(BaseEuiView));
__reflect(SelectMemberRewardWin.prototype, "SelectMemberRewardWin");
ViewManager.ins().reg(SelectMemberRewardWin, LayerManager.UI_Popup);
//# sourceMappingURL=SelectMemberRewardWin.js.map