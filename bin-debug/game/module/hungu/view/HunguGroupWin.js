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
var HunguGroupWin = (function (_super) {
    __extends(HunguGroupWin, _super);
    function HunguGroupWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "hunguGroupSkin";
        return _this;
    }
    HunguGroupWin.prototype.childrenCreated = function () {
    };
    HunguGroupWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    HunguGroupWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTap);
        this.roleId = param[0];
        this.id = param[1];
        this.updateShow();
    };
    HunguGroupWin.prototype.updateShow = function () {
        this.itemData = [];
        this.init();
        var suit = Hungu.ins().getSuitData(this.roleId);
        if (CommonUtils.getObjectLength(suit) && suit[this.id]) {
            this.itemData = [];
            this.suit2 = "";
            this.suit4 = "";
            this.suit6 = "";
            var list = this.getPosColorName(this.id);
            var stages = [];
            for (var i in suit[this.id]) {
                if (stages.indexOf(suit[this.id][i].stage) == -1)
                    stages.push(suit[this.id][i].stage);
            }
            var qualityName = "";
            for (var s = 0; s < stages.length; s++) {
                var quality = stages[s];
                qualityName = GlobalConfig.HunGuConf.suitName[this.id - 1][quality <= 1 ? 0 : (quality - 1)];
                var lightPos = [];
                var suits = [];
                for (var i in GlobalConfig.HunGuSuit[this.id]) {
                    for (var j = 0; j < suit[this.id][i].count.length; j++) {
                        var itemId = suit[this.id][i].count[j];
                        var tpos = ItemConfig.getSubType(GlobalConfig.ItemConfig[itemId]);
                        if (lightPos.indexOf(tpos) == -1)
                            lightPos.push(tpos);
                    }
                    var hgsuit = GlobalConfig.HunGuSuit[this.id][i][quality];
                    var color = 0;
                    if (suit[this.id][i].stage == quality && suit[this.id][i].count.length >= (+i))
                        color = ColorUtil.GREEN_COLOR_N;
                    else
                        color = ColorUtil.GRAY_COLOR2;
                    if (!hgsuit) {
                        hgsuit = GlobalConfig.HunGuSuit[this.id][i][1];
                    }
                    if (hgsuit.dec) {
                        suits.push("|C:" + color + "&T:" + i + "\u4EF6:" + hgsuit.dec);
                    }
                }
                var posName = "";
                for (var i = 0; i < list.length; i++) {
                    var color = 0;
                    if (lightPos.indexOf(list[i]) == -1) {
                        color = ColorUtil.GRAY_COLOR2;
                    }
                    else {
                        color = ColorUtil.GREEN_COLOR_N;
                    }
                    posName += "|C:" + color + "&T:" + Hungu.ins().getHunguPosName(list[i]) + "  ";
                }
                this.itemData.push({ qualityName: qualityName, posName: posName, suits: suits });
            }
            if (stages.length == 1) {
                var isShowNext = true;
                if (Hungu.ins().hunguData[this.roleId]) {
                    for (var i in Hungu.ins().hunguData[this.roleId].items) {
                        if (list.indexOf(Number(i)) == -1)
                            continue;
                        var itemId = Hungu.ins().hunguData[this.roleId].items[i].itemId;
                        if (!itemId || GlobalConfig.HunGuEquip[itemId].stage != stages[0]) {
                            isShowNext = false;
                            break;
                        }
                    }
                }
                if (isShowNext) {
                    var suits2 = [];
                    for (var i in GlobalConfig.HunGuSuit[this.id]) {
                        if (!suit[this.id][+i])
                            continue;
                        var maxStage = CommonUtils.getObjectLength(GlobalConfig.HunGuSuit[this.id][+i]);
                        var curStage = suit[this.id][+i].stage;
                        if (curStage != maxStage) {
                            var nextStage = curStage + 1;
                            var qualityName_1 = GlobalConfig.HunGuConf.suitName[this.id - 1][nextStage <= 1 ? 0 : (nextStage - 1)];
                            var posName = "";
                            for (var j = 0; j < list.length; j++) {
                                posName += "|C:" + ColorUtil.GRAY_COLOR2 + "&T:" + Hungu.ins().getHunguPosName(list[j]) + "  ";
                            }
                            for (var j in GlobalConfig.HunGuSuit[this.id]) {
                                var hgsuit = GlobalConfig.HunGuSuit[this.id][j][nextStage];
                                if (hgsuit.dec) {
                                    suits2.push("|C:" + ColorUtil.GRAY_COLOR2 + "&T:" + j + "\u4EF6:" + hgsuit.dec);
                                }
                            }
                            this.itemData.push({ qualityName: qualityName_1, posName: posName, suits: suits2 });
                            break;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < this.itemData.length; i++) {
            var hgitem = new HunguGroupItem();
            hgitem.data = { qualityName: this.itemData[i].qualityName, posName: this.itemData[i].posName, suits: this.itemData[i].suits };
            this.content.addChild(hgitem);
        }
    };
    HunguGroupWin.prototype.getPosColorName = function (id) {
        var list = [];
        for (var i = 0; i < GlobalConfig.HunGuConf.suit[id].length; i++) {
            list.push(GlobalConfig.HunGuConf.suit[id][i]);
        }
        return list;
    };
    HunguGroupWin.prototype.init = function (id) {
        if (id === void 0) { id = this.id; }
        var specalstr = (id == 1) ? "特殊" : "魂骨";
        var qualityName = "\u3010\u51E1\u54C1" + specalstr + "\u5171\u9E23\u3011";
        var suitType = GlobalConfig.HunGuConf.suit[id];
        var posName = "";
        this.suit2 = "";
        this.suit4 = "";
        this.suit6 = "";
        for (var i = 0; i < suitType.length; i++) {
            posName += "|C:" + ColorUtil.GRAY_COLOR2 + "&T:" + Hungu.ins().getHunguPosName(suitType[i]) + "  ";
        }
        var suits = [];
        for (var k in GlobalConfig.HunGuSuit[id]) {
            var hgsuit = GlobalConfig.HunGuSuit[id][k][1];
            if (hgsuit.specialAttrs)
                suits.push("|C:" + ColorUtil.GRAY_COLOR2 + "&T:" + k + "\u4EF6:\u88C5\u5907\u57FA\u7840\u5C5E\u6027+" + hgsuit.specialAttrs / 100 + "%");
            else {
                var valueStr = "";
                for (var j = 0; j < hgsuit.attrs.length; j++) {
                    valueStr += AttributeData.getAttrStrByType(hgsuit.attrs[j].type) + "+" + hgsuit.attrs[j].value + "  ";
                }
                if (hgsuit.dec) {
                    suits.push("|C:" + ColorUtil.GRAY_COLOR2 + "&T:" + k + "\u4EF6:" + hgsuit.dec);
                }
            }
        }
        this.itemData.push({ qualityName: qualityName, posName: posName, suits: suits });
    };
    HunguGroupWin.prototype.onTap = function (e) {
        ViewManager.ins().close(this);
    };
    return HunguGroupWin;
}(BaseEuiView));
__reflect(HunguGroupWin.prototype, "HunguGroupWin");
ViewManager.ins().reg(HunguGroupWin, LayerManager.UI_Popup);
//# sourceMappingURL=HunguGroupWin.js.map