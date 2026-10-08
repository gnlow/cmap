export type Stop = { pos: number, rgb: [number, number, number] }

export type RGB = [number, number, number]

export class Cmap {
    constructor(public f: (pos: number) => RGB) {}
    static fromStops(stops: Stop[]) {
        return new Cmap(pos => {
            const lowerIndex = stops.findLastIndex(s => pos >= s.pos) ?? stops[0]
            const a = stops[lowerIndex]
            const b = stops[lowerIndex+1] ?? a
    
            const p = a==b ? 0 : (pos-a.pos)/(b.pos-a.pos)
            return a.rgb.map((v, i) => b.rgb[i]*p + v*(1-p)) as RGB
        })
    }
    at(pos: number) {
        return this.f(pos)
    }
    local(f: (pos: number) => number) {
        return new Cmap(pos => this.at(f(pos)))
    }
    clamp() {
        return this.local(pos => Math.max(0, Math.min(pos, 1)))
    }
    range(a: number, b: number) {
        return this.local(pos => (b-a)*pos+a)
    }
}

export const globe = Cmap.fromStops([
    { pos: 0.00, rgb: [ 10,  30, 100] },
    { pos: 0.20, rgb: [ 40, 100, 180] },
    { pos: 0.30, rgb: [100, 180, 220] },
    { pos: 0.35, rgb: [210, 210, 150] },
    { pos: 0.50, rgb: [ 60, 140,  50] },
    { pos: 0.70, rgb: [180, 140,  70] },
    { pos: 0.90, rgb: [120,  70,  30] },
    { pos: 1.00, rgb: [255, 255, 255] },
]).clamp()
