class ChargeItemRenderer extends BaseItemRender {
	public gain0: eui.Label;
	public gain1: eui.Label;
	public pay: eui.Label;
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

		let cost: number = this.data.cash;
		this.pay.text = `￥${cost}`;
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