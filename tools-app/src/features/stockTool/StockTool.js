import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {selectStockPrice, getStockAsync} from './stockToolSlice';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import {
  getBackgroundIndicator, getArrowIndicator, getSignIndicator
} from '../../utils';

export function StockTool() {

  const stock = useSelector(selectStockPrice);
    
  const dispatch = useDispatch();

  const [
    stockSymbolInput, // state value on each render
    setStockSymbolInput, // function to update the state value and trigger a re-render
  ] = useState('' /* initial state value on the first render */);

  const stockSymbolInputChange = useCallback((evt) => {

    // evt is the event object for the onChange event
    // target will be the input field that triggered the change event
    // value is the value of the input field
    setStockSymbolInput(evt.target.value);

  }, []);

  const lookupButtonClick = useCallback(() => {
    dispatch(getStockAsync(stockSymbolInput));
  }, [dispatch, stockSymbolInput]);

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col className="text-start">
          <h2>Stock Tool</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column>Stock Symbol</Form.Label>
              <Col>
                <Form.Control type="text"
                  value={stockSymbolInput} aria-label="Set stock symbol"
                  onChange={stockSymbolInputChange} />
              </Col>
              <Col>
                <Button variant="primary" onClick={lookupButtonClick}>
                  Lookup
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {stock.symbol && (
        <Row className="mt-4">
          <Col className="text-start">
            <Card>
              <Card.Body
                style={{
                  backgroundColor: getBackgroundIndicator(stockPriceChange),
                  color: 'white',
                }}>
                <Card.Title>
                  <b>
                    {stock.symbol} {stock.close}
                    {getArrowIndicator(stockPriceChange)}
                  </b>
                  <span className="ms-4">
                    {getSignIndicator(stockPriceChange)}
                    {stockPriceChange.toFixed(2)}
                  </span>
                  <span className="ms-2">
                    ({getSignIndicator(stockPriceChange)}
                    {stockPricePercentChange.toFixed(2)}%)
                  </span>
                </Card.Title>
                <Card.Text>Last Updated: {stock?.lastUpdated}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );

}