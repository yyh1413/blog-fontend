export interface TableColumnProps {
  key: string;
  title: string;
  align?: string;
  sorter?: ((a: any, b: any) => number) | boolean | string;
  render?: (
    rowData?: any,
    rowIndex?: number,
    row?: any
  ) => string | React.ReactNode;
}
