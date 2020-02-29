var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ItemData = (function () {
    function ItemData() {
        this._point = -1;
    }
    ItemData.prototype.parser = function (bytes) {
        this.handle = bytes.readDouble();
        this.configID = bytes.readInt();
        this.count = bytes.readInt();
        this.att = [];
        for (var i = 0; i < 8; i++) {
            var att = new AttributeData(bytes.readInt(), bytes.readInt());
            this.att.push(att);
        }
        this.extAtt = [];
        for (var i = 0; i < 8; i++) {
            var att = new AttributeData(bytes.readInt(), bytes.readInt());
            this.extAtt.push(att);
        }
    };
    Object.defineProperty(ItemData.prototype, "configID", {
        get: function () {
            return this._configID;
        },
        set: function (value) {
            this.itemConfig = GlobalConfig.ItemConfig[value];
            if (value != 0) {
                Assert(this.itemConfig, "无法读取道具配置，id：" + value + ",请检查配置");
            }
            this._point = -1;
            this._configID = value;
            this.setCanbeUsed();
        },
        enumerable: true,
        configurable: true
    });
    ItemData.getStringByList = function (str, newline, addStr) {
        if (newline === void 0) { newline = 1; }
        if (addStr === void 0) { addStr = ": "; }
        var ret = "";
        for (var i = 0; i < str.length; i++) {
            ret += str[i] + addStr;
            if (i < str.length - 1) {
                for (var j = 0; j < newline; j++)
                    ret += "\n";
            }
        }
        return ret;
    };
    ItemData.getStringByNextList = function (now, next) {
        var ret = "";
        for (var i = 0; i < now.length; i++) {
            ret += now[i];
            if (next[i]) {
                ret += next[i];
            }
            if (i < now.length - 1) {
                ret += "\n";
            }
        }
        return ret;
    };
    Object.defineProperty(ItemData.prototype, "point", {
        get: function () {
            if (this._point == -1) {
                this._point = ItemConfig.calculateBagItemScore(this);
            }
            return this._point;
        },
        enumerable: true,
        configurable: true
    });
    ItemData.prototype.setCanbeUsed = function () {
        if (!this.itemConfig)
            return;
        if (ItemConfig.getType(this.itemConfig) == ItemType.TYPE_20) {
            this.canbeUsed = SpecialRing.ins().checkCanUseByItem(this.itemConfig.id);
        }
        else if (this.itemConfig.useType == 1 || this.itemConfig.useType == 2) {
            if (UserZs.ins().lv < this.itemConfig.zsLevel && Actor.level < this.itemConfig.level) {
                this.canbeUsed = false;
            }
            else {
                if (this.itemConfig.id == 230001 || this.itemConfig.id == 230002 || this.itemConfig.id == 230003) {
                    this.canbeUsed = false;
                }
                else {
                    this.canbeUsed = true;
                }
                if (Math.floor(this.itemConfig.id / 10000) == 26) {
                    var id = this.itemConfig.id % 260000;
                    var bookData = Book.ins().getBookById(id);
                    var state = bookData.getState();
                    this.canbeUsed = state == BookState.canOpen;
                }
            }
        }
        else {
            this.canbeUsed = false;
        }
    };
    ItemData.prototype.getCanbeUsed = function () {
        return this.canbeUsed;
    };
    ItemData.prototype.copy = function (item) {
        if (!item)
            item = new ItemData();
        var self = this;
        item.handle = self.handle;
        item.configID = self.configID;
        item.count = self.count;
        item._point = self._point;
        item.att = [];
        for (var i = 0; i < 8; i++) {
            var att = new AttributeData(self.att[i].type, self.att[i].value);
            item.att.push(att);
        }
        item.extAtt = [];
        for (var i = 0; i < 8; i++) {
            var att = new AttributeData(self.extAtt[i].type, self.extAtt[i].value);
            item.extAtt.push(att);
        }
        return item;
    };
    ItemData.prototype.init = function () {
        this.handle = 0;
        this.configID = 0;
        this.count = 0;
        this.att = [];
        for (var i = 0; i < 8; i++) {
            var att = new AttributeData(0, 0);
            this.att.push(att);
        }
        this.extAtt = [];
        for (var i = 0; i < 8; i++) {
            var att = new AttributeData(0, 0);
            this.extAtt.push(att);
        }
    };
    return ItemData;
}());
__reflect(ItemData.prototype, "ItemData");
//# sourceMappingURL=ItemData.js.map