import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
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
  it("Should render all SignUpForm inputs with out fields and show required errors", async () => {
    render(
      <MockedProvider>
        <SignUpForm />
      </MockedProvider>
    );
    formInputLabels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    const nameField = screen.getByLabelText("users.form.name");
    userEvent.type(nameField, "");
    await act(async () => {
      fireEvent.blur(nameField);
    });
    expect(screen.getByText("signUp.errors.missingName")).toBeInTheDocument();

    const emailField = screen.getByLabelText("users.form.email");
    userEvent.type(emailField, "");
    await act(async () => {
      fireEvent.blur(emailField);
    });
    expect(screen.getByText("signUp.errors.missingEmail")).toBeInTheDocument();

    const passwordField = screen.getByLabelText("users.form.password");
    userEvent.type(passwordField, "");
    await act(async () => {
      fireEvent.blur(passwordField);
    });
    expect(
      screen.getByText("signUp.errors.missingPassword")
    ).toBeInTheDocument();

    const signUpButton = screen.getByRole("button", {
      name: "users.actions.signUp",
    });
    expect(signUpButton.disabled).toBeTruthy();
  });
  it("Should render component and check password mismatch between password and confirm password", async () => {
    render(
      <MockedProvider>
        <SignUpForm />
      </MockedProvider>
    );
    const passwordField = screen.getByLabelText("users.form.password");
    userEvent.type(passwordField, "a");
    await act(async () => {
      fireEvent.blur(passwordField);
    });

    const missingPasswordField = screen.getByLabelText(
      "users.form.confirmPassword"
    );
    userEvent.type(missingPasswordField, "b");
    await act(async () => {
      fireEvent.blur(missingPasswordField);
    });
    expect(
      screen.getByText("signUp.errors.confirmPassword")
    ).toBeInTheDocument();
  });

  it("Should render component and check signup to be disabled when no field is entered", async () => {
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
