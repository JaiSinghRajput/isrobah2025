import React, { useState } from "react";

const Formparameter = ({ formData, setFormData, handleSubmit }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const parameters = [
    "Differentiated Flux",
    "Integrated Flux",
    "Proton Temperature",
    "AHe",
    "Velocity",
    "Ion Density",
    "Proton Density",
    "Alpha Density",
    "Thermal Speed",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-fit gap-2 items-center flex  mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4"
    >
      <div>
        <label className="block mb-1 font-semibold">Select Parameter</label>
        <select
          name="parameter"
          value={formData.parameter}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Choose --</option>
          {parameters.map((param, index) => (
            <option key={index} value={param}>
              {param}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Formparameter;
