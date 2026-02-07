import { z } from 'zod';

// Aqui definimos as regras que o professor pediu (3 regras mínimas)
export const MedicationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nome do medicamento é obrigatório.'),
  dosage: z.string().min(1, 'A dosagem é obrigatória (ex: 500mg).'),
  intervalHours: z.coerce
    .number()
    .min(1, 'O intervalo deve ser de no mínimo 1 hora.')
    .max(24, 'O intervalo deve ser de no máximo 24 horas.'),
});

export type Medication = z.infer<typeof MedicationSchema>;