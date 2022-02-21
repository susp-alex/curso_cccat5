export default class Coupon {

	constructor (readonly code: string, readonly percentage: number, readonly expires: Date) {
	}

	isExpired() : boolean {
		return Date.now() > this.expires.getTime();
	}
}