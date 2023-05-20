import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useLoginMutation } from "../../../apollo/gen";
import LoginForm from "../LoginForm";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: { changeLanguage: () => new Promise(() => null) },
    t: (str: string) => str,
  }),
}));

jest.mock("../../../apollo/gen", () => ({
  useLoginMutation: jest.fn(),
  cache: {
    writeQuery: jest.fn(),
  },
}));

const cacheMock = { writeQuery: jest.fn() };
const isLoggedInVarMock = jest.fn();
const toastVarMock = jest.fn();

describe("LoginForm", () => {
  it("should call the login mutation when the submit button is clicked", async () => {
    const mockLoginMutation = jest.fn();
    const mockOnCompleted = jest.fn();

    mockLoginMutation.mockImplementationOnce(() => Promise.resolve());
    mockOnCompleted.mockImplementation(() => Promise.resolve());

    (useLoginMutation as jest.Mock).mockReturnValue([mockLoginMutation]);

    cacheMock.writeQuery();
    isLoggedInVarMock(true);
    toastVarMock("error");

    render(
      <MockedProvider>
        <LoginForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText("users.form.email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("users.form.password"), {
      target: { value: "password" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "users.actions.logIn" })
    );

    await waitFor(() => {
      expect(mockLoginMutation).toHaveBeenCalledTimes(1);
    });
    expect(cacheMock.writeQuery).toHaveBeenCalledTimes(1);
    expect(isLoggedInVarMock).toHaveBeenCalled();
    expect(toastVarMock).toHaveBeenCalled();
  });
});
