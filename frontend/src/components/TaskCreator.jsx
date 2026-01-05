import { useState } from "react";

function TaskCreator({ activityId, onTaskCreated }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "LECTURE",
    taskOrder: 1,
    startDate: "",
    endDate: ""
  });
  const [loading, setLoading] = useState(false);

  const taskTypes = [
    { value: "LECTURE", label: "📚 Lecture" },
    { value: "PROJECT", label: "📊 Project" },
    { value: "MIDTERM", label: "📝 Midterm Test" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "taskOrder" ? parseInt(value) : value
    }));
  };

  const handleCreateTask = () => {
    if (!formData.title.trim()) {
      alert("Please enter a task title");
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8080/api/tasks/activity/${activityId}`, {
      method: "POST",
      headers: {
        "Authorization": "Basic " + btoa("teacher1:test"),
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        type: formData.type,
        taskOrder: formData.taskOrder,
        startDate: formData.startDate || null,
        endDate: formData.endDate || null
      })
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to create task');
        return response.json();
      })
      .then(newTask => {
        alert("Task created successfully!");
        setFormData({
          title: "",
          description: "",
          type: "LECTURE",
          taskOrder: 1,
          startDate: "",
          endDate: ""
        });
        setShowForm(false);
        if (onTaskCreated) {
          onTaskCreated(newTask);
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Error creating task: " + error.message);
      })
      .finally(() => setLoading(false));
  };

  if (!activityId) {
    return null;
  }

  return (
    <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0066cc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "1em"
        }}
      >
        {showForm ? "Cancel" : "+ Create New Task"}
      </button>

      {showForm && (
        <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "white", borderRadius: "4px", border: "1px solid #ddd" }}>
          <h4>Create a New Task</h4>

          <div style={{ marginBottom: "15px" }}>
            <label><strong>Task Order:</strong></label>
            <input
              type="number"
              name="taskOrder"
              value={formData.taskOrder}
              onChange={handleInputChange}
              placeholder="Task order in activity"
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label><strong>Title:</strong></label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label><strong>Description:</strong></label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
              rows="4"
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label><strong>Type:</strong></label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            >
              {taskTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
            <div>
              <label><strong>Start Date:</strong></label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box"
                }}
              />
            </div>
            <div>
              <label><strong>End Date:</strong></label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleCreateTask}
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: loading ? "#999" : "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCreator;