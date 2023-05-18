// TODO: Get over 80% test coverage for LoginForm component

import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import SignUpForm from "../SignUpForm";
import * as nextRouter from "next/router";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));
// Silences warning related to i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: { changeLanguage: () => new Promise(() => null) },
    t: (str: string) => str,
  }),
}));

const formInputLabels = [
  "users.form.email",
  "users.form.name",
  "users.form.password",
  "users.form.confirmPassword",
];

describe("SignUpForm Tests", () => {
  it("Should render all SignUpForm inputs", () => {
    render(
      <MockedProvider>
        <SignUpForm />
      </MockedProvider>
    );
    formInputLabels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
    const input1 = screen.getByLabelText("users.form.name");
    userEvent.type(input1, "ad");

    const input2 = screen.getByLabelText("users.form.email");
    userEvent.type(input2, "ad@gmail.com");

    const input3 = screen.getByLabelText("users.form.password");
    userEvent.type(input3, "12345");

    const input4 = screen.getByLabelText("users.form.confirmPassword");
    userEvent.type(input4, "12345");

    const button = screen.getByRole("button", { name: "users.actions.signUp" });
    userEvent.click(button);
  });
  it("Should render all SignUpForm inputs with out name", () => {
    render(
      <MockedProvider>
        <SignUpForm />
      </MockedProvider>
    );
    formInputLabels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    const input2 = screen.getByLabelText("users.form.email");
    userEvent.type(input2, "ad@gmail.com");

    const input3 = screen.getByLabelText("users.form.password");
    userEvent.type(input3, "12345");

    const input4 = screen.getByLabelText("users.form.confirmPassword");
    userEvent.type(input4, "12345");

    const button = screen.getByRole("button", { name: "users.actions.signUp" });
    userEvent.click(button);
  });
  it("Should render all SignUpForm inputs with out email", () => {
    render(
      <MockedProvider>
        <SignUpForm />
      </MockedProvider>
    );
    formInputLabels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
    const input1 = screen.getByLabelText("users.form.name");
    userEvent.type(input1, "ad");

    const input3 = screen.getByLabelText("users.form.password");
    userEvent.type(input3, "12345");

    const input4 = screen.getByLabelText("users.form.confirmPassword");
    userEvent.type(input4, "12345");

    const button = screen.getByRole("button", { name: "users.actions.signUp" });
    userEvent.click(button);
  });
  it("Should render all SignUpForm inputs with out email", async() => {
    render(
      <MockedProvider>
        <SignUpForm />
      </MockedProvider>
    );
    formInputLabels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    const input3 = screen.getByLabelText("users.form.password");
    userEvent.type(input3, "12345");

    const button = screen.getByRole("button", { name: "users.actions.signUp" });
    userEvent.click(button);

    // Select the element with aria-label="states.loading"
    const loadingElement = screen.getByLabelText('states.loading');
  // Assert that the element is found
    expect(loadingElement).toBeInTheDocument();
      expect(loadingElement).not.toBeDisabled();
       expect(screen.getByLabelText('users.form.email')).toBeInTheDocument();
       expect(screen.getByLabelText('users.form.email').value).toBe("");    
       expect(screen.getByLabelText('users.form.confirmPassword').value).toBe("");    
  });

   it("Should render component and check signup to be disabled", async() => {
    render(
      <MockedProvider>
        <SignUpForm />
      </MockedProvider>
    );
    formInputLabels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    const button = screen.getByRole("button", { name: "users.actions.signUp" });
    expect(button.disabled).toBeTruthy();
   
  });
});