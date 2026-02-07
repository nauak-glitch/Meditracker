import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMedicationStore } from '../../store/useMedicationStore';

export default function Details() {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const router = useRouter();
  const { medications, deleteMedication } = useMedicationStore();
  
  const medication = medications.find(m => m.id === id);

  if (!medication) {
    return (
      <View style={styles.container}>
        <Text>Medicamento não encontrado.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
           <Text style={{color: 'blue'}}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleDelete = () => {
    console.log("Botão Excluir pressionado!"); // Veja isso no F12 (Navegador) ou Terminal (Metro)

    if (!id) {
      console.error("ID inválido");
      return;
    }

    // --- LÓGICA ESPECÍFICA PARA WEB ---
    if (Platform.OS === 'web') {
      const confirmDelete = window.confirm(`Tem certeza que deseja remover ${medication.name}?`);
      if (confirmDelete) {
        deleteMedication(id);
        console.log("Item excluído na Web");
        router.back();
      }
      return; 
    }

    // --- LÓGICA PARA CELULAR (Android/iOS) ---
    Alert.alert(
      'Excluir Medicamento',
      `Tem certeza que deseja remover ${medication.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive', 
          onPress: () => {
            deleteMedication(id);
            router.back();
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>{medication.name}</Text>
      
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="fitness-outline" size={24} color="#007AFF" />
          <View style={styles.infoBox}>
            <Text style={styles.label}>Dosagem</Text>
            <Text style={styles.value}>{medication.dosage}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Ionicons name="time-outline" size={24} color="#007AFF" />
          <View style={styles.infoBox}>
            <Text style={styles.label}>Intervalo</Text>
            <Text style={styles.value}>A cada {medication.intervalHours} horas</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]} 
          onPress={() => router.push(`/form?id=${id}`)}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>

        {/* Botão de Excluir */}
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={handleDelete}
        >
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', paddingTop: 50 },
  backButton: { marginBottom: 20, width: 40, height: 40, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, marginBottom: 30 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  infoBox: { marginLeft: 15 },
  label: { fontSize: 14, color: '#666', marginBottom: 2 },
  value: { fontSize: 18, fontWeight: '600', color: '#333' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 10 },
  // Ajuste no gap para compatibilidade Web antiga, se necessário
  actions: { flexDirection: 'column', gap: 10 }, 
  button: { padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  editButton: { backgroundColor: '#007AFF' },
  deleteButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ef4444' },
  editText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  deleteText: { color: '#ef4444', fontWeight: 'bold', fontSize: 16 },
});