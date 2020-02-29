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
var MijiLearnWin = (function (_super) {
    __extends(MijiLearnWin, _super);
    function MijiLearnWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "MijiLearnSkin";
        return _this;
    }
    MijiLearnWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.itemList.itemRenderer = MijiLearnItemRenderer;
        this.itemScroller.viewport = this.itemList;
        this.isTopLevel = true;
        this.link.textFlow = new egret.HtmlTextParser().parser("<u>获得途径</u>");
    };
    MijiLearnWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.roleIndex = param[0];
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.addTouchEvent(this.smeltBtn, this.onTap);
        this.addTouchEvent(this.link, this.onTap);
        this.observe(UserBag.ins().postItemAdd, this.updateItem);
        this.observe(UserBag.ins().postItemDel, this.updateItem);
        this.observe(UserBag.ins().postItemChange, this.updateItem);
        this.clearData();
        this.updateItem(true);
    };
    MijiLearnWin.prototype.sortFun = function (aItem, bItem) {
        var ins = UserMiji.ins();
        var aid = MiJiSkillConfig.getSkillIDByItem(aItem.configID);
        var bid = MiJiSkillConfig.getSkillIDByItem(bItem.configID);
        if (ins.hasSpecificSkillOfRole(this.roleIndex, aid) == true)
            return 1;
        if (ins.hasSpecificSkillOfRole(this.roleIndex, bid) == true)
            return -1;
        if (aItem.configID < bItem.configID)
            return -1;
        if (aItem.configID > bItem.configID)
            return 1;
        return 0;
    };
    MijiLearnWin.prototype.updateItem = function (autoSet) {
        if (autoSet === void 0) { autoSet = false; }
        var arr = UserBag.ins().getBagGoodsByType(2);
        arr.sort(this.sortFun.bind(this));
        var learnAry = [];
        for (var i = 0; i < arr.length; i++) {
            var id = MiJiSkillConfig.getSkillIDByItem(arr[i].configID);
            var obj = new Object();
            obj["islearn"] = UserMiji.ins().hasSpecificSkillOfRole(this.roleIndex, id);
            obj["isLock"] = UserMiji.ins().mijiIsLock(this.roleIndex, id);
            obj["item"] = arr[i];
            learnAry.push(obj);
        }
        this.itemList.dataProvider = new eui.ArrayCollection(learnAry);
        if (autoSet && arr.length) {
            this.setData(arr[0]);
            this.itemList.selectedIndex = 0;
        }
    };
    MijiLearnWin.prototype.setData = function (data) {
        this.mijiLearnIcon.data = MiJiSkillConfig.getSkillIDByItem(data.configID);
        var color = ItemConfig.getQualityColor(data.itemConfig).toString(16);
        this.mijiName.textFlow = new egret.HtmlTextParser().parser("<font color='#" + color + "'>" + data.itemConfig.name + "</font>");
        this.info.textFlow = TextFlowMaker.generateTextFlow1(data.itemConfig.desc);
        this.mijiLearnIcon.visible = true;
        var id = MiJiSkillConfig.getSkillIDByItem(data.configID);
        var isLearn = UserMiji.ins().hasSpecificSkillOfRole(this.roleIndex, id);
        this.smeltBtn.enabled = !isLearn;
        if (UserMiji.ins().mijiIsLock(this.roleIndex, id)) {
            this.smeltBtn.label = "\u5DF2\u52A0\u9501";
            this.smeltBtn.enabled = false;
        }
        else
            this.smeltBtn.label = isLearn ? "已学习" : "放 入";
        this.curName = data.itemConfig.name;
    };
    MijiLearnWin.prototype.clearData = function () {
        this.itemList.selectedIndex = -1;
        this.mijiLearnIcon.visible = false;
        this.mijiLearnIcon.data = null;
        this.info.text = "";
        this.curName = "";
        this.mijiName.text = "";
    };
    MijiLearnWin.prototype.onItemTap = function (e) {
        var data = this.itemList.dataProvider.getItemAt(e.itemIndex);
        this.setData(data["item"]);
    };
    MijiLearnWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
            case this.smeltBtn:
                if (this.mijiLearnIcon.data <= 0) {
                    UserTips.ins().showTips("请选择技能！");
                    return;
                }
                var id = this.mijiLearnIcon.data + 1;
                id = this.mijiLearnIcon.data - 1;
                var tempName = GlobalConfig.ItemConfig[GlobalConfig.MiJiSkillConfig[this.mijiLearnIcon.data].item].name;
                UserMiji.ins().postSelectedMiji(this.mijiLearnIcon.data, this.curName);
                this.clearData();
                ViewManager.ins().close(this);
                break;
            case this.link:
                ViewManager.ins().close(this);
                UserWarn.ins().setBuyGoodsWarn(200099, 1);
                break;
        }
    };
    MijiLearnWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.removeTouchEvent(this.smeltBtn, this.onTap);
        this.removeTouchEvent(this.link, this.onTap);
        this.removeObserve();
    };
    return MijiLearnWin;
}(BaseEuiView));
__reflect(MijiLearnWin.prototype, "MijiLearnWin");
ViewManager.ins().reg(MijiLearnWin, LayerManager.UI_Main);
//# sourceMappingURL=MijiLearnWin.js.map