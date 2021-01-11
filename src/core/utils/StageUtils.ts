/**
 * Created by yangsong on 2014/12/3.
 * Stage相关工具类
 */
class StageUtils extends BaseClass {
	//UIStage单例
	private static _uiStage: eui.UILayer;

	/**
	 * 构造函数
	 */
	public constructor() {
		super();

		if (StageUtils._uiStage == null) {
			StageUtils._uiStage = new eui.UILayer();
			StageUtils._uiStage.touchEnabled = false;
			StageUtils._uiStage.percentHeight = 100;
			StageUtils._uiStage.percentWidth = 100;
			this.getStage().addChild(StageUtils._uiStage);
		}
	}


	public static ins(): StageUtils {
		return super.ins() as StageUtils;
	}
	/**
	 * 获取游戏的高度
	 * @returns {number}
	 */
	public getHeight(): number {
		return this.getStage().stageHeight;
	}

	/**
	 * 获取游戏宽度
	 * @returns {number}
	 */
	public getWidth(): number {
		return this.getStage().stageWidth;
	}

	/**
	 * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
	 * @param value
	 */
	public setTouchChildren(value: boolean): void {
		this.getStage().touchChildren = value;
	}

	/**
	 * 设置同时可触发几个点击事件，默认为2
	 * @param value
	 */
	public setMaxTouches(value: number): void {
		this.getStage().maxTouches = value;
	}

	/**
	 * 设置帧频
	 * @param value
	 */
	public setFrameRate(value: number): void {
		this.getStage().frameRate = value;
	}

	/**
	 * 设置适配方式
	 * @param value
	 */
	public setScaleMode(value: string): void {
		this.getStage().scaleMode = value;
	}

	/**
	 * 适配
	 * @param value
	 */
	public resetMode(): void {
		let w2 = 750, h2 = 1334;

		let w = 750, h = 1334;
		let w1 = this.getWidth()
		let h1 = this.getHeight()
		let bi = (w1 / h1) / (w / h)
		if (bi > 1) {
			w2 = w1 * h2 / h1
		}
		else {
			h2 = w2 * h1 / w1
		}
		let stage = this.getStage()
		stage.removeEventListener(egret.Event.RESIZE, this.resetMode, this)
		stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH //'fixedWidth';
		stage.setContentSize(w2, h2)
		stage.addEventListener(egret.Event.RESIZE, this.resetMode, this) //设置监听屏幕尺寸改变
	}

	/**相对 750*1334 比例*/
	public getScale(): number {
		let w = 750, h = 1334;
		let w1 = this.getWidth()
		let h1 = this.getHeight()
		return (h1 / h > w1 / w) ? (w1 / w) : (h1 / h)
	}

	public adaptationIpx(bg: egret.DisplayObject) {
		let w = 750, h = 1334;
		let w1 = this.getWidth()
		let h1 = this.getHeight()
		let biW = w1 / w
		let biH = h1 / h
		let bi = biW > biH ? biW : biH
		DisplayUtils.setScale(bg, bi)
	}

	public adaptationIpx2(bg: egret.DisplayObject) {
		let w = 750, h = 1547;
		let w1 = this.getWidth()
		let h1 = this.getHeight()
		let biW = w1 / w
		let biH = h1 / h
		let bi = biW > biH ? biW : biH
		DisplayUtils.setScale(bg, bi)
	}

	public initBgm() {
		let stage = this.getStage()
		stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setBgm, this)
	}

	private setBgm() {
		let stage = this.getStage()
		SoundManager.ins().playBg()
		stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setBgm, this)
	}

	/**
	 * 获取游戏Stage对象
	 * @returns {egret.MainContext}
	 */
	public getStage(): egret.Stage {
		return egret.MainContext.instance.stage;
	}

	/**
	 * 获取唯一UIStage
	 * @returns {eui.UILayer}
	 */
	public getUIStage(): eui.UILayer {
		return StageUtils._uiStage;
	}
}

window["StageUtils"] = StageUtils