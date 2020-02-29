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
var MineRecordRender = (function (_super) {
    __extends(MineRecordRender, _super);
    function MineRecordRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "PlunderRecordItemSkin";
        _this.revenge.textFlow = [{ text: "\u6211\u8981\u590D\u4EC7", style: { underline: true } }];
        return _this;
    }
    MineRecordRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        var config = GlobalConfig.KuangYuanConfig[data.configID];
        var color = config.color;
        this.time.text = DateUtils.getFormatBySecond((data.time / 1000) >> 0, DateUtils.TIME_FORMAT_2);
        this.revenge.visible = false;
        this.revenge.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        if (data.type == MineRecord.TYPE_BEROB) {
            if (data.fighterIsWin) {
                this.des.textFlow = TextFlowMaker.generateTextFlow1("|C:0x18a5eb&T:" + data.fighterName + "|\u63A0\u593A\u4E86\u6211\u7684|C:" + color + "&T:" + config.name + "|");
                this.revenge.visible = true;
                if (data.isBeatHim) {
                    this.revenge.textFlow = [{ text: "\u5DF2\u590D\u4EC7" }];
                    this.revenge.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                }
                else {
                    this.revenge.textFlow = [{ text: "\u6211\u8981\u590D\u4EC7", style: { underline: true } }];
                    this.revenge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                }
            }
            else {
                this.des.textFlow = TextFlowMaker.generateTextFlow1("|C:0x18a5eb&T:" + data.fighterName + "|\u63A0\u593A\u6211\u7684|C:" + color + "&T:" + config.name + "|\u5931\u8D25");
            }
        }
        else {
            if (data.robIsWin) {
                this.des.textFlow = TextFlowMaker.generateTextFlow1("\u6211\u6210\u529F\u63A0\u593A\u4E86|C:0x18a5eb&T:" + data.robMasterName + "|\u7684|C:" + color + "&T:" + config.name + "|");
            }
            else {
                this.des.textFlow = TextFlowMaker.generateTextFlow1("\u6211\u63A0\u593A|C:0x18a5eb&T:" + data.robMasterName + "|\u7684|C:" + color + "&T:" + config.name + "|\u5931\u8D25");
            }
        }
    };
    MineRecordRender.prototype.onTap = function () {
        ViewManager.ins().open(MineRobWin, this.data);
    };
    return MineRecordRender;
}(BaseItemRender));
__reflect(MineRecordRender.prototype, "MineRecordRender");
//# sourceMappingURL=MineRecordRender.js.map