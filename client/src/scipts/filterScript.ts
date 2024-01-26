import { setDocData } from "../redux/reducers/docSlice";

const filterDatabySearchParams = async (
  data: any,
  searchParam: string,
  reduxDispatch: React.Dispatch<any>
) => {
  let tokens = searchParam
    .toLowerCase()
    .split(" ")
    .filter(function (token: string) {
      return token.trim() !== "";
    });
  let searchTermRegex = new RegExp(tokens.join("|"), "gim");
  let filteredResults: any[] = [];
  let DocString = "";

  if (tokens.length === 0) {
    reduxDispatch(setDocData(data));
    return data;
  }
  data.forEach((Doc: any) => {
    DocString += Doc.title.toLowerCase();
    if (DocString.match(searchTermRegex) && DocString.includes(searchParam)) {
      filteredResults.push(Doc);
      DocString = "";
    }
  });
  data.forEach((Doc: any) => {
    DocString += Doc.owner.toLowerCase();
    if (DocString.match(searchTermRegex) && DocString.includes(searchParam)) {
      filteredResults.push(Doc);
      DocString = "";
    }
  });
  reduxDispatch(setDocData(filteredResults));

  return filteredResults;
};

const filterDatabyCategory = async (
  data: any,
  category: string,
  reduxDispatch: React.Dispatch<any>
) => {
  let filteredResults: any[] = [];
  data.forEach((Doc: any) => {
    if (Doc.color === category) {
      filteredResults.push(Doc);
    }
  });

  reduxDispatch(setDocData(filteredResults));
  return filteredResults;
};

export { filterDatabySearchParams, filterDatabyCategory };
