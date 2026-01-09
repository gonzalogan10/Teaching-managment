import "./ComponentsStyle.css";

function TotalsCalculator(props) {
  // props: totalsByCriterion (object)
  // Recalc totals
  let teamTotal = 0;
  let studentsTotal = 0;
  for (const key in props.totalsByCriterion) {
    if (Object.prototype.hasOwnProperty.call(props.totalsByCriterion, key)) {
      teamTotal = teamTotal + (props.totalsByCriterion[key].team || 0);
      studentsTotal = studentsTotal + (props.totalsByCriterion[key].studentsSum || 0);
    }
  }

  return (
    <div className="totals-panel">
      <h4>Session totals</h4>
      <p><strong>Team:</strong> {teamTotal}</p>
      <p><strong>Students:</strong> {studentsTotal}</p>
    </div>
  );
}

export default TotalsCalculator;
