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
var ChengjiuPanel = (function (_super) {
    __extends(ChengjiuPanel, _super);
    function ChengjiuPanel() {
        var _this = _super.call(this) || this;
        _this._chengjiuData = [];
        _this.skinName = "ChengjiuPanelSkin";
        _this.name = "\u6210\u5C31";
        return _this;
    }
    ChengjiuPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.list.itemRenderer = ChengjiuItem;
        this.list.dataProvider = this.listArrColl = new eui.ArrayCollection();
        this.tab.itemRenderer = ChengjiuTagItem;
        this.tabArrColl = new eui.ArrayCollection(LiLian.ins().chengjiuMaxData());
        this.tab.dataProvider = this.tabArrColl;
        this.tab.visible = false;
    };
    ChengjiuPanel.prototype.open = function () {
        this.addTouchEvent(this.list, this.onTab);
        this.addChangeEvent(this.tab, this.onTabChange);
        this.observe(UserTask.ins().postTaskChangeData, this.updateAchieve);
        this.tab.visible = true;
        this.tab.selectedIndex = 0;
        this.updateAchieve();
    };
    ChengjiuPanel.prototype.close = function () {
        this.removeTouchEvent(this.list, this.onTab);
        this.removeObserve();
    };
    ChengjiuPanel.prototype.onTab = function (e) {
        if (!(e.target instanceof eui.Button))
            return;
        var item = e.target.parent;
        switch (item.btn.labelDisplay.text) {
            case "\u524D\u5F80":
                GameGuider.taskGuidance(item.id, 1);
                break;
            case "\u9886\u53D6":
                UserTask.ins().sendGetAchieve(item.achievementId);
                break;
        }
    };
    ChengjiuPanel.prototype.onTabChange = function (evt) {
        this.listArrColl.source = UserTask.ins().getChengjiuDataByType(this.tab.selectedItem);
    };
    ChengjiuPanel.prototype.updateAchieve = function () {
        this.tabArrColl.replaceAll(LiLian.ins().chengjiuMaxData());
        this.nextCanTab(this.tab.selectedItem);
        this.listArrColl.source = UserTask.ins().getChengjiuDataByType(this.tab.selectedItem);
    };
    ChengjiuPanel.prototype.nextCanTab = function (type) {
        if (!this.canReceive(type)) {
            var curTabImdex = this.tab.selectedIndex;
            for (var i = 0, tabNum = this.tab.numChildren; i < tabNum; i++) {
                this.tab.selectedIndex = i;
                if (this.canReceive(this.tab.selectedItem))
                    return;
            }
            this.tab.selectedIndex = curTabImdex;
        }
    };
    ChengjiuPanel.prototype.canReceive = function (type) {
        var listData = UserTask.ins().getChengjiuDataByType(type);
        for (var i in listData) {
            if (listData[i].state == 1)
                return true;
        }
        return false;
    };
    return ChengjiuPanel;
}(BaseView));
__reflect(ChengjiuPanel.prototype, "ChengjiuPanel");
var ChengjiuTagItem = (function (_super) {
    __extends(ChengjiuTagItem, _super);
    function ChengjiuTagItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChengjiuTagSkin";
        return _this;
    }
    ChengjiuTagItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.nameImg.source = "task_json.name_" + this.data;
        this.redPoint.visible = UserTask.ins().getIsHaveChengjiuRewardBytype(this.data);
    };
    return ChengjiuTagItem;
}(BaseItemRender));
__reflect(ChengjiuTagItem.prototype, "ChengjiuTagItem");
var ChengjiuItem = (function (_super) {
    __extends(ChengjiuItem, _super);
    function ChengjiuItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChengjiuItemSkin";
        _this.mc = _this.mc || new MovieClip;
        _this.mc.x = _this.btn.x + 46;
        _this.mc.y = _this.btn.y + 45;
        _this.mc.scaleY = 0.8;
        _this.mc.scaleX = 0.9;
        _this.list.itemRenderer = ItemBase;
        return _this;
    }
    ChengjiuItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var achieveConf = UserTask.ins().getAchieveConfById(this.data.id);
        this.id = this.data.id;
        this.achievementId = this.data.achievementId;
        this.list.dataProvider = new eui.ArrayCollection(achieveConf.awardList);
        this.titleTF.textFlow = TextFlowMaker.generateTextFlow(achieveConf.name);
        var str = "\u8FDB\u5EA6\uFF1A|C:0x35e62d&T:" + CommonUtils.overLengthChange(this.data.value) + "/" + CommonUtils.overLengthChange(achieveConf.target) + "|";
        this.progressTF.textFlow = TextFlowMaker.generateTextFlow(str);
        this.btn.visible = true;
        if (this.mc && this.mc.parent) {
            DisplayUtils.removeFromParent(this.mc);
        }
        switch (this.data.state) {
            case 0:
                this.btn.labelDisplay.text = "\u524D\u5F80";
                this.btn.enabled = true;
                if (achieveConf.control == 0) {
                    this.btn.visible = false;
                }
                break;
            case 1:
                this.btn.labelDisplay.text = "\u9886\u53D6";
                this.btn.enabled = true;
                if (this.mc) {
                    this.mc.playFile(RES_DIR_EFF + 'normalbtn', -1);
                    this.addChild(this.mc);
                }
                break;
            case 2:
                this.btn.labelDisplay.text = "\u5DF2\u5B8C\u6210";
                this.btn.enabled = false;
                break;
        }
    };
    return ChengjiuItem;
}(BaseItemRender));
__reflect(ChengjiuItem.prototype, "ChengjiuItem");
//# sourceMappingURL=ChengjiuPanel.js.map