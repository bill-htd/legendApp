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
var FriendsChatItemRender = (function (_super) {
    __extends(FriendsChatItemRender, _super);
    function FriendsChatItemRender() {
        return _super.call(this) || this;
    }
    FriendsChatItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.label_msg) {
            this.label_msg.wordWrap = false;
        }
    };
    FriendsChatItemRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        var nameColor;
        var textColor;
        if (data.fromActor.id == Actor.actorID) {
            data.fromActor.name = Actor.myName;
            nameColor = "0xE5B613";
            textColor = "0xE5B613";
        }
        else {
            nameColor = data.fromActor.sex ? "0xBC8787" : "0x318ECE";
            textColor = "0xFFFFFF";
        }
        this.label_date.text = data.dateStr;
        var str = "|C:" + nameColor + "&T:" + data.fromActor.name + "|:|C:" + textColor + "&T:" + data.msg + "|";
        this.label_msg.textFlow = TextFlowMaker.generateTextFlow1(str);
    };
    return FriendsChatItemRender;
}(BaseItemRender));
__reflect(FriendsChatItemRender.prototype, "FriendsChatItemRender");
//# sourceMappingURL=FriendsChatItemRender.js.map