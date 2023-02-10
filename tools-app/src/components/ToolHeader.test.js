import React from "react";

import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import { ToolHeader } from "./ToolHeader";

test("snapshot ToolHeader component", () => {
  expect(
    renderer.create(
      <ToolHeader appName="The Tools" toolName="Test Tool" />
    ).toJSON()
  ).toMatchSnapshot();
});

describe("ToolHeader component", () => {
  test("renders ToolHeader component", () => {
    render(
      <ToolHeader appName="The Tools" toolName="Test Tool" />
    );

    expect(screen.getByText("The Tools")).toBeInTheDocument();
    expect(screen.getByText("Test Tool")).toBeInTheDocument();

    return screen.findAllByRole('heading').then((elements) => {
      expect(elements.length).toEqual(2);
      expect(elements[0].textContent).toEqual("The Tools");
      expect(elements[1].textContent).toEqual("Test Tool");
    });
  });
});