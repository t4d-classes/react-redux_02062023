# Exercise 5

1. Utilize the `<ToolHeader>` component created during the demo to display the tool header in the `<CryptoTool>` component.

2. Create a new `<SectionHeader>` component with the following content.

```jsx
<Row className="mb-2">
  <Col className="text-start">
    <h3>Section Header Text</h3>
  </Col>
</Row>
```

3. Use the `<SectionHeader>` component in the `<StockTool>` and `<CryptoTool>` components. Place the component above the lookup forms and above the lookup results to clearly differentiate each section. Use the following text for the section headers

- Stock Tool
  - Stock Lookup
  - Stock Price
- Crypto Tool
  - Coin Lookup
  - Coin Price

4. Move the `<Card>` and its stock/coind price content to a single, parameterized component named `<CurrentAssetPrice>`. Replace the `<Card>` components in `<StockTool>` and `<CryptoTool>` with the new `<CurrentAssetPrice>` component.

5. Ensure it works!
