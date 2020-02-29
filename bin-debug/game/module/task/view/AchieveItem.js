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
var AchieveItem = (function (_super) {
    __extends(AchieveItem, _super);
    function AchieveItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "TaskItemSkin";
        return _this;
    }
    AchieveItem.prototype.dataChanged = function () {
        var data = this.data;
        if (data) {
            var config = UserTask.ins().getAchieveConfById(data.id);
            this.taskImg.source = "";
            this.taskName.textFlow = TextFlowMaker.generateTextFlow(config.name + "|C:0x35e62d&T:(" + data.value + "/" + config.target + ")|");
            this.taskInfo.text = config.desc;
            var i = void 0;
            var num = 1;
            for (i in config.awardList) {
                this["awards" + num++].setData(config.awardList[i]);
            }
            switch (data.state) {
                case 0:
                    this.gotoBtn.visible = true;
                    this.awardsBtn.visible = false;
                    this.completeImg.visible = this.completeLabel.visible = false;
                    break;
                case 1:
                    this.gotoBtn.visible = false;
                    this.awardsBtn.visible = true;
                    this.completeImg.visible = this.completeLabel.visible = false;
                    break;
                case 2:
                    this.gotoBtn.visible = false;
                    this.awardsBtn.visible = false;
                    this.completeImg.visible = this.completeLabel.visible = true;
                    break;
            }
            if (config.control == 0)
                this.gotoBtn.visible = false;
        }
    };
    return AchieveItem;
}(BaseItemRender));
__reflect(AchieveItem.prototype, "AchieveItem");
//# sourceMappingURL=AchieveItem.js.map