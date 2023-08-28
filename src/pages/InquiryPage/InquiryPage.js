import "./InquiryPage.scss";
import Tree from "rc-tree";
import "rc-tree/assets/index.css"

function InquiryPage() {
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

  const selectHandler= (selectedKeys, { node }) => {
    console.log(node)
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
    </div>
  );
}

export default InquiryPage;
