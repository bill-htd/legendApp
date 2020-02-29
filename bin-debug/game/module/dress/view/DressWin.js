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
var DressWin = (function (_super) {
    __extends(DressWin, _super);
    function DressWin() {
        var _this = _super.call(this) || this;
        _this.lastRole = -1;
        _this.lastIndex = -1;
        _this.skinName = "DressSkin";
        _this.isTopLevel = true;
        return _this;
    }
    DressWin.prototype.childrenCreated = function () {
        this.init();
    };
    DressWin.prototype.init = function () {
        this.listInfo = [];
        this.arry = new eui.ArrayCollection(this.listInfo);
        this.list.itemRenderer = DressItemRenderer;
        this.list.dataProvider = this.arry;
        this.titleList.itemRenderer = TitleItem;
        var arr = [];
        arr = CommonUtils.copyDataHandler(GlobalConfig.ZhuangBanConfig.zhuangbanpos);
        arr.push("称号");
        this.tab.dataProvider = new eui.ArrayCollection(arr);
    };
    DressWin.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curRole = param[0] || 0;
        if (param[1] != undefined) {
            this.lastIndex = this.selectIndex = parseInt(param[1] + "");
            this.tab.selectedIndex = this.selectIndex;
        }
        this.listId = param[2] || -1;
        this.list.selectedIndex = -1;
        this.roleSelect.setCurRole(this.curRole);
        this.roleSelect0.setCurRole(this.curRole);
        MessageCenter.ins().addListener(Title.TITLE_WIN_REFLASH_PANEL, function (obj, param) {
            if (obj.itemIndex == Title.ins().list.length - 1) {
                var itemHeight = Title.EXPAND_HEIGHT - Title.SIMLPE_HEIGHT;
                if (param == "expand") {
                    _this.titleList.scrollV = _this.titleList.contentHeight - _this.titleList.height + itemHeight;
                }
                else {
                    _this.titleList.scrollV = _this.titleList.contentHeight - _this.titleList.height - itemHeight;
                }
                _this.titleList.validateNow();
            }
        }, this);
        this.observe(Dress.ins().postDressInfo, this.update);
        this.observe(Dress.ins().postJiHuo, this.onJihuo);
        this.observe(GameLogic.ins().postSubRoleChange, this.getDressInfo);
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.help, this.onClick);
        this.addTouchEvent(this.itemName, this.onClick);
        this.addChangeEvent(this.list, this.onChange);
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addChangeEvent(this.roleSelect, this.onChange);
        this.addChangeEvent(this.roleSelect0, this.onChange);
        this.addTouchEvent(this.dressBtn, this.onClick);
        this.addTouchEvent(this.dressBtn2, this.onClick);
        this.observe(Title.ins().postListUpdate, this.updateList);
        this.observe(Title.ins().postTitleShow, this.updateShow);
        this.observe(Title.ins().postUseTitle, this.useTitle);
        this.list.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.list.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.list.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
        this.titleList.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.titleList.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.titleList.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
        this.titleGroup.visible = false;
        this.dressGroup.visible = true;
        this.changeRole();
        this.getDressInfo();
        if (this.lastIndex >= 0) {
            this.setSelectedIndex(this.lastIndex);
        }
    };
    DressWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.list.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.list.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.list.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
        this.titleList.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.titleList.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.titleList.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
        this.lastWeapon = 0;
        this.lastBody = 0;
        WatcherUtil.removeFromArrayCollection(this.titleList.dataProvider);
        this.titleList.dataProvider = null;
    };
    DressWin.prototype.listSelectIndex = function (id) {
        if (id == -1)
            return -1;
        var index = 0;
        for (var key in this.listInfo) {
            if (this.listInfo.hasOwnProperty(key)) {
                var element = this.listInfo[key];
                if (element.zhuanban.id == id) {
                    break;
                }
            }
            index++;
        }
        return index;
    };
    DressWin.prototype.onTouch = function (e) {
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.roleSelect.parent.touchEnabled = false;
            this.roleSelect0.parent.touchEnabled = false;
        }
        else {
            this.roleSelect.parent.touchEnabled = true;
            this.roleSelect0.parent.touchEnabled = true;
        }
    };
    DressWin.prototype.getDressInfo = function () {
        Dress.ins().sendDressInfoReq();
    };
    DressWin.prototype.onChange = function (e) {
        switch (e.target) {
            case this.roleSelect:
                if (this.lastRole == this.roleSelect.getCurRole())
                    return;
                this.changeRole();
                break;
            case this.roleSelect0:
                if (this.lastRole == this.roleSelect0.getCurRole())
                    return;
                Title.ins().curSelectRole = this.lastRole = this.roleSelect0.getCurRole();
                if (Title.ins().list == null)
                    Title.ins().sendGetList();
                else
                    this.updateList();
                break;
            case this.list:
                var item = e.target;
                this.onInfoUpdate(item.data);
                break;
        }
    };
    DressWin.prototype.changeRole = function () {
        this.curRole = this.roleSelect.getCurRole();
        this.lastWeapon = 0;
        this.lastBody = 0;
        this.lastWing = 0;
        this.lastRole = this.curRole;
        this.update();
    };
    DressWin.prototype.careerRedPoint = function () {
        var redPoint = Dress.ins().posRedPoint();
        for (var i = 0; i < 3; i++) {
            this["redPoint" + i].visible = redPoint[i];
        }
    };
    DressWin.prototype.onTabTouch = function (e) {
        var sro = this.list.parent;
        sro.stopAnimation();
        this.list.scrollH = 0;
        this.listId = -1;
        this.selectIndex = e.currentTarget.selectedIndex;
        this.setSelectedIndex(this.selectIndex);
    };
    DressWin.prototype.setSelectedIndex = function (index) {
        this.lastIndex = this.selectIndex;
        if (this.selectIndex < this.tab.dataProvider.length - 1) {
            this.dressGroup.visible = true;
            this.roleSelect.openRole();
            this.titleGroup.visible = false;
            this.update();
        }
        else {
            this.dressGroup.visible = false;
            this.titleGroup.visible = true;
            Title.ins().curSelectRole = 0;
            this.roleSelect.hideRole();
            if (Title.ins().list == null)
                Title.ins().sendGetList();
            else
                this.updateList();
        }
    };
    DressWin.prototype.update = function () {
        if (this.curRole == null)
            this.curRole = 0;
        if (this.selectIndex == null)
            this.selectIndex = 0;
        var model = Dress.ins();
        this.listInfo = [];
        for (var k in GlobalConfig.ZhuangBanId) {
            if (SubRoles.ins().getSubRoleByIndex(this.curRole).job == GlobalConfig.ZhuangBanId[k].roletype && ((this.selectIndex + 1) == GlobalConfig.ZhuangBanId[k].pos)) {
                var info = new DressItemInfo();
                info.zhuanban = GlobalConfig.ZhuangBanId[k];
                info.lv = 0;
                var id = info.zhuanban.id;
                if (model.timeInfo[id]) {
                    info.timer = model.timeInfo[id].invalidtime;
                    info.lv = model.timeInfo[id].lv;
                }
                if (model.posInfo.length > this.curRole && id == model.posInfo[this.curRole].posAry[this.selectIndex])
                    info.isDress = true;
                this.listInfo.push(info);
            }
        }
        this.listInfo.sort(this.sortList);
        this.arry.replaceAll(this.listInfo);
        this.list.dataProvider = this.arry;
        this.onInfoUpdate();
        this.redPoint();
        this.careerRedPoint();
        if (this.listId != -1) {
            var index = this.listSelectIndex(this.listId);
            this.list.selectedIndex = index;
            this.list.scrollH = 110 * index;
        }
    };
    DressWin.prototype.sortList = function (a, b) {
        if (a.zhuanban.sort < b.zhuanban.sort)
            return -1;
        if (a.zhuanban.sort > b.zhuanban.sort)
            return 1;
        return 0;
    };
    DressWin.prototype.redPoint = function () {
        for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
            var isOpen = Dress.ins().canDress(SubRoles.ins().getSubRoleByIndex(i).job, this.tab.selectedIndex + 1);
            this.roleSelect.showRedPoint(i, isOpen);
        }
    };
    DressWin.prototype.onInfoUpdate = function (data) {
        if (data === void 0) { data = null; }
        if (data == null) {
            if (this.list.selectedIndex == -1)
                this.list.selectedIndex = 0;
            this.dress = this.list.selectedItem;
            this.powerPanel.setPower(0);
        }
        else
            this.dress = data;
        this.attrLv.visible = true;
        this.attrLv.text = "";
        if (this.dress) {
            this.selectGroup.visible = true;
            this.unSelectGroup.visible = false;
            var attr = this.dress.zhuanban.attr;
            if (this.dress.lv > 1) {
                var config = GlobalConfig.ZhuangBanLevelUp[this.dress.zhuanban.id][this.dress.lv];
                attr = AttributeData.AttrAddition(attr, config.attr);
            }
            this.attrLabel.text = AttributeData.getAttStr(AttributeData.transformAttr(attr), 0, 1, ":");
            var desc = this.getSlotDesc(this.dress.zhuanban.id);
            this.attrLabel.text += desc ? "\n" + desc : "";
            if (this.dress.zhuanban.wing_attr_per > 0) {
                this.attrLabel.text += "\n\u7FBD\u7FFC\u57FA\u7840\u5C5E\u6027\uFF1A" + Math.floor(this.dress.zhuanban.wing_attr_per / 100) + "%";
                var lvAttrs = [];
                var wingData = SubRoles.ins().getSubRoleByIndex(this.curRole).wingsData;
                var wingLv = wingData ? wingData.lv : 0;
                wingLv = wingLv >= 0 ? wingLv : 0;
                var tempConfig = GlobalConfig.WingLevelConfig[wingLv].attr;
                var len = tempConfig.length;
                for (var i = 0; i < len; i++)
                    lvAttrs.push(new AttributeData(tempConfig[i].type, Math.floor(tempConfig[i].value * this.dress.zhuanban.wing_attr_per / 10000)));
                attr = AttributeData.AttrAddition(attr, lvAttrs);
            }
            if (this.isCanLevelUp(this.dress) && !this.isMaxLevel(this.dress)) {
                var nextLv = this.dress.lv + 1;
                var conf = GlobalConfig.ZhuangBanLevelUp[this.dress.zhuanban.id];
                var attr1 = conf[nextLv].attr;
                if (conf[this.dress.lv]) {
                    attr1 = AttributeData.AttrDel(attr1, conf[this.dress.lv].attr);
                }
                var str = "";
                for (var i = 0; i < attr1.length; i++) {
                    str += "\u5347\u7EA7+" + attr1[i].value + "\n";
                }
                var index = str.lastIndexOf("\n");
                str = str.substring(0, index);
                this.attrLv.text = str;
            }
            var power = UserBag.getAttrPower(AttributeData.transformAttr(attr));
            power += this.dress.zhuanban.exPower ? this.dress.zhuanban.exPower : 0;
            this.powerPanel.setPower(power);
            this.namelabel.visible = false;
            this.itemName.visible = false;
            this.dressName.text = "属性-" + this.dress.zhuanban.name;
            this.dressBtn.enabled = true;
            if (this.dress.lv) {
                if (!this.isCanLevelUp(this.dress)) {
                    this.namelabel.visible = false;
                    this.itemName.visible = false;
                    this.dressBtn.visible = true;
                    this.dressBtn2.visible = false;
                    if (this.dress.isDress) {
                        this.dressBtn.label = "\u8131 \u4E0B";
                    }
                    else {
                        this.dressBtn.label = "\u5E7B \u5316";
                    }
                }
                else {
                    this.dressBtn.visible = true;
                    this.dressBtn2.visible = true;
                    if (this.isMaxLevel(this.dress)) {
                        this.namelabel.visible = false;
                        this.itemName.visible = false;
                        this.dressBtn.label = "\u5DF2\u6EE1\u7EA7";
                        this.dressBtn.enabled = false;
                    }
                    else {
                        this.namelabel.visible = true;
                        this.itemName.visible = true;
                        this.dressBtn.label = "\u5347 \u7EA7";
                        var nextLv = this.dress.lv + 1;
                        var config = GlobalConfig.ZhuangBanLevelUp[this.dress.zhuanban.id][nextLv];
                        this.id = config.cost["itemId"];
                        this.num = config.cost["num"];
                        var str = void 0;
                        if (UserBag.ins().getBagGoodsCountById(0, this.id) >= this.num)
                            str = "<font color = '#23C42A'><u>" + GlobalConfig.ItemConfig[this.id].name + "×" + this.num + "</u></font>";
                        else {
                            str = "<font color = '#f3311e'><u>" + GlobalConfig.ItemConfig[this.id].name + "×" + this.num + "</u></font>";
                        }
                        this.itemName.textFlow = new egret.HtmlTextParser().parser(str);
                    }
                    if (this.dress.isDress) {
                        this.dressBtn2.label = "\u8131 \u4E0B";
                    }
                    else {
                        this.dressBtn2.label = "\u5E7B \u5316";
                    }
                }
            }
            else {
                this.dressBtn.label = "激 活";
                this.namelabel.visible = true;
                this.itemName.visible = true;
                this.dressBtn.visible = true;
                this.dressBtn2.visible = false;
                this.id = this.dress.zhuanban.cost["itemId"];
                this.num = this.dress.zhuanban.cost["num"];
                var str = void 0;
                if (UserBag.ins().getBagGoodsCountById(0, this.id) >= this.num)
                    str = "<font color = '#23C42A'><u>" + GlobalConfig.ItemConfig[this.id].name + "×" + this.num + "</u></font>";
                else {
                    str = "<font color = '#f3311e'><u>" + GlobalConfig.ItemConfig[this.id].name + "×" + this.num + "</u></font>";
                }
                this.itemName.textFlow = new egret.HtmlTextParser().parser(str);
            }
            this.onupdateEquip(false);
        }
        else {
            this.selectGroup.visible = false;
            this.unSelectGroup.visible = true;
            this.onupdateEquip(true);
        }
    };
    DressWin.prototype.isCanLevelUp = function (info) {
        var id = info.zhuanban.id;
        if (GlobalConfig.ZhuangBanLevelUp[id])
            return true;
        return false;
    };
    DressWin.prototype.isMaxLevel = function (info) {
        var nextLv = info.lv + 1;
        var id = info.zhuanban.id;
        if (GlobalConfig.ZhuangBanLevelUp[id] && GlobalConfig.ZhuangBanLevelUp[id][nextLv])
            return false;
        return true;
    };
    DressWin.prototype.onupdateEquip = function (isshowjichu) {
        if (isshowjichu === void 0) { isshowjichu = false; }
        var model = SubRoles.ins().getSubRoleByIndex(this.curRole);
        var info = Dress.ins().getModelPosId(this.curRole);
        if (!info || !info.posAry || info.posAry.length <= 0) {
            debug.log(this.listInfo);
            var tempInfo = this.listInfo[0];
            if (tempInfo.zhuanban.pos == 1) {
                this.setEquip(model, tempInfo.zhuanban.id, this.lastWeapon);
                this.lastBody = tempInfo.zhuanban.id;
            }
            else if (tempInfo.zhuanban.pos == 2) {
                this.setEquip(model, this.lastBody, tempInfo.zhuanban.id);
                this.lastWeapon = tempInfo.zhuanban.id;
            }
            else {
                this.setWing(tempInfo.zhuanban.id);
                this.lastWing = tempInfo.zhuanban.id;
            }
            debug.log("没有时装数据。。。。。。。。。。。。。。。。");
            return;
        }
        if (isshowjichu) {
            this.setWing(info.posAry[2]);
            this.setEquip(model, info.posAry[0], info.posAry[1]);
        }
        else {
            if (this.dress.zhuanban.pos == 3) {
                this.setWing(this.dress.zhuanban.id);
                this.setEquip(model, this.lastBody || info.posAry[0], this.lastWeapon || info.posAry[1]);
                this.lastWing = this.dress.zhuanban.id;
            }
            else if (this.dress.zhuanban.pos == 1) {
                this.setEquip(model, this.dress.zhuanban.id, this.lastWeapon || info.posAry[1]);
                this.lastBody = this.dress.zhuanban.id;
            }
            else {
                this.setEquip(model, this.lastBody || info.posAry[0], this.dress.zhuanban.id);
                this.lastWeapon = this.dress.zhuanban.id;
            }
        }
    };
    DressWin.prototype.setWing = function (wingId) {
        var wingdata = SubRoles.ins().getSubRoleByIndex(this.curRole).wingsData;
        if (wingId > 0)
            this.wingImg.source = this.getZhuangbanById(wingId).res + "_png";
        else if (wingdata.openStatus) {
            this.wingImg.source = GlobalConfig.WingLevelConfig[wingdata.lv].appearance + "_png";
        }
        else {
            this.wingImg.source = "";
        }
    };
    DressWin.prototype.setEquip = function (role, bodyId, weaponId) {
        if (!role)
            return;
        var equipData = role.equipsData;
        var isHaveBody;
        this.weaponImg.source = "";
        for (var i = 0; i < equipData.length; i++) {
            var element = equipData[i];
            if (i == 0 || i == 2) {
                var id = equipData[i].item.configID;
                if (id > 0) {
                    var fileName = GlobalConfig.EquipConfig[id].appearance;
                    if (fileName && fileName.indexOf("[job]") > -1)
                        fileName = fileName.replace("[job]", role.job + "");
                    if (i == 0) {
                        this.weaponImg.source = fileName + "_" + role.sex + "_c_png";
                    }
                    else {
                        this.bodyImg.source = fileName + "_" + role.sex + "_c_png";
                        isHaveBody = true;
                    }
                }
            }
        }
        if (!isHaveBody)
            this.bodyImg.source = "body000_" + role.sex + "_c_png";
        if (weaponId > 0)
            this.weaponImg.source = this.getZhuangbanById(weaponId).res + "_" + role.sex + "_c_png";
        if (bodyId > 0)
            this.bodyImg.source = this.getZhuangbanById(bodyId).res + "_" + role.sex + "_c_png";
    };
    DressWin.prototype.getZhuangbanById = function (id) {
        for (var k in GlobalConfig.ZhuangBanId) {
            if (GlobalConfig.ZhuangBanId[k].id == id)
                return GlobalConfig.ZhuangBanId[k];
        }
        return null;
    };
    DressWin.prototype.onJihuo = function () {
        Dress.ins().sendDressUserReq(this.curRole, this.dress.zhuanban.id);
    };
    DressWin.prototype.onClick = function (e) {
        var _this = this;
        switch (e.target) {
            case this.closeBtn:
                ViewManager.ins().close(DressWin);
                break;
            case this.help:
                ViewManager.ins().open(ZsBossRuleSpeak, 9);
                break;
            case this.itemName:
                var itemconfig = GlobalConfig.ItemConfig[this.id];
                var type = ItemConfig.getType(itemconfig);
                if (itemconfig != undefined && itemconfig && type != undefined) {
                    if (type == 0 || type == 4) {
                        ViewManager.ins().open(EquipDetailedWin, 1, undefined, itemconfig.id);
                    }
                    else {
                        ViewManager.ins().open(ItemDetailedWin, 0, itemconfig.id);
                    }
                }
                break;
            case this.dressBtn2:
                if (this.dressBtn2.label == "幻 化") {
                    Dress.ins().sendDressUserReq(this.curRole, this.dress.zhuanban.id);
                }
                else {
                    Dress.ins().sendUnDressUserReq(this.curRole, this.dress.zhuanban.id);
                }
                break;
            case this.dressBtn:
                if (!this.dress || !this.dress.zhuanban) {
                    debug.log(DressWin, "DressWin　　" + this.dress + " ++++++ ");
                    return;
                }
                if (this.dressBtn.label == "激 活") {
                    if (UserBag.ins().getBagGoodsCountById(0, this.id) < this.num) {
                        UserTips.ins().showTips("|C:0xf3311e&T:激活道具不足|");
                        return;
                    }
                    if (this.dress.zhuanban.pos == 3 && Actor.level < 16) {
                        UserTips.ins().showTips("16级开启羽翼后可激活");
                        return;
                    }
                    var jobNumberToName = {
                        0: "通用",
                        1: "战士",
                        2: "法师",
                        3: "道士",
                    };
                    var posAry = GlobalConfig.ZhuangBanConfig.zhuangbanpos;
                    WarnWin.show("\u786E\u5B9A\u8981\u6FC0\u6D3B<font color='#35e62d'>" + (jobNumberToName[this.dress.zhuanban.roletype] + posAry[this.dress.zhuanban.pos - 1]) + "</font>\u88C5\u626E" + this.dress.zhuanban.name + "\u5417?", function () {
                        Dress.ins().sendDressActivationReq(_this.dress.zhuanban.id);
                    }, this);
                }
                else if (this.dressBtn.label == "幻 化") {
                    Dress.ins().sendDressUserReq(this.curRole, this.dress.zhuanban.id);
                }
                else if (this.dressBtn.label == "\u5347 \u7EA7") {
                    if (UserBag.ins().getBagGoodsCountById(0, this.id) < this.num) {
                        UserTips.ins().showTips("|C:0xf3311e&T:升级道具不足|");
                        return;
                    }
                    Dress.ins().sendLevelUp(this.dress.zhuanban.id);
                }
                else if (this.dressBtn.label == "\u8131 \u4E0B") {
                    Dress.ins().sendUnDressUserReq(this.curRole, this.dress.zhuanban.id);
                }
                break;
        }
    };
    DressWin.prototype.useTitle = function (info) {
        if (info.config.Id != Title.ins().showTitleDic[Title.ins().curSelectRole]) {
            if (!info.config.job || info.config.job == SubRoles.ins().getSubRoleByIndex(this.roleSelect.getCurRole()).job)
                Title.ins().setTitle(this.roleSelect0.getCurRole(), info.config.Id);
            else
                UserTips.ins().showTips('职业不符');
        }
        else {
            Title.ins().setTitle(Title.ins().curSelectRole, 0);
        }
    };
    DressWin.prototype.updateList = function () {
        this.titleList.dataProvider = Title.ins().list;
        Title.ins().list.refresh();
    };
    DressWin.prototype.updateShow = function (param) {
        var roleIndex, titleID, lastID;
        roleIndex = param[0];
        titleID = param[1];
        lastID = param[2];
        if (titleID > 0 == lastID > 0) {
            this.updateItemByID(lastID);
            this.updateItemByID(titleID);
        }
        else {
            for (var id in Title.ins().timeDict) {
                this.updateItemByID(Number(id));
            }
        }
    };
    DressWin.prototype.updateItemByID = function (titleID) {
        if (!(titleID in Title.ins().infoDict))
            return;
        var info = Title.ins().infoDict[titleID];
        Title.ins().list.itemUpdated(info);
    };
    DressWin.prototype.getSlotDesc = function (id) {
        var zbconfig = GlobalConfig.ZhuangBanId[id];
        if (!zbconfig || !zbconfig.attr_precent)
            return "";
        var str = "";
        for (var i = 0; i < zbconfig.attr_precent.length; i++) {
            switch (zbconfig.attr_precent[i].pos) {
                case EquipPos.WEAPON:
                    str = "\u6B66\u5668";
                    break;
                case EquipPos.HEAD:
                    str = "\u5934\u76D4";
                    break;
                case EquipPos.CLOTHES:
                    str = "\u8863\u670D";
                    break;
                case EquipPos.NECKLACE:
                    str = "\u9879\u94FE";
                    break;
                case EquipPos.Wrist:
                    str = "\u624B\u956F";
                    break;
                case EquipPos.BRACELET:
                    str = "\u8170\u5E26";
                    break;
                case EquipPos.RING:
                    str = "\u6212\u6307";
                    break;
                case EquipPos.SHOE:
                    str = "\u978B\u5B50";
                    break;
            }
            str += "\u57FA\u7840\u5C5E\u6027+" + Math.floor(zbconfig.attr_precent[i].pre / 100) + "%\n";
        }
        if (str) {
            var index = str.lastIndexOf("\n");
            str = str.substring(0, index);
        }
        return str;
    };
    return DressWin;
}(BaseEuiView));
__reflect(DressWin.prototype, "DressWin");
ViewManager.ins().reg(DressWin, LayerManager.UI_Main);
//# sourceMappingURL=DressWin.js.map