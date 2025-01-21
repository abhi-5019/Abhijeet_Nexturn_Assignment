const {capitalize, reverseString} = require('../src/stringUtilities');

describe('String Utilities Testing', function () {

    it('should capitalize the first letter of a word correctly', function () {
        expect(capitalize("hello")).toBe("Hello");
        expect(capitalize("")).toBe("");
        expect(capitalize("a")).toBe("A");
    });

    it('should reverse a string correctly', function () {
        expect(reverseString("hello")).toBe("olleh");
        expect(reverseString("")).toBe("");
        expect(reverseString("racecar")).toBe("racecar");
    });

});
