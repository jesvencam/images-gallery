import React from 'react';
import { Card, Button } from 'react-bootstrap';
const Welcome = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Images Gallery</Card.Title>
        <Card.Text>
          This is a simple applications that retreives photos using Unsplash
          API.
        </Card.Text>
        <Button
          variant="primary"
          href="https://unsplash.com"
          target="_blank"
        ></Button>
      </Card.Body>
    </Card>
  );
};
export default Welcome;
