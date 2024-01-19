export type docType = {
  id: string;
  title: string;
  subtitle: string;
  email: string;
  note: string;
  type: string;
  image: string;
  pinned: boolean;
  color: string;
  createdAt: string;
};

export type PaginationProps = {
  data: docType[];
  itemsPerPage: number;
};
