import React from 'react';
import Carousel from 'react-material-ui-carousel';
import image1 from '../Doc1.jpeg';
import image2 from '../Doc2.jpeg';
import image3 from '../Doc4.jpeg';


// Assuming you have an 'items' array defined somewhere
const items = [image3, image1, image2];

const MyCarousel = () => {
    return (
      <Carousel >
        {items.map((item, index) => (
          <div key={index}>
            <img src={item} alt={`carousel-item-${index}`} style={{ width: '100%', height: '85vh' }} />
            {/* You can customize the content of each carousel item here */}
          </div>
        ))}
      </Carousel>
    );
  };

export default MyCarousel;


