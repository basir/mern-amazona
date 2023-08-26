import React from 'react'
import Slider from 'react-slick';
import Card from 'react-bootstrap/esm/Card'
import 'slick-carousel/slick/slick.css';
import Col from 'react-bootstrap/esm/Col';

export default function HomeSlider({products}) {

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,

        responsive: [
            {
              breakpoint: 1200, // Adjust as needed
              settings: {
                slidesToShow: 3, // Display 3 products per slide on medium screens
              },
            },
            {
              breakpoint: 768, // Adjust as needed
              settings: {
                slidesToShow: 1, // Display 1 product per slide on small screens (mobile)
              },
            },
          ],
        };
    
  return (
        <Slider {...sliderSettings} className='slider'>
            {products.map((product)=> (
            <Col xs={6} className='slider-item' key={product._id}>
                <Card>
                    <Card.Img variant="top" src={product.image} alt={product.name} />
                    <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>UGX:{product.price}</Card.Text>
              </Card.Body>
            </Card>
            </Col>
            ))}  
        </Slider>  
  )
}
