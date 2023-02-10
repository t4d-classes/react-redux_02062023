import { useCallback } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import {
  getBackgroundIndicator, getArrowIndicator, getSignIndicator
} from '../utils';

export function AssetCurrentPrice({ asset, onRemove, onView }) {

  const removeAssetClick = useCallback(() => {
    onRemove(asset.name);
  }, [onRemove, asset]);

  const viewAssetClick = useCallback(() => {
    onView(asset.name);
  }, [onView, asset]);

  return (
    <Card>
      <Card.Body style={{
        backgroundColor: getBackgroundIndicator(asset.priceChange),
        color: 'white',
      }}>
        <Card.Title>
          <Row>
            <Col xs={9}>
              <b>
                {asset.name} {asset.price}
                {getArrowIndicator(asset.priceChange)}
              </b>
              <span className="ms-4">
                {getSignIndicator(asset.priceChange)}
                {asset.priceChange.toFixed(2)}
              </span>
              <span className="ms-2">
                ({getSignIndicator(asset.priceChange)}
                {asset.pricePercentChange.toFixed(2)}%)
              </span>
            </Col>
            <Col xs={3} className="text-end">
              {onView && <Button className="me-2" variant='light' onClick={viewAssetClick}>
                <i className="bi bi-file-bar-graph"></i>
              </Button>}
              {onRemove && <Button variant='light' onClick={removeAssetClick}>
                <i className="bi bi-trash"></i>
              </Button>}
            </Col>
          </Row>

        </Card.Title>
        <Card.Text>
          Last Updated: {asset.lastUpdated}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

AssetCurrentPrice.propTypes = {
  asset: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    priceChange: PropTypes.number.isRequired,
    pricePercentChange: PropTypes.number.isRequired,
    lastUpdated: PropTypes.string.isRequired,
  }).isRequired,
};