class PrimitivesUtils {
  getFirstNChars(str: string, number: number) {
    if (!str) return str;
    return str.substring(0, number);
  }
  getLastNChars(str: string, number: number) {
    if (!str) return str;
    return str.substring(str.length - number, str.length);
  }
  getShortTxnId(str: string) {
    if (!str) return str;
    return `${this.getFirstNChars(str, 4)}...${this.getLastNChars(str, 4)}`;
  }
  roundDownToTwo(number: number | string | undefined) {
    if (!number) return undefined;
    var val: number = 0;
    if (typeof number === 'string') val = parseFloat(number);
    else val = number;
    return Math.floor((val + Number.EPSILON) * 100) / 100;
  }
  roundUpToTwo(number: number | string | undefined) {
    if (!number) return undefined;
    var val: number = 0;
    if (typeof number === 'string') val = parseFloat(number);
    else val = number;
    return Math.ceil((val + Number.EPSILON) * 100) / 100;
  }
  roundUpUpToSixPlace(number: number | undefined) {
    if (!number) return number;
    return Math.ceil((number + Number.EPSILON) * 100000) / 100000;
  }
  thousandSeparator(number: number | undefined) {
    if (!number) return number;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  convertCurrencyDisplay(value: string | number): string {
    return this.thousandSeparator(this.roundDownToTwo(value)) as string;
  }
}
export const primitivesUtils = new PrimitivesUtils();
