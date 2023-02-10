import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Row, Col } from 'react-bootstrap';

import { selectActiveStock, setActiveStockSymbol } from './stockToolSlice';

function ListValue(props) {
  return (
    <li style={{ padding: 0, margin: 0 }}>
      <Row>
        <Col xs={3} style={{ fontWeight: 'bold' }}>
          {props.name}
        </Col>
        <Col xs={9} className="text-end">
          {props.value}
        </Col>
      </Row>
    </li>
  );
}

function formatCurrency(value) {
  return '$' + value.toFixed(2);
}


export function StockDetail() {

  const activeStock = useSelector(selectActiveStock);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.stockSymbol !== activeStock?.symbol) {
      dispatch(setActiveStockSymbol(params.stockSymbol));
    }
  }, [params, dispatch, activeStock]);

  return (
    <>
      <Row className="mb-4">
        <Col className="text-start">
          <header>
            <h2>Stock Details</h2>
          </header>
        </Col>
      </Row>
      {!activeStock ? (
        <Row>
          <Col>
            <p>
              The {params.stockSymbol} stock in not
              listed in the watch list. Please select a
              stock from the watch list.
            </p>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col className="text-start">
              <header>
                <h3>{activeStock.symbol}</h3>
              </header>
            </Col>
          </Row>
          <Row className="mt-4" style={{ maxWidth: '400px' }}>
            <Col className="text-start">
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                <ListValue
                  name="Open"
                  value={formatCurrency(activeStock.open)}
                />
                <ListValue
                  name="Close"
                  value={formatCurrency(activeStock.close)}
                />
                <ListValue
                  name="High"
                  value={formatCurrency(activeStock.high)}
                />
                <ListValue name="Low" value={formatCurrency(activeStock.low)} />
              </ul>
            </Col>
            <Col className="text-start">
              <ul style={{ listStyleType: 'none' }}>
                <ListValue name="Vol" value={activeStock.volume} />
                <ListValue
                  name="VWAP"
                  value={formatCurrency(activeStock.volumeWeightedAveragePrice)}
                />
                <ListValue
                  name="Trades"
                  value={activeStock.numberOfTransactions}
                />
              </ul>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="text-start">
              <p>Last Updated: {activeStock.lastUpdated}</p>
            </Col>
          </Row>
        </>
      )}
    </>
  );



}