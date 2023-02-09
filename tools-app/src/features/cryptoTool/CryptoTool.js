import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCoinAsync, selectCoinPrice } from './cryptoToolSlice';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { ToolHeader } from '../../components/ToolHeader';
import { SectionHeader } from '../../components/SectionHeader';
import { AssetCurrentPrice } from '../../components/AssetCurrentPrice';


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
          <ToolHeader toolName="Crypto Tool" appName="Tools App" />
        </Col>
      </Row>
      <SectionHeader headerText="Coin Lookup" />
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
      {coin.name && <>
        <SectionHeader headerText="Coin Price" />
        <Row className="mt-4">
          <Col className="text-start">
            <AssetCurrentPrice asset={coin} />
          </Col>
        </Row>
      </>}
    </Container>
  );

}