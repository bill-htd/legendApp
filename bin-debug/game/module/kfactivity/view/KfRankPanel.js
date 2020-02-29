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
var KfRankPanel = (function (_super) {
    __extends(KfRankPanel, _super);
    function KfRankPanel() {
        var _this = _super.call(this) || this;
        _this._time = 0;
        _this.actorIds = [];
        return _this;
    }
    KfRankPanel.prototype.childrenCreated = function () {
    };
    KfRankPanel.prototype.close = function () {
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    KfRankPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Activity.ins().postKuaFuRank, this.updateData);
        this.observe(UserReadPlayer.ins().postPlayerResult, this.openOtherPlayerView);
        this.addTouchEvent(this.rechargeBtn, this.onClick);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.activityID = param[0];
        this.list.itemRenderer = KfCostRankItemRender;
        this.listdata = new eui.ArrayCollection();
        this.list.dataProvider = this.listdata;
        Activity.ins().sendKuaFuRank(this.activityID);
    };
    KfRankPanel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.rechargeBtn:
                ViewManager.ins().open(Recharge1Win);
                break;
        }
    };
    KfRankPanel.prototype.updateData = function () {
        var actData = Activity.ins().activityData[this.activityID];
        if (!actData)
            return;
        var rankList = actData.GetRankList();
        if (rankList.length) {
            this.currentState = "normal";
        }
        else {
            this.currentState = "none";
        }
        this.validateNow();
        this.myNumber.text = actData.mycost + "";
        this.myRanking.text = "未上榜";
        if (this.currentState == "none") {
            return;
        }
        var otherPlayerDatas = [];
        var len = rankList.length > 3 ? rankList.length : 3;
        this.actorIds = [];
        var myRank = 0;
        for (var i = 0; i < len; i++) {
            var kfdata = rankList[i];
            if (i < 3) {
                if (kfdata && kfdata.actorId) {
                    var actD = {
                        actorId: kfdata.actorId,
                        serverId: kfdata.serverId
                    };
                    this.actorIds.push(actD);
                    this["playName" + i].text = "s" + kfdata.serverId + "." + kfdata.roleName;
                    this["recharge" + i].text = "\u5DF2\u6D88\u8D39\uFF1A" + kfdata.rmb;
                    this["playName" + i].visible = this["recharge" + i].visible = true;
                }
                else {
                    var actD = {
                        actorId: 0,
                        serverId: 0
                    };
                    this.actorIds.push(actD);
                    this["playName" + i].visible = this["recharge" + i].visible = false;
                }
                this["rank" + i].data = null;
            }
            else {
                if (kfdata)
                    otherPlayerDatas.push(kfdata);
            }
            if (kfdata && Actor.actorID == kfdata.actorId)
                myRank = kfdata.rank;
        }
        for (var r = 0; r < this.actorIds.length; r++) {
            if (this.actorIds[r] && this.actorIds[r].actorId) {
                UserReadPlayer.ins().sendFindPlayer(this.actorIds[r].actorId, this.actorIds[r].serverId);
            }
        }
        this.listdata.replaceAll(otherPlayerDatas);
        this._time = actData.getleftTime();
        this.myNumber.text = actData.mycost + "";
        this.myRanking.text = myRank ? myRank + "" : "未上榜";
        var scro = this.list.parent;
        scro.stopAnimation();
        this.list.scrollV = 0;
        this.setTime();
    };
    KfRankPanel.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    KfRankPanel.prototype.openOtherPlayerView = function (otherPlayerData) {
        if (otherPlayerData) {
            for (var i = 0; i < this.actorIds.length; i++) {
                if (this.actorIds[i].actorId == otherPlayerData.id)
                    this["rank" + i].data = { otherPlayerData: otherPlayerData };
            }
        }
    };
    return KfRankPanel;
}(BaseComponent));
__reflect(KfRankPanel.prototype, "KfRankPanel");
//# sourceMappingURL=KfRankPanel.js.map