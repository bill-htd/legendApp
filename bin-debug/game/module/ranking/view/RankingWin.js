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
var RankingWin = (function (_super) {
    __extends(RankingWin, _super);
    function RankingWin() {
        var _this = _super.call(this) || this;
        _this.firstId = 0;
        _this.skinName = "RankSkin";
        _this.isTopLevel = true;
        return _this;
    }
    RankingWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.praiseBtn.touchEnabled = true;
        this.praiseBtn.icon = "xphb_json.phb_2";
        this.list.itemRenderer = RankItemRenderer;
        for (var i = 0; i < 3; i++) {
            var group = new eui.Group();
            group.name = "Group" + i;
            var btn = new eui.Button();
            btn.label = "Button" + i;
            group.addChild(btn);
        }
        var rankTypeDate = [
            { type: 0, skin: 'RankItemPowerSkin', name: '战力排行榜' },
            { type: 2, skin: 'RankItemSkirmishSkin', name: '遭遇排行榜' },
            { type: 3, skin: 'RankItemPowerSkin', name: '关卡排行榜' },
            { type: 4, skin: 'RankItemPowerSkin', name: '副本排行版' },
            { type: 5, skin: 'RankItemLevelSkin', name: '等级排行榜' },
            { type: 16, skin: 'RankItemPowerSkin', name: '翅膀排行榜' },
            { type: 10, skin: 'RankItemLilianSkin', name: '神功排行榜' },
            { type: 11, skin: 'RankItemLadderSkin', name: '王者排行榜' },
            { type: 12, skin: 'RankItemPowerSkin', name: '铸造总等级榜' },
            { type: 14, skin: 'RankItemPowerSkin', name: '龙魂总等级榜' },
            { type: 17, name: '图鉴总战力榜' },
            { type: 18, name: '转生榜' },
            { type: 19, name: '装备总评分榜' },
            { type: 22, name: '威望排行榜' },
        ];
        this.tab.dataProvider = new eui.ArrayCollection(rankTypeDate);
        this.tab.itemRenderer = RankTabItemRenderer;
        this.mobaiEff = new MovieClip();
        this.mobaiEff.x = 35;
        this.mobaiEff.y = -35;
        this.mobaiEff.scaleX = this.mobaiEff.scaleY = 0.65;
    };
    RankingWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.praiseBtn, this.onClick);
        this.addTouchEvent(this.list, this.onClick);
        this.addChangeEvent(this.tab, this.onClick);
        this.addTouchEvent(this.firstGroup, this.onClick);
        this.addTouchEvent(this.praiseGroup, this.onClick);
        this.addTouchEvent(this.praiseGroup2, this.onClick);
        this.addTouchEvent(this.praiseGroup3, this.onClick);
        this.addTouchEvent(this.help, this.onClick);
        this.setOpenType(param[0] == undefined ? 0 : param[0]);
        this.observe(Rank.ins().postRankingData, this.updateList);
        this.observe(UserReadPlayer.ins().postPlayerResult, this.openOtherPlayerView);
        this.observe(Rank.ins().postPraiseResult, this.refushMoBaiStatu);
        this.observe(Rank.ins().postPraiseData, this.updatePraise);
        this.observe(Rank.ins().postAllPraiseData, this.updateTab);
        Rank.ins().sendGetAllPraiseData();
    };
    RankingWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this._weaponEff0)
            DisplayUtils.removeFromParent(this._weaponEff0);
        if (this._weaponEff1)
            DisplayUtils.removeFromParent(this._weaponEff1);
        if (this._weaponEff2)
            DisplayUtils.removeFromParent(this._weaponEff2);
        if (this._bodyEff0)
            DisplayUtils.removeFromParent(this._bodyEff0);
        if (this._bodyEff1)
            DisplayUtils.removeFromParent(this._bodyEff1);
        if (this._bodyEff2)
            DisplayUtils.removeFromParent(this._bodyEff2);
        WatcherUtil.removeFromArrayCollection(this.tab.dataProvider);
    };
    RankingWin.prototype.updateList = function (rankModel) {
        if (rankModel.type != this._type)
            return;
        this.selfPos.text = 0 < rankModel.selfPos && rankModel.selfPos <= 1000 ? rankModel.selfPos + '' : "\u672A\u4E0A\u699C";
        var arr = rankModel.getDataList();
        if (rankModel.type == 0) {
        }
        this.list.dataProvider = new eui.ArrayCollection(arr.slice(1));
        this.refushMoBaiStatu();
        this.refushFirstInfo(rankModel.getDataList(0));
        if (arr && !arr.length) {
            this.state.visible = true;
        }
        else {
            this.state.visible = false;
        }
        this.titleMcGroup.visible = this.titleImg.visible = this.firstGroup.visible = !this.state.visible;
        if (!this.state.visible) {
            var selectedData = this.tab.selectedItem;
            var config = void 0;
            if (selectedData) {
                config = GlobalConfig.TitleConf[selectedData.title] || {};
            }
            else {
                config = {};
            }
            this.titleImg.source = config.img;
            if (config.eff) {
                if (!this.titleMc) {
                    this.titleMc = ObjectPool.pop("MovieClip");
                    this.titleMc.x = 0;
                    this.titleMc.y = 0;
                    this.titleMc.scaleX = 1.5;
                    this.titleMc.scaleY = 1.5;
                    this.titleMcGroup.addChild(this.titleMc);
                }
                this.titleMc.playFile(RES_DIR_EFF + config.eff, -1);
            }
            else {
                if (this.titleMc) {
                    this.titleMc.destroy();
                    this.titleMc = null;
                }
            }
        }
    };
    RankingWin.prototype.refushFirstInfo = function (firstInfo) {
        if (firstInfo) {
            this.firstId = firstInfo.id;
            this.firstNameTxt.text = firstInfo.player;
            this.vip.visible = firstInfo.vip > 0;
            var str = "";
            if (Rank.ins().curType == RankDataType.TYPE_XUNZHANG) {
                var cfg = GlobalConfig.KnighthoodConfig[firstInfo.count];
                str = cfg.type;
            }
            else if (Rank.ins().curType == RankDataType.TYPE_LILIAN) {
                var cfg = GlobalConfig.TrainLevelConfig[firstInfo.count];
                str = cfg.trainlevel + "\u7B49" + cfg.trainName;
            }
            else if (Rank.ins().curType == RankDataType.TYPE_SKIRMISH) {
                str = "\u6740\u610F\uFF1A" + firstInfo.count;
            }
            else if (Rank.ins().curType == RankDataType.TYPE_XIAYI) {
                str = "\u9B45\u529B\u503C\uFF1A" + firstInfo.count;
            }
            else {
                if (firstInfo[RankDataType.DATA_LEVEL] != undefined) {
                    str = firstInfo[RankDataType.DATA_LEVEL] + "\u7EA7";
                }
                else {
                    this.firstLevelTxt.visible = false;
                }
            }
            if (Rank.ins().curType == RankDataType.TYPE_WEIWANG) {
                this.weiwang.visible = true;
                this.weiwang.source = WeiWangCC.ins().getWeiWangCfg(firstInfo.weiWang).res;
                this.firstLevelTxt.visible = false;
            }
            else {
                this.firstLevelTxt.visible = true;
                this.weiwang.visible = false;
            }
            if (firstInfo[RankDataType.DATA_LEVEL] == undefined) {
                this.firstLevelTxt.visible = false;
            }
            this.firstLevelTxt.text = str;
        }
        else {
            this.firstId = 0;
            this.weiwang.visible = false;
        }
    };
    RankingWin.prototype.updateValue = function (infoData, key, value) {
        switch (key) {
            case RankDataType.DATA_VIP:
                return;
            case RankDataType.DATA_MONTH:
                return;
            case RankDataType.DATA_LEVEL:
                value = (infoData[RankDataType.DATA_ZHUAN] ? infoData[RankDataType.DATA_ZHUAN] + "\u8F6C" : "") + value + "\u7EA7";
                break;
            case RankDataType.DATA_COUNT:
                break;
        }
        this.firstLevelTxt.text = value;
    };
    RankingWin.prototype.refushMoBaiStatu = function () {
        if (Rank.ins().canPraiseByType(this._type)) {
            this.praiseBtn.icon = "xphb_json.phb_2";
            this.mobaiEff.playFile(RES_DIR_EFF + "huoban", -1);
            this.mobai.addChild(this.mobaiEff);
        }
        else {
            this.praiseBtn.icon = "xphb_json.phb_23";
            DisplayUtils.removeFromParent(this.mobaiEff);
        }
        this.updateTab();
    };
    RankingWin.prototype.setOpenType = function (_type) {
        var datas = this.tab.dataProvider;
        var index = 0;
        if (datas) {
            for (var i = 0; i < datas.length; i++) {
                var data = datas.getItemAt(i);
                if (data.type == _type) {
                    index = i;
                    break;
                }
            }
        }
        this.setOpenIndex(index);
    };
    RankingWin.prototype.setOpenIndex = function (selectedIndex) {
        this.tab.selectedIndex = selectedIndex;
        var selectedData = this.tab.selectedItem;
        if (selectedData) {
            this._type = selectedData.type;
        }
        else {
            this._type = RankDataType.TYPE_POWER;
        }
        Rank.ins().curType = this._type;
        RankItemRenderer.dataFormat = selectedData;
        this.selfPos.text = null;
        this.list.dataProvider = null;
        if (selectedData) {
            this.list.itemRendererSkinName = selectedData.skin || "RankItemPowerSkin";
        }
        else {
            this.list.itemRendererSkinName = "RankItemPowerSkin";
        }
        if (this._type == RankDataType.TYPE_LADDER) {
            Ladder.ins().sendGetRankInfo();
        }
        else {
            this.firstGroup.visible = false;
            Rank.ins().sendGetRankingData(this._type);
        }
        Rank.ins().sendGetPraiseData(this._type);
    };
    RankingWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.praiseBtn:
                if (Rank.ins().rankModel[this._type].praise.praiseTime < 1) {
                    Rank.ins().sendPraise(this._type);
                }
                else {
                    UserTips.ins().showTips("|C:0xf3311e&T:\u5DF2\u819C\u62DC|");
                }
                break;
            case this.list:
                if (this.list.selectedItem) {
                    this._openOtherWin = true;
                    UserReadPlayer.ins().sendFindPlayer(this.list.selectedItem[RankDataType.DATA_ID]);
                }
                break;
            case this.tab:
                this.setOpenIndex(this.tab.selectedIndex);
                break;
            case this.firstGroup:
            case this.praiseGroup:
            case this.praiseGroup2:
            case this.praiseGroup3:
                if (this.firstId) {
                    this._openOtherWin = true;
                    UserReadPlayer.ins().sendFindPlayer(this.firstId);
                }
                break;
            case this.help:
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[21].text);
                break;
        }
    };
    RankingWin.prototype.openOtherPlayerView = function (otherPlayerData) {
        if (this._openOtherWin) {
            this._openOtherWin = false;
            ViewManager.ins().open(RRoleWin, otherPlayerData);
        }
    };
    RankingWin.prototype.updatePraise = function (type) {
        var role;
        if (Rank.ins().rankModel[type].praise.id > 0) {
            for (var i = 0; i < 3; i++) {
                role = Rank.ins().rankModel[type].praise.subRole[i];
                if (role) {
                    var clothCfg = GlobalConfig.EquipConfig[role.clothID];
                    if (clothCfg) {
                        var fileName = clothCfg.appearance;
                        if (fileName && fileName.indexOf("[job]") > -1)
                            fileName = fileName.replace("[job]", role.job + "");
                        this["bodyImg" + i].source = (role.clothID > 0 ? fileName + "_" : "body" + role.job + "00_") + role.sex + "_c_png";
                    }
                    else {
                        this["bodyImg" + i].source = "body000_" + role.sex + "_c_png";
                    }
                    var weaponCfg = GlobalConfig.EquipConfig[role.swordID];
                    if (weaponCfg) {
                        var fileName = GlobalConfig.EquipConfig[role.swordID].appearance;
                        if (fileName && fileName.indexOf("[job]") > -1)
                            fileName = fileName.replace("[job]", role.job + "");
                        this["weaponImg" + i].source = !this.hideWeapon(role.swordID, role.sex) ? (role.swordID > 0 ? fileName + "_" + role.sex + "_c_png" : '') : "";
                    }
                    else {
                        this["weaponImg" + i].source = "";
                    }
                    var wingCfg = GlobalConfig.WingLevelConfig[role.wingLevel];
                    if (wingCfg) {
                        this["wingImg" + i].source = role.wingLevel >= 0 ? wingCfg.appearance + "_png" : '';
                    }
                    else {
                        this["wingImg" + i].source = "";
                    }
                    if (role.pos1 > 0) {
                        this["bodyImg" + i].source = this.getZhuangbanById(role.pos1).res + "_" + role.sex + "_c_png";
                        DisplayUtils.removeFromParent(this["_bodyEff" + i]);
                    }
                    else {
                        if (!this["_bodyEff" + i])
                            this["_bodyEff" + i] = new MovieClip();
                        this.setWeaponEffect(role.clothID, "bPos" + i + "_", role.sex, this["bodyEffect" + i], this["_bodyEff" + i]);
                    }
                    if (role.pos2 > 0) {
                        this["weaponImg" + i].source = this.getZhuangbanById(role.pos2).res + "_" + role.sex + "_c_png";
                        DisplayUtils.removeFromParent(this["_weaponEff" + i]);
                    }
                    else {
                        if (!this["_weaponEff" + i])
                            this["_weaponEff" + i] = new MovieClip();
                        this.setWeaponEffect(role.swordID, "wPos" + i + "_", role.sex, this["weaponEffect" + i], this["_weaponEff" + i]);
                    }
                    if (role.pos3 > 0) {
                        this["wingImg" + i].source = this.getZhuangbanById(role.pos3).res + "_png";
                    }
                }
                else {
                    this["bodyImg" + i].source = "body00_png";
                    this["weaponImg" + i].source = "";
                    this["wingImg" + i].source = "";
                    if (this["_weaponEff" + i])
                        DisplayUtils.removeFromParent(this["_weaponEff" + i]);
                    if (this["_bodyEff" + i])
                        DisplayUtils.removeFromParent(this["_bodyEff" + i]);
                }
            }
            this.refushMoBaiStatu();
        }
        else {
            for (var i = 0; i < 3; i++) {
                this["bodyImg" + i].source = "body00_png";
                this["weaponImg" + i].source = "";
                this["wingImg" + i].source = "";
                DisplayUtils.removeFromParent(this["_weaponEff" + i]);
                DisplayUtils.removeFromParent(this["_bodyEff" + i]);
            }
        }
        this.updateTab();
    };
    RankingWin.prototype.updateTab = function () {
        var i = this.tab.selectedIndex;
        if (this.tab.dataProvider) {
            this.tab.dataProvider.refresh();
        }
        this.tab.selectedIndex = i;
    };
    RankingWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var lv = Actor.level;
        if (lv < 60) {
            UserTips.ins().showTips("60\u7EA7\u5F00\u542F\u6392\u884C\u699C");
            return false;
        }
        return true;
    };
    RankingWin.prototype.getZhuangbanById = function (id) {
        for (var k in GlobalConfig.ZhuangBanId) {
            if (GlobalConfig.ZhuangBanId[k].id == id)
                return GlobalConfig.ZhuangBanId[k];
        }
        return null;
    };
    RankingWin.prototype.hideWeapon = function (id, sex) {
        return GlobalConfig.EquipWithEffConfig[id + "_" + sex] ? true : false;
    };
    RankingWin.prototype.setWeaponEffect = function (id, imgStr, sex, soulEffGroup, suitEff) {
        var cfg = GlobalConfig.EquipWithEffConfig[id + "_" + sex];
        if (cfg) {
            suitEff.scaleX = suitEff.scaleY = cfg.scaling;
            if (!suitEff.parent)
                soulEffGroup.addChild(suitEff);
            suitEff.x = this[imgStr + sex].x + cfg.offX;
            suitEff.y = this[imgStr + sex].y + cfg.offY;
            suitEff.playFile(RES_DIR_EFF + cfg.inShowEff, -1);
        }
        else if (suitEff.parent)
            suitEff.parent.removeChild(suitEff);
    };
    return RankingWin;
}(BaseEuiView));
__reflect(RankingWin.prototype, "RankingWin");
ViewManager.ins().reg(RankingWin, LayerManager.UI_Main);
//# sourceMappingURL=RankingWin.js.map