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
var MapIconRule = (function (_super) {
    __extends(MapIconRule, _super);
    function MapIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = _this.updateMessage = [
            Actor.ins().postLevelChange,
            UserFb.ins().postGuanqiaInfo,
            UserFb.ins().postGuanKaIdChange,
        ];
        return _this;
    }
    MapIconRule.prototype.checkShowIcon = function () {
        return OpenSystem.ins().checkSysOpen(SystemType.WORLDMAP);
    };
    MapIconRule.prototype.checkShowRedPoint = function () {
        var preConfig = GlobalConfig.ChaptersRewardConfig[UserFb.ins().guanqiaReward - 1];
        var cfg = GlobalConfig.ChaptersRewardConfig[UserFb.ins().guanqiaReward];
        if (!cfg) {
            return 0;
        }
        var needLevel = preConfig ? cfg.needLevel - preConfig.needLevel : cfg.needLevel;
        var curLevel = UserFb.ins().guanqiaID - (preConfig ? preConfig.needLevel : 0) - 1;
        if (curLevel >= needLevel)
            return 1;
        var config = GlobalConfig.WorldRewardConfig;
        for (var k in config) {
            if (UserFb.ins().guanqiaID > config[k].needLevel && !UserFb.ins().isGetReceiveBox(config[k].id)) {
                return 1;
            }
        }
        return 0;
    };
    MapIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(GuanQiaWordMapWin);
    };
    return MapIconRule;
}(RuleIconBase));
__reflect(MapIconRule.prototype, "MapIconRule");
//# sourceMappingURL=MapIconRule.js.map