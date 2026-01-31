# 🗂️ Nolen Task Manager — Web

Frontend do **Nolen Task Manager**, uma aplicação web para gerenciamento de tarefas com dashboard de métricas por usuário.

Este projeto é responsável pela **interface**, **experiência do usuário** e **consumo da API REST**, desenvolvida no backend do sistema.

---

## 🧩 Arquitetura Geral

O sistema é dividido em dois projetos principais:

- **Backend** → API REST (Node.js, Express, Sequelize, PostgreSQL)
- **Frontend (este repositório)** → Interface Web (Next.js, React)

📌 O frontend **não contém regras de negócio**, apenas consome e apresenta os dados fornecidos pela API.

---

## 🚀 Tecnologias

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Fetch API**
- **Charts (Radar Chart)**
- **ESLint / Prettier**

---

## ✨ Funcionalidades

- ✅ Exibição de dados do usuário
- ✅ Listagem de tarefas
- ✅ Criação de novas tarefas
- ✅ Exclusão de tarefas
- ✅ Dashboard com métricas:
  - Contagem de tarefas por status
  - Visualização gráfica de performance
- ✅ Skeleton loading
- ✅ Layout responsivo (mobile / desktop)

---

## 📊 Dashboard

O dashboard exibe informações consolidadas do usuário, incluindo:

- Nome e status
- Quantidade de tarefas por status
- Gráfico de performance
- Atualização dinâmica após criação e exclusão de tarefas

---

## 📊 Tarefas

Tarefas exibe as tarefas do usuário e executa ações, incluindo:

- Cadastros de novas tarefas
- Edição de tarefas do usuário logado
- Exclusão de tarefas

---

## 🧱 Estrutura do Projeto

```text
src/
├── app/
│   ├── api/              # Rotas internas do Next
│   ├── dashboard/        # Páginas
│   ├── register/         # Páginas
│   ├── task/             # Páginas
│   └── page.tsx
├── components/
│   ├── ui/               # Componentes do shadcn/ui
│   ├── app_sidebar.tsx
│   ├── modal_confirm.tsx
│   ├── status_card.tsx
├── types/                # Interfaces e contratos
├── proxy.ts
└── utils/
```

---

## ▶️ Como rodar o projeto

### Pré-requisitos

- Node.js **18+**
- npm ou yarn
- **Backend do Nolen Task Manager executando localmente**

---

### 1️⃣ Executar o Backend

Antes de iniciar o frontend, **é obrigatório executar o backend** seguindo **exatamente** o passo a passo descrito no README oficial da API:

👉 **Backend repository:**  
https://github.com/soymattheus/Nolen-Task-Manager-API

📌 Siga todas as etapas descritas no README do backend, incluindo:

- Instalação de dependências
- Configuração das variáveis de ambiente
- Execução das migrations
- Inicialização do servidor

---

### 2️⃣ Executar o Frontend

1. Clone este repositório:

```bash
git clone https://github.com/soymattheus/Nolen-Task-Manager-Web.git
```

2. Acesse o diretório:

```bash
cd Nolen-Task-Manager-Web
```

3. Istale as depedências:

```bash
npm install
```

4. Configure as variáveis de ambiente.
   Crie um arquivo.env.local na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

5. Inicie o projeto:

```bash
npm run dev
```

6. Aplicação estará disponível em:

```bash
http://localhost:3000
```

## 🔌 Integração com Backend

Este projeto consome a API REST do **Nolen Task Manager Backend**.

📌 Certifique-se de que o backend esteja rodando corretamente antes de iniciar o frontend.

### Exemplos de endpoints consumidos

- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/register`
- `GET /user/me`
- `GET /tasks?page=1&limit=10&status=$P`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

---

## 🧠 Decisões técnicas tomadas

- Utilização do **Next.js App Router** para melhor organização e rotas modernas.
- Uso de **TypeScript** para garantir tipagem forte e maior segurança.
- Adoção de **Tailwind CSS + shadcn/ui** para produtividade e consistência visual.
- Comunicação com o backend via **Fetch API**, mantendo baixo acoplamento.
- Implementação de **Skeleton Loading** para melhorar a experiência do usuário.
- Separação clara entre componentes de UI, serviços de API e contratos de dados.

---

## 🔧 O que eu melhoraria se tivesse mais tempo

- Uso de **React Query / TanStack Query** para cache e revalidação.
- Criação de testes automatizados (Playwright).
- Implementação de dark mode.
- Organização de estado global (Context API ou Zustand).
- Pipeline de CI/CD para lint, build e testes.

---

## 💪 Pontos fortes e limitações da solução

### Pontos fortes

- Arquitetura clara e bem separada do backend.
- Código limpo, tipado e fácil de manter.
- Interface moderna e responsiva.
- Dashboard com métricas visuais claras.
- Boa experiência de usuário com skeleton loading.
- Implementação de autenticação e autorização (JWT).
- Tratamento de erros e feedback visual.

### Limitações

- Não há cache de requisições.
- Dependência total do backend para os dados.
- Testes automatizados ainda não implementados.

---

## 👤 Autor

**Matheus Tavares**  
GitHub: [@soymattheus](https://github.com/soymattheus)
