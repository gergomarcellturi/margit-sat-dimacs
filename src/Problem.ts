import {Clause} from "./Clause";

export class Problem<T> {
    private problem: T & {constructClauses: () => Promise<void>, clauses: Clause[]};


    public toDIMACS(): string {
        const {clauses} = this.problem;
        let dimacsFormat = `p cnf ${clauses[0].propCount} ${clauses.length} \r\n`;
        for (const clause of clauses) dimacsFormat += `${clause.toDIMACS()} 0\r\n`;
        return dimacsFormat;
    }

    public toCleanString(): string {
        const {clauses} = this.problem;
        let dimacsFormat = ``;
        for (const clause of clauses) dimacsFormat += `${clause.toDIMACS()}\r\n`;
        return dimacsFormat;
    }

    static async of<T>(o: T & { constructClauses: () => Promise<void>, clauses: Clause[] }) {
        await o.constructClauses()
        const prob = new Problem();
        prob.problem = o;
        return prob;
    }

}
