import { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useTaskHandler } from '../hooks/useTaskHandler';

export default function TaskItem({ item, onPressDetail }) {
  const { colors } = useContext(ThemeContext);
  const { toggleDone, deleteTask } = useTaskHandler();
  const styles = getStyles(colors);

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.left} onPress={() => toggleDone(item.id)} activeOpacity={0.85}>
        <View style={[styles.check, item.done && styles.checkOn]}>
          {item.done ? <Text style={styles.checkText}>✓</Text> : null}
        </View>
        <View style={styles.textWrap}>
          <Text style={[styles.title, item.done && styles.titleDone]} numberOfLines={1}>
            {item.title}
          </Text>
          {item.note ? (
            <Text style={styles.note} numberOfLines={1}>
              {item.note}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.detailBtn} onPress={() => onPressDetail(item)} activeOpacity={0.85}>
          <Text style={styles.detailText}>Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteTask(item.id)}
          activeOpacity={0.85}
        >
          <Text style={styles.deleteText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    card: {
      backgroundColor: c.card,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 14,
      padding: 12,
      marginBottom: 10,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    check: {
      width: 26,
      height: 26,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: c.brand,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    checkOn: {
      backgroundColor: c.brand,
    },
    checkText: {
      color: '#fff',
      fontWeight: '900',
    },
    textWrap: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: '800',
      color: c.text,
    },
    titleDone: {
      textDecorationLine: 'line-through',
      color: c.muted,
    },
    note: {
      marginTop: 2,
      fontSize: 13,
      color: c.muted,
    },
    actions: {
      flexDirection: 'row',
      gap: 8,
    },
    detailBtn: {
      flex: 1,
      backgroundColor: c.brand,
      borderRadius: 10,
      paddingVertical: 10,
      alignItems: 'center',
    },
    detailText: {
      color: '#fff',
      fontWeight: '800',
    },
    deleteBtn: {
      flex: 1,
      backgroundColor: c.danger,
      borderRadius: 10,
      paddingVertical: 10,
      alignItems: 'center',
    },
    deleteText: {
      color: '#fff',
      fontWeight: '800',
    },
  });

