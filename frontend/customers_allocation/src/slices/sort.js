function SortAsc(key) {
  return function (a, b) {
    if (a[key] > b[key]) {
      return 1;
    } else if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  };
}

function SortDesc(key) {
  return function (a, b) {
    if (b[key] > a[key]) {
      return 1;
    } else if (b[key] < a[key]) {
      return -1;
    }
    return 0;
  };
}

export { SortAsc, SortDesc };
