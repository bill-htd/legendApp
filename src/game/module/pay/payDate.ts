

class payDate extends BaseSystem {
    public payType :1;
    public constructor() {
		super();
	}

    public static ins(): payDate {
		return super.ins() as payDate;
	}

}