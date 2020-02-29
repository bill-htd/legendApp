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
var ZhanLingSuitTip = (function (_super) {
    __extends(ZhanLingSuitTip, _super);
    function ZhanLingSuitTip() {
        var _this = _super.call(this) || this;
        _this.skinName = 'ZhanlingSuitTipsSkin';
        return _this;
    }
    ZhanLingSuitTip.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    ZhanLingSuitTip.prototype.otherClose = function (e) {
        ViewManager.ins().close(this);
    };
    ZhanLingSuitTip.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this, this.otherClose);
        this.addTouchEvent(this.bgClose, this.otherClose);
        this.id = param[0];
        var lv = ZhanLingModel.ins().getZhanLingDataBySuit(this.id);
        var maxLv = CommonUtils.getObjectLength(GlobalConfig.ZhanLingSuit);
        var maxCount = GlobalConfig.ZhanLingConfig.equipPosCount;
        var curCount = 0;
        if (!lv) {
            this.currentState = "unactive";
            lv = 1;
        }
        else {
            curCount = ZhanLingModel.ins().getZhanLingDataBySuitCount(this.id, lv);
            if (lv >= maxLv && curCount >= maxCount) {
                this.currentState = "max";
            }
            else {
                this.currentState = "active";
            }
        }
        this.validateNow();
        var config = GlobalConfig.ZhanLingSuit[lv];
        var content = StringUtils.replace(config.suitCondition, "" + curCount, "" + maxCount);
        if (this.currentState == "unactive") {
            this.content0.textFlow = TextFlowMaker.generateTextFlow1(content);
        }
        var attStr = AttributeData.getAttStr(config.attrs, 0, 1, "+");
        attStr += "\n" + "战灵基础属性+" + config.precent / 100 + "%";
        this.attr0.text = attStr;
        this.name0.text = config.suitTname;
        if (this.currentState == "active") {
            var nextconfig = GlobalConfig.ZhanLingSuit[lv + 1];
            curCount = ZhanLingModel.ins().getZhanLingDataBySuitCount(this.id, lv + 1);
            content = StringUtils.replace(nextconfig.suitCondition, "" + curCount, "" + maxCount);
            this.content1.textFlow = TextFlowMaker.generateTextFlow1(content);
            var nattStr = AttributeData.getAttStr(nextconfig.attrs, 0, 1, "+");
            nattStr += "\n" + "战灵基础属性+" + nextconfig.precent / 100 + "%";
            this.attr1.text = nattStr;
            this.name1.text = nextconfig.suitTname;
        }
    };
    return ZhanLingSuitTip;
}(BaseEuiView));
__reflect(ZhanLingSuitTip.prototype, "ZhanLingSuitTip");
ViewManager.ins().reg(ZhanLingSuitTip, LayerManager.UI_Popup);
//# sourceMappingURL=ZhanLingSuitTip.js.map