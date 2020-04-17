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
var HBSystem = (function (_super) {
    __extends(HBSystem, _super);
    function HBSystem() {
        var _this = _super.call(this) || this;
        _this.observe(Activity.ins().postGetRedEnvelope, _this.showHongBaoTips);
        _this.observe(Activity.ins().postRewardResult, _this.ActRewardResult);
        _this.observe(Activity.ins().postEnvelopeDataCall, _this.showEnvelope);
        return _this;
    }
    HBSystem.ins = function () {
        return _super.ins.call(this);
    };
    HBSystem.prototype.handleHongbao = function () {
        var view = ViewManager.ins().getView(PlayFunView);
        if (!view || !view.hongbao)
            return;
        if (view.hongbao.numElements > 0)
            return;
        if (Activity.ins().activityData[2001] instanceof ActivityType24Data) {
            var actData = Activity.ins().activityData[2001];
            for (var j = actData.envelopeData.length - 1; j >= 0;) {
                j = actData.envelopeData.length - 1;
                var eId = actData.envelopeData[j].id;
                if (actData.envelopeData[j].canStartTimer()) {
                    var item = new HongBaoShowItem();
                    item.data = { actId: 2001, eId: eId };
                    view.hongbao.addChild(item);
                    break;
                }
                else {
                    TimerManager.ins().remove(this.updateHBTime, this);
                    TimerManager.ins().doTimer(1000, 0, this.updateHBTime, this);
                    break;
                }
            }
        }
    };
    HBSystem.prototype.updateHongBao = function () {
        TimerManager.ins().doTimer(1000, 1, this.handleHongbao, this);
    };
    HBSystem.prototype.updateHBTime = function () {
        var view = ViewManager.ins().getView(PlayFunView);
        if (Activity.ins().activityData[2001] instanceof ActivityType24Data) {
            var actData = Activity.ins().activityData[2001];
            for (var j = actData.envelopeData.length - 1; j >= 0;) {
                j = actData.envelopeData.length - 1;
                var eId = actData.envelopeData[j].id;
                if (actData.envelopeData[j].canStartTimer()) {
                    TimerManager.ins().remove(this.updateHBTime, this);
                    var item = new HongBaoShowItem();
                    item.data = { actId: 2001, eId: eId };
                    view.hongbao.addChild(item);
                    break;
                }
                else {
                    break;
                }
            }
        }
    };
    HBSystem.prototype.showHongBaoTips = function (param) {
        var actId = param[0];
        var eId = param[1];
        var yb = param[2];
        var gold = param[3];
        var arr = param[4];
        var actData = Activity.ins().activityData[actId];
        if (actData) {
            if (yb) {
                var reward = new RewardData;
                reward.type = 0;
                reward.id = MoneyConst.yuanbao;
                reward.count = yb;
                UserTips.ins().showGoodRewardTips(reward);
            }
            if (eId)
                actData.popEnvelope(eId);
            this.HongBaoResultAni(arr);
        }
    };
    HBSystem.prototype.HongBaoResultAni = function (arr) {
        var view = ViewManager.ins().getView(PlayFunView);
        if (!view || !view.hongbao)
            return;
        var item = view.hongbao.getChildAt(1);
        if (item)
            item.playAni(arr, this.updateHongBao, this);
    };
    HBSystem.prototype.ActRewardResult = function (activityID) {
        if (Activity.ins().activityTimers.indexOf(activityID) == -1)
            return;
        if (Activity.ins().activityData[activityID]) {
            if (Activity.ins().activityData[activityID] instanceof ActivityType12Data) {
                if (!Activity.ins().isSuccee) {
                    if (Activity.ins().activityData[activityID].isOpenActivity())
                        UserTips.ins().showTips("|C:0xff0000&T:\u7EA2\u5305\u5DF2\u8FC7\u671F");
                    else
                        UserTips.ins().showTips("|C:0xff0000&T:\u6D3B\u52A8\u5DF2\u7ED3\u675F");
                }
            }
        }
    };
    HBSystem.prototype.showEnvelope = function (eld) {
        var view = ViewManager.ins().getView(PlayFunView);
        if (!view || !view.hongbao)
            return;
        if (!eld) {
            UserTips.ins().showTips("|C:0xff0000&T:\u7EA2\u5305\u5DF2\u8FC7\u671F");
            view.hongbao.removeChildren();
            this.updateHongBao();
            return;
        }
        if (Activity.ins().activityData[eld.id]) {
            if (Activity.ins().activityData[eld.id] instanceof ActivityType24Data) {
                var item = new HongBaoOpenItem();
                if (!eld.desc) {
                    eld.desc = GlobalConfig.ActivityType12Config[eld.id][eld.index].blessWord;
                }
                item.data = { actId: eld.id, eId: eld.eId, job: eld.job, sex: eld.sex, name: eld.name, text: eld.desc, index: eld.index };
                view.hongbao.addChildAt(item, 1);
            }
        }
    };
    HBSystem.prototype.testhongbao = function () {
        var view = ViewManager.ins().getView(PlayFunView);
        view.hongbao.removeChildren();
        ViewManager.ins().open(FuliWin, 6);
    };
    HBSystem.prototype.removeHongbao = function () {
        var view = ViewManager.ins().getView(PlayFunView);
        view.hongbao.removeChildren();
    };
    HBSystem.prototype.closeallhongbao = function () {
    };
    return HBSystem;
}(BaseSystem));
__reflect(HBSystem.prototype, "HBSystem");
var GameSystem;
(function (GameSystem) {
    GameSystem.hbsystem = HBSystem.ins.bind(HBSystem);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=HBSystem.js.map