type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type documentType = {
  _id?: string;
  _v?: number;
  title: string;
  owner: string;
  access: string[];
  color: string;
  pinned: boolean;
  descImg: string | null;
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type docType = {
  title: string;
  emailID: string;
  color: string;
  pinned: boolean;
  descImg: string | null;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type PaginationProps = {
  data: documentType[];
  itemsPerPage: number;
};
