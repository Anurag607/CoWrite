import { setNoteData } from "../redux/reducers/noteSlice";

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
    }
  );
  let searchTermRegex = new RegExp(tokens.join("|"), "gim");
  let filteredResults: any[] = [];
  let NoteString = "";

  if (tokens.length === 0) {
    reduxDispatch(setNoteData(data));
    return data;
  }
  data.forEach((Note: any) => {
    NoteString += Note.title.toLowerCase();
    if (NoteString.match(searchTermRegex) && NoteString.includes(searchParam)) {
      filteredResults.push(Note);
      NoteString = "";
    }
  });
  data.forEach((Note: any) => {
    NoteString += Note.email.toLowerCase();
    if (NoteString.match(searchTermRegex) && NoteString.includes(searchParam)) {
      filteredResults.push(Note);
      NoteString = "";
    }
  });
  reduxDispatch(setNoteData(filteredResults));

  return filteredResults;
};

const filterDatabyCategory = async (
  data: any,
  category: string,
  reduxDispatch: React.Dispatch<any>
) => {
  let filteredResults: any[] = [];
  data.forEach((Note: any) => {
    if (Note.color === category) {
      filteredResults.push(Note);
    }
  });

  reduxDispatch(setNoteData(filteredResults));
  return filteredResults;
};

export {
  filterDatabySearchParams,
  filterDatabyCategory,
};
