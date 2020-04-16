

/**
 * 抢红包的活动id是 2001 
 * 由于没有配置文件，之类直接写上 2001
 * 
 * 
 * 
 */


class QHBPanle extends BaseView {

	public list: eui.List;
	public scroller: eui.Scroller;
	private listH: number;
	private qianghongbao: eui.Group;
	private showhongbao: eui.Group;
	private eid: number;
	private hbbtn: eui.Button;

	private yuanbao1: eui.Label;
	private yuanbao2: eui.Label;
	private btn1: eui.Button;


	private hongbaoNum: eui.Label;
	private kqTime: eui.Label;



	constructor() {
		super();
		this.skinName = "qianghongbaoSkin";
		this.hbbtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		this.btn1.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		this.observe(Activity.ins().postEnvelopeData, this.initHongbaoInfo);//下发新红包
		this.observe(Activity.ins().postRewardResult, this.initShowHongBao);//下发新红包
	}


	public open(...param: any[]): void {
		console.log(this.skin)
		this.init()
	}

	//只要没过时就可以领取
	public initHongbaoInfo(...param: any[]): void {
		console.log(param[0])
		let actData: ActivityType24Data = Activity.ins().activityData[2001] as ActivityType24Data;

		
		let bytes = param[0]
		let id = bytes.readInt();
		let isSuccess = bytes.readByte();
		if (isSuccess) {
			let reld: RedEnvelope = new RedEnvelope();
			reld.id = bytes.readUnsignedShort();
			reld.timer = bytes.readInt();
			console.log('可以领取')
			this.initQhongbaoInfo(reld.id)
		} else {
			console.log('没有红包可以领取')
		}



		let noName = bytes.readInt();
		let rechargeNum = bytes.readInt();

		let eWaiYBNum = bytes.readInt();
		let len = bytes.readShort();
		let _MyQenvelopeData = []
		for (let i = 0; i < len; i++) {
			let MyQinfo: MyQenvelopeData = new MyQenvelopeData;
			MyQinfo.eId = bytes.readShort();
			MyQinfo.yuanbao = bytes.readInt();
			MyQinfo.Ewai_yuanbao = bytes.readInt();
			_MyQenvelopeData.push(MyQinfo)
		}
		let Num = bytes.readShort();
		let obj = []
		for (let i = 0; i < Num; i++) {
			let Qinfo: QenvelopeData = new QenvelopeData;
			Qinfo.recordId = bytes.readInt();
			Qinfo.name = bytes.readString();
			Qinfo.eId = bytes.readShort();
			Qinfo.job = bytes.readShort();
			Qinfo.sex = bytes.readShort();
			Qinfo.isEwai = bytes.readByte();
			Qinfo.yuanbao = bytes.readInt();
			obj.push(Qinfo)
			if (Qinfo.recordId > actData.maxRecord) {
				actData.maxRecord = Qinfo.recordId
			}
		}
		actData.update_MyQenvelopeData(_MyQenvelopeData)
		actData.update_QenvelopeData(obj)
		
	}

	// private showHongBaoInfo() {
	// 	console.log('显示抢红包面板')
	// }
	private initQhongbaoInfo(eid): void {
		this.qianghongbao.visible = true;
		this.showhongbao.visible = false;
		this.eid = eid
	}
	public updateNextHongBaoTime(){
		
		let actData: ActivityType24Data = Activity.ins().activityData[2001] as ActivityType24Data;
		if(actData.envelopeData.length > 0){
			let str = DateUtils.getFormatBySecond(actData.envelopeData[0].getStartTimer(),10)
			this.kqTime.text = str
			if(actData.envelopeData[0].getStartTimer() <=0){
				TimerManager.ins().remove(this.updateNextHongBaoTime, this);
			}
		}else{
			this.kqTime.text = '无可领取'
			TimerManager.ins().remove(this.updateNextHongBaoTime, this);
		}
		
	}
	private initShowHongBao(): void {
		if (Activity.ins().activityData[2001] as ActivityType24Data) {
			let actData: ActivityType24Data = Activity.ins().activityData[2001] as ActivityType24Data;

			if (actData.isSuccess) {
				let eWaiYuanBao = actData.eWaiYuanBao;
				let MyQenvelope = actData.getMax_hongbao();
				let QenvelopeData = actData.QenvelopeData;
				this.qianghongbao.visible = false;
				this.showhongbao.visible = true;


				this.hongbaoNum.text = actData.shengYuKeLingHongBao.toString()

				TimerManager.ins().doTimer(1000, 0, this.updateNextHongBaoTime, this);
				
				


				let arrName = []
				for (let i = 0; i < QenvelopeData.length; i++) {
					let str = QenvelopeData[i].name + '抢到了' + QenvelopeData[i].yuanbao + ' 元宝'
					arrName.push(str)
				}
				this.list.dataProvider = new eui.ArrayCollection(arrName);
				this.scroller.touchChildren = false;
				this.scroller.touchEnabled = false;

				this.listH = this.list.height - 200;
				this.scroller.viewport.scrollV = 0;
				let t = egret.Tween.get(this.scroller.viewport);
				t.to({ scrollV: this.listH }, 40 * this.listH).call(this.loopT, this);


				// 拿出最大红包
				this.yuanbao1.text = MyQenvelope.yuanbao.toString()
				if (eWaiYuanBao) {
					this.btn1.visible = true;
				} else {
					this.btn1.visible = false;
				}
				this.yuanbao2.text = eWaiYuanBao.toString();
			} else {
				alert('领取失败')
			}

		}


	}

	public init(): void {
		Activity.ins().sendChangePage(2001)
		// 先判断有没有红包没有领取如果有就
		if (Activity.ins().activityData[2001] as ActivityType24Data) {
			let actData: ActivityType24Data = Activity.ins().activityData[2001] as ActivityType24Data;
			if (actData.envelopeData.length > 0 && actData.envelopeData[0].canStartTimer()) {
				Activity.ins().sendEnvelopeData(2001, actData.envelopeData[0].id,actData.maxRecord)
			} else {
				//没有红包
				this.initShowHongBao()
			}
		}

		this.list.itemRenderer = QHBItem;




	}

	private loopT() {
		this.scroller.viewport.scrollV = 200;
		let t = egret.Tween.get(this.scroller.viewport);
		t.to({ scrollV: this.listH }, 40 * this.listH).call(this.loopT, this);
	}
	private update(): void {

	}

	public close(...param: any[]): void {
		this.removeObserve();
		this.hbbtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		this.btn1.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		this.removeTouchEvent(this, this.onTouch);
	}

	private onTouch(e: egret.TouchEvent): void {
		switch (e.target) {
			case this.hbbtn:
				Activity.ins().sendReward(2001, this.eid, 1);
				break;
			case this.btn1:
				if (Activity.ins().activityData[2001] as ActivityType24Data) {
					let actData: ActivityType24Data = Activity.ins().activityData[2001] as ActivityType24Data;
					let rechargeNum = actData.rechargeNum;
					if (rechargeNum > 0) {
						Activity.ins().sendReward(2001, this.eid, 2);
					} else {
						alert('没有充值');
					}
				}

				break;
		}
	}
}