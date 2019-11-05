import * as moment from 'moment';

export class VotmCommon {
    public static dateFormat: string = moment.localeData('en-us').longDateFormat('L');
    public static timeFormat: string = moment.localeData('en-us').longDateFormat('LTS');

    static getUniqueValues(values: any[]) {
        return values.filter((value, index) => {
          return index === values.findIndex(obj => {
            return JSON.stringify(obj) === JSON.stringify(value);
          });
        });
      }
}