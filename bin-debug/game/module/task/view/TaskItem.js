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
var TaskItem = (function (_super) {
    __extends(TaskItem, _super);
    function TaskItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "TaskItemSkin";
        return _this;
    }
    TaskItem.prototype.dataChanged = function () {
        var data = this.data;
        if (data) {
            var config = GlobalConfig.DailyConfig[data.id];
            this.taskImg.source = "";
            this.taskName.textFlow = TextFlowMaker.generateTextFlow(config.name + "|C:0x35e62d&(" + config.activeValue + "活跃度)");
            this.taskInfo.textFlow = TextFlowMaker.generateTextFlow(config.desc + "|C:0x35e62d&(" + data.value + "/" + config.target + ")");
            var i = void 0;
            var num = 1;
            for (i in config.awardList) {
                this["awards" + num++].setData(config.awardList[i]);
            }
            if (num > 2)
                this.awards2.visible = true;
            else
                this.awards2.visible = false;
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
    return TaskItem;
}(BaseItemRender));
__reflect(TaskItem.prototype, "TaskItem");
//# sourceMappingURL=TaskItem.js.map