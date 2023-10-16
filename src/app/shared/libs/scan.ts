// const urls = (ip: string) => {
//     const result = [];
//     // we send in ip (192.168.1.1) then we remove last digit for search
//     const prep_base_url = "http://" + ip.split(".").slice(0, -1).join(".") + ".";
//     for (let i = 0; i < 255; i++) {
//         result.push(prep_base_url + i);
//     }
//     return result;
//   };
  
// export const scanForTv = (ip: string) => {
//     const result = Promise.allSettled(
//         urls(ip).map((url) => getDeviceInfoUrl(url))
//     ).then((data: any[]) => {
//         return data.filter((x: any) => x.status === "fulfilled");
//     });
//     return result;
// };