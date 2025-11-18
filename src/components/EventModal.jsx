export default function EventModal({ isOpen, onClose, date, onSave }) {
  if (!isOpen) {
    return null;
  }

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    if (title) {
      onSave({ date, title, description });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">
          Add Event for {date.toDateString()}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            placeholder="Event title"
            required
            className="border rounded px-3 py-2 w-full"
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            className="border rounded px-3 py-2 w-full"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
