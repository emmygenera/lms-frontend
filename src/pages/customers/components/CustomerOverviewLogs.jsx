import React from "react";

import List from "../../dashboard/components/List";
import ListItem from "../../dashboard/components/ListItem";
const obj = { title: "", to: "", data: [], loading: false, render: null };
export default function CustomerOverviewLogs({
  data = [obj],
  // , question = { loading: false, data: [] }, ticket = { loading: false, data: [] }
}) {
  return (
    <div className="row mt-4">
      {data.map((item, idx) => (
        <div key={idx} className={"col-xs-6 col-sm-4 col-md-3 "}>
          <ListItem
            //
            {...item}
            href={item.to}
            // href="questions"
            // loading={question.loading}
            // title="My Questions"
            // data={question.data}
            renderItems={item.render ? item.render : ({ data }) => <List {...data} />}
          />
        </div>
      ))}
      {/* <div className="col-xs-6 col-sm-4 col-md-3 pr-0">
        <ListItem title="My Tickets" href="tickets" data={ticket.data} loading={ticket.loading} renderItems={({ data }) => <List {...data} />} />
      </div> */}
    </div>
  );
}
