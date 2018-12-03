import {
    PART_TYPE_TEXT,
    PART_TYPE_INDEX
} from './constants';

// find seq info
const sqDiff = (a, b) => {
    let currentMatch = '';
    const seqInfo = [];
    const addSeqInfo = (type, value) => seqInfo.push({ type, value });

    for (let i = 0; i < a.length; i++) {
        if (a[i] === b[i]) {
            currentMatch += a[i];
        } else {
            if (currentMatch.length) {
                addSeqInfo(PART_TYPE_TEXT, currentMatch);
                currentMatch = '';
            }
            addSeqInfo(PART_TYPE_INDEX, a[i]);
        }
    }

    currentMatch.length &&
        addSeqInfo(PART_TYPE_TEXT, currentMatch);

    return seqInfo;
}

export default sqDiff;