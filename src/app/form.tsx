import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useMedicationStore } from '../store/useMedicationStore';
import { Medication, MedicationSchema } from '../types/medication';

export default function FormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addMedication, updateMedication, medications } = useMedicationStore();
  const isEditing = !!id;

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Medication>({
    resolver: zodResolver(MedicationSchema) as any, // <--- ADICIONE ISSO
    defaultValues: { name: '', dosage: '', intervalHours: 0 }
  });

  // Carregar dados se for edição
  useEffect(() => {
    if (isEditing) {
      const item = medications.find(m => m.id === id);
      if (item) {
        setValue('name', item.name);
        setValue('dosage', item.dosage);
        setValue('intervalHours', Number(item.intervalHours));
      }
    }
  }, [id]);

  const onSubmit = (data: Medication) => {
    if (isEditing && typeof id === 'string') {
      updateMedication(id, data);
    } else {
      addMedication(data);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Editar Medicamento' : 'Novo Medicamento'}</Text>

      <Text style={styles.label}>Nome do Medicamento</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} onChangeText={onChange} value={value} placeholder="Ex: Dipirona" />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Text style={styles.label}>Dosagem</Text>
      <Controller
        control={control}
        name="dosage"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} onChangeText={onChange} value={value} placeholder="Ex: 500mg" />
        )}
      />
      {errors.dosage && <Text style={styles.error}>{errors.dosage.message}</Text>}

      <Text style={styles.label}>Intervalo (em horas)</Text>
      <Controller
        control={control}
        name="intervalHours"
        render={({ field: { onChange, value } }) => (
          <TextInput 
            style={styles.input} 
            onChangeText={onChange} 
            value={value ? String(value) : ''} 
            keyboardType="numeric" 
            placeholder="Ex: 8" 
          />
        )}
      />
      {errors.intervalHours && <Text style={styles.error}>{errors.intervalHours.message}</Text>}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 5, color: '#333', fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 5, fontSize: 16, backgroundColor: '#fafafa' },
  error: { color: '#ef4444', fontSize: 12, marginBottom: 15 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  button: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  saveButton: { backgroundColor: '#007AFF' },
  cancelButton: { backgroundColor: '#f2f2f2' },
  saveText: { color: '#fff', fontWeight: 'bold' },
  cancelText: { color: '#333', fontWeight: 'bold' },
});