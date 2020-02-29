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
var RankItemRenderer = (function (_super) {
    __extends(RankItemRenderer, _super);
    function RankItemRenderer() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.touchChildren = false;
        return _this;
    }
    RankItemRenderer.prototype.dataChanged = function () {
        if (this.data != null) {
            for (var key in this.data) {
                var component = this[key];
                if (component)
                    this.updateValue(component, key, this.data[key]);
            }
            if (this.data[RankDataType.DATA_POS] == 2) {
                this.t3.source = "rankcolor_1";
                this.t1.source = "paihang2";
                this.pos.visible = false;
                this.t1.visible = true;
            }
            else if (this.data[RankDataType.DATA_POS] == 3) {
                this.t3.source = "rankcolor_2";
                this.t1.source = "paihang3";
                this.pos.visible = false;
                this.t1.visible = true;
            }
            else if (this.data[RankDataType.DATA_POS] == 4) {
                this.t3.source = "rankcolor_3";
                this.t1.source = "";
                this.pos.visible = true;
                this.t1.visible = false;
            }
            else {
                this.t3.source = 'bantoutiaobg';
                this.pos.visible = true;
                this.t1.visible = false;
            }
            if (this.t10)
                this.t10.visible = (this.data.pos <= 10);
            this.vip.visible = (this.data.vip > 0);
        }
        this.visible = this.data != null;
    };
    RankItemRenderer.prototype.updateValue = function (component, key, value) {
        switch (key) {
            case RankDataType.DATA_VIP:
                return;
            case RankDataType.DATA_MONTH:
                component.visible = value == 1;
                return;
            case RankDataType.DATA_LEVEL:
                value = value + "\u7EA7";
                break;
            case RankDataType.DATA_COUNT:
                if (Rank.ins().curType == RankDataType.TYPE_XUNZHANG) {
                    var cfg = GlobalConfig.KnighthoodConfig[value];
                    value = cfg.type;
                }
                else if (Rank.ins().curType == RankDataType.TYPE_LILIAN) {
                    var cfg = GlobalConfig.TrainLevelConfig[value];
                    value = cfg.trainlevel + "\u7B49" + cfg.trainName;
                }
                else if (Rank.ins().curType == RankDataType.TYPE_XIAYI) {
                    value = "魅力值:" + value;
                }
                break;
            case RankDataType.DATA_WEIWANG:
                value = WeiWangCC.ins().getWeiWangCfg(value).res;
                break;
        }
        if (component instanceof eui.Label) {
            if (typeof value == 'number')
                value = CommonUtils.overLength(value);
            component.text = key in RankItemRenderer.dataFormat ? RankItemRenderer.dataFormat[key].replace('{value}', value) : value;
        }
        else if (component instanceof eui.Image) {
            component.source = key in RankItemRenderer.dataFormat ? RankItemRenderer.dataFormat[key].replace('{value}', value) : value;
        }
    };
    return RankItemRenderer;
}(BaseItemRender));
__reflect(RankItemRenderer.prototype, "RankItemRenderer");
//# sourceMappingURL=RankItemRenderer.js.map