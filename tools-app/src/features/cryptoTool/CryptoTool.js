import { useState, useCallback } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


export function CryptoTool() {

  const [
    coinNameInput, // state value on each render
    setCoinNameInput, // function to update the state value and trigger a re-render
  ] = useState('' /* initial state value on the first render */);

  const coinNameInputChange = useCallback((evt) => {

    // evt is the event object for the onChange event
    // target will be the input field that triggered the change event
    // value is the value of the input field
    setCoinNameInput(evt.target.value);

  }, []);


  return (
    <Container fluid>
      <Row className="mb-4">
        <Col className="text-start">
          <h2>Crypto Tool</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column>Coin Name</Form.Label>
              <Col>
                <Form.Control type="text"
                  value={coinNameInput} aria-label="Set coin name"
                  onChange={coinNameInputChange} />
              </Col>
              <Col>
                <Button variant="primary">Lookup</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {coinNameInput && <Row className="mt-4">
        <Col className="text-start">
          <Card>
            <Card.Body>
              <Card.Title>
                <b>{coinNameInput}</b>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>  
      </Row>}
    </Container>
  );

}