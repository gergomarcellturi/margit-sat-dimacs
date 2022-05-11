import {BitSet} from "./BitSet";

const sign = ['-', ''];

export class Clause {
    public bitSet: BitSet;

    constructor(public propCount: number) {
        this.bitSet = new BitSet(propCount);
    }

    public set(index: number, value: boolean) {
        this.bitSet[value ? 'setPositive' : 'setNegative'](index);
    }

    public toDIMACS() {
        let stringVal = '';

        for (let key of this.bitSet.keys())
            stringVal += ` ${sign[+this.bitSet.get(+key)!]}${+key + 1}`;

        return stringVal;
    }

    public evaluation(interpretation: { [key: number]: boolean }) {
        let ev = true;
        for (let key of this.bitSet.keys()) {
            if (interpretation[+key]) {
                ev ||= this.bitSet.get(+key);
                continue;
            }
            ev ||= !this.bitSet.get(+key);
            if (!ev) break;
        }
        return ev;
    }

}

