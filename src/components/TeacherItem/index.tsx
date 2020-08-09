import React, { useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { View, Image, Text, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import heartOutLineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteOutLineIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles'

export interface ITeacher {
    "id": number,
    "user_id": number,
    "subject": string,
    "cost": number,
    "name": string,
    "avatar": string;
    "whatsapp": number;
    "bio": string;
  }

  interface ITeacherItemProps {
    teacher: ITeacher,
    favorited: Boolean
  }

const TeacherItem: React.FC<ITeacherItemProps> = ( { teacher, favorited } ) =>{
    const [isFavorited, setIsFavorited] = useState(favorited)

    function handleToLinkWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    async function handleToggleFavorite(){
        const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray: ITeacher[] = [];

        if(favorites){
            favoritesArray = JSON.parse(favorites);
        }

        if(isFavorited){
            const favoritedIndex = favoritesArray.findIndex(teacherItem => {
                return teacherItem.id === teacher.id
            });

            favoritesArray.splice(favoritedIndex, 1);
        } else {
            favoritesArray.push(teacher)
        }

        setIsFavorited(!isFavorited);
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}> {teacher.name} </Text>
                    <Text style={styles.subject}> {teacher.subject} </Text>
                </View>
            </View>


            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}> R$ {teacher.cost} </Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {}
                        ]}
                    >
                        { isFavorited ?
                            <Image source={heartOutLineIcon} /> :
                            <Image source={unfavoriteOutLineIcon} />
                        }
                    </RectButton>

                    <RectButton
                        onPress={handleToLinkWhatsapp}
                        style={styles.contactButton}
                    >
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;
