import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Picker } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles'
import { useFocusEffect } from '@react-navigation/native';
import SubjectsService, { ISubjectItemView } from '../../services/subjectsService';

const TeacherList: React.FC = () => {
    const [ isFiltersVisible, setIsFiltersVisible ] = useState(false);
    const [ teachers, setTeachers ] = useState([])
    const [ favorites, setFavorites ] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    const [ subjectsLis, setSubjectsList ] = useState<ISubjectItemView[]>([])

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

    async function loadSubjects(){
        const subjectsService = new SubjectsService()
        const data = await subjectsService.getSubjectsParsedAsItemView()

        setSubjectsList(data)
    }

    useEffect(() => {
        loadSubjects();
    }, [])

    useFocusEffect(() => {
        loadFavorites();
    })

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

                        <View style={styles.selectedView}>
                            <Picker
                                selectedValue={subject}
                                style={styles.selectedPicker}
                                onValueChange={item => setSubject(item)}
                            >
                                <Picker.Item value="" label="Escolha a matéria"/>
                                {subjectsLis.map(item => {
                                    return (
                                        <Picker.Item
                                            key={item.value}
                                            value={item.value}
                                            label={item.label}
                                        />
                                    )
                                })}
                            </Picker>
                        </View>

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}> Dia da semana </Text>

                                <View style={styles.selectedView}>
                                    <Picker
                                        selectedValue={week_day}
                                        style={styles.selectedPicker}
                                        onValueChange={item => setWeekDay(item)}
                                    >
                                        <Picker.Item value="" label="Escolha o dia"/>
                                        <Picker.Item value="0" label="Domingo"/>
                                        <Picker.Item value="1" label="Segunda-feira" />
                                        <Picker.Item value="2" label="Terça-feira" />
                                        <Picker.Item value="3" label="Quarta-feira" />
                                        <Picker.Item value="4" label="Quinta-feira" />
                                        <Picker.Item value="5" label="Sexta-feira" />
                                        <Picker.Item value="6" label="Sábado" />
                                    </Picker>
                                </View>
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
