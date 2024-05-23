export interface TableField {
  label: string;
  value: string;
}

export interface TableProps {
  head: TableField[];
  body: any[];
  classNames?: string;
}
