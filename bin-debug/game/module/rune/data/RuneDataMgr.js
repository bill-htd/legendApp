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
var RuneDataMgr = (function (_super) {
    __extends(RuneDataMgr, _super);
    function RuneDataMgr() {
        var _this = _super.call(this) || this;
        _this.posIsWear = null;
        return _this;
    }
    RuneDataMgr.ins = function () {
        return _super.ins.call(this);
    };
    RuneDataMgr.prototype.getRoleRune = function (roleIndex) {
        var role = SubRoles.ins().getSubRoleByIndex(roleIndex);
        if (role) {
            return role.runeDatas;
        }
        return null;
    };
    RuneDataMgr.prototype.getRune = function (roleIndex, pos) {
        var runeDatas = this.getRoleRune(roleIndex);
        if (!runeDatas)
            return null;
        return runeDatas[pos];
    };
    RuneDataMgr.prototype.replaceRune = function (roleIndex, pos, id) {
        var rdList = this.getRoleRune(roleIndex);
        if (rdList && pos >= 0) {
            rdList[pos].configID = id;
        }
    };
    RuneDataMgr.prototype.getMinRune = function (roleIndex, canUp) {
        if (canUp === void 0) { canUp = false; }
        var runeDatas = this.getRoleRune(roleIndex);
        if (!runeDatas)
            return null;
        var exitDatas = [];
        for (var i = 0; i < runeDatas.length; i++) {
            if (runeDatas[i].itemConfig) {
                exitDatas.push(runeDatas[i]);
            }
        }
        exitDatas.sort(function (a, b) {
            if ((a.itemConfig.id % 100) < (b.itemConfig.id % 100))
                return -1;
            if ((a.itemConfig.id % 100) > (b.itemConfig.id % 100))
                return 1;
            var quality1 = ItemConfig.getQuality(a.itemConfig);
            var quality2 = ItemConfig.getQuality(b.itemConfig);
            if (quality1 > quality2)
                return -1;
            if (quality1 < quality2)
                return 1;
            return 0;
        });
        if (canUp) {
            for (var _i = 0, exitDatas_1 = exitDatas; _i < exitDatas_1.length; _i++) {
                var itemDt = exitDatas_1[_i];
                if (RuneRedPointMgr.ins().checkSingleUpgrade(itemDt))
                    return itemDt;
            }
        }
        return exitDatas[0];
    };
    return RuneDataMgr;
}(BaseClass));
__reflect(RuneDataMgr.prototype, "RuneDataMgr");
//# sourceMappingURL=RuneDataMgr.js.map