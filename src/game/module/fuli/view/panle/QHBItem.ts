/**
 * 
 */
class QHBItem extends eui.ItemRenderer {
	public constructor() {
		super();
	}

	private labelInfo: eui.Label;

	public dataChanged() {
		if (this.data == "") {
			this.labelInfo.text = "";
			return;
		}
		let str =  "|C:0x3EADFF&T:" + this.data + "|" 
		this.labelInfo.textFlow = TextFlowMaker.generateTextFlow1(str);
	}
}