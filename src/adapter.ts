import css from "dom-helpers/css";
import isWindow from "dom-helpers/isWindow";
import offset from "dom-helpers-extra/offset";

const NODE_TYPE_DOCUMENT = 9;

function each(obj, callback) {
	let length, i;

	if ("length" in obj) {
		length = obj.length;
		i = 0;
		for (; i < length; i++) {
			if (callback.call(obj[i], i, obj[i]) === false) {
				break;
			}
		}
	} else {
		for (i in obj) {
			if (callback.call(obj[i], i, obj[i]) === false) {
				break;
			}
		}
	}

	return obj;
}

export class Adapter {
	protected _dom: Element | Document | Window;
	length: number;

	constructor(dom: Element | Document | Window) {
		this._dom = dom;
		this[0] = dom;
		this.length = 1;
	}

	width(type = "Width") {
		const elem = this._dom;

		if (isWindow(elem)) {
			// 不包含滚动条
			return (elem as Window).document.documentElement["client" + type];
		}

		if ((elem as Element).nodeType === NODE_TYPE_DOCUMENT) {
			const doc = (elem as Document).documentElement;

			return Math.max(
				(elem as Document).body["scroll" + type],
				doc["scroll" + type],
				(elem as Document).body["offset" + type],
				doc["offset" + type],
				doc["client" + type]
			);
		}

		return elem["offset" + type];
	}

	height() {
		return this.width("Height");
	}

	outerWidth() {
		return this.width();
	}

	outerHeight() {
		return this.height();
	}

	offset(coordinates?) {
		const elem = this._dom;
		if (!coordinates) {
			return offset(elem as HTMLElement);
		}

		offset(elem as HTMLElement, coordinates);

		return this;
	}

	scrollTop(prop = "pageYOffset", method = "scrollTop") {
		let win;
		const elem = this._dom;

		if (isWindow(elem)) {
			win = elem;
		} else if ((elem as Document).nodeType === NODE_TYPE_DOCUMENT) {
			win = (elem as Document).defaultView;
		}

		return win ? win[prop] : elem[method];
	}

	scrollLeft() {
		return this.scrollTop("pageXOffset", "scrollLeft");
	}

	css(key: any) {
		return css(this._dom as HTMLElement, key);
	}

	each(cb) {
		cb.call(this._dom);
	}
}

function AdapterCreator(dom) {
	return new Adapter(dom);
}

AdapterCreator.isWindow = isWindow;
AdapterCreator.css = css;
AdapterCreator.extend = Object.assign;
AdapterCreator.each = each;

export default AdapterCreator;
