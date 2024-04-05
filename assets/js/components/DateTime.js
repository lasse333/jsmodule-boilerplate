export default class DateTime extends Date {
  constructor(...date) {
    super(...date);
  }

  static fromWeekNumber(year, week, day = 1) {
    let firstFixedDayOfWeekOne = new DateTime(year, 0, 4);
    let weekNumber = week - 1;
    let mondayOfWeekOne = firstFixedDayOfWeekOne.getStartOfWeek;

    return mondayOfWeekOne.add(
      new Duration({ days: weekNumber * 7 + (day - 1) }),
    ).getStartOfDay;
  }

  getDay() {
    return (super.getDay() + 6) % 7;
  }

  add(duration) {
    return new DateTime(this.getTime() + +duration);
  }

  subtract(duration) {
    return new DateTime(this.getTime() - +duration);
  }

  difference(date) {
    return new Duration(this.getTime() - date.getTime());
  }

  isAfter(date) {
    return this.getTime() > date.getTime();
  }

  isBefore(date) {
    return this.getTime() < date.getTime();
  }

  isAtSameMomentAs(date) {
    return this.getTime() === date.getTime();
  }

  get getStartOfDay() {
    return new DateTime(this.getFullYear(), this.getMonth(), this.getDate());
  }

  get getStartOfWeek() {
    let firstDayOfWeek = this.subtract(new Duration({ days: this.getDay() }));
    return firstDayOfWeek.getStartOfDay;
  }

  get getWeek() {
    let weekNumber;
    let firstFixedDayOfWeekOne = new DateTime(
      this.add(new Duration({ days: 3 })).getFullYear(),
      0,
      4,
    );
    do {
      let mondayOfWeekOne = firstFixedDayOfWeekOne.getStartOfWeek;

      weekNumber =
        Math.floor(
          Math.round(this.difference(mondayOfWeekOne).inHours / 24) / 7,
        ) + 1;

      if (weekNumber < 1) {
        firstFixedDayOfWeekOne = new DateTime(
          mondayOfWeekOne.getFullYear(),
          0,
          4,
        );
      }
    } while (weekNumber < 1);

    return weekNumber;
  }
}

export class Duration {
  #length = 0;

  constructor(
    duration = { days: 0, hours: 0, seconds: 0, minutes: 0, milliseconds: 0 } ||
      0,
  ) {
    switch (typeof duration) {
      case "number":
        this.#length = duration;
        break;
      case "object":
        this.#length =
          (duration.days ?? 0) * 86400000 +
          (duration.hours ?? 0) * 3600000 +
          (duration.minutes ?? 0) * 60000 +
          (duration.seconds ?? 0) * 1000 +
          (duration.milliseconds ?? 0);
        break;
      case "string":
      case "function":
      case "bigint":
      case "boolean":
      case "symbol":
      case "undefined":
      default:
        this.#length = 0;
        break;
    }
  }

  get inDays() {
    return Math.floor(this.#length / 86400000);
  }

  get inHours() {
    return Math.floor(this.#length / 3600000);
  }

  get inMinutes() {
    return Math.floor(this.#length / 60000);
  }

  get inSeconds() {
    return Math.floor(this.#length / 1000);
  }

  get inMilliseconds() {
    return this.#length;
  }

  valueOf() {
    return this.#length;
  }

  add(duration) {
    this.#length += +duration;
  }

  subtract(duration) {
    this.#length -= +duration;
  }

  multiply(number) {
    this.#length *= number;
  }

  divide(number) {
    this.#length /= number;
  }
}
