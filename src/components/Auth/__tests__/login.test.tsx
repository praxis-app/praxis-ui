import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Login from "../../../pages/auth/login";

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

describe("Login Form Tests", () => {
  it("Should render all form inputs", () => {
    render(
      <MockedProvider>
        <Login />
      </MockedProvider>
    );
    formInputLabels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });
});
