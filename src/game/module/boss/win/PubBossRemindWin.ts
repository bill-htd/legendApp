/**
 * boss复活提醒
 */
class PubBossRemindWin extends BaseEuiView {

	private closeBtn: eui.Button;
	private closeBtn0: eui.Button;

	private list0: eui.List;
	private listDatas: eui.ArrayCollection;
	private bgClose: eui.Rect;

	private autoChallenge: eui.CheckBox;

	private type: number;
	constructor() {
		super();
		this.skinName = "PubBossRemindSkin";
		this.isTopLevel = true;
	}

	public initUI(): void {
		super.initUI();

		this.listDatas = new eui.ArrayCollection;
	}

	public open(...param: any[]): void {
		this.type = param[0]

		this.autoChallenge.visible = Recharge.ins().franchise ? true : false;
		let tempArr: WorldBossItemData[] = [];
		tempArr = UserBoss.ins().worldInfoList[this.type].slice();

		if (this.type == UserBoss.BOSS_SUBTYPE_QMBOSS) {
			this.list0.itemRenderer = PubBossRemindItem;
			this.autoChallenge.selected = AutoChallengeBoss.ins().autoYewaiBoss;
		} else if (this.type == UserBoss.BOSS_SUBTYPE_HOMEBOSS) {
			this.list0.itemRenderer = HomeBossRemindItem;
		} else if (this.type == UserBoss.BOSS_SUBTYPE_DARKBOSS) {
			this.list0.itemRenderer = PubBossRemindItem;
			this.autoChallenge.visible = false;
		} else if (this.type == UserBoss.BOSS_SUBTYPE_GODWEAPON) {
			tempArr = UserBoss.ins().getGwBossList();
			this.list0.itemRenderer = GwBossRemindItem;
			this.autoChallenge.visible = false;
		} else if (this.type == UserBoss.BOSS_SUBTYPE_SHENYU) {
			this.list0.itemRenderer = PubBossRemindItem;
			this.autoChallenge.selected = AutoChallengeBoss.ins().autoShenyuBoss;
		}


		this.addTouchEvent(this.autoChallenge, this.onChallenge);
		// this.addTouchEvent(this.closeBtn, this.onTap);
		this.addTouchEvent(this.closeBtn0, this.onTap);
		this.addTouchEvent(this.bgClose, this.onTap)
		
		if (this.type == UserBoss.BOSS_SUBTYPE_QMBOSS) {
			if (!SamsaraModel.ins().isOpen()) {
				let ary: WorldBossItemData[] = [];
				for (let i in tempArr) {
					let config: WorldBossConfig = GlobalConfig.WorldBossConfig[tempArr[i].id];
					if (!config.samsaraLv) {
						ary.push(tempArr[i]);
					}
				}
				tempArr = ary;
			}
		}

		this.listDatas.source = tempArr.sort(this.compareFn);
		this.list0.dataProvider = this.listDatas;
		this.addTouchEvent(this, this.onTap);


	}

	public close(...param: any[]): void {
		UserBoss.ins().sendBossSetting();
		this.removeTouchEvent(this, this.onTap);
		this.removeTouchEvent(this.closeBtn, this.onTap);
		this.removeTouchEvent(this.closeBtn0, this.onTap);
		this.removeTouchEvent(this.bgClose, this.onTap);

		AutoChallengeBoss.ins().checkEnter();
	}
	private onChallenge(e: egret.TouchEvent): void {
		if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
			ViewManager.ins().open(BagFullTipsWin, UserBag.BAG_ENOUGH);
			this.autoChallenge.selected = false;
		}
		else {
			if (this.type == UserBoss.BOSS_SUBTYPE_SHENYU) {
				AutoChallengeBoss.ins().autoShenyuBoss = this.autoChallenge.selected;
			}
			else if (this.type == UserBoss.BOSS_SUBTYPE_QMBOSS) {
				AutoChallengeBoss.ins().autoYewaiBoss = this.autoChallenge.selected;
			}
			// AutoChallengeBoss.ins().checkEnter();
		}
	}


	private onTap(e: egret.TouchEvent): void {

		if (e.target instanceof eui.CheckBox) {
			let index: number = parseInt((<eui.CheckBox>e.target).name);
			UserBoss.ins().setBossSetting(index);
		}
		else {
			switch (e.currentTarget) {
				case this.bgClose:
				case this.closeBtn:
				case this.closeBtn0:
					ViewManager.ins().close(this);
					break;
			}
		}
	}

	private compareFn(a: WorldBossItemData, b: WorldBossItemData): number {
		let configA: WorldBossConfig = GlobalConfig.WorldBossConfig[a.id];
		let configB: WorldBossConfig = GlobalConfig.WorldBossConfig[b.id];
		let canChallenge1 = UserBoss.isCanChallenge(configA);
		let canChallenge2 = UserBoss.isCanChallenge(configB);
		if (canChallenge1 && !canChallenge2) {
			return -1;
		} else if (!canChallenge1 && canChallenge2) {
			return 1;
		} else {
			if (configA.samsaraLv > configB.samsaraLv) {
				return 1;
			}
			else if (configA.samsaraLv < configB.samsaraLv) {
				return -1;
			}
			else if (configA.samsaraLv == configB.samsaraLv && configA.samsaraLv != 0) {
				if (configA.level > configB.level)
					return 1;
				else if (configA.level < configB.level)
					return -1;
			}
			else {
				if (configA.zsLevel > configB.zsLevel) {
					return 1;
				} else if (configA.zsLevel < configB.zsLevel) {
					return -1;
				}

				if (configA.level > configB.level)
					return 1;
				else if (configA.level < configB.level)
					return -1;
				else
					return 0;
			}
		}
	}
}
ViewManager.ins().reg(PubBossRemindWin, LayerManager.UI_Main);