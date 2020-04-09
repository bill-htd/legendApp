class QHBPanle extends BaseView {



	constructor() {
		super();
		this.skinName = "qianghongbaoSkin";
	}


	public open(...param: any[]): void {
        console.log(this.skin)
	}

	private update():void
	{

	}

	public close(...param: any[]): void {
		this.removeObserve();
		this.removeTouchEvent(this, this.onTouch);
	}

	private onTouch(e:egret.TouchEvent):void
	{
		switch (e.target)
		{
			// case this.suerBtn:
			// 	Activity.ins().sendReward(this._cfg.activityId, 1);
			// 	break;
		}	
	}
}