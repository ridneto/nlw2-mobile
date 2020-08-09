import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader';

import styles from './styles'
import TeacherItem, { ITeacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';

const Favorites: React.FC = () => {
    const [ favorites, setFavorites ] = useState<ITeacher[]>([]);

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);

                setFavorites(favoritedTeachers)
            }
        });
    }

    useFocusEffect(() => {
        loadFavorites();
    })

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos"></PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map(teacher => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited
                        />
                    )
                })}
            </ScrollView>
        </ View>
    )
}

export default Favorites;
