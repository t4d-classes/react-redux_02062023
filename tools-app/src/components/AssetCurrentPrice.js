import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

import {
  getBackgroundIndicator, getArrowIndicator, getSignIndicator
} from '../utils';

export function AssetCurrentPrice({ asset }) {
  return (
    <Card>
      <Card.Body style={{
        backgroundColor: getBackgroundIndicator(asset.priceChange),
        color: 'white',
      }}>
        <Card.Title>
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