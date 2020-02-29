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
var OpenSystem = (function (_super) {
    __extends(OpenSystem, _super);
    function OpenSystem() {
        return _super.call(this) || this;
    }
    OpenSystem.ins = function () {
        return _super.ins.call(this);
    };
    OpenSystem.prototype.checkSysOpen = function (type) {
        var config = GlobalConfig.OpenSystemConfig[type];
        if (config && config.judge) {
            if (!config.than)
                return UserZs.ins().lv >= config.openzs && Actor.level >= config.openlevel && UserFb.ins().guanqiaID >= config.opencheck;
            else
                return UserZs.ins().lv <= config.openzs && Actor.level <= config.openlevel && UserFb.ins().guanqiaID <= config.opencheck;
        }
        else {
            if (type == SystemType.FIRSTCHARGE && LocationProperty.pfid == "2") {
                return true;
            }
        }
        return false;
    };
    OpenSystem.prototype.getNoOpenTips = function (type) {
        var config = GlobalConfig.OpenSystemConfig[type];
        var tips = "";
        if (config) {
            if (!config.judge) {
                tips = config.funName + "\u672A\u5F00\u542F";
            }
            else {
                if (!config.than) {
                    if (UserZs.ins().lv < config.openzs) {
                        tips += config.openzs + "\u8F6C";
                    }
                    if (Actor.level < config.openlevel) {
                        tips += config.openlevel + "\u7EA7";
                    }
                    if (UserFb.ins().guanqiaID < config.opencheck) {
                        tips += "\u901A\u8FC7\u7B2C" + config.opencheck + "\u5173";
                    }
                    if (tips != "")
                        tips += "\u5F00\u542F" + config.funName;
                }
            }
        }
        return tips;
    };
    return OpenSystem;
}(BaseSystem));
__reflect(OpenSystem.prototype, "OpenSystem");
//# sourceMappingURL=OpenSystem.js.map