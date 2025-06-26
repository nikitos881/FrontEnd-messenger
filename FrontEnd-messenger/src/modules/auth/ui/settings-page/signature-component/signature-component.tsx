import Signature from 'react-native-signature-canvas';
import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './signature-component.styles';

export function SignatureComponent() {
    const [signature, setSignature] = useState<string | null>(null);
  const [showSignature, setShowSignature] = useState(false);
  const signatureRef = useRef<any>(null);

  // const sendToServer = async (base64Signature) => {
  //   try {
  //     await fetch('https://your-server.com/upload', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ signature: base64Signature }),
  //     });
  //     console.log('Signature sent!');
  //   } catch (error) {
  //     console.error('Upload error:', error);
  //   }
  // };
  

  const handleOK = (sig: string) => {
    setSignature(sig);
    setShowSignature(false);
    // saveToLocalFile(sig); // сохранить локально
    // sendToServer(sig)
  };

  const handleClear = () => {
    signatureRef.current.clearSignature();
  };

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <View style={styles.checkboxRow}>
        <View style={styles.checkbox} />
        <Text style={styles.title}>Мій електронний підпис</Text>
      </View>

      {/* Подпись — если есть */}
      {signature && !showSignature && (
        <View style={styles.signaturePreview}>
          <Text>Підпис збережено ✅</Text>
        </View>
      )}

      {/* Кнопка открыть редактор */}
      {!showSignature && (
        <TouchableOpacity style={styles.editButton} onPress={() => setShowSignature(true)}>
          <Text style={styles.editText}>Редагувати підпис</Text>
        </TouchableOpacity>
      )}

      {/* Поле подписи */}
      {showSignature && (
        <View style={styles.signatureBox}>
          <Signature
            ref={signatureRef}
            onOK={handleOK}
            onClear={() => setSignature(null)}
            descriptionText="Намалюйте свій підпис"
            clearText="Очистити"
            confirmText="Зберегти"
            webStyle={`.m-signature-pad--footer { display: none; margin: 0; }`}
            backgroundColor="#fff"
          />
        </View>
      )}

      {signature && !showSignature && (
        <View style={styles.signaturePreview}>
          <Image
            source={{ uri: signature }}
            style={{ width: '100%', height: 120, resizeMode: 'contain' }}
          />
        </View>
      )}
    </View>
  );
}
