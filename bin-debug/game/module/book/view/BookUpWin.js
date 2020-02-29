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
var BookUpWin = (function (_super) {
    __extends(BookUpWin, _super);
    function BookUpWin() {
        var _this = _super.call(this) || this;
        _this.jobName = ["战士", "法师", "道士"];
        _this.skinName = "tujianshengxing";
        _this.list.itemRenderer = BookUpItem;
        _this.listOpen.dataProvider = null;
        _this.listOpen.itemRenderer = BookItem;
        _this.isTopLevel = true;
        _this.smeltEquips = [];
        _this.smeltEquips.length = 10;
        _this.dataInfo = new eui.ArrayCollection(_this.smeltEquips);
        _this.list.dataProvider = _this.dataInfo;
        _this.barbc = new ProgressBarEff();
        _this.barbc.setWidth(450);
        _this.barbc.x = -10;
        _this.barbc.y = -15;
        _this.barGroup.addChild(_this.barbc);
        return _this;
    }
    BookUpWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.selectData = param[0];
        this.observe(Book.ins().postDataChange, this.updateView);
        this.updateView();
        this.addTouchEvent(this.btnUp, this.onTap);
        this.addTouchEvent(this.info, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
    };
    BookUpWin.prototype.close = function () {
        this.removeTouchEvent(this.btnUp, this.onTap);
        this.removeTouchEvent(this.info, this.onTap);
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeObserve();
    };
    BookUpWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.btnUp:
                var id = Book.ins().getSuitIdByBookId(this.selectData.id);
                if (!id)
                    return;
                var isHaveJob = false;
                var roleJob = Book.jobs.indexOf(Number(id));
                if (roleJob != -1) {
                    for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
                        var role = SubRoles.ins().getSubRoleByIndex(i);
                        if (!role)
                            continue;
                        if (role.job == (roleJob + 1)) {
                            isHaveJob = true;
                            break;
                        }
                    }
                    if (!isHaveJob) {
                        UserTips.ins().showTips("|C:0xff0000&T:\u8BF7\u5148\u5F00\u542F" + this.jobName[roleJob] + "\u804C\u4E1A");
                        return;
                    }
                }
                var config = GlobalConfig.DecomposeConfig[this.selectData.id];
                var itemId = config.itemId;
                var name_1 = config.name;
                var imgLight = config.imgLight;
                if (isHaveJob) {
                    var csfg = GlobalConfig.CardConfig[this.selectData.id][0];
                    itemId = csfg.itemId;
                }
                if (this.selectData.level == -1) {
                    var item = GlobalConfig.ItemConfig[itemId];
                    var good = UserBag.ins().getBagItemById(item.id);
                    if (good) {
                        Book.ins().sendOpen(this.selectData.id);
                        ViewManager.ins().close(this);
                        ViewManager.ins().open(Activationtongyong, 0, name_1, imgLight, true, function () {
                        });
                    }
                    else {
                        UserWarn.ins().setBuyGoodsWarn(item.id, 1);
                    }
                }
                else {
                    var cardConf = GlobalConfig.CardConfig[this.selectData.id][this.selectData.level];
                    if (cardConf.cost > Book.ins().score) {
                        UserTips.ins().showTips("\u56FE\u9274\u7ECF\u9A8C\u4E0D\u8DB3");
                    }
                    else {
                        Book.ins().sendUp(this.selectData.id);
                    }
                }
                break;
            case this.info:
                if (this.selectData.level == -1) {
                    var id_1 = Book.ins().getSuitIdByBookId(this.selectData.id);
                    if (!id_1)
                        return;
                    var config_1;
                    var item = void 0;
                    if (Book.jobs.indexOf(Number(id_1)) == -1) {
                        config_1 = GlobalConfig.DecomposeConfig[this.selectData.id];
                        item = GlobalConfig.ItemConfig[config_1.itemId];
                        UserWarn.ins().setBuyGoodsWarn(item.id, 1);
                    }
                    else {
                        var cardConfig = GlobalConfig.CardConfig[this.selectData.id][0];
                        item = GlobalConfig.ItemConfig[cardConfig.itemId];
                        UserWarn.ins().setBuyGoodsWarn(item.id, 1);
                    }
                }
                else {
                    ViewManager.ins().open(BreakDownView, BreakDownView.type_book, ItemType.TYPE_9);
                }
                break;
            case this.btnAdd:
                break;
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    BookUpWin.prototype.updateView = function () {
        var confBase = GlobalConfig.DecomposeConfig[this.selectData.id];
        var level = this.selectData.level > -1 ? this.selectData.level : 0;
        var conf = GlobalConfig.CardConfig[this.selectData.id][level];
        this.expBar.value = Book.ins().score;
        this.listOpen.dataProvider = new eui.ArrayCollection([this.selectData.id]);
        this.listOpen.validateNow();
        for (var i = 0; i < this.listOpen.numElements; i++) {
            var bitem = this.listOpen.getElementAt(i);
            if (bitem)
                bitem.setRemoveTween(true);
        }
        var nextConf = GlobalConfig.CardConfig[this.selectData.id][this.selectData.level + 1];
        this.labelCur.text = AttributeData.getAttStr(conf.attrs, 0, 1, "：");
        this.barbc.setMaxValue(nextConf ? nextConf.cost : conf.cost);
        this.barbc.setValue(Book.ins().score);
        if (this.selectData.level < 0) {
            this.currentState = "noActive";
            this.btnUp.label = "\u6FC0\u6D3B";
            this.info.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:\u83B7\u53D6\u56FE\u9274|");
            var newAttrs = [];
            for (var i in conf.attrs) {
                if (conf.attrs[i].type == AttributeType.atHpEx ||
                    conf.attrs[i].type == AttributeType.atAtkEx ||
                    conf.attrs[i].type == AttributeType.atDamageReduction ||
                    conf.attrs[i].type == AttributeType.atDefEx ||
                    conf.attrs[i].type == AttributeType.atResEx) {
                    continue;
                }
                newAttrs.push({ type: conf.attrs[i].type, value: 0 });
            }
            this.labelCur.text = AttributeData.getAttStr(newAttrs, 0, 1, "：");
        }
        else if (nextConf) {
            this.currentState = "nomax";
            this.btnUp.label = "\u5347\u661F";
            this.info.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:\u83B7\u53D6\u56FE\u9274\u7ECF\u9A8C|");
        }
        else {
            this.currentState = "max";
            this.btnUp.label = "\u5DF2\u6EE1\u661F";
            this.info.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:\u83B7\u53D6\u56FE\u9274\u7ECF\u9A8C|");
        }
        if (this.selectData.level < 0) {
            this.tujian.textColor = ItemBase.QUALITY_COLOR[confBase.quality];
            var itemConfig = GlobalConfig.ItemConfig[confBase.itemId];
            this.tujian.text = itemConfig.name + "x1";
        }
        if (nextConf) {
            this.expLabel.text = Book.ins().score + "/" + nextConf.cost;
            this.expBar.maximum = nextConf.cost;
            this.barbc.setMaxValue(nextConf.cost);
            var nextConf2 = [];
            for (var i in nextConf.attrs) {
                if (nextConf.attrs[i].type == AttributeType.atHpEx ||
                    nextConf.attrs[i].type == AttributeType.atAtkEx ||
                    nextConf.attrs[i].type == AttributeType.atDamageReduction ||
                    nextConf.attrs[i].type == AttributeType.atDefEx ||
                    nextConf.attrs[i].type == AttributeType.atResEx) {
                    continue;
                }
                nextConf2[i] = nextConf.attrs[i];
            }
            this.labelNext.text = AttributeData.getAttStr(nextConf2, 0, 1, "：");
        }
        else {
            this.expLabel.text = "\u5DF2\u6EE1\u661F";
            this.labelNext.text = "\u5DF2\u6EE1\u661F";
            this.barbc.setLbValueText("\u5DF2\u6EE1\u661F");
        }
        this.specialAttrDese(conf);
    };
    BookUpWin.prototype.setMaterial = function () {
        this.arrMat = Book.ins().getUpChipData(this.selectData);
        var data = new eui.ArrayCollection();
        this.smeltEquips = [];
        this.smeltEquips.length = 10;
        for (var i = 0; i < this.arrMat.length; i++) {
            if (i < 10) {
                var conf = GlobalConfig.CardConfig[this.arrMat[i]][1];
                var itemdata = new ItemData();
                itemdata.itemConfig = GlobalConfig.ItemConfig[conf.itemId];
                this.smeltEquips[i] = itemdata;
            }
            else
                break;
        }
        this.dataInfo.replaceAll(this.smeltEquips);
        this.list.dataProvider = this.dataInfo;
    };
    BookUpWin.prototype.specialAttrDese = function (conf) {
        if (!conf) {
            this.specialAttr.visible = false;
            return;
        }
        this.specialAttr.visible = true;
        var specailDesc = false;
        var specStr = "";
        for (var k in conf.attrs) {
            if (conf.attrs[k].type == 0 || conf.attrs[k].value == 0)
                continue;
            if (!specailDesc) {
                if (conf.attrs[k].type == AttributeType.atHpEx ||
                    conf.attrs[k].type == AttributeType.atAtkEx ||
                    conf.attrs[k].type == AttributeType.atDamageReduction ||
                    conf.attrs[k].type == AttributeType.atDefEx ||
                    conf.attrs[k].type == AttributeType.atResEx) {
                    specStr = "特殊属性:";
                    specailDesc = true;
                    specStr += "所有角色";
                    var specName = AttributeData.getAttrStrByType(conf.attrs[k].type);
                    if (conf.attrs[k].type == AttributeType.atDefEx || conf.attrs[k].type == AttributeType.atResEx) {
                        specName = "防御加成";
                    }
                    specStr += specName;
                    specStr += "+" + conf.attrs[k].value / 100 + "%";
                }
            }
        }
        if (conf.specialAttr) {
            if (specStr == "")
                specStr = "特殊属性:";
            for (var k in conf.specialAttr) {
                if (conf.specialAttr[k].type == 0 || conf.specialAttr[k].value == 0)
                    continue;
                if (conf.specialAttr) {
                    specailDesc = true;
                    specStr += "挂机获得";
                    specStr += conf.specialAttr[k].type == 1 ? "\u91D1\u5E01" : "\u7ECF\u9A8C";
                    specStr += "+" + conf.specialAttr[k].value + "%";
                }
            }
        }
        this.specialAttr.text = specStr;
        this.specialAttr.visible = specailDesc;
    };
    return BookUpWin;
}(BaseEuiView));
__reflect(BookUpWin.prototype, "BookUpWin");
ViewManager.ins().reg(BookUpWin, LayerManager.UI_Popup);
//# sourceMappingURL=BookUpWin.js.map