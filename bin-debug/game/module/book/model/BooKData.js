var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BooKData = (function () {
    function BooKData() {
        this.level = -1;
        this.exp = 0;
        this.number = 0;
    }
    BooKData.prototype.updateData = function (bytes) {
        this.level = bytes.readShort();
    };
    BooKData.prototype.getNum = function (roleJob) {
        var id = GlobalConfig.CardConfig[this.id][0].itemId;
        var isHave = UserBag.ins().getBagGoodsCountById(0, id);
        if (isNaN(roleJob)) {
            var suitId = Book.ins().getSuitIdByBookId(this.id);
            if (!suitId)
                return isHave;
            var tmproleJob = Book.jobs.indexOf(suitId);
            if (tmproleJob == -1)
                return isHave;
            var isActRole = void 0;
            for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
                var role = SubRoles.ins().getSubRoleByIndex(i);
                if (!role)
                    continue;
                if (role.job == (tmproleJob + 1)) {
                    isActRole = true;
                    break;
                }
            }
            if (!isActRole)
                return 0;
            return isHave;
        }
        if (isHave) {
            for (var k in GlobalConfig.SuitConfig) {
                var tmproleJob = Book.jobs.indexOf(Number(k));
                if (tmproleJob != -1 && GlobalConfig.SuitConfig[k][1].idList.indexOf(this.id) != -1) {
                    for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
                        var role = SubRoles.ins().getSubRoleByIndex(i);
                        if (!role)
                            continue;
                        if (role.job == (roleJob + 1))
                            return isHave;
                    }
                }
            }
        }
        return 0;
    };
    BooKData.prototype.getItemId = function () {
        return GlobalConfig.CardConfig[this.id][0].itemId;
    };
    BooKData.prototype.canOpen = function () {
        return this.getNum() > 0;
    };
    BooKData.prototype.getNextLevelCost = function () {
        if (this.level == -1)
            return 0;
        var nextConf = GlobalConfig.CardConfig[this.id][this.level + 1];
        if (nextConf)
            return nextConf.cost;
        return 0;
    };
    BooKData.prototype.getState = function (roleJob) {
        if (this.level > -1)
            return BookState.haveOpen;
        if (this.getNum(roleJob) > 0)
            return BookState.canOpen;
        else
            return BookState.noOpen;
    };
    return BooKData;
}());
__reflect(BooKData.prototype, "BooKData");
//# sourceMappingURL=BooKData.js.map