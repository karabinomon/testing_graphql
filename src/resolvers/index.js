import { GraphQLError } from 'graphql';
import { students, courses, teachers } from '../data/index.js';

let nextStudentId = 7;

export const resolvers = {
  Query: {
    students: () => students,
    student: (_, { id }) => students.find((s) => s.id === id) || null,
    courses: () => courses,
    course: (_, { id }) => courses.find((c) => c.id === id) || null,
    teachers: () => teachers,
    teacher: (_, { id }) => teachers.find((t) => t.id === id) || null
  },

  Mutation: {
    addStudent: (_, { name, email, courseId }) => {
      const course = courses.find((c) => c.id === courseId);
      if (!course) {
        throw new GraphQLError(`Curso com ID "${courseId}" não encontrado.`);
      }

      const newStudent = {
        id: String(nextStudentId++),
        name,
        email,
        courseId
      };

      students.push(newStudent);
      return newStudent;
    },

    removeStudent: (_, { id }) => {
      const index = students.findIndex((s) => s.id === id);
      if (index === -1) {
        return false;
      }

      students.splice(index, 1);
      return true;
    }
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

