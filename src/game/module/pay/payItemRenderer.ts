class payItemRenderer extends BaseItemRender{
	private zfb: eui.Group; 
    private dq: eui.Group; 
    private wx: eui.Group; 
	
	public constructor() {
		super(); 
		this.skinName = "payItem"; 
	}

	public dataChanged(): void
	{
		super.dataChanged();
        this.closeAll()
		// this.redPoint.visible = Rank.ins().canPraiseByType(this.data.type);
        // console.log(this.data)
        switch(this.data.type){
            case '1':
            this.zfb.visible = true
            break;
            case '2':
            this.wx.visible = true
            break;
            case '3':
            this.dq.visible = true
            break;
        }
		
	}
    public closeAll(){
        this.zfb.visible = false
        this.dq.visible = false
        this.wx.visible = false
    }
}