import { useState } from 'react';
import { Image, StyleSheet, Platform, ScrollView, View, Text, TouchableOpacity, PanResponder, Modal, Dimensions, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
// import slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

export default function Paint() {
  const [paths, setPaths] = useState<Array<{ path: string }>>([]);
  const [currentPath, setCurrentPath] = useState("");

  // Pan Responder onStart, onMove, onGrant, onRelease
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath(`M${locationX},${locationY}`);
    },
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath((prev) => prev + ` L${locationX},${locationY}`);
    },
    onPanResponderRelease: () => {
      if (currentPath) {
        setPaths((prevPaths) => [...prevPaths, { path: currentPath }]);
        setCurrentPath('');
      }
    }
  });

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.title}>Paint</Text>
      </View>
      <View style={styles.canvasContainer}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    padding: 20,
    backgroundColor: '#384047',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5
  },
  canvasContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    alignItems: 'center',
    width: '100%',
    height: 400,
    elevation: 7
  }
});
