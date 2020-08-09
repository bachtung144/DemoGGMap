import React, { useState , useMemo } from 'react';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';
import Lightbox from 'react-native-lightbox';
import {styleMap as styles} from "./Styles/styleMap";
import {
    View,
    Modal,
    Text,
    Image,
    TouchableOpacity
}
from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function Map({latitude, longitude}) {
    const [maker, setMaker] = useState({});
    const [image, setImage] = useState(null);
    const [marker, setMarker] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const getCameraPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('pls accept permissions !');
            }
        }
    };

    const handleLongPress = (handle) => {
        const { latitude, longitude } = handle.nativeEvent.coordinate;
        setMaker({
            latitude,
            longitude,
            name: `Marker ${marker.length+1}`,
        });
        setShowModal(true);
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setImage(result.uri);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const addMarker = (input) => {
        setMarker(marker.concat({
            name: input?.maker.name,
            uri: input?.image,
            latitude: input?.maker.latitude,
            longitude: input?.maker.longitude,
        }))
        setImage(null);
        setMaker({});
        setShowModal(false);
    }

    useMemo(() => getCameraPermissionAsync(),[]);

    return (
        <View>
            <MapView
                style={styles.mapStyle}
                provider='google'
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                onLongPress={handle => handleLongPress(handle)}>
                {
                    (marker.length > 0) && marker.map((item, index) => (
                        <MapView.Marker
                            key={index}
                            coordinate= {{
                                latitude: item.latitude,
                                longitude: item.longitude
                            }}
                        >
                            <MapView.Callout tooltip style={styles.calloutStyle}>
                                <View style={styles.bubble}>
                                    {item.uri !== '' &&
                                    <Lightbox underlayColor='black' renderHeader={close => (
                                        <TouchableOpacity onPress={close}>
                                            <Text style={styles.closeButton}>Close</Text>
                                        </TouchableOpacity>
                                    )}
                                    >
                                        <Image resizeMode='contain' source={{ uri: item.uri }} style={styles.imgMaker} />
                                    </Lightbox>
                                    }
                                    <Text style={styles.txtMaker}>{item.name}</Text>
                                </View>
                            </MapView.Callout>
                        </MapView.Marker>
                    ))
                }
            </MapView>

            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
            >
                <View style={styles.modal}>
                <TouchableOpacity style={styles.button}
                                  onPress={pickImage}>
                    <Text>
                        Choose Image
                    </Text>
                </TouchableOpacity>
                {image !== null && <Image source={{ uri: image }} style={styles.imgModal} />}
                <TouchableOpacity style={styles.button}
                                  onPress={() => addMarker({ maker, image })}
                >
                    <Text>Add</Text>
                </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                                      onPress={() => setShowModal(false)}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}


