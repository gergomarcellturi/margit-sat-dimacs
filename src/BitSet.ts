export class BitSet {
    private bitMap: {[key: number]: boolean};

    public setPositive(index: number) { this.bitMap[index] = true; }
    public setNegative(index: number) { this.bitMap[index] = false; }

    constructor(public propsSize: number) {
        this.bitMap = {};
    }

    public get = (index: number): boolean | undefined => this.bitMap[index];

    public clear = (): void => {
        Object.keys(this.bitMap).forEach(key => delete this.bitMap[key]);
    }

    public keys(): string[] {
        return Object.keys(this.bitMap);
    }
}
