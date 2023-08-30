import "./InquiryPage.scss";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";

function InquiryPage() {
  const [formData, setFormData] = useState({});
  // const [phoneNumDecorated, setPhoneNumDecorated] = useState("");


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
    setFormData({ ...formData, ["inquiryOption"]: node.title });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

  };

  const handlePhoneNumChange = (event) => {
    setFormData({ ...formData, ["phoneNumber"]: event });
  }

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
            name="inquiryOption"
            placeholder="Select an option..."
            value={formData.inquiryOption}
            className="inquiries__form-option-input"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="inquiries__form-field">
          <label className="inquiries__form-label" htmlFor="phoneNumber">
            Phone Number
          </label>
          <PhoneInput
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
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
            name="scheduledTime"
            min="07:00"
            max="19:00"
            value={formData.scheduledTime}
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
            name="comment"
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
