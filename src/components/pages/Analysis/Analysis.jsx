import { useNavigate } from 'react-router-dom';
import './analysis.scss';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';

const Analysis = () => {
  

  const {isLoaded, isSignedIn} = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if(isLoaded && !isSignedIn){
      navigate('/login');
    }
  },[isLoaded,isSignedIn]);

  return (
    <div className='analysissss'>
      <div className='left-div'>
        left
        
      </div>
      <div className='right-div'>
       right
      </div>
    </div>
  )
}

export default Analysis