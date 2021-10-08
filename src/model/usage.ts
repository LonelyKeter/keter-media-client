import { MaterialKey } from "./media";
import { UserInfo, UserKey } from "./userinfo";

export type LicenseKey = number;

export interface LicenseInfo {
    title: string,
    text: string,
    date: Date
}

export interface License extends LicenseInfo {
    id: LicenseKey
}

export interface Usage {
    materialId: MaterialKey,
    date: Date,
    license: License
}

export interface UserUsage {
    user: UserInfo,
    usage: Usage
}