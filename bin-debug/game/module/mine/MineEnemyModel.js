var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MineEnemyModel = (function () {
    function MineEnemyModel() {
        this.subRole = [];
        this.hejiLvl = 0;
        this.weiWang = 0;
    }
    MineEnemyModel.prototype.parser = function (bytes) {
        this.lv = bytes.readShort();
        this.zsLv = bytes.readShort();
        this.name = bytes.readString();
        var count = bytes.readShort();
        for (var i = 0; i < count; i++) {
            var role = this.subRole[i] = new Role();
            role.parser(bytes);
            role.name = this.name;
        }
        this.fireRing = this.fireRing || new OtherFireRingData();
        this.fireRing.parser(bytes);
        this.hejiLvl = bytes.readInt();
        this.weiWang = bytes.readInt();
        MineFight.ins().createEnemy(this);
    };
    MineEnemyModel.prototype.getJobRoles = function () {
        var roles = [].concat(this.subRole);
        roles.sort(function (a, b) {
            if (a.job < b.job) {
                return -1;
            }
            return 1;
        });
        return roles;
    };
    return MineEnemyModel;
}());
__reflect(MineEnemyModel.prototype, "MineEnemyModel");
//# sourceMappingURL=MineEnemyModel.js.map