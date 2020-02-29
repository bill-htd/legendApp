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
var CityIconRule = (function (_super) {
    __extends(CityIconRule, _super);
    function CityIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            GameLogic.ins().postEnterMap,
            Actor.ins().postLevelChange
        ];
        return _this;
    }
    CityIconRule.prototype.checkShowIcon = function () {
        return GameMap.sceneInMain() && OpenSystem.ins().checkSysOpen(SystemType.CITYMONSTER);
    };
    CityIconRule.prototype.checkShowRedPoint = function () {
        return 0;
    };
    CityIconRule.prototype.tapExecute = function () {
        if (!GameServer.serverOpenDay) {
            UserTips.ins().showTips("|C:0xff0000&T:\u6682\u672A\u5F00\u653E\uFF0C\u5F00\u670D\u7B2C\u4E8C\u5929\u5F00\u542F");
            return;
        }
        if (!OpenSystem.ins().checkSysOpen(SystemType.CITY))
            return;
        if (!GameMap.sceneInMain())
            return;
        if (Encounter.ins().isEncounter()) {
            UserTips.ins().showTips("|C:0xf3311e&T:正在挑战附近的人|");
            return;
        }
        if (CityCC.ins().enterCD < 1) {
            CityCC.ins().sendEnter();
        }
        else
            UserTips.ins().showTips("\u51B7\u5374\u4E2D\uFF0C" + CityCC.ins().enterCD + "\u79D2\u540E\u53EF\u8FDB\u5165\u4E3B\u57CE");
    };
    CityIconRule.prototype.getEffName = function (redPointNum) {
        return undefined;
    };
    return CityIconRule;
}(RuleIconBase));
__reflect(CityIconRule.prototype, "CityIconRule");
//# sourceMappingURL=CityIconRule.js.map