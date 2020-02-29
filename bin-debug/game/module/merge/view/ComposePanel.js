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
var ComposePanel = (function (_super) {
    __extends(ComposePanel, _super);
    function ComposePanel() {
        var _this = _super.call(this) || this;
        _this._id = -1;
        _this._index = -1;
        return _this;
    }
    ComposePanel.prototype.childrenCreated = function () {
        this.initUI();
    };
    ComposePanel.prototype.initUI = function () {
        this.list.itemRenderer = ComposeMenuItem;
        this.list0.itemRenderer = SamsaraComposeItem;
        this._listData = new eui.ArrayCollection();
        this.list0.dataProvider = this._listData;
        this._tabListData = new eui.ArrayCollection();
        this.list.dataProvider = this._tabListData;
    };
    ComposePanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(UserBag.ins().postItemAdd, this.buffUpdata);
        this.observe(UserBag.ins().postItemDel, this.buffUpdata);
        this.observe(UserBag.ins().postItemChange, this.buffUpdata);
        this.initView();
        this.updateState();
        if (param[0] != undefined && param[1] != undefined && param[2] != undefined)
            this.selectList(param[0], param[1], param[2]);
    };
    ComposePanel.prototype.initView = function () {
        this._tabListData.source = MergeCC.ins().getMergeMenu();
    };
    Object.defineProperty(ComposePanel.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComposePanel.prototype, "index", {
        get: function () { return this._index; },
        enumerable: true,
        configurable: true
    });
    ComposePanel.prototype.buffUpdata = function () {
        TimerManager.ins().remove(this.updateState, this);
        TimerManager.ins().doTimer(100, 1, this.updateState, this);
    };
    ComposePanel.prototype.updateState = function () {
        if (this._tabListData.length == 0)
            return;
        this._tabListData.refresh();
        var id = this._id;
        var index = this._index;
        var targetId = 0;
        if (this._id == -1 || this._index == -1) {
            for (var i = 0; i < this._tabListData.length; i++) {
                id = this._tabListData.getItemAt(i).id;
                var arr = MergeCC.ins().getMergeSecMenu(id);
                for (var j = 0; j < arr.length; j++) {
                    targetId = MergeCC.ins().getCanMergeTargetId(arr[j].id, arr[j].index);
                    if (targetId) {
                        index = arr[j].index;
                        break;
                    }
                }
                if (targetId)
                    break;
            }
            if (!targetId) {
                id = this._tabListData.getItemAt(0).id;
                var arr = MergeCC.ins().getMergeSecMenu(id);
                index = arr[0].index;
            }
        }
        else {
            targetId = MergeCC.ins().getCanMergeTargetId(id, index);
        }
        this.updateView(id, index, targetId);
    };
    ComposePanel.prototype.updateView = function (id, index, targetId) {
        if (targetId === void 0) { targetId = 0; }
        this._id = id;
        this._index = index;
        var data = MergeCC.ins().getListData(id, index);
        this._listData.source = data;
        this.refushBarList(targetId);
    };
    ComposePanel.prototype.refushBarList = function (targetId) {
        if (!targetId) {
            this.contentScroller.viewport.scrollV = 0;
            return;
        }
        var data = this.list0.dataProvider;
        for (var i = 0; i < data.length; i++) {
            if (targetId == data.getItemAt(i).id) {
                this.contentScroller.viewport.validateNow();
                var sh = i * 101;
                if (sh > this.contentScroller.viewport.contentHeight - this.contentScroller.viewport.height) {
                    sh = this.contentScroller.viewport.contentHeight - this.contentScroller.height;
                }
                if (sh < 0)
                    sh = 0;
                this.contentScroller.viewport.scrollV = sh;
                break;
            }
        }
    };
    ComposePanel.prototype.unSelectList = function () {
        var count = this.list.dataProvider.length;
        for (var i = 0; i < count; i++) {
            var item = this.list.getVirtualElementAt(i);
            var tempList = item.list;
            for (var j = 0; j < tempList.dataProvider.length; j++) {
                var tempItem = tempList.getVirtualElementAt(j);
                if (tempItem)
                    tempItem.setSelect(false);
            }
        }
    };
    ComposePanel.prototype.selectList = function (type, secondIndex, index) {
        var tabIndex = 0;
        var id;
        for (var i = 0; i < this._tabListData.length; i++) {
            var typeTem = this._tabListData.getItemAt(i).type;
            if (type == typeTem) {
                tabIndex = i;
                id = this._tabListData.getItemAt(i).id;
                break;
            }
        }
        var item = this.list.getVirtualElementAt(tabIndex);
        var tempList = item.list;
        var tempItem = tempList.getVirtualElementAt(secondIndex - 1);
        if (tempItem)
            tempItem.setSelect(true);
        this.updateView(id, secondIndex, tempItem.data.id);
    };
    ComposePanel.prototype.close = function () {
        this.removeObserve();
        this._id = -1;
        this._index = -1;
    };
    return ComposePanel;
}(BaseComponent));
__reflect(ComposePanel.prototype, "ComposePanel");
//# sourceMappingURL=ComposePanel.js.map