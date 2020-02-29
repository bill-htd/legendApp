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
var ItemUseTipsWin = (function (_super) {
    __extends(ItemUseTipsWin, _super);
    function ItemUseTipsWin() {
        var _this = _super.call(this) || this;
        _this.maxNum = 0;
        _this.oldNum = 0;
        _this.bossBoxIdList = [230001, 230002, 230003];
        return _this;
    }
    ItemUseTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ItemUseTipsSkin";
        this.numLabel.restrict = "0-9";
        this.itemIcon.imgJob.visible = false;
        this.isTopLevel = true;
        this.showNoBtn = false;
    };
    ItemUseTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._data = param[0];
        this.showNoBtn = param[1];
        this.goodsId = this._data.configID;
        this.addTouchEndEvent(this.BG, this.otherClose);
        this.addTouchEndEvent(this.minBtn, this.onTap);
        this.addTouchEndEvent(this.maxBtn, this.onTap);
        this.addTouchEndEvent(this.sub1Btn, this.onTap);
        this.addTouchEndEvent(this.add1Btn, this.onTap);
        this.addTouchEndEvent(this.useBtn, this.onTap);
        this.addTouchEndEvent(this.useBtn0, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.observe(UserBag.ins().postUseItemSuccess, this.useSuccess);
        this.observe(UserBag.ins().postItemChange, this.itemChange);
        this.observe(UserBag.ins().postItemDel, this.itemChange);
        this.addChangeEvent(this.numLabel, this.onTxtChange);
        this.setData(this._data);
        this.isBossBox = this.bossBoxIdList.lastIndexOf(this.goodsId) != -1;
        this.itemList.itemRenderer = ItemBase;
        this.useBtn.visible = !this.showNoBtn;
        this.useLabel.visible = this.showNoBtn;
        this.add.visible = ItemConfig.getType(this._data.itemConfig) != ItemType.TYPE_25;
    };
    ItemUseTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.BG.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this);
        this.minBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTap, this);
        this.maxBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTap, this);
        this.sub1Btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTap, this);
        this.add1Btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTap, this);
        this.useBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTap, this);
        this.numLabel.removeEventListener(egret.Event.CHANGE, this.onTxtChange, this);
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeObserve();
        this._data = null;
    };
    ItemUseTipsWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(ItemUseTipsWin);
    };
    ItemUseTipsWin.prototype.onTxtChange = function (e) {
        var num = Number(this.numLabel.text);
        if (num > this.maxNum) {
            num = this.maxNum;
        }
        else if (num <= 0) {
            num = 1;
        }
        this.useNum = num;
        this.numLabel.text = this.useNum + "";
    };
    ItemUseTipsWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.minBtn:
                this.useNum = 1;
                break;
            case this.maxBtn:
                this.useNum = this.maxNum;
                break;
            case this.sub1Btn:
                this.useNum--;
                if (this.useNum <= 0) {
                    this.useNum = 1;
                }
                break;
            case this.add1Btn:
                this.useNum++;
                if (this.useNum > this.maxNum) {
                    this.useNum = this.maxNum;
                }
                break;
            case this.useBtn:
                if (Number(this.numLabel.text) <= 0) {
                    this.numLabel.text = "1";
                }
                this.onUse();
                break;
            case this.useBtn0:
                this.onBack();
                break;
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
        this.numLabel.text = this.useNum + "";
    };
    ItemUseTipsWin.prototype.onUse = function () {
        var config = this._data.itemConfig;
        if (config.id == GlobalConfig.WingCommonConfig.attrPillId || config.id == GlobalConfig.WingCommonConfig.flyPillId) {
            Wing.ins().userDans(config.id);
            ViewManager.ins().close(this);
            return;
        }
        if (this.checkCanMerge()) {
            this.onMerge();
            ViewManager.ins().close(ItemUseTipsWin);
            return;
        }
        var _type = ItemConfig.getType(config);
        if (_type == ItemType.TYPE_2) {
            ViewManager.ins().open(SkillWin, 3);
            ViewManager.ins().close(this);
            UserMiji.ins().postBagUseMiji(config.id);
            return;
        }
        if (_type == ItemType.TYPE_10) {
            this.onUseType10();
            ViewManager.ins().close(ItemUseTipsWin);
            return;
        }
        if (_type == ItemType.TYPE_13) {
            this.onUseType13();
            ViewManager.ins().close(ItemUseTipsWin);
            return;
        }
        if (_type == ItemType.TYPE_14) {
            this.onUseType14();
            ViewManager.ins().close(ItemUseTipsWin);
            return;
        }
        if (_type == ItemType.TYPE_20) {
            if (!SpecialRing.ins().checkCanUseByItem(config.id)) {
                UserTips.ins().showTips("\u70C8\u7130\u7CBE\u9AD3\u7684\u4F7F\u7528\u6570\u91CF\u5DF2\u8FBE\u5230\u6700\u5927\u503C");
                ViewManager.ins().close(ItemUseTipsWin);
                return;
            }
        }
        if (config.id == ItemConst.LEVELUP_ITEM) {
            var rch = Recharge.ins().getRechargeData(0);
            if (!rch.num) {
                UserTips.ins().showTips("\u5145\u503C\u4EFB\u610F\u91D1\u989D\u624D\u80FD\u5F00\u542F\u793C\u5305");
                ViewManager.ins().close(ItemUseTipsWin);
                RechargeData.checkOpenWin();
                return;
            }
        }
        if (config.id == GlobalConfig.MijiBaseConfig.lockId) {
            ViewManager.ins().close(ItemUseTipsWin);
            ViewManager.ins().open(MijiLockWin, UserMiji.BAGOPEN);
            return;
        }
        if (_type == ItemType.TYPE_9) {
            ViewManager.ins().close(ItemUseTipsWin);
            ViewManager.ins().open(LiLianWin, 3);
            return;
        }
        if (this.isBossBox) {
            ViewManager.ins().close(ItemUseTipsWin);
            ViewManager.ins().open(RandBossWin, this.goodsId);
            return;
        }
        if (config.needyuanbao && Actor.yb < config.needyuanbao) {
            UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
            ViewManager.ins().close(this);
            return;
        }
        if (_type == ItemType.TYPE_8) {
            var lv = config.level ? config.level : 0;
            var zslv = config.zsLevel ? config.zsLevel : 0;
            if (Actor.level >= lv && UserZs.ins().lv >= zslv) {
            }
            else {
                var tips = "";
                if (UserZs.ins().lv < zslv) {
                    tips += zslv + "\u8F6C";
                }
                if (Actor.level < lv) {
                    tips += lv + "\u7EA7";
                }
                UserTips.ins().showTips("\u9700\u8981" + tips + "\u540E\u4F7F\u7528");
            }
        }
        if (_type == ItemType.TYPE_25) {
            Auction.ins().sendOpenAuBox(config.id);
            ViewManager.ins().close(ItemUseTipsWin);
            return;
        }
        if (UserBag.ins().sendUseItem(this.goodsId, this.useNum) || config.split) {
            ViewManager.ins().close(ItemUseTipsWin);
        }
    };
    ItemUseTipsWin.prototype.onUseType10 = function () {
        var config = this._data.itemConfig;
        var index = config.id == 200013 ? 0 : 1;
        for (var i = 0; i < SubRoles.MAX_ROLES; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (role) {
                var ringLv = SubRoles.ins().getSubRoleByIndex(i).getExRingsData(index);
                if (ringLv <= 0) {
                    ViewManager.ins().open(RoleWin, 0, i);
                    ViewManager.ins().close(ItemUseTipsWin);
                    break;
                }
            }
            else {
                UserTips.ins().showTips("\u89D2\u8272\u672A\u5F00\u542F\uFF0C\u65E0\u6CD5\u4F7F\u7528");
                break;
            }
        }
    };
    ItemUseTipsWin.prototype.onUseType13 = function () {
        var config = this._data.itemConfig;
        var boosType = config.useCond;
        if (config.descIndex == 300) {
            this.onUseType13_300();
            return;
        }
        else if (config.descIndex == 302) {
            this.onUseType13_302();
            return;
        }
        if (!boosType) {
            UserTips.ins().showTips("错误卷轴的使用类型");
            return;
        }
        var leftSum = UserBoss.ins().worldBossLeftTime[boosType];
        var bname = config.name;
        if (leftSum > 0) {
            UserTips.ins().showTips("\u65E0" + bname + "\u6311\u6218\u6B21\u6570\u65F6,\u624D\u80FD\u4F7F\u7528");
            return;
        }
        UserTips.ins().showTips("\u4F7F\u7528\u6210\u529F,\u83B7\u5F97" + this.useNum + "\u6B21" + bname + "\u6311\u6218\u6B21\u6570");
        UserBag.ins().sendUseItem(this.goodsId, this.useNum);
    };
    ItemUseTipsWin.prototype.onUseType13_300 = function () {
        var leftSum = UserFb.ins().fbRings.challengeTime;
        if (leftSum > 0) {
            UserTips.ins().showTips("\u65E0\u6311\u6218\u6B21\u6570\u65F6,\u624D\u80FD\u4F7F\u7528");
            return;
        }
        UserTips.ins().showTips("\u4F7F\u7528\u6210\u529F,\u83B7\u5F97" + this.useNum + "\u6B21\u70C8\u7130\u526F\u672C\u6311\u6218\u6B21\u6570");
        UserBag.ins().sendUseItem(this.goodsId, this.useNum);
    };
    ItemUseTipsWin.prototype.onUseType13_302 = function () {
        var leftSum = GodWeaponCC.ins().fubenInfoData.hadChallengeNum;
        if (leftSum > 0) {
            UserTips.ins().showTips("\u65E0\u6311\u6218\u6B21\u6570\u65F6,\u624D\u80FD\u4F7F\u7528");
            return;
        }
        UserTips.ins().showTips("\u4F7F\u7528\u6210\u529F,\u83B7\u5F97" + this.useNum + "\u6B21\u795E\u5175\u526F\u672C\u6311\u6218\u6B21\u6570");
        UserBag.ins().sendUseItem(this.goodsId, this.useNum);
    };
    ItemUseTipsWin.prototype.onUseType14 = function () {
        ViewManager.ins().open(RenameWin);
    };
    ItemUseTipsWin.prototype.onMerge = function () {
        var itemConfig = this._data.itemConfig;
        var id = itemConfig.id;
        var count = this._data.count;
        var mergeConfig = GlobalConfig.ItemComposeConfig[id];
        if (mergeConfig.srcCount > count) {
            UserTips.ins().showTips("\u6570\u91CF\u4E0D\u8DB3,\u4E0D\u80FD\u5408\u6210");
            return;
        }
        UserBag.ins().sendMergeItem(id, count);
    };
    ItemUseTipsWin.prototype.onBack = function () {
        var config = this._data.itemConfig;
        if (ItemConfig.getType(config) == ItemType.TYPE_10) {
            UserBag.ins().sendUseItem(this.goodsId, this.useNum);
        }
        else {
            if (UserBag.ins().sendUseItem(this.goodsId, this.useNum)) {
                ViewManager.ins().close(ItemUseTipsWin);
            }
        }
    };
    ItemUseTipsWin.prototype.useSuccess = function () {
        var data = UserBag.ins().getBagItemById(this.goodsId);
        if (!data) {
            ViewManager.ins().close(ItemUseTipsWin);
        }
        else {
            this.setData(data);
            this.onTxtChange(null);
        }
    };
    ItemUseTipsWin.prototype.itemChange = function () {
        var data = UserBag.ins().getBagItemById(this.goodsId);
        if (data) {
            this.setData(data);
            this.onTxtChange(null);
        }
        else {
            ViewManager.ins().close(this);
        }
    };
    ItemUseTipsWin.prototype.updateState = function () {
        var data = this._data;
        var type = ItemConfig.getType(data.itemConfig);
        if (this.checkCanMerge()) {
            this.currentState = 'rename';
        }
        else if (type == ItemType.TYPE_2) {
            this.currentState = "2";
        }
        else if (type == ItemType.TYPE_10) {
            this.currentState = '10';
        }
        else if (type == ItemType.TYPE_12) {
            this.currentState = 'guildgifts';
        }
        else if (type == ItemType.TYPE_14) {
            this.currentState = 'rename';
        }
        else {
            this.currentState = '2';
        }
    };
    ItemUseTipsWin.prototype.checkCanMerge = function () {
        var data = this._data;
        var id = data.itemConfig.id;
        return !!GlobalConfig.ItemComposeConfig[id];
    };
    ItemUseTipsWin.prototype.updateBaseInfo = function (idata) {
        var data = this._data;
        idata.count = idata.count ? idata.count : 1;
        var numStr = idata.count + "";
        var config = data.itemConfig;
        this.nameLabel.text = config.name;
        this.nameLabel.textColor = ItemConfig.getQualityColor(config);
        this.itemIcon.setData(config);
        this.lv.text = (config.level || 1) + "级";
        this.num.text = numStr;
        this.description.textFlow = TextFlowMaker.generateTextFlow(config.desc);
    };
    ItemUseTipsWin.prototype.updateUse = function () {
        var data = this._data;
        this.useNum = this._data.count;
        this.numLabel.text = this.useNum + "";
        this.oldNum = data.count;
        this.maxNum = data.count;
    };
    ItemUseTipsWin.prototype.updateHandlePos = function () {
        var data = this._data;
    };
    ItemUseTipsWin.prototype.setData = function (data) {
        this._data = data;
        var config = this._data.itemConfig;
        this.updateState();
        this.updateBaseInfo(data);
        var type = ItemConfig.getType(config);
        if (type == ItemType.TYPE_2) {
            this.updateType2();
        }
        else if (type == ItemType.TYPE_10) {
            this.updateType10();
        }
        if (this.checkCanMerge()) {
            this.useBtn.label = "合成";
        }
        else if (config.needyuanbao) {
            this.useBtn.label = config.needyuanbao + "元宝";
        }
        this.updateUse();
        this.updateHandlePos();
        this.updateGuildGift(config);
    };
    ItemUseTipsWin.prototype.updateType2 = function () {
    };
    ItemUseTipsWin.prototype.updateGuildGift = function (config) {
        var cfg = GlobalConfig.ItemGiftConfig[config.id];
        if (cfg) {
            this.itemList.dataProvider = new eui.ArrayCollection(cfg.awards);
        }
    };
    ItemUseTipsWin.prototype.updateType10 = function () {
        var config = this._data.itemConfig;
        var activityNum = 0;
        if (SubRoles.ins().subRolesLen == SubRoles.MAX_ROLES) {
            var index = config.id == 200013 ? 0 : 1;
            for (var i = 0; i < SubRoles.MAX_ROLES; i++) {
                var role = SubRoles.ins().getSubRoleByIndex(i);
                if (role) {
                    var ringLv = SubRoles.ins().getSubRoleByIndex(i).getExRingsData(index);
                    if (ringLv > 0) {
                        activityNum += 1;
                    }
                }
            }
        }
        if (activityNum == SubRoles.MAX_ROLES) {
            this.useBtn0.horizontalCenter = 0;
            this.useBtn.visible = false;
        }
        else {
            this.useBtn0.horizontalCenter = -90;
            this.useBtn.visible = true;
        }
    };
    return ItemUseTipsWin;
}(BaseEuiView));
__reflect(ItemUseTipsWin.prototype, "ItemUseTipsWin");
ViewManager.ins().reg(ItemUseTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=ItemUseTipsWin.js.map