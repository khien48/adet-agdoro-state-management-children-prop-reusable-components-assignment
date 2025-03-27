import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Card } from './Card';

interface EntryModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
  editEntry?: { id: string; title: string; content: string } | null;
}

export function EntryModal({ visible, onClose, onSave, editEntry }: EntryModalProps) {
  const { isDark } = useTheme();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editEntry) {
      setTitle(editEntry.title);
      setContent(editEntry.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editEntry]);

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave(title, content);
      setTitle('');
      setContent('');
      onClose();
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={[
        styles.container,
        { backgroundColor: isDark ? '#1A202C' : '#FFFFFF' }
      ]}>
        <View style={[
          styles.header,
          { 
            backgroundColor: isDark ? '#1A202C' : '#FFFFFF',
            borderBottomColor: isDark ? '#2D3748' : '#F0F0F0'
          }
        ]}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <ChevronLeft size={24} color={isDark ? '#FFFFFF' : '#000000'} />
          </TouchableOpacity>
          <Text style={[
            styles.headerTitle,
            { color: isDark ? '#FFFFFF' : '#000000' }
          ]}>MY DIARY</Text>
        </View>

        <View style={styles.dateContainer}>
          <Text style={[
            styles.date,
            { color: isDark ? '#FFFFFF' : '#000000' }
          ]}>{currentDate}</Text>
        </View>

        <Card style={styles.inputCard}>
          <TextInput
            style={[
              styles.titleInput,
              { color: isDark ? '#FFFFFF' : '#000000' }
            ]}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={isDark ? '#A0AEC0' : '#999999'}
          />

          <TextInput
            style={[
              styles.contentInput,
              { color: isDark ? '#FFFFFF' : '#000000' }
            ]}
          
            placeholder="Dear Diary..."
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            placeholderTextColor={isDark ? '#A0AEC0' : '#999999'}
          />
        </Card>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingHorizontal: 8,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontFamily: 'InterSemiBold',
    fontSize: 18,
  },
  dateContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  date: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
  },
  inputCard: {
    margin: 20,
    padding: 10,
    paddingBottom: 400,
  },
  titleInput: {
    fontFamily: 'InterSemiBold',
    fontSize: 24,
    padding: 16,
  },
  contentInput: {
    flex: 1,
    fontFamily: 'InterRegular',
    fontSize: 16,
    padding: 16,
    minHeight: 200,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#0066FF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'InterSemiBold',
    color: '#FFFFFF',
    fontSize: 16,
  },
});