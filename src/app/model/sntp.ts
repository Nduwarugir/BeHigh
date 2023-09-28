export interface ISNTP {
    id: number,
    timeMode: string,

    // Sntp Auto Configuration
    server1: string,
    server2: string,
    server3: string,
    timeZone: string,

    // Sntp Manual Configuration
    year: string,
    month: string,
    date: string,
    hour: string,
    minute: string,
    seconde: string,
}
