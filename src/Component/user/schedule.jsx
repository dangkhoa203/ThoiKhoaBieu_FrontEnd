import React, { useState } from 'react';

function Schedule() {
  // Mock data 
  const mockSchedules = [
    {
      scheduleId: 1,
      classes: {
        subject: { subjectName: 'Math' },
        user: { fullname: 'John Doe' },
        status: 'DANG_DIEN_RA',
      },
      room: {
        roomName: 'Conference Room A',
        location: 'Building 1, 2nd Floor',
      },
      shift: {
        shiftName: 'Morning Shift',
        startTime: '08:00:00',
        endTime: '12:00:00',
      },
      dayOfWeek: 'THURSDAY',
      semesterStartTime: '2025-04-01T00:00:00',
      semesterEndTime: '2025-06-30T23:59:59',
    },
    {
      scheduleId: 2,
      classes: {
        subject: { subjectName: 'Physics' },
        user: { fullname: 'Jane Smith' },
        status: 'HOAN_THANH',
      },
      room: {
        roomName: 'Conference Room B',
        location: 'Building 1, 1st Floor',
      },
      shift: {
        shiftName: 'Afternoon Shift',
        startTime: '13:00:00',
        endTime: '17:00:00',
      },
      dayOfWeek: 'FRIDAY',
      semesterStartTime: '2025-04-01T00:00:00',
      semesterEndTime: '2025-06-30T23:59:59',
    },
    {
      scheduleId: 3,
      classes: {
        subject: { subjectName: 'Chemistry' },
        user: { fullname: 'Alice Johnson' },
        status: 'CHUA_BAT_DAU',
      },
      room: {
        roomName: 'Lab Room 1',
        location: 'Building 2, Ground Floor',
      },
      shift: {
        shiftName: 'Evening Shift',
        startTime: '18:00:00',
        endTime: '21:00:00',
      },
      dayOfWeek: 'SATURDAY',
      semesterStartTime: '2025-04-01T00:00:00',
      semesterEndTime: '2025-06-30T23:59:59',
    },
  ];

  // State lưu trữ danh sách lịch trình
  const [schedules] = useState(mockSchedules);

  // Hàm định dạng ngày
  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Thời khóa biểu</h1>
      {schedules.length === 0 ? (
        <p>Không có dữ liệu thời khóa biểu.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedules.map((schedule) => (
            <div
              key={schedule.scheduleId}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                {schedule.classes.subject.subjectName}
              </h2>
              <p className="text-gray-700">
                <strong>Giảng viên:</strong> {schedule.classes.user.fullname}
              </p>
              <p className="text-gray-700">
                <strong>Phòng học:</strong> {schedule.room.roomName} -{' '}
                {schedule.room.location}
              </p>
              <p className="text-gray-700">
                <strong>Ca học:</strong> {schedule.shift.shiftName} ({schedule.shift.startTime} -{' '}
                {schedule.shift.endTime})
              </p>
              <p className="text-gray-700">
                <strong>Ngày trong tuần:</strong> {schedule.dayOfWeek}
              </p>
              <p className="text-gray-700">
                <strong>Ngày bắt đầu:</strong> {formatDate(schedule.semesterStartTime)}
              </p>
              <p className="text-gray-700">
                <strong>Ngày kết thúc:</strong> {formatDate(schedule.semesterEndTime)}
              </p>
              <p className="text-gray-700">
                <strong>Trạng thái:</strong> {schedule.classes.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Schedule;