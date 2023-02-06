import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export function CryptoTool() {

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
                  value="" aria-label="Set coin name" />
              </Col>
              <Col>
                <Button variant="primary">Lookup</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );

}