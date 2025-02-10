export class Timezone {
    value: string;

    constructor() {
        this.value = this.getGMTValue()
    }

    getGMTOffset = (): number => {
        const offsetMinutes = new Date().getTimezoneOffset()
        const offsetHours = -offsetMinutes / 60
        return offsetHours
    };

    getGMTValue = (): string => {
        const offset = this.getGMTOffset()
        const sign = offset >= 0 ? '+' : ''

        return 'GMT' + sign + offset
    }
}