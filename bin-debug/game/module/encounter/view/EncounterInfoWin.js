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
var EncounterInfoWin = (function (_super) {
    __extends(EncounterInfoWin, _super);
    function EncounterInfoWin() {
        var _this = _super.call(this) || this;
        _this.curIndex = -1;
        _this.name = "\u9644\u8FD1\u7684\u4EBA";
        return _this;
    }
    EncounterInfoWin.prototype.childrenCreated = function () {
        this.myFace.source = "head_" + SubRoles.ins().getSubRoleByIndex(0).job + SubRoles.ins().getSubRoleByIndex(0).sex;
        this.list.itemRenderer = EncounterInfoItem;
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
    };
    EncounterInfoWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.labelRed.textFlow = TextFlowMaker.generateTextFlow1("|U:&C:0x35e62d&T:\u7ACB\u5373\u6311\u6218|");
        Encounter.ins().sendInquireRecord();
        Encounter.ins().sendInquirePrestige();
        this.setData();
        this.addTouchEvent(this, this.onTap);
        this.addTouchEvent(this.rewardBtn, this.onTap);
        this.observe(Encounter.ins().postEncounterDataChange, this.setData);
        this.observe(Encounter.ins().postDataUpdate, this.updatePrestigeRank);
    };
    EncounterInfoWin.prototype.$onClose = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.$onClose.call(this);
        TimerManager.ins().removeAll(this);
    };
    EncounterInfoWin.prototype.updatePrestigeRank = function (param) {
        var prestige = param[0];
        var rank = param[1];
        this.dayPrestige.text = prestige + "";
        if (rank == 0) {
            this.rank.textFlow = TextFlowMaker.generateTextFlow1("|U:&C:0xFB9409&T:\u672A\u4E0A\u699C|");
        }
        else {
            this.rank.textFlow = TextFlowMaker.generateTextFlow1("|U:&C:0xFB9409&T:" + rank + "\u540D|");
        }
    };
    EncounterInfoWin.prototype.setData = function () {
        var arr = [];
        if (this.curIndex > -1 && Encounter.ins().buyAndFight) {
            this.sendFight(this.curIndex);
        }
        Encounter.ins().buyAndFight = false;
        this.curIndex = -1;
        this.labelRedPoint.text = "" + EncounterModel.redName;
        this.labelRedPoint.textColor = EncounterModel.redName >= GlobalConfig.SkirmishBaseConfig.maxPkval ? 0xFF0000 : 0x35E62D;
        this.labelRed.visible = false;
        if (EncounterModel.redName >= GlobalConfig.SkirmishBaseConfig.maxPkval) {
            this.time.text = "(" + (EncounterModel.redName - GlobalConfig.SkirmishBaseConfig.maxPkval + 1) + "\u5206\u949F\u540E\u53EF\u6311\u6218)";
            this.time.textColor = 0xff0000;
        }
        else {
            this.removeTime();
        }
        for (var i = 0; i < Encounter.ins().encounterModel.length; i++) {
            var enModel = Encounter.ins().getEncounterModel(i);
            if (enModel) {
                if (enModel.firstData) {
                    arr = [enModel];
                    break;
                }
                arr.push(enModel);
            }
        }
        if (arr.length == 0) {
            arr.push(null);
        }
        this.list.dataProvider = new eui.ArrayCollection(arr);
    };
    EncounterInfoWin.prototype.addTime = function () {
        this.removeTime();
        this.timeGap = (EncounterModel.redName - GlobalConfig.SkirmishBaseConfig.maxPkval + 1) * 60;
        this.time.text = "(" + DateUtils.getFormatBySecond(this.timeGap, 3) + "\u540E\u53EF\u6311\u6218)";
        TimerManager.ins().doTimer(1000, 0, this.timeHandler, this);
    };
    EncounterInfoWin.prototype.timeHandler = function () {
        if (this.timeGap > 0) {
            this.timeGap -= 1;
            this.time.text = "(" + DateUtils.getFormatBySecond(this.timeGap, 3) + "\u540E\u53EF\u6311\u6218)";
        }
        else {
            this.time.text = '';
        }
    };
    EncounterInfoWin.prototype.removeTime = function () {
        this.time.text = '';
        TimerManager.ins().remove(this.timeHandler, this);
    };
    EncounterInfoWin.prototype.onTap = function (e) {
        if (e.target instanceof eui.Button && e.target.parent instanceof EncounterInfoItem) {
            if (CityCC.ins().isCity) {
                UserTips.ins().showTips('主城不能击杀附近的人,请先传送到野外');
                return;
            }
            if (e.target.label == "\u6311 \u6218" || e.target.label == "\u6311\u6218\u4E2D") {
                if (UserFb.ins().checkInFB())
                    return;
                var index = e.target.parent.data.index;
                if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
                    ViewManager.ins().open(BagFullTipsWin);
                    return;
                }
                if (EncounterModel.redName >= GlobalConfig.SkirmishBaseConfig.maxPkval) {
                    this.curIndex = index;
                    ViewManager.ins().open(BuyRedNameWin);
                    return;
                }
                this.sendFight(index);
            }
            else if (e.target.label == "\u5BFB \u654C") {
                ViewManager.ins().open(FindEnemyWin);
            }
        }
        else {
            switch (e.target) {
                case this.rankBtn:
                    ViewManager.ins().open(RankingWin, RankDataType.TYPE_SKIRMISH);
                    break;
                case this.recordBtn:
                    ViewManager.ins().open(ZaoYuRecordWin);
                    break;
                case this.labelRed:
                    if (EncounterModel.redName > 0)
                        ViewManager.ins().open(BuyRedNameWin);
                    else
                        UserTips.ins().showTips("\u6CA1\u6709\u53EF\u6D88\u9664\u7684PK\u503C");
                    break;
                case this.rank:
                    ViewManager.ins().open(RankingWin, RankDataType.TYPE_SKIRMISH);
                    break;
                case this.rewardBtn:
                    ViewManager.ins().open(EncounterRewardWin);
                    break;
            }
        }
    };
    EncounterInfoWin.prototype.sendFight = function (index) {
        if (UserFb.ins().checkInFB())
            return;
        ViewManager.ins().close(BagFullTipsWin);
        ViewManager.ins().closeTopLevel();
        TimerManager.ins().doTimer(100, 1, function () {
            EncounterFight.ins().start(index);
        }, this);
    };
    return EncounterInfoWin;
}(BaseComponent));
__reflect(EncounterInfoWin.prototype, "EncounterInfoWin");
//# sourceMappingURL=EncounterInfoWin.js.map