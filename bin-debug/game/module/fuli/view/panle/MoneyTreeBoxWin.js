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
var MoneyTreeBoxWin = (function (_super) {
    __extends(MoneyTreeBoxWin, _super);
    function MoneyTreeBoxWin() {
        var _this = _super.call(this) || this;
        _this.dataList = [];
        return _this;
    }
    MoneyTreeBoxWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "MoneyTreeBoxSkin";
        this.list.itemRenderer = ItemBase;
    };
    MoneyTreeBoxWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.sure, this.onTap);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn1, this.onTap);
        this.index = param[0];
        var data = UserFuLi.ins().getBoxInfoByIndex(this.index);
        this.desc.text = "今日使用摇钱树" + data.time + "次，可额外获得：";
        this.creatRewardList(data.box);
        this.list.dataProvider = new eui.ArrayCollection(this.dataList);
        this.sure.enabled = UserFuLi.ins().playNum >= data.time;
    };
    MoneyTreeBoxWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.sure, this.onTap);
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn1, this.onTap);
    };
    MoneyTreeBoxWin.prototype.creatRewardList = function (count) {
        var item;
        for (var i = 0; i < 3; i++) {
            if (!this.dataList[i]) {
                item = new RewardData();
                item.type = 0;
                item.id = 1;
                this.dataList.push(item);
            }
            else {
                item = this.dataList[i];
            }
            item.count = count[i];
        }
    };
    MoneyTreeBoxWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn1:
                ViewManager.ins().close(this);
                break;
            case this.sure:
                UserFuLi.ins().sendGetCaseReward(this.index);
                ViewManager.ins().close(this);
                break;
        }
    };
    return MoneyTreeBoxWin;
}(BaseEuiView));
__reflect(MoneyTreeBoxWin.prototype, "MoneyTreeBoxWin");
ViewManager.ins().reg(MoneyTreeBoxWin, LayerManager.UI_Main);
//# sourceMappingURL=MoneyTreeBoxWin.js.map