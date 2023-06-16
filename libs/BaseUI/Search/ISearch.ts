export interface ISearch {
  value?: string;
  placeholder?: string;
  changeCallback?: (value: string) => void;
  expandable?: boolean;
}
