import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { VotmCommon } from '../votm-common';

export class NgbDateMomentParserFormatter extends NgbDateParserFormatter {
    public momentFormat = VotmCommon.dateFormat;
    constructor() {
        super();
    };
    format(date: NgbDateStruct): string {
        if (!date) {
            return '';
        }
        let d = moment({
            year: date.year,
            month: date.month - 1,
            date: date.day
        });
        return d.isValid() ? d.format(VotmCommon.dateFormat) : '';
    }

    parse(value: string): NgbDateStruct {
        if (!value) {
            return null;
        }
        let d = moment(value, VotmCommon.dateFormat);
        return d.isValid() ? {
            year: d.year(),
            month: d.month() + 1,
            day: d.date()
        } : null;
    }
}