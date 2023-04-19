import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/pages/auth/login';

const formInputValues = [
    {
        label: 'formEmail',
        correctTestValue: 'test@gmail.com'
    },
    {
        label: 'formPassword',
        correctTestValue: 'password123',
    }
];

describe('Login Form Tests', () => {
    it('Should render all form inputs', () => {
        render(
            <Login />
        );
    formInputValues.forEach((value, index) => {
        expect(screen.getByLabelText(value.label)).toBeInTheDocument();
    })
    });
});


