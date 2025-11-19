import { useState } from "react";

export default function EventModal({
  isOpen,
  onClose,
  date,
  onSave,
  events = []
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
          {date.toDateString()}
        </h2>

        {events.length > 0 &&
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Events on this day:</h3>
            <ul className="space-y-1">
              {events.map(ev =>
                <li
                  key={ev.id}
                  className="p-2 rounded bg-indigo-50 border border-indigo-200 text-xs"
                >
                  <div className="font-semibold">
                    {ev.title}
                  </div>
                  {ev.description &&
                    <div className="text-gray-600">
                      {ev.description}
                    </div>}
                </li>
              )}
            </ul>
          </div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            placeholder="Event title"
            required
            className="border rounded px-3 py-2 w-full"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            name="description"
            placeholder="Description (optional)"
            className="border rounded px-3 py-2 w-full"
            value={description}
            onChange={e => setDescription(e.target.value)}
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
