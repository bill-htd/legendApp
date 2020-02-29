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
var WeaponWin = (function (_super) {
    __extends(WeaponWin, _super);
    function WeaponWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        return _this;
    }
    WeaponWin.prototype.closeSoulCondition = function (b) {
        this.normal.visible = b;
        this.soul.visible = !b;
    };
    WeaponWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.leftbtn, this.onEvent);
        this.removeTouchEvent(this.rightbtn, this.onEvent);
        this.removeTouchEvent(this.active, this.onEvent);
        this.removeTouchEvent(this.turnBtn, this.onEvent);
        this.removeTouchEvent(this.backBtn, this.onEvent);
        this.removeTouchEvent(this.leftbtn0, this.onEvent);
        this.removeTouchEvent(this.rightbtn0, this.onEvent);
        this.removeTouchEvent(this.list1, this.onClick);
        this.list0.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSoulClick, this);
        this.removeObserve();
        ViewManager.ins().getView(ForgeWin).isNotMove = false;
    };
    WeaponWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        ViewManager.ins().getView(ForgeWin).isNotMove = true;
        this.roleId = param[0];
        this.addTouchEvent(this.leftbtn, this.onEvent);
        this.addTouchEvent(this.rightbtn, this.onEvent);
        this.addTouchEvent(this.active, this.onEvent);
        this.addTouchEvent(this.turnBtn, this.onEvent);
        this.addTouchEvent(this.backBtn, this.onEvent);
        this.addTouchEvent(this.leftbtn0, this.onEvent);
        this.addTouchEvent(this.rightbtn0, this.onEvent);
        this.addTouchEvent(this.list1, this.onClick);
        this.addEvent(eui.UIEvent.CHANGE_END, this.list1Scroll, this.onChange);
        this.addEvent(eui.UIEvent.CHANGE_END, this.list0Scroll, this.onChangeFlex);
        this.list0.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSoulClick, this);
        this.observe(Weapons.ins().postWeaponsAct, this.callback);
        this.observe(Weapons.ins().postWeaponsUse, this.callback);
        this.observe(Weapons.ins().postWeaponsUpLevel, this.callback);
        this.observe(Weapons.ins().postWeaponsFlexibleAct, this.callback);
        this.observe(Weapons.ins().postWeaponsFlexibleCount, this.callback);
        this.list1.itemRenderer = WeaponListItem;
        this.list0.itemRenderer = WeaponListItem;
        this.leftbtn.parent.touchEnabled = false;
        this.weaponId = 1;
        this.weaponFlexible = 0;
        this.closeSoulCondition(param[1]);
        this.updateBtn();
        this.init(this.weaponId);
    };
    WeaponWin.prototype.updateBtn = function () {
        this.turnBtn.visible = true;
    };
    WeaponWin.prototype.init = function (selectId) {
        this.soulArr = [];
        this.listdata = [];
        this.dataArr = new eui.ArrayCollection(this.listdata);
        var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
        for (var k in GlobalConfig.WeaponSoulConfig) {
            var wsconfig = GlobalConfig.WeaponSoulConfig[k];
            var wsinfo = role.weapons.getSoulInfoData()[wsconfig.id];
            var wss = role.weapons.getSuitConfig(wsconfig.id);
            var tmp = {
                isuse: role.weapons.weaponsId == wsconfig.id ? true : false,
                id: wsinfo && wsinfo.id && wss ? wss.id : 0,
                isRedPoint: role.weapons.getRedPointBySuit(wsconfig.id),
                level: wsinfo && wsinfo.id && wss ? wss.level : 0,
                isSelect: k == selectId.toString() ? true : false,
                showId: wsconfig.id,
                job: role.job
            };
            this.listdata.push(tmp);
            if (wsinfo && wsinfo.id && wss)
                this.soulArr.push(tmp);
        }
        this.updateUI();
        this.list1.dataProvider = this.dataArr;
        this.list1.scrollH = 0;
        this.onChange();
        this.updateSoul(this.soulArr, true);
        this.updateRedPoint();
        this.onChangeFlex();
    };
    WeaponWin.prototype.setSelectId = function (selectId) {
        for (var i = 0; i < this.listdata.length; i++) {
            var tmp = this.listdata[i];
            tmp.isSelect = i == selectId ? true : false;
        }
        this.dataArr.replaceAll(this.listdata);
        this.list1.dataProvider = this.dataArr;
    };
    WeaponWin.prototype.onSoulClick = function (e) {
        if (e && e.itemRenderer && e.item) {
            var info = e.item;
            var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
            var fb = role.weapons.getFlexibleData();
            var wsconfig = role.weapons.getSuitConfig(info.id);
            if (wsconfig) {
                var color = "";
                if (info.isuse) {
                    color = "|C:0xffd93f&T:";
                    this.active.visible = true;
                }
                else {
                    this.active.visible = role.weapons.flexibleCount <= fb.length ? false : true;
                }
                this.weaponFlexible = wsconfig.id;
                this.skillicon0.data = { icon: wsconfig.skillicon };
                this.skill.textFlow = TextFlowMaker.generateTextFlow1(color + wsconfig.skilldesc);
                this.skillname0.textFlow = TextFlowMaker.generateTextFlow1(wsconfig.skillname);
            }
            else {
                this.weaponFlexible = 0;
            }
            if (info.isuse) {
                this.active.label = "取  消";
                this.redPoint.visible = false;
            }
            else {
                this.active.label = "激  活";
                this.redPoint.visible = role.weapons.flexibleCount <= fb.length ? false : true;
            }
        }
    };
    WeaponWin.prototype.onClick = function (e) {
        var selectIndex = e.currentTarget.selectedIndex;
        selectIndex = selectIndex > 0 ? selectIndex : 0;
        if (this.listdata[selectIndex]) {
            this.weaponId = this.listdata[selectIndex].showId;
            this.setSelectId(selectIndex);
            ViewManager.ins().open(WeaponPanel, this.roleId, this.weaponId);
        }
        this.onChange();
    };
    WeaponWin.prototype.onChange = function () {
        if (this.list1.scrollH < 150) {
            this.leftbtn.visible = false;
            this.rightbtn.visible = true;
        }
        else if (this.list1.scrollH >= (this.list1.dataProvider.length - 3) * 150) {
            this.leftbtn.visible = true;
            this.rightbtn.visible = false;
        }
        else {
            this.leftbtn.visible = true;
            this.rightbtn.visible = true;
        }
    };
    WeaponWin.prototype.onChangeFlex = function () {
        if (this.nothingTips.visible) {
            this.leftbtn0.visible = false;
            this.rightbtn0.visible = false;
            return;
        }
        var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
        if (role && this.soulArr.length <= 3) {
            this.leftbtn0.visible = false;
            this.rightbtn0.visible = false;
            return;
        }
        if (this.list0.scrollH < 150) {
            this.leftbtn0.visible = false;
            this.rightbtn0.visible = true;
        }
        else if (this.list0.scrollH >= (this.list0.dataProvider.length - 3) * 150) {
            this.leftbtn0.visible = true;
            this.rightbtn0.visible = false;
        }
        else {
            this.leftbtn0.visible = true;
            this.rightbtn0.visible = true;
        }
    };
    WeaponWin.prototype.onEvent = function (e) {
        var num = 150 * 3;
        switch (e.currentTarget) {
            case this.leftbtn:
                if (this.list1.scrollH <= num)
                    this.list1.scrollH = 0;
                else
                    this.list1.scrollH -= num;
                break;
            case this.rightbtn:
                if (this.list1.scrollH >= ((this.list1.dataProvider.length - 3) * 150))
                    this.list1.scrollH = (this.list1.dataProvider.length - 3) * 150;
                else
                    this.list1.scrollH += num;
                break;
            case this.leftbtn0:
                if (this.list0.scrollH <= num)
                    this.list0.scrollH = 0;
                else
                    this.list0.scrollH -= num;
                break;
            case this.rightbtn0:
                if (this.list0.scrollH >= ((this.list0.dataProvider.length - 3) * 150))
                    this.list0.scrollH = (this.list0.dataProvider.length - 3) * 150;
                else
                    this.list0.scrollH += num;
                break;
            case this.active:
                if (this.active.label == "激  活") {
                    var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
                    var fb = role.weapons.getFlexibleData();
                    if (role.weapons.flexibleCount <= fb.length) {
                        UserTips.ins().showCenterTips("\u5F53\u524D\u5DF2\u6FC0\u6D3B" + role.weapons.flexibleCount + "\u4E2A\u5175\u9B42\u6280\u80FD\uFF0C\u8BF7\u5148\u53D6\u6D88\u4EFB\u610F\u4E00\u4E2A");
                        return;
                    }
                    if (!this.weaponFlexible) {
                        UserTips.ins().showCenterTips("兵魂之灵激活数据异常");
                        return;
                    }
                    this.isSendActFlex = true;
                    Weapons.ins().sendWeaponsFlexibleAct(this.roleId, WeaponFlex.act, this.weaponFlexible);
                }
                else if (this.active.label == "取  消") {
                    if (!this.weaponFlexible) {
                        UserTips.ins().showCenterTips("兵魂之灵取消数据异常");
                        return;
                    }
                    this.isSendActFlex = true;
                    Weapons.ins().sendWeaponsFlexibleAct(this.roleId, WeaponFlex.cancel, this.weaponFlexible);
                }
                break;
            case this.turnBtn:
                this.close();
                this.open(this.roleId, false);
                var v = ViewManager.ins().getView(ForgeWin);
                if (v)
                    v.redPointEx();
                var item = UserBag.ins().getBagItemById(GlobalConfig.WeaponSoulBaseConfig.itemid);
                var r = SubRoles.ins().getSubRoleByIndex(this.roleId);
                if (item && r.weapons.flexibleCount - 1 < GlobalConfig.WeaponSoulBaseConfig.maxItemNum) {
                    ViewManager.ins().open(RoleChooseItemWin, this.roleId);
                }
                break;
            case this.backBtn:
                if (!UserBag.ins().getBagItemById(GlobalConfig.WeaponSoulBaseConfig.itemid)) {
                    UserTips.ins().showTips("\u80CC\u5305\u5185\u6CA1\u6709\u5175\u9B42\u4E4B\u7075");
                    return;
                }
                ViewManager.ins().open(RoleChooseItemWin, this.roleId);
                break;
        }
        this.onChange();
        this.onChangeFlex();
    };
    WeaponWin.prototype.updateUI = function () {
        var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
        this.powerPanel.setPower(role.getWeaponTotalPower());
        var filterAttr = [4, 2, 6, 5];
        var attrValue = [0, 0, 0, 0];
        var isHave = false;
        var infodata = role.weapons.getInfoData();
        for (var k in infodata) {
            var wsinfo = infodata[k];
            for (var w in wsinfo) {
                var info = wsinfo[w];
                for (var j = 0; j < info.attr.length; j++) {
                    var attr = info.attr[j];
                    if (filterAttr.indexOf(attr.type) != -1) {
                        for (var z = 0; z < filterAttr.length; z++) {
                            if (filterAttr[z] == attr.type) {
                                attrValue[z] += attr.value;
                                isHave = true;
                            }
                        }
                    }
                }
            }
        }
        var index = role.weapons.flexibleCount ? role.weapons.flexibleCount - 1 : 0;
        var cfg = GlobalConfig.WeaponSoulItemAttr[index];
        if (isHave && cfg) {
            for (var i = 0; i < cfg.attr.length; i++) {
                if (filterAttr.indexOf(cfg.attr[i].type) != -1) {
                    for (var z = 0; z < filterAttr.length; z++) {
                        if (filterAttr[z] == cfg.attr[i].type)
                            attrValue[z] += cfg.attr[i].value;
                    }
                }
            }
        }
        for (var i = 0; i < 4; i++) {
            if (this["attr" + i]) {
                var attname = AttributeData.getAttrStrByType(filterAttr[i]);
                this["attr" + i].text = attname + "+" + attrValue[i];
            }
        }
    };
    WeaponWin.prototype.callback = function () {
        this.soulArr = [];
        var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
        var wss = role.weapons.getSuitConfig(this.weaponId);
        for (var k in this.listdata) {
            var wsinfo = role.weapons.getSoulInfoData()[this.listdata[k].showId];
            var info = this.listdata[k];
            if (info.showId == this.weaponId) {
                info.isuse = role.weapons.weaponsId == this.weaponId ? true : false;
                info.id = wsinfo && wsinfo.id && wss ? wss.id : 0;
                info.isRedPoint = role.weapons.getRedPointBySuit(info.showId);
                info.level = wsinfo && wsinfo.id && wss ? wss.level : 0;
                info.isSelect = true;
                info.showId = info.showId;
            }
            else {
                info.isRedPoint = role.weapons.getRedPointBySuit(info.showId);
                info.isSelect = false;
                info.isuse = info.showId == role.weapons.weaponsId;
            }
            if (wsinfo && wsinfo.id && wss)
                this.soulArr.push(info);
        }
        this.updateUI();
        this.dataArr.replaceAll(this.listdata);
        this.list1.dataProvider = this.dataArr;
        this.updateSoul(this.soulArr);
        this.updateActLabel();
        this.updateRedPoint();
    };
    WeaponWin.prototype.updateSoul = function (arr, init) {
        var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
        this.soulArr = [];
        if (role.weapons.flexibleCount) {
            for (var i = 0; i < arr.length; i++) {
                var info = {
                    isuse: Weapons.ins().checkIsUseFlexible(role.index, arr[i].id),
                    id: arr[i].id,
                    isRedPoint: ForgeRedPoint.ins().getFlexibleRedPointOnly(role.index, arr[i].showId),
                    level: arr[i].level,
                    isSelect: arr[i].isSelect,
                    showId: arr[i].showId,
                    job: arr[i].job
                };
                this.soulArr.push(info);
            }
        }
        this.list0.dataProvider = new eui.ArrayCollection(this.soulArr);
        var count = role.weapons.flexibleCount ? role.weapons.flexibleCount - 1 : 0;
        this.desc.textFlow = TextFlowMaker.generateTextFlow1("|C:0xF8B141&T:\u5F53\u524D\u5DF2\u4F7F\u7528|C:0x00ff00&T:" + count + "|C:0xF8B141&T:\u4E2A\u5175\u9B42\u4E4B\u7075\uFF0C\u6700\u591A\u53EF\u4EE5\u540C\u65F6\u6FC0\u6D3B|C:0x00ff00&T:" + (count + 1) + "|C:0xF8B141&T:\u628A\u5175\u9B42\u6280\u80FD\u6548\u679C");
        if (init) {
            if (this.soulArr.length > 0 && role.weapons.flexibleCount) {
                this.active.visible = this.skillicon0.visible = this.skill.visible = this.skillname0.visible = true;
                var wsconfig = role.weapons.getSuitConfig(this.soulArr[0].id);
                if (wsconfig) {
                    var color = "";
                    if (this.soulArr[0].isuse)
                        color = "|C:0xffd93f&T:";
                    this.skillicon0.data = { icon: wsconfig.skillicon };
                    this.skill.textFlow = TextFlowMaker.generateTextFlow1(color + wsconfig.skilldesc);
                    this.skillname0.textFlow = TextFlowMaker.generateTextFlow1(wsconfig.skillname);
                }
                this.leftbtn0.visible = this.rightbtn0.visible = false;
                if (this.soulArr.length > 3) {
                    this.rightbtn0.visible = true;
                }
                if (this.soulArr[0].isuse) {
                    this.active.label = "取  消";
                    this.redPoint.visible = false;
                }
                else {
                    this.active.label = "激  活";
                    var fb = role.weapons.getFlexibleData();
                    this.active.visible = this.redPoint.visible = role.weapons.flexibleCount <= fb.length ? false : true;
                }
                this.weaponFlexible = this.soulArr[0].showId;
            }
            else {
                this.redPoint.visible = false;
                this.leftbtn0.visible = this.rightbtn0.visible = false;
                this.active.visible = this.skillicon0.visible = this.skill.visible = this.skillname0.visible = false;
            }
            this.nothingTips.visible = !this.skillicon0.visible;
            if (this.nothingTips.visible) {
                if (!role.weapons.flexibleCount)
                    this.nothingTips.text = "\u8BE5\u89D2\u8272\u5C1A\u672A\u4F7F\u7528\u5175\u9B42\u4E4B\u7075";
                else
                    this.nothingTips.text = "\u76EE\u524D\u5C1A\u672A\u6FC0\u6D3B\u4EFB\u4F55\u5175\u9B42";
            }
        }
    };
    WeaponWin.prototype.updateActLabel = function () {
        if (!this.isSendActFlex) {
            this.isSendActFlex = false;
            return;
        }
        var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
        var fb = role.weapons.getFlexibleData();
        this.isSendActFlex = false;
        var str = this.skill.text;
        if (this.active.label == "激  活") {
            this.active.label = "取  消";
            this.redPoint.visible = false;
            this.skill.textFlow = TextFlowMaker.generateTextFlow1("|C:0xffd93f&T:" + str);
        }
        else if (this.active.label == "取  消") {
            this.active.label = "激  活";
            this.active.visible = this.redPoint.visible = role.weapons.flexibleCount <= fb.length ? false : true;
            this.skill.textFlow = TextFlowMaker.generateTextFlow1("|C:0x898989&T:" + str);
        }
    };
    WeaponWin.prototype.destoryView = function () {
        _super.prototype.destoryView.call(this);
    };
    WeaponWin.prototype.isShowSoul = function () {
        if (!this.soul)
            return false;
        return this.soul.visible;
    };
    WeaponWin.prototype.updateRedPoint = function () {
        var item = UserBag.ins().getBagItemById(GlobalConfig.WeaponSoulBaseConfig.itemid);
        var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
        this.redPoint0.visible = ForgeRedPoint.ins().getFlexibleRedPoint(this.roleId) || (item && role.weapons.flexibleCount - 1 < GlobalConfig.WeaponSoulBaseConfig.maxItemNum) ? true : false;
        this.backBtn.visible = this.redPoint1.visible = (item && role.weapons.flexibleCount - 1 < GlobalConfig.WeaponSoulBaseConfig.maxItemNum) ? true : false;
    };
    return WeaponWin;
}(BaseEuiView));
__reflect(WeaponWin.prototype, "WeaponWin");
//# sourceMappingURL=WeaponWin.js.map