import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";

// Test 1: Check initial state values
test("initial state values are set correctly", () => {
  render(<Dashboard />);
  
  // Assert that the initial state values are set correctly
  expect(screen.queryByTestId("edit-mode")).toBeFalsy();
  expect(screen.queryByTestId("user")).toBeNull();
  expect(screen.queryByTestId("user-profile")).toBeNull();
});

// Test 2: Check user fetching
test("user is fetched correctly", () => {
  const mockedUser = { id: 1, name: "John Doe" };
  const props = {
    session: {
      user: mockedUser
    },
    supabase: {} // Mock the supabase dependency
  };

  render(<Dashboard {...props} />);

  // Assert that the user is fetched correctly and set in the state
  expect(screen.getByTestId("user")).toEqual(mockedUser);
});

// Test 3: Check user profile fetching
test("user profile is fetched correctly", () => {
  const mockedUserProfile = { id: 1, bio: "Hello, I'm John Doe" };
  const props = {
    session: {
      user: { id: 1 }
    },
    supabase: {} // Mock the supabase dependency
  };

  render(<Dashboard {...props} />);

  // Assert that the user profile is fetched correctly and set in the state
  expect(screen.getByTestId("user-profile")).toEqual(mockedUserProfile);
});

// Test 4: Check leaderboard fetching
test("leaderboard is fetched correctly", () => {
  const mockedLeaderboard = [{ id: 1, name: "Player 1", score: 100 }, { id: 2, name: "Player 2", score: 90 }];
  const props = {
    session: {
      user: { id: 1 }
    },
    supabase: {} // Mock the supabase dependency
  };

  render(<Dashboard {...props} />);

  // Assert that the leaderboard is fetched correctly and set in the state
  expect(screen.getByTestId("leaderboard")).toEqual(mockedLeaderboard);
});

// Test 5: Check rank calculation
test("rank is calculated correctly", () => {
  const mockedLeaderboard = [{ id: 1, name: "Player 1", score: 100 }, { id: 2, name: "Player 2", score: 90 }];
  const mockedUsername = "Player 2";
  const expectedRank = 2;
  
  const props = {
    session: {
      user: { id: 1 }
    },
    supabase: {} // Mock the supabase dependency
  };

  render(<Dashboard {...props} />);

  // Set the leaderboard and username in the state
  screen.getByTestId("leaderboard").setState(mockedLeaderboard);
  screen.getByTestId("username").setState(mockedUsername);

  // Assert that the rank is calculated correctly based on the leaderboard and username
  expect(screen.getByTestId("rank")).toBe(expectedRank);
});

// Test 6: Check error handling for user fetching
test("handles error when user fetching fails", async () => {
  const props = {
    session: {
      user: null
    },
    supabase: {
      // Mock the supabase dependency with a failed user fetching request
      auth: {
        user: jest.fn().mockRejectedValue(new Error("Failed to fetch user"))
      }
    }
  };

  render(<Dashboard {...props} />);

  // Assert that the error message is displayed when user fetching fails
  await waitFor(() => {
    expect(screen.getByText("Failed to fetch user")).toBeInTheDocument();
  });
});

// Test 7: Check loading state when fetching user profile
test("displays loading state while fetching user profile", () => {
  const props = {
    session: {
      user: { id: 1 }
    },
    supabase: {
      // Mock the supabase dependency with a delayed user profile fetching request
      from: jest.fn().mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ id: 1, bio: "Hello, I'm John Doe" }), 1000)))
      }))
    }
  };

  render(<Dashboard {...props} />);

  // Assert that the loading state is displayed while fetching user profile
  expect(screen.getByText("Loading user profile...")).toBeInTheDocument();
});

// Test 8: Check error handling for user profile fetching
test("handles error when user profile fetching fails", async () => {
  const props = {
    session: {
      user: { id: 1 }
    },
    supabase: {
      // Mock the supabase dependency with a failed user profile fetching request
      from: jest.fn().mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockRejectedValue(new Error("Failed to fetch user profile"))
      }))
    }
  };

  render(<Dashboard {...props} />);

  // Assert that the error message is displayed when user profile fetching fails
  await waitFor(() => {
    expect(screen.getByText("Failed to fetch user profile")).toBeInTheDocument();
  });
});

// Test 9: Check error handling for leaderboard fetching
test("handles error when leaderboard fetching fails", async () => {
  const props = {
    session: {
      user: { id: 1 }
    },
    supabase: {
      // Mock the supabase dependency with a failed leaderboard fetching request
      from: jest.fn().mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        error: jest.fn().mockImplementation((callback) => callback(new Error("Failed to fetch leaderboard")))
      }))
    }
  };

  render(<Dashboard {...props} />);

  // Assert that the error message is displayed when leaderboard fetching fails
  await waitFor(() => {
    expect(screen.getByText("Failed to fetch leaderboard")).toBeInTheDocument();
  });
});

// Test 10: Check display of leaderboard with no entries
test("displays 'No leaderboard entries' message when there are no entries", async () => {
  const props = {
    session: {
      user: { id: 1 }
    },
    supabase: {
      // Mock the supabase dependency with an empty leaderboard
      from: jest.fn().mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        error: jest.fn().mockImplementation((callback) => callback(null, []))
      }))
    }
  };

  render(<Dashboard {...props} />);

  // Assert that the 'No leaderboard entries' message is displayed
  await waitFor(() => {
    expect(screen.getByText("No leaderboard entries")).toBeInTheDocument();
  });
});
