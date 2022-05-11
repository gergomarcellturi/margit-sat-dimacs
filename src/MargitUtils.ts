class MargitUtils {
    protected cellsPerTable = 25;
    protected rows = 5;
    protected columns = 5;
    protected propSize = this.rows * this.columns * 6;
    protected indexTresholds = [0, 25, 50, 75, 100, 125, 150];

    protected getOffSet = (table1: TableEnum, table2: TableEnum): number =>
        tableOffsets[Object.keys(tableOffsets).find(key => {
            const keys = key.split(':');
            return keys.includes(table1) && keys.includes(table2);
        })!]

    protected getRowIndeces = (tableKey1: TableEnumKeys, table2: TableEnum): number[] => {
        const table1 = this.getTableEnumByKey(tableKey1);
        const offset = this.getOffSet(table1, table2);
        const {rowProp, rowPropGroup} = this.getTableProps(
            {tableName: table1, key: tableKey1},
            {tableName: table2, key: undefined});
        const rowIndex = tableEnumIndexValues[rowPropGroup][rowProp];

        return this.range(offset + (rowIndex * this.columns), offset + (rowIndex * this.columns) + this.columns - 1);
    }

    protected getColIndeces = (table1: TableEnum, tableKey2: TableEnumKeys): number[] => {
        const table2 = this.getTableEnumByKey(tableKey2);
        const offset = this.getOffSet(table1, table2);
        const rowIndex = tableEnumIndexValues[table2][tableKey2];
        return this.range(offset + rowIndex, offset + rowIndex + this.cellsPerTable - this.rows, 5 );
    }

    private range(start, end, step = 1) {
        const len = Math.floor((end - start) / step) + 1
        return Array(len).fill(0).map((_, idx) => start + (idx * step))
    }

    protected getCellIndex = (tableKey1: TableEnumKeys, tableKey2: TableEnumKeys): number => {
        const table1 = this.getTableEnumByKey(tableKey1);
        const table2 = this.getTableEnumByKey(tableKey2);
        if (table1 === table2) return 0;

        const offset = this.getOffSet(table1, table2);
        const {rowProp, colProp, rowPropGroup, colPropGroup} = this.getTableProps(
            {tableName: table1, key: tableKey1},
            {tableName: table2, key: tableKey2});
        const rowIndex = tableEnumIndexValues[rowPropGroup][rowProp];
        const colIndex = tableEnumIndexValues[colPropGroup][colProp];
        return offset + (rowIndex * this.columns + colIndex);
    }

    protected getFillableCells(index: number) {
        let fillableCells: number[] = [];
        const {lowerTreshold, upperTreshold} = this.getTresholds(index);
        let currIndex = index;
        while (lowerTreshold < currIndex) {
            currIndex -= this.rows;
            fillableCells = [...fillableCells, currIndex];
        }
        currIndex = index
        while (upperTreshold > currIndex) {
            currIndex += this.rows;
            fillableCells = [...fillableCells, currIndex];
        }
        currIndex = index;
        while ((index - (index % this.columns)) < currIndex) {
            currIndex--;
            fillableCells = [...fillableCells, currIndex];
        }
        currIndex = index;
        while((index + (5 - (index % this.columns))) > currIndex) {
            currIndex++;
            fillableCells = [...fillableCells, currIndex];
        }
        return fillableCells;
    }

    protected getTresholds(index: number) {
        const lowerTreshold = this.indexTresholds.find(treshold => treshold < index)!;
        const lowerTresholdIndex = this.indexTresholds.indexOf(lowerTreshold);
        const upperTresholdIndex = lowerTresholdIndex + 1;
        const upperTreshold = this.indexTresholds[upperTresholdIndex];
        return {lowerTreshold, lowerTresholdIndex, upperTreshold, upperTresholdIndex};
    }

    protected getTableEnumByKey = (tableKey: TableEnumKeys): TableEnum => {
        if (tableKey in FamilyEnum) return TableEnum.FAMILY;
        if (tableKey in KidsEnum) return TableEnum.KIDS;
        if (tableKey in ActivityEnum) return TableEnum.ACTIVITY;
        return TableEnum.RESIDENCE;
    }

    protected getTableProps = (table1: { key: TableEnumKeys, tableName: TableEnum },
                               table2: { key: TableEnumKeys, tableName: TableEnum }):
        { rowProp: TableEnumKeys, rowPropGroup: TableEnum, colProp: TableEnumKeys, colPropGroup: TableEnum } => {
        let rowProp;
        let colProp;
        for (let tableEnum of [TableEnum.FAMILY, TableEnum.ACTIVITY, TableEnum.RESIDENCE]) {
            const rowPropGroup = [table1, table2].find(prop => {
                if (prop.tableName === tableEnum) {
                    rowProp = prop.key;
                    return true;
                }
            })?.tableName;
            if (rowProp) {
                const colPropGroup = [table1, table2].find(prop => {
                    if (prop.tableName !== rowPropGroup) {
                        colProp = prop.key;
                        return true;
                    }
                })!.tableName;
                return {rowProp, rowPropGroup, colProp, colPropGroup};
            }
        }
        return {rowProp: table1.key, colProp: table2.key, rowPropGroup: table1.tableName, colPropGroup: table2.tableName};
    }
}

enum TableEnum {
    FAMILY = 'FAMILY',
    KIDS = 'KIDS',
    ACTIVITY = 'ACTIVITY',
    RESIDENCE = 'RESIDENCE',
}

const tableEnumIndexValues: { [key in TableEnum]: {[key: string | TableEnumKeys]: number} } = {
    FAMILY: {
        BOGNAR: 0,
        KARDOS: 1,
        SZUCS: 2,
        VADASZ: 3,
        VARGA: 4,
    },
    ACTIVITY: {
        SKATING: 0,
        FOOTBALL: 1,
        CYCLING: 2,
        JOGGING: 3,
        BADMINTON: 4,
    },
    RESIDENCE: {
        ANGYALFOLD: 0,
        BELVAROS: 1,
        CSILLAGHEGY: 2,
        OBUDA: 3,
        UJPEST: 4
    },
    KIDS: {
        ONE: 0,
        TWO: 1,
        THREE: 2,
        FOUR: 3,
        FIVE: 4
    }
}

const tableOffsets = {
    [`${TableEnum.FAMILY}:${TableEnum.KIDS}`]: 0,
    [`${TableEnum.FAMILY}:${TableEnum.RESIDENCE}`]: 25,
    [`${TableEnum.FAMILY}:${TableEnum.ACTIVITY}`]: 50,
    [`${TableEnum.ACTIVITY}:${TableEnum.KIDS}`]: 75,
    [`${TableEnum.ACTIVITY}:${TableEnum.RESIDENCE}`]: 100,
    [`${TableEnum.RESIDENCE}:${TableEnum.KIDS}`]: 125,
}

type TableEnumKeys = FamilyEnum | KidsEnum | ActivityEnum | ResidenceEnum;

enum FamilyEnum {
    BOGNAR = 'BOGNAR',
    KARDOS = 'KARDOS',
    SZUCS = 'SZUCS',
    VADASZ = 'VADASZ',
    VARGA = 'VARGA',
}

enum KidsEnum {
    ONE = 'ONE',
    TWO = 'TWO',
    THREE = 'THREE',
    FOUR = 'FOUR',
    FIVE = 'FIVE',
}

enum ActivityEnum {
    SKATING = 'SKATING',
    FOOTBALL = 'FOOTBALL',
    CYCLING = 'CYCLING',
    JOGGING = 'JOGGING',
    BADMINTON = 'BADMINTON',
}

enum ResidenceEnum {
    ANGYALFOLD = 'ANGYALFOLD',
    BELVAROS = 'BELVAROS',
    CSILLAGHEGY = 'CSILLAGHEGY',
    OBUDA = 'OBUDA',
    UJPEST = 'UJPEST',
}
