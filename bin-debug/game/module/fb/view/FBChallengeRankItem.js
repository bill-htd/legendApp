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
var FBChallengeRankItem = (function (_super) {
    __extends(FBChallengeRankItem, _super);
    function FBChallengeRankItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChuangtianguanRankItem";
        return _this;
    }
    FBChallengeRankItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    FBChallengeRankItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        if (this.data.pos > 3) {
            this.rankImg.visible = false;
            this.rank.visible = !this.rankImg.visible;
            this.rank.text = this.data.pos + "";
        }
        else {
            this.rankImg.visible = true;
            this.rank.visible = !this.rankImg.visible;
            this.rankImg.source = "paihang" + this.data.pos;
        }
        this.vip.visible = this.data.vip;
        this.nameLabel.text = this.data.player;
        if (!this.data.count) {
            return;
        }
        var info = GlobalConfig.FbChallengeConfig[this.data.count];
        var nameCfg = GlobalConfig.FbChNameConfig[info.group];
        this.cengNum.text = "" + nameCfg.name + info.layer + "\u5C42";
    };
    FBChallengeRankItem.prototype.destruct = function () {
    };
    return FBChallengeRankItem;
}(BaseItemRender));
__reflect(FBChallengeRankItem.prototype, "FBChallengeRankItem");
//# sourceMappingURL=FBChallengeRankItem.js.map