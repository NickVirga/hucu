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
  const agentId = "1";
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
          {
            Header: "E-mail",
            accessor: "client_email",
            headerClassName: "table__header-email",
          },
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
        // if (response.data.length > 0) {
          setAgents(response.data);
        // }
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
    console.log(ticket);
    axios
      .put(urlTicketById(ticket.id), ticket)
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
    return <p>"Loading..."</p>;
  }

  if (!isAuthorized) {
    return (
      <p>
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
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
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
            return (
              <tr {...row.getRowProps()} onClick={() => onRowClick(row)}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        className={`organization__ticket-details-container${
          showModal ? "--visible" : ""
        }`}
        onClick={outsideModalClickHandler}
      >
        <div
          className="organization__ticket-details-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <CloseIcon
            className="organization__modal-close-btn"
            onClick={outsideModalClickHandler}
          />
          <div className="organization__ticket-num-detail">
            <span>Ticket #: </span>
            <span>{ticket.id}</span>
          </div>
          <div className="organization__ticket-status-detail">
            <span>Status: </span>
            <select value={ticket.status} onChange={handleStatusChange}>
              <option>Open</option>
              <option>In Progress</option>
              <option>Waiting for Customer Response</option>
              <option>On Hold</option>
              <option>Closed</option>
              <option>Reopened</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div className="organization__queue-num-detail">
            <span>Queue: </span>
            <span>{ticket.queue_number}</span>
          </div>
          <div className="organization__inquiry-option-detail">
            <span>Inquiry: </span>
            <span>{ticket.inquiry_option}</span>
          </div>
          <div className="organization__client-info-detail">
            <span>Client Information</span>
            <div className="organization__client-first-detail">
              <span>Name: </span>
              <span>
                {ticket.client_last_name}, {ticket.client_first_name}
              </span>
            </div>
            <div className="organization__client-phone-detail">
              <span>Phone Number: </span>
              <span>{ticket.client_phone_number}</span>
            </div>
            <div className="organization__client-email-detail">
              <span>E-mail: </span>
              <span>{ticket.client_email}</span>
            </div>
            <div className="organization__client-notes-detail">
              <span>Notes: </span>
              <span>{ticket.client_notes}</span>
            </div>
          </div>
          <div className="organization__queue-num-detail">
            <label>Agent Notes: </label>
            <textarea
              value={ticket.agent_notes}
              onChange={handleAgentNotesChange}
            ></textarea>
          </div>
          <div className="organization__created-at-detail">
            <span>Created At: </span>
            <span>{ticket.created_at}</span>
          </div>
          <div className="organization__scheduled-at-detail">
            <span>Scheduled At: </span>
            <span>{ticket.scheduled_at}</span>
          </div>
          <div className="organization__closed-at-detail">
            <span>Closed At: </span>
            <span>{ticket.closed_at}</span>
          </div>
          {userInfo.role === "dispatcher" && <div className="organization__agent-list">
            <span>Assigned Agent: </span>
            <select value={ticket.agent_id} onChange={handleAgentChange}>
              {agents.map((agent) => {
                return <option key={agent.id}>{agent.id}</option>;
              })}
            </select>
          </div>}
          <button
            className="organization__modal-save-btn"
            type="submit"
            onClick={submitHandler}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrganizationPage;
