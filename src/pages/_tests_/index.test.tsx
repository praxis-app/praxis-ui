import { render, screen } from '@testing-library/react';
import App from '../../pages/index';


describe('Tests for app', () => {
    it('should render the app without crashing', () => {
        render(<App />)
        expect(
            screen.getByRole('heading', { name: 'Praxis' })
        ).toBeInTheDocument();
    })
})