/**
 * 结算页管理类
 *
 * */
class ResultManager extends BaseClass {
	/**
	 * 构造函数
	 */
	public constructor() {
		super();

	}

	/** 重载单例*/
	public static ins(): ResultManager {
		return super.ins() as ResultManager
	}

	/**
	 * 创建结算页
	 * */
	public create(fb: number, ...param: any[]): void {
		let fbType: number = fb ? fb : GameMap.fbType;


		switch (fbType) {
			case UserFb.FB_TYPE_PERSONAL://个人副本
			case UserFb.FB_TYPE_GUARD_WEAPON:
				ViewManager.ins().open(PersonalResultWin, ...param);
				break;
			case UserFb.FB_TYPE_TIAOZHAN://通天塔
				ViewManager.ins().open(TongResultWin, ...param);
				break;
			case UserFb.FB_TYPE_FIRE_RING://烈焰副本收费副本
			case UserFb.FB_TYPE_MATERIAL://材料副本
				if (fbType == UserFb.FB_TYPE_FIRE_RING && param != undefined && param[0] != undefined && param[0] == 0) {
					Activity.ins().removeEvent();
				}
				ViewManager.ins().open(MaterialResultWin, ...param);
				break;
			case UserFb.FB_TYPE_NEW_WORLD_BOSS://新世界boss
				ViewManager.ins().open(NewWorldBossResultPanel);
				break;
			case UserFb.FB_TYPE_CITY://主城
				//myReward  [isBelong, belongName, belongImg]
				ViewManager.ins().open(CityResultWin, param[1], param[4]);
				break;
			case UserFb.FB_TYPE_ALLHUMENBOSS://野外
			case UserFb.FB_TYPE_ZHUANSHENGBOSS://秘境
			case UserFb.FB_TYPE_HOMEBOSS://BOSS之家
			case UserFb.FB_TYPE_LABA://腊八活动
			case UserFb.FB_TYPE_DARK_BOSS://暗之秘境boss
			case UserFb.FB_TYPE_HIDE_BOSS://隐藏boss
				//myReward  [isBelong, belongName, belongImg]
				// ViewManager.ins().open(BossResultWin,param[1],param[4]);
				ViewManager.ins().open(BossResultWin, param[1], param[4]);
				break;
			case UserFb.FB_TYPE_GOD_WEAPON:
			case UserFb.FB_TYPE_GOD_WEAPON_TOP:
				break;
			case UserFb.FB_TYPE_KF_BOSS:
				ViewManager.ins().open(KFBossResultWin, param[0], param[1]);
				break;
			// case UserFb.FB_TYPE_HIDE_BOSS:
			// 	UserFb.ins().sendExitFb();
			// 	break;
			default:
				ViewManager.ins().open(ResultWin, ...param);
				break;
		}

	}
}
