import APP_USER from "../services/APP_USER";
// import { pmac } from "./indexRoutes";

const QuickAddURL = [
  {
    lable: "Add Course",
    url: "newCourse",
    perm: ["admin", "manager", APP_USER.instructor],
  },
  {
    lable: "Add Lesson",
    url: "newLesson",
    perm: ["admin", APP_USER.instructor, "manager"],
  },
  {
    lable: "Add Order",
    url: "newCourse",
    perm: ["admin", "manager"],
  },
  {
    perm: ["admin", "staff", "manager", , APP_USER.instructor],
    lable: "Add Category",
    url: "newCategory",
  },
  {
    perm: ["admin", "staff", "manager", "support"],
    lable: "Add Order",
    url: "newOrder",
  },
  {
    perm: ["admin", "staff", "manager", "support"],
    lable: "Add Customer",
    url: "newCustomer",
  },
  {
    perm: ["admin", "manager"],
    lable: "Add Instructor",
    url: "newInstructor",
  },
  {
    perm: ["admin", "manager"],
    lable: "Add Staff",
    url: "newStaff",
  },
];

export default QuickAddURL;
