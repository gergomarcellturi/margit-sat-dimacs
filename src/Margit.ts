import {Clause} from "./Clause";

/**
 * A1: Az angyalföldi család görkorcsolyázott.
 * A2: Kardosék kerékpároztak.
 * A3: Kardosék Óbudáról vagy Csillaghegyről érkeztek.
 * A4: Az angyalföldi család nem Kardosék.
 *
 * B1: Az ötgyerekes család focizott
 *
 * C1: A csillaghegyi családban kevesebb a gyerek mint a tollaslabdázó családban.
 *
 * D1: Bognárék nem kocognak
 *
 * E1: A belvárosi családban 1 gyerek van
 * E2: Szűcséknél két gyerek van
 * E3: Vadászék Újpesten élnek
 * E4: Vadászéknál nincs öt gyerek
 */
export class Margit extends MargitUtils {

    clauses: Clause[] = [];
    public addClause(clause: Clause) {
        this.clauses = [...this.clauses, clause];
    }

    public constructClauses = async () => {
        return await Promise.all([
            this.constructTable(),
            this.constructIntersectionClauses(),
            this.A1(),
            this.A2(),
            this.A3(),
            this.A4(),
            this.B1(),
            this.C1(),
            this.D1(),
            this.E1(),
            this.E2(),
            this.E3(),
            this.E4(),
        ]).then();
    }

    async constructTable() {
        const keypairs = Object.keys(tableOffsets).map(key => key.split(':'));

        for (const keypair of keypairs) {
            const tableEnum1 = TableEnum[keypair[0]];
            const tableEnum2 = TableEnum[keypair[1]];
            const keyList1 = Object.keys(tableEnumIndexValues[keypair[0]]);
            const keyList2 = Object.keys(tableEnumIndexValues[keypair[1]]);
            keyList1.forEach(key => {
                const indeces = this.getRowIndeces(key as TableEnumKeys, tableEnum2);
                const clause = this.getNewClause();
                for (const index of indeces) clause.set(index, true);
                this.addClause(clause);

                this.createCombinations(indeces).then(combinations => {
                    for (const comb of combinations) {
                        const newClause = this.getNewClause();
                        comb.forEach(c => newClause.set(c, false));
                        this.addClause(newClause);
                    }
                });
            });

            keyList2.forEach(key => {
                const indeces = this.getColIndeces(tableEnum1, key as TableEnumKeys);
                const clause = this.getNewClause();
                for (const index of indeces) clause.set(index, true);
                this.addClause(clause);

                this.createCombinations(indeces).then(combinations => {
                    for (const comb of combinations) {
                        const newClause = this.getNewClause();
                        comb.forEach(c => newClause.set(c, false));
                        this.addClause(newClause);
                    }
                });
            });


        }
    }

    async constructIntersectionClauses() {
        const rowTableNames = [TableEnum.FAMILY, TableEnum.ACTIVITY, TableEnum.RESIDENCE];
        const colTableNames = [TableEnum.KIDS, TableEnum.RESIDENCE, TableEnum.ACTIVITY];

        for (const rowEnum of rowTableNames) {
            for (const colEnum of colTableNames) {
                if (colEnum === rowEnum) continue;
                const otherTables = rowTableNames.filter(rt => rt !== rowEnum);
                for (const othEnum of otherTables) {
                    if (othEnum === colEnum) continue;
                    const rowEnumKeys = Object.keys(tableEnumIndexValues[rowEnum]);
                    const colEnumKeys = Object.keys(tableEnumIndexValues[colEnum]);
                    const othEnumKeys = Object.keys(tableEnumIndexValues[othEnum]);
                    let tempRowEnumKeys = [...rowEnumKeys];
                    let tempColEnumKeys = [...colEnumKeys];
                    let tempOthEnumKeys = [...othEnumKeys];

                    let rowItem = tempRowEnumKeys.pop();
                    let colItem = tempColEnumKeys.pop();
                    let othItem = tempOthEnumKeys.pop();
                    while (tempRowEnumKeys.length > 0) {
                        while (tempOthEnumKeys.length > 0) {
                            while (tempColEnumKeys.length > 0) {
                                const rowItemIndex = this.getCellIndex(rowItem as TableEnumKeys, colItem as TableEnumKeys);
                                const othItemIndex = this.getCellIndex(othItem as TableEnumKeys, colItem as TableEnumKeys);
                                const intItemIndex = this.getCellIndex(rowItem as TableEnumKeys, othItem as TableEnumKeys);
                                const clause = this.getNewClause();
                                clause.set(rowItemIndex, false);
                                clause.set(othItemIndex, false);
                                clause.set(intItemIndex, true);
                                this.addClause(clause);
                                colItem = tempColEnumKeys.pop();
                            }
                            othItem = tempOthEnumKeys.pop();
                            tempColEnumKeys = [...colEnumKeys];
                        }
                        rowItem = tempRowEnumKeys.pop();
                        tempOthEnumKeys = [...othEnumKeys];
                    }



                }


            }
        }
    }

    async createCombinations(indeces: number[]): Promise<number[][]> {
        let numbers: number[][] = []
        for (const index of indeces) {
            while (indeces.length > 0) {
                const currIndex = indeces.pop();
                for (let i of indeces) {
                    numbers = [...numbers, [i, currIndex]];
                }
            }
        }
        return numbers;
    }

    /**
     * Az angyalföldi család görkorcsolyázott.
     */
    async A1() {
        const index = this.getCellIndex(ResidenceEnum.ANGYALFOLD, ActivityEnum.SKATING);
        const clause = this.getNewClause();
        clause.set(index, true);
        this.addClause(clause);
    }
    /**
     * Kardosék kerékpároztak.
     */
    async A2() {
        const index = this.getCellIndex(FamilyEnum.KARDOS, ActivityEnum.CYCLING);
        const clause = this.getNewClause();
        clause.set(index, true);
        this.addClause(clause);
    }

    /**
     * Kardosék Óbudáról vagy Csillaghegyről érkeztek.
     */
    async A3() {
        const index1 = this.getCellIndex(FamilyEnum.KARDOS, ResidenceEnum.ANGYALFOLD);
        const index2 = this.getCellIndex(FamilyEnum.KARDOS, ResidenceEnum.BELVAROS);
        const index3 = this.getCellIndex(FamilyEnum.KARDOS, ResidenceEnum.UJPEST);
        const clause1 = this.getNewClause();
        const clause2 = this.getNewClause();
        const clause3 = this.getNewClause();
        clause1.set(index1, false);
        clause2.set(index2, false);
        clause3.set(index3, false);

        this.addClause(clause1);
        this.addClause(clause2);
        this.addClause(clause3);
    }

    /**
     * Az angyalföldi család nem Kardosék.
     */
    async A4() {
        const index = this.getCellIndex(FamilyEnum.KARDOS, ResidenceEnum.ANGYALFOLD);
        const clause = this.getNewClause();
        clause.set(index, false);
        this.addClause(clause);
    }

    /**
     * Az ötgyerekes család focizott
     */
    async B1() {
        const index = this.getCellIndex(KidsEnum.FIVE, ActivityEnum.FOOTBALL);
        const clause = this.getNewClause();
        clause.set(index, true);
        this.addClause(clause);
    }

    /**
     * A csillaghegyi családban kevesebb a gyerek mint a tollaslabdázó családban.
     */
    async C1() {
        const indecesCsillaghegy = this.getRowIndeces(ResidenceEnum.CSILLAGHEGY, TableEnum.KIDS);
        const indecesBadminton = this.getRowIndeces(ActivityEnum.BADMINTON, TableEnum.KIDS);

        for (let i = 0; i < indecesCsillaghegy.length - 1; i++) {
            for (let j = i; j >= 0; j--) {
                const clause = this.getNewClause();
                clause.set(indecesCsillaghegy[i], false);
                clause.set(indecesBadminton[j], false);
                this.addClause(clause);
            }
        }
        const clause = this.getNewClause();
        clause.set(indecesCsillaghegy[indecesCsillaghegy.length - 1], false);
        this.addClause(clause);
    }

    /**
     * Bognárék nem kocognak
     */
    async D1() {
        const index = this.getCellIndex(FamilyEnum.BOGNAR, ActivityEnum.JOGGING);
        const clause = this.getNewClause();
        clause.set(index, false);
        this.addClause(clause);
    }

    /**
     * A belvárosi családban 1 gyerek van
     */
    async E1() {
        const index = this.getCellIndex(ResidenceEnum.BELVAROS, KidsEnum.ONE);
        const clause = this.getNewClause();
        clause.set(index, true);
        this.addClause(clause);
    }

    /**
     * Szűcséknél két gyerek van
     */
    async E2() {
        const index = this.getCellIndex(FamilyEnum.SZUCS, KidsEnum.TWO);
        const clause = this.getNewClause();
        clause.set(index, true);
        this.addClause(clause);
    }

    /**
     * Vadászék Újpesten élnek
     */
    async E3() {
        const index = this.getCellIndex(FamilyEnum.VADASZ, ResidenceEnum.UJPEST);
        const clause = this.getNewClause();
        clause.set(index, true);
        this.addClause(clause);
    }

    /**
     * Vadászéknál nincs öt gyerek
     */
    async E4() {
        const index = this.getCellIndex(FamilyEnum.VADASZ, KidsEnum.FIVE);
        const clause = this.getNewClause();
        clause.set(index, false);
        this.addClause(clause);
    }

    private getNewClause(): Clause {
        return new Clause(this.propSize);
    }
}
