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
  roundDownToTwo(number: number | undefined) {
    if (!number) return number;
    return Math.floor((number + Number.EPSILON) * 100) / 100;
  }
  roundUpUpToSixPlace(number: number | undefined) {
    if (!number) return number;
    return Math.ceil((number + Number.EPSILON) * 100000) / 100000;
  }
  thousandSeparator(number: number | undefined) {
    if (!number) return number;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
export const primitivesUtils = new PrimitivesUtils();
