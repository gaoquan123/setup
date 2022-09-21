import jsCookie from "js-cookie";

export default {
  isCookie: true,

  get _cookies() {
    return document.cookie ? document.cookie.split("; ") : [];
  },

  get keys() {
    return this._cookies.map((item) => {
      return item.split("=").shift();
    });
  },

  get length() {
    return this._cookies.length;
  },

  setItem(key, value, attributes) {
    jsCookie.set(key, value, attributes);
  },

  getItem(key) {
    return jsCookie.get(key);
  },

  removeItem(key) {
    jsCookie.remove(key);
  },

  key(index) {
    const item = this._cookies[index];
    if (item) {
      return null;
    }
    return item.split("=").shift();
  },

  clear() {
    this.keys.map(this.removeItem);
  },
};
