class QHBPanle extends BaseView {

	public list: eui.List;
	public scroller: eui.Scroller;
	private listH: number;

	constructor() {
		super();
		this.skinName = "qianghongbaoSkin";
	}


	public open(...param: any[]): void {
		console.log(this.skin)
		this.init()
	}

	public init(): void {
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
		this.removeTouchEvent(this, this.onTouch);
	}

	private onTouch(e: egret.TouchEvent): void {
		switch (e.target) {
			// case this.suerBtn:
			// 	Activity.ins().sendReward(this._cfg.activityId, 1);
			// 	break;
		}
	}
}