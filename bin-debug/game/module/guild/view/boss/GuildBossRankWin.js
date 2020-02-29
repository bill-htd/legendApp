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
var GuildBossRankWin = (function (_super) {
    __extends(GuildBossRankWin, _super);
    function GuildBossRankWin() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.skinName = "GuildBossHarmSkin";
        _this.isTopLevel = true;
        _this.list.itemRenderer = GuildBossRankItemRender;
        return _this;
    }
    GuildBossRankWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    GuildBossRankWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return true;
    };
    GuildBossRankWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.index = param[0];
        this.addTouchEvent(this.bgClose, this.onTap);
        this.setView();
    };
    GuildBossRankWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeObserve();
    };
    GuildBossRankWin.prototype.setView = function () {
        var arr = [];
        var rankArr = GuildBoss.ins().guildPersonRankDic[this.index + 1] || [];
        for (var i = 0; i < rankArr.length; i++) {
            if (!rankArr[i])
                continue;
            if (rankArr[i].name == Actor.myName)
                this.myData = rankArr[i];
            arr.push(rankArr[i]);
        }
        this.list.dataProvider = new eui.ArrayCollection(arr);
        if (this.myData) {
            this.qiansan.visible = true;
            this.myrank.visible = true;
            this.myname.visible = true;
            this.myharm.visible = true;
            this.myreword.visible = true;
            if (this.myData.rank <= 3) {
                this.qiansan.source = "guildpaihang" + this.myData.rank;
            }
            else {
                this.qiansan.source = "";
            }
            this.myrank.text = this.myData.rank + "";
            this.myname.text = this.myData.name;
            this.myharm.text = this.myData.damage + "";
            this.myreword.text = GuildBoss.ins().leftTimes + "/" + GlobalConfig.GuildBossConfig.dayTimes;
        }
        else {
            this.qiansan.visible = false;
            this.myrank.visible = false;
            this.myname.visible = false;
            this.myharm.visible = false;
            this.myreword.visible = false;
        }
    };
    GuildBossRankWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(GuildBossRankWin);
                break;
        }
    };
    return GuildBossRankWin;
}(BaseEuiView));
__reflect(GuildBossRankWin.prototype, "GuildBossRankWin");
ViewManager.ins().reg(GuildBossRankWin, LayerManager.UI_Popup);
//# sourceMappingURL=GuildBossRankWin.js.map