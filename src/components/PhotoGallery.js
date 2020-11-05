import './PhotoGallery.scss';
import Photo from './Photo';

const PhotoGallery = ( {photos} ) => {
  return (
    <section className='container photoGallery'>
        {photos.map(photo =>
            <Photo key={photo.id} src={photo.urls.regular}/>
        )}
    </section>
  )
}

export default PhotoGallery;