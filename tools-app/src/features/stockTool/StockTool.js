import { useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectStocks,
  addToWatchListAsync,
  refreshWatchListAsync,
} from './stockToolSlice';

import { Button, Container, Row, Col } from 'react-bootstrap';

import {
  ToolHeader, SectionHeader,
  AssetCurrentPrice, AssetLookup
} from '../../components';


export function StockTool() {

  const stocks = useSelector(selectStocks);

  const dispatch = useDispatch();


  const stockSymbolInputElement = useRef(null);

  const addStockToWatchListSubmit = useCallback(
    (stockSymbol) => {
      dispatch(addToWatchListAsync(stockSymbol));
      if (stockSymbolInputElement.current) {
        stockSymbolInputElement.current.focus();
      }
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(refreshWatchListAsync());
    if (stockSymbolInputElement.current) {
      stockSymbolInputElement.current.focus();
    }
  }, [dispatch]);

  const refreshWatchListClick = useCallback(() => {
    dispatch(refreshWatchListAsync());
    if (stockSymbolInputElement.current) {
      stockSymbolInputElement.current.focus();
    }
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
          <AssetLookup
            assetTypeLabel="Stock Symbol"
            onSubmit={addStockToWatchListSubmit}
            ref={stockSymbolInputElement} />
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
