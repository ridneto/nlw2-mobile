import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { View, Image, Text } from 'react-native';

import heartOutLineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteOutLineIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles'

const TeacherItem: React.FC = () =>{
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: 'https://avatars3.githubusercontent.com/u/22376941?s=400&u=e0209b128ff29ccaaceb559141d4a05f4b865d5c&v=4' }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}> Ridineu </Text>
                    <Text style={styles.subject}> Test </Text>
                </View>
            </View>


            <Text style={styles.bio}>
                lero lero biografia  {'\n'} {'\n'}
                Second line
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}> R$ 20,00 </Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton style={[styles.favoriteButton, styles.favorited]}>
                        {/* <Image source={heartOutLineIcon} /> */}
                        <Image source={unfavoriteOutLineIcon} />
                    </RectButton>

                    <RectButton style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;
