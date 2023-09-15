export const urlAllTickets = () => {
  return `${process.env.REACT_APP_BASE_URL}/api/tickets`;
};

export const urlTicketById = (ticketId) => {
  return `${process.env.REACT_APP_BASE_URL}/api/tickets/${ticketId}`;
};

export const urlAllAgents = () => {
  return `${process.env.REACT_APP_BASE_URL}/api/agents`;
};

export const urlAllOrganizations = () => {
  return `${process.env.REACT_APP_BASE_URL}/api/organizations`
}

export const urlInquiryOptionsByOrgId = (orgId) => {
   return `${process.env.REACT_APP_BASE_URL}/api/inquiry-options/${orgId}`
}

export const urlSignup = () => {
  return `${process.env.REACT_APP_BASE_URL}/api/auth/signup`;
};

export const urlLogin = () => {
  return `${process.env.REACT_APP_BASE_URL}/api/auth/login`;
};

export const urlUsers = () => {
  return `${process.env.REACT_APP_BASE_URL}/api/users`;
};

