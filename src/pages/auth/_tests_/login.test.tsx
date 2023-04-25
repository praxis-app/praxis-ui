import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Login from "../login";

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

const formInputValues = [
  {
    label: "users.form.email",
    correctTestValue: "test@gmail.com",
  },
  {
    label: "users.form.password",
    correctTestValue: "password123",
  },
];

describe("Login Form Tests", () => {
  it("Should render all form inputs", () => {
    render(
      <MockedProvider>
        <Login />
      </MockedProvider>
    );
    formInputValues.forEach((value) => {
      expect(screen.getByLabelText(value.label)).toBeInTheDocument();
    });
  });
});
