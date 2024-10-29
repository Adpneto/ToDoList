# 📋 ToDoList

Este projeto é uma aplicação de gerenciamento de tarefas simples e eficaz, desenvolvida com foco em funcionalidade, desempenho e usabilidade. A ToDoList permite que usuários façam login e organizem suas tarefas de maneira intuitiva e personalizada.

## 🛠️ Tecnologias Utilizadas

- **React + Vite**: Framework e ferramenta de build para uma aplicação rápida e modular.
- **TypeScript**: Para tipagem segura e melhor manutenção de código.
- **ShadCN UI + Tailwind**: Interface moderna e responsiva com estilização consistente.
- **Firebase**: Banco de dados e autenticação de usuários, facilitando o armazenamento e recuperação de tarefas.

## 🚀 Funcionalidades

- **Autenticação de Usuários**: Usuários podem criar conta, fazer login e gerenciar suas tarefas.
- **Gerenciamento de Tarefas**: Adicione, edite e remova tarefas com facilidade.
- **Salvamento em Tempo Real**: As listas são salvas no Firebase e carregadas automaticamente ao fazer login.

## 📂 Estrutura do Projeto

- **/src**: Contém todos os componentes da aplicação e lógica de interação com o Firebase.
- **/styles**: Estilos personalizados utilizando Tailwind.
- **/services/firebase**: Configurações e funções para interagir com o Firebase.

## 🏁 Como Iniciar o Projeto

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

### Instalação
1. Clone este repositório:
   ```bash
   git clone https://github.com/Adpneto/ToDoList.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd todolist
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### Executando o Projeto
```bash
npm run dev
```
Acesse em seu navegador: `http://localhost:5173/`

## 🔒 Configuração do Firebase
1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
2. Configure a autenticação e banco de dados no Firebase.
3. Substitua as credenciais de configuração do Firebase no arquivo `firebaseConfig.js`.

## 📸 Capturas de Tela

Em breve imagens da interface

---

Se precisar de mais ajustes ou quiser incluir uma seção extra, avise!
