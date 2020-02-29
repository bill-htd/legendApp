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
var TeamFbNewPanel = (function (_super) {
    __extends(TeamFbNewPanel, _super);
    function TeamFbNewPanel() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        return _this;
    }
    TeamFbNewPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.Fblist.itemRenderer = TeamFbItemRender;
    };
    TeamFbNewPanel.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.observe(UserFb.ins().postFTRoomPassInfo, this.update);
        MessageCenter.ins().addListener(UserFb.TEAM_FB_WIN_REFLASH_PANEL, this.listFresh, this);
        this._firstOpen = true;
        this.update();
        UserFb.ins().postShowRedChange(false);
    };
    TeamFbNewPanel.prototype.close = function () {
        MessageCenter.ins().removeListener(UserFb.TEAM_FB_WIN_REFLASH_PANEL, this.listFresh, this);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    TeamFbNewPanel.prototype.listFresh = function (obj, param) {
        if (!this._collect)
            return;
        if (obj.itemIndex == this._collect.length - 1) {
            var itemHeight = UserFb.TF_EXPAND_HEIGHT - UserFb.TF_SIMLPE_HEIGHT;
            if (param == true) {
                this.Fblist.scrollV = this.Fblist.contentHeight - this.Fblist.height + itemHeight;
            }
            else {
                this.Fblist.scrollV = this.Fblist.contentHeight - this.Fblist.height - itemHeight;
            }
            this.Fblist.validateNow();
        }
    };
    TeamFbNewPanel.prototype.update = function () {
        if (!this._collect) {
            this._collect = new ArrayCollection();
            this.Fblist.dataProvider = this._collect;
        }
        var len = Object.keys(GlobalConfig.TeamFuBenConfig).length;
        var source = [];
        var index = 0;
        var open;
        for (var i = 0; i < len; i++) {
            open = GlobalConfig.TeamFuBenConfig[i + 1].id == (UserFb.ins().tfPassID + 1);
            if (open)
                this._index = i;
            source.push({ config: GlobalConfig.TeamFuBenConfig[i + 1], passID: UserFb.ins().tfPassID, open: open });
        }
        this._collect.source = source;
        this.Fblist.validateNow();
        if (this._firstOpen) {
            this._firstOpen = false;
            TimerManager.ins().doTimer(50, 1, this.selectCanChallege, this);
            this.selectCanChallege();
        }
    };
    TeamFbNewPanel.prototype.selectCanChallege = function () {
        var off = (this._index + 1) * UserFb.TF_SIMLPE_HEIGHT - this.Fblist.height + UserFb.TF_EXPAND_HEIGHT - UserFb.TF_SIMLPE_HEIGHT;
        this.Fblist.scrollV = off > 0 ? off : 0;
        this.Fblist.validateNow();
    };
    return TeamFbNewPanel;
}(BaseEuiView));
__reflect(TeamFbNewPanel.prototype, "TeamFbNewPanel");
//# sourceMappingURL=TeamFbNewPanel.js.map