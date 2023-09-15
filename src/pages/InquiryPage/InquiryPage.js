import "./InquiryPage.scss";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  urlAllOrganizations,
  urlInquiryOptionsByOrgId,
  urlAllTickets,
} from "../../utils/api-utils";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus-icon.svg";
import { ReactComponent as MinusIcon } from "../../assets/icons/minus-icon.svg";

function InquiryPage({ userInfo, isLoggedIn }) {
  const navigate = useNavigate();
  const [orgData, setOrgData] = useState(null);
  const [treeData, setTreeData] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTreeData, setFilteredTreeData] = useState(treeData);
  const [isLoading, setIsLoading] = useState(true);
  const [orgIsSelected, setOrgIsSelected] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState("");

  // check if agent/dispatcher, nav to org page
  useEffect(() => {
    if (
      isLoggedIn &&
      (userInfo.role === "agent" || userInfo.role === "dispatcher")
    )
      navigate(`/organization/${userInfo.organization_id}`);
  }, [userInfo.role, isLoggedIn]);

  // get all organizations only init load
  useEffect(() => {
    axios.get(urlAllOrganizations()).then((response) => {
      const sortedOrgs = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setOrgData(sortedOrgs);
      setIsLoading(false);
    });
  }, []);

  // store selected org's id
  const handleOrgChange = (event) => {
    const newOrgId =
      event.target.options[event.target.selectedIndex].getAttribute("id");
    setSelectedOrg(newOrgId);
  };

  // get inquiry options for org once an org has been selected
  useEffect(() => {
    if (selectedOrg) {
      axios.get(urlInquiryOptionsByOrgId(selectedOrg)).then((response) => {
        setTreeData(response.data);
        setFilteredTreeData(response.data);
        setOrgIsSelected(true);
      });
    }
  }, [selectedOrg]);

  // filter data by search term
  const filterData = (data, keyword) => {
    return data
      .map((node) => {
        if (node.children) {
          const filteredChildren = filterData(node.children, keyword);
          if (filteredChildren.length > 0) {
            return {
              ...node,
              children: filteredChildren,
            };
          }
        }
        if (node.title.toLowerCase().includes(keyword.toLowerCase())) {
          return node;
        }
        return null;
      })
      .filter(Boolean);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // filter tree data whenever search term changes
  useEffect(() => {
    if (treeData) {
      setFilteredTreeData(filterData(treeData, searchTerm));
    }
  }, [searchTerm]);

  useEffect(() => {
    setFormData({
      ...formData,
      client_first_name: userInfo.first_name,
      client_last_name: userInfo.last_name,
      client_email: userInfo.email,
      client_phone_number: userInfo.phone_number,
    });
  }, [userInfo]);

  const handleNodeSelect = (selectedKeys, { node }) => {
    setFormData({
      ...formData,
      inquiry_option: findPath(treeData, node.key).join(">"),
    });
  };

  // find the path (based on title property) for a given node key in a tree
  const findPath = (tree, nodeKey, currentPath = []) => {
    for (const node of tree) {
      currentPath.push(node.title);

      if (node.key === nodeKey) {
        return currentPath;
      }

      if (node.children && node.children.length > 0) {
        const result = findPath(node.children, nodeKey, currentPath.slice());
        if (result) {
          return result;
        }
      }

      currentPath.pop();
    }

    return null;
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
      scheduled_at,
    }) => ({
      inquiry_option,
      client_first_name,
      client_last_name,
      client_phone_number,
      client_email,
      client_notes,
      scheduled_at,
    }))(formData);

    reqBody.status = "Open";
    reqBody.organization_id = orgData.id;

    axios
      .post(urlAllTickets(), reqBody, {
        headers: {
          Authorization: `Bearer ${sessionStorage.authToken}`,
        },
      })
      .then((response) => {
        navigate(`/tickets/${response.data.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneNumChange = (event) => {
    setFormData({ ...formData, client_phone_number: event });
  };

  const getSwitcherIcon = ({ isLeaf, expanded }) => {
    if (!isLeaf) {
      if (expanded) {
        return <MinusIcon className="inquiries__minus-icon" />;
      } else {
        return <PlusIcon className="inquiries__plus-icon" />;
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="inquiries__container">
      <div className="inquiries__organization-select-container">
        <select
          className="inquiries__organization-select"
          value={selectedOrg}
          onChange={handleOrgChange}
        >
          {!orgIsSelected && <option value="">Select an organization</option>}
          {orgData.map((org) => {
            return (
              <option key={org.id} id={org.id} value={org.name}>
                {org.name}
              </option>
            );
          })}
        </select>
      </div>
      {orgIsSelected && (
        <div className="inquiries__tree-search-container">
          <input
            className="inquiries__search"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
          ></input>
          <Tree
            showLine
            selectable
            treeData={filteredTreeData}
            onSelect={handleNodeSelect}
            showIcon={false}
            switcherIcon={getSwitcherIcon}
            className="inquiries__tree"
          />
        </div>
      )}
      {orgIsSelected && (
        <form className="inquiries__form" onSubmit={handleFormSubmit}>
          <div className="inquiries__form-field">
            <label className="inquiries__form-label" htmlFor="inquiryOption">
              Inquiry Option:
            </label>
            <input
              type="text"
              id="inquiryOption"
              name="inquiry_option"
              placeholder="Select an option..."
              value={formData.inquiry_option}
              className="inquiries__form-option-input"
              onChange={handleInputChange}
              autoComplete="off"
            ></input>
          </div>
          <div className="inquiries__name-container">
            <div className="inquiries__form-field-first-name">
              <label className="inquiries__form-label" htmlFor="firstName">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="client_first_name"
                value={formData.client_first_name}
                className="inquiries__form-first-name-input"
                onChange={handleInputChange}
                autoComplete="off"
              ></input>
            </div>
            <div className="inquiries__form-field-last-name">
              <label className="inquiries__form-label" htmlFor="lastName">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="client_last_name"
                value={formData.client_last_name}
                className="inquiries__form-last-name-input"
                onChange={handleInputChange}
                autoComplete="off"
              ></input>
            </div>
          </div>
          <div className="inquiries__form-field">
            <label className="inquiries__form-label" htmlFor="email">
              E-mail:
            </label>
            <input
              type="text"
              id="email"
              name="client_email"
              value={formData.client_email}
              className="inquiries__form-email-input"
              onChange={handleInputChange}
              autoComplete="off"
            ></input>
          </div>
          <div className="inquiries__form-field">
            <label className="inquiries__form-label" htmlFor="phoneNumber">
              Phone Number:
            </label>
            <PhoneInput
              id="phoneNumber"
              name="client_phone_number"
              value={formData.client_phone_number}
              onChange={handlePhoneNumChange}
              autoComplete="off"
              className="inquiries__form-phone-number-input"
            ></PhoneInput>
          </div>
          <div className="inquiries__form-field">
            <label className="inquiries__form-label" htmlFor="scheduledTime">
              Scheduled Time:
            </label>
            <input
              type="time"
              id="scheduledTime"
              name="scheduled_at"
              min="07:00"
              max="19:00"
              value={formData.scheduled_at}
              className="inquiries__form-time-input"
              onChange={handleInputChange}
              autoComplete="off"
            ></input>
          </div>
          <div className="inquiries__form-field">
            <label className="inquiries__form-label" htmlFor="comment">
              Comment:
            </label>
            <textarea
              className="inquiries__form-comment-input"
              id="comment"
              name="client_notes"
              placeholder="Please enter any comments..."
              maxLength="100"
              value={formData.comment}
              onChange={handleInputChange}
              autoComplete="off"
            ></textarea>
          </div>
          <button className="inquiries__form-submit-btn" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default InquiryPage;
