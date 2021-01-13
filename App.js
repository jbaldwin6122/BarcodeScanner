import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import Card from './components/Card';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [actionChosen, setActionChosen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const barcodeScannedHandler = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const addBarcodeHandler = () => {

  }

  const removeBarcodeHandler = () => {
      
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  let nextStep = <Card><Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} /></Card>

  if (actionChosen == false) {
      nextStep = (
        <Card>
            <Button title={'Add to Inventory'} onPress={() => {setActionChosen(true); addBarcodeHandler(); }}/>
            <Button title={'Remove from Inventory'} onPress={() => {setActionChosen(true); removeBarcodeHandler(); }}/>
            <Button title={'Forget'} onPress={() => setActionChosen(true)}/>
        </Card>
      )
  } 
  if (actionChosen == true) {
      nextStep = (
        <Card>
            <Button title={'Tap to Scan Again'} onPress={() => {setScanned(false); setActionChosen(false); }} />
        </Card>
      )
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : barcodeScannedHandler}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && nextStep}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
