import { ResourceState } from './Feedback';

export default function MonthlyActivity({ resource, title, columns, formatters }) {
  return (
    <ResourceState {...resource}>
      <section className="card">
        <h2 className="section-title">{title}</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="data-table">
            <thead><tr><th scope="col">Month</th>{columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
            <tbody>
              {resource.data?.map(({ month, ...row }) => (
                <tr key={month}>
                  <th className="!text-sm !normal-case !tracking-normal" scope="row">{new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'long', year: 'numeric' }).format(new Date(month))}</th>
                  {formatters.map(([key, format]) => <td className="tabular-nums" key={key}>{format(row[key])}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ResourceState>
  );
}
