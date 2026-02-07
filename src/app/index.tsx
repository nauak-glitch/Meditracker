import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMedicationStore } from '../store/useMedicationStore';

export default function Home() {
  const { medications } = useMedicationStore();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MediTracker 💊</Text>
      
      {medications.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="medkit-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum medicamento cadastrado.</Text>
          <Text style={styles.subText}>Toque no + para adicionar.</Text>
        </View>
      ) : (
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => router.push(`/details/${item.id}`)}
            >
              <View>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>{item.dosage}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.intervalHours}h</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Botão Flutuante (FAB) */}
      <Link href="/form" asChild>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20, marginTop: 40 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.7 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#555', marginTop: 10 },
  subText: { fontSize: 14, color: '#888' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  badge: { backgroundColor: '#e0f2fe', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { color: '#0284c7', fontWeight: 'bold' },
  fab: { position: 'absolute', right: 20, bottom: 40, backgroundColor: '#007AFF', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 4, shadowOffset: { width: 0, height: 4 } },
});