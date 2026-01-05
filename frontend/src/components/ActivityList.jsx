import { useEffect, useState } from "react";

function ActivityList({ courseId, onActivitySelect, selectedActivityId }) {
const [activities, setActivities] = useState([]);
const [error, setError] = useState(null);

useEffect(() => {
    if (!courseId) return;

    fetch(`http://localhost:8080/api/activities/course/${courseId}`, {
    method: "GET",
    headers: {
        "Authorization": "Basic " + btoa("teacher1:test"),
        "Content-Type": "application/json"
    },
    credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Failed to fetch activities');
        }
        return response.json();
    })
    .then(data => {
        console.log('Activities loaded:', data);
        setActivities(Array.isArray(data) ? data : []);
    })
    .catch(error => {
        console.error("Error fetching activities:", error);
        setError(error.message);
    });
}, [courseId]);

if (!courseId) {
    return null;
}

const getActivityTypeLabel = (type) => {
    const typeMap = {
    'LECTURE': '📚 Lecture',
    'PROJECT': '📊 Project',
    'EXAM': '✏️ Exam',
    'MIDTERM': '📝 Midterm Test'
    };
    return typeMap[type] || type;
};

const handleActivityClick = (activityId) => {
    if (onActivitySelect) {
        onActivitySelect(activityId);
    }
};

return (
    <div style={{ marginTop: "30px", marginBottom: "30px" }}>
    <h2 style={{ color: "#c1bdbdff", borderBottom: "2px solid #999", paddingBottom: "10px" }}>
        Activities in Course
    </h2>
    
    {error && <p style={{ color: 'red' }}>Error loading activities: {error}</p>}
    
    {activities.length === 0 && !error ? (
        <p style={{ color: "#828282ff", fontSize: "1.1em" }}>No activities in this course yet</p>
    ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
        {activities.map(activity => (
            <li
            key={activity.id}
            onClick={() => handleActivityClick(activity.id)}
            style={{
                padding: "15px",
                margin: "8px 0",
                backgroundColor: selectedActivityId === activity.id ? "#d1e7f5" : "#e8e8e8",
                borderLeft: `5px solid ${selectedActivityId === activity.id ? "#1976d2" : "#999"}`,
                cursor: "pointer",
                borderRadius: "4px",
                transition: "all 0.2s ease",
                boxShadow: selectedActivityId === activity.id ? "0 2px 6px rgba(0,0,0,0.15)" : "none"
            }}
            >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                <strong style={{ fontSize: "1.1em", color: "#333" }}>
                    {activity.name}
                </strong>
                <div style={{ color: "#666", fontSize: "0.9em", marginTop: "5px" }}>
                    {getActivityTypeLabel(activity.type)}
                </div>
                </div>
            </div>

            {selectedActivityId === activity.id && (
                <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #999" }}>
                <p style={{ color: "#666", margin: "5px 0" }}>
                    <strong>Type:</strong> {getActivityTypeLabel(activity.type)}
                </p>
                <p style={{ color: "#666", margin: "5px 0" }}>
                    <strong>ID:</strong> {activity.id}
                </p>
                </div>
            )}
            </li>
        ))}
        </ul>
    )}
    </div>
);
}

export default ActivityList;
