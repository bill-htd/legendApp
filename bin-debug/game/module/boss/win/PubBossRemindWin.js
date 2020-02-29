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
var PubBossRemindWin = (function (_super) {
    __extends(PubBossRemindWin, _super);
    function PubBossRemindWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "PubBossRemindSkin";
        _this.isTopLevel = true;
        return _this;
    }
    PubBossRemindWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.listDatas = new eui.ArrayCollection;
    };
    PubBossRemindWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.type = param[0];
        this.autoChallenge.visible = Recharge.ins().franchise ? true : false;
        var tempArr = [];
        tempArr = UserBoss.ins().worldInfoList[this.type].slice();
        if (this.type == UserBoss.BOSS_SUBTYPE_QMBOSS) {
            this.list0.itemRenderer = PubBossRemindItem;
            this.autoChallenge.selected = AutoChallengeBoss.ins().autoYewaiBoss;
        }
        else if (this.type == UserBoss.BOSS_SUBTYPE_HOMEBOSS) {
            this.list0.itemRenderer = HomeBossRemindItem;
        }
        else if (this.type == UserBoss.BOSS_SUBTYPE_DARKBOSS) {
            this.list0.itemRenderer = PubBossRemindItem;
            this.autoChallenge.visible = false;
        }
        else if (this.type == UserBoss.BOSS_SUBTYPE_GODWEAPON) {
            tempArr = UserBoss.ins().getGwBossList();
            this.list0.itemRenderer = GwBossRemindItem;
            this.autoChallenge.visible = false;
        }
        else if (this.type == UserBoss.BOSS_SUBTYPE_SHENYU) {
            this.list0.itemRenderer = PubBossRemindItem;
            this.autoChallenge.selected = AutoChallengeBoss.ins().autoShenyuBoss;
        }
        this.addTouchEvent(this.autoChallenge, this.onChallenge);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        if (this.type == UserBoss.BOSS_SUBTYPE_QMBOSS) {
            if (!SamsaraModel.ins().isOpen()) {
                var ary = [];
                for (var i in tempArr) {
                    var config = GlobalConfig.WorldBossConfig[tempArr[i].id];
                    if (!config.samsaraLv) {
                        ary.push(tempArr[i]);
                    }
                }
                tempArr = ary;
            }
        }
        this.listDatas.source = tempArr.sort(this.compareFn);
        this.list0.dataProvider = this.listDatas;
        this.addTouchEvent(this, this.onTap);
    };
    PubBossRemindWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        UserBoss.ins().sendBossSetting();
        this.removeTouchEvent(this, this.onTap);
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.bgClose, this.onTap);
        AutoChallengeBoss.ins().checkEnter();
    };
    PubBossRemindWin.prototype.onChallenge = function (e) {
        if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
            ViewManager.ins().open(BagFullTipsWin, UserBag.BAG_ENOUGH);
            this.autoChallenge.selected = false;
        }
        else {
            if (this.type == UserBoss.BOSS_SUBTYPE_SHENYU) {
                AutoChallengeBoss.ins().autoShenyuBoss = this.autoChallenge.selected;
            }
            else if (this.type == UserBoss.BOSS_SUBTYPE_QMBOSS) {
                AutoChallengeBoss.ins().autoYewaiBoss = this.autoChallenge.selected;
            }
        }
    };
    PubBossRemindWin.prototype.onTap = function (e) {
        if (e.target instanceof eui.CheckBox) {
            var index = parseInt(e.target.name);
            UserBoss.ins().setBossSetting(index);
        }
        else {
            switch (e.currentTarget) {
                case this.bgClose:
                case this.closeBtn:
                case this.closeBtn0:
                    ViewManager.ins().close(this);
                    break;
            }
        }
    };
    PubBossRemindWin.prototype.compareFn = function (a, b) {
        var configA = GlobalConfig.WorldBossConfig[a.id];
        var configB = GlobalConfig.WorldBossConfig[b.id];
        var canChallenge1 = UserBoss.isCanChallenge(configA);
        var canChallenge2 = UserBoss.isCanChallenge(configB);
        if (canChallenge1 && !canChallenge2) {
            return -1;
        }
        else if (!canChallenge1 && canChallenge2) {
            return 1;
        }
        else {
            if (configA.samsaraLv > configB.samsaraLv) {
                return 1;
            }
            else if (configA.samsaraLv < configB.samsaraLv) {
                return -1;
            }
            else if (configA.samsaraLv == configB.samsaraLv && configA.samsaraLv != 0) {
                if (configA.level > configB.level)
                    return 1;
                else if (configA.level < configB.level)
                    return -1;
            }
            else {
                if (configA.zsLevel > configB.zsLevel) {
                    return 1;
                }
                else if (configA.zsLevel < configB.zsLevel) {
                    return -1;
                }
                if (configA.level > configB.level)
                    return 1;
                else if (configA.level < configB.level)
                    return -1;
                else
                    return 0;
            }
        }
    };
    return PubBossRemindWin;
}(BaseEuiView));
__reflect(PubBossRemindWin.prototype, "PubBossRemindWin");
ViewManager.ins().reg(PubBossRemindWin, LayerManager.UI_Main);
//# sourceMappingURL=PubBossRemindWin.js.map