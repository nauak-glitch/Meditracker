# 📝 Relatório Final de Desenvolvimento

## 1. Contexto do Projeto
O Meditracker foi desenvolvido simulando um ambiente de 2026, utilizando as versões mais recentes do Expo (SDK 54).

## 2. Desafios Técnicos Enfrentados

### A. O "Version Hell" (React 19 vs Expo)
**Problema:** O Expo SDK 54 utiliza React 19, mas muitas bibliotecas de testes e ícones (`lucide`, `jest-expo`) ainda dependiam do React 18.
**Impacto:** Erros de `ERESOLVE` na instalação e falhas no Jest (`SyntaxError`, `Cannot use import statement`).
**Solução:** 1. Ajuste manual do `package.json` para forçar versões compatíveis.
2. Uso da flag `--legacy-peer-deps` na instalação.
3. Configuração personalizada do `jest.config.js` e `babel.config.js`.

### B. Compatibilidade Web vs Mobile
**Problema:** O botão de "Excluir" funcionava no Android, mas não na Web.
**Causa:** O componente `Alert.alert` do React Native não tem suporte nativo direto em navegadores desktop para janelas modais de confirmação.
**Solução:** Implementação de lógica condicional usando `Platform.OS`.
```typescript
if (Platform.OS === 'web') {
  window.confirm(...) // Web
} else {
  Alert.alert(...)    // Mobile
}

### C. Configuração do Reanimated
**Problema:**  Erro `[BABEL] Cannot find module 'react-native-worklets/plugin'`.
**Solução:**  Downgrade estratégico da biblioteca **react-native-reanimated** da versão **4 (experimental)** para a **3.16 (estável)**, seguido da limpeza do cache do **Metro Bundler**.
---

### 3. Conclusão

O projeto atendeu a todos os requisitos **funcionais (CRUD)** e **não-funcionais (Testes, Cross-platform)**.  
A arquitetura utilizando **Zustand** permitiu testar a lógica sem depender da UI, facilitando a validação das regras de negócio.
``