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
var SDRewardWin = (function (_super) {
    __extends(SDRewardWin, _super);
    function SDRewardWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "SDRewardSkin";
        _this.isTopLevel = true;
        return _this;
    }
    SDRewardWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = SDShowItemRender;
    };
    SDRewardWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var len = Object.keys(GlobalConfig.ActivityType11_1Config[args[0]]).length;
        var dataArr = [];
        var conf;
        for (var key in GlobalConfig.ActivityType11_1Config[args[0]]) {
            conf = GlobalConfig.ActivityType11_1Config[args[0]][key];
            dataArr.push({ reward: conf.reward, showText: conf.showText });
        }
        this.list.dataProvider = new ArrayCollection(dataArr);
    };
    return SDRewardWin;
}(BaseEuiView));
__reflect(SDRewardWin.prototype, "SDRewardWin");
ViewManager.ins().reg(SDRewardWin, LayerManager.UI_Main);
//# sourceMappingURL=SDRewardWin.js.map