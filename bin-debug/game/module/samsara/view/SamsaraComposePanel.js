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
var SamsaraComposePanel = (function (_super) {
    __extends(SamsaraComposePanel, _super);
    function SamsaraComposePanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SamsaraComposePanel.prototype.childrenCreated = function () {
        this.initUI();
    };
    SamsaraComposePanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.list.itemRenderer = SamsaraComposeMenuItem;
        this.list0.itemRenderer = SamsaraComposeItem;
        this._listData = new eui.ArrayCollection();
        this.list0.dataProvider = this._listData;
        this._tabListData = new eui.ArrayCollection();
        this.list.dataProvider = this._tabListData;
    };
    SamsaraComposePanel.prototype.open = function () {
        this.updateState();
        this.observe(UserBag.ins().postItemAdd, this.buffUpdata);
        this.observe(UserBag.ins().postItemDel, this.buffUpdata);
        this.observe(UserBag.ins().postItemCountChange, this.buffUpdata);
        this.observe(SamsaraCC.ins().postCompose, this.buffUpdata);
    };
    SamsaraComposePanel.prototype.buffUpdata = function () {
        TimerManager.ins().remove(this.updateState, this);
        TimerManager.ins().doTimer(100, 1, this.updateState, this);
    };
    SamsaraComposePanel.prototype.updateState = function () {
        var data = SamsaraModel.ins().getComposeEquipList();
        var type;
        var zsLv;
        if (data && data.length > 0) {
            this.materialId = data[0];
            var targetId = SamsaraModel.ins().getComposeTarget(this.materialId);
            var itemCfg = GlobalConfig.ItemConfig[targetId];
            var cfg = GlobalConfig.ReincarnateEquipCompose[targetId];
            type = cfg.distinguishi;
            zsLv = itemCfg.zsLevel;
        }
        else {
            this.materialId = 0;
            type = 1;
            zsLv = GlobalConfig.ReincarnationBase.equipsList[0][0];
        }
        this.zsLv = zsLv;
        this.type = type;
        this._tabListData.source = SamsaraModel.ins().getComposeMenu();
        this.updateView(type, zsLv, this.materialId);
    };
    SamsaraComposePanel.prototype.selectList = function (composeItem, zsLv) {
        var list = composeItem.list;
        var count = list.dataProvider.length;
        for (var i = 0; i < count; i++) {
            var item = list.getElementAt(i);
            if (item) {
                if (zsLv == item.data["zsLv"]) {
                    composeItem.selectList(i);
                    return;
                }
            }
        }
    };
    SamsaraComposePanel.prototype.unSelectList = function () {
        var count = this.list.dataProvider.length;
        for (var i = 0; i < count; i++) {
            var item = this.list.getElementAt(i);
            var tempList = item.list;
            for (var j = 0; j < tempList.dataProvider.length; j++) {
                var tempItem = tempList.getElementAt(j);
                if (tempItem)
                    tempItem.setSelect(false);
            }
        }
    };
    SamsaraComposePanel.prototype.updateView = function (type, zsLv, materialId) {
        if (materialId === void 0) { materialId = 0; }
        var data = SamsaraModel.ins().composeEquipMap[type][zsLv];
        this._listData.source = data;
        this.refushBarList(materialId);
    };
    SamsaraComposePanel.prototype.refushBarList = function (materialId) {
        if (!materialId) {
            this.contentScroller.viewport.scrollV = 0;
            return;
        }
        var targetId = SamsaraModel.ins().getComposeTarget(this.materialId);
        var data = this.list0.dataProvider;
        for (var i = 0; i < data.length; i++) {
            if (targetId == data.getItemAt(i)) {
                this.contentScroller.viewport.validateNow();
                this.contentScroller.viewport.scrollV = i * 101;
                if (this.contentScroller.viewport.contentHeight - this.contentScroller.viewport.scrollV < this.contentScroller.viewport.height) {
                    this.contentScroller.viewport.scrollV = this.contentScroller.viewport.contentHeight - this.contentScroller.height;
                }
                break;
            }
        }
    };
    SamsaraComposePanel.prototype.close = function () {
        this.removeObserve();
    };
    return SamsaraComposePanel;
}(BaseEuiView));
__reflect(SamsaraComposePanel.prototype, "SamsaraComposePanel");
//# sourceMappingURL=SamsaraComposePanel.js.map