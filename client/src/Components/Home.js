import './Home.css';
import ASULogo from '../utils/ASU_logo.png';
import { useNavigate } from 'react-router-dom';
export const Home = () =>
{
    const navigate = useNavigate();
    
    const handleExistingSheet = () =>
    {

    };
    const handleNewSheet = () =>
    {
    // Navigate to the "/new" route when creating a new sheet
    navigate('/new');
    };
    return(
        <div className="home">
            <img src={ASULogo} alt='ASU-LOGO' />
            <button type='button' onClick={handleExistingSheet}>Open existing sheet</button>
            <button type='button' onClick={handleNewSheet}>Create a new sheet</button>
        

        </div>

    );
}
