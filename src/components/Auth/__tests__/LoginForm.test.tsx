// TODO: Get over 80% test coverage for LoginForm component

import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import LoginForm from "../LoginForm";

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
  });
});
