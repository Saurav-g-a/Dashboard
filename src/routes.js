import Dashboard from "views/Dashboard.js";
import Category from "views/Category.js";
import Faq from "views/Faq";
import UpcomingEvent from "views/UpcomingEvent";
import Landing from "views/Landing";
import Testimonials from "views/Testimonials";
import Blog from "views/Blog";
import Event from "views/Event";
import Offer from "views/Offer";
import FeatureProduct from "views/FeatureProduct";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/landing",
    name: "Landing",
    icon: "nc-icon nc-shop",
    component: <Landing />,
    layout: "/admin",
  },
  {
    path: "/Testimonials",
    name: "Testimonials",
    icon: "nc-icon nc-caps-small",
    component: <Testimonials />,
    layout: "/admin",
  },
  {
    path: "/Offer",
    name: "Offer",
    icon: "nc-icon nc-caps-small",
    component: <Offer />,
    layout: "/admin",
  },
  {
    path: "/FeatureProduct",
    name: "Feature Product",
    icon: "nc-icon nc-caps-small",
    component: <FeatureProduct />,
    layout: "/admin",
  },
  {
    path: "/Event",
    name: "Event",
    icon: "nc-icon nc-album-2",
    component: <Event />,
    layout: "/admin",
  },
  {
    path: "/Category",
    name: "Category",
    icon: "nc-icon nc-bell-55",
    component: <Category />,
    layout: "/admin",
  },
  {
    path: "/UpcomingEvent",
    name: "Upcoming Event",
    icon: "nc-icon nc-tile-56",
    component: <UpcomingEvent />,
    layout: "/admin",
  },
  {
    path: "/Blog",
    name: "Blog",
    icon: "nc-icon nc-paper",
    component: <Blog />,
    layout: "/admin",
  },
  {
    path: "/Faqs",
    name: "FAQ's",
    icon: "nc-icon nc-chat-33",
    component: <Faq />,
    layout: "/admin",
  },
];
export default routes;
