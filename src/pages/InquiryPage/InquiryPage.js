import "./InquiryPage.scss";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { urlAllTickets } from "../../utils/api-utils";
import { useNavigate } from "react-router-dom";

function InquiryPage({ userInfo }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({
      ...formData,
      client_first_name: userInfo.first_name,
      client_last_name: userInfo.last_name,
      client_email: userInfo.email,
      client_phone_number: userInfo.phone_number,
    });
  }, [userInfo]);

  const treeData = [
    {
      key: "1",
      title: "Balances",
      children: [
        {
          key: "1-1",
          title: "Chequing",
        },
        {
          key: "1-2",
          title: "Savings",
        },
      ],
    },
    {
      key: "2",
      title: "Transfers",
      children: [
        {
          key: "2-1",
          title: "Wire Transfer",
          children: [
            {
              key: "2-1-1",
              title: "International",
            },
            {
              key: "2-1-2",
              title: "Domestic",
            },
          ],
        },
        {
          key: "2-2",
          title: "Bank Transfer",
        },
      ],
    },
    {
      key: "3",
      title: "Bill Payments",
    },
    {
      key: "4",
      title: "Mortgages",
    },
    {
      key: "5",
      title: "Mutual Fund",
    },
    {
      key: "6",
      title: "Credit Card",
      children: [
        {
          key: "6-1",
          title: "Change Limit",
        },
        {
          key: "6-2",
          title: "Suspicious Activity",
        },
        {
          key: "6-3",
          title: "Report Card Lost or Stolen",
        },
        {
          key: "6-4",
          title: "Suspicious Activity",
        },
      ],
    },
    {
      key: "7",
      title: "Loan",
    },
    {
      key: "8",
      title: "Line of Credit",
      children: [
        {
          key: "8-1",
          title: "Interest rates",
        },
        {
          key: "8-2",
          title: "Suspicious Activity",
        },
      ],
    },
    {
      key: "9",
      title: "Investments",
    },
    {
      key: "10",
      title: "Online Banking Technical Support",
      children: [
        {
          key: "10-1",
          title: "Password Reset",
        },
        {
          key: "10-2",
          title: "Account Lockouts",
        },
        {
          key: "10-3",
          title: "Website Inaccesible",
        },
      ],
    },
    {
      key: "11",
      title: "Complaints and Feedback",
      children: [
        {
          key: "11-1",
          title: "Service Quality",
        },
        {
          key: "11-2",
          title: "Dispute About Fees",
        },
        {
          key: "11-3",
          title: "Issues With Bank Representatives",
        },
      ],
    },
  ];

  const selectHandler = (selectedKeys, { node }) => {
    console.log(node);
    setFormData({ ...formData, inquiry_option: node.title });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const reqBody = (({
      inquiry_option,
      client_first_name,
      client_last_name,
      client_phone_number,
      client_email,
      client_notes,
      scheduled_at
    }) => ({
      inquiry_option,
      client_first_name,
      client_last_name,
      client_phone_number,
      client_email,
      client_notes,
      scheduled_at,
    }))(formData);

    reqBody.status="Open"

    axios
      .post(urlAllTickets(), reqBody)
      .then((response) => {
        navigate(`/tickets/${response.data[0].id}`)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneNumChange = (event) => {
    setFormData({ ...formData, client_phone_number: event });
  };

  return (
    <div className="inquiries__container">
      <Tree
        showLine
        selectable
        treeData={treeData}
        onSelect={selectHandler}
        showIcon={false}
      />
      <form onSubmit={handleFormSubmit}>
        <div className="inquiries__form-field">
          <label className="inquiries__form-label" htmlFor="inquiryOption">
            Inquiry Option
          </label>
          <input
            type="text"
            id="inquiryOption"
            name="inquiry_option"
            placeholder="Select an option..."
            value={formData.inquiry_option}
            className="inquiries__form-option-input"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="inquiries__form-field">
          <label className="inquiries__form-label" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="client_first_name"
            value={formData.client_first_name}
            className="inquiries__form-first-name-input"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="inquiries__form-field">
          <label className="inquiries__form-label" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="client_last_name"
            value={formData.client_last_name}
            className="inquiries__form-last-name-input"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="inquiries__form-field">
          <label className="inquiries__form-label" htmlFor="email">
            E-mail
          </label>
          <input
            type="text"
            id="email"
            name="client_email"
            value={formData.client_email}
            className="inquiries__form-email-input"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="inquiries__form-field">
          <label className="inquiries__form-label" htmlFor="phoneNumber">
            Phone Number
          </label>
          <PhoneInput
            id="phoneNumber"
            name="client_phone_number"
            value={formData.client_phone_number}
            onChange={handlePhoneNumChange}
          ></PhoneInput>
        </div>
        <div className="inquiries__form-field">
          <label className="inquiries__form-label" htmlFor="scheduledTime">
            Scheduled Time
          </label>
          <input
            type="time"
            id="scheduledTime"
            name="scheduled_at"
            min="07:00"
            max="19:00"
            value={formData.scheduled_at}
            className="inquiries__form-phone-input"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="inquiries__form-field">
          <label className="inquiries__form-label" htmlFor="comment">
            Comment
          </label>
          <textarea
            className="inquiries__form-comment-input"
            id="comment"
            name="client_notes"
            placeholder="Please enter any comments..."
            maxLength="100"
            value={formData.comment}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button className="inquiries__form-submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default InquiryPage;
