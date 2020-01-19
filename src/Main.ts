class Main extends egret.DisplayObjectContainer {

	public loadingView: LoadingUI;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(event: egret.Event) {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

		//注入自定义的素材解析器
		this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
		this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

		RES.setMaxLoadingThread(4);

		StageUtils.ins().setScaleMode(egret.StageScaleMode.FIXED_WIDTH);
		StageUtils.ins().getStage().orientation = egret.OrientationMode.AUTO;
		//适配方式
		if (DeviceUtils.IsPC) {
			StageUtils.ins().setScaleMode(egret.StageScaleMode.FIXED_HEIGHT);
			StageUtils.ins().getStage().orientation = egret.OrientationMode.AUTO;
		}
		if (navigator.userAgent.indexOf("iPad") != -1) {
			StageUtils.ins().setScaleMode(egret.StageScaleMode.FIXED_HEIGHT);
			StageUtils.ins().getStage().orientation = egret.OrientationMode.AUTO;
		}

		window["onorientationchange"] = function () {

			var or = window["orientation"];
			if (or == 90 || or == -90) {
				StageUtils.ins().setScaleMode(egret.StageScaleMode.FIXED_HEIGHT);
				StageUtils.ins().getStage().orientation = egret.OrientationMode.AUTO;
			} else {
				StageUtils.ins().setScaleMode(egret.StageScaleMode.FIXED_WIDTH);
				StageUtils.ins().getStage().orientation = egret.OrientationMode.AUTO;
			}
		}

		// var wid = egret_native.EGTView.getFrameWidth();  //获取原生屏幕分辨率宽

		// var hei = egret_native.EGTView.getFrameHeight();  //获取原生屏幕分辨率高



		// egret_native.EGTView.setDesignSize(wid, hei);   //设置

		// context.stage = new egret.Stage(wid, hei); //设置





		egret.lifecycle.onPause = function () {
			SoundManager.ins().setEffectOn(false);
			// SoundManager.ins().setBgOn(false);
		}

		egret.lifecycle.onResume = function () {
			if (SysSetting.ins().getBool(SysSetting.SOUND_EFFECT) == undefined) {
				SoundManager.ins().setEffectOn(true);
			} else {
				SoundManager.ins().setEffectOn(SysSetting.ins().getBool(SysSetting.SOUND_EFFECT));
			}

			// SoundManager.ins().setBgOn(false);
			// self.firm()
		}

		this.loadingView = new LoadingUI();
		this.loadingView.width = this.stage.stageWidth;
		this.loadingView.height = this.stage.stageHeight;
		this.loadingView.createView()

		this.stage.addChild(this.loadingView);

		console.log(StageUtils.ins().getStage().$children[2])
		console.log(this.loadingView)


		LocationProperty.init();

		FixUtil.fixAll();

		//设置跨域访问资源
		egret.ImageLoader.crossOrigin = "anonymous";
		ResVersionManager.ins().loadConfig(this.loadResVersionComplete, this);

		// LocationProperty.setLoadProgress(30, "(加载游戏配置)");
		this.loadingView.setProgress(30, '(加载游戏配置)')

	}

	private loadResVersionComplete(): void {
		ResourceUtils.ins().addConfig(`${RES_RESOURCE}default.res.json?v=` + Version.UPDATE_NUMBER, `${RES_RESOURCE}`);
		ResourceUtils.ins().loadConfig(this.onConfigComplete, this);
	}

	/**
	 * 配置文件加载完成,开始预加载preload资源组。
	 */
	private onConfigComplete(): void {
		// LocationProperty.setLoadProgress(40, "(加载游戏主题文件)");
		this.loadingView.setProgress(40, '(加载游戏主题文件)')
		let theme = new eui.Theme(`${RES_RESOURCE}default.thm.json?v=` + Version.UPDATE_NUMBER, this.stage);
		theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
	}

	/**
	 * 主题文件加载完成
	 */
	private onThemeLoadComplete(): void {
		// var payWin:login = new login();
		// console.log(payWin)
		// this.stage.addChild(payWin)
		// console.log(this.stage)
		// ViewManager.ins().open(payWin, {money:50,yuanbao:1000})
		
		this.loadingView.loginBtn()

	}

	public static closesocket(): void {
		GameSocket.ins().close();
	}
}


