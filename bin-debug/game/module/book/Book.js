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
var Book = (function (_super) {
    __extends(Book, _super);
    function Book() {
        var _this = _super.call(this) || this;
        _this.bookPower = 0;
        _this.score = -1;
        _this.sysId = PackageID.Book;
        _this.regNetMsg(1, _this.postDataChange);
        _this.listBook = {};
        _this.itemBook = {};
        return _this;
    }
    Book.ins = function () {
        return _super.ins.call(this);
    };
    Book.prototype.getSuitIdByBookId = function (id) {
        var cardConfig = GlobalConfig.CardConfig[id][0];
        if (!cardConfig)
            return 0;
        for (var k in GlobalConfig.SuitConfig) {
            if (GlobalConfig.SuitConfig[k][1].idList.indexOf(id) != -1) {
                return Number(k);
            }
        }
        return 0;
    };
    Book.prototype.getSuitNum = function (suitId) {
        var conf = GlobalConfig.SuitConfig[suitId][1];
        var num = 0;
        for (var i = 0; i < conf.idList.length; i++) {
            var bookData = this.getBookById(conf.idList[i]);
            if (bookData.level > -1) {
                num++;
            }
        }
        return num;
    };
    Book.prototype.getSuitLevel = function (suitId) {
        var num = this.getSuitNum(suitId);
        var level = 0;
        var index = 1;
        while (GlobalConfig.SuitConfig[suitId][index]) {
            if (GlobalConfig.SuitConfig[suitId][index].count <= num) {
                level = GlobalConfig.SuitConfig[suitId][index].level;
            }
            index++;
        }
        return level;
    };
    Book.prototype.getBookRed = function () {
        for (var key in GlobalConfig.BookListConfig) {
            var idList = GlobalConfig.BookListConfig[key].idList;
            for (var _i = 0, idList_1 = idList; _i < idList_1.length; _i++) {
                var i = idList_1[_i];
                var element = GlobalConfig.SuitConfig[i][1].idList;
                for (var _a = 0, element_1 = element; _a < element_1.length; _a++) {
                    var id = element_1[_a];
                    if (this.getBookById(id).getState() == BookState.canOpen)
                        return true;
                }
            }
        }
        return false;
    };
    Book.prototype.getBookUpRed = function () {
        for (var key in GlobalConfig.BookListConfig) {
            var idList = GlobalConfig.BookListConfig[key].idList;
            for (var _i = 0, idList_2 = idList; _i < idList_2.length; _i++) {
                var i = idList_2[_i];
                if (this.getBookUpRedByListId(i))
                    return true;
            }
        }
        return false;
    };
    Book.prototype.getBookUpRedByListId = function (listId) {
        var elements = GlobalConfig.SuitConfig[listId][1].idList;
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var id = elements_1[_i];
            var data = this.getBookById(id);
            var nextCost = data.getNextLevelCost();
            if (nextCost && this.score >= nextCost) {
                return true;
            }
        }
    };
    Book.prototype.getBookRedById = function (bookId) {
        if (this.getBookById(bookId).getState() == BookState.canOpen)
            return true;
        return false;
    };
    Book.prototype.getBookById = function (id) {
        if (!this.listBook[id]) {
            var data = new BooKData();
            this.listBook[id] = data;
            data.id = id;
        }
        return this.listBook[id];
    };
    Book.prototype.getBookByItemId = function (itemId) {
        if (!this.itemBook[itemId]) {
            this.itemBook[itemId] = [];
        }
        return this.itemBook[itemId];
    };
    Book.prototype.getBookPown = function () {
        var conf = GlobalConfig.CardConfig;
        var pown = 0;
        for (var k in this.listBook) {
            var bookData = this.listBook[k];
            if (bookData.level > -1) {
                var data = conf[k][bookData.level];
                pown += Math.floor(UserBag.getAttrPower(data.attrs));
            }
        }
        var suitAttrSum = [];
        for (var i in GlobalConfig.BookListConfig) {
            var cfg = GlobalConfig.BookListConfig[i];
            var curNum = Book.ins().getSuitNum(cfg.idList[0]);
            for (var j in GlobalConfig.SuitConfig[cfg.idList[0]]) {
                var suit = GlobalConfig.SuitConfig[cfg.idList[0]][j];
                if (curNum >= suit.count) {
                    suitAttrSum = suit.attrs;
                }
                else {
                    pown += Math.floor(UserBag.getAttrPower(suitAttrSum));
                    suitAttrSum = [];
                    break;
                }
            }
            if (suitAttrSum.length > 0)
                pown += Math.floor(UserBag.getAttrPower(suitAttrSum));
        }
        return pown;
    };
    Book.prototype.getBookPowerNum = function (power, id) {
        var len = SubRoles.ins().subRolesLen;
        if (id) {
            for (var k in GlobalConfig.SuitConfig) {
                if (Book.jobs.indexOf(Number(k)) != -1 && GlobalConfig.SuitConfig[k][1].idList.indexOf(id) != -1) {
                    len = 1;
                    break;
                }
            }
        }
        return power * len;
    };
    Book.prototype.getBookPowerNumEx = function () {
        return this.bookPower;
    };
    Book.prototype.getUpChipData = function (booKData) {
        var result = [];
        var conf = GlobalConfig.CardConfig;
        var arrConf = conf[booKData.id];
        var maxExp = 0;
        for (var k in arrConf) {
            if (arrConf[k].level > booKData.level)
                maxExp += arrConf[k].cost;
        }
        var chipConf = GlobalConfig.DecomposeConfig;
        var needExp = maxExp - booKData.exp;
        var upExp = 0;
        for (var k in this.listBook) {
            var data = conf[k][1];
            var count = UserBag.ins().getBagGoodsCountById(0, data.itemId);
            var chip = chipConf[booKData.id];
            var bookData = this.listBook[k];
            if (bookData.level > -1 && count > 0) {
                for (var i = 0; i < count; i++) {
                    if (upExp > needExp)
                        break;
                    upExp += chip.value;
                    result.push(+(k));
                    if (result.length >= 12)
                        return result;
                }
            }
        }
        result.sort(Book.sort);
        return result;
    };
    Book.sort = function (a, b) {
        if (a == b)
            return 0;
        var aConf = GlobalConfig.DecomposeConfig[a];
        var bConf = GlobalConfig.DecomposeConfig[b];
        if (aConf.value > bConf.value)
            return 1;
        if (aConf.value < bConf.value)
            return -1;
        else
            return 0;
    };
    Book.prototype.getTitleById = function (id) {
        var config = GlobalConfig.BookListConfig;
        for (var k in config) {
            if (config[k].idList.indexOf(id) != -1)
                return config[k].name;
        }
        return "";
    };
    Book.prototype.getListData = function () {
        return this.listBook;
    };
    Book.prototype.sendBookData = function () {
        var bytes = this.getBytes(1);
        this.sendToServer(bytes);
    };
    Book.prototype.postDataChange = function (bytes) {
        if (this.score == -1) {
            var configs = GlobalConfig.DecomposeConfig;
            for (var id in configs) {
                var data = this.getBookById(+id);
                this.getBookByItemId(configs[id].itemId).push(data);
            }
        }
        var len = bytes.readInt();
        for (var i = 0; i < len; i++) {
            var id = bytes.readShort();
            var data = this.getBookById(id);
            data.updateData(bytes);
        }
        var score = bytes.readInt();
        if (this.score > -1) {
            var addScore = score - this.score;
            if (addScore > 0) {
                UserTips.ins().showTips("\u83B7\u5F97|C:0xff700f&T:\u56FE\u9274\u7ECF\u9A8Cx" + addScore + "|");
            }
        }
        this.score = score;
        this.bookPower = bytes.readDouble();
    };
    Book.prototype.sendOpen = function (id) {
        var bytes = this.getBytes(2);
        bytes.writeShort(id);
        this.sendToServer(bytes);
    };
    Book.prototype.sendDecompose = function (arrId) {
        var bytes = this.getBytes(3);
        bytes.writeInt(arrId.length);
        for (var i = 0; i < arrId.length; i++) {
            bytes.writeShort(arrId[i][0]);
            bytes.writeShort(arrId[i][1]);
        }
        this.sendToServer(bytes);
    };
    Book.prototype.sendUp = function (id) {
        var bytes = this.getBytes(4);
        bytes.writeShort(id);
        this.sendToServer(bytes);
    };
    Book.prototype.getDecomposeConfigByItemId = function (itemId) {
        var configs = GlobalConfig.DecomposeConfig;
        if (!this.itemBook[itemId]) {
            Assert(false, "\u56FE\u9274\u6570\u636E\u672A\u521D\u59CB\u5316,id=" + itemId + ",itemBook keys length=" + Object.keys(this.itemBook).length);
            return null;
        }
        if (this.itemBook[itemId][0]) {
            var id = this.itemBook[itemId][0].id;
            return configs[id];
        }
        return null;
    };
    Book.prototype.checkResolveRedPoint = function () {
        var itemData = UserBag.ins().getBagGoodsByType(ItemType.TYPE_9);
        if (!itemData.length) {
            return false;
        }
        var listBook = this.itemBook;
        var noActDic = {};
        for (var itemId in listBook) {
            for (var _i = 0, _a = listBook[itemId]; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.getState() != BookState.haveOpen) {
                    noActDic[itemId] = true;
                    break;
                }
            }
        }
        for (var _b = 0, itemData_1 = itemData; _b < itemData_1.length; _b++) {
            var item = itemData_1[_b];
            if (!noActDic[item.configID]) {
                return true;
            }
        }
        return false;
    };
    Book.prototype.getSuitRedPoint = function (s) {
        var self = this;
        var config = GlobalConfig.SuitConfig;
        var books = UserBag.ins().getBagGoodsByType(ItemType.TYPE_9);
        if (books.length == 0)
            return false;
        var packDic = {};
        for (var _i = 0, books_1 = books; _i < books_1.length; _i++) {
            var item = books_1[_i];
            packDic[item.configID] = true;
        }
        var f = function (_suit) {
            var conf = config[_suit][1];
            var idList = conf['idList'];
            for (var _i = 0, idList_3 = idList; _i < idList_3.length; _i++) {
                var id = idList_3[_i];
                if (self.listBook[id] && self.listBook[id].level == -1) {
                    var roleJob = Book.jobs.indexOf(conf.id);
                    if (roleJob == -1) {
                        var c = GlobalConfig.DecomposeConfig[id];
                        if (packDic[c.itemId]) {
                            return true;
                        }
                    }
                    else {
                        var isHaveRole = false;
                        for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
                            var role = SubRoles.ins().getSubRoleByIndex(i);
                            if (role.job == (roleJob + 1)) {
                                isHaveRole = true;
                                break;
                            }
                        }
                        if (!isHaveRole)
                            continue;
                        var cardConfig = GlobalConfig.CardConfig[id][0];
                        if (cardConfig) {
                            if (packDic[cardConfig.itemId]) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };
        if (s == 0) {
            for (var suit in config) {
                if (f(suit))
                    return true;
            }
        }
        else {
            return f(s);
        }
        return false;
    };
    Book.prototype.getHaveBookSuit = function (id) {
        var books = UserBag.ins().getBagGoodsByType(ItemType.TYPE_9);
        var config = GlobalConfig.SuitConfig[id][1];
        if (books.length == 0) {
            return { ishave: false, cur: 0, target: config.idList.length };
        }
    };
    Book.jobs = [6, 7, 8];
    return Book;
}(BaseSystem));
__reflect(Book.prototype, "Book");
var GameSystem;
(function (GameSystem) {
    GameSystem.book = Book.ins.bind(Book);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Book.js.map