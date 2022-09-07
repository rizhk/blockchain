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
    if (!number) return 0;
    var val: number = 0;
    if (typeof number === 'string') val = parseFloat(number);
    else val = number;
    return Math.floor((val + Number.EPSILON) * 100) / 100;
  }
  roundUpToTwo(number: number | string | undefined) {
    if (!number) return 0;
    var val: number = 0;
    if (typeof number === 'string') val = parseFloat(number);
    else val = number;
    return Math.ceil((val + Number.EPSILON) * 100) / 100;
  }
  roundDownToEight(number: number | string | undefined) {
    if (!number) return 0;
    var val: number = 0;
    if (typeof number === 'string') val = parseFloat(number);
    else val = number;
    return Math.floor((val + Number.EPSILON) * 10000000) / 10000000;
  }
  roundUpToEight(number: number | string | undefined) {
    if (!number) return 0;
    var val: number = 0;
    if (typeof number === 'string') val = parseFloat(number);
    else val = number;
    return Math.ceil((val + Number.EPSILON) * 10000000) / 10000000;
  }
  thousandSeparator(number: number | undefined) {
    if (number == undefined) return number;
    return number
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  convertPercentageDisplay(value: string | number, shouldRoundUp: boolean = false): string {
    //TODO variable on dollar sign when we support multiple currency
    return this.thousandSeparator(shouldRoundUp ? this.roundUpToTwo(value) : this.roundDownToTwo(value)) as string;
  }
  convertCryptoAmountDisplay(value: string | number, tokenSymbol: string, shouldRoundUp: boolean = false): string {
    //TODO variable on dollar sign when we support multiple currency
    if (value > 1) {
      return (this.thousandSeparator(shouldRoundUp ? this.roundUpToTwo(value) : this.roundDownToTwo(value)) +
        ' ' +
        tokenSymbol) as string;
    } else {
      return (this.thousandSeparator(shouldRoundUp ? this.roundUpToEight(value) : this.roundUpToEight(value)) +
        ' ' +
        tokenSymbol) as string;
    }
  }
  convertFiatAmountDisplay(value: string | number, shouldRoundUp: boolean = false): string {
    //TODO variable on dollar sign when we support multiple currency
    if (value > 1) {
      return ('$' +
        this.thousandSeparator(shouldRoundUp ? this.roundUpToTwo(value) : this.roundDownToTwo(value))) as string;
    } else {
      return ('$' + (shouldRoundUp ? this.roundUpToEight(value) : this.roundUpToEight(value))) as string;
    }
  }
  removeItemInArrayByIndex<TItem>(array: TItem[], index: number): TItem[] {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  }
  removeItemInArrayByKey = <TItem extends { [key: string]: any }, TValue>(
    array: TItem[],
    keyFieldName: string,
    keyFieldValue: TValue,
  ): TItem[] => {
    const index = array.findIndex((item) => {
      return item[keyFieldName] === keyFieldValue;
    });
    return this.removeItemInArrayByIndex(array, index);
  };
  replaceItemInArrayByIndex<TItem>(array: TItem[], index: number, item: TItem): TItem[] {
    return [...array.slice(0, index), item, ...array.slice(index + 1)];
  }
  getItemInArrayByKey = <TItem extends { [key: string]: any }, TValue>(
    array: TItem[],
    keyFieldName: string,
    keyFieldValue: TValue,
  ): { item: TItem | undefined; index: number | undefined } => {
    let index: number | undefined = undefined;
    const item = array.find((item, i) => {
      if (item[keyFieldName] === keyFieldValue) {
        index = i;
        return true;
      }
      return false;
    });
    return { item, index };
  };
  getStartEndDateByRange(range: string | undefined): { startDate: Date | undefined; endDate: Date | undefined } {
    if (!range) return { startDate: undefined, endDate: undefined };
    let date = new Date();

    if (range == '30d') {
      date.setDate(date.getDate() - 30);
    }
    if (range == '60d') {
      date.setDate(date.getDate() - 60);
    }
    if (range == '90d') {
      date.setDate(date.getDate() - 90);
    }
    if (range == '6m') {
      date.setMonth(date.getMonth() - 6);
    }
    if (range == '1y') {
      date.setFullYear(date.getFullYear() - 1);
    }

    return { startDate: date, endDate: new Date() };
  }
}
export const primitivesUtils = new PrimitivesUtils();
