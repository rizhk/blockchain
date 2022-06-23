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
}
export const primitivesUtils = new PrimitivesUtils();
