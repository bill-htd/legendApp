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
var NoticeListRenderer = (function (_super) {
    __extends(NoticeListRenderer, _super);
    function NoticeListRenderer() {
        var _this = _super.call(this) || this;
        _this.job = ["", "战士", "法师", "道士"];
        _this.skinName = "HuntListRendererSkin";
        return _this;
    }
    NoticeListRenderer.prototype.dataChanged = function () {
        var str = "";
        this.activityID = this.data.activityID;
        this.activityType = this.data.activityType;
        this.actType = this.data.actType;
        switch (this.activityType) {
            case ActivityDataFactory.ACTIVITY_TYPE_17:
                var actDatas = GlobalConfig.ActivityType17_3Config[this.activityID];
                var awards = actDatas[CommonUtils.getObjectLength(actDatas)].group;
                var item = GlobalConfig.ItemConfig[awards[this.data.index - 1].id];
                var cstr = ItemConfig.getQualityColor(item);
                var nstr = item.name;
                str = "\u606D\u559C|C:0x16b2ff&T:" + this.data.name + "|\u5728\u5E78\u8FD0\u661F\u8F6C\u76D8\u4E2D\u62BD\u5230\u4E86|C:" + cstr + "&T:" + nstr + " X" + awards[this.data.index - 1].count + "|";
                break;
            default:
                var name_1 = this.data.name;
                var index = this.data.index;
                var config = void 0;
                if (this.actType == ActivityType.Normal) {
                    config = GlobalConfig.ActivityType9Config[this.activityID][index];
                }
                else if (this.actType == ActivityType.Personal) {
                    config = GlobalConfig.PActivityType9Config[this.activityID][index];
                }
                if (config) {
                    var nstr_1 = "";
                    var cstr_1 = ColorUtil.NORMAL_COLOR;
                    if (!config.reward[0].type) {
                        var type = 1;
                        switch (config.reward[0].id) {
                            case MoneyConst.yuanbao:
                                type = 5;
                                break;
                            case MoneyConst.gold:
                                type = 0;
                                break;
                            case MoneyConst.soul:
                                type = 2;
                                break;
                            case MoneyConst.piece:
                                type = 2;
                                break;
                            case MoneyConst.godweaponExp:
                                type = 2;
                                break;
                            default:
                                break;
                        }
                        nstr_1 = RewardData.getCurrencyName(config.reward[0].id);
                        cstr_1 = ItemBase.QUALITY_COLOR[type];
                        str = "<font color = '#12b2ff'>" + name_1 + "</font> 获得 <font color='" + cstr_1 + "'>" + nstr_1 + "</font>";
                    }
                    else {
                        var item_1 = GlobalConfig.ItemConfig[config.reward[0].id];
                        nstr_1 = item_1.name;
                        cstr_1 = ItemConfig.getQualityColor(item_1);
                        var itemtype = ItemConfig.getType(item_1);
                        if (itemtype == 0) {
                            if (item_1) {
                                if (item_1.zsLevel > 0) {
                                    nstr_1 += "(" + item_1.zsLevel + "转 ";
                                }
                                else {
                                    nstr_1 += "(" + item_1.level + "级 ";
                                }
                                nstr_1 += this.job[ItemConfig.getJob(item_1)] + ")";
                            }
                        }
                        str = "<font color = '#12b2ff'>" + name_1 + "</font> " + (this.data.des ? this.data.des : "获得") + " <font color='" + cstr_1 + "'>" + nstr_1 + "</font>";
                    }
                }
        }
        this.showText.textFlow = TextFlowMaker.generateTextFlow(str);
    };
    NoticeListRenderer.QUALITY_COLOR = ["#e2dfd4", "#35e62d", "#d242fb", "#ff750f", "#f3311e", "#ffd93f"];
    return NoticeListRenderer;
}(BaseItemRender));
__reflect(NoticeListRenderer.prototype, "NoticeListRenderer");
//# sourceMappingURL=NoticeListRenderer.js.map