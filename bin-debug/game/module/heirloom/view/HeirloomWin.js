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
var HeirloomWin = (function (_super) {
    __extends(HeirloomWin, _super);
    function HeirloomWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "heirloom";
        _this.isTopLevel = true;
        return _this;
    }
    HeirloomWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.icon0.visible = false;
        this.curIndex = 0;
    };
    HeirloomWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (UserZs.ins().lv < 3) {
            UserTips.ins().showTips("\u4F20\u4E16\u88C5\u59073\u8F6C\u5F00\u542F");
            return false;
        }
        return true;
    };
    HeirloomWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var selectedIndex = param ? param[0] : 0;
        this.roleSelect.setCurRole(selectedIndex);
        this.observe(UserBag.ins().postItemDel, this.updateData);
        this.observe(UserBag.ins().postItemCountChange, this.updateData);
        this.observe(Heirloom.ins().postHeirloomInfo, this.updateData);
        this.addChangeEvent(this.roleSelect, this.switchRole);
        for (var i = 0; i < 8; i++) {
            this.addTouchEvent(this["pos" + i], this.onTap);
        }
        this.addTouchEvent(this.rightBtn, this.onClick);
        this.addTouchEvent(this.leftBtn, this.onClick);
        this.addTouchEvent(this.getItemTxt, this.onClick);
        this.addTouchEvent(this.jihuo, this.onClick);
        this.addTouchEvent(this.attrSet, this.onClick);
        this.addTouchEvent(this.neatSet, this.onClick);
        this.addTouchEvent(this.skill, this.onSkill);
        this.addTouchEvent(this.icon0.parent, this.onClick);
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.initData();
    };
    HeirloomWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        for (var i = 0; i < 8; i++) {
            this.removeTouchEvent(this["pos" + i], this.onTap);
        }
        this.removeTouchEvent(this.rightBtn, this.onClick);
        this.removeTouchEvent(this.leftBtn, this.onClick);
        this.removeTouchEvent(this.getItemTxt, this.onClick);
        this.removeTouchEvent(this.jihuo, this.onClick);
        this.removeTouchEvent(this.attrSet, this.onClick);
        this.removeTouchEvent(this.neatSet, this.onClick);
        this.removeTouchEvent(this.skill, this.onSkill);
        this.roleSelect.removeEventListener(egret.Event.CHANGE, this.switchRole, this);
        this.removeTouchEvent(this.icon0.parent, this.onClick);
        this.removeTouchEvent(this.closeBtn, this.onClick);
        this.removeObserve();
        this.removeAni();
        this.clearEff();
    };
    HeirloomWin.prototype.removeAni = function () {
        DisplayUtils.removeFromParent(this.modelAni);
        this.modelAni = null;
    };
    HeirloomWin.prototype.onSkill = function (e) {
        switch (e.currentTarget) {
            case this.skill:
                ViewManager.ins().open(HeirloomSkillItem, this.skill.itemIcon.imgIcon.source, this.skill.skillname, this.skill.skilldesc);
                break;
        }
    };
    HeirloomWin.prototype.onClick = function (e) {
        switch (e.target) {
            case this.leftBtn:
                this.leftBtn.visible = false;
                this.rightBtn.visible = true;
                this.pre();
                break;
            case this.rightBtn:
                this.rightBtn.visible = false;
                this.leftBtn.visible = true;
                this.next();
                break;
            case this.getItemTxt:
                var tipsPos = 0;
                if (this.getItemTxt.text == "获取传世之刃") {
                    tipsPos = HeirloomSlot.wq;
                }
                else if (this.getItemTxt.text == "获取传世神甲") {
                    tipsPos = HeirloomSlot.yf;
                }
                if (tipsPos) {
                    var config = GlobalConfig.HeirloomEquipItemConfig[tipsPos];
                    ViewManager.ins().open(ShopGoodsWarn).setData(config.item);
                    return;
                }
                if (this.getItemTxt.text == "合成道具") {
                    ViewManager.ins().open(HeirloomCom);
                }
                else {
                    var cr = this.roleSelect.getCurRole();
                    var r = SubRoles.ins().getSubRoleByIndex(cr);
                    var ifo = r.heirloom.getInfoBySolt(this.curIndex);
                    ViewManager.ins().open(HeirloomDownView, ifo);
                }
                break;
            case this.jihuo:
                var hinfo = this.getInitInfo();
                var curRole = this.roleSelect.getCurRole();
                var role = SubRoles.ins().getSubRoleByIndex(curRole);
                var info = role.heirloom.getInfoBySolt(this.curIndex);
                var slot = this.curIndex + 1;
                if (info && info.lv > 0) {
                    var tips = this.check(hinfo);
                    if (tips == HeirloomWin.Heir_TIPS_1) {
                        Heirloom.ins().sendHeirloomUpLevel(curRole, slot);
                    }
                    else if (tips == HeirloomWin.Heir_TIPS_2) {
                        UserTips.ins().showTips("已满级");
                    }
                    else {
                        var config = GlobalConfig.HeirloomEquipItemConfig[this.curIndex + 1];
                        ViewManager.ins().open(ShopGoodsWarn).setData(config.expend.id);
                    }
                }
                else {
                    var tips = this.check(hinfo);
                    if (tips == HeirloomWin.Heir_TIPS_1) {
                        Heirloom.ins().sendHeirloomAct(curRole, slot);
                    }
                    else {
                        var config = GlobalConfig.HeirloomEquipItemConfig[this.curIndex + 1];
                        ViewManager.ins().open(ShopGoodsWarn).setData(config.item);
                    }
                }
                break;
            case this.attrSet:
                var rId = this.roleSelect.getCurRole();
                ViewManager.ins().open(RoleAttrWin, rId);
                break;
            case this.neatSet:
                var roleId = this.roleSelect.getCurRole();
                ViewManager.ins().open(HeirloomSuit, roleId);
                break;
            case this.icon0.parent:
                var rd = this.roleSelect.getCurRole();
                var crole = SubRoles.ins().getSubRoleByIndex(rd);
                ViewManager.ins().open(HeirloomEquipTipsWin, crole, this.curIndex);
                break;
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    HeirloomWin.prototype.pre = function () {
        var info = this.getInitInfo();
        this.setHeirloom(this.curIndex, HeirloomWin.Heir_LRBtn, info);
    };
    HeirloomWin.prototype.next = function () {
        var info = this.getInitInfo();
        var slot = this.curIndex + 1;
        var level = info.lv ? info.lv + 1 : info.lv + 2;
        var config = this.getSlotInfoByLv(slot, level);
        this.setHeirloom(this.curIndex, HeirloomWin.Heir_LRBtn, config);
    };
    HeirloomWin.prototype.onTap = function (e) {
        var curRole = this.roleSelect.getCurRole();
        var role = SubRoles.ins().getSubRoleByIndex(curRole);
        for (var i = 0; i < 8; i++) {
            this["pos" + i].setSelectIconVisible(false);
            switch (e.currentTarget) {
                case this["pos" + i]:
                    if (this.curIndex == i) {
                        this["pos" + i].setSelectIconVisible(true);
                        ViewManager.ins().open(HeirloomEquipTipsWin, role, i);
                        break;
                    }
                    this.curIndex = i;
                    this.setHeirloom(i, HeirloomWin.Heir_Select);
                    this["pos" + i].setSelectIconVisible(true);
                    break;
            }
        }
    };
    HeirloomWin.prototype.updateData = function () {
        var uplevel = Heirloom.ins().upRequest;
        this.setHeirloom(this.curIndex, HeirloomWin.Heir_Select, null, uplevel);
        if (uplevel)
            Heirloom.ins().upRequest = false;
        this.setSuitLvIcon();
        this.setRedPoint();
        this.updateRedPoint();
        this.setPower();
        var role = EntityManager.ins().getMainRole(this.roleSelect.getCurRole());
        if (role)
            role.setHeirloomSuitEff();
    };
    HeirloomWin.prototype.updateRedPoint = function () {
        for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (!role)
                continue;
            var isShowRedPoint = false;
            for (var j = 0; j < 8; j++) {
                var info = this.getInitInfoEx(role, j);
                var config = void 0;
                if (info.lv) {
                    config = GlobalConfig.HeirloomEquipConfig[info.slot][info.lv];
                }
                else {
                    config = GlobalConfig.HeirloomEquipFireConfig[j + 1];
                }
                var costItemLen = 0;
                var need = 0;
                if (config) {
                    var expend = config.expend;
                    if (!expend) {
                        continue;
                    }
                    var itemData = UserBag.ins().getBagItemById(expend.id);
                    costItemLen = itemData ? itemData.count : 0;
                    need = expend.count;
                }
                if (costItemLen >= need) {
                    isShowRedPoint = true;
                    break;
                }
                else
                    isShowRedPoint = false;
            }
            this.roleSelect.showRedPoint(i, isShowRedPoint);
        }
    };
    HeirloomWin.prototype.initData = function () {
        var info = this.getInitInfo();
        for (var i = 0; i < 8; i++) {
            this.setHeirloom(i, HeirloomWin.Heir_Init, info);
        }
        this["pos0"].setSelectIconVisible(true);
        this.setSuitLvIcon();
        this.setRedPoint();
        this.setPower();
        this.updateRedPoint();
    };
    HeirloomWin.prototype.switchRole = function () {
        this.curIndex = 0;
        this.initData();
    };
    HeirloomWin.prototype.setHeirloom = function (index, init, hinfo, uplevel) {
        var info;
        if (init == HeirloomWin.Heir_Init) {
            info = hinfo;
        }
        else if (init == HeirloomWin.Heir_Select) {
            info = this.getInitInfo(index);
            if (!info.lv) {
                var cfg = GlobalConfig.HeirloomEquipConfig[index + 1][1];
                info.skillname = cfg.skillname;
                info.skilldesc = cfg.skilldesc;
                info.skillicon = cfg.skillicon;
                info.name = cfg.name;
            }
        }
        else {
            info = hinfo;
        }
        if (info) {
            this.setModel(init, index, info);
            this.setUI(init, index, info);
            this.setDesc(init, index, info);
            this.setCost(init, index, info);
        }
        if (init != HeirloomWin.Heir_LRBtn) {
            if (init == HeirloomWin.Heir_Init && index > 0) {
                info = this.getInitInfo(index);
            }
            if (!info.lv) {
                var cfg = GlobalConfig.HeirloomEquipConfig[index + 1][1];
                info.name = cfg.name;
            }
            this["pos" + index].selectIcon.visible = false;
            this["pos" + index].data = { pos: index, info: info, uplevel: uplevel };
        }
        if (init == HeirloomWin.Heir_Init && index == 0 ||
            init == HeirloomWin.Heir_LRBtn ||
            init == HeirloomWin.Heir_Select) {
            var cfg = GlobalConfig.HeirloomEquipConfig[index + 1][1];
            if (info.skillicon) {
                cfg = info;
            }
            if (cfg.skillicon) {
                this.skill.visible = true;
                this.skill.data = {
                    pos: index,
                    info: info,
                    icon: cfg.skillicon,
                    skillname: cfg.skillname,
                    skilldesc: cfg.skilldesc
                };
                this.skill.cleanEff();
            }
        }
    };
    HeirloomWin.prototype.setUI = function (init, index, hinfo) {
        var info;
        if (init == HeirloomWin.Heir_Init) {
            if (index > 0)
                return;
        }
        else if (init == HeirloomWin.Heir_Select) {
            if (this.curIndex != index)
                return;
        }
        else if (init == HeirloomWin.Heir_LRBtn) {
            this.itemName.text = hinfo.name;
            return;
        }
        info = hinfo;
        if (!info.expend || !info.lv)
            this.rightBtn.visible = false;
        else
            this.rightBtn.visible = true;
        this.leftBtn.visible = false;
        if (init == HeirloomWin.Heir_LRBtn) {
            info = this.getInitInfo();
        }
        if (info.lv > 0) {
            this.getItemTxt.textFlow = TextFlowMaker.generateTextFlow("|U&T:分解道具");
            this.jihuo.label = "升  级";
            var config = GlobalConfig.HeirloomEquipItemConfig[this.curIndex + 1];
            var itemData = UserBag.ins().getBagItemById(config.item);
            if (itemData) {
                this.setEff();
            }
            else {
                this.clearEff();
            }
        }
        else {
            this.clearEff();
            var str = "合成道具";
            var config = GlobalConfig.HeirloomEquipItemConfig[this.curIndex + 1];
            if (config.pos == HeirloomSlot.wq) {
                var itemData = UserBag.ins().getBagItemById(config.item);
                if (itemData)
                    str = "获取传世之刃";
            }
            else if (config.pos == HeirloomSlot.yf) {
                var itemData = UserBag.ins().getBagItemById(config.item);
                if (itemData)
                    str = "获取传世神甲";
            }
            this.getItemTxt.textFlow = TextFlowMaker.generateTextFlow("|U&T:" + str);
            this.jihuo.label = "激  活";
        }
        if (info.skillicon) {
            this.skill.visible = true;
            this.skill.data = {
                pos: index,
                info: info,
                icon: info.skillicon,
                skillname: info.skillname,
                skilldesc: info.skilldesc
            };
            this.skill.cleanEff();
        }
        else {
            this.skill.visible = false;
        }
        this.itemName.text = info.name;
    };
    HeirloomWin.prototype.setEff = function () {
        if (!this.resolveMc)
            this.resolveMc = new MovieClip;
        if (!this.resolveMc.parent) {
            this.getItemTxt.parent.addChild(this.resolveMc);
            this.resolveMc.playFile(RES_DIR_EFF + "chargeff1", -1);
            this.resolveMc.touchEnabled = false;
            this.resolveMc.scaleY = 0.6;
            this.resolveMc.scaleX = 0.6;
        }
        this.resolveMc.x = this.getItemTxt.x + 38;
        this.resolveMc.y = this.getItemTxt.y + 9;
    };
    HeirloomWin.prototype.clearEff = function () {
        DisplayUtils.removeFromParent(this.resolveMc);
    };
    HeirloomWin.prototype.setModel = function (init, index, hinfo) {
        var eff = "";
        var info;
        if (init == HeirloomWin.Heir_Init) {
            if (index > 0)
                return;
        }
        else if (init == HeirloomWin.Heir_Select) {
            if (this.curIndex != index)
                return;
        }
        this.removeAni();
        info = hinfo;
        if (info && info.lv > 0) {
            eff = info.model;
        }
        else {
            var config = GlobalConfig.HeirloomEquipConfig[index + 1][1];
            eff = config.model;
        }
        if (!this.modelAni) {
            this.modelAni = new MovieClip;
            this.modelAni.playFile(RES_DIR_EFF + eff, -1);
            this.modelAni.x = this.icon0.x + this.icon0.width / 2;
            this.modelAni.y = this.icon0.y + this.icon0.height / 2;
            this.icon0.parent.addChildAt(this.modelAni, this.icon0.parent.getChildIndex(this.icon0));
            return;
        }
        this.modelAni.playFile(RES_DIR_EFF + eff, -1);
    };
    HeirloomWin.prototype.setDesc = function (init, index, hinfo) {
        var info;
        if (init == HeirloomWin.Heir_Init) {
            if (index > 0)
                return;
        }
        else if (init == HeirloomWin.Heir_Select) {
            if (this.curIndex != index)
                return;
        }
        info = hinfo;
        var attr = [];
        var config;
        if (info && info.lv > 0) {
            attr = info.attr;
        }
        else {
            config = GlobalConfig.HeirloomEquipConfig[index + 1][1];
            attr = config.attr;
        }
        for (var i = 0; i < 6; i++) {
            switch (attr[i].type) {
                case AttributeType.atAttack:
                    this.desc0.text = "攻击";
                    this.attr0.text = "+" + attr[i].value;
                    break;
                case AttributeType.atMaxHp:
                    this.desc1.text = "生命";
                    this.attr1.text = "+" + attr[i].value;
                    break;
                case AttributeType.atDef:
                    this.desc2.text = "物防";
                    this.attr2.text = "+" + attr[i].value;
                    break;
                case AttributeType.atRes:
                    this.desc3.text = "法防";
                    this.attr3.text = "+" + attr[i].value;
                    break;
                case AttributeType.atCrit:
                case AttributeType.atCritHurt:
                    this.desc4.text = "暴击";
                    this.attr4.text = "+" + attr[i].value;
                    break;
                case AttributeType.cruNeiGong:
                case AttributeType.maxNeiGong:
                    this.desc5.text = "内功";
                    this.attr5.text = "+" + attr[i].value;
                    break;
            }
        }
        var swType = info.slot ? info.slot : config.slot;
        var str = "";
        switch (swType) {
            case HeirloomSlot.wq:
                str = "\u6B66\u5668";
                break;
            case HeirloomSlot.tk:
                str = "\u5934\u76D4";
                break;
            case HeirloomSlot.yf:
                str = "\u8863\u670D";
                break;
            case HeirloomSlot.xl:
                str = "\u9879\u94FE";
                break;
            case HeirloomSlot.hw:
                str = "\u624B\u956F";
                break;
            case HeirloomSlot.yd:
                str = "\u8170\u5E26";
                break;
            case HeirloomSlot.jz:
                str = "\u6212\u6307";
                break;
            case HeirloomSlot.xz:
                str = "\u978B\u5B50";
                break;
        }
        var attrAdd = info.attr_add ? info.attr_add : config.attr_add;
        this.desc6.text = str + "部件所有属性";
        this.attr6.text = "+" + attrAdd + "%";
        this.attr6.x = this.desc6.x + this.desc6.width + 20;
    };
    HeirloomWin.prototype.setCost = function (init, index, hinfo) {
        var info;
        if (init == HeirloomWin.Heir_Init) {
            if (index > 0)
                return;
            info = hinfo;
        }
        else if (init == HeirloomWin.Heir_Select) {
            if (this.curIndex != index)
                return;
            info = hinfo;
        }
        else if (init == HeirloomWin.Heir_LRBtn) {
            info = this.getInitInfo();
        }
        var config;
        if (info.lv > 0) {
            config = GlobalConfig.HeirloomEquipConfig[info.slot][info.lv];
        }
        else {
            config = GlobalConfig.HeirloomEquipFireConfig[index + 1];
        }
        if (config) {
            var expend = config.expend;
            this.jihuo.visible = true;
            this.expendLabel.text = "消耗: ";
            if (!expend) {
                this.expendLabel.text = "";
                this.countLabel.text = "已满级";
                this.jihuo.visible = false;
                return;
            }
            var equipConfig = GlobalConfig.ItemConfig[expend.id];
            if (!equipConfig) {
                return;
            }
            this.icon.source = equipConfig.icon.toString() + "_png";
            var itemData = UserBag.ins().getBagItemById(expend.id);
            var costItemLen = itemData ? itemData.count : 0;
            var colorStr = "";
            if (costItemLen >= expend.count)
                colorStr = ColorUtil.GREEN_COLOR;
            else
                colorStr = ColorUtil.RED_COLOR;
            this.countLabel.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + costItemLen + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + expend.count + "</font> ");
        }
    };
    HeirloomWin.prototype.check = function (info) {
        var config;
        var func;
        var costItemLen = 0;
        var need = 0;
        if (info.lv > 0) {
            config = GlobalConfig.HeirloomEquipConfig[info.slot][info.lv];
        }
        else {
            config = GlobalConfig.HeirloomEquipFireConfig[this.curIndex + 1];
        }
        if (config) {
            var expend = config.expend;
            if (!expend) {
                return HeirloomWin.Heir_TIPS_2;
            }
            var equipConfig = GlobalConfig.ItemConfig[expend.id];
            if (!equipConfig) {
                return HeirloomWin.Heir_TIPS_0;
            }
            var itemData = UserBag.ins().getBagItemById(expend.id);
            costItemLen = itemData ? itemData.count : 0;
            need = expend.count;
        }
        if (costItemLen >= need) {
            return HeirloomWin.Heir_TIPS_1;
        }
        return HeirloomWin.Heir_TIPS_0;
    };
    HeirloomWin.prototype.getInitInfoEx = function (role, index) {
        var idx = index;
        var info = role.heirloom.getInfoBySolt(idx);
        return info;
    };
    HeirloomWin.prototype.getInitInfo = function (index) {
        var idx = index != null ? index : this.curIndex;
        var curRole = this.roleSelect.getCurRole();
        var role = SubRoles.ins().getSubRoleByIndex(curRole);
        var info = role.heirloom.getInfoBySolt(idx);
        return info;
    };
    HeirloomWin.prototype.getSlotInfoByLv = function (slot, lv) {
        var curRole = this.roleSelect.getCurRole();
        var role = SubRoles.ins().getSubRoleByIndex(curRole);
        var config = GlobalConfig.HeirloomEquipConfig[slot][lv];
        return config;
    };
    HeirloomWin.prototype.setSuitLvIcon = function () {
        var curRole = this.roleSelect.getCurRole();
        var role = SubRoles.ins().getSubRoleByIndex(curRole);
        var hinfos = role.heirloom.getData();
        var minLv = 0;
        var everyLv = true;
        for (var i = 0; i < hinfos.length; i++) {
            var info = hinfos[i];
            if (i == 0)
                minLv = info.lv;
            if (!info.lv && everyLv)
                everyLv = false;
            if (info.lv <= minLv)
                minLv = info.lv;
        }
        this.neatSet.currentState = minLv.toString();
    };
    HeirloomWin.prototype.setRedPoint = function () {
        var isShowRedPoint = false;
        for (var i = 0; i < 8; i++) {
            var info = this.getInitInfo(i);
            var config = void 0;
            if (info.lv) {
                config = GlobalConfig.HeirloomEquipConfig[info.slot][info.lv];
            }
            else {
                config = GlobalConfig.HeirloomEquipFireConfig[i + 1];
            }
            var costItemLen = 0;
            var need = 0;
            if (config) {
                var expend = config.expend;
                if (!expend) {
                    this["pos" + i].redPoint.visible = false;
                    continue;
                }
                var itemData = UserBag.ins().getBagItemById(expend.id);
                costItemLen = itemData ? itemData.count : 0;
                need = expend.count;
            }
            if (costItemLen >= need)
                this["pos" + i].redPoint.visible = true;
            else
                this["pos" + i].redPoint.visible = false;
            if (!this["pos" + i].redPoint.visible) {
                var cfg = GlobalConfig.HeirloomEquipItemConfig[config.slot];
                var itemData = UserBag.ins().getBagItemById(cfg.item);
                this["pos" + i].redPoint.visible = itemData ? true : false;
            }
            if (!isShowRedPoint)
                isShowRedPoint = this["pos" + i].redPoint.visible;
        }
        if (isShowRedPoint) {
            var curRole = this.roleSelect.getCurRole();
            this.roleSelect.showRedPoint(curRole, isShowRedPoint);
        }
    };
    HeirloomWin.prototype.setPower = function () {
        var roleId = this.roleSelect.getCurRole();
        var power = SubRoles.ins().getSubRoleByIndex(roleId).getAllHeirloomPower();
        this.powerPanel.setPower(power);
    };
    HeirloomWin.Heir_Init = 1;
    HeirloomWin.Heir_Select = 2;
    HeirloomWin.Heir_LRBtn = 3;
    HeirloomWin.Heir_TIPS_0 = 0;
    HeirloomWin.Heir_TIPS_1 = 1;
    HeirloomWin.Heir_TIPS_2 = 2;
    return HeirloomWin;
}(BaseEuiView));
__reflect(HeirloomWin.prototype, "HeirloomWin");
ViewManager.ins().reg(HeirloomWin, LayerManager.UI_Main);
//# sourceMappingURL=HeirloomWin.js.map