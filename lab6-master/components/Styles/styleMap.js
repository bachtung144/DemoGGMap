import {Dimensions} from "react-native";

export const styleMap ={
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    modalStyle: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    calloutStyle: {

    },
    bubble: {
        width: 120,
        flexDirection: 'column',
        alignSelf: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 6,
        borderColor: 'white',
        borderWidth: 0.5,
        marginTop: 32,
    },
    closeButton: {
        color: 'white',
        borderWidth: 1,
        borderColor: 'white',
        padding: 8,
        borderRadius: 3,
        textAlign: 'center',
        margin: 10,
        alignSelf: 'flex-end',
    },
    button:{
        alignItems: 'center',justifyContent: 'center',marginTop: 30,backgroundColor: 'pink',width:'70%',
        height: 50,borderRadius:10
    },
    modal :{alignItems: 'center',flex:1,justifyContent: 'center'},
    imgModal:{ width: 200, height: 200, alignSelf: 'center' },
    imgMaker:{ width: 100, height: 100, alignSelf: 'center' },
    txtMaker:{ fontSize: 18, color: 'black', textAlign: 'center' }
}
