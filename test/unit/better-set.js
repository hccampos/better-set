import BetterSet from '../../src/better-set';

describe('BetterSet', () => {
    describe('add()', () => {
        it('should return the set itself', () => {
            let set = new BetterSet();
            expect(set.add(null)).to.equal(set);
        });

        it('should add one value to the set', () => {
            let set = new BetterSet();
            set.add(1);
            expect(set.has(1)).to.equal(true);
            expect(set.has(2)).to.equal(false);
        });
    });

    describe('addAll()', () => {
        it('should return the set itself', () => {
            let set = new BetterSet();
            expect(set.addAll([])).to.equal(set);
        });

        it('should add values from an array to the set', () => {
            let set = new BetterSet();
            set.addAll([1, 2, 3]);
            expect(set.has(1)).to.equal(true);
            expect(set.has(2)).to.equal(true);
            expect(set.has(3)).to.equal(true);
            expect(set.has(4)).to.equal(false);
        });
    });
});
