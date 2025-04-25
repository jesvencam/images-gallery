import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Row, Container, Col } from 'react-bootstrap';


const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetch(`${API_URL}/new-image?query=${word}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImages([{ ...data, title: word }, ...images]);
      })
      .catch((error) => {
        console.error('Error fetching data from Unsplash:', error);
      });
    setWord('');
  };

  const handleDeleteImage = (imageId) => {
    setImages(images.filter((image) => image.id !== imageId));
  };

  return (
    <div className="App">
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container>
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i} className="pb-3">
                <ImageCard
                  key={i}
                  image={image}
                  deleteImage={handleDeleteImage}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
      {/* {!!images.length && <ImageCard image={images[0]} />} */}
      {/* {images.length > 1 && <ImageCard image={images[1]} />} */}
    </div>
  );
};

export default App;
