var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RewardData = (function () {
    function RewardData() {
    }
    RewardData.prototype.parser = function (bytes) {
        this.type = bytes.readInt();
        this.id = bytes.readInt();
        this.count = bytes.readInt();
    };
    RewardData.getCurrencyName = function (v) {
        return RewardData.CURRENCY_NAME[v];
    };
    RewardData.getCurrencyRes = function (v) {
        return RewardData.CURRENCY_RES[v];
    };
    RewardData.CURRENCY_NAME = {
        "0": "经验",
        "1": "金币",
        "2": "元宝",
        "3": "声望",
        "4": "精炼石",
        "5": "公会贡献",
        "6": "公会资金",
        "7": "功勋",
        "8": "成就",
        "9": "战纹精华",
        "10": "战纹碎片",
        "11": "低级符文碎片",
        "12": "高级符文碎片",
        "13": "神兵经验",
        "14": "威望",
        "15": "筹码",
        "16": "兽神精魄",
        "99": "元宝"
    };
    RewardData.CURRENCY_RES = {
        "1": "ZSgold",
        "2": "ZScoin",
        "3": "ZSshengwang",
        "4": "ZSlingpo",
        "0": "result_json.ZSexp",
        "5": "ZSguildgx",
        "6": "ZSguildfund",
        "8": "ZSchengjiu",
        "99": "ZScoin",
        "7": "ZShonor",
        "9": "500007_png",
        "10": "500008_png",
        "11": "hejisuipian",
        "12": "hejisuipian1",
        "13": "ZSexp",
        "14": "ZSprestige",
        "15": "ZSchip",
        "16": "SSExp",
    };
    return RewardData;
}());
__reflect(RewardData.prototype, "RewardData");
var RewardDataCurrency;
(function (RewardDataCurrency) {
    RewardDataCurrency[RewardDataCurrency["Exp"] = 0] = "Exp";
    RewardDataCurrency[RewardDataCurrency["Glod"] = 1] = "Glod";
    RewardDataCurrency[RewardDataCurrency["Yb"] = 2] = "Yb";
    RewardDataCurrency[RewardDataCurrency["Shengwang"] = 3] = "Shengwang";
    RewardDataCurrency[RewardDataCurrency["Lingpo"] = 4] = "Lingpo";
    RewardDataCurrency[RewardDataCurrency["GuildContribute"] = 5] = "GuildContribute";
    RewardDataCurrency[RewardDataCurrency["GuildGold"] = 6] = "GuildGold";
    RewardDataCurrency[RewardDataCurrency["Feats"] = 7] = "Feats";
    RewardDataCurrency[RewardDataCurrency["Recharge"] = 99] = "Recharge";
})(RewardDataCurrency || (RewardDataCurrency = {}));
//# sourceMappingURL=RewardData.js.map