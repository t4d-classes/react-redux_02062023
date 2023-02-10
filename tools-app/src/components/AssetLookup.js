import {
  useState,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { Button, Row, Col, Form } from 'react-bootstrap';



export const AssetLookup = forwardRef((props, ref) => {

  const [
    assetNameInput,
    setAssetNameInput,
  ] = useState('');

  const assetNameInputChange = useCallback((evt) => {
    setAssetNameInput(evt.target.value);
  }, []);

  const assetNameInputElement = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (assetNameInputElement.current) {
        assetNameInputElement.current.focus();
      }
    },
  }));

  const submitForm = useCallback((evt) => {

    evt.preventDefault();
    setAssetNameInput('');
    props.onSubmit(assetNameInput);

  }, [props, assetNameInput]);

  return (
    <Form style={{ maxWidth: '500px' }} onSubmit={submitForm} aria-label="form">
      <Form.Group as={Row}>
        <Form.Label column>{props.assetTypeLabel}</Form.Label>
        <Col>
          <Form.Control
            type="text"
            ref={assetNameInputElement}
            value={assetNameInput}
            aria-label={`Set ${props.assetTypeLabel}`}
            onChange={assetNameInputChange} />
        </Col>
        <Col>
          <Button variant="primary" type="submit">
            Add to Watch List
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );


});