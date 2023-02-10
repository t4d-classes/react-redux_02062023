import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { AssetLookup } from './AssetLookup';

test('Snapshot ToolHeader Component', () => {
  expect(
    renderer.create(<AssetLookup buttonText="Submit" />).toJSON(),
  ).toMatchSnapshot();
});

describe('Asset Lookup', () => {
  let submitAssetLookupSpy;

  beforeEach(() => {
    submitAssetLookupSpy = jest.fn();
  });

  const renderComponent = () => {
    render(
      <AssetLookup
        buttonText="Submit"
        onSubmit={submitAssetLookupSpy}
        ref={{ current: null }}
      />,
    );
  };

  test('Submit asset lookup', () => {
    const assetName = 'MSFT';

    renderComponent();

    const assetNameInput = screen.getByRole('textbox');

    fireEvent.change(assetNameInput, { target: { value: assetName } });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(submitAssetLookupSpy).toHaveBeenCalledWith(assetName);
  });
});
