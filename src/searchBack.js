const searchBack = (arr, test, fromIndex) => {
    fromIndex++;
    while (fromIndex--) {
        if (test(arr[fromIndex])) {
        break;
        }
    }
    return fromIndex;
}

export default searchBack;