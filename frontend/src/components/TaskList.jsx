import { useEffect, useState } from "react";
import "./ComponentsStyle.css";

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
    <div className="task-list-container">
      <h3 className="task-list-header">
        Tasks
      </h3>

      {error && <p className="task-list-error">Error loading tasks: {error}</p>}

      {tasks.length === 0 && !error ? (
        <p className="task-list-empty">No tasks for this activity yet</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li
              key={task.id}
              className={`task-item ${selectedTaskId === task.id ? 'selected' : ''}`}
            >
              <div onClick={() => {
                const newId = selectedTaskId === task.id ? null : task.id;
                if (onTaskSelect) {
                  onTaskSelect(newId);
                }
              }}>
                <div className="task-header">
                  <div className="task-title-section">
                    <strong className="task-title">
                      {task.taskOrder}. {task.title}
                    </strong>
                    <div className="task-type">
                      {getTaskTypeLabel(task.type || 'LECTURE')}
                    </div>
                  </div>
                  <div className="task-solver-info">
                    {task.mainSolver ? (
                      <span className="task-has-solver">
                        👤 {task.mainSolver.name}
                      </span>
                    ) : (
                      <span className="task-no-solver">
                        ⚠️ No Main Solver
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {selectedTaskId === task.id && (
                <div className="task-details">
                  {task.description && (
                    <p className="task-description">
                      <strong>Description:</strong> {task.description}
                    </p>
                  )}

                  <div className="task-dates-grid">
                    <div>
                      <p className="task-date-info">
                        <strong>Start Date:</strong> {formatDate(task.startDate)}
                      </p>
                    </div>
                    <div>
                      <p className="task-date-info">
                        <strong>End Date:</strong> {formatDate(task.endDate)}
                      </p>
                    </div>
                  </div>

                  <div className="task-solvers-section">
                    <strong className="task-solvers-header">
                      Solvers ({task.solvers ? task.solvers.length : 0})
                    </strong>

                    {task.mainSolver && (
                      <div className="task-main-solver">
                        <strong>Main Solver:</strong> {task.mainSolver.name}
                      </div>
                    )}

                    {task.solvers && task.solvers.length > 0 && (
                      <div className="task-other-solvers-section">
                        <p className="task-other-solvers-label">
                          <strong>Other Solvers:</strong>
                        </p>
                        {task.solvers.filter(s => s.id !== task.mainSolver?.id).map(solver => (
                          <div key={solver.id} className="task-other-solver-item">
                            • {solver.name}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="task-assign-section">
                      <p className="task-assign-label">
                        <strong>Become Main Solver:</strong>
                      </p>
                      <div className="task-assign-controls">
                        <select
                          value={newSolverId[task.id] || ""}
                          onChange={(e) => setNewSolverId({ ...newSolverId, [task.id]: e.target.value })}
                          className="task-assign-select"
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
                          className="task-assign-button"
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
