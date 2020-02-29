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
var BookWin = (function (_super) {
    __extends(BookWin, _super);
    function BookWin() {
        var _this = _super.call(this) || this;
        _this.name = "\u56FE\u9274";
        return _this;
    }
    BookWin.prototype.childrenCreated = function () {
        this.listBook.dataProvider = null;
        this.listMenu.dataProvider = null;
        this.listBook.itemRenderer = BookItem;
        this.listMenu.itemRenderer = BookListItem;
        this.listBook.touchEnabled = false;
        this.resolve.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:\u5206\u89E3\u591A\u4F59\u56FE\u9274|");
        this.chargeEff1 = new MovieClip;
        this.eff.addChild(this.chargeEff1);
        this.chargeEff1.x = this.eff.x;
        this.chargeEff1.y = this.eff.y;
        this.chargeEff1.touchEnabled = false;
        this.chargeEff1.scaleY = 0.5;
        this.chargeEff1.scaleX = 0.75;
        this.greencolor = 0x20cb30;
        this.graycolor = this.attr.textColor;
        this.itemHeight = 150;
    };
    BookWin.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.labelAttr.text = "";
        this.labelSuit.text = "";
        this.listBook.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBookTap, this);
        this.listMenu.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMenuTap, this);
        this.addTouchEvent(this.xiangqing, this.onTap);
        this.addTouchEvent(this.resolve, this.onTap);
        this.addTouchEvent(this.getway, this.onTap);
        this.addTouchEvent(this.leftGroup, this.onTap);
        this.addTouchEvent(this.rightGroup, this.onTap);
        this.observe(Book.ins().postDataChange, this.delayItemChange);
        this.observe(UserBag.ins().postItemDel, this.delayItemChange);
        this.observe(UserBag.ins().postItemAdd, this.delayItemChange);
        this.observe(UserBag.ins().postItemChange, this.delayItemChange);
        this.observe(BookRedPoint.ins().postRedPoint, this.updateRedPoint);
        this.addEvent(eui.UIEvent.CHANGE_END, this.listScroller, this.onChange);
        this.initView();
        var curId = param[0] || 0;
        var conf = null;
        var subSelect = 0;
        var subSelect2 = 0;
        if (curId) {
            conf = Book.ins().getDecomposeConfigByItemId(curId);
            var suitConf = GlobalConfig.SuitConfig;
            var subId = 1;
            for (var id in suitConf) {
                if (suitConf[id][1].idList.indexOf(conf.id) >= 0) {
                    subId = +(id);
                    break;
                }
            }
            for (var id in GlobalConfig.BookListConfig) {
                if (GlobalConfig.BookListConfig[id].idList.indexOf(subId) >= 0) {
                    subSelect = GlobalConfig.BookListConfig[id].sort - 1;
                    subSelect2 = GlobalConfig.BookListConfig[id].idList.indexOf(subId);
                    break;
                }
            }
        }
        TimerManager.ins().doTimer(200, 1, function () {
            _this.listMenu.selectedIndex = subSelect;
            var firstMenu = _this.listMenu.getVirtualElementAt(subSelect);
            if (firstMenu) {
                if (firstMenu.idList) {
                    _this.curId = firstMenu.idList[subSelect2];
                    _this.updateBook();
                    _this.updateAttr();
                }
            }
        }, this);
        this.preScrollV = 0;
    };
    BookWin.prototype.onChange = function () {
        if (this.listMenu.scrollH < 46) {
            this.leftGroup.visible = false;
            this.rightGroup.visible = true;
        }
        else if (this.listMenu.scrollH >= this.listMenu.contentWidth - this.listMenu.width - 46) {
            this.leftGroup.visible = true;
            this.rightGroup.visible = false;
        }
        else {
            this.leftGroup.visible = true;
            this.rightGroup.visible = true;
        }
        this.updateRedPoint();
    };
    BookWin.prototype.onTap = function (e) {
        var num = 92 * 5;
        var scrollH = 0;
        switch (e.currentTarget) {
            case this.xiangqing:
                ViewManager.ins().open(BookAttrWin);
                break;
            case this.resolve:
                ViewManager.ins().open(BreakDownView, BreakDownView.type_book, ItemType.TYPE_9);
                break;
            case this.getway:
                ViewManager.ins().open(BookWayTips, this.curId);
                break;
            case this.leftGroup:
                scrollH = this.listMenu.scrollH - num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH < 0) {
                    scrollH = 0;
                }
                this.listMenu.scrollH = scrollH;
                this.onChange();
                break;
            case this.rightGroup:
                scrollH = this.listMenu.scrollH + num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH > this.listMenu.contentWidth - this.listScroller.width) {
                    scrollH = this.listMenu.contentWidth - this.listScroller.width;
                }
                this.listMenu.scrollH = scrollH;
                this.onChange();
                break;
        }
    };
    BookWin.prototype.close = function () {
        this.removeTouchEvent(this.xiangqing, this.onTap);
        this.removeTouchEvent(this.resolve, this.onTap);
        this.removeTouchEvent(this.getway, this.onTap);
        this.removeTouchEvent(this.listMenu, this.onMenuTap);
        this.removeTouchEvent(this.leftGroup, this.onTap);
        this.removeTouchEvent(this.rightGroup, this.onTap);
        this.listBook.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBookTap, this);
        this.listMenu.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMenuTap, this);
        this.listScroller.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this.removeObserve();
    };
    BookWin.prototype.initView = function () {
        var config = GlobalConfig.BookListConfig;
        var conf = [];
        for (var k in config) {
            conf.push(config[k]);
        }
        conf.sort(function (a, b) {
            if (a.sort < b.sort)
                return -1;
            else
                return 1;
        });
        var data = new eui.ArrayCollection(conf);
        this.listMenu.dataProvider = data;
        this.updateBook();
        this.leftGroup.parent.touchEnabled = false;
        this.onChange();
    };
    BookWin.prototype.playEffect = function () {
        if (!BookRedPoint.ins().getRedPoint(1)) {
            DisplayUtils.removeFromParent(this.chargeEff1);
        }
        else {
            if (!this.chargeEff1.parent) {
                this.eff.addChild(this.chargeEff1);
            }
            this.chargeEff1.playFile(RES_DIR_EFF + "chargeff1", -1);
        }
    };
    BookWin.prototype.delayItemChange = function () {
        if (!TimerManager.ins().isExists(this.onItemChange, this))
            TimerManager.ins().doTimer(60, 1, this.onItemChange, this);
    };
    BookWin.prototype.onItemChange = function () {
        this.updateBook();
        var g = this.listBook.parent;
        g.scrollV = this.preScrollV;
    };
    BookWin.prototype.setStartPosition = function (idList) {
        var g = this.listBook.parent;
        var scro = g.parent;
        scro.stopAnimation();
        var startPos = 0;
        for (var i = 0; i < idList.length; i++) {
            if (this.getIsAct(idList[i])) {
                if (i > 9) {
                    startPos = Math.floor((i + 1) / 3) * this.itemHeight;
                }
                break;
            }
        }
        if (scro.height >= this.listBook.contentHeight)
            startPos = 0;
        else {
            var maxHeight = this.listBook.contentHeight - scro.height * 41 / 30;
            maxHeight = maxHeight > 0 ? maxHeight : 0;
            if (startPos >= maxHeight)
                startPos = maxHeight;
        }
        g.scrollV = startPos;
        this.preScrollV = g.scrollV;
    };
    BookWin.prototype.updateBook = function (noUpdateMenu) {
        if (!this.curId)
            return;
        var conf = GlobalConfig.SuitConfig[this.curId][1];
        var dataPro = this.listBook.dataProvider;
        if (dataPro && dataPro.source == conf.idList) {
            dataPro.refresh();
        }
        else {
            this.listBook.dataProvider = new eui.ArrayCollection(conf.idList);
        }
        this.listBook.validateNow();
        this.setStartPosition(conf.idList);
        if (!noUpdateMenu) {
            var dataProvider = this.listMenu.dataProvider;
            for (var i in dataProvider.source)
                dataProvider.itemUpdated(dataProvider.getItemAt(parseInt(i)));
        }
        this.updateAttr();
        this.playEffect();
        var power = Book.ins().getBookPowerNumEx();
        this.power.text = power + "";
    };
    BookWin.prototype.onBookTap = function (e) {
        var id = this.listBook.selectedItem;
        var data = Book.ins().getBookById(id);
        if (!id || !data) {
            return;
        }
        var g = this.listBook.parent;
        this.preScrollV = g.scrollV;
        ViewManager.ins().open(BookUpWin, data);
    };
    BookWin.prototype.updateAttr = function () {
        var conf = GlobalConfig.SuitConfig[this.curId][1];
        var level = Book.ins().getSuitLevel(this.curId);
        var labelColor;
        if (level > 0) {
            conf = GlobalConfig.SuitConfig[this.curId][level];
            labelColor = this.greencolor;
        }
        else {
            labelColor = this.graycolor;
        }
        var title = "";
        for (var k in GlobalConfig.BookListConfig) {
            var config = GlobalConfig.BookListConfig[k];
            if (config.idList.indexOf(this.curId) != -1) {
                title = config.nameImg;
                break;
            }
        }
        var curNum = Book.ins().getSuitNum(this.curId);
        var maxNum = conf.idList.length;
        this.progress.text = "\uFF08\u5DF2\u96C6\u9F50" + curNum + "/" + maxNum + "\uFF09";
        this.labelIcon.source = title;
        var str = AttributeData.getAttStr(conf.attrs, 0, 1, ":");
        var arr = str.split("\n");
        var newStr = "\u96C6\u9F50\u5957\u88C5\u6548\u679C\uFF1A";
        for (var i = 0; i < arr.length; i++) {
            newStr += arr[i] + "  ";
        }
        this.attr.textFlow = TextFlowMaker.generateTextFlow1("|C:" + labelColor + "&T:" + newStr);
        this.expValue.text = Book.ins().score + "";
    };
    BookWin.prototype.onMenuTap = function (e) {
        var data = e.item;
        this.curId = data.idList[0];
        this.updateBook(true);
        this.updateAttr();
    };
    BookWin.prototype.getIsAct = function (id) {
        var bookData = Book.ins().getBookById(id);
        var state = bookData.getState();
        return state == BookState.canOpen;
    };
    BookWin.prototype.updateRedPoint = function () {
        this.leftRed.visible = BookRedPoint.ins().redpoint;
        this.rightRed.visible = BookRedPoint.ins().redpoint;
    };
    return BookWin;
}(BaseComponent));
__reflect(BookWin.prototype, "BookWin");
//# sourceMappingURL=BookWin.js.map