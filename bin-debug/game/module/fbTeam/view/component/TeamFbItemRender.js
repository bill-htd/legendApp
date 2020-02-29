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
var TeamFbItemRender = (function (_super) {
    __extends(TeamFbItemRender, _super);
    function TeamFbItemRender() {
        var _this = _super.call(this) || this;
        _this._isShow = false;
        _this.skinName = "teamFbItem";
        return _this;
    }
    TeamFbItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.Rewardlist.itemRenderer = ItemBase;
        this.gonglveTxt.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + this.gonglveTxt.text);
    };
    TeamFbItemRender.prototype.dataChanged = function () {
        this.nameImg.source = this.data.config.nameImg;
        this.fbDesc.textFlow = TextFlowMaker.generateTextFlow(this.data.config.infoText);
        this.head.source = this.data.config.bossImg;
        this.Rewardlist.dataProvider = new ArrayCollection(this.data.config.rewardShow);
        this.nameTxt.text = this.data.config.bossName;
        this.fbImg.source = this.data.config.guanqiaImg;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.updateStates();
        if (this.data.open) {
            this._isShow = true;
            this.currentState = "zhankai";
        }
    };
    TeamFbItemRender.prototype.updateStates = function () {
        this.lock.visible = this.data.config.id > (this.data.passID + 1);
        this.unlock.visible = !this.lock.visible;
        this.redPoint.visible = this.data.config.id == (this.data.passID + 1);
        this.createRoomBtn.visible = this.data.config.id > this.data.passID;
        this.done.visible = this.data.config.id <= this.data.passID;
    };
    TeamFbItemRender.prototype.onTap = function (e) {
        if (e.target == this.fbImg) {
            this._isShow = !this._isShow;
            this.currentState = this._isShow ? "zhankai" : "normal";
            MessageCenter.ins().dispatch(UserFb.TEAM_FB_WIN_REFLASH_PANEL, this, this._isShow);
        }
        else if (e.target == this.createRoomBtn) {
            if (GameMap.fbType != 0) {
                UserTips.ins().showTips("\u6B63\u5728\u5176\u4ED6\u526F\u672C\u4E2D\uFF0C\u4E0D\u80FD\u6311\u6218");
                return;
            }
            ViewManager.ins().open(TeamFbRoomWin, this.state, this.data.config.id, 0);
        }
        else if (e.target == this.gonglveTxt)
            ViewManager.ins().open(TeamFbGuideWin, this.data.config.id);
    };
    Object.defineProperty(TeamFbItemRender.prototype, "state", {
        get: function () {
            if (this.data.passID >= this.data.config.id)
                return 2;
            else if (this.data.config.id == (this.data.passID + 1))
                return 1;
            else
                return 0;
        },
        enumerable: true,
        configurable: true
    });
    TeamFbItemRender.prototype.onRemove = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    return TeamFbItemRender;
}(BaseItemRender));
__reflect(TeamFbItemRender.prototype, "TeamFbItemRender");
//# sourceMappingURL=TeamFbItemRender.js.map