import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Giriş</Col>
      <Col className={props.step2 ? 'active' : ''}>Kargo</Col>
      <Col className={props.step3 ? 'active' : ''}>Ödeme</Col>
      <Col className={props.step4 ? 'active' : ''}>Sipariş Verme</Col>
    </Row>
  );
}
