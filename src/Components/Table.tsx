import React from 'react';

interface TableColumn {
  id: string;
  title: string;
  style: any;
}

const Columns: TableColumn[] = [
  { id: 'prop', title: 'Prop', style: 'h4' },
  { id: 'type', title: 'Type', style: 'h4' },
  { id: 'default', title: 'Default', style: 'h4' },
];

const Table: React.FC<any> = ({ componentProps = [] }) => {
  return (
    <table className="table">
      <thead>
        <tr>{Columns.map(({ id, title }) => <th key={id}>{title}</th>)}</tr>
      </thead>
      <tbody>
        {componentProps?.map((item: any, i: any) => (
          <tr key={i}>
            <td><h6>{item[0]}{item[3] && '*'}</h6></td>
            <td><h6>{item[1]}</h6></td>
            <td><h6>{item[2]}</h6></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table;
