import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Row, Container, Col } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
      console.log(res);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => getSavedImages(), []);

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imagesToBeSaved.saved = true;
    try{
      const res = await axios.post(`${API_URL}/images`,imageToBeSaved);
      if (res.data?.inserted_id){
        setImages(images.map((image) => image.id=== id? {...image,saved:true}:image));
      }
    }catch (error) {
      console.log('Error saving image:', error);
    }
  }
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);
      console.log(res);
    } catch (error) {
      console.log('Error fetching data from Unsplash:', error);
    }
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
                  saveImage={handleSaveImage}
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
