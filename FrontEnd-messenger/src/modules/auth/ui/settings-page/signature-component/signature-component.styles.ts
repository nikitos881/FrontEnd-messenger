import { StyleSheet } from 'react-native';



export const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    checkbox: {
      width: 20,
      height: 20,
      backgroundColor: '#3B0A45',
      marginRight: 10,
      borderRadius: 4,
    },
    title: {
      fontSize: 16,
      color: '#3B0A45',
    },
    signaturePreview: {
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#aaa',
      borderStyle: 'dashed',
      borderRadius: 8,
      marginBottom: 10,
    },
    editButton: {
      alignSelf: 'flex-start',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#3B0A45',
    },
    editText: {
      color: '#3B0A45',
    },
    signatureBox: {
      height: 300,
      borderWidth: 1,
      borderColor: '#aaa',
      borderRadius: 8,
      overflow: 'hidden',
    },
  });
  