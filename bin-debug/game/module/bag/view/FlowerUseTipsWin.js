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
var FlowerUseTipsWin = (function (_super) {
    __extends(FlowerUseTipsWin, _super);
    function FlowerUseTipsWin() {
        var _this = _super.call(this) || this;
        _this._sendCount = 1;
        _this._maxCount = 0;
        _this.skinName = "flowerUseTips";
        return _this;
    }
    FlowerUseTipsWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = FlowerTargetItemrender;
    };
    FlowerUseTipsWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTouch);
        this.addTouchEvent(this.list, this.onTouchList);
        this.observe(Friends.ins().postFriendChange, this.update, this);
        this.observe(UserBag.ins().postItemAdd, this.updateMaterial);
        this.observe(UserBag.ins().postItemChange, this.updateMaterial);
        this.observe(UserBag.ins().postItemDel, this.updateMaterial);
        this._sendCount = 1;
        this._friendID = 0;
        this.update();
        this.selectName.text = "";
    };
    FlowerUseTipsWin.prototype.close = function () {
        this.removeTouchEvent(this, this.onTouch);
        this.removeTouchEvent(this.list, this.onTouchList);
        this.removeObserve();
        this.scroller.visible = false;
    };
    FlowerUseTipsWin.prototype.update = function () {
        if (!this._collect) {
            this._collect = new ArrayCollection();
            this.list.dataProvider = this._collect;
        }
        this._collect.source = Friends.ins().friendsList.source;
        this.updateCount();
        this.updateMaterial();
    };
    FlowerUseTipsWin.prototype.updateMaterial = function () {
        var itemData = UserBag.ins().getBagItemById(GlobalConfig.TeamFuBenBaseConfig.itemId);
        this._maxCount = itemData ? itemData.count : 0;
        this.itemCount.text = "剩余鲜花：" + this._maxCount;
    };
    FlowerUseTipsWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.sendBtn:
                if (!this._friendID) {
                    UserTips.ins().showTips("\u8BF7\u9009\u62E9\u8981\u8D60\u9001\u9C9C\u82B1\u7684\u597D\u53CB");
                    return;
                }
                if (this._maxCount <= 0 || this._maxCount < this._sendCount) {
                    UserTips.ins().showTips("\u80CC\u5305\u5185\u6CA1\u6709\u8DB3\u591F\u7684\u9053\u5177");
                    return;
                }
                UserFb.ins().sendTfFlower(this._friendID, this._sendCount);
                break;
            case this.minBtn:
                if (this._sendCount != 1) {
                    this._sendCount = 1;
                    this.updateCount();
                }
                break;
            case this.maxBtn:
                if (this._sendCount != this._maxCount) {
                    this._sendCount = this._maxCount;
                    this.updateCount();
                }
                break;
            case this.sub1Btn:
                if (this._sendCount > 1) {
                    this._sendCount--;
                    this.updateCount();
                }
                break;
            case this.add1Btn:
                if (this._sendCount < this._maxCount) {
                    this._sendCount++;
                    this.updateCount();
                }
                break;
            case this.openListBtn:
                this.scroller.visible = !this.scroller.visible;
                break;
        }
    };
    FlowerUseTipsWin.prototype.onTouchList = function (e) {
        var selectedItem = this.list.selectedItem;
        if (selectedItem) {
            this._friendID = selectedItem.id;
            this.selectName.text = selectedItem.name;
            this.scroller.visible = !this.scroller.visible;
        }
    };
    FlowerUseTipsWin.prototype.updateCount = function () {
        this.numLabel.text = this._sendCount + "";
        this.charmPoint.text = "魅力值：" + (this._sendCount * GlobalConfig.TeamFuBenBaseConfig.flowerChiv);
    };
    return FlowerUseTipsWin;
}(BaseEuiView));
__reflect(FlowerUseTipsWin.prototype, "FlowerUseTipsWin");
ViewManager.ins().reg(FlowerUseTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=FlowerUseTipsWin.js.map