var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PActivityDataFactory = (function () {
    function PActivityDataFactory() {
    }
    PActivityDataFactory.create = function (bytes) {
        var id = bytes.readInt();
        var startTime = bytes.readInt();
        var endTime = bytes.readInt();
        var type = bytes.readShort();
        var len = bytes.readInt();
        var data;
        switch (type) {
            case PActivityDataFactory.PACTIVITY_TYPE_1:
                data = new PActivityType1Data(bytes);
                break;
            case PActivityDataFactory.PACTIVITY_TYPE_2:
                data = new PActivityType2Data(bytes);
                break;
            case PActivityDataFactory.PACTIVITY_TYPE_3:
                data = new PActivityType3Data(bytes);
                break;
            case PActivityDataFactory.PACTIVITY_TYPE_9:
                data = new PActivityType9Data(bytes);
                break;
            default: {
                if (!ErrorLog.Assert(type, "\u9519\u8BEF\u4E2A\u4EBA\u6D3B\u52A8:" + id + " \u7C7B\u578B:" + type))
                    for (var i = 0; i < len; i++) {
                        bytes.readByte();
                    }
                return null;
            }
        }
        if (!data)
            return null;
        data.id = id;
        data.startTime = startTime;
        data.endTime = endTime;
        data.type = type;
        data.activityType = ActivityType.Personal;
        var paconfig = GlobalConfig.PActivityConfig[id];
        if (paconfig) {
            data.duration = paconfig.duration;
        }
        return data;
    };
    PActivityDataFactory.PACTIVITY_TYPE_1 = 1;
    PActivityDataFactory.PACTIVITY_TYPE_2 = 2;
    PActivityDataFactory.PACTIVITY_TYPE_3 = 3;
    PActivityDataFactory.PACTIVITY_TYPE_4 = 4;
    PActivityDataFactory.PACTIVITY_TYPE_5 = 5;
    PActivityDataFactory.PACTIVITY_TYPE_6 = 6;
    PActivityDataFactory.PACTIVITY_TYPE_7 = 7;
    PActivityDataFactory.PACTIVITY_TYPE_8 = 8;
    PActivityDataFactory.PACTIVITY_TYPE_9 = 9;
    PActivityDataFactory.PACTIVITY_TYPE_10 = 10;
    PActivityDataFactory.PACTIVITY_TYPE_11 = 11;
    PActivityDataFactory.PACTIVITY_TYPE_17 = 17;
    return PActivityDataFactory;
}());
__reflect(PActivityDataFactory.prototype, "PActivityDataFactory");
//# sourceMappingURL=PActivityDataFactory.js.map