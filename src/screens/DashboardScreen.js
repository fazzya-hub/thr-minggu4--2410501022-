import { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useTaskHandler } from '../hooks/useTaskHandler';
import TaskItem from '../components/TaskItem';

export default function DashboardScreen({ navigation }) {
  const { colors } = useContext(ThemeContext);
  const { tasks, taskReady, addTask } = useTaskHandler();
  const styles = getStyles(colors);

  const [judul, setJudul] = useState('');
  const [catatan, setCatatan] = useState('');
  const [error, setError] = useState('');

  const doneCount = tasks.filter((t) => t.done).length;
  const pct = tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100);

  function handleAdd() {
    const title = judul.trim();
    if (!title) {
      setError('Judul task masih kosong.');
      return;
    }
    setError('');
    addTask({ title, note: catatan });
    setJudul('');
    setCatatan('');
  }

  if (!taskReady) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.brand} />
        <Text style={styles.muted}>Memuat data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Ringkasan Hari Ini</Text>
        <Text style={styles.summaryValue}>{pct}% selesai</Text>
        <Text style={styles.summarySub}>
          {doneCount} dari {tasks.length} task selesai
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Tambah Task</Text>
      <TextInput
        value={judul}
        onChangeText={(t) => {
          setJudul(t);
          if (error) setError('');
        }}
        placeholder="Judul task (contoh: Sholat)"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />
      <TextInput
        value={catatan}
        onChangeText={setCatatan}
        placeholder="Catatan singkat (Maghrib)"
        placeholderTextColor={colors.muted}
        style={[styles.input, styles.inputNote]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.addBtn} onPress={handleAdd} activeOpacity={0.9}>
        <Text style={styles.addText}>Tambah</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Daftar Task</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onPressDetail={(task) => navigation.navigate('Detail', { taskId: task.id })}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.mutedCenter}>Belum ada task. Tambahkan di atas.</Text>}
      />
    </View>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: c.bg,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: c.bg,
    },
    summaryCard: {
      backgroundColor: c.brand2,
      borderRadius: 16,
      padding: 14,
      marginBottom: 14,
    },
    summaryTitle: { color: '#D1FAE5', fontWeight: '700', fontSize: 14 },
    summaryValue: { color: '#fff', fontWeight: '900', fontSize: 30, marginTop: 2 },
    summarySub: { color: '#ECFDF5', marginTop: 2, fontSize: 13 },
    sectionTitle: { color: c.text, fontWeight: '900', fontSize: 16, marginBottom: 8 },
    input: {
      borderWidth: 1,
      borderColor: c.border,
      backgroundColor: c.card,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: c.text,
      marginBottom: 10,
    },
    inputNote: { fontSize: 14 },
    addBtn: {
      backgroundColor: c.brand,
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 14,
    },
    addText: { color: '#fff', fontWeight: '900', fontSize: 15 },
    error: { color: c.danger, marginBottom: 10, fontWeight: '700' },
    listContent: { paddingBottom: 24 },
    muted: { color: c.muted, marginTop: 8 },
    mutedCenter: { textAlign: 'center', color: c.muted, marginTop: 16 },
  });

