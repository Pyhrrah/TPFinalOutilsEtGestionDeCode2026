import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../components/Login';
import * as AuthContext from '../../contexts/AuthContext';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Composant Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Devrait afficher correctement le formulaire', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ login: vi.fn() });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: /connexion/i })).toBeDefined();
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/mot de passe/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /se connecter/i })).toBeDefined();
  });

  it('Devrait afficher une erreur si la connexion échoue', async () => {
    const mockLogin = vi.fn().mockResolvedValue({ success: false, error: 'Identifiants invalides' });
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ login: mockLogin });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // On remplit le formulaire
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'mauvais@email.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'fauxmdp' } });
    
    // On soumet
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

    // On attend que le message d'erreur apparaisse
    await waitFor(() => {
      expect(screen.getByText('Identifiants invalides')).toBeDefined();
    });
  });

  it('Devrait rediriger vers /dashboard si la connexion réussit', async () => {
    // On simule un login qui réussit
    const mockLogin = vi.fn().mockResolvedValue({ success: true });
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ login: mockLogin });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'admin@test.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

    // On attend que la redirection soit appelée
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});