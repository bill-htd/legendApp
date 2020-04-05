class ChargeItemRenderer extends BaseItemRender {
	public gain0: eui.Label;
	public gain1: eui.Label;
	public pay: eui.Label;
	public pay0: eui.Label;
	public pay1: eui.Label;
	public payPrice: eui.Group;
	public moneyGroup: eui.Group;
	public yuanbaoImg: eui.Image;
	private totalPower: egret.DisplayObjectContainer;
	public constructor() {
		super();
		this.skinName = "ChargeItemSkin";

		this.totalPower = BitmapNumber.ins().createNumPic(0, "vip_v", 5);
		this.totalPower.x = 0;
		this.totalPower.y = 0;
		this.moneyGroup.addChild(this.totalPower);
	}

	protected dataChanged(): void {
		//元宝图片
		this.refushInfo();
	}

	private refushInfo(): void {
		this.gain0.text = this.data.itemName;
		this.gain1.text = this.data.desc;
		switch (this.data.icon) {
			case 'cz_11':
				this.yuanbaoImg.source = 'new_chongzhi_yuanbao1';
				break;
			case 'cz_12':
				this.yuanbaoImg.source = 'new_chongzhi_yuanbao2';
				break;
			case 'cz_13':
				this.yuanbaoImg.source = 'new_chongzhi_yuanbao3';
				break;
			case 'cz_14':
				this.yuanbaoImg.source = 'new_chongzhi_yuanbao4';
				break;
			case 'cz_15':
				this.yuanbaoImg.source = 'new_chongzhi_yuanbao5';
				break;
			case 'cz_16':
				this.yuanbaoImg.source = 'new_chongzhi_yuanbao6';
				break;
			default:
				this.yuanbaoImg.source = 'new_chongzhi_yuanbao6';
				break;
		}
		/*
		10  9.8
		20  19.2
		50  48
		100  92
		200  182
		500  440
		1000  840
		1500  1230
		2000  1560
		3000  2250
		*/

		let cost: number = this.data.cash;
		this.pay.text = `原价:${cost}元`;
		let trueCost: number = 0;
		switch (cost) {
			case 10:
				// trueCost = 9.8;
				this.payPrice.visible = false
				this.pay1.visible = true
				break;
			case 20:
				this.payPrice.visible = false
				this.pay1.visible = true
				break;
			case 50:
				this.payPrice.visible = false
				this.pay1.visible = true
				break;
			case 100:
				this.payPrice.visible = false
				this.pay1.visible = true
				break;
			case 200:
				this.payPrice.visible = false
				this.pay1.visible = true
				// cost = 300
				break;
			case 300:
				this.payPrice.visible = false
				this.pay1.visible = true
				// cost = 300
				break;
			case 350:
				this.payPrice.visible = true
				this.pay1.visible = false
				trueCost = 300;
				break;
			case 500:

				this.payPrice.visible = true
				this.pay1.visible = false
				trueCost = 440;
				break;
			case 1000:
				this.payPrice.visible = true
				this.pay1.visible = false
				trueCost = 840;
				break;
			case 1500:
				this.payPrice.visible = true
				this.pay1.visible = false
				trueCost = 1230;
				break;
			case 2000:
				this.payPrice.visible = true
				this.pay1.visible = false
				trueCost = 1560;
				break;
			case 3000:
				this.payPrice.visible = true
				this.pay1.visible = false
				trueCost = 2250;
				break;
		}
		this.pay1.text = `${cost}元`
		this.pay0.text = `${trueCost}元`;
		
		this.pay.strokeColor = 0x000000;
        this.pay.stroke = 2;
		this.pay1.strokeColor = 0x000000;
        this.pay1.stroke = 2;
		this.pay0.strokeColor = 0x000000;
        this.pay0.stroke = 2;
		if (Recharge.ins().getOrderByIndex(this.data.id)) {
			BitmapNumber.ins().changeNum(this.totalPower, this.data.amount, "vip_v", 3);
		} else {
			BitmapNumber.ins().changeNum(this.totalPower, this.data.award, "vip_v", 3);
		}
		this.moneyGroup.width = this.totalPower.width;
		this.invalidateState();
	}

	protected getCurrentState(): string {
		let state = "up";
		if (Recharge.ins().getOrderByIndex(this.data.id)) {
			if (this.selected) {
				state = "down";
			}
		} else {
			state = "firstUp"
			if (this.selected) {
				state = "fistDown";
			}
		}

		return state;
	}
}