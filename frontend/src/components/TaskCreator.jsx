import { useState } from "react";

function TaskCreator(taskProps) {
  const [title, setTitle] = useState("");

  if (!taskProps.activityId) return null;

  function createTask() {
    fetch("http://localhost:8080/api/tasks",
    {
            method: "POST",
            headers: {
                Authorization: "Basic " + btoa("teacher1:test"),
                "Content-Type": "application/json"
            },
        body: JSON.stringify({
            title: title,
            activity: { id: taskProps.activityId }})
        }
    );
  }

  return (
    <div>
      <input
        placeholder="Task title"
        onChange={task => setTitle(task.target.value)}
      />
      <button onClick={createTask}>Create a task</button>
    </div>
  );
}

export default TaskCreator;