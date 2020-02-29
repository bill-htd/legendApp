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
var MailDetailedWin = (function (_super) {
    __extends(MailDetailedWin, _super);
    function MailDetailedWin() {
        return _super.call(this) || this;
    }
    MailDetailedWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "MailContentSkin";
        this.itemList.itemRenderer = ItemBase;
    };
    MailDetailedWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.rect, this.onTap);
        this.textLabel.addEventListener(egret.TextEvent.LINK, this.linkClick, this);
        this.addTouchEvent(this.receiveBtn, this.onTap);
        this.observe(UserMail.ins().postGetItemFromMail, this.setMailData);
        this.setMailData();
    };
    MailDetailedWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    MailDetailedWin.prototype.linkClick = function (evt) {
        var lst = evt.text.split(",");
        var pa = lst.slice(1);
        if (lst[0]) {
            ViewManager.ins().open(lst[0], pa[0] ? pa : null);
            ViewManager.ins().close(this);
            ViewManager.ins().close(FriendBgWin);
        }
    };
    MailDetailedWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.receiveBtn:
                var list = [];
                list.push(UserMail.ins().currentMailHandle);
                UserMail.ins().sendGetItem(list);
            case this.closeBtn:
            case this.closeBtn0:
            case this.rect:
                ViewManager.ins().close(this);
                break;
        }
    };
    MailDetailedWin.prototype.otherClose = function (evt) {
        var bg = this.background;
        if (evt.localX >= bg.x && evt.localX <= bg.x + bg.width && evt.localY >= bg.y && evt.localY <= bg.y + bg.height) {
        }
        else {
            ViewManager.ins().close(this);
        }
    };
    MailDetailedWin.prototype.setMailData = function () {
        var mailData = UserMail.ins().getCurrentMail();
        this.textLabel.textFlow = TextFlowMaker.generateTextFlow1(mailData.text);
        this.setReceiveBtn(mailData.receive, mailData.item.length > 0);
        this.itemList.dataProvider = new eui.ArrayCollection(mailData.item);
    };
    MailDetailedWin.prototype.setReceiveBtn = function (receive, isShow) {
        if (isShow === void 0) { isShow = false; }
        var str = "";
        this.receiveBtn.visible = receive >= 0;
        if (receive)
            str = "已领取";
        else
            str = "领取附件";
        this.receiveBtn.label = str;
        this.receiveBtn.enabled = !Boolean(receive);
        this.receiveBtn.visible = isShow;
        this.desc.visible = !isShow;
    };
    return MailDetailedWin;
}(BaseEuiView));
__reflect(MailDetailedWin.prototype, "MailDetailedWin");
ViewManager.ins().reg(MailDetailedWin, LayerManager.UI_Popup);
//# sourceMappingURL=MailDetailedWin.js.map