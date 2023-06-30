import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import DeleteAccount from "./DeleteAccount";

describe("DeleteAccount", () => {
  test("calls supabase.auth.delete() and handles successful deletion", async () => {
    const supabaseMock = {
      auth: {
        delete: jest.fn().mockResolvedValue({ error: null }),
      },
    };

   render(
      <DeleteAccount supabase={supabaseMock} />
    );

    const deleteButton = screen.getByText("Delete Account");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(supabaseMock.auth.delete).toHaveBeenCalled();
    });
    await waitFor(() => {
        expect(screen.queryByText("Error:")).toBeNull();
    });});

  test("calls supabase.auth.delete() and handles deletion error", async () => {
    const errorMessage = "Deletion failed";
    const supabaseMock = {
      auth: {
        delete: jest.fn().mockResolvedValue({ error: errorMessage }),
      },
    };

    render(
      <DeleteAccount supabase={supabaseMock} />
    );

    const deleteButton = screen.getByText("Delete Account");
    fireEvent.click(deleteButton);

    await waitFor(() => {
        expect(supabaseMock.auth.delete).toHaveBeenCalled();});
        await waitFor(() => {   expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });
      
    
  });
});
