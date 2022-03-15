const assert = require('assert');
const { DummyClass } = require('../src/DummyClass');

describe('Test DummyClass', () => {
    it('Test 1', () => {
        const dummyClass = new DummyClass();
        const result = dummyClass.add(1, 1);

        assert.equal(result, 2);
    });
});