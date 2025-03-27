import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Pencil, Trash2, Star } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Card } from './Card';

interface DiaryEntryProps {
  id: string;
  title: string;
  content: string;
  date: string;
  isStarred?: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onToggleStar: (id: string) => void;
}

export function DiaryEntry({
  id,
  title,
  content,
  date,
  isStarred,
  onDelete,
  onEdit,
  onToggleStar,
}: DiaryEntryProps) {
  const { isDark } = useTheme();
  const previewContent = content.length > 50 ? content.substring(0, 50) + '...' : content;

  return (
    <Card>
      <View style={styles.header}>
        <View style={styles.starContainer}>
          <TouchableOpacity onPress={() => onToggleStar(id)}>
            <Star
              size={16}
              color={isStarred ? '#0066FF' : isDark ? '#A0AEC0' : '#666666'}
              fill={isStarred ? '#0066FF' : 'none'}
            />
          </TouchableOpacity>
          <Text style={[
            styles.title,
            { color: isDark ? '#FFFFFF' : '#000000' }
          ]}>{title}</Text>
        </View>
        <Text style={[
          styles.date,
          { color: isDark ? '#A0AEC0' : '#666666' }
        ]}>{date}</Text>
      </View>
      <Text style={[
        styles.preview,
        { color: isDark ? '#CBD5E0' : '#666666' }
      ]}>{previewContent}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(id)} style={styles.actionButton}>
          <Pencil size={20} color="#0066FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(id)} style={styles.actionButton}>
          <Trash2 size={20} color="#0066FF" />
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'InterRegular',
    fontSize: 12,
  },
  preview: {
    fontFamily: 'InterRegular',
    fontSize: 14,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
});