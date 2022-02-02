import { course, orders, setting, help, logout, customer, staf, instructor, invoice, ticket, messages, question, lead, markeet, tips, reports } from "../static/menuIcons";
import { IndexRoutes } from "./indexRoutes";

export const menu = [
  { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" },
  {
    label: "Courses",
    icon: course,
    iconType: "image",

    items: [
      { label: "Add New", to: "/newCourse" },
      { label: "View Courses", to: "/adminCourses" },
      {
        label: "Categories",
        items: [
          { label: "Add New", to: "/newCategory" },
          { label: "View Categories", to: "/categories" },
        ],
      },
      {
        label: "Lessons",
        items: [
          { label: "Add New", to: "/newLesson" },
          { label: "View Lessons", to: "/lessons" },
        ],
      },
    ],
  },
  {
    label: "Orders",
    icon: orders,
    iconType: "image",
    items: [
      { label: "Add New", to: "/newOrder" },
      { label: "View Orders", to: "/orders" },
    ],
  },
  {
    label: "Customers",
    icon: customer,
    iconType: "image",
    items: [
      { label: "Add New", to: "/newCustomer" },
      { label: "View Customers", to: "/customers" },
    ],
  },
  {
    label: "instructors",
    icon: instructor,
    iconType: "image",
    items: [
      { label: "Add New ", to: "/newInstructor" },
      { label: "View Instructors", to: "/instructor" },
    ],
  },
  {
    label: "Staff",
    icon: staf,
    iconType: "image",
    items: [
      { label: "Add New ", to: "/newStaff" },
      { label: "View Staff", to: "/staff" },
    ],
  },

  {
    label: "Invoices",
    icon: invoice,
    iconType: "image",
    items: [
      { label: "Add New", to: "/newInvoice" },
      { label: "View Invoices", to: "/invoices" },
    ],
  },
  {
    label: "Tickets",
    icon: ticket,
    iconType: "image",
    items: [
      { label: "Add New", to: "/newTicket" },
      { label: "View Tickets", to: "/tickets" },
    ],
  },
  {
    label: "Messages",
    icon: messages,
    iconType: "image",
    items: [{ label: "View Messages", to: "/messages" }],
  },
  {
    label: "Questions",
    icon: question,
    iconType: "image",
    items: [{ label: "View Questions", to: "/questions" }],
  },
  {
    label: "Leads",
    icon: lead,
    iconType: "image",
    items: [
      { label: "Add New", to: "/newLead" },
      { label: "View Leads", to: "/leads" },
    ],
  },
  {
    label: "Markeeting",
    icon: markeet,
    iconType: "image",
    items: [
      { label: "Add New", to: "/newCampaign" },
      { label: "View Campaign", to: "/markeeting" },
    ],
  },
  {
    label: "Tips",
    icon: tips,
    iconType: "image",
    items: [
      { label: "Add New", to: "/newTip" },
      { label: "View Tips", to: "/tips" },
    ],
  },

  {
    label: "Reports",
    icon: reports,
    iconType: "image",
    items: [{ label: "View Reports", to: "/login" }],
  },
];
