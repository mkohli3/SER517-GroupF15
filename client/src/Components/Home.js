import './Home.css';
import ASULogo from '../utils/ASU_logo.png';
export const Home = () =>
{
    const handleExistingSheet = () =>
    {

    };
    const handleNewSheet = () =>
    {

    };
    return(
        <div className="home">
            <img src={ASULogo} alt='ASU-LOGO' />
            <button type='button' onClick={handleExistingSheet}>Open existing sheet</button>
            <button type='button' onClick={handleNewSheet}>Create a new sheet</button>
        

        </div>

    );
}