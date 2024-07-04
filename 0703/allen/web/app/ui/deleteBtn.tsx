"use client";

export function Delete({ id, onDelete }: { id: number; onDelete: () => void }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://100.89.152.5:8080/api/items/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Item deleted successfully");
        onDelete(); // Call the onDelete callback
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button className="btn btn-secondary" onClick={handleDelete}>
      Delete
    </button>
  );
}
