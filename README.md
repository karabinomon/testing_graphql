# Escola GraphQL API (Read-Only)

API GraphQL construída em Node.js (ESM) com [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server), pronta para execução em Docker e deploy no Render.

> **Modo Somente Leitura:** Esta API foi configurada exclusivamente para consultas de listagem e leitura. Não possui mutações (`addStudent` / `removeStudent` foram removidos), garantindo que dados fictícios não possam ser alterados ou deletados.

---

## 🚀 Como Executar

### Com Docker (Recomendado)

```bash
docker compose up --build
```

Acesse o playground interativo (GraphiQL) em:
**http://localhost:4000/graphql**

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

## 📋 Consultas Disponíveis (Queries)

### 1. Consultar todos os alunos com dados do curso

```graphql
query {
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
query {
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
query {
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
query {
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

---

## 🌐 Consumo no Front-end

Como o CORS está liberado (`*`), você pode consumir a API tanto via **GET** (passando a query na URL) quanto via **POST** (no body JSON).

### Exemplo 1: Via método HTTP `GET`

```javascript
const query = encodeURIComponent(`
  query {
    students {
      id
      name
      course {
        name
      }
    }
  }
`);

const response = await fetch(`http://localhost:4000/graphql?query=${query}`, {
  method: "GET"
});

const { data } = await response.json();
console.log(data.students);
```

### Exemplo 2: Via método HTTP `POST`

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

- **Runtime:** `Docker` (ou `Node` com `npm start`)
- Não requer nenhuma variável de ambiente manual. A porta é detectada automaticamente via `process.env.PORT`.
- CORS liberado para qualquer origem (`*`).

---

## 📁 Estrutura de Pastas

```
.
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
├── README.md
└── src/
    ├── data/
    │   └── index.js          # Dados imutáveis em memória
    ├── schema/
    │   ├── schema.graphql    # Schema GraphQL somente leitura (sem Mutations)
    │   └── index.js          # Loader do schema
    ├── resolvers/
    │   └── index.js          # Resolvers de consultas e relações
    └── server.js             # Bootstrap do Yoga com CORS aberto
```
