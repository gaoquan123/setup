import cookieProvider from "./cookie-provider";

class Storage {
  constructor(provider) {
    this.provider = provider;
  }

  get keys() {
    if (this.provider.isCookie) {
      return this.provider.keys;
    }
    return Array(this.length).map((x, i) => this.key[i]);
  }

  get length() {
    return this.provider.length;
  }

  /**
   * 设置缓存
   * @param {String} key 名称
   * @param {String} value 值
   * @param {Number} duration 持续时间，单位：分钟
   */
  setItem(key, value, duration) {
    if (typeof key !== "string" || !key.trim()) {
      throw new Error(`invalid storage key: ${key}`);
    }

    let expires;
    let attributes;
    if (duration && typeof duration === "number") {
      expires = Date.now() + duration * 60 * 1000;
      if (this.provider.isCookie) {
        attributes = { expires: new Date(expires) };
        expires = undefined;
      }
    }

    try {
      const data = JSON.stringify({
        value,
        expires,
      });

      this.provider.setItem(key, data, attributes);
    } catch (err) {
      /* eslint-disable no-console */
      console.error("failed to set storage item: ", err);
      /* eslint-enable */
    }
  }

  getItem(key) {
    if (typeof key !== "string" || !key.trim()) {
      return null;
    }

    const item = this.provider.getItem(key);

    // 不存在
    if (!item) {
      return null;
    }

    const { value, expires } = JSON.parse(item);

    // 已过期
    if (expires && expires < Date.now()) {
      this.removeItem(key);
      return null;
    }

    return value;
  }

  removeItem(key) {
    this.provider.removeItem(key);
  }

  key(index) {
    return this.provider.key(index);
  }

  hasItem(key) {
    if (!key) {
      return false;
    }
    return Array(this.length).some((n, index) => this.key(index) === key);
  }

  clear() {
    this.provider.clear();
  }
}

export const cookie = new Storage(cookieProvider);
export const localStorage = new Storage(window.localStorage || cookieProvider);
export const sessionStorage = new Storage(
  window.sessionStorage || cookieProvider
);
