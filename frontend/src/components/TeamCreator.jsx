import { useState } from "react";
import "./ComponentsStyle.css";

/**
 * TeamCreator component allows teachers to create new teams within a specific course.
 * It includes a form with a field for the team name, and handles form submission
 * to create the team via a POST request to the backend API. 
 * Upon successful creation, it resets the form and notifies the parent component via onTeamCreated prop.
 */
function TeamCreator({ courseId, onTeamCreated }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateTeam = () => {
    if (!formData.name.trim()) {
      alert("Please enter a team name");
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8080/api/teams/course/${courseId}`, {
      method: "POST",
      headers: {
        "Authorization": "Basic " + btoa("teacher1:test"),
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        name: formData.name
      })
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to create team');
        return response.json();
      })
      .then(newTeam => {
        alert("Team created successfully!");
        setFormData({
          name: ""
        });
        setShowForm(false);
        if (onTeamCreated) {
          onTeamCreated(newTeam);
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Error creating team: " + error.message);
      })
      .finally(() => setLoading(false));
  };

  if (!courseId) {
    return null;
  }

  return (
    <div className="creator-container">
      {!showForm ? (
        <button 
          className="create-button"
          onClick={() => setShowForm(true)}
        >
          ➕ Create New Team
        </button>
      ) : (
        <div className="form-container">
          <h3>Create New Team</h3>
          
          <label>
            Team Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter team name"
            />
          </label>

          <div className="button-group">
            <button 
              className="save-button"
              onClick={handleCreateTeam}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Team"}
            </button>
            <button 
              className="cancel-button"
              onClick={() => {
                setShowForm(false);
                setFormData({ name: "" });
              }}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamCreator;
