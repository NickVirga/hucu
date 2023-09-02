import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { urlTicketById } from "../../utils/api-utils";

import "./TicketStatusPage.scss";

function TicketStatusPage() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    axios
      .get(urlTicketById(ticketId), {
        headers: {
          Authorization: `Bearer ${sessionStorage.authToken}`,
        },
      })
      .then((response) => {
        setTicket(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Ticket #{ticket.id}</h1>
      <h2>Your ticket is {ticket.status}.</h2>
      <p>You are in queue</p>
      <p>{ticket.queue_number} people ahead of you</p>
    </div>
  );
}

export default TicketStatusPage;
