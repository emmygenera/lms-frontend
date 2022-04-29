import React from "react";

import List from "./List";
import ListItem from "./ListItem";

export default function CustomerQuestionTicket({ question = { loading: false, display: false, data: [] }, ticket = { loading: false, data: [] } }) {
  return (
    <div className="row mt-4">
      {question.display && (
        <div className="col-sm-6 pl-0">
          <ListItem
            //
            href="questions"
            loading={question.loading}
            title="My Questions"
            data={question.data}
            renderItems={({ data }) => <List {...data} />}
          />
        </div>
      )}
      <div className="col-sm-6 pr-0">
        <ListItem title="My Tickets" href="tickets" data={ticket.data} loading={ticket.loading} renderItems={({ data }) => <List {...data} />} />
      </div>
    </div>
  );
}
