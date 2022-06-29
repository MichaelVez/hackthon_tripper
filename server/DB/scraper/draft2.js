const aTag = '<a href="/holidays/angola/new-year">New Year</a>';

function splitLinkTag(aTag) {
  const web = "https://www.timeanddate.com";
  const cut1 = aTag.indexOf(">");
  const str2 = web + aTag.slice(9, cut1 - 1);
  const cut2 = aTag.lastIndexOf("<");
  const str3 = aTag.slice(cut1 + 1, cut2);
  return [str3, str2];
}

const res = splitLinkTag(aTag);
console.log(res);
