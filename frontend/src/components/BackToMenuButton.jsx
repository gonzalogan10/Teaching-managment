import { useNavigate } from 'react-router-dom';
import "./ComponentsStyle.css";

export default function BackToMenuButton() {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate('/menu')}>
            Back to Menu
        </button>
    );
}