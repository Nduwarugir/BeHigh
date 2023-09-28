export interface IWifiConfig {
    ssid: string,
    pass: string,
    ip: number[],
    netmask: number[],
    gateway: number[],
    Wifi_Mode: boolean,
    dns: number[]
    dhcp: boolean,
    ntp: string,
    NTPperiod: number,
    timeZone: number,
    daylight: boolean,
    deviceName: string,
    version: string
}
