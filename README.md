# 💊 Meditracker - Menu do Projeto

Bem-vindo ao **Meditracker**, uma aplicação Cross-Platform (Mobile e Web) para gestão de medicamentos. Este arquivo serve como um **índice central** para todas as entregas e documentações.

---

## 📋 Menu Rápido

| Ícone | Seção | Descrição |
| :---: | :--- | :--- |
| 🚀 | **[Como Rodar](#-como-rodar-o-app)** | Passo a passo de instalação e execução. |
| 🧪 | **[Como Testar](#-como-rodar-os-testes)** | Execução dos testes automatizados. |
| 📂 | **[Documentação](#-onde-estão-os-documentos-e-evidências)** | Links para Relatórios, Planos e Checkpoints. |
| 🎥 | **[Vídeo Demo](#-vídeo-demonstrativo)** | Link da gravação funcional. |

---

**Repositório:**
git  <https://github.com/nauak-glitch/Meditracker>

## 📂 Onde estão os Documentos e Evidências?

Todos os arquivos de entrega estão organizados na raiz do repositório:

### 🆔 Identificação:
Consulte o arquivo [`identificacao.md`](./identificacao.md) para dados do aluno e resumo do trabalho.

### 🚩 Checkpoints (Cronograma):
Consulte [`checkpoints.md`](./checkpoints.md) para ver a evolução passo a passo (do Hello World à versão final).

### 📝 Relatório Técnico:
Consulte [`relatorio_final.md`](./relatorio_final.md) para entender como resolvemos os problemas de versão do React 19 e a adaptação Web/Mobile.

### 🧪 Qualidade:
Consulte [`plano_de_testes.md`](./plano_de_testes.md) para ver os cenários de teste cobertos.

### 📸 Prints e Evidências:
As capturas de tela (Testes passando, Validação de erro, CRUD) estão organizadas na pasta `/evidencias` (ou na raiz, conforme enviado).

---

## 🎥 Vídeo Demonstrativo

O vídeo abaixo demonstra o funcionamento do CRUD, as validações de erro e a compatibilidade Web/Mobile.

🔗 **[https://drive.google.com/file/d/1RGLFvJLLDJ_mB9RbrXgZHig4NWMthx9m/view?usp=sharing]**

## 🚀 Como Rodar o App

⚠️ **Importante:** Este projeto utiliza o **Expo SDK 54** com **React 19**. Para evitar conflitos de versão conhecidos, siga os comandos abaixo estritamente.

### 1. Instalação
Abra o terminal na pasta do projeto e rode:
```bash
npm install --legacy-peer-deps
(A flag --legacy-peer-deps é obrigatória para resolver o conflito entre bibliotecas de ícones e o React 19).

npm install -g expo-cli

ou

npm install expo

2. Execução
Para iniciar o projeto (Android, iOS ou Web), use o comando de limpeza de cache:

Bash
npx expo start -c
(O -c garante que o Metro Bundler não use versões antigas do Reanimated).

🧪 Como Rodar os Testes
O projeto conta com testes unitários cobrindo Validação de Dados (Zod) e Gerenciamento de Estado (Zustand).

Comando:

Bash
npm run test
Resultado Esperado: Você verá uma mensagem PASS verde, indicando que a lógica de negócios está íntegra.
