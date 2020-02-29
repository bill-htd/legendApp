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
var WeiWangPanel = (function (_super) {
    __extends(WeiWangPanel, _super);
    function WeiWangPanel() {
        return _super.call(this) || this;
    }
    WeiWangPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.getItemTxt.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + this.getItemTxt.text);
        this.findItemTxt.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + this.findItemTxt.text);
        this.overViewTxt.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + this.overViewTxt.text);
    };
    WeiWangPanel.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTouch);
        this.observe(Actor.ins().postWeiWang, this.update);
        this.observe(WeiWangCC.ins().postWeiWangBack, this.updateBack);
        this.observe(UserReadPlayer.ins().postPlayerResult, this.openOtherPlayerView);
        this.observe(Rank.ins().postRankingData, this.updateRank);
        this.update();
        this.updateBack();
        Rank.ins().sendGetRankingData(RankDataType.TYPE_WEIWANG);
        this.updateRank(Rank.ins().getRankModel(RankDataType.TYPE_WEIWANG));
    };
    WeiWangPanel.prototype.close = function () {
        this.removeTouchEvent(this, this.onTouch);
        this.removeObserve();
        this.removeEffect();
        if (this._topThree)
            this._topThree.length = 0;
        this._topThree = null;
    };
    WeiWangPanel.prototype.updateRank = function (rankModel) {
        if (rankModel && rankModel.type != RankDataType.TYPE_WEIWANG)
            return;
        var ranks = rankModel ? rankModel.getDataList() : null;
        var count = ranks ? ranks.length : 0;
        var data;
        var index;
        this._topThree = [];
        for (var i = 1; i <= 3; i++) {
            index = i - 1;
            if (i <= count) {
                data = ranks[index];
                this["praiseGroup" + index].visible = true;
                this["name" + index].text = data.player;
                this._topThree[index] = data.id;
                this["bodyImg" + index].name = data.id + "";
                UserReadPlayer.ins().sendFindPlayer(data.id);
            }
            else {
                this["praiseGroup" + index].visible = false;
                this["name" + index].text = "暂无";
            }
        }
        index = this._topThree.indexOf(Actor.actorID);
        this.desc.textFlow = TextFlowMaker.generateTextFlow1(GlobalConfig.PrestigeBase.skillTips[index == -1 ? 0 : index + 1]);
    };
    WeiWangPanel.prototype.update = function () {
        this._weiWangCfg = WeiWangCC.ins().getWeiWangCfg(Actor.weiWang);
        var isMax = this._weiWangCfg.level == Object.keys(GlobalConfig.PrestigeLevel).length;
        this.notMaxGroup.visible = !isMax;
        this.maxShowGroup.visible = isMax;
        var objAtts = [];
        for (var k in this._weiWangCfg.attr)
            objAtts.push(new AttributeData(this._weiWangCfg.attr[k].type, this._weiWangCfg.attr[k].value));
        var nextCfg;
        if (!isMax) {
            this.curAtt.textFlow = TextFlowMaker.generateTextFlow1(AttributeData.getAttStr(objAtts, 0, 1, "："));
            objAtts = [];
            nextCfg = GlobalConfig.PrestigeLevel[this._weiWangCfg.level + 1];
            for (var k in nextCfg.attr)
                objAtts.push(new AttributeData(nextCfg.attr[k].type, nextCfg.attr[k].value));
            this.nextAtt.textFlow = TextFlowMaker.generateTextFlow1(AttributeData.getAttStr(objAtts, 0, 1, "："));
        }
        else {
            this.maxCurAtt.textFlow = TextFlowMaker.generateTextFlow1(AttributeData.getAttStr(objAtts, 0, 1, "："));
        }
        if (this._weiWangCfg.retrieve)
            this.info.textFlow = TextFlowMaker.generateTextFlow1(GlobalConfig.PrestigeBase.recycle.replace("{0}", this._weiWangCfg.retrieve + ""));
        else
            this.info.text = "";
        this.expBar.maximum = nextCfg ? nextCfg.exp : this._weiWangCfg.exp;
        this.expBar.value = Actor.weiWang;
        this.expLabel.text = Actor.weiWang + "/" + (Actor.weiWang > this.expBar.maximum ? "???" : this.expBar.maximum);
        this.myTitle.source = this._weiWangCfg.res;
    };
    WeiWangPanel.prototype.updateBack = function () {
        this.findItemTxt.visible = WeiWangCC.ins().weiWangBack > 0;
        if (this.findItemTxt.visible) {
            if (!this._backEff)
                this._backEff = ObjectPool.pop("MovieClip");
            if (!this._backEff.parent) {
                this.findItemTxt.parent.addChild(this._backEff);
                this._backEff.x = this.findItemTxt.x + this.findItemTxt.width / 2;
                this._backEff.y = this.findItemTxt.y + this.findItemTxt.height / 2;
                this._backEff.touchEnabled = false;
                this._backEff.scaleY = 0.5;
                this._backEff.scaleX = 0.6;
            }
            if (!this._backEff.isPlaying)
                this._backEff.playFile(RES_DIR_EFF + "chargeff1", -1);
        }
        else
            this.removeEffect();
    };
    WeiWangPanel.prototype.removeEffect = function () {
        if (this._backEff) {
            DisplayUtils.removeFromParent(this._backEff);
            this._backEff.destroy();
            this._backEff = null;
        }
    };
    WeiWangPanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.getItemTxt:
                UserWarn.ins().setBuyGoodsWarn(MoneyConst.weiWang);
                break;
            case this.findItemTxt:
                WarnWin.show("\u662F\u5426\u786E\u5B9A\u82B1\u8D39" + WeiWangCC.ins().weiWangBack * GlobalConfig.PrestigeBase.cost + "\u5143\u5B9D\u627E\u56DE" + WeiWangCC.ins().weiWangBack + "\u70B9\u5A01\u671B\u503C\uFF1F", function () {
                    if (Actor.yb < WeiWangCC.ins().weiWangBack * GlobalConfig.PrestigeBase.cost)
                        UserTips.ins().showTips("元宝不足，请充值！");
                    else
                        WeiWangCC.ins().sendFindWeiWang();
                }, this);
                break;
            case this.overViewTxt:
                ViewManager.ins().open(WeiWangOverViewWin);
                break;
            case this.closeBtn:
                ViewManager.ins().close(LiLianWin);
                break;
            case this.title0:
                ViewManager.ins().open(WeiWangTitleTipsWin, GlobalConfig.PrestigeBase.topThree[0]);
                break;
            case this.title1:
                ViewManager.ins().open(WeiWangTitleTipsWin, GlobalConfig.PrestigeBase.topThree[1]);
                break;
            case this.title2:
                ViewManager.ins().open(WeiWangTitleTipsWin, GlobalConfig.PrestigeBase.topThree[2]);
                break;
            case this.help:
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[24].text);
                break;
            case this.bodyImg0:
            case this.bodyImg1:
            case this.bodyImg2:
                this._openOtherWin = true;
                UserReadPlayer.ins().sendFindPlayer(Number(e.target.name));
                break;
            case this.checkBtn:
                ViewManager.ins().open(RankingWin, RankDataType.TYPE_WEIWANG);
                break;
        }
    };
    WeiWangPanel.prototype.openOtherPlayerView = function (otherPlayerData) {
        if (this._openOtherWin) {
            ViewManager.ins().open(RRoleWin, otherPlayerData);
            this._openOtherWin = false;
        }
        else {
            var index = this._topThree.indexOf(otherPlayerData.id);
            if (index < 0)
                return;
            var role = otherPlayerData.roleData[0];
            var zb = role.zhuangbei;
            var isHaveBody = void 0;
            var bodyId = zb[0];
            var weaponId = zb[1];
            var weaponConf = role.getEquipByIndex(0);
            var weaponConfId = weaponConf.item.configID;
            var bodyConf = role.getEquipByIndex(2);
            var bodyConfId = bodyConf.item.configID;
            this["weaponImg" + index].source = null;
            this["bodyImg" + index].source = null;
            if (weaponConfId > 0) {
                var fileName = GlobalConfig.EquipConfig[weaponConfId].appearance;
                if (fileName && fileName.indexOf("[job]") > -1)
                    fileName = fileName.replace("[job]", role.job + "");
                this["weaponImg" + index].source = fileName + "_" + role.sex + "_c_png";
            }
            if (bodyConfId > 0) {
                var fileName = GlobalConfig.EquipConfig[bodyConfId].appearance;
                if (fileName && fileName.indexOf("[job]") > -1)
                    fileName = fileName.replace("[job]", role.job + "");
                this["bodyImg" + index].source = fileName + "_" + role.sex + "_c_png";
                isHaveBody = true;
            }
            if (!isHaveBody)
                this["bodyImg" + index].source = "body000_" + role.sex + "_c_png";
            if (weaponId > 0)
                this["weaponImg" + index].source = this.getZhuangbanById(weaponId).res + "_" + role.sex + "_c_png";
            if (bodyId > 0)
                this["bodyImg" + index].source = this.getZhuangbanById(bodyId).res + "_" + role.sex + "_c_png";
            this["wingImg" + index].source = null;
            var wingdata = role.wingsData;
            var id = zb[2];
            if (id > 0)
                this["wingImg" + index].source = GlobalConfig.ZhuangBanId[id].res + "_png";
            else if (wingdata.openStatus) {
                this["wingImg" + index].source = GlobalConfig.WingLevelConfig[wingdata.lv].appearance + "_png";
            }
        }
    };
    WeiWangPanel.prototype.getZhuangbanById = function (id) {
        for (var k in GlobalConfig.ZhuangBanId) {
            if (GlobalConfig.ZhuangBanId[k].id == id)
                return GlobalConfig.ZhuangBanId[k];
        }
        return null;
    };
    return WeiWangPanel;
}(BaseEuiView));
__reflect(WeiWangPanel.prototype, "WeiWangPanel");
//# sourceMappingURL=WeiWangPanel.js.map