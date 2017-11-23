import { 
  PART_TYPE_TEXT, 
  PART_TYPE_INDEX 
}  from './constants';
import searchBack from './searchBack';

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


// guess 1 - increment index
const nextGuessFinderA = (seqParts, indexToFind) =>
  seqParts.reduce((result, seqPart, index, seqParts) =>
    result += seqPart.type === PART_TYPE_INDEX ?
      parseInt(seqPart.value, 10) + indexToFind : seqPart.value
    , '');


// guess 2 - try move indexer left
const nextGuessFinderB = (seqParts, indexToFind) => {
  let result = '';
  const lookLeftOffset = -1;
  const updatedSeqParts = [...seqParts];

  seqParts.forEach((seqPart, index, seqParts) => {
    if (seqPart.type === PART_TYPE_INDEX) {
      let charLeft = parseInt(result.slice(lookLeftOffset), 10);
      let isCharLeftInt = !isNaN(charLeft);
      if (isCharLeftInt) {
        let baseIndexerNewVal = `${charLeft}${seqPart.value}`;
        result = result.slice(0, lookLeftOffset);
        result += parseInt(baseIndexerNewVal, 10) + indexToFind;

        // update seq parts
        let lastTextIndex = searchBack(
          updatedSeqParts,
          item => item.type === PART_TYPE_TEXT,
          index
        );
        updatedSeqParts[index].value = baseIndexerNewVal;
        updatedSeqParts[lastTextIndex].value =
          updatedSeqParts[lastTextIndex].value.slice(0, lookLeftOffset);
      }
    } else {
      result += seqPart.value;
    }
  });

  return { result, updatedSeqParts }
}


const testForSeq = (seq, seqInfo) => {
  let i;
  let currentSq;
  for (i = 1; i < seq.length; i++) {
    let isSeq = true;
    let nextGuess;
    currentSq = seq[i];
    nextGuess = nextGuessFinderA(seqInfo, i);
    nextGuess != currentSq && (isSeq = false);

    if (!isSeq) {
      // Fix me remove this brutforce and read from parts max try
      for(let j = -1; j > -currentSq.length; j--) {
        let { result, updatedSeqParts } = nextGuessFinderB(seqInfo, i);
        if (result === currentSq) {
          isSeq = true;
          seqInfo = updatedSeqParts;
          break;
        }
      }
    }

    if (!isSeq) {
      break;
    }
  }
  return --i;
}


const lpat = seq => {
  let results = [];
  let sqInfo = sqDiff(seq[0], seq[1]);
  let i = testForSeq(seq, sqInfo);
  let result = sqInfo.map(ele => {
    if (ele.type === PART_TYPE_INDEX) {
      return `[${ele.value}..${parseInt(ele.value) + i}]`;
    } else {
      return ele.value;
    }
  }).join('');

  if( i+1 === seq.length) {
    return result;
  } else {
    results.push(lpat(seq.slice(i+1)));
  }

  results.push(result);
  return results.reverse().join(' ');
}


export default lpat;