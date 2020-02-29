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
var SmeltItemNormalPanel = (function (_super) {
    __extends(SmeltItemNormalPanel, _super);
    function SmeltItemNormalPanel() {
        return _super.call(this) || this;
    }
    SmeltItemNormalPanel.prototype.childrenCreated = function () {
        this.init();
    };
    SmeltItemNormalPanel.prototype.init = function () {
        this.itemDataList = [];
        this.selectList = [];
        this.smeltEquips = [];
        this.smeltEquips.length = 9;
        this.itemList.itemRenderer = SmeltEquipItem;
        this.getItemList.itemRenderer = SmeltItemList;
        this.dataInfo = new eui.ArrayCollection(this.smeltEquips);
        this.itemList.dataProvider = this.dataInfo;
        this.getItemCollection = new eui.ArrayCollection();
        this.getItemList.dataProvider = this.getItemCollection;
    };
    SmeltItemNormalPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.itemDataList = param[0];
        this.addTouchEvent(this.smeltBtn, this.onTap);
        this.addTouchEvent(this.itemList, this.onTap);
        this.addTouchEvent(this.backbtn, this.onTap);
        this.setItemData();
        this.observe(UserForge.ins().postMeltItem, this.smeltComplete);
    };
    SmeltItemNormalPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    SmeltItemNormalPanel.prototype.smeltComplete = function () {
        for (var i = 0; i < this.selectList.length; i++) {
            for (var j = 0; j < this.itemList.numElements; j++) {
                var item = this.itemList.dataProvider.getItemAt(j);
                if (item.handle == this.selectList[i].handle) {
                    var render = this.itemList.getVirtualElementAt(j);
                    this.itemList.removeChild(render);
                    if (this.itemDataList[j])
                        this.itemDataList.splice(j, 1);
                    break;
                }
            }
        }
        this.selectList = [];
        SoundUtil.ins().playEffect(SoundUtil.SMELT);
        this.setItemData();
    };
    SmeltItemNormalPanel.prototype.setItemData = function () {
        this.smeltEquips = this.updateList();
        this.dataInfo.replaceAll(this.smeltEquips);
        this.updateFJlist();
    };
    SmeltItemNormalPanel.prototype.updateList = function () {
        var list = [];
        for (var i = 0; i < this.smeltEquips.length; i++) {
            if (this.itemDataList[i])
                list.push(this.itemDataList[i]);
            else
                break;
        }
        return list;
    };
    SmeltItemNormalPanel.prototype.updateFJlist = function () {
        var list = [];
        for (var i in this.selectList) {
            var cfg = GlobalConfig.RongLuExpConfig[this.selectList[i].configID];
            var ishave = false;
            LIST: for (var j in list) {
                for (var r in cfg.reward) {
                    if (list[j].id == cfg.reward[r].id) {
                        list[j].count += cfg.reward[r].count * this.selectList[i].count;
                        ishave = true;
                        break LIST;
                    }
                }
            }
            if (!ishave) {
                var rewardData = new RewardData();
                rewardData.type = cfg.reward[i].type;
                rewardData.id = cfg.reward[i].id;
                rewardData.count = cfg.reward[i].count * this.selectList[i].count;
                list.push(rewardData);
            }
        }
        this.getItemCollection.replaceAll(list);
    };
    SmeltItemNormalPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.smeltBtn:
                if (this.selectList.length <= 0) {
                    UserTips.ins().showTips("\u672A\u9009\u4E2D\u9700\u8981\u5206\u89E3\u7684\u9053\u5177");
                    return;
                }
                UserForge.ins().sendMeltItem(this.selectList);
                break;
            case this.itemList:
                var item = e.target;
                if (item && item.data) {
                    var idx = this.selectList.indexOf(item.data);
                    if (idx == -1) {
                        item.selectFrame.visible = true;
                        this.selectList.push(item.data);
                    }
                    else {
                        item.selectFrame.visible = false;
                        this.selectList.splice(idx, 1);
                    }
                }
                this.updateFJlist();
                break;
            case this.backbtn:
                ViewManager.ins().close(SmeltItemTotalWin);
                break;
        }
    };
    return SmeltItemNormalPanel;
}(BaseComponent));
__reflect(SmeltItemNormalPanel.prototype, "SmeltItemNormalPanel");
//# sourceMappingURL=SmeltItemNormalPanel.js.map