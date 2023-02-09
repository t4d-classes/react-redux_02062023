import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCoinAsync, selectCoinPrice } from './cryptoToolSlice';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import {
  getBackgroundIndicator, getArrowIndicator, getSignIndicator
} from '../../utils';


export function CryptoTool() {

  const coin = useSelector(selectCoinPrice);
  const dispatch = useDispatch();

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

  const lookupButtonClick = useCallback(() => {
    dispatch(getCoinAsync(coinNameInput));
  }, [dispatch, coinNameInput]);


  return (
    <Container fluid>
      <Row className="mb-4">
        <Col className="text-start">
          <header>
            <h2>Crypto Tool</h2>
          </header>
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
                <Button variant="primary" onClick={lookupButtonClick}>Lookup</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {coin.name && <Row className="mt-4">
        <Col className="text-start">
          <Card>
            <Card.Body style={{
              backgroundColor: getBackgroundIndicator(coin.priceChange),
              color: 'white',
            }}>
              <Card.Title>
                <b>
                  {coin.name} {coin.price}
                  {getArrowIndicator(coin.priceChange)}
                </b>
                <span className="ms-4">
                  {getSignIndicator(coin.priceChange)}
                  {coin.priceChange.toFixed(2)}
                </span>
                <span className="ms-2">
                  ({getSignIndicator(coin.priceChange)}
                  {coin.percentPriceChange.toFixed(2)}%)
                </span>
              </Card.Title>
              <Card.Text>
                Last Updated: {coin.lastUpdated}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>}
    </Container>
  );

}