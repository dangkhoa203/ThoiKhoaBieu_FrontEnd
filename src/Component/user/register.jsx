import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    user_id: 2,
    room_id: 3,
    subject_id: 1,
    requestTime: '2025-04-03T14:30',
    reason: 'Lớp bị hủy, cần bù',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dữ liệu mẫu:', formData);
    alert('Dữ liệu mẫu đã được gửi!');
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Đăng ký lịch dạy bù </h1>
      <form onSubmit={handleSubmit}>
        {/* User ID */}
        <div className="mb-4">
          <label htmlFor="user_id" className="block text-gray-700 font-medium mb-2">
            Giáo viên
          </label>
          <p className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-700">
            {formData.user_id}
        </p>
        </div>

        {/* Room ID */}
        <div className="mb-4">
          <label htmlFor="room_id" className="block text-gray-700 font-medium mb-2">
            Phòng học 
          </label>
          <input
            type="number"
            id="room_id"
            name="room_id"
            value={formData.room_id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Subject ID */}
        <div className="mb-4">
          <label htmlFor="subject_id" className="block text-gray-700 font-medium mb-2">
            Môn học 
          </label>
          <input
            type="number"
            id="subject_id"
            name="subject_id"
            value={formData.subject_id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Request Time */}
        <div className="mb-4">
          <label htmlFor="requestTime" className="block text-gray-700 font-medium mb-2">
            Ngày dạy bù
          </label>
          <input
            type="datetime-local"
            id="requestTime"
            name="requestTime"
            value={formData.requestTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Reason */}
        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-700 font-medium mb-2">
            Lý do 
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default Register;