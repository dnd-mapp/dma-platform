import { parseInt } from './parse-int';

describe('parseInt', () => {
    it('should parse', () => {
        expect(parseInt('5', 2)).toEqual(5);
    });

    it('should use fallback', () => {
        expect(parseInt('hello', 2)).toEqual(2);
    });
});
