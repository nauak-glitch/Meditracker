# 🧪 Plano de Testes - Meditracker

## 1. Escopo dos Testes
O foco dos testes unitários foi validar a **Lógica de Negócio** e o **Gerenciamento de Estado**, isolando a interface gráfica.

## 2. Ferramentas
- **Jest:** Framework de testes.
- **@testing-library/jest-native:** Extensões de matchers.
- **Zod:** Para validar se os esquemas de dados estão corretos.

## 3. Cenários de Teste (Unitários)

### 3.1. Validação de Dados (Schema/Zod)
| ID | Cenário | Entrada | Resultado Esperado | Status |
|----|---------|---------|--------------------|--------|
| T01 | Medicamento Válido | `{ name: 'Dipirona', dosage: '500mg', interval: 6 }` | ✅ Sucesso (`true`) | Passou |
| T02 | Intervalo Inválido | `{ ..., interval: 0 }` | ❌ Erro de Validação | Passou |
| T03 | Nome Vazio | `{ name: '' }` | ❌ Erro de Validação | Passou |

### 3.2. Gerenciamento de Estado (Zustand)
| ID | Cenário | Ação | Resultado Esperado | Status |
|----|---------|------|--------------------|--------|
| T04 | Estado Inicial | Iniciar Store | Lista vazia `[]` | Passou |
| T05 | Adicionar Item | `addMedication({...})` | Lista com 1 item | Passou |
| T06 | Integridade | Verificar dados inseridos | Nome e Dosagem batem | Passou |

## 4. Evidência de Execução
comando: `npm run test`
Resultado:
> PASS src/app/__tests__/medication.test.ts
> Test Suites: 1 passed, 1 total
> Tests: 4 passed, 4 total