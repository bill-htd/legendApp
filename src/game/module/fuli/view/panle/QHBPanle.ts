

/**
 * 抢红包的活动id是 2001 
 * 由于没有配置文件，之类直接写上 2001
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


	constructor() {
		super();
		this.skinName = "qianghongbaoSkin";
		this.hbbtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		this.observe(Activity.ins().postEnvelopeData, this.initHongbaoInfo);//下发新红包
	}


	public open(...param: any[]): void {
		console.log(this.skin)
		this.init()
	}

	//只要没过时就可以领取
	public initHongbaoInfo(...param: any[]): void {
		console.log(param[0])

		let bytes = param[0]
		let reld: RedEnvelope = new RedEnvelope();
		reld.id = bytes.readUnsignedShort();
		reld.timer = bytes.readInt();
		if (reld.isOverTimer()) {
			// 
			console.log('红包已过时')
		} else {
			console.log('可以领取')
			this.initQhongbaoInfo(reld.id)
		}

		let noName = bytes.readInt();
		// let hongbaoNum = bytes.readShort();
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
			obj[i] = {}
			obj[i].name = bytes.readString();
			obj[i].hongbaoid = bytes.readShort();
			obj[i].job = bytes.readShort();
			obj[i].sex = bytes.readShort();
			obj[i].isSuccess = bytes.readByte();
			obj[i].serverId = bytes.readInt();
		}

		if (Activity.ins().activityData[2001] as ActivityType24Data) {
			let actData: ActivityType24Data = Activity.ins().activityData[2001] as ActivityType24Data;
			actData.update_MyQenvelopeData(_MyQenvelopeData)
		}
	}

	private initQhongbaoInfo(eid): void {
		this.qianghongbao.visible = true;
		this.showhongbao.visible = false;
		this.eid = eid
	}
	private initShowHongBao(QenvelopeData): void {
		this.qianghongbao.visible = false;
		this.showhongbao.visible = true;
		console.log('这里显示抢完的红包信息 ：')
		console.log(QenvelopeData)
		for (let i = 0; i < QenvelopeData.length; i++) {

		}
	}

	public init(): void {

		// 先判断有没有红包没有领取如果有就
		if (Activity.ins().activityData[2001] as ActivityType24Data) {
			let actData: ActivityType24Data = Activity.ins().activityData[2001] as ActivityType24Data;
			if (actData.envelopeData.length > 0) {
				Activity.ins().sendEnvelopeData(2001, actData.envelopeData[0].id)
			} else {
				//没有红包
				this.initShowHongBao(actData.QenvelopeData)
			}
		}






		this.list.itemRenderer = CreateRoleViewItem;

		let arrName: string[] = ["", "", "", ""];
		let addName = ["紫廖渔歌", "半瓶矿泉水", "暖风", "繁华过后", "念迩成习", "逆丶美丽",
			"握不住的美", "隔岸觀火", "残喘的笑", "何时苏醒", "湮丶燃尽了", "年少无知≈", "卸不掉的盔甲", "″温瞳渐远≈",
			"男人/吥乖", "走遍四方", "我已无力说爱", "繁华沧桑", "卡尺", "往事随风", "剑胆琴心", "心如止水", "风伤依旧",
			"一直很低调", "遥忘而立", "忧郁的萨克斯", "哥比彩钻还炫", "烈日追风", "本人、已昏", "全橙相伴", "残月孤生"];
		for (let i = 0; i < 3; i++) {
			arrName = arrName.concat(addName);
		}
		this.list.dataProvider = new eui.ArrayCollection(arrName);
		this.scroller.touchChildren = false;
		this.scroller.touchEnabled = false;

		this.listH = this.list.height - 200;
		this.scroller.viewport.scrollV = 0;
		let t = egret.Tween.get(this.scroller.viewport);
		t.to({ scrollV: this.listH }, 40 * this.listH).call(this.loopT, this);
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
		this.removeTouchEvent(this, this.onTouch);
	}

	private onTouch(e: egret.TouchEvent): void {
		switch (e.target) {
			case this.hbbtn:
				Activity.ins().sendReward(2001, this.eid, 1);
				break;
		}
	}
}