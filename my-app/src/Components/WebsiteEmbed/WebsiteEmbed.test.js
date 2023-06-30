import { render, screen, fireEvent } from '@testing-library/react';
import WebsiteEmbed from './WebsiteEmbed';

describe('WebsiteEmbed', () => {
  test('renders the navbar logo', () => {
    render(<WebsiteEmbed />);
    const logoElement = screen.getByAltText('nav-logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('opens the menu when the menu button is clicked', () => {
    render(<WebsiteEmbed />);
    const menuButton = screen.getByLabelText('Menu');
    fireEvent.click(menuButton);
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems.length).toBeGreaterThan(0);
  });

  test('redirects to My Dashboard when My Dashboard menu item is clicked', () => {
    render(<WebsiteEmbed />);
    const menuButton = screen.getByLabelText('Menu');
    fireEvent.click(menuButton);
    const myDashboardMenuItem = screen.getByText('My Dashboard');
    fireEvent.click(myDashboardMenuItem);
    expect(window.location.pathname).toBe('/');
  });

  test("logs out when Logout menu item is clicked", () => {
    const supabaseMock = {
      auth: {
        signOut: jest.fn(),
      },
    };
    render(<WebsiteEmbed supabase={supabaseMock} />);
    const menuButton = screen.getByLabelText("Menu");
    fireEvent.click(menuButton);
    const logoutMenuItem = screen.getByText("Logout");
    fireEvent.click(logoutMenuItem);
    expect(supabaseMock.auth.signOut).toHaveBeenCalledTimes(1);
  });

  test('renders the chat iframe', () => {
    render(<WebsiteEmbed />);
    const iframeElement = screen.getByTitle('W3Schools Free Online Web Tutorials');
    expect(iframeElement).toBeInTheDocument();
  });
});
