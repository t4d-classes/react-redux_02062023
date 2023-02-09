import { useState, useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectStockPrice, getStockAsync } from './stockToolSlice';

import { Button, Container, Row, Col, Form } from 'react-bootstrap';

import { ToolHeader, SectionHeader, AssetCurrentPrice } from '../../components';


export function StockTool() {

  const stock = useSelector(selectStockPrice);

  const dispatch = useDispatch();

  const [
    stockSymbolInput, // state value on each render
    setStockSymbolInput, // function to update the state value and trigger a re-render
  ] = useState('' /* initial state value on the first render */);

  const stockSymbolInputElement = useRef(null);

  const stockSymbolInputChange = useCallback((evt) => {

    // evt is the event object for the onChange event
    // target will be the input field that triggered the change event
    // value is the value of the input field
    setStockSymbolInput(evt.target.value);

  }, []);

  const lookupFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    dispatch(getStockAsync(stockSymbolInput));
    setStockSymbolInput('');

    if (stockSymbolInputElement.current) {
      stockSymbolInputElement.current.focus();
    }

  }, [dispatch, stockSymbolInput]);

  useEffect(() => {
    // only going to run on the initial render
    if (stockSymbolInputElement.current) {
      stockSymbolInputElement.current.focus();
    }
  }, [stockSymbolInputElement]);

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col className="text-start">
          <ToolHeader toolName="Stock Tool" />
        </Col>
      </Row>
      <SectionHeader headerText="Stock Lookup" />
      <Row>
        <Col>
          <Form onSubmit={lookupFormSubmit}>
            <Form.Group as={Row}>
              <Form.Label column>Stock Symbol</Form.Label>
              <Col>
                <Form.Control type="text"
                  ref={stockSymbolInputElement}
                  value={stockSymbolInput} aria-label="Set stock symbol"
                  onChange={stockSymbolInputChange} />
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Lookup
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {stock.symbol && (
        <>
          <SectionHeader headerText="Stock Price" />
          <Row className="mt-4">
            <Col className="text-start">
              <AssetCurrentPrice asset={stock} />
            </Col>
          </Row>
        </>)}
    </Container>
  );

}