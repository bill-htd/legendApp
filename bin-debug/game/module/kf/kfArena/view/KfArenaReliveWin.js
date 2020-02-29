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
var KfArenaReliveWin = (function (_super) {
    __extends(KfArenaReliveWin, _super);
    function KfArenaReliveWin() {
        var _this = _super.call(this) || this;
        _this.remainM = 0;
        _this.skinName = "WorldBossGoldSkin";
        return _this;
    }
    KfArenaReliveWin.prototype.childrenCreated = function () {
        this.reliveBtn.visible = false;
        this.alive.visible = false;
    };
    KfArenaReliveWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setWin(param[0], param[1]);
    };
    KfArenaReliveWin.prototype.setWin = function (cd, killerHandler) {
        if (killerHandler > 0) {
            var killer = EntityManager.ins().getEntityByHandle(killerHandler);
            var str = "";
            if (killer) {
                var masterKiller = EntityManager.ins().getEntityByHandle(killer.infoModel.masterHandle);
                if (killer instanceof CharRole) {
                    str = killer.infoModel.name;
                }
                else if (killer.infoModel.masterHandle && masterKiller) {
                    str = "" + masterKiller.infoModel.name;
                }
                else {
                    str = "Boss" + killer.infoModel.name;
                }
            }
            this.killTips.textFlow = TextFlowMaker.generateTextFlow1("\u4F60\u88AB|C:" + 0x23C42A + "&T:" + str + "|\u51FB\u8D25");
        }
        this.reliveTimesTxt.text = cd + "秒";
        TimerManager.ins().remove(this.refushLabel, this);
        this.remainM = cd;
        TimerManager.ins().doTimer(1000, this.remainM, this.refushLabel, this, this.overTime, this);
    };
    KfArenaReliveWin.prototype.refushLabel = function () {
        this.remainM--;
        this.reliveTimesTxt.text = this.remainM + "秒";
    };
    KfArenaReliveWin.prototype.overTime = function () {
        ViewManager.ins().close(this);
    };
    return KfArenaReliveWin;
}(BaseEuiView));
__reflect(KfArenaReliveWin.prototype, "KfArenaReliveWin");
ViewManager.ins().reg(KfArenaReliveWin, LayerManager.UI_Popup);
//# sourceMappingURL=KfArenaReliveWin.js.map