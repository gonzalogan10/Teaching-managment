import { useEffect, useState } from "react";

function TaskList({ activityId, onTaskSelect, selectedTaskId }) {
  const [tasks, setTasks] = useState([]);
  const [solvers, setSolvers] = useState([]);
  const [error, setError] = useState(null);
  const [newSolverId, setNewSolverId] = useState({});

  useEffect(() => {
    if (!activityId) return;

    // Load tasks for this activity
    fetch(`http://localhost:8080/api/tasks/activity/${activityId}`, {
      method: "GET",
      headers: {
        "Authorization": "Basic " + btoa("teacher1:test"),
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return response.json();
      })
      .then(data => {
        console.log('Tasks loaded:', data);
        setTasks(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
        setError(error.message);
      });

    // Load all solvers for assignment
    fetch("http://localhost:8080/api/solvers", {
      method: "GET",
      headers: {
        "Authorization": "Basic " + btoa("teacher1:test"),
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch solvers');
        return response.json();
      })
      .then(data => {
        console.log('Solvers loaded:', data);
        setSolvers(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error("Error fetching solvers:", error);
      });
  }, [activityId]);

  const handleBecomeMainSolver = (taskId, solverId) => {
    fetch(`http://localhost:8080/api/tasks/${taskId}/main-solver/${solverId}`, {
      method: "PUT",
      headers: {
        "Authorization": "Basic " + btoa("teacher1:test"),
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to assign solver');
        return response.json();
      })
      .then(updatedTask => {
        setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
        setNewSolverId({ ...newSolverId, [taskId]: "" });
      })
      .catch(error => {
        console.error("Error assigning solver:", error);
        alert('Failed to assign solver: ' + error.message);
      });
  };

  if (!activityId) {
    return null;
  }

const getTaskTypeLabel = (type) => {
    const typeMap = {
      'LECTURE': '📚 Lecture',
      'PROJECT': '📊 Project',
      'MIDTERM': '📝 Midterm Test'
    };
    return typeMap[type] || type;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US');
  };

  return (
    <div style={{ marginTop: "30px", marginBottom: "30px" }}>
      <h3 style={{ color: "#c1bdbdff", borderBottom: "2px solid #999", paddingBottom: "10px" }}>
        Tasks
      </h3>

      {error && <p style={{ color: 'red' }}>Error loading tasks: {error}</p>}

      {tasks.length === 0 && !error ? (
        <p style={{ color: "#828282ff", fontSize: "1.1em" }}>No tasks for this activity yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map(task => (
            <li
              key={task.id}
              style={{
                padding: "12px",
                margin: "8px 0",
                backgroundColor: selectedTaskId === task.id ? "#f0f8ff" : "#f5f5f5",
                borderLeft: `5px solid ${selectedTaskId === task.id ? "#0066cc" : "#bbb"}`,
                cursor: "pointer",
                borderRadius: "4px",
                transition: "all 0.2s ease",
                boxShadow: selectedTaskId === task.id ? "0 2px 6px rgba(0,0,0,0.15)" : "none"
              }}
            >
              <div onClick={() => {
                const newId = selectedTaskId === task.id ? null : task.id;
                if (onTaskSelect) {
                  onTaskSelect(newId);
                }
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: "1.05em", color: "#333" }}>
                      {task.taskOrder}. {task.title}
                    </strong>
                    <div style={{ color: "#666", fontSize: "0.9em", marginTop: "5px" }}>
                      {getTaskTypeLabel(task.type || 'LECTURE')}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.9em", color: "#666" }}>
                    {task.mainSolver ? (
                      <span style={{ backgroundColor: "#e8f5e9", padding: "4px 8px", borderRadius: "3px" }}>
                        👤 {task.mainSolver.name}
                      </span>
                    ) : (
                      <span style={{ backgroundColor: "#fff3e0", padding: "4px 8px", borderRadius: "3px" }}>
                        ⚠️ No Main Solver
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {selectedTaskId === task.id && (
                <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #ddd" }}>
                  {task.description && (
                    <p style={{ color: "#555", marginTop: "10px", lineHeight: "1.5" }}>
                      <strong>Description:</strong> {task.description}
                    </p>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "10px" }}>
                    <div>
                      <p style={{ color: "#666", margin: "5px 0" }}>
                        <strong>Start Date:</strong> {formatDate(task.startDate)}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: "#666", margin: "5px 0" }}>
                        <strong>End Date:</strong> {formatDate(task.endDate)}
                      </p>
                    </div>
                  </div>

                  <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #eee" }}>
                    <strong style={{ display: "block", marginBottom: "10px", color: "#333" }}>
                      Solvers ({task.solvers ? task.solvers.length : 0})
                    </strong>

                    {task.mainSolver && (
                      <div style={{
                        backgroundColor: "#c8e6c9",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        marginBottom: "10px",
                        borderLeft: "3px solid #4caf50"
                      }}>
                        <strong>Main Solver:</strong> {task.mainSolver.name}
                      </div>
                    )}

                    {task.solvers && task.solvers.length > 0 && (
                      <div style={{ marginTop: "10px" }}>
                        <p style={{ fontSize: "0.9em", color: "#666", marginBottom: "8px" }}>
                          <strong>Other Solvers:</strong>
                        </p>
                        {task.solvers.filter(s => s.id !== task.mainSolver?.id).map(solver => (
                          <div key={solver.id} style={{ color: "#666", fontSize: "0.9em", margin: "4px 0" }}>
                            • {solver.name}
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ marginTop: "15px" }}>
                      <p style={{ fontSize: "0.9em", color: "#666", marginBottom: "8px" }}>
                        <strong>Become Main Solver:</strong>
                      </p>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <select
                          value={newSolverId[task.id] || ""}
                          onChange={(e) => setNewSolverId({ ...newSolverId, [task.id]: e.target.value })}
                          style={{
                            padding: "6px 8px",
                            borderRadius: "3px",
                            border: "1px solid #ddd",
                            fontSize: "0.9em",
                            flex: 1
                          }}
                        >
                          <option value="">Select a Solver</option>
                          {solvers.map(solver => (
                            <option key={solver.id} value={solver.id}>
                              {solver.name}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            if (newSolverId[task.id]) {
                              handleBecomeMainSolver(task.id, newSolverId[task.id]);
                            }
                          }}
                          disabled={!newSolverId[task.id]}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "3px",
                            border: "none",
                            backgroundColor: newSolverId[task.id] ? "#0066cc" : "#ccc",
                            color: "white",
                            cursor: newSolverId[task.id] ? "pointer" : "not-allowed",
                            fontSize: "0.9em"
                          }}
                        >
                          Assign
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
