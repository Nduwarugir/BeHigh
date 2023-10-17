export interface IScenario {
    type: string,
    timing: number,

    text: string,
    ffamily: string;
    size: number,
    fcolor: ColorGamut,
    bcolor: ColorGamut,
    row: string,
    col: string,
    animation: string,

    link: string
}
