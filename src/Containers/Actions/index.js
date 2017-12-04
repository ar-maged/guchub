/* @flow */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Card from './Card';

const Actions = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Actions</Text>
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
      horizontal
    >
      <Card index={0} title="My Grades" colors={['#FCD5AC', '#F1837B']} />
      <Card index={1} title="Schedule" colors={['#49B4F1', '#8863F0']} />
      <Card index={2} title="Transcript" colors={['#F4A9D3', '#A00EC0']} />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: { marginTop: 24 },
  scrollViewContainer: { paddingLeft: 16 },
  title: {
    paddingLeft: 16,
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Actions;
