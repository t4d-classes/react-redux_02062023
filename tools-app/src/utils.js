export function getBackgroundIndicator(valueChange) {
  if (valueChange > 0) {
    return 'green';
  } else if (valueChange < 0) {
    return 'crimson';
  } else {
    return 'blue'; // no change
  }
}

export function getArrowIndicator(valueChange) {
  if (valueChange < 0) {
    // return React.createElement('i', { className: 'bi bi-arrow-down-right' }, null);
    return <i className="bi bi-arrow-down-right"></i>;
  } else if (valueChange > 0) {
    // return React.createElement('i', { className: 'bi bi-arrow-up-right' }, null);
    return <i className="bi bi-arrow-up-right"></i>;
  }
}

export function getSignIndicator(valueChange) {
  if (valueChange > 0) {
    return '+';
  }
}
