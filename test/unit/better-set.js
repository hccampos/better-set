import betterSet from '../../src/better-set';

describe('betterSet', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(betterSet, 'greet');
      betterSet.greet();
    });

    it('should have been run once', () => {
      expect(betterSet.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(betterSet.greet).to.have.always.returned('hello');
    });
  });
});
