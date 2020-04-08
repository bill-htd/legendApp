class payWin extends BaseEuiView {

	private moneyNum: eui.Label;
	private yuanbaoNum: eui.Label;

	private money: number = 0;
	private yuanbao: number = 0;
	private payType: number = 1;
	private WXbtn: eui.Button;
	private ZFBbtn: eui.Button;
	private Paybtn: eui.Button;
	private wxChoose: eui.Image;
	private zfbChoose: eui.Image;

	private bgClose: eui.Rect;


	public constructor() {
		super();
		this.isTopLevel = true;
		this.skinName = "paySkin";
	}
	// 传进来的数据！
	public open(...param: any[]): void {
		this.money = param[0].money
		this.yuanbao = param[0].yuanbao
		this.moneyNum.text = this.money + '元'
		this.yuanbaoNum.text = this.yuanbao + '元宝'
		this.addTouchEvent(this.WXbtn, this.onTap);
		this.addTouchEvent(this.ZFBbtn, this.onTap);
		this.addTouchEvent(this.Paybtn, this.sendPay);
		this.addTouchEvent(this.bgClose, this.onTap);
	}

	public close(...param: any[]): void {
		this.removeTouchEvent(this.WXbtn, this.onTap);
		this.removeTouchEvent(this.ZFBbtn, this.onTap);
		this.removeTouchEvent(this.Paybtn, this.onTap);
		this.removeTouchEvent(this.bgClose, this.onTap);
		egret.Tween.removeTweens(this);
		this.removeObserve()
	}

	private setType(num): void {
		this.payType = num
	}

	private sendPay(): void {
		if (this.payType == 1) {
			WarnWin.show("正在拉起支付，请稍等...\n\n(如果有提示，请放心支付。如果有疑问，请点击左下角客服按钮与我们联系）", function () { }, this,function(){},this,'sure');
			Pay.ins().sendPayStyte(this.money, this.payType, this.yuanbao)
		} else {
			WarnWin.show("微信支付目前正在调试中，请先用支付宝支付", function () { }, this);
		}
		ViewManager.ins().close(payWin)
	}
	private onTap(e: egret.TouchEvent): void {
		switch (e.currentTarget) {
			case this.WXbtn:
				this.setType(2)
				this.wxChoose.visible = true
				this.zfbChoose.visible = false
				break;
			case this.ZFBbtn:
				this.wxChoose.visible = false
				this.zfbChoose.visible = true
				this.setType(1)
				break;
			case this.bgClose:
				ViewManager.ins().close(payWin);
		}
	}

}
ViewManager.ins().reg(payWin, LayerManager.UI_Popup);