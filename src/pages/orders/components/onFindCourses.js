import Courses from "../../../services/courses";

let timeout;
export default function ({ value, onResultsData, onLoadStart, onLoadFinish }) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  timeout = setTimeout(() => {
    onLoadStart([{ name: "Getting Data...", _id: "" }]);
    Courses.getSearchResults({ query: value })
      .then(({ data: { data } }) => {
        onResultsData(data);
      })
      .finally(onLoadFinish);
  }, 300);
}
