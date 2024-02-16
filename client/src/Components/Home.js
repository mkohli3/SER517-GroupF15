import './Home.css';
import { useNavigate } from 'react-router-dom';
import ASULogo from '../utils/ASU_logo.png';
export const Home = () =>
{
    const navigate = useNavigate();

    const handleExistingSheet = () =>
    {

    };
    const handleNewSheet = () =>
    {
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