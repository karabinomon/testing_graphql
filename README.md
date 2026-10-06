# Escola GraphQL API

API GraphQL construída em Node.js (ESM) com [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server), pronta para execução em Docker e deploy em plataformas como Render.

---

## 🚀 Como Executar

### Com Docker (Recomendado)

Suba o container com build automático:

```bash
docker compose up --build
```

A API estará disponível em:
**http://localhost:4000/graphql** (com playground interativo GraphiQL integrado)

Para parar a execução:
```bash
docker compose down
```

---

### Execução Local (sem Docker)

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie em modo de desenvolvimento (com hot reload nativo):
   ```bash
   npm run dev
   ```

3. Ou inicie em modo de produção:
   ```bash
   npm start
   ```

---

## 📋 Exemplos de Uso

Acesse **http://localhost:4000/graphql** no navegador ou envie requisições HTTP `POST` para o endpoint.

### 1. Consultar todos os alunos com os dados do curso

```graphql
query ListStudents {
  students {
    id
    name
    email
    course {
      id
      name
      credits
    }
  }
}
```

### 2. Consultar cursos e seus alunos matriculados

```graphql
query ListCoursesWithStudents {
  courses {
    id
    name
    credits
    students {
      id
      name
      email
    }
  }
}
```

### 3. Consultar professores e seus cursos

```graphql
query ListTeachers {
  teachers {
    id
    name
    courses {
      id
      name
      credits
    }
  }
}
```

### 4. Consultar aluno por ID

```graphql
query GetStudentById {
  student(id: "1") {
    id
    name
    email
    course {
      name
    }
  }
}
```

### 5. Adicionar um novo aluno (Mutation)

```graphql
mutation CreateStudent {
  addStudent(
    name: "Carolina Ferreira"
    email: "carolina.ferreira@email.com"
    courseId: "1"
  ) {
    id
    name
    email
    course {
      id
      name
    }
  }
}
```

### 6. Remover um aluno por ID (Mutation)

```graphql
mutation DeleteStudent {
  removeStudent(id: "1")
}
```

---

## 🌐 Consumo no Front-end (Exemplo com Fetch API)

Como o CORS está liberado para todas as origens (`*`), alunos podem consumir a API diretamente de qualquer frontend (React, Vue, Angular, vanilla JS):

```javascript
const response = await fetch("http://localhost:4000/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query: `
      query {
        students {
          id
          name
          course {
            name
          }
        }
      }
    `
  })
});

const { data } = await response.json();
console.log(data.students);
```

---

## ☁️ Deploy no Render

Esta API está pronta para ser publicada no **Render** (Web Service, plano Free):

- **Build Command:** `npm ci --omit=dev`
- **Start Command:** `npm start`
- Ou escolha deploy via **Docker** apontando para o repositório contendo o `Dockerfile`.
- O servidor detecta automaticamente a porta atribuída pelo Render através da variável de ambiente `PORT` (com fallback para `4000`).

---

## 📁 Estrutura de Pastas

```
.
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
├── package-lock.json
├── README.md
└── src/
    ├── data/
    │   └── index.js          # Dados fictícios em memória
    ├── schema/
    │   ├── schema.graphql    # Definição do schema GraphQL (SDL)
    │   └── index.js          # Leitor do schema
    ├── resolvers/
    │   └── index.js          # Resolvers de Queries, Mutations e Tipos
    └── server.js             # Bootstrap do servidor GraphQL Yoga
```

