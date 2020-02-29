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
var PunchEquipAttrWin = (function (_super) {
    __extends(PunchEquipAttrWin, _super);
    function PunchEquipAttrWin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PunchEquipAttrWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.skinName = "PunchEquipAttrSkin";
    };
    PunchEquipAttrWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
        this.setView();
    };
    PunchEquipAttrWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeObserve();
    };
    PunchEquipAttrWin.prototype.setView = function () {
        var attData = [];
        var extAttData = [];
        for (var i = 0; i < 8; i++) {
            var item = UserSkill.ins().equipListData[i];
            for (var k in item.att) {
                if (item.att[k].type != 0 && item.att[k].value != 0) {
                    var obj = item.att[k];
                    if (!attData[obj.type]) {
                        attData[obj.type] = obj.value;
                    }
                    else {
                        attData[obj.type] += obj.value;
                    }
                }
            }
            if (item.configID) {
                var data = GlobalConfig.EquipConfig[item.configID];
                for (var m in AttributeData.translate) {
                    if (!data[m] || data[m] <= 0) {
                        continue;
                    }
                    else {
                        var type_1 = Role.getAttrTypeByName(m);
                        if (!attData[type_1]) {
                            attData[type_1] = data[m];
                        }
                        else {
                            attData[type_1] += data[m];
                        }
                    }
                }
                if (data.baseAttr1) {
                    if (!attData[data.baseAttr1.type]) {
                        attData[data.baseAttr1.type] = data.baseAttr1.value;
                    }
                    else {
                        attData[data.baseAttr1.type] += data.baseAttr1.value;
                    }
                }
                if (data.baseAttr2) {
                    if (!attData[data.baseAttr2.type]) {
                        attData[data.baseAttr2.type] = data.baseAttr2.value;
                    }
                    else {
                        attData[data.baseAttr2.type] += data.baseAttr2.value;
                    }
                }
                if (data.exAttr1) {
                    if (!extAttData[data.exAttr1.type]) {
                        extAttData[data.exAttr1.type] = data.exAttr1.value;
                    }
                    else {
                        extAttData[data.exAttr1.type] += data.exAttr1.value;
                    }
                }
                if (data['exAttr2']) {
                    if (!extAttData[data['exAttr2'].type]) {
                        extAttData[data['exAttr2'].type] = data['exAttr2'].value;
                    }
                    else {
                        extAttData[data['exAttr2'].type] += data['exAttr2'].value;
                    }
                }
            }
        }
        var str = "";
        var attName = "";
        var value = 0;
        var type = 0;
        for (var l in attData) {
            type = Number(l);
            value = attData[l];
            attName = AttributeData.getAttrStrByType(type);
            if (attName.length < 3)
                attName = AttributeData.inserteBlank(attName, 4);
            if (type > 1 && type < 9) {
                if (type == 7 || type == 8) {
                    str += attName + "：" + value / 100 + "%";
                }
                else {
                    str += attName + "：" + value;
                }
            }
            else if (type > 12 && type < 15 || type > 15) {
                if (type == AttributeType.atCritEnhance)
                    str += attName + "：" + (value / 100 + 150) + "%";
                else
                    str += attName + "：" + value / 100 + "%";
            }
            else
                continue;
            str += "\n";
        }
        for (var l in extAttData) {
            type = Number(l);
            value = extAttData[l];
            attName = AttributeData.getExtAttrStrByType(type);
            str += attName + "：" + value / 100 + "%";
            str += "\n";
        }
        if (str == "")
            str = "无";
        this.baseAttr.text = str;
        this.anigroup.height = this.baseAttr.height + 150;
    };
    PunchEquipAttrWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return PunchEquipAttrWin;
}(BaseEuiView));
__reflect(PunchEquipAttrWin.prototype, "PunchEquipAttrWin");
ViewManager.ins().reg(PunchEquipAttrWin, LayerManager.UI_Popup);
//# sourceMappingURL=PunchEquipAttrWin.js.map