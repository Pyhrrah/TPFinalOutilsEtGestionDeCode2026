import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Application Frontend', () => {
  it('Should return the composant without crash', () => {
    
    const { container } = render(<App />);
    
    expect(container).toBeDefined();
    expect(container.firstChild).not.toBeNull();
  });
});