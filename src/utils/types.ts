export type docType = {
  color: string;
  subtitle: string;
  email: string;
  note: string;
  image: null;
  pinned: any;
  author: string;
  author_email: string;
  bgImage: string;
  content: string;
  createdAt: string;
  desc: string;
  introImage: string;
  title: string;
  updatedAt: string;
  user_id: string;
  _v: number;
  _id: string;
};

export type PaginationProps = {
  data: docType[];
  itemsPerPage: number;
};
