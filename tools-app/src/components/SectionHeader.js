import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function SectionHeader({ headerText }) {

  return (
    <Row className="mb-2">
      <Col className="text-start">
        <h3>{headerText}</h3>
      </Col>
    </Row>
  );


}