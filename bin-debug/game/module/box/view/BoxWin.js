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
var BoxWin = (function (_super) {
    __extends(BoxWin, _super);
    function BoxWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChestSkin";
        _this.name = "\u5B9D\u7BB1";
        return _this;
    }
    BoxWin.prototype.createChildren = function () {
        this.listBox.itemRenderer = BoxPayItemRenderer;
    };
    BoxWin.prototype.open = function () {
        this.addTouchEvent(this.listBox, this.onListTap);
        this.addTouchEvent(this.box1, this.onTap);
        this.addTouchEvent(this.box2, this.onTap);
        this.observe(Box.ins().postUpdateData, this.setGridInfo);
        this.observe(Box.ins().postUpdateFreeBox, this.setFreeBox);
        this.setGridInfo();
    };
    BoxWin.prototype.close = function () {
        this.removeTouchEvent(this.box1, this.onTap);
        this.removeTouchEvent(this.box2, this.onTap);
        this.removeTouchEvent(this.listBox, this.onListTap);
        this.removeObserve();
        this.box1.removeTimer();
        this.box2.removeTimer();
    };
    BoxWin.prototype.setGridInfo = function () {
        this.listBox.dataProvider = new eui.ArrayCollection(BoxModel.ins().getGridCfgList());
        this.setFreeBox();
    };
    BoxWin.prototype.setFreeBox = function () {
        var openNum = 0;
        var data = Box.ins().freeInfoList[0];
        this.box1.data = data;
        if (data.getTime() <= 0) {
            ++openNum;
        }
        data = Box.ins().freeInfoList[1];
        this.box2.data = data;
        if (data.getTime() <= 0) {
            ++openNum;
        }
        this.freeNum.text = "(" + openNum + "/2)";
    };
    BoxWin.prototype.onListTap = function (e) {
        var tar = e.target.parent;
        if (!tar || !tar.data)
            return;
        var info = tar.data;
        var level = UserFb.ins().guanqiaID;
        if (info.chapter > level) {
            UserTips.ins().showTips("\u901A\u5173\u6761\u4EF6\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u83B7\u5F97\u65B0\u7684\u5B9D\u7BB1\u4F4D");
            return;
        }
        var data = Box.ins().getGridInfoById(tar.data.pos);
        if (data && data.itemId > 0) {
            if (data.state == 2 && data.getTime() <= 0) {
                Box.ins().sendOpen(data.pos);
            }
            else {
                ViewManager.ins().open(BoxDetailWin, data);
            }
        }
        else {
            UserWarn.ins().setBuyGoodsWarn(GlobalConfig.TreasureBoxBaseConfig.getItemguide, 1);
        }
    };
    BoxWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.box1:
                if (this.box1.currentState == "open") {
                    Box.ins().sendOpenFreeBox(1);
                }
                break;
            case this.box2:
                if (this.box2.currentState == "open") {
                    Box.ins().sendOpenFreeBox(2);
                }
                break;
        }
    };
    BoxWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (Actor.level >= GlobalConfig.TreasureBoxBaseConfig.openLevel) {
            return true;
        }
        UserTips.ins().showTips(GlobalConfig.TreasureBoxBaseConfig.openLevel + "\u7EA7\u5F00\u542F\u5B9D\u7BB1");
        return false;
    };
    return BoxWin;
}(BaseEuiView));
__reflect(BoxWin.prototype, "BoxWin");
ViewManager.ins().reg(BoxWin, LayerManager.UI_Main);
//# sourceMappingURL=BoxWin.js.map