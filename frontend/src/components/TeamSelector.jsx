import { useEffect, useState } from "react";
import "./ComponentsStyle.css";

function TeamSelector(props) {
  // props: onSelect, selected, enabled
  const [teams, setTeams] = useState([]);

  useEffect(function () {
    fetch("http://localhost:8080/api/teams", {
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
        setTeams(Array.isArray(data) ? data : []);
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }, []);

  function handleSelect(team) {
    if (typeof props.onSelect === 'function') {
      props.onSelect(team);
    }
  }

  return (
    <div className="team-selector">
      {teams.length === 0 ? <p>No teams</p> : null}
      {teams.map(t => (
        <button key={t.id}
          disabled={!props.enabled}
          onClick={function () { handleSelect(t); }}
          className={props.selected?.id === t.id ? 'team-button-selected' : ''}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}

export default TeamSelector;
