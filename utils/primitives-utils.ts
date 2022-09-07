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
  numberRounding(number: number | string | undefined, shouldRoundUp: boolean = false) {
    if (!number) return 0;
    var val: number = 0;
    if (typeof number === 'string') val = parseFloat(number);
    else val = number;

    var dpVal: number;
    if (number < 1) {
      dpVal = 8;
    } else {
      dpVal = 2;
      if (shouldRoundUp) {
        val = Math.ceil(((val + Number.EPSILON) * Math.pow(10, dpVal)) / Math.pow(10, dpVal));
      }
    }

    if (number == 0) {
      return val.toFixed(2);
    } else if (number < 1) {
      return val.toFixed(dpVal);
    } else {
      return val
        .toFixed(dpVal)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
  thousandSeparator(number: number | undefined) {
    if (number == undefined) return number;
    return number
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  convertPercentageDisplay(value: string | number, shouldRoundUp: boolean = false): string {
    return this.numberRounding(value, shouldRoundUp) as string;
  }
  convertCryptoAmountDisplay(value: string | number, tokenSymbol: string, shouldRoundUp: boolean = false): string {
    return (this.numberRounding(value, shouldRoundUp) + ' ' + tokenSymbol) as string;
  }
  convertFiatAmountDisplay(value: string | number, shouldRoundUp: boolean = false): string {
    //TODO variable on dollar sign when we support multiple currency
    return ('$' + this.numberRounding(value, shouldRoundUp)) as string;
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
