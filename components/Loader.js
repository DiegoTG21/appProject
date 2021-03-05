import {ActivityIndicator,View} from 'react-native';
import React, { Component } from 'react';

 const Loader = () => (
    <View style={{ minHeight: 230, padding: 20 }}>
      <ActivityIndicator
        color="magenta"
        size="large"
        style={{ alignSelf: "center" }}
      />
    </View>
  );
  export default Loader;