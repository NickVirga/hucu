import "./OrganizationPage.scss";
import React from "react";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  urlAllTickets,
  urlAllAgents,
  urlTicketById,
} from "../../utils/api-utils";
import { useState, useEffect } from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-circle-svgrepo-com.svg";

function OrganizationPage({ userInfo, isLoggedIn }) {
  const navigate = useNavigate();
  const { organizationId } = useParams();
  const [data, setData] = useState([]);
  const [ticket, setTicket] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Ticket #",
        accessor: "id",
        headerClassName: "table__header-ticket-num",
      },
      {
        Header: "Inquiry",
        accessor: "inquiry_option",
        headerClassName: "table__header-inquiry-option",
      },
      {
        Header: "Client Information",
        headerClassName: "table__header-client-info",
        columns: [
          {
            Header: "First Name",
            accessor: "client_first_name",
            headerClassName: "table__header-client-first",
          },
          {
            Header: "Last Name",
            accessor: "client_last_name",
            headerClassName: "table__header-client-last",
          },
          {
            Header: "Phone Number",
            accessor: "client_phone_number",
            headerClassName: "table__header-phone-number",
          },
          // {
          //   Header: "E-mail",
          //   accessor: "client_email",
          //   headerClassName: "table__header-email",
          // },
        ],
      },
      {
        Header: "Status",
        accessor: "status",
        headerClassName: "table__header-status",
      },
      {
        Header: "Scheduled Time",
        accessor: "scheduled_at",
        headerClassName: "table__header-scheduled",
      },
      {
        Header: "Queue #",
        accessor: "queue_number",
        headerClassName: "table__header-queue-number",
      },
    ],
    []
  );

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    axios
      .get(urlAllTickets(), {
        headers: {
          Authorization: `Bearer ${sessionStorage.authToken}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setIsAuthorized(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });

    if (userInfo.role === "dispatcher") {
      axios
        .get(urlAllAgents(), {
          headers: {
            Authorization: `Bearer ${sessionStorage.authToken}`,
          },
        })
        .then((response) => {
          setAgents(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  const onRowClick = (row) => {
    axios
      .get(urlTicketById(row.original.id), {
        headers: {
          Authorization: `Bearer ${sessionStorage.authToken}`,
        },
      })
      .then((response) => {
        setTicket(response.data);
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const outsideModalClickHandler = (e) => {
    setShowModal(false);
  };

  const submitHandler = (event) => {
    const reqBody = (({
      agent_id,
      agent_notes,
      client_email,
      client_first_name,
      client_last_name,
      client_notes,
      client_phone_number,
      id,
      inquiry_option,
      scheduled_at,
      status,
    }) => ({
      agent_id,
      agent_notes,
      client_email,
      client_first_name,
      client_last_name,
      client_notes,
      client_phone_number,
      id,
      inquiry_option,
      scheduled_at,
      status,
    }))(ticket);
    axios
      .put(urlTicketById(ticket.id), reqBody, {
        headers: {
          Authorization: `Bearer ${sessionStorage.authToken}`,
        },
      })
      .then((response) => {
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStatusChange = (event) => {
    setTicket({ ...ticket, ["status"]: event.target.value });
  };

  const handleAgentNotesChange = (event) => {
    setTicket({ ...ticket, ["agent_notes"]: event.target.value });
  };

  const handleAgentChange = (event) => {
    // setTicket({ ...ticket, ["agent_id"]: event.target.value });
  };

  if (isLoading) {
    return <p className="organization__loading">"Loading..."</p>;
  }

  if (!isAuthorized) {
    return (
      <p className="organization__authorize">
        The server could not verify that you are authorized to access this page.
      </p>
    );
  }

  return (
    <div className="organization__container">
      <table
        {...getTableProps({
          className: "organization__table",
        })}
      >
        <thead className="organization__table-header">
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps({
                className: "organization__table-header-row",
              })}
            >
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps(), {
                    className: column.headerClassName,
                  })}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            const isEven = i % 2 === 0;

            return (
              <tr
                {...row.getRowProps({
                  className: `organization__table-row${
                    isEven ? "--highlight" : ""
                  }`,
                })}
                onClick={() => onRowClick(row)}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps({
                        className: "organization__table-cell",
                      })}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && (
        <div
          className="organization__ticket-details-container"
          onClick={outsideModalClickHandler}
        >
          <div
            className="organization__ticket-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="organization__ticket-details-header">
              <h2 className="organization__ticket-details-title">
                Ticket Details
              </h2>
              <CloseIcon
                className="organization__modal-close-btn"
                onClick={outsideModalClickHandler}
              />
            </div>
            <form className="organization__ticket-details-form">
              <div className="organization__ticket-details-fields">
                <div className="organization__modal-left-container">
                  {/* <div className="organization__client-info-container"> */}
                    <h3 className="organization__field-label">
                      Client Information
                    </h3>
                    <div className="organization__form-field">
                      <label className="organization__field-label">
                        First Name:{" "}
                      </label>
                      <input
                        className="organization__field-input--disabled"
                        value={ticket.client_first_name}
                        disabled
                      ></input>
                    </div>
                    <div className="organization__form-field">
                      <label className="organization__field-label">
                        Phone Number:{" "}
                      </label>
                      <input
                        className="organization__field-input--disabled"
                        value={ticket.client_phone_number}
                        disabled
                      ></input>
                    </div>
                    <div className="organization__form-field">
                      <label className="organization__field-label">
                        E-mail:{" "}
                      </label>
                      <input
                        className="organization__field-input--disabled"
                        value={ticket.client_email}
                        disabled
                      ></input>
                    </div>
                    <div className="organization__form-field">
                      <label className="organization__field-label">
                        Notes:{" "}
                      </label>
                      <textarea
                        className="organization__form-textarea--disabled"
                        value={ticket.client_notes}
                        disabled
                      ></textarea>
                    </div>
                  {/* </div> */}
                </div>
                <div className="organization__modal-right-container">
                <h3 className="organization__field-label">
                      Ticket #{ticket.id}
                    </h3>
                  <div className="organization__status-queue-container">
                    <div className="organization__form-field-status">
                    <label className="organization__field-label">
                      Status:{" "}
                    </label>
                    <select className="organization__form-select" value={ticket.status} onChange={handleStatusChange}>
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Waiting for Customer Response</option>
                      <option>On Hold</option>
                      <option>Closed</option>
                      <option>Reopened</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                    <div className="organization__form-field-queue">
                      <label className="organization__field-label">
                        Queue #:{" "}
                      </label>
                      <input
                        className="organization__field-input--disabled"
                        value={ticket.queue_number}
                        disabled
                      ></input>
                    </div>
                  </div>
                  

                  <div className="organization__form-field">
                    <label className="organization__field-label">
                      Inquiry:{" "}
                    </label>
                    <input
                      className="organization__field-input--disabled"
                      value={ticket.inquiry_option}
                      disabled
                    ></input>
                  </div>
                  {userInfo.role === "dispatcher" && (
                    <div className="organization__form-field">
                      <label className="organization__field-label">
                        Assigned Agent:{" "}
                      </label>
                      <select
                        className="organization__form-select"
                        value={`${ticket.last_name}, ${ticket.first_name}`}
                        onChange={handleAgentChange}
                      >
                        {agents.map((agent) => {
                          return (
                            <option key={agent.agent_id}>
                              {agent.last_name}, {agent.first_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                  <div className="organization__form-field">
                    <label className="organization__field-label">
                      Created At:{" "}
                    </label>
                    <input
                      className="organization__field-input--disabled"
                      value={ticket.created_at}
                      disabled
                    ></input>
                  </div>
                  <div className="organization__form-field">
                    <label className="organization__field-label">
                      Scheduled At:{" "}
                    </label>
                    <input
                      className="organization__field-input--disabled"
                      value={ticket.scheduled_at}
                      disabled
                    ></input>
                  </div>
                  <div className="organization__form-field">
                    <label className="organization__field-label">
                      Closed At:{" "}
                    </label>
                    <input
                      className="organization__field-input--disabled"
                      value={ticket.closed_at}
                      disabled
                    ></input>
                  </div>
                </div>
              </div>
              <div className="organization__form-field">
                    <label className="organization__field-label">
                      Agent Notes:{" "}
                    </label>
                    <textarea
                      className="organization__form-textarea"
                      value={ticket.agent_notes}
                      onChange={handleAgentNotesChange}
                    ></textarea>
                  </div>
              <button
                className="organization__modal-save-btn"
                type="submit"
                onClick={submitHandler}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrganizationPage;
