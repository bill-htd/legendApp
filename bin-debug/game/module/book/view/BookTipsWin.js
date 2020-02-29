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
var BookTipsWin = (function (_super) {
    __extends(BookTipsWin, _super);
    function BookTipsWin() {
        var _this = _super.call(this) || this;
        _this._bottomY = 0;
        _this._equipPower = 0;
        _this._totalPower = 0;
        _this.curRole = 0;
        _this.curId = 0;
        _this.curLevel = 0;
        _this.index = 0;
        _this.skinName = "tujiantips";
        _this.powerPanel.setBgVis(false);
        return _this;
    }
    BookTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.itemIcon.imgJob.visible = false;
        this.anigroup.touchEnabled = false;
    };
    BookTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curId = param[0];
        this.curLevel = param[1] || 0;
        this.handle = param[2];
        this.addTouchEndEvent(this.bgClose, this.otherClose);
        this.addTouchEndEvent(this.btnUse, this.onTap);
        this.setData(this.curId);
    };
    BookTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.otherClose);
        this.removeTouchEvent(this.btnUse, this.onTap);
    };
    BookTipsWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(BookTipsWin);
    };
    BookTipsWin.prototype.onTap = function (e) {
        var btn = e.currentTarget;
        if (btn.label == "\u4F7F\u7528") {
        }
        else {
        }
        ViewManager.ins().close(this);
        ViewManager.ins().open(LiLianWin, 3, this.curId);
    };
    BookTipsWin.prototype.setData = function (curId) {
        var confBase = Book.ins().getDecomposeConfigByItemId(curId);
        var conf = GlobalConfig.CardConfig[confBase.id][this.curLevel];
        this._confBase = confBase;
        this._totalPower = 0;
        var itemConfig = GlobalConfig.ItemConfig[conf.itemId];
        if (itemConfig)
            this.nameLabel.text = itemConfig.name;
        this.nameLabel.textColor = ItemBase.QUALITY_COLOR[confBase.quality];
        this.lvTxt.text = conf.level + "\u661F";
        this.qualityImg.source = "bagSkin_json.quali" + confBase.quality;
        this.qualTxt.text = ColorUtil.COLOR_STR[confBase.quality];
        itemConfig = GlobalConfig.ItemConfig[conf.itemId];
        this.itemIcon.setData(itemConfig);
        var ii = 1;
        this.attr1.visible = false;
        this.attr2.visible = false;
        this.attr3.visible = false;
        this.attr4.visible = false;
        var totalAttr = [];
        var specailDesc = false;
        var specStr = "";
        for (var k in conf.attrs) {
            if (conf.attrs[k].type == 0 || conf.attrs[k].value == 0)
                continue;
            if (conf.attrs[k].type == AttributeType.atHpEx ||
                conf.attrs[k].type == AttributeType.atAtkEx ||
                conf.attrs[k].type == AttributeType.atDamageReduction ||
                conf.attrs[k].type == AttributeType.atDefEx ||
                conf.attrs[k].type == AttributeType.atResEx) {
                if (!specailDesc) {
                    specStr = "特殊属性:";
                    specStr += "所有角色";
                    specailDesc = true;
                    var specName = AttributeData.getAttrStrByType(conf.attrs[k].type);
                    if (conf.attrs[k].type == AttributeType.atDefEx || conf.attrs[k].type == AttributeType.atResEx) {
                        specName = "防御加成";
                    }
                    specStr += specName;
                    specStr += "+" + conf.attrs[k].value / 100 + "%";
                    totalAttr.push(conf.attrs[k]);
                }
            }
            else {
                var attrStr = "";
                attrStr = AttributeData.getAttStrByType(conf.attrs[k], 0, "  ");
                totalAttr.push(conf.attrs[k]);
                this['attr' + ii].text = attrStr;
                this['attr' + ii].visible = true;
                ii++;
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
        this._equipPower = Math.floor(UserBag.getAttrPower(totalAttr));
        this._totalPower += this._equipPower;
        this.addTipsEx();
        var len = 3;
        for (var k in GlobalConfig.SuitConfig) {
            if (Book.jobs.indexOf(Number(k)) != -1 && GlobalConfig.SuitConfig[k][1].idList.indexOf(conf.id) != -1) {
                len = 1;
                this.threeLabel.visible = false;
                break;
            }
        }
        this._totalPower = this._totalPower * len;
        this.powerPanel.setPower(this._totalPower);
        this.iconBg.source = confBase.imgShow || confBase.imgLight;
        var books = Book.ins().getBookByItemId(this.curId);
        var isAllOpen = true;
        for (var _i = 0, books_1 = books; _i < books_1.length; _i++) {
            var book_1 = books_1[_i];
            if (book_1.getState() != BookState.haveOpen) {
                isAllOpen = false;
                break;
            }
        }
        if (!isAllOpen) {
            this.btnUse.label = "\u4F7F\u7528";
            this.tips.source = 'tjweijihuo';
        }
        else {
            this.btnUse.label = "\u5206\u89E3";
            this.tips.source = 'tjyijihuo';
        }
        this.btnUse.visible = !!this.handle;
        return;
    };
    BookTipsWin.prototype.addTipsEx = function () {
        var id;
        var item = Book.ins().getBookByItemId(this.curId)[0];
        if (item)
            id = item.id;
        if (!id)
            return;
        var desc1 = "";
        for (var j in GlobalConfig.SuitConfig) {
            var config = GlobalConfig.SuitConfig[j][1];
            if (config.idList.indexOf(id) != -1) {
                desc1 = config.name ? config.name : "";
                id = config.id;
                break;
            }
        }
        var desc2 = "";
        for (var k in GlobalConfig.BookListConfig) {
            var config = GlobalConfig.BookListConfig[k];
            if (config.idList.indexOf(id) != -1) {
                desc2 = config.name ? config.name : "";
                break;
            }
        }
        if (desc1 || desc2) {
            this.belong.visible = true;
            var text = desc1 ? desc1 + "\u00B7" : "";
            text += desc2;
            this.belong.text = text;
        }
        else
            this.belong.visible = false;
    };
    BookTipsWin.prototype.addTips = function () {
        while (this.forgeGroup.numElements) {
            this.forgeGroup.removeChildAt(0);
        }
        var titleAttrTxt = new eui.Label;
        var attrTxt = new eui.Label;
        var count = Book.ins().getSuitNum(this.curId);
        var dev = GlobalConfig.SuitConfig[this.curId][1].count;
        var level = Math.floor(count / dev);
        if (level == 0)
            return;
        var config = GlobalConfig.SuitConfig[this.curId][level];
        if (!titleAttrTxt.parent)
            this.createTitle(titleAttrTxt, attrTxt);
        var str = Book.ins().getTitleById(this.curId);
        titleAttrTxt.text = "\u5F53\u524D\u5957\u88C5\u7CFB\u5217:" + str + "\u00B7" + config.name + "(" + Book.ins().getSuitNum(this.curId) + "/" + config.idList.length + ")";
        attrTxt.text = AttributeData.getAttStr(config.attrs, 1, 1, "  ");
        if (GlobalConfig.SuitConfig[this.curId][level]) {
            var nextTitleAttrTxt = new eui.Label;
            var nextAttrTxt = new eui.Label;
            this._bottomY = attrTxt.y + attrTxt.height;
            this.createTitle(nextTitleAttrTxt, nextAttrTxt);
            var nextConfig = GlobalConfig.SuitConfig[this.curId][level + 1];
            nextTitleAttrTxt.text = "\u4E0B\u7EA7\u5957\u88C5\u7CFB\u5217:" + str + "\u00B7" + nextConfig.name + "(" + nextConfig.count + "/" + config.idList.length + ")";
            nextAttrTxt.text += AttributeData.getAttStr(nextConfig.attrs, 1, 1, "  ");
            this._bottomY = nextAttrTxt.y + nextAttrTxt.height;
        }
        else {
            this._bottomY = attrTxt.y + attrTxt.height;
        }
    };
    BookTipsWin.prototype.createTitle = function (titleAttrTxt, attrTxt) {
        titleAttrTxt.fontFamily = "Arial";
        titleAttrTxt.size = 20;
        titleAttrTxt.textColor = 0x7e6437;
        titleAttrTxt.bold = true;
        titleAttrTxt.x = 24;
        titleAttrTxt.y = this._bottomY + 10 + 14;
        this.forgeGroup.addChild(titleAttrTxt);
        attrTxt.fontFamily = "Arial";
        attrTxt.size = 18;
        attrTxt.lineSpacing = 8;
        attrTxt.x = 46;
        attrTxt.y = titleAttrTxt.y + 24;
        attrTxt.textColor = 0x9F946D;
        this.forgeGroup.addChild(attrTxt);
    };
    BookTipsWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (!Book.ins().getDecomposeConfigByItemId(param[0])) {
            return false;
        }
        return true;
    };
    return BookTipsWin;
}(BaseEuiView));
__reflect(BookTipsWin.prototype, "BookTipsWin");
ViewManager.ins().reg(BookTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=BookTipsWin.js.map