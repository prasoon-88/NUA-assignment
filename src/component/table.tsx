import { TableField, TableProps } from "../types";

interface PillProps {
  text: string;
}
const Pill = ({ text }: PillProps) => {
  return `<span class="badge badge-pill badge-light text-dark ml-1">${text}</span>`;
};

const handleArrayPrinting = (value: string[]) => {
  if (!value.length) {
    return "";
  }
  let result = "";
  let len = 0;
  for (let i = 0; i < value.length; i++) {
    if (len > 40) {
      break;
    }
    result += Pill({ text: value[i] });
    len += value[i].length;
  }
  return result;
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
                  {typeof row[col.value] == "object" ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: handleArrayPrinting(row[col.value]),
                      }}
                    ></span>
                  ) : row[col.value] ? (
                    String(row[col.value])?.slice(0, 30)
                  ) : (
                    ""
                  )}
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
