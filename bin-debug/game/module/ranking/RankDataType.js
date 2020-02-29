var RankDataType;
(function (RankDataType) {
    RankDataType.TYPE_POWER = 0;
    RankDataType.TYPE_ARENA = 1;
    RankDataType.TYPE_SKIRMISH = 2;
    RankDataType.TYPE_PASS = 3;
    RankDataType.TYPE_COPY = 4;
    RankDataType.TYPE_LEVEL = 5;
    RankDataType.TYPE_WING = 16;
    RankDataType.TYPE_JOB_ZS = 7;
    RankDataType.TYPE_JOB_FS = 8;
    RankDataType.TYPE_JOB_DS = 9;
    RankDataType.TYPE_LILIAN = 10;
    RankDataType.TYPE_LADDER = 11;
    RankDataType.TYPE_BAOSHI = 12;
    RankDataType.TYPE_ZHANLING = 13;
    RankDataType.TYPE_LONGHUN = 14;
    RankDataType.TYPE_XUNZHANG = 15;
    RankDataType.TYPE_XIAOFEI = -1;
    RankDataType.TYPE_BOOK = 17;
    RankDataType.TYPE_ZS = 18;
    RankDataType.TYPE_SCORE = 19;
    RankDataType.TYPE_HF_XIAOFEI = 21;
    RankDataType.TYPE_WEIWANG = 22;
    RankDataType.TYPE_XIAYI = 23;
    RankDataType.DATA_POS = 'pos';
    RankDataType.DATA_ID = 'id';
    RankDataType.DATA_PLAYER = 'player';
    RankDataType.DATA_LEVEL = 'level';
    RankDataType.DATA_ZHUAN = 'zhuan';
    RankDataType.DATA_VIP = 'vip';
    RankDataType.DATA_MONTH = 'month';
    RankDataType.DATA_POWER = 'power';
    RankDataType.DATA_COUNT = 'count';
    RankDataType.DATA_EXP = 'exp';
    RankDataType.DATA_JOB = 'job';
    RankDataType.DATA_SEX = 'sex';
    RankDataType.DATA_WEIWANG = 'weiWang';
    RankDataType.ITEMS = [];
    RankDataType.ITEMS[RankDataType.TYPE_POWER] =
        RankDataType.ITEMS[RankDataType.TYPE_WING] =
            RankDataType.ITEMS[RankDataType.TYPE_JOB_ZS] =
                RankDataType.ITEMS[RankDataType.TYPE_JOB_FS] =
                    RankDataType.ITEMS[RankDataType.TYPE_JOB_DS] =
                        [
                            RankDataType.DATA_POS,
                            RankDataType.DATA_ID,
                            RankDataType.DATA_PLAYER,
                            RankDataType.DATA_LEVEL,
                            RankDataType.DATA_ZHUAN,
                            RankDataType.DATA_VIP,
                            RankDataType.DATA_MONTH,
                            RankDataType.DATA_POWER,
                        ];
    RankDataType.ITEMS[RankDataType.TYPE_SKIRMISH] =
        [
            RankDataType.DATA_POS,
            RankDataType.DATA_ID,
            RankDataType.DATA_PLAYER,
            RankDataType.DATA_JOB,
            RankDataType.DATA_SEX,
            RankDataType.DATA_LEVEL,
            RankDataType.DATA_ZHUAN,
            RankDataType.DATA_VIP,
            RankDataType.DATA_COUNT,
            RankDataType.DATA_MONTH,
        ];
    RankDataType.ITEMS[RankDataType.TYPE_LEVEL] =
        [
            RankDataType.DATA_POS,
            RankDataType.DATA_ID,
            RankDataType.DATA_PLAYER,
            RankDataType.DATA_LEVEL,
            RankDataType.DATA_ZHUAN,
            RankDataType.DATA_VIP,
            RankDataType.DATA_MONTH,
        ];
    RankDataType.ITEMS[RankDataType.TYPE_PASS] =
        RankDataType.ITEMS[RankDataType.TYPE_COPY] =
            [
                RankDataType.DATA_POS,
                RankDataType.DATA_ID,
                RankDataType.DATA_PLAYER,
                RankDataType.DATA_POWER,
                RankDataType.DATA_VIP,
                RankDataType.DATA_COUNT,
                RankDataType.DATA_MONTH,
            ];
    RankDataType.ITEMS[RankDataType.TYPE_LILIAN] =
        [
            RankDataType.DATA_POS,
            RankDataType.DATA_ID,
            RankDataType.DATA_PLAYER,
            RankDataType.DATA_LEVEL,
            RankDataType.DATA_ZHUAN,
            RankDataType.DATA_VIP,
            RankDataType.DATA_MONTH,
            RankDataType.DATA_COUNT,
            RankDataType.DATA_EXP,
        ];
    RankDataType.ITEMS[RankDataType.TYPE_XUNZHANG] =
        [
            RankDataType.DATA_POS,
            RankDataType.DATA_ID,
            RankDataType.DATA_PLAYER,
            RankDataType.DATA_LEVEL,
            RankDataType.DATA_ZHUAN,
            RankDataType.DATA_VIP,
            RankDataType.DATA_MONTH,
            RankDataType.DATA_COUNT
        ];
    RankDataType.ITEMS[RankDataType.TYPE_XIAYI] =
        [
            RankDataType.DATA_POS,
            RankDataType.DATA_ID,
            RankDataType.DATA_PLAYER,
            RankDataType.DATA_VIP,
            RankDataType.DATA_COUNT
        ];
    RankDataType.readFunc = {};
    RankDataType.readFunc[RankDataType.DATA_JOB] =
        RankDataType.readFunc[RankDataType.DATA_SEX] =
            'readByte';
    RankDataType.readFunc[RankDataType.DATA_POS] =
        RankDataType.readFunc[RankDataType.DATA_LEVEL] =
            RankDataType.readFunc[RankDataType.DATA_ZHUAN] =
                RankDataType.readFunc[RankDataType.DATA_VIP] =
                    RankDataType.readFunc[RankDataType.DATA_MONTH] =
                        'readShort';
    RankDataType.readFunc[RankDataType.DATA_ID] =
        RankDataType.readFunc[RankDataType.DATA_POWER] =
            RankDataType.readFunc[RankDataType.DATA_COUNT] =
                RankDataType.readFunc[RankDataType.DATA_EXP] =
                    'readInt';
    RankDataType.readFunc[RankDataType.DATA_POWER] = 'readDouble';
    RankDataType.readFunc[RankDataType.DATA_PLAYER] = 'readString';
})(RankDataType || (RankDataType = {}));
//# sourceMappingURL=RankDataType.js.map