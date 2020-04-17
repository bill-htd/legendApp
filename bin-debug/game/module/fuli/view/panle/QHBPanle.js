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
var QHBPanle = (function (_super) {
    __extends(QHBPanle, _super);
    function QHBPanle() {
        var _this = _super.call(this) || this;
        _this.skinName = "qianghongbaoSkin";
        _this.hbbtn.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouch, _this);
        _this.btn1.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouch, _this);
        _this.observe(Activity.ins().postEnvelopeData, _this.initHongbaoInfo);
        _this.observe(Activity.ins().postRewardResult, _this.initShowHongBao);
        return _this;
    }
    QHBPanle.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
    };
    QHBPanle.prototype.initHongbaoInfo = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var actData = Activity.ins().activityData[2001];
        var bytes = param[0];
        var id = bytes.readInt();
        var isSuccess = bytes.readByte();
        if (isSuccess) {
            var reld = new RedEnvelope();
            reld.id = bytes.readUnsignedShort();
            reld.timer = bytes.readInt();
            this.initQhongbaoInfo(reld.id);
        }
        else {
            this.initShowHongBao();
            console.log('没有红包可以领取');
        }
        var noName = bytes.readInt();
        var rechargeNum = bytes.readInt();
        var eWaiYBNum = bytes.readInt();
        var len = bytes.readShort();
        var _MyQenvelopeData = [];
        for (var i = 0; i < len; i++) {
            var MyQinfo = new MyQenvelopeData;
            MyQinfo.eId = bytes.readShort();
            MyQinfo.yuanbao = bytes.readInt();
            MyQinfo.Ewai_yuanbao = bytes.readInt();
            _MyQenvelopeData.push(MyQinfo);
        }
        var Num = bytes.readShort();
        var obj = [];
        for (var i = 0; i < Num; i++) {
            var Qinfo = new QenvelopeData;
            Qinfo.recordId = bytes.readInt();
            Qinfo.name = bytes.readString();
            Qinfo.eId = bytes.readShort();
            Qinfo.job = bytes.readShort();
            Qinfo.sex = bytes.readShort();
            Qinfo.isEwai = bytes.readByte();
            Qinfo.yuanbao = bytes.readInt();
            obj.push(Qinfo);
            if (Qinfo.recordId > actData.maxRecord) {
                actData.maxRecord = Qinfo.recordId;
            }
        }
        actData.update_MyQenvelopeData(_MyQenvelopeData);
        actData.update_QenvelopeData(obj);
    };
    QHBPanle.prototype.initQhongbaoInfo = function (eid) {
        this.qianghongbao.visible = true;
        this.showhongbao.visible = false;
        this.eid = eid;
    };
    QHBPanle.prototype.updateNextHongBaoTime = function () {
        var actData = Activity.ins().activityData[2001];
        if (actData.envelopeData.length > 0) {
            var str = DateUtils.getFormatBySecond(actData.envelopeData[0].getStartTimer(), 10);
            this.kqTime.text = str;
            if (actData.envelopeData[0].getStartTimer() <= 0) {
                this.kqTime.text = '0';
                TimerManager.ins().remove(this.updateNextHongBaoTime, this);
                this.init();
            }
        }
        else {
            this.kqTime.text = '无可领取';
            TimerManager.ins().remove(this.updateNextHongBaoTime, this);
        }
    };
    QHBPanle.prototype.initShowHongBao = function () {
        if (Activity.ins().activityData[2001]) {
            var actData = Activity.ins().activityData[2001];
            if (actData.isSuccess) {
                var eWaiYuanBao = actData.eWaiYuanBao;
                var MyQenvelope = actData.getMax_hongbao();
                var QenvelopeData_1 = actData.QenvelopeData;
                this.qianghongbao.visible = false;
                this.showhongbao.visible = true;
                if (actData.shengYuKeLingHongBao < 0) {
                    this.hongbaoNum.text = '0';
                }
                else {
                    this.hongbaoNum.text = actData.shengYuKeLingHongBao.toString();
                }
                TimerManager.ins().remove(this.updateNextHongBaoTime, this);
                TimerManager.ins().doTimer(1000, 0, this.updateNextHongBaoTime, this);
                var arrName = [];
                for (var i = 0; i < QenvelopeData_1.length; i++) {
                    var str = QenvelopeData_1[i].name + '抢到了' + QenvelopeData_1[i].yuanbao + ' 元宝';
                    arrName.push(str);
                }
                this.scrollLength = arrName.length;
                this.list.dataProvider = new eui.ArrayCollection(arrName);
                this.scroller.touchChildren = false;
                this.scroller.touchEnabled = false;
                if (arrName.length * this.listH > 135) {
                    this.listH = this.list.height;
                    this.scroller.viewport.scrollV = 0;
                    var t = egret.Tween.get(this.scroller.viewport);
                    t.to({ scrollV: this.listH }, arrName.length * this.listH).call(this.loopT, this);
                }
                if (MyQenvelope) {
                    this.hasHongbao.visible = true;
                    this.noHongbao.visible = false;
                    this.yuanbao1.text = MyQenvelope.yuanbao.toString();
                    if (eWaiYuanBao) {
                        this.yuanbao2.text = eWaiYuanBao.toString();
                        this.btn1.visible = true;
                    }
                    else {
                        this.yuanbao2.text = MyQenvelope.Ewai_yuanbao.toString();
                        this.btn1.visible = false;
                    }
                }
                else {
                    this.hasHongbao.visible = false;
                    this.noHongbao.visible = true;
                }
            }
            else {
                alert('领取失败');
            }
        }
    };
    QHBPanle.prototype.init = function () {
        Activity.ins().sendChangePage(2001);
        if (Activity.ins().activityData[2001]) {
            var actData = Activity.ins().activityData[2001];
            if (actData.envelopeData.length > 0 && actData.envelopeData[0].canStartTimer()) {
                Activity.ins().sendEnvelopeData(2001, actData.envelopeData[0].id, actData.maxRecord);
            }
            else {
                this.initShowHongBao();
            }
        }
        this.list.itemRenderer = QHBItem;
    };
    QHBPanle.prototype.loopT = function () {
        this.scroller.viewport.scrollV = 0;
        var t = egret.Tween.get(this.scroller.viewport);
        t.to({ scrollV: this.listH }, this.scrollLength * this.listH).call(this.loopT, this);
    };
    QHBPanle.prototype.update = function () {
    };
    QHBPanle.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        this.hbbtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.btn1.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.removeTouchEvent(this, this.onTouch);
    };
    QHBPanle.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.hbbtn:
                Activity.ins().sendReward(2001, this.eid, 1);
                break;
            case this.btn1:
                if (Activity.ins().activityData[2001]) {
                    var actData = Activity.ins().activityData[2001];
                    var rechargeNum = actData.rechargeNum;
                    if (rechargeNum > 0) {
                        Activity.ins().sendReward(2001, this.eid, 2);
                    }
                    else {
                        WarnWin.show("充值任意金额才能领取红包", function () {
                            ViewManager.ins().close(FuliWin);
                            RechargeData.checkOpenWin();
                        }, this, function () {
                        }, this);
                    }
                }
                break;
        }
    };
    return QHBPanle;
}(BaseView));
__reflect(QHBPanle.prototype, "QHBPanle");
//# sourceMappingURL=QHBPanle.js.map