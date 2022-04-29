import {
  Customer,
  NewCustomer,
  // UpdateCustomer,
  Markeeting,
  Tips,
  NewTip,
  UpdateInvoice,
  NewLead,
  Instructor,
  Staff,
  Leads,
  Tickets,
  Messages,
  Questions,
  Login,
  AdminCourses,
  CustomerIn,
  UserCourses,
  Lessons,
  NewLesson,
  FifthPage,
  SixthPage,
  ViewCourse,
  NewOrder,
  UpdateOrder,
  EmptyPage,
  Categories,
  NewCategory,
  Orders,
  Invoices,
  NewInstructor,
  // UpdateInstructor,
  NewStaff,
  // UpdateStaff,
  NewInvoice,
  NewCompaign,
  NewCourse,
  Question,
  Dashboard,
} from "../pages";
import Courses from "../pages/courses";
import SubscribedCourses from "../pages/courses/user/SubscribedCourses";
import AddMessage from "../pages/messages/AddMessage";
import ReplyMessage from "../pages/messages/ReplyMessage";
import ReplyQuestion from "../pages/questions/ReplyQuestion";
import AddQuestion from "../pages/questions/AddQuestion";
import Report from "../pages/report/Report";
import AddTicket from "../pages/tickets/AddTicket";
import UpdateTicket from "../pages/tickets/UpdateTicket";
import CreateUserOrder from "../pages/website/CreateUserOrder";
import Home from "../pages/website/Home";
import CheckOut from "../pages/website/customer/CheckOut";
import APP_USER from "../services/APP_USER";
import { course } from "../static/menuIcons";
import PageNotFound from "./404page";
import RedirectPageNotFound from "./RedirectPageNotFound";
import AddCertificate from "../pages/certificates/AddCertificate";
import Certificates from "../pages/certificates";
import Settings from "../pages/settings";
import CustomerOverview from "../pages/customers/CustomerOverview";
import UpdateWelcome from "../pages/settings/UpdateWelcome";
import ImportLeads from "../pages/leads/page37/ImportLead";
import UpdateStaffAccount from "../pages/staff/addstaff/UpdateStaffAccount";
import ExistingCustomerNewOrder from "../pages/orders/ExistingCustomerNewOrder";
import NewLeadOrder from "../pages/orders/newLeadOrder";

const roles = ["admin", "staff", APP_USER.customer, APP_USER.instructor, "user", "manager", "finance", "support", "marketing"];
function addPermitionAccess(data = roles) {
  return data.length == 0 ? roles : roles.filter((item) => data.includes(item));
}

// permission to access routes
export const pmac = addPermitionAccess;

/*
  Staffs can login and work on backend with access by role

Financial can edit orders and invoices but cant edit anything else

Staff can edit everything but cant delete anything.

Manager can edit everything but cant add or edit users.

Admin has access to everything

Marketing can only send newsletter and add leads

  */
export const IndexRoutes = [
  // { path: "/", component: Login },
  { path: "coustomerIn", perm: pmac(["admin", "staff", "manager"]), component: CustomerIn },
  { path: "userCourses", perm: pmac(["admin", "staff", "manager", "finance"]), component: UserCourses },
  { path: "fifthPage", perm: pmac(["admin"]), component: FifthPage },
  { path: "sixthPage", perm: pmac(["admin"]), component: SixthPage },
  // { path: "SeventhPage", perm: pmac(["admin"]), component: SeventhPage },

  { path: "orders", perm: pmac(["admin", "staff", "manager", "support"]), component: Orders },
  { path: "newOrder", perm: pmac(["admin", "staff", "manager", "support"]), component: NewOrder },
  { path: "customerNewOrder", perm: pmac(["admin", "staff", "manager", "support"]), component: ExistingCustomerNewOrder },
  { path: "newLeadOrder", perm: pmac(["admin", "staff", "manager", "support"]), component: NewLeadOrder },

  { path: "updateOrder", perm: pmac(["admin", "staff", "manager"]), component: UpdateOrder },
  { path: "categories", perm: pmac(["admin", "manager"]), component: Categories },
  { path: "newCategory", perm: pmac(["admin", "manager"]), component: NewCategory },
  { path: "lessons", perm: pmac(["admin", "manager"]), component: Lessons },
  { path: "newLesson", perm: pmac(["admin", "manager", APP_USER.instructor]), component: NewLesson },

  { path: "customers", perm: pmac(["admin", "staff", "manager", "support"]), component: Customer },
  { path: "newCustomer", perm: pmac(["admin", "staff", "manager", "support"]), component: NewCustomer },
  // { path: "editCustomer", component: UpdateCustomer },

  { path: "instructor", perm: pmac(["admin", "manager"]), component: Instructor },
  { path: "newInstructor", perm: pmac(["admin", "manager"]), component: NewInstructor },
  // { path: "updateInstructor", component: UpdateInstructor },

  { path: "staff", perm: pmac(["admin", "manager"]), component: Staff },
  { path: "newStaff", perm: pmac(["admin"]), component: NewStaff },
  { path: "updateAccount", perm: pmac(["admin", APP_USER.staff, APP_USER.marketing, APP_USER.finance, APP_USER.manager]), component: UpdateStaffAccount },
  // { path: "updateStaff", component: UpdateStaff },

  { path: "invoices", perm: pmac(["admin", "manager", "finance", APP_USER.customer]), component: Invoices },
  { path: "updateInvoice", perm: pmac(["admin", "manager", "finance"]), component: UpdateInvoice },
  { path: "newInvoice", perm: pmac(["admin", "manager", "finance"]), component: NewInvoice },

  { path: "tickets", perm: pmac(["admin", APP_USER.customer, "manager", "support", "finance"]), component: Tickets },
  { path: "newTicket", perm: pmac([APP_USER.customer, "user"]), component: AddTicket },
  { path: "replyTicket", perm: pmac(["admin", APP_USER.customer, "manager", "support", "staff"]), component: UpdateTicket },
  { path: "messages", perm: pmac(["admin", "staff", "marketing", "manager", "support"]), component: Messages },
  { path: "newMessage", perm: pmac(["admin", "staff", "marketing", "manager", "support"]), component: AddMessage },
  { path: "replyMessage", perm: pmac(["admin", "staff", "marketing", "manager", "support"]), component: ReplyMessage },
  { path: "questions", perm: pmac(["admin", APP_USER.customer, "manager", "support", APP_USER.instructor]), component: Questions },
  { path: "addQuestion", perm: pmac(["admin", APP_USER.customer]), component: AddQuestion },
  { path: "replyQuestion", perm: pmac(["admin", APP_USER.customer, "manager", "support", APP_USER.instructor]), component: ReplyQuestion },

  { path: "leads", perm: pmac(["admin", "manager", "marketing"]), component: Leads },
  { path: "newLead", perm: pmac(["admin", "manager", "marketing"]), component: NewLead },
  { path: "importLeads", perm: pmac(["admin", "manager", "marketing"]), component: ImportLeads },
  { path: "newCourse", perm: pmac(["admin", "staff", "manager", "finance", APP_USER.instructor]), component: NewCourse },
  { path: "myCourses", perm: pmac([APP_USER.customer]), component: SubscribedCourses },
  { path: "allCourses", perm: pmac([APP_USER.customer]), component: UserCourses },
  { path: "adminCourses", perm: pmac(["admin", "manager", "staff", "finance"]), component: AdminCourses },
  { path: "uploadedCourses", perm: pmac([APP_USER.instructor]), component: AdminCourses },
  { path: "viewCourse", perm: pmac([APP_USER.customer, APP_USER.admin, APP_USER.instructor, "staff", "manager"]), component: ViewCourse },

  { path: "marketing", perm: pmac(["admin", APP_USER.customer, "manager", "marketing"]), component: Markeeting },
  { path: "newCampaign", perm: pmac(["admin", "manager", "marketing"]), component: NewCompaign },

  { path: "tips", perm: pmac(["admin", APP_USER.customer, "manager", "marketing"]), component: Tips },
  { path: "newTip", perm: pmac(["admin", "manager", "marketing"]), component: NewTip },
  { path: "customerOverview", perm: pmac(["admin", "manager", "staff"]), component: CustomerOverview },
  // { path: "updateTip", perm: pmac(["admin", "manager", "marketing"]), component: NewTip },
  { path: "question", perm: pmac(["admin", "manager", APP_USER.instructor]), component: Question },
  { path: "report", perm: pmac(["admin", "manager"]), component: Report },
  { path: "checkOut", perm: pmac([APP_USER.customer]), component: CheckOut },
  { path: "uploadCertificate", perm: pmac([APP_USER.admin, "manager", APP_USER.instructor]), component: AddCertificate },
  { path: "certificates", perm: pmac([APP_USER.customer, APP_USER.admin, "manager", APP_USER.instructor]), component: Certificates },
  { path: "settings", perm: pmac([APP_USER.admin]), component: Settings },
  { path: "updateWelcome", perm: pmac([APP_USER.admin, APP_USER.manager]), component: UpdateWelcome },
  {
    path: "/404",
    perm: pmac(),
    component: PageNotFound,
  },
  { path: "/", perm: pmac(), component: Dashboard },
  // { path: "/*", perm: pmac(), component: RedirectPageNotFound },

  // { path: "login", component: Login },
];
export const PublicRoutes = [
  { path: "login", component: Login },
  { path: "create-user-order", component: CreateUserOrder },
  { path: "/", component: Home },
];
