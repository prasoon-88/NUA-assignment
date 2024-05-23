import { TableField, TableProps } from "../types";

const handleArrayPrinting = (value: string[]) => {
  if (!value.length) {
    return "";
  }
  const resultString = value.join(",");
  return resultString.length > 50
    ? resultString.slice(0, 50) + "..."
    : resultString;
};

const Table = ({ head, body, classNames = "" }: TableProps) => {
  return (
    <div id="table" className={classNames}>
      <table>
        <thead>
          <tr>
            {head.map((field: TableField, index) => (
              <th key={index}>{field.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row: any, index: number) => (
            <tr key={index}>
              {head.map((col: TableField) => (
                <td key={row} title={row[col.value]}>
                  {typeof row[col.value] == "object"
                    ? handleArrayPrinting(row[col.value])
                    : row[col.value]
                    ? String(row[col.value])?.slice(0, 30)
                    : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
