import React from'react'
import {StyleSheet,Text,View} from 'react-native'
import { SettingsUser } from '../settings/settings'

const SettingsL = () => {
    return(
        <View>
            <SettingsUser />
        </View>
)}

export default SettingsL
const styles=StyleSheet.create({
    devider:{
        borderBottomWidth:1,
        borderBottomColor:'#607D8B',
    }
})