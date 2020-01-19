/**
 * Created by zhangac on 2016/9/28.
 */

class BaseSystem extends BaseClass {
	public sysId: number;

	public constructor() {
		super();

		//必须在init前
		MessageCenter.compile(egret.getDefinitionByName(egret.getQualifiedClassName(this)));

		this.observe(GameApp.ins().postLoginInit, this.initLogin);
		this.observe(GameApp.ins().postZeroInit, this.initZero);
	}


	protected regNetMsg(msgId: number, fun: (...params: any[]) => void): void {
		//  console.log('回调消息 ： ' ,this.sysId,msgId)
		GameSocket.ins().registerSTCFunc(this.sysId, msgId, fun, this);
	}

	/**
	 * 游戏登录初始化
	 */
	protected initLogin(): void {

	}

	/**
	 * 0点游戏数据请求
	 */
	protected initZero():void {

	}

	/**
	 * 从对象池获取一个bytes对象
	 */
	private getGameByteArray(): GameByteArray {
		return GameSocket.ins().getBytes();
	}

	public getBytes(msgid: number): GameByteArray {
		let bytes = this.getGameByteArray();
		bytes.writeCmd(this.sysId, msgid);
		return bytes;
	}

	public sendBaseProto(msgid: number) {
		let bytes = this.getGameByteArray();
		bytes.writeCmd(this.sysId, msgid);
		this.sendToServer(bytes);
	}

	/**
	 * 发送到服务器
	 * @param bytes
	 */
	public sendToServer(bytes: GameByteArray): void {
		GameSocket.ins().sendToServer(bytes);
	}

	public observe(func: Function, myfunc: Function) {
		MessageCenter.addListener(func, myfunc, this);
	}

	public removeObserve() {
		MessageCenter.ins().removeAll(this);
	}

	protected associated(fun: Function, ...funs: Function[]): void {

		let isDelayCall:boolean = false;

		let callFunc = ()=>{
			isDelayCall = false;
			fun.call(this);
		}

		let delayFunc = ()=>{
			if (!isDelayCall) {
				isDelayCall = true;
				TimerManager.ins().doTimer(60, 1, callFunc, this);
			}
		}

		for (let i of funs)
			this.observe(i, delayFunc);
	}

}

MessageCenter.compile(BaseSystem);
