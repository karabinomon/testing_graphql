import { createServer } from 'node:http';
import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs } from './schema/index.js';
import { resolvers } from './resolvers/index.js';

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers
  }),
  cors: {
    origin: '*',
    credentials: false,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
});

const server = createServer(yoga);

const PORT = Number(process.env.PORT) || 4000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor GraphQL rodando em http://localhost:${PORT}/graphql`);
});

