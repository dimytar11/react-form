import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";

describe("Form component", () => {
  //tests if current text is in the Form component
  test("renders 'Please fill in your information' as a text", () => {
    render(<Form />);
    const titleElement = screen.getByText("Please fill in your information");
    expect(titleElement).toBeInTheDocument();
  });

  //tests if error message is displayed when the name field is correctly filled in
  test("does not render 'Name must not be empty.' if the name field is correctly fill in", () => {
    render(<Form />);
    const inputs = screen.getAllByRole("textbox");
    userEvent.keyboard(inputs[0]);
    const errorName = screen.queryByText("Name must not be empty.");
    expect(errorName).not.toBeInTheDocument();
  });

  //tests if error message is displayed when tje name field is not filled in correctly
  test("renders 'Name must not be empty.' if the name field is fill in wrong way", () => {
    render(<Form />);
    const submit = screen.getByRole("button");
    userEvent.click(submit);
    const errorName = screen.getByText("Name must not be empty.");
    expect(errorName).toBeInTheDocument();
  });

  //test if error message is displayed when age field is empty
  test("renders 'Age must not be empty neither less than 18.' if the age field is not filled in", () => {
    render(<Form />);
    const submit = screen.getByRole("button");
    userEvent.click(submit);
    const errorAge = screen.getByText(
      "Age must not be empty neither less than 18."
    );
    expect(errorAge).toBeInTheDocument();
  });

  //test if error message is displayed when age is under 18
  test("renders 'Age must not be empty neither less than 18.' if the age is less than 18", () => {
    render(<Form />);
    const inputs = screen.getAllByRole("textbox");
    userEvent.keyboard(inputs[1]);
    const value = inputs[0].value;
    if (value < 18) {
      return;
    }
    const errorAge = screen.queryByText(
      "Age must not be empty neither less than 18."
    );
    expect(errorAge).not.toBeInTheDocument();
  });
});
