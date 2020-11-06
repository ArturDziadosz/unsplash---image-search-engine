import './Photo.scss';

const Photo = ( {src} ) => {
    return (
        <li className='photoGallery__list__elem'>
            <img src={src} alt='' />
        </li>
    )
}

export default Photo;