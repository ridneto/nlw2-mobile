import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

const Landing: React.FC = () => (
    <View style={styles.container}>
        <Image source={landingImg} style={styles.banner} />
        <Text style={styles.title}>
            Seja bem vindo, {'\n'}

            <Text style={styles.titleBold}> O que deseja fazer? </Text>
        </Text>

        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonsPrimary]}>
                <Image source={studyIcon}/>

                <Text style={styles.buttonsText}>
                    Estudar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buttonsSecondary]}>
                <Image source={giveClassesIcon}/>

                <Text style={styles.buttonsText}>
                    Dar aulas
                </Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.totalConnections}>
            Total de 285 conexões já realizadas {' '} <Image source={heartIcon} />
        </Text>
    </View>
);

export default Landing;
