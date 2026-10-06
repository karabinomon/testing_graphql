import { students, courses, teachers } from '../data/index.js';

export const resolvers = {
  Query: {
    students: () => students,
    student: (_, { id }) => students.find((s) => s.id === id) || null,
    courses: () => courses,
    course: (_, { id }) => courses.find((c) => c.id === id) || null,
    teachers: () => teachers,
    teacher: (_, { id }) => teachers.find((t) => t.id === id) || null
  },

  Student: {
    course: (student) => courses.find((c) => c.id === student.courseId) || null
  },

  Course: {
    students: (course) => students.filter((s) => s.courseId === course.id)
  },

  Teacher: {
    courses: (teacher) => courses.filter((c) => teacher.courseIds.includes(c.id))
  }
};
