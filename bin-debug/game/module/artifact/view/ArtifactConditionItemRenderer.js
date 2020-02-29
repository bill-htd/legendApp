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
var ArtifactConditionItemRenderer = (function (_super) {
    __extends(ArtifactConditionItemRenderer, _super);
    function ArtifactConditionItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "ArtifactsItemSkin";
        _this.go.addEventListener(egret.TextEvent.LINK, _this.onGo, _this);
        return _this;
    }
    ArtifactConditionItemRenderer.prototype.dataChanged = function () {
        var achievementID = this.data["taskId"];
        var data = UserTask.ins().getAchieveByTaskId(achievementID);
        this.config = UserTask.ins().getAchieveConfById(data.id);
        var color;
        if (data.value >= this.config.target) {
            color = '0x35e62d';
            this.go.visible = false;
            this.complete.visible = true;
        }
        else {
            color = '0xf3311e';
            this.go.textFlow = (new egret.HtmlTextParser).parser("<a href='event:' color=0x35e62d><u>\u524D\u5F80</u></a>");
            this.go.visible = true;
            this.complete.visible = false;
            if (this.config.controlTarget == undefined) {
                this.go.visible = false;
            }
        }
        var str = this.config.name + "(<font color=" + color + ">" + data.value + "</font>/" + this.config.target + ")";
        this.desc.textFlow = (new egret.HtmlTextParser).parser(str);
    };
    ArtifactConditionItemRenderer.prototype.destruct = function () {
        this.go.removeEventListener(egret.TextEvent.LINK, this.onGo, this);
    };
    ArtifactConditionItemRenderer.prototype.onGo = function () {
        var i;
        if (this.config.controlTarget == undefined) {
            new Error("配置表没有配跳转界面ID");
        }
        else {
            ViewManager.ins().close(this.config.controlTarget[0].toString());
            ViewManager.ins().open(this.config.controlTarget[0].toString(), [this.config.controlTarget[1]]);
        }
    };
    return ArtifactConditionItemRenderer;
}(BaseItemRender));
__reflect(ArtifactConditionItemRenderer.prototype, "ArtifactConditionItemRenderer");
//# sourceMappingURL=ArtifactConditionItemRenderer.js.map