// TODO: Get over 80% test coverage for LoginForm component
import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";

// Silences warning related to i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: { changeLanguage: () => new Promise(() => null) },
    t: (str: string) => str,
  }),
}));

const formInputLabels = ["users.form.email", "users.form.password"];

describe("LoginForm Tests", () => {
  it("Should render all LoginForm inputs", () => {
    render(
      <MockedProvider>
        <LoginForm />
      </MockedProvider>
    );
    formInputLabels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
    const input1 = screen.getByLabelText("users.form.email");
    userEvent.type(input1, "amknown@gmail.com");

    const input2 = screen.getByLabelText("users.form.email");
    userEvent.type(input2, "ad123");
    const button = screen.getByRole("button", { name: "users.actions.logIn" });
    userEvent.click(button);
  });
});
