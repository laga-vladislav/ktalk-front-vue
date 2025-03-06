export interface IMeeting {
    subject: string,
    description: string,
    start: Date | string | number,
    end: Date | string | number,
    timezone: string,
    allowAnonymous: boolean,
    enableSip: boolean,
    enableAutoRecording: boolean,
    pinCode: string | null
}