import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { urlTicketById } from "../../utils/api-utils";

import "./TicketStatusPage.scss";

function TicketStatusPage( { isLoggedIn }) {
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState({});
  const [showQueue, setShowQueue] = useState(false);
  const [initialTicketsAhead, setInitialTicketsAhead] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  let hasInitialTicketsAhead = false;

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    if (ticket.agent_id) {
      setShowQueue(true);
    }
  }, [ticket.agent_id]);

  const fetchTicketData = () => {
    axios
      .get(urlTicketById(ticketId), {
        headers: {
          Authorization: `Bearer ${sessionStorage.authToken}`,
        },
      })
      .then((response) => {
        setTicket(response.data);
        console.log(response.data)
        setIsAuthorized(true);
        setIsLoading(false);
        console.log("fetch,hasInitialTicketsAhead: ", hasInitialTicketsAhead)
        console.log("fetch,agent_id: ", ticket.agent_id)
        if (!hasInitialTicketsAhead && response.data.agent_id) {
          hasInitialTicketsAhead = true;
        setInitialTicketsAhead(response.data.ticket_count)
      }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTicketData();

    const intervalId = setInterval(fetchTicketData, 5000);

    return () => clearInterval(intervalId);
  }, [ticketId]);

  useEffect(() => {
    console.log("initialTicketsAhead: ", initialTicketsAhead)
    console.log("ticket.ticket_count: ", ticket.ticket_count)
    console.log("hasInitialTicketsAhead ", hasInitialTicketsAhead)
    console.log("showQueue ", showQueue)
    if (showQueue) {
    setProgressPercentage(10 + (initialTicketsAhead-ticket.ticket_count)/initialTicketsAhead * 90)
    }
  }, [ticket.ticket_count, showQueue]);

  const spanStyle = {
    width: `${progressPercentage}%`
  };

  if (isLoading) {
    return <p className="ticket-status__loading">"Loading..."</p>;
  }

  if (!isAuthorized) {
    return (
      <p className="ticket-status__authorize">
        The server could not verify that you are authorized to access this page.
      </p>
    );
  }

  return (
    <div className="ticket-status__container">
      <div className="ticket-status__info">
        <h1 className="ticket-status__ticket-id">Ticket #{ticket.id}</h1>
        <h2 className="ticket-status__ticket-status">
          Your ticket is {ticket.status}.
        </h2>
        <p className="ticket-status__msg">
          {showQueue
            ? "You are in queue..."
            : "Assigning an agent to your ticket..."}
        </p>
        {showQueue && (
          <div className="ticket-status__progress">
            <span style={spanStyle}></span>
          </div>
        )}
        {showQueue && (
          <>
            <p className="ticket-status__queue">
              {ticket.ticket_count} people ahead of you
            </p>
            <p className="ticket-status__queue">
              (estimated {ticket.ticket_count * 5} minute wait)
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default TicketStatusPage;
