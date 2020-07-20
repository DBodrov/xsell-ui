type DTValue = string | number | Date;
type Formats = 'date' | 'dateTime';

export class DateTimeService {
  private dtValue: Date;

  private locale?: string;

  private format?: string;

  private MSK_OFFSET = -10800000;

  constructor(value: DTValue, locale?: string, format?: Formats) {
    this.dtValue = new Date(value);
    this.locale = locale || 'ru';
    this.format = format || 'date';
  }

  static toDate(date: Date, locale: string): string {
    return date.toLocaleDateString(locale);
  }

  static toDateTime(date: Date, locale: string): string {
    return date.toLocaleString(locale);
  }

  getCurrentTimezoneName(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  getCurrentOffset(): number {
    return new Date().getTimezoneOffset() * 60000;
  }

  changeTimeZone(timeZoneName: string): string {
    if (this.format === 'dateTime') {
      return new Date(this.dtValue).toLocaleString(this.locale, { timeZone: timeZoneName });
    }
    return new Date(this.dtValue).toLocaleDateString(this.locale, { timeZone: timeZoneName });
  }

  toUTC(): number {
    return new Date(this.dtValue).valueOf();
  }

  toCurrentTimeZone() {
    const tz = this.getCurrentTimezoneName();
    if (this.format === 'dateTime') {
      return new Date(this.dtValue).toLocaleString(this.locale, { timeZone: tz });
    }
    return new Date(this.dtValue).toLocaleDateString(this.locale, { timeZone: tz });
  }

  fromMoscowTimeZone() {
    const currentOffset = this.getCurrentOffset();
    const changedDT = new Date(this.dtValue.valueOf() - this.MSK_OFFSET + currentOffset);
    return changedDT;
  }

  toMoscowTimeZone(): Date {
    const currentOffset = this.getCurrentOffset();
    const changedDate = new Date(this.dtValue.valueOf() - currentOffset + this.MSK_OFFSET);
    return changedDate;
  }
}
