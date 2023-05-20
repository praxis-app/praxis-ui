import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import SignUpForm from "../SignUpForm";
import { useSignUpMutation } from "../../../apollo/gen";
import { MockedProvider } from "@apollo/client/testing";
import { INVITE_TOKEN } from "../../../constants/server-invite.constants";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: { changeLanguage: () => new Promise(() => null) },
    t: (str: string) => str,
  }),
}));

jest.mock("../../../apollo/gen", () => ({
  useSignUpMutation: jest.fn(),

  cache: {
    writeQuery: jest.fn(),
  },
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { token: "myValue" },
  }),
}));

const cacheMock = {
  writeQuery: jest.fn(),
};
const inviteTokenVarMock = jest.fn();
const isLoggedInVarMock = jest.fn();
const setImageInputKeyMock = jest.fn();
const removeLocalStorageItemMock = jest.fn();
const toastVarMock = jest.fn();
URL.createObjectURL = jest.fn();

describe("SignUpForm", () => {
  it("should call the signUp mutation when the sign-up button is clicked", async () => {
    const mockSignUpMutation = jest.fn();
    const mockOnCompleted = jest.fn();

    mockSignUpMutation.mockImplementationOnce(() => Promise.resolve());
    mockOnCompleted.mockImplementation(() => Promise.resolve());

    (useSignUpMutation as jest.Mock).mockReturnValue([mockSignUpMutation]);

    inviteTokenVarMock("");
    cacheMock.writeQuery();
    isLoggedInVarMock(true);
    setImageInputKeyMock("");
    removeLocalStorageItemMock(INVITE_TOKEN);
    toastVarMock("error");

    render(
      <MockedProvider>
        <SignUpForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText("users.form.email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("users.form.name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("users.form.password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("users.form.confirmPassword"), {
      target: { value: "password" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "users.actions.signUp" })
    );

    await waitFor(() => {
      expect(mockSignUpMutation).toHaveBeenCalledTimes(1);
    });

    expect(cacheMock.writeQuery).toHaveBeenCalledTimes(1);
    expect(inviteTokenVarMock).toHaveBeenCalled();

    expect(isLoggedInVarMock).toHaveBeenCalled();
    expect(setImageInputKeyMock).toHaveBeenCalled();
    expect(removeLocalStorageItemMock).toHaveBeenCalledWith(INVITE_TOKEN);
    expect(toastVarMock).toHaveBeenCalled();
  });

  it("on singup it should show error when email is not entered", async () => {
    render(
      <MockedProvider>
        <SignUpForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText("users.form.name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("users.form.password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("users.form.confirmPassword"), {
      target: { value: "password" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "users.actions.signUp" })
    );

    const errorText = await screen.findByText("signUp.errors.missingEmail");
    expect(errorText).toBeInTheDocument();

    const inputElement = screen.getByLabelText("posts.labels.addImages");

    fireEvent.change(inputElement, {
      target: {
        files: [new File([], "test-image.png", { type: "image/png" })],
      },
    });

    const imagePreview = screen.getByLabelText("images.labels.attachImages");
    expect(imagePreview).toBeInTheDocument();

    const removeButton = screen.getAllByLabelText("images.labels.removeImage");
    fireEvent.click(removeButton[0]);
  });
});
