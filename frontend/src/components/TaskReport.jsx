import { useState } from "react";
import "./ComponentsStyle.css";

function TaskReport({ courseId }) {
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportData, setReportData] = useState({
    hours: "",
    studentsEvaluated: "",
    proportionOfWork: "",
    description: ""
  });

  const handleReportInputChange = (e) => {
    const { name, value } = e.target;
    setReportData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitReport = () => {
    if (!reportData.description.trim()) {
      alert("Please enter a description");
      return;
    }

    fetch("http://localhost:8080/api/reports", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa("teacher1:test"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: reportData.description,
        hours: reportData.hours ? parseFloat(reportData.hours) : null,
        studentsEvaluated: reportData.studentsEvaluated ? parseInt(reportData.studentsEvaluated) : null,
        proportionOfWork: reportData.proportionOfWork || null
      })
    })
      .then(response => {
        if (response.ok) {
          alert("Report submitted successfully!");
          setReportData({
            hours: "",
            studentsEvaluated: "",
            proportionOfWork: "",
            description: ""
          });
          setShowReportForm(false);
        } else {
          alert("Error submitting report");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Error submitting report");
      });
  };

  if (!courseId) {
    return null;
  }

  return (
    <div className="task-container">
      <button
        onClick={() => setShowReportForm(!showReportForm)}
        className="task-report-toggle-button"
      >
        {showReportForm ? "Cancel" : "+ Submit Task Report"}
      </button>

      {showReportForm && (
        <div className="task-report-form">
          <h4>Submit Work Report</h4>

          <div className="task-report-field">
            <label><strong>What was done? (Description):</strong></label>
            <textarea
              name="description"
              value={reportData.description}
              onChange={handleReportInputChange}
              placeholder="Describe the work completed"
              rows="4"
              className="task-report-textarea"
            />
          </div>

          <div className="task-report-grid">
            <div>
              <label><strong>Hours Spent:</strong></label>
              <input
                type="number"
                name="hours"
                value={reportData.hours}
                onChange={handleReportInputChange}
                placeholder="e.g., 7"
                step="0.5"
                className="task-report-input"
              />
            </div>
            <div>
              <label><strong>Students Evaluated:</strong></label>
              <input
                type="number"
                name="studentsEvaluated"
                value={reportData.studentsEvaluated}
                onChange={handleReportInputChange}
                placeholder="e.g., 350"
                className="task-report-input"
              />
            </div>
            <div>
              <label><strong>Proportion of Work:</strong></label>
              <input
                type="text"
                name="proportionOfWork"
                value={reportData.proportionOfWork}
                onChange={handleReportInputChange}
                placeholder="e.g., 1/6"
                className="task-report-input"
              />
            </div>
          </div>

          <div className="task-report-actions">
            <button
              onClick={handleSubmitReport}
              className="task-report-submit-button"
            >
              Submit Report
            </button>
            <button
              onClick={() => setShowReportForm(false)}
              className="task-report-cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskReport;
