var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var JadeDataNew = (function () {
    function JadeDataNew() {
        this.lv = 0;
        this.exp = 0;
        this._isUpdate = true;
    }
    JadeDataNew.prototype.parser = function (bytes) {
        this.lv = bytes.readShort();
        this.exp = bytes.readShort();
        var len = bytes.readShort();
        this.danDate = new Object();
        for (var i = 0; i < len; i++)
            this.danDate[bytes.readInt()] = bytes.readShort();
        this._isUpdate = true;
    };
    JadeDataNew.prototype.parserOther = function (bytes) {
        this.lv = bytes.readShort();
        this._isUpdate = true;
    };
    JadeDataNew.prototype.getSkillList = function () {
        if (this._isUpdate) {
            this._isUpdate = false;
            this._skillList = [];
            var skills = JadeNew.ins().getSkillsByLv(this.lv);
            if (skills) {
                for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
                    var skillId = skills_1[_i];
                    this._skillList.push(new SkillData(skillId));
                }
            }
        }
        return this._skillList;
    };
    return JadeDataNew;
}());
__reflect(JadeDataNew.prototype, "JadeDataNew");
//# sourceMappingURL=JadeDataNew.js.map