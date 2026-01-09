import { useState } from "react";
import "./ComponentsStyle.css";

function EvaluationForm(props) {
  const [points, setPoints] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  // props: team, activity, criterion, onPointsChange (callback)
  function submitEvaluation(event) {
    event.preventDefault();
    
    if (!props.team?.id || !props.criterion?.id) return;
    
    setMessage("");
    setIsSaving(true);

    const evaluation = {
      teamId: props.team.id,
      activityId: props.activity?.id,
      criterionId: props.criterion.id,
      points: parseFloat(points) || 0,
      feedback: feedback
    };

    fetch("http://localhost:8080/api/evaluations", {
      method: "POST",
      headers: {
        "Authorization": "Basic " + btoa("teacher1:test"),
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(evaluation)
    })
      .then(function (r) {
        setIsSaving(false);
        if (!r.ok) {
          setMessage("Error saving");
          return;
        }
        setMessage("Saved");
      })
      .catch(function () {
        setIsSaving(false);
        setMessage("Error saving");
      });
  }

  function handlePointsChange(e) {
    const max = props.criterion.maxPoints || 0;
    let num = parseFloat(e.target.value) || 0;
    if (num > max) { num = max; }
    setPoints(num);
    if (typeof props.onPointsChange === 'function') {
      props.onPointsChange('TEAM', num);
    }
  }

  return (
    <form className="evaluation-form" onSubmit={submitEvaluation}>
      <h4>{props.criterion.name}</h4>
      <p>Max points: {props.criterion.maxPoints}</p>

      <input
        className="evaluation-points-given"
        type="number"
        value={points}
        onChange={handlePointsChange}
        min="0"
        max={props.criterion.maxPoints}
        step="0.5"
      />

      <textarea
        className="evaluation-feedback"
        placeholder="Feedback"
        value={feedback}
        onChange={function (e) { setFeedback(e.target.value); }}
      />

      {message && <p className="evaluation-message">{message}</p>}

      <button className="evaluation-submit" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}

export default EvaluationForm;