import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <Container fluid>
      <Row>
        <Col className="text-start">
          <h3>Counter Tool</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="warning"
            className="m-4"
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}>
            -
          </Button>
          <span>{count}</span>
          <Button
            variant="success"
            className="m-4"
            aria-label="Increment value"
            onClick={() => dispatch(increment())}>
            +
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={6}>
          <Form>
            <Form.Group as={Row} className="m-2">
              <Form.Label column>Amount</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={incrementAmount}
                  aria-label="Set increment amount"
                  onChange={(e) => setIncrementAmount(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Form>
        </Col>
        <Col xs={6}>
          <Button
            variant="primary"
            className="m-2"
            onClick={() => dispatch(incrementByAmount(incrementValue))}>
            Add Amount
          </Button>
          <Button
            variant="secondary"
            className="m-2"
            onClick={() => dispatch(incrementAsync(incrementValue))}>
            Add Async
          </Button>
          <Button
            variant="danger"
            className="m-2"
            onClick={() => dispatch(incrementIfOdd(incrementValue))}>
            Add If Odd
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
