import * as moment from 'moment';

export class VotmCommon {
    public static dateFormat: string = moment.localeData('en-us').longDateFormat('L');
    public static timeFormat: string = moment.localeData('en-us').longDateFormat('LTS');
}