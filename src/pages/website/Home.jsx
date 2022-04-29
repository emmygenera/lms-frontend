import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserCourses } from "..";
import { Get } from "../../applocal";
// import Navbar from "../customerIn/navbar/Navbar";
import { Nav } from "../whitenav";
import Body from "./Body";
import CreateUserOrder from "./CreateUserOrder";

export default function Home() {
  // const [courses, setcourses] = useState([]);
  // const [loading, setloading] = useState(true);
  // const [filterBy, setfilterBy] = useState({});

  // function getCoures() {
  //   Get({ url: "courses/active", data: filterBy })
  //     .then(({ data }) => setcourses(data))
  //     .catch(() => toast.error("Opps! Error getting courses"))
  //     .finally(() => setloading(false));
  // }
  // useEffect(() => {
  //   getCoures();
  // }, []);

  return (
    <Body>
      {/* <UserCourses data={courses} filter isLoading={loading} /> */}
      <UserCourses />
    </Body>
  );
}
