# 📇 Contact Management

Uma aplicação fullstack para gerenciamento de contatos com autenticação via JWT e cookies (HTTP-only). O projeto permite que usuários cadastrem, editem e excluam contatos, além de visualizar suas informações de forma simples e intuitiva.

---

## 🧩 Tecnologias Utilizadas

### Frontend

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [React Query](https://tanstack.com/query/v4)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/)
- [Shadcn UI](https://ui.shadcn.com/) (para componentes e estilos)

### Backend - [Repositorio do Backend](https://github.com/Yan-CarlosIF/api-contact-management)

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [JWT](https://jwt.io/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

---

## 🧪 Funcionalidades

- ✅ Autenticação de usuários com cookies (HTTP-only)
- ✅ Login e logout
- ✅ Cadastro de novos contatos
- ✅ Edição e exclusão de contatos
- ✅ Feedbacks com notificações de sucesso e erro usando Sonner
- ✅ Interface responsiva e moderna
- ✅ Deploy em produção com Vercel (frontend) e Render (backend)

---

## 🚀 Como rodar o projeto localmente

### 1. Clone os repositórios

```bash
git clone https://github.com/Yan-CarlosIF/contact-management.git # Frontend
git clone https://github.com/Yan-CarlosIF/api-contact-management.git # Backend
```

---

### 2. Rode o frontend

```bash
cd contact-management

# Se não tiver o pnpm, instale-o
npm install -g pnpm

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm run dev
```

O frontend ficará disponível em: `http://localhost:5173`

---

## 🌐 Deploy

- **Frontend (Vercel):**  
  https://contact-management-rho-green.vercel.app/

- **Backend (Render):**  
  https://api-contact-management.onrender.com/

---

## 📁 Estrutura de Pastas (Frontend)

```
📁 src
 ┣ 📁 api            # Requisições com axios
 ┣ 📁 assets         # Imagens utilizadas
 ┣ 📁 components     # Componentes reutilizáveis
 ┣ 📁 helpers        # Funções utilitárias
 ┣ 📁 lib            # Configurações das bibliotecas
 ┣ 📁 pages          # Páginas da aplicação
 ┗ 📁 types          # Tipagem dos modelos do prisma
```

---

## 💡 Autor

Desenvolvido por **Yan Carlos**  
[GitHub](https://github.com/Yan-CarlosIF)
