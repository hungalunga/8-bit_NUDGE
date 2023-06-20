import { useState } from "react";

function DeleteAccount({ supabase }) {
  const [deletionError, setDeletionError] = useState(null);

  const handleDeleteAccount = async () => {
    try {
      const { error } = await supabase.auth.delete();

      if (error) {
        throw error;
      }

      // User deleted successfully
      // You can perform additional actions like redirecting to a different page
    } catch (error) {
      setDeletionError(error.message);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      {deletionError && <p>Error: {deletionError}</p>}
    </div>
  );
}

export default DeleteAccount;