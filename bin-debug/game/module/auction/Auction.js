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
var Auction = (function (_super) {
    __extends(Auction, _super);
    function Auction() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.Auction;
        _this.regNetMsg(1, _this.postListData);
        _this.regNetMsg(2, _this.onOpenSuccess);
        _this.regNetMsg(4, _this.postAuctionResult);
        _this.regNetMsg(5, _this.postBuyResult);
        _this.regNetMsg(6, _this.postRecord);
        _this.regNetMsg(7, _this.noLimit);
        return _this;
    }
    Auction.ins = function () {
        return _super.ins.call(this);
    };
    Auction.prototype.initLogin = function () {
        this.sendGetList(0);
        this.sendGetList(1);
    };
    Auction.prototype.sendGetList = function (type) {
        var bytes = this.getBytes(1);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    };
    Auction.prototype.postListData = function (bytes) {
        var type = bytes.readByte();
        var len = bytes.readInt();
        var list = [];
        for (var i = 0; i < len; i++) {
            list.push(new AuctionVo(bytes));
        }
        if (list.length >= 2)
            list.sort(this.sort);
        if (type == 0)
            this.auGuildDatas = list;
        else
            this.auServerDatas = list;
    };
    Auction.prototype.sort = function (a, b) {
        if (a.putAwayTime > b.putAwayTime)
            return -1;
        if (a.putAwayTime < b.putAwayTime)
            return 1;
        return 0;
    };
    Auction.prototype.sortByAuTime = function (a, b) {
        if (a.time > b.time)
            return -1;
        if (a.time < b.time)
            return 1;
        return 0;
    };
    Auction.prototype.sendOpenAuBox = function (id) {
        var bytes = this.getBytes(2);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    Auction.prototype.onOpenSuccess = function (bytes) {
        ViewManager.ins().open(AuctionItemChoiceWin, bytes.readInt(), bytes.readInt());
    };
    Auction.prototype.sendUseAuBox = function (type, id) {
        var bytes = this.getBytes(3);
        bytes.writeByte(type);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    Auction.prototype.sendAUction = function (id, type, auctionTimes) {
        var bytes = this.getBytes(4);
        bytes.writeInt(id);
        bytes.writeByte(type);
        bytes.writeByte(auctionTimes);
        this.sendToServer(bytes);
    };
    Auction.prototype.postAuctionResult = function (bytes) {
        var result = bytes.readByte();
        switch (result) {
            case 0:
            case 1:
            case 2:
                var vo = new AuctionVo(bytes);
                var itemVo = this.getVoByID(vo.id);
                if (result == 1) {
                    this.deleteVo(itemVo);
                    UserTips.ins().showTips("\u7269\u54C1\u4E0D\u5B58\u5728");
                }
                else {
                    this.dateChanged(itemVo, vo);
                    UserTips.ins().showTips(result == 0 ? "\u7ADE\u62CD\u6210\u529F" : "\u5546\u54C1\u4FE1\u606F\u5DF2\u6539\u53D8");
                }
                break;
            case 3:
                UserTips.ins().showTips("\u8FD8\u5728\u5C55\u793A\u65F6\u95F4");
                break;
            case 4:
                UserTips.ins().showTips("\u6D3B\u8DC3\u989D\u5EA6\u4E0D\u8DB3");
                break;
        }
    };
    Auction.prototype.deleteVo = function (itemVo) {
        if (this.auGuildDatas) {
            var index = this.auGuildDatas.indexOf(itemVo);
            if (index >= 0) {
                this.auGuildDatas.splice(index, 1);
                return;
            }
        }
        if (this.auServerDatas) {
            var index = this.auServerDatas.indexOf(itemVo);
            if (index >= 0)
                this.auServerDatas.splice(index, 1);
        }
    };
    Auction.prototype.postUpdate = function () {
    };
    Auction.prototype.getVoByID = function (id) {
        return this.getVo(id, this.auGuildDatas) || this.getVo(id, this.auServerDatas);
    };
    Auction.prototype.getVo = function (id, list) {
        if (!list || list.length <= 0)
            return null;
        var len = list.length;
        for (var i = 0; i < len; i++) {
            if (list[i].id == id)
                return list[i];
        }
        return null;
    };
    Auction.prototype.sendBuy = function (id, type) {
        var bytes = this.getBytes(5);
        bytes.writeInt(id);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    };
    Auction.prototype.postBuyResult = function (bytes) {
        var result = bytes.readByte();
        switch (result) {
            case 0:
            case 1:
            case 2:
                var vo = new AuctionVo(bytes);
                var itemVo = this.getVoByID(vo.id);
                if (result != 2) {
                    this.deleteVo(itemVo);
                    UserTips.ins().showTips(result == 1 ? "\u7269\u54C1\u4E0D\u5B58\u5728" : "\u8D2D\u4E70\u6210\u529F");
                }
                else {
                    this.dateChanged(itemVo, vo);
                    UserTips.ins().showTips("\u5546\u54C1\u4FE1\u606F\u5DF2\u6539\u53D8");
                }
                break;
            case 3:
                UserTips.ins().showTips("\u8FD8\u5728\u5C55\u793A\u65F6\u95F4");
                break;
            case 4:
                UserTips.ins().showTips("\u6D3B\u8DC3\u989D\u5EA6\u4E0D\u8DB3");
                break;
        }
    };
    Auction.prototype.dateChanged = function (oldData, newData) {
        if (oldData.type != newData.type) {
            this.deleteVo(oldData);
            if (newData.type == 0) {
                this.auGuildDatas.push(newData);
                if (this.auGuildDatas.length >= 2)
                    this.auGuildDatas.sort(this.sort);
            }
            else {
                this.auServerDatas.push(newData);
                if (this.auServerDatas.length >= 2)
                    this.auServerDatas.sort(this.sort);
            }
        }
        else {
            oldData.putAwayTime = newData.putAwayTime;
            oldData.endTime = newData.endTime;
            oldData.myAuPrice = newData.myAuPrice;
            oldData.auctionTimes = newData.auctionTimes;
            oldData.aID = newData.aID;
        }
    };
    Auction.prototype.getMaxPageByType = function (type, count) {
        var datas = type ? this.auServerDatas : this.auGuildDatas;
        if (!datas || !datas.length)
            return 1;
        return Math.ceil(datas.length / count);
    };
    Auction.prototype.getDataByPage = function (type, page, count) {
        var datas = type ? this.auServerDatas : this.auGuildDatas;
        if (!datas || !datas.length)
            return null;
        var index = (page - 1) * count;
        return datas.slice(index, index + count);
    };
    Auction.prototype.isAuctionOpen = function () {
        return UserZs.ins().lv >= GlobalConfig.AuctionConfig.openzhuanshenglv && (GameServer.serverOpenDay + 1) >= GlobalConfig.AuctionConfig.openserverday;
    };
    Auction.prototype.sendRecord = function (type) {
        var bytes = this.getBytes(6);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    };
    Auction.prototype.postRecord = function (bytes) {
        var type = bytes.readByte();
        var len = bytes.readShort();
        var list = [];
        var vo;
        for (var i = 0; i < len; i++) {
            vo = new AuctionRecordVo(bytes);
            vo.type = type;
            list.push(vo);
        }
        if (list.length > 1)
            list.sort(this.sortByAuTime);
        return { type: type, list: list };
    };
    Auction.prototype.noLimit = function (bytes) {
        ViewManager.ins().open(AuctionQuotaTipWin, bytes.readInt(), bytes.readInt());
    };
    Auction.prototype.checkRed = function () {
        return this.checkRedByType(0) || this.checkRedByType(1);
    };
    Auction.prototype.checkRedByType = function (type) {
        var list = type ? this.auServerDatas : this.auGuildDatas;
        return list && list.length > 0;
    };
    return Auction;
}(BaseSystem));
__reflect(Auction.prototype, "Auction");
var GameSystem;
(function (GameSystem) {
    GameSystem.auction = Auction.ins.bind(Auction);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Auction.js.map