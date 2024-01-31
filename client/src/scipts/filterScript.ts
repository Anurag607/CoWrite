import { setDocData } from "../redux/reducers/docSlice";

const filterData = async (
  data: any,
  searchParam: string,
  category: any,
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
  let parsedDocs: any[] = [];

  if (searchParam.length > 0) {
    data.forEach((Doc: any) => {
      const title = Doc.title.toLowerCase();
      const email = Doc.owner.toLowerCase();
      if (
        title.match(searchTermRegex) &&
        title.includes(searchParam) &&
        !parsedDocs.includes(Doc._id)
      ) {
        filteredResults.push(Doc);
        parsedDocs.push(Doc._id);
      }
      if (
        email.match(searchTermRegex) &&
        email.includes(searchParam) &&
        !parsedDocs.includes(Doc._id)
      ) {
        filteredResults.push(Doc);
        parsedDocs.push(Doc._id);
      }
    });
  }

  if (category.length > 0) {
    data.forEach((Doc: any) => {
      if (Doc.color === category && !parsedDocs.includes(Doc._id)) {
        filteredResults.push(Doc);
        parsedDocs.push(Doc._id);
      }
    });
  }

  reduxDispatch(setDocData(filteredResults));

  return filteredResults;
};

export { filterData };
