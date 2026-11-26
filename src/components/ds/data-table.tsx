import { Label } from "./label";

export interface DataTableProps {
  /** Describes the table for assistive tech. */
  caption: string;
  columns: readonly string[];
  /** Each row has one cell per column. The first cell is the row's name. */
  rows: readonly (readonly string[])[];
}

/** A ruled reference table (props, specs). Not for layout. */
export function DataTable({ caption, columns, rows }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-xs">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line bg-fill">
            {columns.map((column) => (
              <th key={column} scope="col" className="px-4 py-2 font-normal">
                <Label>{column}</Label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className="border-b border-line last:border-b-0">
              {row.map((cell, index) => (
                <td
                  key={columns[index]}
                  className={index === 0 ? "px-4 py-3 text-foreground" : "px-4 py-3 text-muted-foreground"}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
