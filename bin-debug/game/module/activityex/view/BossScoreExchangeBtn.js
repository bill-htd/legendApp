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
var BossScoreExchangeBtn = (function (_super) {
    __extends(BossScoreExchangeBtn, _super);
    function BossScoreExchangeBtn() {
        var _this = _super.call(this) || this;
        _this.skinName = 'hefuBossBtnSkin';
        return _this;
    }
    BossScoreExchangeBtn.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    BossScoreExchangeBtn.prototype.dataChanged = function () {
        var id = this.data.id;
        var index = this.data.index;
        var config = GlobalConfig.ActivityType7Config[id][index];
        this.btnText.text = config.title + "转";
        this.redPoint.visible = Activity.ins().IsBossScoreTitle(config.Id, config.title);
    };
    BossScoreExchangeBtn.prototype.destruct = function () {
    };
    return BossScoreExchangeBtn;
}(eui.ItemRenderer));
__reflect(BossScoreExchangeBtn.prototype, "BossScoreExchangeBtn");
//# sourceMappingURL=BossScoreExchangeBtn.js.map