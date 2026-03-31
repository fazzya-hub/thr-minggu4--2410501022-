import { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useTaskHandler } from '../hooks/useTaskHandler';

export default function DetailScreen({ route, navigation }) {
  const { colors } = useContext(ThemeContext);
  const { tasks, toggleDone, deleteTask } = useTaskHandler();
  const styles = getStyles(colors);

  const { taskId } = route.params;
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Task tidak ditemukan</Text>
        <Text style={styles.muted}>
          Mungkin task sudah dihapus. Kembali ke Dashboard untuk melihat list terbaru.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Judul</Text>
        <Text style={styles.title}>{task.title}</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Catatan</Text>
        <Text style={styles.note}>{task.note ? task.note : '—'}</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Status</Text>
        <Text style={styles.status}>{task.done ? 'Selesai' : 'Belum selesai'}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primary}
          onPress={() => {
            toggleDone(task.id);
          }}
          activeOpacity={0.9}
        >
          <Text style={styles.primaryText}>{task.done ? 'Batalkan Selesai' : 'Tandai Selesai'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.danger}
          onPress={() => {
            deleteTask(task.id);
            navigation.goBack();
          }}
          activeOpacity={0.9}
        >
          <Text style={styles.dangerText}>Hapus Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: c.bg },
    card: {
      backgroundColor: c.card,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 16,
      padding: 16,
    },
    label: { color: c.muted, fontWeight: '800', fontSize: 12, letterSpacing: 0.2 },
    title: { color: c.text, fontWeight: '900', fontSize: 20, marginTop: 4 },
    note: { color: c.text, marginTop: 4, fontSize: 15, lineHeight: 22 },
    status: { color: c.brand, fontWeight: '900', marginTop: 4, fontSize: 15 },
    muted: { color: c.muted, marginTop: 8, lineHeight: 22 },
    actions: { marginTop: 14, gap: 10 },
    primary: {
      backgroundColor: c.brand,
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
    },
    primaryText: { color: '#fff', fontWeight: '900' },
    danger: {
      backgroundColor: c.danger,
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
    },
    dangerText: { color: '#fff', fontWeight: '900' },
  });

