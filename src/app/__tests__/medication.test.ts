import { useMedicationStore } from '../../store/useMedicationStore';
import { MedicationSchema } from '../../types/medication';

// Resetar o store antes de cada teste
beforeEach(() => {
  useMedicationStore.setState({ medications: [] });
});

describe('1. Regras de Negócio (Zod)', () => {
  it('Deve validar um medicamento correto', () => {
    const valid = { name: 'Aspirina', dosage: '500mg', intervalHours: 8 };
    const result = MedicationSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('ERRO: Não deve aceitar intervalo negativo ou zero', () => {
    const invalid = { name: 'Aspirina', dosage: '500mg', intervalHours: 0 };
    const result = MedicationSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('ERRO: Nome é obrigatório', () => {
    const invalid = { name: '', dosage: '500mg', intervalHours: 8 };
    const result = MedicationSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});

describe('2. Fluxo de Estado (Zustand)', () => {
  it('Deve adicionar um medicamento na lista', () => {
    const store = useMedicationStore.getState();
    expect(store.medications.length).toBe(0);

    store.addMedication({ name: 'Teste', dosage: '10mg', intervalHours: 12 });

    const newStore = useMedicationStore.getState();
    expect(newStore.medications.length).toBe(1);
    expect(newStore.medications[0].name).toBe('Teste');
  });
});