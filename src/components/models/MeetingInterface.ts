export interface IMeeting {
    subject: string,
    description: string,
    start: Date,
    end: Date,
    timezone: string,
    allowAnonymous: boolean,
    enableSip: boolean,
    enableAutorecording: boolean,
    pinCode: string | null
}