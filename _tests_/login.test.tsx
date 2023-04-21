import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import Login from '../src/pages/auth/login';

const formInputValues = [
    {
        label: 'users.form.email',
        correctTestValue: 'test@gmail.com'
    },
    {
        label: 'users.form.password',
        correctTestValue: 'password123',
    }
];

describe('Login Form Tests', () => {
    it('Should render all form inputs', () => {
        render(
            <MockedProvider>
                <Login />
            </MockedProvider>
        );
    formInputValues.forEach((value, index) => {
        expect(screen.getByLabelText(value.label)).toBeInTheDocument();
    })
    });
});


