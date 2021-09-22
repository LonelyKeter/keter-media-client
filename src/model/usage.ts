export type LicenseKey = number;

export interface LicenseInfo {
    title: string,
    text: string,
    date: Date
}

export interface License extends LicenseInfo {
    id: LicenseKey
}