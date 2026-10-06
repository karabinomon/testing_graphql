export const courses = [
  {
    id: '1',
    name: 'Desenvolvimento Web Full Stack',
    credits: 60
  },
  {
    id: '2',
    name: 'Estruturas de Dados e Algoritmos',
    credits: 80
  },
  {
    id: '3',
    name: 'Design de Interface e Experiência (UI/UX)',
    credits: 40
  }
];

export const teachers = [
  {
    id: '1',
    name: 'Prof. Carlos Silva',
    courseIds: ['1', '2']
  },
  {
    id: '2',
    name: 'Profa. Ana Pereira',
    courseIds: ['1', '3']
  }
];

export const students = [
  {
    id: '1',
    name: 'Lucas Santos',
    email: 'lucas.santos@email.com',
    courseId: '1'
  },
  {
    id: '2',
    name: 'Mariana Costa',
    email: 'mariana.costa@email.com',
    courseId: '1'
  },
  {
    id: '3',
    name: 'Felipe Almeida',
    email: 'felipe.almeida@email.com',
    courseId: '2'
  },
  {
    id: '4',
    name: 'Beatriz Lima',
    email: 'beatriz.lima@email.com',
    courseId: '2'
  },
  {
    id: '5',
    name: 'Gabriel Souza',
    email: 'gabriel.souza@email.com',
    courseId: '3'
  },
  {
    id: '6',
    name: 'Juliana Rocha',
    email: 'juliana.rocha@email.com',
    courseId: '3'
  }
];

