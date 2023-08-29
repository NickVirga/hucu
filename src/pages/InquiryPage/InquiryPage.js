import "./InquiryPage.scss";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";

function InquiryPage() {
  const [formData, setFormData] = useState({ scheduledTime: new Date() });
  const [phoneNumDecorated, setPhoneNumDecorated] = useState("");


  const treeData = [
    {
      key: "1",
      title: "Food",
      children: [
        {
          key: "2",
          title: "Burger",
        },
        {
          key: "3",
          title: "Salad",
          children: [
            {
              key: "4",
              title: "Tomatoes",
            },
            {
              key: "5",
              title: "Cabbage",
            },
          ],
        },
      ],
    },
    {
      key: "6",
      title: "Drinks",
      children: [
        {
          key: "7",
          title: "Beer",
        },
        {
          key: "8",
          title: "Soft drink",
        },
      ],
    },
  ];

  const selectHandler = (selectedKeys, { node }) => {
    console.log(node);
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
