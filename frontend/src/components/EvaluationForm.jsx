import { useState, useEffect } from "react";
import "./ComponentsStyle.css";

function EvaluationForm(props) {
  const [points, setPoints] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [checkRefresh, setCheckRefresh] = useState(0);

  // Check if this criterion is already evaluated
  useEffect(() => {
    if (!props.team?.id || !props.criterion?.id) return;

    fetch(`http://localhost:8080/api/evaluations/criterion/${props.criterion.id}/team/${props.team.id}`, {
      method: "GET",
      headers: {
        "Authorization": "Basic " + btoa("teacher1:test"),
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to check evaluation');
        return response.json();
      })
      .then(data => {
        setIsEvaluated(data);
      })
      .catch(error => {
        console.error("Error checking evaluation:", error);
        setIsEvaluated(false);
      });
  }, [props.team?.id, props.criterion?.id, checkRefresh]);

  // props: team, activity, criterion, onPointsChange (callback)
  function submitEvaluation(event) {
    event.preventDefault();
    
    if (!props.team?.id || !props.criterion?.id) return;
    
    // Prevent evaluation if already evaluated
    if (isEvaluated) {
      setMessage("This criterion is already evaluated");
      return;
    }
    
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
          return r.text().then(text => {
            setMessage("Error: " + text || "Failed to save");
          });
        }
        setMessage("Saved");
        // Mark as evaluated and refresh check
        setIsEvaluated(true);
        setCheckRefresh(checkRefresh + 1);
        // Reset form
        setPoints(0);
        setFeedback("");
        // Call callback to refresh evaluation list
        if (typeof props.onSaved === 'function') {
          props.onSaved();
        }
      })
      .catch(function (error) {
        setIsSaving(false);
        setMessage("Error: " + error.message);
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
      
      {isEvaluated && (
        <div className="evaluation-already-evaluated">
          ✓ Already evaluated
        </div>
      )}

      <input
        className="evaluation-points-given"
        type="number"
        value={points}
        onChange={handlePointsChange}
        min="0"
        max={props.criterion.maxPoints}
        step="0.5"
        disabled={isEvaluated}
      />

      <textarea
        className="evaluation-feedback"
        placeholder="Feedback"
        value={feedback}
        onChange={function (e) { setFeedback(e.target.value); }}
        disabled={isEvaluated}
      />

      {message && <p className="evaluation-message">{message}</p>}

      <button className="evaluation-submit" disabled={isSaving || isEvaluated}>
        {isEvaluated ? 'Already Evaluated' : (isSaving ? 'Saving...' : 'Save')}
      </button>
    </form>
  );
}

export default EvaluationForm;