export interface INetwork {
    rssi: number,
    ssid: string,
    bssid: string,
    channel: number,
    secure: number,
    hidden: boolean
}