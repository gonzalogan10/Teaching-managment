import { useState } from "react";

function ActivityForm(activityProps) {
  const [name, setName] = useState("");

  if (!activityProps.courseId) return null;

  function createActivity() {
    fetch( //fetch (URL, options)
      "http://localhost:8080/api/activities",
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa("teacher1:test"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          course: { id: activityProps.courseId }
        })
      }
    );
  }
  //returns the javaScript XML (JSX) code to render (meaning what appears on the screen, HTML-like)
  return (
    <div>
      <input
        placeholder="Activity name"
        onChange={activity => setName(activity.target.value)}
      />
      <button onClick={createActivity}>Create an activity</button>
    </div>
  );
}

export default ActivityForm;
