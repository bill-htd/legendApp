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
var ZhuZaiFenjiePanel = (function (_super) {
    __extends(ZhuZaiFenjiePanel, _super);
    function ZhuZaiFenjiePanel() {
        return _super.call(this) || this;
    }
    ZhuZaiFenjiePanel.prototype.childrenCreated = function () {
    };
    ZhuZaiFenjiePanel.prototype.initUI = function () {
        this.list.dataProvider = new eui.ArrayCollection([]);
        this.useTxt0.text = "";
        this.countTxt.text = "";
        this.inited = true;
    };
    ZhuZaiFenjiePanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (!this.inited)
            this.initUI();
        this.startSetBagData();
        this.addTouchEvent(this.btn, this.onTap);
        this.observe(UserBag.ins().postItemDel, this.startSetBagData);
    };
    ZhuZaiFenjiePanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.btn, this.onTap);
        this.removeObserve();
    };
    ZhuZaiFenjiePanel.prototype.startSetBagData = function () {
        TimerManager.ins().doTimer(100, 1, this.setBagData, this);
    };
    ZhuZaiFenjiePanel.prototype.setBagData = function () {
        var result = [];
        var config = GlobalConfig.EquipPointResolveConfig;
        var item;
        var sum = 0;
        var i;
        for (i in config) {
            item = UserBag.ins().getBagItemById(config[i].itemId);
            if (item) {
                result.push(item);
                sum += item.count * config[i].materials[0].count;
            }
        }
        this.countTxt.text = "可得" + GlobalConfig.ItemConfig[config[i].materials[0].id].name + "：";
        this.useTxt0.text = sum + "";
        this.list.dataProvider = new eui.ArrayCollection(result);
    };
    ZhuZaiFenjiePanel.prototype.onTap = function () {
        ZhuzaiEquip.ins().sendFenjie();
    };
    return ZhuZaiFenjiePanel;
}(BaseComponent));
__reflect(ZhuZaiFenjiePanel.prototype, "ZhuZaiFenjiePanel");
//# sourceMappingURL=ZhuZaiFenjiePanel.js.map