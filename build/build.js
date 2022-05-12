var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define("BitSet", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.BitSet = void 0;
    var BitSet = /** @class */ (function () {
        function BitSet(propsSize) {
            var _this = this;
            this.propsSize = propsSize;
            this.get = function (index) { return _this.bitMap[index]; };
            this.clear = function () {
                Object.keys(_this.bitMap).forEach(function (key) { return delete _this.bitMap[key]; });
            };
            this.bitMap = {};
        }
        BitSet.prototype.setPositive = function (index) { this.bitMap[index] = true; };
        BitSet.prototype.setNegative = function (index) { this.bitMap[index] = false; };
        BitSet.prototype.keys = function () {
            return Object.keys(this.bitMap);
        };
        return BitSet;
    }());
    exports.BitSet = BitSet;
});
define("Clause", ["require", "exports", "BitSet"], function (require, exports, BitSet_1) {
    "use strict";
    exports.__esModule = true;
    exports.Clause = void 0;
    var sign = ['-', ''];
    var Clause = /** @class */ (function () {
        function Clause(propCount) {
            this.propCount = propCount;
            this.bitSet = new BitSet_1.BitSet(propCount);
        }
        Clause.prototype.set = function (index, value) {
            this.bitSet[value ? 'setPositive' : 'setNegative'](index);
        };
        Clause.prototype.toDIMACS = function () {
            var e_1, _a;
            var stringVal = '';
            try {
                for (var _b = __values(this.bitSet.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    stringVal += " ".concat(sign[+this.bitSet.get(+key)]).concat(+key + 1);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return stringVal;
        };
        Clause.prototype.evaluation = function (interpretation) {
            var e_2, _a;
            var ev = true;
            try {
                for (var _b = __values(this.bitSet.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    if (interpretation[+key]) {
                        ev || (ev = this.bitSet.get(+key));
                        continue;
                    }
                    ev || (ev = !this.bitSet.get(+key));
                    if (!ev)
                        break;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return ev;
        };
        return Clause;
    }());
    exports.Clause = Clause;
});
define("Margit", ["require", "exports", "Clause"], function (require, exports, Clause_1) {
    "use strict";
    exports.__esModule = true;
    exports.Margit = void 0;
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
    var Margit = /** @class */ (function (_super) {
        __extends(Margit, _super);
        function Margit() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.clauses = [];
            _this.constructClauses = function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all([
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
                            ]).then()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); };
            return _this;
        }
        Margit.prototype.addClause = function (clause) {
            this.clauses = __spreadArray(__spreadArray([], __read(this.clauses), false), [clause], false);
        };
        Margit.prototype.constructTable = function () {
            return __awaiter(this, void 0, void 0, function () {
                var keypairs, _loop_1, keypairs_1, keypairs_1_1, keypair;
                var e_3, _a;
                var _this = this;
                return __generator(this, function (_b) {
                    keypairs = Object.keys(tableOffsets).map(function (key) { return key.split(':'); });
                    _loop_1 = function (keypair) {
                        var tableEnum1 = TableEnum[keypair[0]];
                        var tableEnum2 = TableEnum[keypair[1]];
                        var keyList1 = Object.keys(tableEnumIndexValues[keypair[0]]);
                        var keyList2 = Object.keys(tableEnumIndexValues[keypair[1]]);
                        keyList1.forEach(function (key) {
                            var e_4, _a;
                            var indeces = _this.getRowIndeces(key, tableEnum2);
                            var clause = _this.getNewClause();
                            try {
                                for (var indeces_1 = (e_4 = void 0, __values(indeces)), indeces_1_1 = indeces_1.next(); !indeces_1_1.done; indeces_1_1 = indeces_1.next()) {
                                    var index = indeces_1_1.value;
                                    clause.set(index, true);
                                }
                            }
                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                            finally {
                                try {
                                    if (indeces_1_1 && !indeces_1_1.done && (_a = indeces_1["return"])) _a.call(indeces_1);
                                }
                                finally { if (e_4) throw e_4.error; }
                            }
                            _this.addClause(clause);
                            _this.createCombinations(indeces).then(function (combinations) {
                                var e_5, _a;
                                var _loop_2 = function (comb) {
                                    var newClause = _this.getNewClause();
                                    comb.forEach(function (c) { return newClause.set(c, false); });
                                    _this.addClause(newClause);
                                };
                                try {
                                    for (var combinations_1 = (e_5 = void 0, __values(combinations)), combinations_1_1 = combinations_1.next(); !combinations_1_1.done; combinations_1_1 = combinations_1.next()) {
                                        var comb = combinations_1_1.value;
                                        _loop_2(comb);
                                    }
                                }
                                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                finally {
                                    try {
                                        if (combinations_1_1 && !combinations_1_1.done && (_a = combinations_1["return"])) _a.call(combinations_1);
                                    }
                                    finally { if (e_5) throw e_5.error; }
                                }
                            });
                        });
                        keyList2.forEach(function (key) {
                            var e_6, _a;
                            var indeces = _this.getColIndeces(tableEnum1, key);
                            var clause = _this.getNewClause();
                            try {
                                for (var indeces_2 = (e_6 = void 0, __values(indeces)), indeces_2_1 = indeces_2.next(); !indeces_2_1.done; indeces_2_1 = indeces_2.next()) {
                                    var index = indeces_2_1.value;
                                    clause.set(index, true);
                                }
                            }
                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                            finally {
                                try {
                                    if (indeces_2_1 && !indeces_2_1.done && (_a = indeces_2["return"])) _a.call(indeces_2);
                                }
                                finally { if (e_6) throw e_6.error; }
                            }
                            _this.addClause(clause);
                            _this.createCombinations(indeces).then(function (combinations) {
                                var e_7, _a;
                                var _loop_3 = function (comb) {
                                    var newClause = _this.getNewClause();
                                    comb.forEach(function (c) { return newClause.set(c, false); });
                                    _this.addClause(newClause);
                                };
                                try {
                                    for (var combinations_2 = (e_7 = void 0, __values(combinations)), combinations_2_1 = combinations_2.next(); !combinations_2_1.done; combinations_2_1 = combinations_2.next()) {
                                        var comb = combinations_2_1.value;
                                        _loop_3(comb);
                                    }
                                }
                                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                                finally {
                                    try {
                                        if (combinations_2_1 && !combinations_2_1.done && (_a = combinations_2["return"])) _a.call(combinations_2);
                                    }
                                    finally { if (e_7) throw e_7.error; }
                                }
                            });
                        });
                    };
                    try {
                        for (keypairs_1 = __values(keypairs), keypairs_1_1 = keypairs_1.next(); !keypairs_1_1.done; keypairs_1_1 = keypairs_1.next()) {
                            keypair = keypairs_1_1.value;
                            _loop_1(keypair);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (keypairs_1_1 && !keypairs_1_1.done && (_a = keypairs_1["return"])) _a.call(keypairs_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    return [2 /*return*/];
                });
            });
        };
        Margit.prototype.constructIntersectionClauses = function () {
            return __awaiter(this, void 0, void 0, function () {
                var rowTableNames, colTableNames, _loop_4, this_1, rowTableNames_1, rowTableNames_1_1, rowEnum;
                var e_8, _a;
                return __generator(this, function (_b) {
                    rowTableNames = [TableEnum.FAMILY, TableEnum.ACTIVITY, TableEnum.RESIDENCE];
                    colTableNames = [TableEnum.KIDS, TableEnum.RESIDENCE, TableEnum.ACTIVITY];
                    _loop_4 = function (rowEnum) {
                        var e_9, _c, e_10, _d;
                        try {
                            for (var colTableNames_1 = (e_9 = void 0, __values(colTableNames)), colTableNames_1_1 = colTableNames_1.next(); !colTableNames_1_1.done; colTableNames_1_1 = colTableNames_1.next()) {
                                var colEnum = colTableNames_1_1.value;
                                if (colEnum === rowEnum)
                                    continue;
                                var otherTables = rowTableNames.filter(function (rt) { return rt !== rowEnum; });
                                try {
                                    for (var otherTables_1 = (e_10 = void 0, __values(otherTables)), otherTables_1_1 = otherTables_1.next(); !otherTables_1_1.done; otherTables_1_1 = otherTables_1.next()) {
                                        var othEnum = otherTables_1_1.value;
                                        if (othEnum === colEnum)
                                            continue;
                                        var rowEnumKeys = Object.keys(tableEnumIndexValues[rowEnum]);
                                        var colEnumKeys = Object.keys(tableEnumIndexValues[colEnum]);
                                        var othEnumKeys = Object.keys(tableEnumIndexValues[othEnum]);
                                        var tempRowEnumKeys = __spreadArray([], __read(rowEnumKeys), false);
                                        var tempColEnumKeys = __spreadArray([], __read(colEnumKeys), false);
                                        var tempOthEnumKeys = __spreadArray([], __read(othEnumKeys), false);
                                        var rowItem = tempRowEnumKeys.pop();
                                        var colItem = tempColEnumKeys.pop();
                                        var othItem = tempOthEnumKeys.pop();
                                        while (tempRowEnumKeys.length > 0) {
                                            while (tempOthEnumKeys.length > 0) {
                                                while (tempColEnumKeys.length > 0) {
                                                    var rowItemIndex = this_1.getCellIndex(rowItem, colItem);
                                                    var othItemIndex = this_1.getCellIndex(othItem, colItem);
                                                    var intItemIndex = this_1.getCellIndex(rowItem, othItem);
                                                    var clause = this_1.getNewClause();
                                                    clause.set(rowItemIndex, false);
                                                    clause.set(othItemIndex, false);
                                                    clause.set(intItemIndex, true);
                                                    this_1.addClause(clause);
                                                    colItem = tempColEnumKeys.pop();
                                                }
                                                othItem = tempOthEnumKeys.pop();
                                                tempColEnumKeys = __spreadArray([], __read(colEnumKeys), false);
                                            }
                                            rowItem = tempRowEnumKeys.pop();
                                            tempOthEnumKeys = __spreadArray([], __read(othEnumKeys), false);
                                        }
                                    }
                                }
                                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                                finally {
                                    try {
                                        if (otherTables_1_1 && !otherTables_1_1.done && (_d = otherTables_1["return"])) _d.call(otherTables_1);
                                    }
                                    finally { if (e_10) throw e_10.error; }
                                }
                            }
                        }
                        catch (e_9_1) { e_9 = { error: e_9_1 }; }
                        finally {
                            try {
                                if (colTableNames_1_1 && !colTableNames_1_1.done && (_c = colTableNames_1["return"])) _c.call(colTableNames_1);
                            }
                            finally { if (e_9) throw e_9.error; }
                        }
                    };
                    this_1 = this;
                    try {
                        for (rowTableNames_1 = __values(rowTableNames), rowTableNames_1_1 = rowTableNames_1.next(); !rowTableNames_1_1.done; rowTableNames_1_1 = rowTableNames_1.next()) {
                            rowEnum = rowTableNames_1_1.value;
                            _loop_4(rowEnum);
                        }
                    }
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (rowTableNames_1_1 && !rowTableNames_1_1.done && (_a = rowTableNames_1["return"])) _a.call(rowTableNames_1);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                    return [2 /*return*/];
                });
            });
        };
        Margit.prototype.createCombinations = function (indeces) {
            return __awaiter(this, void 0, void 0, function () {
                var numbers, indeces_3, indeces_3_1, index, currIndex, indeces_4, indeces_4_1, i;
                var e_11, _a, e_12, _b;
                return __generator(this, function (_c) {
                    numbers = [];
                    try {
                        for (indeces_3 = __values(indeces), indeces_3_1 = indeces_3.next(); !indeces_3_1.done; indeces_3_1 = indeces_3.next()) {
                            index = indeces_3_1.value;
                            while (indeces.length > 0) {
                                currIndex = indeces.pop();
                                try {
                                    for (indeces_4 = (e_12 = void 0, __values(indeces)), indeces_4_1 = indeces_4.next(); !indeces_4_1.done; indeces_4_1 = indeces_4.next()) {
                                        i = indeces_4_1.value;
                                        numbers = __spreadArray(__spreadArray([], __read(numbers), false), [[i, currIndex]], false);
                                    }
                                }
                                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                                finally {
                                    try {
                                        if (indeces_4_1 && !indeces_4_1.done && (_b = indeces_4["return"])) _b.call(indeces_4);
                                    }
                                    finally { if (e_12) throw e_12.error; }
                                }
                            }
                        }
                    }
                    catch (e_11_1) { e_11 = { error: e_11_1 }; }
                    finally {
                        try {
                            if (indeces_3_1 && !indeces_3_1.done && (_a = indeces_3["return"])) _a.call(indeces_3);
                        }
                        finally { if (e_11) throw e_11.error; }
                    }
                    return [2 /*return*/, numbers];
                });
            });
        };
        /**
         * Az angyalföldi család görkorcsolyázott.
         */
        Margit.prototype.A1 = function () {
            return __awaiter(this, void 0, void 0, function () {
                var index, clause;
                return __generator(this, function (_a) {
                    index = this.getCellIndex(ResidenceEnum.ANGYALFOLD, ActivityEnum.SKATING);
                    clause = this.getNewClause();
                    clause.set(index, true);
                    this.addClause(clause);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Kardosék kerékpároztak.
         */
        Margit.prototype.A2 = function () {
            return __awaiter(this, void 0, void 0, function () {
                var index, clause;
                return __generator(this, function (_a) {
                    index = this.getCellIndex(FamilyEnum.KARDOS, ActivityEnum.CYCLING);
                    clause = this.getNewClause();
                    clause.set(index, true);
                    this.addClause(clause);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Kardosék Óbudáról vagy Csillaghegyről érkeztek.
         */
        Margit.prototype.A3 = function () {
            return __awaiter(this, void 0, void 0, function () {
                var index1, index2, index3, clause1, clause2, clause3;
                return __generator(this, function (_a) {
                    index1 = this.getCellIndex(FamilyEnum.KARDOS, ResidenceEnum.ANGYALFOLD);
                    index2 = this.getCellIndex(FamilyEnum.KARDOS, ResidenceEnum.BELVAROS);
                    index3 = this.getCellIndex(FamilyEnum.KARDOS, ResidenceEnum.UJPEST);
                    clause1 = this.getNewClause();
                    clause2 = this.getNewClause();
                    clause3 = this.getNewClause();
                    clause1.set(index1, false);
                    clause2.set(index2, false);
                    clause3.set(index3, false);
                    this.addClause(clause1);
                    this.addClause(clause2);
                    this.addClause(clause3);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Az angyalföldi család nem Kardosék.
         */
        Margit.prototype.A4 = function () {
            return __awaiter(this, void 0, void 0, function () {
                var index, clause;
                return __generator(this, function (_a) {
                    index = this.getCellIndex(FamilyEnum.KARDOS, ResidenceEnum.ANGYALFOLD);
                    clause = this.getNewClause();
                    clause.set(index, false);
                    this.addClause(clause);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Az ötgyerekes család focizott
         */
        Margit.prototype.B1 = function () {
            return __awaiter(this, void 0, void 0, function () {
                var index, clause;
                return __generator(this, function (_a) {
                    index = this.getCellIndex(KidsEnum.FIVE, ActivityEnum.FOOTBALL);
                    clause = this.getNewClause();
                    clause.set(index, true);
                    this.addClause(clause);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * A csillaghegyi családban kevesebb a gyerek mint a tollaslabdázó családban.
         */
        Margit.prototype.C1 = function () {
            return __awaiter(this, void 0, void 0, function () {
                var indecesCsillaghegy, indecesBadminton, i, j, clause_1, clause;
                return __generator(this, function (_a) {
                    indecesCsillaghegy = this.getRowIndeces(ResidenceEnum.CSILLAGHEGY, TableEnum.KIDS);
                    indecesBadminton = this.getRowIndeces(ActivityEnum.BADMINTON, TableEnum.KIDS);
                    for (i = 0; i < indecesCsillaghegy.length - 1; i++) {
                        for (j = i; j >= 0; j--) {
                            clause_1 = this.getNewClause();
                            clause_1.set(indecesCsillaghegy[i], false);
                            clause_1.set(indecesBadminton[j], false);
                            this.addClause(clause_1);
                        }
                    }
                    clause = this.getNewClause();
                    clause.set(indecesCsillaghegy[indecesCsillaghegy.length - 1], false);
                    this.addClause(clause);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Bognárék nem kocognak
         */
        Margit.prototype.D1 = function () {
            return __awaiter(this, void 0, void 0, function () {
                var index, clause;
                return __generator(this, function (_a) {
                    index = this.getCellIndex(FamilyEnum.BOGNAR, ActivityEnum.JOGGING);
                    clause = this.getNewClause();
                    clause.set(index, false);
                    this.addClause(clause);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * A belvárosi családban 1 gyerek van
         */
        Margit.prototype.E1 = function () {
            return __awaiter(this, void 0, void 0, function () {
                var index, clause;
                return __generator(this, function (_a) {
                    index = this.getCellIndex(ResidenceEnum.BELVAROS, KidsEnum.ONE);
                    clause = this.getNewClause();
                    clause.set(index, true);
                    this.addClause(clause);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Szűcséknél két gyerek van
         */
        Margit.prototype.E2 = function () {
            return __awaiter(this, void 0, void 0, function () {
                var index, clause;
                return __generator(this, function (_a) {
                    index = this.getCellIndex(FamilyEnum.SZUCS, KidsEnum.TWO);
                    clause = this.getNewClause();
                    clause.set(index, true);
                    this.addClause(clause);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Vadászék Újpesten élnek
         */
        Margit.prototype.E3 = function () {
            return __awaiter(this, void 0, void 0, function () {
                var index, clause;
                return __generator(this, function (_a) {
                    index = this.getCellIndex(FamilyEnum.VADASZ, ResidenceEnum.UJPEST);
                    clause = this.getNewClause();
                    clause.set(index, true);
                    this.addClause(clause);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Vadászéknál nincs öt gyerek
         */
        Margit.prototype.E4 = function () {
            return __awaiter(this, void 0, void 0, function () {
                var index, clause;
                return __generator(this, function (_a) {
                    index = this.getCellIndex(FamilyEnum.VADASZ, KidsEnum.FIVE);
                    clause = this.getNewClause();
                    clause.set(index, false);
                    this.addClause(clause);
                    return [2 /*return*/];
                });
            });
        };
        Margit.prototype.getNewClause = function () {
            return new Clause_1.Clause(this.propSize);
        };
        return Margit;
    }(MargitUtils));
    exports.Margit = Margit;
});
window.addEventListener('load', function () {
    // @ts-ignore
    require(['Problem', 'BitSet', 'Margit'], function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var Problem = args[0].Problem;
        var Margit = args[2].Margit;
        Problem.of(new Margit()).then(function (problem) {
            var dimacs = problem.toDIMACS();
            console.log(dimacs);
            document.getElementById('result').innerText = dimacs;
            document.getElementById('resultClean').innerText = problem.toCleanString();
        });
    });
});
var _a;
var MargitUtils = /** @class */ (function () {
    function MargitUtils() {
        var _this = this;
        this.cellsPerTable = 25;
        this.rows = 5;
        this.columns = 5;
        this.propSize = this.rows * this.columns * 6;
        this.indexTresholds = [0, 25, 50, 75, 100, 125, 150];
        this.getOffSet = function (table1, table2) {
            return tableOffsets[Object.keys(tableOffsets).find(function (key) {
                var keys = key.split(':');
                return keys.includes(table1) && keys.includes(table2);
            })];
        };
        this.getRowIndeces = function (tableKey1, table2) {
            var table1 = _this.getTableEnumByKey(tableKey1);
            var offset = _this.getOffSet(table1, table2);
            var _a = _this.getTableProps({ tableName: table1, key: tableKey1 }, { tableName: table2, key: undefined }), rowProp = _a.rowProp, rowPropGroup = _a.rowPropGroup;
            var rowIndex = tableEnumIndexValues[rowPropGroup][rowProp];
            return _this.range(offset + (rowIndex * _this.columns), offset + (rowIndex * _this.columns) + _this.columns - 1);
        };
        this.getColIndeces = function (table1, tableKey2) {
            var table2 = _this.getTableEnumByKey(tableKey2);
            var offset = _this.getOffSet(table1, table2);
            var rowIndex = tableEnumIndexValues[table2][tableKey2];
            return _this.range(offset + rowIndex, offset + rowIndex + _this.cellsPerTable - _this.rows, 5);
        };
        this.getCellIndex = function (tableKey1, tableKey2) {
            var table1 = _this.getTableEnumByKey(tableKey1);
            var table2 = _this.getTableEnumByKey(tableKey2);
            if (table1 === table2)
                return 0;
            var offset = _this.getOffSet(table1, table2);
            var _a = _this.getTableProps({ tableName: table1, key: tableKey1 }, { tableName: table2, key: tableKey2 }), rowProp = _a.rowProp, colProp = _a.colProp, rowPropGroup = _a.rowPropGroup, colPropGroup = _a.colPropGroup;
            var rowIndex = tableEnumIndexValues[rowPropGroup][rowProp];
            var colIndex = tableEnumIndexValues[colPropGroup][colProp];
            return offset + (rowIndex * _this.columns + colIndex);
        };
        this.getTableEnumByKey = function (tableKey) {
            if (tableKey in FamilyEnum)
                return TableEnum.FAMILY;
            if (tableKey in KidsEnum)
                return TableEnum.KIDS;
            if (tableKey in ActivityEnum)
                return TableEnum.ACTIVITY;
            return TableEnum.RESIDENCE;
        };
        this.getTableProps = function (table1, table2) {
            var e_13, _a;
            var _b;
            var rowProp;
            var colProp;
            var _loop_5 = function (tableEnum) {
                var rowPropGroup = (_b = [table1, table2].find(function (prop) {
                    if (prop.tableName === tableEnum) {
                        rowProp = prop.key;
                        return true;
                    }
                })) === null || _b === void 0 ? void 0 : _b.tableName;
                if (rowProp) {
                    var colPropGroup = [table1, table2].find(function (prop) {
                        if (prop.tableName !== rowPropGroup) {
                            colProp = prop.key;
                            return true;
                        }
                    }).tableName;
                    return { value: { rowProp: rowProp, rowPropGroup: rowPropGroup, colProp: colProp, colPropGroup: colPropGroup } };
                }
            };
            try {
                for (var _c = __values([TableEnum.FAMILY, TableEnum.ACTIVITY, TableEnum.RESIDENCE]), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var tableEnum = _d.value;
                    var state_1 = _loop_5(tableEnum);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
                }
                finally { if (e_13) throw e_13.error; }
            }
            return { rowProp: table1.key, colProp: table2.key, rowPropGroup: table1.tableName, colPropGroup: table2.tableName };
        };
    }
    MargitUtils.prototype.range = function (start, end, step) {
        if (step === void 0) { step = 1; }
        var len = Math.floor((end - start) / step) + 1;
        return Array(len).fill(0).map(function (_, idx) { return start + (idx * step); });
    };
    MargitUtils.prototype.getFillableCells = function (index) {
        var fillableCells = [];
        var _a = this.getTresholds(index), lowerTreshold = _a.lowerTreshold, upperTreshold = _a.upperTreshold;
        var currIndex = index;
        while (lowerTreshold < currIndex) {
            currIndex -= this.rows;
            fillableCells = __spreadArray(__spreadArray([], __read(fillableCells), false), [currIndex], false);
        }
        currIndex = index;
        while (upperTreshold > currIndex) {
            currIndex += this.rows;
            fillableCells = __spreadArray(__spreadArray([], __read(fillableCells), false), [currIndex], false);
        }
        currIndex = index;
        while ((index - (index % this.columns)) < currIndex) {
            currIndex--;
            fillableCells = __spreadArray(__spreadArray([], __read(fillableCells), false), [currIndex], false);
        }
        currIndex = index;
        while ((index + (5 - (index % this.columns))) > currIndex) {
            currIndex++;
            fillableCells = __spreadArray(__spreadArray([], __read(fillableCells), false), [currIndex], false);
        }
        return fillableCells;
    };
    MargitUtils.prototype.getTresholds = function (index) {
        var lowerTreshold = this.indexTresholds.find(function (treshold) { return treshold < index; });
        var lowerTresholdIndex = this.indexTresholds.indexOf(lowerTreshold);
        var upperTresholdIndex = lowerTresholdIndex + 1;
        var upperTreshold = this.indexTresholds[upperTresholdIndex];
        return { lowerTreshold: lowerTreshold, lowerTresholdIndex: lowerTresholdIndex, upperTreshold: upperTreshold, upperTresholdIndex: upperTresholdIndex };
    };
    return MargitUtils;
}());
var TableEnum;
(function (TableEnum) {
    TableEnum["FAMILY"] = "FAMILY";
    TableEnum["KIDS"] = "KIDS";
    TableEnum["ACTIVITY"] = "ACTIVITY";
    TableEnum["RESIDENCE"] = "RESIDENCE";
})(TableEnum || (TableEnum = {}));
var tableEnumIndexValues = {
    FAMILY: {
        BOGNAR: 0,
        KARDOS: 1,
        SZUCS: 2,
        VADASZ: 3,
        VARGA: 4
    },
    ACTIVITY: {
        SKATING: 0,
        FOOTBALL: 1,
        CYCLING: 2,
        JOGGING: 3,
        BADMINTON: 4
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
};
var tableOffsets = (_a = {},
    _a["".concat(TableEnum.FAMILY, ":").concat(TableEnum.KIDS)] = 0,
    _a["".concat(TableEnum.FAMILY, ":").concat(TableEnum.RESIDENCE)] = 25,
    _a["".concat(TableEnum.FAMILY, ":").concat(TableEnum.ACTIVITY)] = 50,
    _a["".concat(TableEnum.ACTIVITY, ":").concat(TableEnum.KIDS)] = 75,
    _a["".concat(TableEnum.ACTIVITY, ":").concat(TableEnum.RESIDENCE)] = 100,
    _a["".concat(TableEnum.RESIDENCE, ":").concat(TableEnum.KIDS)] = 125,
    _a);
var FamilyEnum;
(function (FamilyEnum) {
    FamilyEnum["BOGNAR"] = "BOGNAR";
    FamilyEnum["KARDOS"] = "KARDOS";
    FamilyEnum["SZUCS"] = "SZUCS";
    FamilyEnum["VADASZ"] = "VADASZ";
    FamilyEnum["VARGA"] = "VARGA";
})(FamilyEnum || (FamilyEnum = {}));
var KidsEnum;
(function (KidsEnum) {
    KidsEnum["ONE"] = "ONE";
    KidsEnum["TWO"] = "TWO";
    KidsEnum["THREE"] = "THREE";
    KidsEnum["FOUR"] = "FOUR";
    KidsEnum["FIVE"] = "FIVE";
})(KidsEnum || (KidsEnum = {}));
var ActivityEnum;
(function (ActivityEnum) {
    ActivityEnum["SKATING"] = "SKATING";
    ActivityEnum["FOOTBALL"] = "FOOTBALL";
    ActivityEnum["CYCLING"] = "CYCLING";
    ActivityEnum["JOGGING"] = "JOGGING";
    ActivityEnum["BADMINTON"] = "BADMINTON";
})(ActivityEnum || (ActivityEnum = {}));
var ResidenceEnum;
(function (ResidenceEnum) {
    ResidenceEnum["ANGYALFOLD"] = "ANGYALFOLD";
    ResidenceEnum["BELVAROS"] = "BELVAROS";
    ResidenceEnum["CSILLAGHEGY"] = "CSILLAGHEGY";
    ResidenceEnum["OBUDA"] = "OBUDA";
    ResidenceEnum["UJPEST"] = "UJPEST";
})(ResidenceEnum || (ResidenceEnum = {}));
define("Problem", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Problem = void 0;
    var Problem = /** @class */ (function () {
        function Problem() {
        }
        Problem.prototype.toDIMACS = function () {
            var e_14, _a;
            var clauses = this.problem.clauses;
            var dimacsFormat = "p cnf ".concat(clauses[0].propCount, " ").concat(clauses.length, " \r\n");
            try {
                for (var clauses_1 = __values(clauses), clauses_1_1 = clauses_1.next(); !clauses_1_1.done; clauses_1_1 = clauses_1.next()) {
                    var clause = clauses_1_1.value;
                    dimacsFormat += "".concat(clause.toDIMACS(), " 0\r\n");
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (clauses_1_1 && !clauses_1_1.done && (_a = clauses_1["return"])) _a.call(clauses_1);
                }
                finally { if (e_14) throw e_14.error; }
            }
            return dimacsFormat;
        };
        Problem.prototype.toCleanString = function () {
            var e_15, _a;
            var clauses = this.problem.clauses;
            var dimacsFormat = "";
            try {
                for (var clauses_2 = __values(clauses), clauses_2_1 = clauses_2.next(); !clauses_2_1.done; clauses_2_1 = clauses_2.next()) {
                    var clause = clauses_2_1.value;
                    dimacsFormat += "".concat(clause.toDIMACS(), "\r\n");
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (clauses_2_1 && !clauses_2_1.done && (_a = clauses_2["return"])) _a.call(clauses_2);
                }
                finally { if (e_15) throw e_15.error; }
            }
            return dimacsFormat;
        };
        Problem.of = function (o) {
            return __awaiter(this, void 0, void 0, function () {
                var prob;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, o.constructClauses()];
                        case 1:
                            _a.sent();
                            prob = new Problem();
                            prob.problem = o;
                            return [2 /*return*/, prob];
                    }
                });
            });
        };
        return Problem;
    }());
    exports.Problem = Problem;
});
