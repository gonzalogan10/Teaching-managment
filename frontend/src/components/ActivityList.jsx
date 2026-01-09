import { useEffect, useState } from "react";
import "./ComponentsStyle.css";

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
    <div className="list-container">
    <h2 className="activity-list-header">
        Activities in Course
    </h2>
    
    {error && <p className="activity-list-error">Error loading activities: {error}</p>}
    
    {activities.length === 0 && !error ? (
        <p className="activity-list-empty">No activities in this course yet</p>
    ) : (
        <ul className="activity-list">
        {activities.map(activity => (
            <li
            key={activity.id}
            onClick={() => handleActivityClick(activity.id)}
            className={`activity-item ${selectedActivityId === activity.id ? 'selected' : ''}`}
            >
            <div className="activity-header">
                <div>
                <strong className="activity-title">
                    {activity.name}
                </strong>
                <div className="activity-type">
                    {getActivityTypeLabel(activity.type)}
                </div>
                </div>
            </div>

            {selectedActivityId === activity.id && (
                <div className="activity-details">
                <p className="activity-info">
                    <strong>Type:</strong> {getActivityTypeLabel(activity.type)}
                </p>
                <p className="activity-info">
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
