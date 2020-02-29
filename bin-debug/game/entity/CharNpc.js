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
var CharNpc = (function (_super) {
    __extends(CharNpc, _super);
    function CharNpc() {
        var _this = _super.call(this) || this;
        _this.npcHead = new MineNpcHead();
        _this.npcHead.anchorOffsetY = 90;
        _this.npcHead.anchorOffsetX = 100;
        _this.npcHead.currentState = _this.npcHead.states[0];
        _this.titleCantainer.addChild(_this.npcHead);
        _this.touchEnabled = true;
        _this.touchChildren = false;
        return _this;
    }
    Object.defineProperty(CharNpc.prototype, "infoModel", {
        get: function () {
            return this._infoModel;
        },
        set: function (model) {
            this._infoModel = model;
        },
        enumerable: true,
        configurable: true
    });
    CharNpc.prototype.playCount = function () {
        return (this._state == EntityAction.RUN || this._state == EntityAction.STAND) ? -1 : 1;
    };
    CharNpc.prototype.updateModel = function () {
        var config = this.infoModel.npcConfig;
        this.npcHead.nameTxt.text = config.name;
        this.npcHead.updateModel(this.infoModel);
        this.x = this.infoModel.x;
        this.y = this.infoModel.y;
        this.setConfig(this.infoModel.avatarString);
        this.dir = this.infoModel.dir;
        this.playAction(config.action || EntityAction.STAND);
        this.addMc(CharMcOrder.BODY, this.infoModel.avatarFileName);
        if (this.infoModel.weaponFileName) {
            this.addMc(CharMcOrder.WEAPON, this.infoModel.weaponFileName);
        }
    };
    return CharNpc;
}(CharEffect));
__reflect(CharNpc.prototype, "CharNpc");
//# sourceMappingURL=CharNpc.js.map