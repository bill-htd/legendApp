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
var MineChoseWorkerWin = (function (_super) {
    __extends(MineChoseWorkerWin, _super);
    function MineChoseWorkerWin() {
        var _this = _super.call(this) || this;
        _this._cost = 0;
        _this.skinName = "ChoseWorkerSin";
        _this.isTopLevel = true;
        return _this;
    }
    MineChoseWorkerWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.record.itemRenderer = MineChoseWorkerRender;
    };
    MineChoseWorkerWin.prototype.open = function () {
        this.observe(Mine.ins().postRefresh, this.update);
        this.addTouchEvent(this.advance, this.onTap);
        this.addTouchEvent(this.start, this.onTap);
        this.initList();
        this.update();
    };
    MineChoseWorkerWin.prototype.onTap = function (e) {
        var _this = this;
        var target = e.currentTarget;
        if (target == this.advance) {
            if (!this.openCheck()) {
                return;
            }
            if (this.isMaxLevel()) {
                UserTips.ins().showCenterTips("\u5DF2\u6EE1\u7EA7");
                return;
            }
            var refurbish = this.checkBox.selected ? 1 : 2;
            if (this.checkBox.selected) {
                var itemData = UserBag.ins().getBagItemById(GlobalConfig.CaiKuangConfig.needItem.id);
                if (!itemData || itemData.count < GlobalConfig.CaiKuangConfig.needItem.count) {
                    UserTips.ins().showTips("|C:0xff0000&T:\u9053\u5177\u4E0D\u8DB3");
                    return;
                }
            }
            else {
                if (Actor.yb < this._cost) {
                    UserTips.ins().showTips("\u5143\u5B9D\u4E0D\u8DB3");
                    return;
                }
            }
            Mine.ins().sendRefresh(refurbish);
        }
        else if (target == this.start) {
            if (!this.openCheck()) {
                return;
            }
            if (!this.isMaxLevel()) {
                WarnWin.show("\u5F53\u524D\u4E0D\u662F\u6700\u9AD8\u54C1\u8D28\uFF0C\u662F\u5426\u786E\u8BA4\u6316\u77FF\uFF1F", function () {
                    Mine.ins().sendStart();
                    _this.checkBox.selected = false;
                    ViewManager.ins().close(_this);
                }, this);
                return;
            }
            Mine.ins().sendStart();
            ViewManager.ins().close(this);
        }
    };
    MineChoseWorkerWin.prototype.initList = function () {
        var configs = GlobalConfig.KuangYuanConfig;
        var arr = [];
        for (var id in configs) {
            arr.push(configs[id]);
        }
        this.record.dataProvider = new eui.ArrayCollection(arr);
        this._lastMineId = Mine.ins().mineId;
    };
    MineChoseWorkerWin.prototype.update = function () {
        var refreshCost = GlobalConfig.CaiKuangConfig.refreshCost;
        var len = refreshCost.length;
        var freshCount = Mine.ins().mineFreshCount;
        var cost = len <= freshCount ? refreshCost[len - 1] : refreshCost[freshCount];
        this._cost = cost;
        this.yuanbaoNum.text = "" + cost;
        var itemData = UserBag.ins().getBagItemById(GlobalConfig.CaiKuangConfig.needItem.id);
        var color = 0x00ff00;
        if (!itemData || itemData.count < GlobalConfig.CaiKuangConfig.needItem.count) {
            color = 0xff0000;
        }
        var count = itemData ? (itemData.count + "") : "0";
        this.num1.textFlow = TextFlowMaker.generateTextFlow1("|C:" + color + "&T:" + count);
        this.needlabel.text = "/" + GlobalConfig.CaiKuangConfig.needItem.count;
        var addCount = Recharge.ins().franchise ? GlobalConfig.PrivilegeData.addKuangCount : 0;
        var max = GlobalConfig.CaiKuangConfig.maxOpenKuangCount + addCount;
        var cur = Mine.ins().mineCount;
        if (cur >= max) {
            this.countTxt.textFlow = TextFlowMaker.generateTextFlow1("\u4ECA\u65E5\u91C7\u77FF\u6B21\u6570\uFF1A|C:0xff0000&T:" + (max - cur) + "/" + max + "|");
        }
        else {
            this.countTxt.textFlow = TextFlowMaker.generateTextFlow1("\u4ECA\u65E5\u91C7\u77FF\u6B21\u6570\uFF1A|C:0x00ff00&T:" + (max - cur) + "/" + max + "|");
        }
        if (Mine.ins().mineId) {
            var config = GlobalConfig.KuangYuanConfig[Mine.ins().mineId];
            this.expBar0.maximum = config.maxTimes;
            this.expBar0.value = Math.ceil(config.maxTimes / config.baseTime * Mine.ins().mineQuaCount);
        }
        else {
            this.expBar0.maximum = 10;
            this.expBar0.value = 0;
        }
        if (this.isMaxLevel()) {
            this.expBar0.maximum = 10;
            this.expBar0.value = 0;
        }
        if (this._lastMineId != Mine.ins().mineId) {
            this.record.dataProvider.refresh();
            this._lastMineId = Mine.ins().mineId;
        }
    };
    MineChoseWorkerWin.prototype.isMaxLevel = function () {
        var next = Mine.ins().mineId + 1;
        if (!GlobalConfig.KuangYuanConfig[next]) {
            return true;
        }
        return false;
    };
    MineChoseWorkerWin.prototype.openCheck = function () {
        var addCount = Recharge.ins().franchise ? GlobalConfig.PrivilegeData.addKuangCount : 0;
        if (Mine.ins().mineCount >= GlobalConfig.CaiKuangConfig.maxOpenKuangCount + addCount) {
            UserTips.ins().showCenterTips("|C:0xff0000&T:\u4ECA\u65E5\u6316\u6398\u6B21\u6570\u5DF2\u6EE1|");
            return false;
        }
        if (Mine.ins().mineStartTime) {
            UserTips.ins().showCenterTips("|C:0xff0000&T:\u6B63\u5728\u6316\u6398\u4E2D\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5019|");
            return false;
        }
        return true;
    };
    MineChoseWorkerWin.prototype.close = function () {
    };
    MineChoseWorkerWin.openCheck = function () {
        if (!Mine.ins().mineId) {
            Mine.ins().sendRefresh();
        }
        if (MineData.ins().mines.length >= GlobalConfig.CaiKuangConfig.maxKuangCount) {
            UserTips.ins().showCenterTips("|C:0xff0000&T:\u5F53\u524D\u77FF\u6D1E\u5DF2\u6EE1\uFF0C\u8BF7\u524D\u5F80\u522B\u7684\u77FF\u6D1E|");
            return false;
        }
        return true;
    };
    return MineChoseWorkerWin;
}(BaseEuiView));
__reflect(MineChoseWorkerWin.prototype, "MineChoseWorkerWin");
ViewManager.ins().reg(MineChoseWorkerWin, LayerManager.UI_Main);
//# sourceMappingURL=MineChoseWorkerWin.js.map