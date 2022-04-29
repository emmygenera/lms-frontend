import React from "react";
import ListItem from "./ListItem";
import List from "./List";

export default function MessageTicket({ message = { loading: false, data: [] }, ticket = { loading: false, data: [] } }) {
  return (
    <div className="row mt-4">
      <div className="col-sm-6 pl-0">
        <ListItem title="Latest Messages" href="messages" data={message.data} loading={message.loading} renderItems={({ data }) => <List {...data} />} />
      </div>
      <div className="col-sm-6 pr-0">
        <ListItem loading={ticket.loading} href="tickets" title="Latest Tickets" data={ticket.data} renderItems={({ data }) => <List {...data} />} />
      </div>
    </div>
  );
}
