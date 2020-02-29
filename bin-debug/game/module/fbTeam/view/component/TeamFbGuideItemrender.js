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
var TeamFbGuideItemrender = (function (_super) {
    __extends(TeamFbGuideItemrender, _super);
    function TeamFbGuideItemrender() {
        return _super.call(this) || this;
    }
    TeamFbGuideItemrender.prototype.dataChanged = function () {
        var cfg = this.data;
        this.monHeadImg.source = cfg.monHead;
        this.nameTxt.text = cfg.monName;
        this.dangerLvTxt.textFlow = TextFlowMaker.generateTextFlow(cfg.dangerLv);
        this.guideTxt.textFlow = TextFlowMaker.generateTextFlow(cfg.guideText);
    };
    return TeamFbGuideItemrender;
}(BaseItemRender));
__reflect(TeamFbGuideItemrender.prototype, "TeamFbGuideItemrender");
//# sourceMappingURL=TeamFbGuideItemrender.js.map