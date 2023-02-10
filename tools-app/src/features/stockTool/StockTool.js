import { useState, useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectStocks,
  addToWatchListAsync,
  refreshWatchListAsync,
} from './stockToolSlice';

import { Button, Container, Row, Col, Form } from 'react-bootstrap';

import { ToolHeader, SectionHeader, AssetCurrentPrice } from '../../components';


export function StockTool() {

  const stocks = useSelector(selectStocks);

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

  const addStockToWatchListSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(addToWatchListAsync(stockSymbolInput));
      setStockSymbolInput('');
      if (stockSymbolInputElement.current) {
        stockSymbolInputElement.current.focus();
      }
    },
    [dispatch, stockSymbolInput],
  );

  useEffect(() => {
    dispatch(refreshWatchListAsync());
    if (stockSymbolInputElement.current) {
      stockSymbolInputElement.current.focus();
    }
  }, [dispatch]);

  const refreshWatchListClick = useCallback(() => {
    dispatch(refreshWatchListAsync());
  }, [dispatch]);

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
          <Form onSubmit={addStockToWatchListSubmit}>
            <Form.Group as={Row}>
              <Form.Label column>Stock Symbol</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  ref={stockSymbolInputElement}
                  value={stockSymbolInput}
                  aria-label="Set stock symbol"
                  onChange={stockSymbolInputChange} />
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Add to Watch List
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="text-start">
          <h3>Watch List</h3>
        </Col>
        <Col className="text-start">
          <Button variant="secondary" onClick={refreshWatchListClick}>
            Refresh
          </Button>
        </Col>
      </Row>
      {!stocks.length && (
        <Row>
          <Col className="text-start ms-1 mt-2">
            No stocks on the watch list.
          </Col>
        </Row>
      )}
      {stocks.map((stock) =>
        <Row className="mt-4" key={stock.name}>
          <Col className="text-start">
            <AssetCurrentPrice asset={stock} />
          </Col>
        </Row>)}
    </Container>
  );

}