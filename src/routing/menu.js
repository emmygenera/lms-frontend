import React from "react";
import APP_USER from "../services/APP_USER";
import { course, orders, setting, help, logout, customer, staf, instructor, invoice, ticket, messages, question, lead, markeet, tips, reports } from "../static/menuIcons";
import { IndexRoutes, pmac } from "./indexRoutes";

export const menu = [
  {
    label: "Dashboard",
    icon: "pi pi-fw pi-home",

    to: "/",
    perm: pmac(),
  },
  {
    label: "Courses",
    icon: course,
    badge: "courseNotifcations",
    iconType: "image",
    perm: pmac(["admin", APP_USER.customer, APP_USER.instructor, "manager", "finance"]),
    items: [
      { label: "My Courses", perm: pmac([APP_USER.customer]), to: "/myCourses" },
      { label: "All Courses", perm: pmac([APP_USER.customer]), to: "/allCourses" },
      { label: "Add New", perm: pmac(["admin", APP_USER.instructor]), to: "/newCourse" },
      { label: "Uploaded Courses", perm: pmac([APP_USER.instructor]), to: "/uploadedCourses" },
      { label: "View Courses", perm: pmac(["admin"]), to: "/adminCourses" },
      {
        label: "Categories",
        perm: pmac(["manager", "admin"]),
        items: [
          { label: "Add New", to: "/newCategory" },
          { label: "View Categories", to: "/categories" },
        ],
      },
      {
        label: "Lessons",
        perm_: pmac(["admin", "manager", APP_USER.instructor]),
        perm: pmac(["admin_"]),
        items: [
          { perm: pmac(["admin", APP_USER.instructor]), label: "Add New", to: "/newLesson" },
          { perm: pmac(["admin", "manager"]), label: "View Lessons", to: "/lessons" },
        ],
      },
    ],
  },
  {
    label: "Orders",
    badge: "orderNotifications",
    icon: orders,
    perm: pmac(["admin", "staff", "manager", "support"]),
    iconType: "image",
    items: [
      { label: "Add New", to: "/newOrder" },
      { label: "Existing Customer New Order", to: "/customerNewOrder" },
      { label: "New Lead Order", to: "/newLeadOrder" },
      { label: "View Orders", to: "/orders" },
    ],
  },
  {
    label: "Customers",
    perm: pmac(["admin", "staff", "manager", "support"]),
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
    perm: pmac(["admin", "manager"]),
    iconType: "image",
    items: [
      { label: "Add New ", to: "/newInstructor" },
      { label: "View Instructors", to: "/instructor" },
    ],
  },
  {
    label: "Staffs",
    icon: staf,
    perm: pmac(["admin", APP_USER.staff, APP_USER.marketing, APP_USER.finance, APP_USER.manager]),
    iconType: "image",
    items: [
      { label: "Add New ", perm: pmac(["admin", APP_USER.manager]), to: "/newStaff" },
      { label: "View Staff", perm: pmac(["admin", APP_USER.manager]), to: "/staff" },
      { label: "Update Account", to: "/updateAccount" },
    ],
  },

  {
    label: "Invoices",
    icon: invoice,
    perm: pmac(["admin", APP_USER.customer, "manager", "finance"]),
    iconType: "image",
    items: [
      // { label: "Add New", perm: pmac(["admin", "manager", "finance"]), to: "/newInvoice" },
      { label: "View Invoices", to: "/invoices" },
    ],
  },
  {
    label: "Tickets",
    icon: ticket,
    badge: "ticketNotifications",
    iconType: "image",
    perm: pmac(["admin", APP_USER.customer, "manager", "support", "finance"]),
    items: [
      { label: "Add New", perm: pmac([APP_USER.customer]), to: "/newTicket" },
      { label: "View Tickets", to: "/tickets" },
    ],
  },
  {
    label: "Messages",
    icon: messages,
    badge: "messageNotifications",
    perm: pmac(["admin", "manager", "support", , APP_USER.instructor]),
    iconType: "image",
    items: [
      { label: "Add New", to: "/newMessage" },
      { label: "View Messages", to: "/messages" },
    ],
  },
  // {
  //   label: "Questions",
  //   icon: question,
  //   badge: "questionNotifications",
  //   perm: pmac(["admin", APP_USER.customer, APP_USER.instructor, "manager", "support"]),
  //   iconType: "image",
  //   items: [{ label: "View Questions", to: "/questions" }],
  // },
  {
    label: "Leads",
    icon: lead,
    perm: pmac(["admin", "manager", "marketing"]),
    iconType: "image",
    items: [
      { label: "Add New", to: "/newLead" },
      { label: "Import Leads", to: "/importLeads" },
      { label: "View Leads", to: "/leads" },
    ],
  },
  {
    label: "Marketing",
    icon: markeet,
    perm: pmac(["admin", "manager", "marketing"]),
    iconType: "image",
    items: [
      { label: "Add New", perm: pmac(["admin", "manager", "marketing"]), to: "/newCampaign" },
      { label: "View Campaign", perm: pmac(["admin", "manager", "marketing"]), to: "/marketing" },
    ],
  },
  {
    label: "Tips",
    icon: tips,
    perm: pmac(["admin", APP_USER.customer, "manager", "marketing"]),
    iconType: "image",
    items: [
      { label: "Add New", perm: pmac(["admin", "manager", "marketing"]), to: "/newTip" },
      { label: "View Tips", to: "/tips" },
    ],
  },

  {
    label: "Reports",
    icon: reports,
    perm: pmac(["admin", "manager"]),
    iconType: "image",
    items: [{ label: "View Reports", to: "/report" }],
  },
  {
    label: "Certificates",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 12C1 14.4477 1.13246 16.3463 1.46153 17.827C1.78807 19.2963 2.29478 20.2921 3.00136 20.9986C3.70794 21.7052 4.70365 22.2119 6.17298 22.5385C7.65366 22.8675 9.55232 23 12 23C14.4477 23 16.3463 22.8675 17.827 22.5385C19.2963 22.2119 20.2921 21.7052 20.9986 20.9986C21.7052 20.2921 22.2119 19.2963 22.5385 17.827C22.8675 16.3463 23 14.4477 23 12C23 9.55232 22.8675 7.65366 22.5385 6.17298C22.2119 4.70365 21.7052 3.70794 20.9986 3.00136C20.2921 2.29478 19.2963 1.78807 17.827 1.46153C16.3463 1.13246 14.4477 1 12 1C9.55232 1 7.65366 1.13246 6.17298 1.46153C4.70365 1.78807 3.70794 2.29478 3.00136 3.00136C2.29478 3.70794 1.78807 4.70365 1.46153 6.17298C1.13246 7.65366 1 9.55232 1 12Z"
          stroke="#E0E0E0"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path d="M12 7V17M17 11V17M7 13V17" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    ),
    perm: pmac([APP_USER.customer, APP_USER.admin, "manager", "instructor"]),
    iconType: "html",
    items: [
      { label: "Upload Certificate", perm: pmac([APP_USER.admin, "manager", "instructor"]), to: "/uploadCertificate" },
      { label: "View Certificate", perm: pmac([APP_USER.customer]), to: "/certificates" },
    ],
  },
  {
    label: "Settings",
    icon: setting,
    perm: pmac([APP_USER.admin, APP_USER.manager]),
    iconType: "image",
    items: [
      { label: "Site Settings", to: "/settings" },
      { label: "Update Welcome Message", perm: pmac([APP_USER.admin, APP_USER.manager]), to: "/updateWelcome" },
    ],
  },
];
/*
;

*/
