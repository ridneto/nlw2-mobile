import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles'

const TeacherList: React.FC = () => {
    const [ isFiltersVisible, setIsFiltersVisible ] = useState(false);
    const [ teachers, setTeachers ] = useState([])
    const [ favorites, setFavorites ] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);

                const favoritedTeachersId = favoritedTeachers.map((teacher: ITeacher) => {
                    return teacher.id
                })

                setFavorites(favoritedTeachersId)
            }
        });
    }

    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit(){
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
        setIsFiltersVisible(false);
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys Diponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )}>
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}> Matéria </Text>
                        <TextInput
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            style={styles.input}
                            placeholderTextColor='#c1bccc'
                            placeholder="Qual a matéria?"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}> Dia da semana </Text>

                                <TextInput
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    style={styles.input}
                                    placeholderTextColor='#c1bccc'
                                    placeholder="Qual o dia?"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}> Horário </Text>

                                <TextInput
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    style={styles.input}
                                    placeholderTextColor='#c1bccc'
                                    placeholder="Qual horário?"
                                />
                            </View>

                        </View>

                        <RectButton
                            onPress={handleFiltersSubmit}
                            style={styles.submitButton}
                        >
                            <Text style={styles.submitText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: ITeacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
            </ScrollView>
        </ View>
    )
}

export default TeacherList;
