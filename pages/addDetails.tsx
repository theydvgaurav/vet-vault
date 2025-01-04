import { useState } from "react";

export default function AddDetails() {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMessage("Form submitted successfully!");
      } else {
        setResponseMessage(data.message || "Failed to submit the form.");
      }
    } catch (error) {
      setResponseMessage("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-green-500">My Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="field1"
          value={formData.field1}
          onChange={handleChange}
          placeholder="Field 1"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="field2"
          value={formData.field2}
          onChange={handleChange}
          placeholder="Field 2"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="field3"
          value={formData.field3}
          onChange={handleChange}
          placeholder="Field 3"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="field4"
          value={formData.field4}
          onChange={handleChange}
          placeholder="Field 4"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="field5"
          value={formData.field5}
          onChange={handleChange}
          placeholder="Field 5"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
          Add Pet
        </button>
      </form>

      {responseMessage && (
        <p className="text-center text-green-500 mt-4">{responseMessage}</p>
      )}
    </div>
  );
}
