import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import LoginForm from "../LoginForm";

// Silences warning related to i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () =>
        new Promise(() => {
          // This comment is stopping an empty-arrow-function error
        }),
    },
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
