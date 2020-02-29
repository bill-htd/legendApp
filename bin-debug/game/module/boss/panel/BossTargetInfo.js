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
var BossTargetInfo = (function (_super) {
    __extends(BossTargetInfo, _super);
    function BossTargetInfo() {
        var _this = _super.call(this) || this;
        _this.skinName = "BossTargetSkin";
        return _this;
    }
    BossTargetInfo.prototype.refushTargetInfo = function (target) {
        this.model = (target.infoModel);
        this.bloodBar.maximum = this.model.getAtt(AttributeType.atMaxHp);
        this.bloodBar.value = target.getHP();
        if (this.model.team == Team.My) {
            this.nameLabel.text = Actor.myName;
        }
        else {
            this.nameLabel.text = this.model.name + "";
        }
        this.head.source = "yuanhead" + this.model.job + this.model.sex;
    };
    return BossTargetInfo;
}(BaseView));
__reflect(BossTargetInfo.prototype, "BossTargetInfo");
//# sourceMappingURL=BossTargetInfo.js.map