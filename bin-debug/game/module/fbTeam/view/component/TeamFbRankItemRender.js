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
var TeamFbRankItemRender = (function (_super) {
    __extends(TeamFbRankItemRender, _super);
    function TeamFbRankItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "teamFbRankItem";
        return _this;
    }
    TeamFbRankItemRender.prototype.dataChanged = function () {
        if (this.data) {
            this.member.visible = true;
            this.noteam.visible = false;
            this.fubenName.text = GlobalConfig.TeamFuBenConfig[this.data.configID].name;
            var img = void 0;
            var lbl = void 0;
            var len = this.data.members.length;
            for (var i = 0; i < 3; i++) {
                img = this["img" + i];
                lbl = this["nameTxt" + i];
                if (i + 1 <= len) {
                    img.source = this.data.members[i].position == 1 ? "tfb_leader" : (this.data.members[0].position == 2 ? "tfb_assistant" : "");
                    lbl.text = this.data.members[i].roleName;
                }
                else {
                    img.source = "";
                    lbl.text = "";
                }
            }
        }
        else {
            this.member.visible = false;
            this.noteam.visible = true;
        }
    };
    return TeamFbRankItemRender;
}(BaseItemRender));
__reflect(TeamFbRankItemRender.prototype, "TeamFbRankItemRender");
//# sourceMappingURL=TeamFbRankItemRender.js.map