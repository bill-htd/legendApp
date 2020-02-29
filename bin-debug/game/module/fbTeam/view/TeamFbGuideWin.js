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
var TeamFbGuideWin = (function (_super) {
    __extends(TeamFbGuideWin, _super);
    function TeamFbGuideWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "teamFbGuideSkin";
        return _this;
    }
    TeamFbGuideWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = TeamFbGuideItemrender;
    };
    TeamFbGuideWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._roomId = args[0];
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.update();
    };
    TeamFbGuideWin.prototype.close = function () {
        this.removeTouchEvent(this.bgClose, this.onTouch);
    };
    TeamFbGuideWin.prototype.update = function () {
        this.fbName.text = GlobalConfig.TeamFuBenConfig[this._roomId].name;
        if (!this._collect) {
            this._collect = new ArrayCollection();
            this.list.dataProvider = this._collect;
        }
        var len = Object.keys(GlobalConfig.TeamFuBenGuideConfig[this._roomId]).length;
        var datas = [];
        for (var i = 1; i <= len; i++)
            datas.push(GlobalConfig.TeamFuBenGuideConfig[this._roomId][i]);
        this._collect.source = datas;
    };
    TeamFbGuideWin.prototype.onTouch = function (e) {
        ViewManager.ins().close(this);
    };
    return TeamFbGuideWin;
}(BaseEuiView));
__reflect(TeamFbGuideWin.prototype, "TeamFbGuideWin");
ViewManager.ins().reg(TeamFbGuideWin, LayerManager.UI_Main);
//# sourceMappingURL=TeamFbGuideWin.js.map