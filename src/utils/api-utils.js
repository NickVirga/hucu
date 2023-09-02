export const urlAllTickets = () => {
  return `${process.env.REACT_APP_BASE_URL}/api/tickets`;
};

export const urlAllTicketsByOrgIdAgentId = (orgId, agentId) => {
  return `${process.env.REACT_APP_BASE_URL}/api/tickets?o=${orgId}&a=${agentId}`;
};

export const urlTicketById = (ticketId) => {
  return `${process.env.REACT_APP_BASE_URL}/api/tickets/${ticketId}`;
};

export const urlAllAgentsByOrgId = (orgId) => {
  return `${process.env.REACT_APP_BASE_URL}/api/agents?o=${orgId}`;
};

export const urlSignup = () => {
  return `${process.env.REACT_APP_BASE_URL}/api/auth/signup`;
};

export const urlLogin = () => {
  return `${process.env.REACT_APP_BASE_URL}/api/auth/login`;
};

export const urlUsers = () => {
  return `${process.env.REACT_APP_BASE_URL}/api/users`;
};