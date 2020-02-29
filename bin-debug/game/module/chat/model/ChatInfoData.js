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
var ChatInfoData = (function (_super) {
    __extends(ChatInfoData, _super);
    function ChatInfoData(bytes) {
        if (bytes === void 0) { bytes = null; }
        var _this = _super.call(this) || this;
        _this.type = 0;
        _this.id = 0;
        _this.servId = 0;
        _this.name = "";
        _this.job = 0;
        _this.sex = 0;
        _this.vip = 0;
        _this.monthCard = 0;
        _this.ladderLevel = 0;
        _this.pointId = 0;
        _this.str = "";
        _this.isFirst = 0;
        _this.zsLevel = 0;
        _this.lv = 0;
        _this.guild = "";
        _this.titleId = 0;
        if (bytes) {
            _this.type = bytes.readByte();
            _this.id = bytes.readUnsignedInt();
            _this.servId = bytes.readInt();
            _this.name = bytes.readString();
            _this.job = bytes.readByte();
            _this.sex = bytes.readByte();
            _this.vip = bytes.readByte();
            _this.monthCard = bytes.readByte();
            _this.ladderLevel = bytes.readByte();
            _this.isFirst = bytes.readByte();
            _this.zsLevel = bytes.readUnsignedByte();
            _this.lv = bytes.readShort();
            _this.guild = bytes.readString();
            _this.pointId = bytes.readUnsignedInt();
            _this.str = bytes.readString();
        }
        return _this;
    }
    return ChatInfoData;
}(ChatDataBase));
__reflect(ChatInfoData.prototype, "ChatInfoData");
//# sourceMappingURL=ChatInfoData.js.map