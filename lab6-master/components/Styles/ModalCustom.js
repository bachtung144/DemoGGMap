import React from 'react'
import {Image, Modal, Text, TouchableOpacity, View} from "react-native";
import {styleMap as styles} from "./styleMap";

export default function ModalCustom({pickImage,addMarker,setShowModal,showModal,image}) {
    return(
        <Modal
            animationType='slide'
            transparent={false}
            visible={true}
        >
            <View style={styles.modal}>
                <TouchableOpacity style={styles.button}
                                  onPress={pickImage}
                >
                    <Text>
                        Choose Image
                    </Text>
                </TouchableOpacity>
                {image !== null && <Image source={{ uri: image }} style={styles.imgModal} />}
                <TouchableOpacity style={styles.button}
                                  onPress={addMarker}>
                    <Text>Add</Text>
                </TouchableOpacity>
                {/*<TouchableOpacity style={styles.button}*/}
                {/*                  onPress={setShowModal}>*/}
                {/*    <Text>Cancel</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
        </Modal>
    )
}
