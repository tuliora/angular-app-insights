import * as moment from 'moment';

export class DateUtil {

  static format(date: any, format: string = 'MMMM Do YYYY, h:mm:ss a'): string {
    return moment(date).format(format);
  }
}
