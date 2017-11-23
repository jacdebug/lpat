const assert = require('assert');
const lpat = require('..');

// test cases
let testSeq1 = [
    {
        seq: [
            'abc-55.jpg', 'abc-56.jpg', 'abc-57.jpg',
            'abc-58.jpg', 'abc-59.jpg', 'abc-60.jpg',
            'abc-61.jpg', 'abc-62.jpg', 'abc-63.jpg'
        ],
        res: 'abc-[55..63].jpg'
    },

    {
        seq: [
            'abc-01.jpg', 'abc-02.jpg', 'abc-03.jpg',
            'abc-04.jpg', 'abc-05.jpg', 'abc-06.jpg',
            'abc-07.jpg', 'abc-08.jpg', 'abc-09.jpg',
            'abc-10.jpg', 'abc-11.jpg', 'abc-12.jpg',
        ],
        res: 'abc-[01..12].jpg',
    },

    {
        seq: [
            'abc-101.jpg', 'abc-102.jpg', 'abc-103.jpg',
            'abc-104.jpg', 'abc-105.jpg', 'abc-106.jpg',
            'abc-107.jpg', 'abc-108.jpg', 'abc-109.jpg',
            'abc-110.jpg', 'abc-111.jpg', 'abc-112.jpg',
        ],
        res: 'abc-1[01..12].jpg',
    },

    {
        seq: [
            'abc-95.jpg', 'abc-96.jpg', 'abc-97.jpg',
            'abc-98.jpg', 'abc-99.jpg', 'abc-100.jpg',
            'abc-101.jpg', 'abc-102.jpg', 'abc-103.jpg',
            'abc-104.jpg', 'abc-105.jpg', 'abc-106.jpg',
            'abc-107.jpg', 'abc-108.jpg', 'abc-109.jpg',
            'abc-110.jpg', 'abc-111.jpg', 'abc-112.jpg',
        ],
        res: 'abc-[95..112].jpg',
    },

    {
        seq: [
            'abc-995.jpg', 'abc-996.jpg', 'abc-997.jpg',
            'abc-998.jpg', 'abc-999.jpg', 'abc-1000.jpg',
            'abc-1001.jpg', 'abc-1002.jpg', 'abc-1003.jpg',
            'abc-1004.jpg', 'abc-1005.jpg', 'abc-1006.jpg',
            'abc-1007.jpg', 'abc-1008.jpg', 'abc-1009.jpg',
            'abc-1010.jpg', 'abc-1011.jpg', 'abc-1012.jpg',
        ],
        res: 'abc-[995..1012].jpg',
    },

    {
        seq: [
            'abc-9999998.jpg', 'abc-9999999.jpg', 'abc-10000000.jpg',
            'abc-10000001.jpg', 'abc-10000002.jpg', 'abc-10000003.jpg'
        ],
        res: 'abc-[9999998..10000003].jpg',
    },

    {
        seq: [
            'abc-995.jpg', 'abc-996.jpg', 'abc-997.jpg',
            'abc-998.jpg', 'abc-999.jpg', 'abc-1000.jpg',
            'abc-1001.jpg', 'abc-1002.jpg',
            'abc-1004.jpg', 'abc-1005.jpg', 'abc-1006.jpg',
            'abc-1007.jpg', 'abc-1008.jpg', 'abc-1009.jpg',
            'abc-1010.jpg', 'abc-1011.jpg', 'abc-1012.jpg',
        ],
        res: 'abc-[995..1002].jpg abc-10[04..12].jpg',
    },

    {
        seq: [
            'abc-01-995.jpg', 'abc-02-996.jpg', 'abc-03-997.jpg',
        ],
        res: 'abc-0[1..3]-99[5..7].jpg',
    },

    {
        seq: [
            'abc-998-995.jpg', 'abc-999-996.jpg', 'abc-1000-997.jpg',
            'abc-1001-998.jpg', 'abc-1002-999.jpg', 'abc-1003-1000.jpg',
        ],
        res: 'abc-[998..1003]-[995..1000].jpg',

    },

    {
        get seq() {
            let bigArray = [];
            for (let i = 0; i < 1000000; i++) {
                bigArray.push(`random-1${i}`);
            }
            return bigArray;
        },
        res: 'random-1[0..999999]',
    },

];

testSeq1.forEach(testCase => {
    let exRes = lpat(testCase.seq);
    assert.equal(exRes, testCase.res);
    console.log(`\u001B[32m✓\u001B[39m Expected: ${testCase.res} Got: ${exRes}` );
});
