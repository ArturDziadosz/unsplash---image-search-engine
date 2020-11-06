import { useRef, useState } from 'react';
import './Photo.scss';

const Photo = ( {user, src, srcBigger} ) => {

  const [isBig, setIsBig] = useState(false);

  const handleBigger = () => {
    setIsBig(!isBig);
    window.scrollTo(0,0);
  }

  return (
    <li className='photoGallery__list__elem'>
      <img 
        className='list__elem__img'
        src={src} 
        alt='' 
        onClick={handleBigger} 
      />
      {isBig && 
        <div className='list__elem__container'>
          <div className='elem__container__user'>
            <img src={user.profile_image.small} alt='' />
            <p>{user.name}</p>
            {user.twitter_username && <p>@{user.twitter_username}</p>}
          </div>
          <img 
            className='elem__container__img'
            src={srcBigger} 
            alt='' 
            onClick={handleBigger} 
          />
        </div>
      }
    </li>
  )
}

export default Photo;