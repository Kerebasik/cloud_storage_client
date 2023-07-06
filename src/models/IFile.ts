export interface IFile {
  _id: string;
  name: string;
  type: string;
  path: string;
  date: string;
  size: number;
  user: string;
  parent?: string;
  children: Array<string>;
}
