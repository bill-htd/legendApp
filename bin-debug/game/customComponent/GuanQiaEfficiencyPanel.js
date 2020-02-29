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
var GuanQiaEfficiencyPanel = (function (_super) {
    __extends(GuanQiaEfficiencyPanel, _super);
    function GuanQiaEfficiencyPanel() {
        var _this = _super.call(this) || this;
        _this.name = "世界";
        return _this;
    }
    GuanQiaEfficiencyPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    GuanQiaEfficiencyPanel.prototype.init = function () {
        this.initMap();
    };
    GuanQiaEfficiencyPanel.prototype.initMap = function () {
        this.boxs = [];
        this.maps = [];
        this.items = [];
        for (var i = 0; i < GuanQiaEfficiencyPanel.MAP_COUNT; i++) {
            this["item" + i].visible = false;
        }
        for (var i = 0; i < GuanQiaEfficiencyPanel.MAP_COUNT; i++) {
            var item = this["item" + i];
            var config = GlobalConfig.WorldRewardConfig[i + 1];
            var lastConfig = GlobalConfig.WorldRewardConfig[i];
            var laseLevel = i == 0 ? 0 : lastConfig.needLevel + 1;
            item.touchChildren = true;
            item.visible = config != undefined;
            item.nameTxt.text = config ? "" + config.name : "";
            item.levelLabel.text = laseLevel + "-" + config.needLevel + "\u7AE0";
            this.items[i] = item;
            this.boxs[i] = item.box;
            this.maps[i] = this["map" + i];
        }
    };
    GuanQiaEfficiencyPanel.prototype.open = function () {
        for (var _i = 0, _a = this.boxs; _i < _a.length; _i++) {
            var box = _a[_i];
            this.addTouchEvent(box, this.onTouchTap);
        }
        this.addTouchEvent(this.leftArrow, this.onTouchArrow);
        this.addTouchEvent(this.rightArrow, this.onTouchArrow);
        this.observe(UserFb.ins().postGuanqiaWroldReward, this.upDateGuanqiaWroldReward);
        var isTow = UserFb.ins().worldReward > GuanQiaEfficiencyPanel.MAP_ONE_COUNT - 1;
        this.currentState = isTow ? "map1" : "map0";
        this.rightArrow.visible = isTow;
        this.update();
    };
    GuanQiaEfficiencyPanel.prototype.close = function () {
        for (var _i = 0, _a = this.boxs; _i < _a.length; _i++) {
            var box = _a[_i];
            this.removeTouchEvent(box, this.onTouchTap);
        }
        this.removeTouchEvent(this.leftArrow, this.onTouchArrow);
        this.removeTouchEvent(this.rightArrow, this.onTouchArrow);
        this.removeObserve();
    };
    GuanQiaEfficiencyPanel.prototype.onTouchTap = function (e) {
        var pass = this.boxs.indexOf(e.currentTarget) + 1;
        ViewManager.ins().open(GuanQiaWorldRewardWin, pass);
    };
    GuanQiaEfficiencyPanel.prototype.onTouchArrow = function (event) {
        this.currentState = (event.currentTarget == this.leftArrow) ? "map0" : "map1";
        this.update();
    };
    GuanQiaEfficiencyPanel.prototype.upDateGuanqiaWroldReward = function () {
        this.update();
    };
    GuanQiaEfficiencyPanel.prototype.update = function () {
        var i = this.currentState == "map0" ? 0 : GuanQiaEfficiencyPanel.MAP_TWO_COUNT - 1;
        var len = this.currentState == "map0" ? GuanQiaEfficiencyPanel.MAP_ONE_COUNT : this.items.length;
        var index = UserFb.ins().worldReward;
        for (; i < len; i++) {
            var item_1 = this.items[i];
            var map = this.maps[i];
            if (!item_1 || !map)
                continue;
            item_1.visible = i <= index;
            map.visible = i <= index;
            item_1.barGroup.visible = false;
            item_1.box.visible = item_1.levelLabel.visible = item_1.redPointBox.visible = UserFb.ins().isReceiveBox(i + 1);
        }
        var item = this.items[index];
        var config = GlobalConfig.WorldRewardConfig[UserFb.ins().worldReward + 1];
        var preConfig = GlobalConfig.WorldRewardConfig[UserFb.ins().worldReward];
        if (config && item) {
            item.box.visible = true;
            item.barGroup.visible = true;
            item.levelLabel.visible = true;
            item.bar.value = UserFb.ins().guanqiaReward - (preConfig ? preConfig.needLevel : 0) - 1;
            item.bar.maximum = preConfig ? config.needLevel - preConfig.needLevel : config.needLevel;
        }
    };
    GuanQiaEfficiencyPanel.MAP_COUNT = 15;
    GuanQiaEfficiencyPanel.MAP_ONE_COUNT = 7;
    GuanQiaEfficiencyPanel.MAP_TWO_COUNT = 8;
    return GuanQiaEfficiencyPanel;
}(BaseComponent));
__reflect(GuanQiaEfficiencyPanel.prototype, "GuanQiaEfficiencyPanel");
//# sourceMappingURL=GuanQiaEfficiencyPanel.js.map