class BetterSet {
    constructor(_values) {
        let values = _values;

        if (values instanceof BetterSet) {
            values = values._set;
        }

        this._set = new Set(values);

        Object.defineProperty(this, 'size', {
            get: this.getSize.bind(this)
        });
    }

    /**
     * Adds the specified value to the set.
     *
     * @param {*} value
     *        The value which is to be added.
     *
     * @return {BetterSet}
     *          The set itself.
     */
    add(value) {
        this._set.add(value);
        return this;
    }

    /**
     * Adds all the specified values to the set.
     *
     * @param {Iterator} values
     *        The values which are to be added to the set.
     *
     * @return {BetterSet}
     *          The set itself.
     */
    addAll(values) {
        for (let value of values) {
            this._set.add(value);
        }

        return this;
    }

    /**
     * Removes all the elements from the set.
     *
     * @return {BetterSet}
     *         The set itself.
     */
    clear() {
        this._set.clear();
        return this;
    }

    /**
     * Deletes the sepcified value from the set.
     *
     * @param {*} value
     *        The value which is to be deleted.
     *
     * @return {BetterSet}
     *         Returns true if an element in the Set object has been removed
     *         successfully; otherwise false.
     */
    delete(value) {
        return this._set.delete(value);
    }

    /**
     * Gets all the entries in the set as an iterator object.
     *
     * @return {Iterator}
     *         A new Iterator object that contains an array of [value, value]
     *         for each element in the Set object, in insertion order. This is
     *         kept similar to the Map object, so that each entry has the same
     *         value for its key and value here.
     */
    entries() {
        return this._set.entries();
    }

    /**
     * Calls callbackFn once for each value present in the Set object, in
     * insertion order. If a thisArg parameter is provided to forEach, it will
     * be used as the this value for each callback.
     *
     * @param {Function} callbackFn
     *        Function to execute for each element.
     * @param {Object} [thisArg]
     *        Value to use as this when executing callbackFn.
     */
    forEach(callbackFn, thisArg) {
        this._set.forEach(callbackFn, thisArg);
    }

    /**
     * Gets the number of values that are in the set.
     *
     * @return {Number}
     */
    getSize() {
        return this._set.size;
    }

    /**
     * Gets whether the set contains an element with the specified value.
     *
     * @param {*} value
     *        The value which is to be checked.
     *
     * @return {Boolean}
     */
    has(value) {
        return this._set.has(value);
    }

    /**
     * Gets all the values in the set as an iterator object.
     *
     * @return {Iterator}
     *         A new Iterator object that contains the values for each element
     *         in the Set object in insertion order.
     */
    values() {
        return this._set.values();
    }

    /**
     * The same function as values().
     *
     * @return {Iterator}
     *         A new Iterator object that contains the values for each element
     *         in the Set object in insertion order.
     */
    keys() {
        return this._set.keys();
    }

    /**
     * Removes all the values contained in the argument from the current set.
     *
     * @param {Set|BetterSet} set
     *        The set whose values are to be removed.
     *
     * @return {BetterSet}
     *         The set itself.
     */
    difference(set) {
        set.forEach((value) => {
            this.delete(value);
        });

        return this;
    }

    /**
     * Removes all the values that are not also in the provided set.
     *
     * @param {BetterSet} set
     *        The set which is to be intersected against the current set.
     *
     * @return {BetterSet}
     *         The set itself.
     */
    intersection(set) {
        this.forEach((value) => {
            if (!set.has(value)) {
                this.delete(value);
            }
        });
        return this;
    }

    static intersection(set1, set2) {
        if (set1.size < set2.size) {
            return new BetterSet(set1).intersection(set2);
        } else {
            return new BetterSet(set2).intersection(set1);
        }
    }

    /**
     * Adds all the values in the argument to the current set.
     *
     * @param {BetterSet} set
     *        The set which is to be united with the current set.
     *
     * @return {BetterSet}
     *         The set itself.
     */
    union(set) {
        set.forEach((value) => {
            this.add(value);
        });
        return this;
    }

    static union(set1, set2) {
        return new BetterSet(set1).union(set2);
    }

    /**
     * Pushes all the values in the set into the specified array.
     *
     * @param {Array} array
     *        The array into which the values are to be pushed.
     *
     * @return {Array}
     *         The array into which the values have been pushed.
     */
    pushTo(array) {
        this.forEach(function (value) {
            array.push(value);
        });
        return array;
    }

    static pushTo(array, set) {
        return set.pushInto(array)
    }

    /**
     * Returns an array which contains the results of passing each value in the
     * set to the specified callback.
     *
     * @param {Function} callback
     *        Function to execute for each element.
     *
     * @return {Array}
     *         An array with the results of each invocation of callback.
     */
    map(callback) {
        let result = [];

        this.forEach(function (value) {
            result.push(callback(value));
        });

        return result;
    }

    static map(set, callback) {
        return set.map(callback);
    }

    /**
     *  Creates a new set which contains all the values of the current set that
     *  pass the specified predicate.
     *
     * @param {Function} predicate
     *        The predicate which is to be applied to all the values of the set.
     *
     * @return {BetterSet}
     */
    filter(predicate) {
        let result = new BetterSet();

        this.forEach(function (value) {
            if (predicate(value)) {
                result.add(value);
            }
        });

        return result;
    }

    static filter(set, predicate) {
        return set.filter(predicate);
    }

    /**
     * Creates a new set which contains all the values of the current set that
     * do not pass the specified predicate.
     *
     * @param {Function} predicate
     *        The predicate which is to be applied to all the values of the set.
     *
     * @return {BetterSet}
     */
    reject(predicate) {
        return this.filter(function (value) {
            return !predicate(value);
        });
    }

    static reject(set, predicate) {
        return set.reject(predicate);
    }

    /**
     * Deletes all the values which do not pass the specified predicate.
     *
     * @param {Function} predicate
     *        The predicate which is to be applied to all the values of the set.
     *
     * @return {BetterSet}
     */
    deleteAll(predicate) {
        this.forEach((value) => {
            if (predicate(value)) {
                this.delete(value);
            }
        });

        return this;
    }

    static deleteAll(set, predicate) {
        return set.deleteAll(predicate);
    }

    /**
     *  Keeps all the values which pass the specified predicate and removes all
     *  the other ones.
     *
     * @param {Function} predicate
     *        The predicate which is to be applied to all the values of the set.
     *
     * @return {BetterSet}
     */
    keepAll(predicate) {
        return this.deleteAll(function (value) {
            return !predicate(value);
        });
    }

    static keepAll(set, predicate) {
        return set.keepAll(predicate);
    }

    /**
     * Gets whether every value in the set passes the specified predicate.
     *
     * @param {Function} predicate
     *        The predicate which is to be applied to all the values of the set.
     *
     * @return {Boolean}
     */
    every(predicate) {
        for (let value of this) {
            if (!predicate(value)) {
                return false;
            }
        }

        return true;
    }

    static every(set, predicate) {
        return set.every(predicate);
    }

    /**
     * Gets whether no in the set passes the specified predicate.
     *
     * @param {Function} predicate
     *        The predicate which is to be applied to all the values of the set.
     *
     * @return {Boolean}
     */
    none(predicate) {
        return this.every(function (value) {
            return !predicate(value);
        });
    }

    static none(set, predicate) {
        return set.none(predicate);
    }

    /**
     * Gets whether any value in the set passes the specified predicate.
     *
     * @param {Function} predicate
     *        The predicate which is to be applied to all the values of the set.
     *
     * @return {Boolean}
     */
    any(predicate) {
        for (let value of this) {
            if (predicate(value)) {
                return true;
            }
        }

        return false;
    }

    static any(set, predicate) {
        return set.any(predicate);
    }

    /**
     * Gets whether all the values in the current set are also in the specified
     * set, that is, get whether the intersection of the two sets corresponds to
     * the set itself.
     *
     * @param {BetterSet} set
     *        et where all the values from the current set are to be found.
     *
     * @return {Boolean}
     */
    areAllIn(set) {
        return this.every(function (value) {
            set.has(value);
        });
    }

    static areAllIn(set1, set2) {
        return set1.areAllIn(set2);
    }

    fromArray(array) {
        this.clear();

        for (let i = 0; i < array.length; ++i) {
            this.add(array[i]);
        }

        return this;
    }

    static fromArray(array) {
        return new BetterSet().fromArray(array);
    }

    /**
     *  Creates a new array which contains all the elements that are in the
     *  current set.
     *
     * @return {Array}
     */
    toArray() {
        let result = [];

        this.forEach(function (value) {
            result.push(value);
        });

        return result;
    }

    static toArray(set) {
        return set.toArray();
    }
};

export default BetterSet;
