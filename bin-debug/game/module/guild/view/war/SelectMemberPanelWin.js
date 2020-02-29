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
var SelectMemberPanelWin = (function (_super) {
    __extends(SelectMemberPanelWin, _super);
    function SelectMemberPanelWin() {
        return _super.call(this) || this;
    }
    SelectMemberPanelWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "SelectMemberPanelSkin";
        this.list.itemRenderer = MemberItem3Renderer;
    };
    SelectMemberPanelWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.index = param[0];
        this.maxNum = param[1];
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.list, this.onTap);
        this.addTouchEvent(this.sureBtn, this.onTap);
        GuildWar.ins().getModel().sendList[this.index] = [];
        GuildWar.ins().getModel().sendNumList[this.index] = [];
        this.selectList = [];
        this.numList = [];
        this.selectItemList = [];
        this.chooseNum.text = "已选择 " + this.countNum() + "/" + this.maxNum;
        this.sureBtn.enabled = this.selectList.length == this.maxNum;
        this.refushList();
    };
    SelectMemberPanelWin.prototype.refushList = function () {
        this.list.dataProvider = new eui.ArrayCollection(GuildWar.ins().getModel().getMyGuildPointRank());
    };
    SelectMemberPanelWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeTouchEvent(this.list, this.onTap);
        this.removeTouchEvent(this.sureBtn, this.onTap);
        GuildWar.ins().postSendListChange();
    };
    SelectMemberPanelWin.prototype.countNum = function () {
        var count = 0;
        if (this.selectItemList) {
            for (var k in this.selectItemList) {
                count += this.selectItemList[k].chooseNum;
            }
        }
        return count;
    };
    SelectMemberPanelWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(SelectMemberPanelWin);
                break;
            case this.sureBtn:
                this.toNumList();
                GuildWar.ins().getModel().sendList[this.index] = this.selectList;
                GuildWar.ins().getModel().sendNumList[this.index] = this.numList;
                ViewManager.ins().close(SelectMemberPanelWin);
                break;
            case this.list:
                var item = e.target.parent;
                if (item && item.data) {
                    var i = this.selectItemList.lastIndexOf(item);
                    switch (e.target) {
                        case item.btn1:
                            --item.chooseNum;
                            if (item.chooseNum < 1) {
                                item.chooseNum = 1;
                            }
                            break;
                        case item.btn2:
                            if (this.countNum() >= this.maxNum) {
                                UserTips.ins().showTips("|C:0xf3311e&T:分配人数已满|");
                                return;
                            }
                            ++item.chooseNum;
                            break;
                        default:
                            if (i >= 0) {
                                item.checkBoxs.selected = false;
                                item.chooseNum = 0;
                                this.selectItemList.splice(i, 1);
                            }
                            else {
                                if (this.countNum() >= this.maxNum) {
                                    item.checkBoxs.selected = false;
                                    UserTips.ins().showTips("|C:0xf3311e&T:分配人数已满|");
                                    return;
                                }
                                item.checkBoxs.selected = true;
                                this.selectItemList.push(item);
                                item.chooseNum = 1;
                            }
                    }
                    item.num1.text = item.chooseNum + "";
                    this.setAddInfoShow(item, item.checkBoxs.selected);
                    this.chooseNum.text = "已选择 " + this.countNum() + "/" + this.maxNum;
                    this.sureBtn.enabled = this.countNum() == this.maxNum;
                }
                break;
        }
    };
    SelectMemberPanelWin.prototype.setAddInfoShow = function (item, show) {
        if (show === void 0) { show = false; }
        item.btn1.visible = item.btn2.visible = item.num1.visible = item.inputBg.visible = show;
    };
    SelectMemberPanelWin.prototype.toNumList = function () {
        if (this.selectItemList) {
            for (var k in this.selectItemList) {
                this.selectList.push(this.selectItemList[k].data.data);
                this.numList.push(this.selectItemList[k].chooseNum);
            }
        }
    };
    return SelectMemberPanelWin;
}(BaseEuiView));
__reflect(SelectMemberPanelWin.prototype, "SelectMemberPanelWin");
ViewManager.ins().reg(SelectMemberPanelWin, LayerManager.UI_Popup);
//# sourceMappingURL=SelectMemberPanelWin.js.map