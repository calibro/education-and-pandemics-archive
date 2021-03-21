import React from 'react';
import { useTable } from 'react-table'

const ResourcesList = ({archiveItems}) => {
  const data = React.useMemo(
    () => archiveItems.map(i => i.fields),
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Pandemics',
        accessor: 'Pandemic',
      },
      {
        Header: 'Title',
        accessor: 'Title ID',
      },
      {
        Header: 'Type',
        accessor: 'Type',
      },
      {
        Header: 'Themes',
        accessor: 'Themes',
      },
      {
        Header: 'Tags',
        accessor: 'Tags',
      },
      {
        Header: 'Languages',
        accessor: 'Language',
      },
      {
        Header: 'Contributor',
        accessor: 'Contributor',
      },
    ],
    []
  )

  const tableInstance = useTable({ columns, data })
 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance
  
  return (
    // apply the table props
    <table {...getTableProps()}>
      <thead>
        {// Loop over the header rows
        headerGroups.map(headerGroup => (
          // Apply the header row props
          <tr {...headerGroup.getHeaderGroupProps()}>
            {// Loop over the headers in each row
            headerGroup.headers.map(column => (
              // Apply the header cell props
              <th {...column.getHeaderProps()}>
                {// Render the header
                column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {// Loop over the table rows
        rows.map(row => {
          // Prepare the row for display
          prepareRow(row)
          return (
            // Apply the row props
            <tr {...row.getRowProps()}>
              {// Loop over the rows cells
              row.cells.map(cell => {
                // Apply the cell props
                return (
                  <td {...cell.getCellProps()}>
                    {// Render the cell contents
                    cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ResourcesList
