import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import CourseSelector from "../components/CourseSelector";
import ActivitySelector from "../components/ActivitySelector";
import TeamSelector from "../components/TeamSelector";
import CriterionFilter from "../components/CriterionFilter";
import EvaluationForm from "../components/EvaluationForm";
import TotalsPanel from "../components/TotalsCalculator";
import "./Screen.css";

function EvaluationScreen() {
  const [courseId, setCourseId] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [criteria, setCriteria] = useState([]);
  const [filteredCriteria, setFilteredCriteria] = useState([]);
  const [totalsByCriterion, setTotalsByCriterion] = useState({});
  const navigate = useNavigate();

  // Reset activity and team when course changes
  const handleCourseChange = (newCourseId) => {
    setCourseId(newCourseId);
    setSelectedActivity(null);
    setSelectedTeam(null);
    setCriteria([]);
    setFilteredCriteria([]);
    setTotalsByCriterion({});
  };

  // Load criteria when activity changes
  const handleActivityChange = function (activity) {
    setSelectedActivity(activity);
    setSelectedTeam(null);
    setTotalsByCriterion({});
    setCriteria([]);
    setFilteredCriteria([]);
    
    if (activity && activity.id) {
      fetch("http://localhost:8080/api/criteria", {
        method: "GET",
        headers: {
          "Authorization": "Basic " + btoa("teacher1:test"),
          "Content-Type": "application/json"
        },
        credentials: 'include'
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Failed to fetch');
          return response.json();
        })
        .then(function (data) {
          setCriteria(Array.isArray(data) ? data : []);
          setFilteredCriteria(Array.isArray(data) ? data : []);
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    }
  };

  // Handle points change from forms. It updates totalsByCriterion state.
  function handlePointsChange(criterionId, type, value) {
    const updated = Object.assign({}, totalsByCriterion);
    if (!updated[criterionId]) { updated[criterionId] = { team: 0, studentsSum: 0 }; }
    if (type === 'TEAM') { updated[criterionId].team = isNaN(value) ? 0 : value; }
    if (type === 'STUDENTS_SUM') { updated[criterionId].studentsSum = isNaN(value) ? 0 : value; }
    setTotalsByCriterion(updated);
  }

  // When team changes, just set the team (keep existing form values)
    const handleTeamChange = (team) => setSelectedTeam(team);
    //uses a lambda function. It means that when the team changes,
    // the function will be called with the new team as argument, and it will set the selectedTeam state to that new team.

  // Render evaluation forms for filtered criteria. Rendering is creating React elements.
    function renderForms() {
        const forms = [];
        for (let i = 0; i < filteredCriteria.length; i++) {
            const crit = filteredCriteria[i];
            forms.push(
                <EvaluationForm
                    key={crit.id}
                    team={selectedTeam}
                    activity={selectedActivity}
                    criterion={crit}
                    onPointsChange={function (type, value) { handlePointsChange(crit.id, type, value); }}
                />
            );
        }
        return forms;
    }

  return (
    <div>

      <button className="go-to-page-button" onClick={() => navigate('/menu')}>
        Back to Menu
      </button>

      <h1>Evaluate teams</h1>

      <div className="evaluation-screen-section">
        <h3>Course</h3>
        <CourseSelector onSelect={handleCourseChange} />
      </div>

      {courseId && (
        <div className="evaluation-screen-section">
          <h3>Activity</h3>
          <ActivitySelector onSelect={handleActivityChange} selected={selectedActivity} courseId={courseId} />
        </div>
      )}

      {selectedActivity && (
        <div className="evaluation-screen-section">
          <h3>Team</h3>
          <TeamSelector onSelect={handleTeamChange} selected={selectedTeam} enabled={true} courseId={courseId} />
        </div>
      )}

      {selectedActivity && criteria.length > 0 && (
        <div className="evaluation-screen-section">
          <CriterionFilter criteria={criteria} onFilterChange={setFilteredCriteria} />
        </div>
      )}

      {selectedTeam && selectedActivity && (
        <div className="evaluation-screen-section">
          {renderForms()}
        </div>
      )}

      <TotalsPanel totalsByCriterion={totalsByCriterion} />
    </div>
  );
}

export default EvaluationScreen;
