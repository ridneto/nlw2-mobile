import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PageHeader from '../../components/PageHeader';

import styles from './styles'
import TeacherItem from '../../components/TeacherItem';

const TeacherList: React.FC = () => {
    return (
        <View style={styles.container}>
            <PageHeader title="Proffys Diponíveis"></PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                <TeacherItem></TeacherItem>
                <TeacherItem></TeacherItem>
            </ScrollView>
        </ View>
    )
}

export default TeacherList;
