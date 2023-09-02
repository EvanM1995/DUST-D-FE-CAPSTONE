import { getSingleAlbum } from './albumData';
import { getSingleGenre } from './genreData';

const viewAlbumDetails = (albumFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAlbum(albumFirebaseKey)
    .then((albumObject) => {
      getSingleGenre(albumObject.genre)
        .then((genreObject) => {
          resolve({ genreObject, ...albumObject });
        });
    }).catch((error) => reject(error));
});

export default viewAlbumDetails;
