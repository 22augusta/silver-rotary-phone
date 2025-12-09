# 📚 Biblioteca API

API Web backend para gerenciamento de uma biblioteca, implementando operações CRUD para a entidade **Livro**.

**Disciplina:** Eletiva 01 – Arquitetura e Desenvolvimento Back-end  
**Professor:** Danilo Farias  
**Aluno:** Maria Augusta Kley Aguiar Fialho TADS044  
**Data de Entrega:** 09/12/2025

---

## 🎯 Objetivo

Projetar e desenvolver uma API Web backend que implemente as operações CRUD (Create, Read, Update, Delete) para a entidade Livro, utilizando a arquitetura Controller/Repository com TypeScript e Node.js/Express.js.

---

## 🏗️ Arquitetura

A solução implementa uma arquitetura em **duas camadas** com responsabilidades bem definidas:

### **Controller (Lógica de Negócio + HTTP)**
- Recebe requisições HTTP (rotas, verbos, dados)
- Contém validações de negócio integradas
- Chama diretamente o Repository para persistência
- Retorna respostas HTTP apropriadas

### **Repository (Persistência de Dados)**
- Responsável pela comunicação com o banco de dados
- Implementa padrão DAO (Data Access Object)
- Utiliza TypeORM para abstração do banco
- Realiza operações CRUD

---

## 📋 Entidade: Livro

| Campo | Tipo | Restrições |
|-------|------|-----------|
| `id` | `number` | Chave primária, auto-gerado |
| `titulo` | `string` | Obrigatório, mínimo 2 caracteres, até 200 caracteres |
| `autor` | `string` | Obrigatório, mínimo 2 caracteres, até 150 caracteres |
| `isbn` | `string` | Obrigatório, 10-17 caracteres, **único** |
| `anoPublicacao` | `number` | Obrigatório, inteiro entre 1450 e ano atual |
| `disponivel` | `boolean` | Obrigatório, padrão: `true` |

---

## 🚀 Endpoints RESTful

### **1. POST /api/livros - Criar Livro**
Cadastra um novo livro no sistema.

**Request:**
```bash
curl -X POST http://localhost:3000/api/livros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Clean Code",
    "autor": "Robert C. Martin",
    "isbn": "978-0132350884",
    "anoPublicacao": 2008,
    "disponivel": true
  }'
```

**Response (201 Created):**
```json
{
  "id": 1,
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "isbn": "978-0132350884",
  "anoPublicacao": 2008,
  "disponivel": true
}
```

---

### **2. GET /api/livros - Listar Todos**
Retorna a lista completa de livros cadastrados.

**Request:**
```bash
curl http://localhost:3000/api/livros
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "titulo": "Clean Code",
    "autor": "Robert C. Martin",
    "isbn": "978-0132350884",
    "anoPublicacao": 2008,
    "disponivel": true
  },
  {
    "id": 2,
    "titulo": "O Programador Pragmático",
    "autor": "David Thomas",
    "isbn": "978-8595015936",
    "anoPublicacao": 2000,
    "disponivel": true
  }
]
```

---

### **3. GET /api/livros/:id - Buscar por ID**
Retorna os detalhes de um livro específico.

**Request:**
```bash
curl http://localhost:3000/api/livros/1
```

**Response (200 OK):**
```json
{
  "id": 1,
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "isbn": "978-0132350884",
  "anoPublicacao": 2008,
  "disponivel": true
}
```

**Response (404 Not Found):**
```json
{
  "erro": "Livro não encontrado."
}
```

---

### **4. PUT /api/livros/:id - Atualizar Completo**
Atualiza todas as informações de um livro.

**Request:**
```bash
curl -X PUT http://localhost:3000/api/livros/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Clean Code - 2ª Edição",
    "autor": "Robert C. Martin",
    "isbn": "978-0132350884",
    "anoPublicacao": 2008,
    "disponivel": false
  }'
```

**Response (200 OK):**
```json
{
  "id": 1,
  "titulo": "Clean Code - 2ª Edição",
  "autor": "Robert C. Martin",
  "isbn": "978-0132350884",
  "anoPublicacao": 2008,
  "disponivel": false
}
```

---

### **5. PATCH /api/livros/:id - Atualizar Parcial**
Atualiza apenas alguns campos de um livro.

**Request:**
```bash
curl -X PATCH http://localhost:3000/api/livros/1 \
  -H "Content-Type: application/json" \
  -d '{"disponivel": false}'
```

**Response (200 OK):**
```json
{
  "id": 1,
  "titulo": "Clean Code - 2ª Edição",
  "autor": "Robert C. Martin",
  "isbn": "978-0132350884",
  "anoPublicacao": 2008,
  "disponivel": false
}
```

---

### **6. DELETE /api/livros/:id - Excluir**
Remove um livro do sistema.

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/livros/1
```

**Response (204 No Content):**
```
(sem corpo de resposta)
```

---

## ⚠️ Códigos HTTP e Tratamento de Erros

| Situação | Código | Resposta |
|----------|--------|----------|
| Sucesso na criação | 201 | Objeto criado |
| Sucesso em operações | 200 | Objeto ou lista |
| Sucesso em exclusão | 204 | Sem conteúdo |
| Validação falhou | 400 | `{"erros": [...]}` |
| Recurso não encontrado | 404 | `{"erro": "Livro não encontrado."}` |
| Conflito (ISBN duplicado) | 409 | `{"erro": "ISBN já cadastrado."}` |

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|------------|--------|----------|
| **Node.js** | 20+ | Runtime JavaScript |
| **TypeScript** | ^5.6.3 | Tipagem estática |
| **Express.js** | ^4.18.2 | Framework HTTP |
| **TypeORM** | ^0.3.20 | ORM para persistência |
| **SQLite3** | ^5.1.6 | Banco de dados |
| **ts-node-dev** | ^2.0.0 | Desenvolvimento com hot-reload |

---

## 📁 Estrutura do Projeto

```
biblioteca-api/
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração TypeScript
├── .gitignore             # Arquivos ignorados pelo Git
├── README.md              # Este arquivo
├── database.sqlite        # Banco de dados (criado automaticamente)
└── src/
    ├── app.ts             # Configuração da aplicação Express
    ├── server.ts          # Inicialização do servidor
    ├── data-source.ts     # Configuração do TypeORM
    ├── entity/
    │   └── Livro.ts       # Entidade Livro (decoradores TypeORM)
    ├── repository/
    │   └── LivroRepository.ts  # Operações CRUD com banco de dados
    └── controller/
        └── LivroController.ts  # Rotas e lógica de negócio
```

---

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 20+ instalado
- npm ou yarn

### **1. Instalar Dependências**
```bash
cd biblioteca-api
npm install
```

### **2. Executar em Modo Desenvolvimento**
```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000`

Você verá:
```
🚀 Servidor rodando em http://localhost:3000
```

### **3. Compilar para Produção**
```bash
npm run build
```

Gera a pasta `dist/` com o código compilado.

### **4. Executar em Produção**
```bash
npm start
```

---

## 🧪 Testando a API

### **Com cURL**
```bash
# Criar livro
curl -X POST http://localhost:3000/api/livros \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Padrões de Projeto","autor":"Gang of Four","isbn":"978-0201633610","anoPublicacao":1994,"disponivel":true}'

# Listar todos
curl http://localhost:3000/api/livros

# Buscar por ID
curl http://localhost:3000/api/livros/1

# Atualizar
curl -X PUT http://localhost:3000/api/livros/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Padrões de Projeto - Guia","autor":"Gang of Four","isbn":"978-0201633610","anoPublicacao":1994,"disponivel":false}'

# Atualizar parcialmente
curl -X PATCH http://localhost:3000/api/livros/1 \
  -H "Content-Type: application/json" \
  -d '{"disponivel":true}'

# Excluir
curl -X DELETE http://localhost:3000/api/livros/1
```

### **Com Postman ou Insomnia**
Importe as requisições usando os exemplos acima.

---

## ✅ Validações Implementadas

A API valida automaticamente:

| Campo | Validação |
|-------|-----------|
| `titulo` | Obrigatório, mínimo 2 caracteres |
| `autor` | Obrigatório, mínimo 2 caracteres |
| `isbn` | Obrigatório, 10-17 caracteres, deve ser único |
| `anoPublicacao` | Obrigatório, inteiro entre 1450 e ano atual |
| `disponivel` | Obrigatório, deve ser booleano |

**Exemplo de resposta com erros (400 Bad Request):**
```json
{
  "erros": [
    "titulo é obrigatório e deve ter pelo menos 2 caracteres.",
    "isbn é obrigatório e deve ter entre 10 e 17 caracteres."
  ]
}
```

---

## 📊 Banco de Dados

A API utiliza **SQLite3** com as seguintes características:

- **Arquivo:** `database.sqlite` (criado automaticamente)
- **Sincronização:** Automática (`synchronize: true`)
- **Tabela:** `livros` com campos mapeados pela entidade `Livro`
- **Constraints:** ISBN único

---

## 📝 Notas Importantes

1. **Sincronização Automática**: O TypeORM cria/atualiza tabelas automaticamente na inicialização (modo educacional)

2. **ISBN Único**: Cada livro deve ter um ISBN único. O sistema valida isso tanto na entidade quanto na lógica de negócio

3. **Disponibilidade**: O campo `disponivel` padrão é `true` para novos livros

4. **Validação de Data**: O ano de publicação deve estar entre 1450 (invenção da imprensa) e o ano atual

---

## 🤝 Contribuições

Este é um projeto educacional. Para melhorias ou correções, sinta-se livre para fazer um fork e abrir um pull request.

---

## 📄 Licença

MIT

---

## 👤 Autor

**Maria Augusta Kley Aguiar Fialho**  
TADS044 - Eletiva 01 – Arquitetura e Desenvolvimento Back-end

---

## 📞 Suporte

Para dúvidas ou problemas com a API, abra uma issue no repositório GitHub.

---

**Última atualização:** 09/12/2025
