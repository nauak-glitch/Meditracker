import { create } from 'zustand';
import { Medication } from '../types/medication';

interface MedicationState {
  medications: Medication[];
  addMedication: (medication: Medication) => void;
  updateMedication: (id: string, data: Medication) => void;
  deleteMedication: (id: string) => void;
}

export const useMedicationStore = create<MedicationState>((set) => ({
  medications: [],
  
  addMedication: (medication) =>
    set((state) => ({
      medications: [...state.medications, { ...medication, id: Math.random().toString() }],
    })),

  updateMedication: (id, data) =>
    set((state) => ({
      medications: state.medications.map((item) =>
        item.id === id ? { ...data, id } : item
      ),
    })),

  deleteMedication: (id) =>
    set((state) => ({
      medications: state.medications.filter((item) => item.id !== id),
    })),
}));