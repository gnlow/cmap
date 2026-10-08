export type Stop = { pos: number, rgb: [number, number, number] }

export class Cmap {
    constructor(public stops: Stop[]) {}
    at(pos: number) {
        const lowerIndex = this.stops.findLastIndex(s => pos >= s.pos)
        const a = this.stops[lowerIndex]
        const b = this.stops[lowerIndex+1] ?? a

        const p = a==b ? 0 : (pos-a.pos)/(b.pos-a.pos)
        return a.rgb.map((v, i) => b.rgb[i]*p + v*(1-p))
    }
}

export const globe = new Cmap([
    { pos: 0.00, rgb: [ 10,  30, 100] },
    { pos: 0.20, rgb: [ 40, 100, 180] },
    { pos: 0.30, rgb: [100, 180, 220] },
    { pos: 0.35, rgb: [210, 210, 150] },
    { pos: 0.50, rgb: [ 60, 140,  50] },
    { pos: 0.70, rgb: [180, 140,  70] },
    { pos: 0.90, rgb: [120,  70,  30] },
    { pos: 1.00, rgb: [255, 255, 255] },
])
