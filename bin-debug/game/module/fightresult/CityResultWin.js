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
var CityResultWin = (function (_super) {
    __extends(CityResultWin, _super);
    function CityResultWin() {
        return _super.call(this) || this;
    }
    CityResultWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "CityResultSkin";
        this.listItem.itemRenderer = ItemBase;
        this.listData0 = new eui.ArrayCollection();
        this.winnerEff = new MovieClip;
        this.winnerEff.x = 41;
        this.winnerEff.y = 41;
        this.winnerEff.touchEnabled = false;
    };
    CityResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.bg.source = "win_png";
        this.closeBtn.label = "领取奖励";
        this.title.source = "win_02";
        if (param[1]) {
            var isBelong = param[1][0];
            if (isBelong) {
                if (!this.winnerEff.parent)
                    this.effGroup.addChild(this.winnerEff);
                this.winnerEff.playFile(RES_DIR_EFF + "yanhuaeff", 1);
            }
            var tname = param[1][1] || "";
            var strlist = tname.split("\n");
            if (strlist[1])
                tname = strlist[1];
            else
                tname = strlist[0];
            tname = StringUtils.replaceStr(tname, "0xffffff", ColorUtil.ROLENAME_COLOR_GREEN + "");
            this.belongTxt.textFlow = TextFlowMaker.generateTextFlow1(tname);
            this.labelItem.text = isBelong ? "我的归属奖：" : "我的参与奖：";
            this.roleIcon.icon = param[1][2];
            this.roleIcon['jobImg'].visible = false;
        }
        var rewards = param[0];
        if (rewards)
            this.setRewardList(rewards);
    };
    CityResultWin.prototype.setRewardList = function (rewards) {
        if (rewards === void 0) { rewards = []; }
        var coinData = [];
        var emblemData = [];
        var itemData = [];
        var soulData = [];
        var rewardList = [];
        for (var i = 0; i < rewards.length; i++) {
            var itemConfig = GlobalConfig.ItemConfig[rewards[i].id];
            if (ItemConfig.getType(itemConfig) == 1) {
                if (emblemData.length) {
                    var ishave = false;
                    for (var j = 0; j < emblemData.length; j++) {
                        if (emblemData[j].id == rewards[i].id) {
                            emblemData[j].count += rewards[i].count;
                            ishave = true;
                            break;
                        }
                    }
                    if (!ishave)
                        emblemData.push(rewards[i]);
                }
                else {
                    emblemData.push(rewards[i]);
                }
                continue;
            }
            if (rewards[i].type == 0) {
                if (rewards[i].id == MoneyConst.soul) {
                    soulData.push(rewards[i]);
                }
                else {
                    coinData.push(rewards[i]);
                }
            }
            else {
                itemData.push(rewards[i]);
            }
        }
        itemData.sort(this.RuleSortByItem);
        rewardList = soulData.concat(coinData, emblemData, itemData);
        this.listItem.dataProvider = new eui.ArrayCollection(rewardList);
    };
    CityResultWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
    };
    CityResultWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    CityResultWin.prototype.RuleSortByItem = function (a, b) {
        var aItem = GlobalConfig.ItemConfig[a.id];
        var bItem = GlobalConfig.ItemConfig[b.id];
        var aq = ItemConfig.getQuality(aItem);
        var bq = ItemConfig.getQuality(bItem);
        if (aq > bq)
            return -1;
        else if (aq < bq)
            return 1;
        else {
            return 0;
        }
    };
    return CityResultWin;
}(BaseEuiView));
__reflect(CityResultWin.prototype, "CityResultWin");
ViewManager.ins().reg(CityResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=CityResultWin.js.map