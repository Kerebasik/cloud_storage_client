export interface IFile {
  _id: string;
  name: string;
  type: string;
  path: string;
  date: Date;
  size: number;
  user: string;
  parent?: string;
  children: Array<string>;
}
