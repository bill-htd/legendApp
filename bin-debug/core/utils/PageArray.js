var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PageArray = (function () {
    function PageArray(source, size) {
        if (size === void 0) { size = 20; }
        this.dataSource = source;
        this.size = size;
        this.currentPage = 0;
        this.setPageData();
    }
    Object.defineProperty(PageArray.prototype, "length", {
        get: function () {
            return this.dataSource.length;
        },
        enumerable: true,
        configurable: true
    });
    PageArray.prototype.setPageData = function () {
        this.pageData = [];
        var index = this.currentPage * this.size;
        var nextIndex = (this.currentPage + 1) * this.size;
        var min = Math.min(this.length, nextIndex);
        for (var i = index; i < min; i++) {
            this.pageData.push(this.dataSource[i]);
        }
    };
    PageArray.prototype.getDataSource = function () {
        return this.dataSource;
    };
    Object.defineProperty(PageArray.prototype, "totalPage", {
        get: function () {
            return Math.ceil(this.length / this.size);
        },
        enumerable: true,
        configurable: true
    });
    PageArray.prototype.havePre = function () {
        return this.currentPage != 0;
    };
    PageArray.prototype.haveNext = function () {
        return this.currentPage < this.totalPage - 1;
    };
    PageArray.prototype.prev = function () {
        this.currentPage--;
        this.setPageData();
    };
    PageArray.prototype.next = function () {
        this.currentPage++;
        this.setPageData();
    };
    PageArray.prototype.first = function () {
        this.currentPage = 0;
        this.setPageData();
    };
    PageArray.prototype.last = function () {
        this.currentPage = this.totalPage - 1;
        this.setPageData();
    };
    PageArray.prototype.gotoPage = function (index) {
        if (this.totalPage < index) {
            return;
        }
        else {
            this.currentPage = index - 1;
            this.setPageData();
        }
    };
    return PageArray;
}());
__reflect(PageArray.prototype, "PageArray");
//# sourceMappingURL=PageArray.js.map