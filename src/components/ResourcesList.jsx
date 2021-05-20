import React from "react";
import { useTable, useSortBy } from "react-table";
import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";
import "./ResourcesList.sass";
import { useHistory } from "react-router-dom";

import PopoverStickOnHover from "./PopoverStickOnHover";

const ResourcesList = ({ archiveItems }) => {
  const data = React.useMemo(
    () =>
      archiveItems.map((i) => {
        return {
          ...i.fields,
          id: i.id,
        };
      }),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Pandemics",
        accessor: "Pandemic_name",
        sortType: "basic",
      },
      {
        Header: "Title",
        accessor: "Title ID",
        sortType: "basic",
      },
      {
        Header: "Type",
        accessor: "Type_name",
        sortType: "basic",
      },
      {
        Header: "Themes",
        accessor: "Themes_name",
        sortType: "basic",
      },
      {
        Header: "Tags",
        accessor: "Tags_name",
        sortType: "basic",
      },
      {
        Header: "Languages",
        accessor: "Language_name",
        sortType: "basic",
      },
      {
        Header: "Contributor",
        accessor: "Contributor",
        sortType: "basic",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  let history = useHistory();
  const handleClick = (row) => {
    history.push("/explore/resource/" + row.original.id);
  };

  return (
    // apply the table props
    <table
      {...getTableProps()}
      className="resource-table w-100 h-100 d-block overflow-scroll border-top border-dark flex-grow-1 flex-shrink-1"
    >
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className="d-flex align-items-center">
                      <span>
                        {
                          // Render the header
                          column.render("Header")
                        }
                      </span>
                      {column.isSorted && (
                        <span>
                          <img
                            src={column.isSortedDesc ? arrowUp : arrowDown}
                            alt="arrow sort"
                            className={column.isSortedDesc ? "reverse" : ""}
                          />
                        </span>
                      )}
                    </div>
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <PopoverStickOnHover
                component={
                  row.original.Attachments ? (
                    <img
                      src={row.original.Attachments[0].url}
                      style={{ width: "30vw" }}
                      alt={row.original["Title ID"]}
                    />
                  ) : (
                    <div></div>
                  )
                }
                placement="bottom"
                onMouseEnter={() => {}}
                delay={200}
              >
                <tr {...row.getRowProps()} onClick={() => handleClick(row)}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            Array.isArray(cell.value)
                              ? cell.value.join(", ")
                              : cell.render("Cell")
                            //cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              </PopoverStickOnHover>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default ResourcesList;
