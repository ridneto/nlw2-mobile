import React from 'react';
import { View, Text } from 'react-native';
import PageHeader from '../../components/PageHeader';

import styles from './styles'

const TeacherList: React.FC = () => {
    return (
        <View style={styles.container}>
            <PageHeader title="Proffys Diponíveis"></PageHeader>
            <Text> teacher list </Text>
        </ View>
    )
}

export default TeacherList;
