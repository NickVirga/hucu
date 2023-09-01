import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import InquiryPage from "./pages/InquiryPage/InquiryPage"
import TicketStatusPage from "./pages/TicketStatusPage/TicketStatusPage"
import OrganizationPage from "./pages/OrganizationPage/OrganizationPage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<InquiryPage />} />
        {/* <Route path="/inquiries" element={<InquiryPage />} />
        <Route path="/inquiries/:inquiryId" element={<InquiryPage />} /> */}
        <Route path="/tickets/:ticketId" element={<TicketStatusPage />} />
        <Route path="/organization" element={<OrganizationPage />} />
        <Route path="/organization/:organizationId" element={<OrganizationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
