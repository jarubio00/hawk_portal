import {StyleSheet} from "@react-pdf/renderer";

export const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontSize: 11,
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        lineHeight: 1.5,
        flexDirection: 'column',
        width: 200
    },
    logo: {
        width: 70,
        marginBottom: 0
      },
    container: {
        flexWrap: 'wrap',
    },
    rowContainer:{
        flexDirection: 'row',
        padding: 0, 
        justifyContent: 'space-between',
        width: '100%'
    },
    columnContainer:{
        flexDirection: 'column',
        padding: 0, 
        justifyContent: 'flex-start',
        width: '100%'
    },
    simpleRow:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 0,
        paddingTop: 0, 
    },
    addrText: {
        paddingLeft: 2,
        fontSize: 8,
        lineHeight: 1.1,
        fontWeight: 600,
    },
    addrTextRef: {
        paddingLeft: 2,
        fontSize: 7,
        lineHeight: 1.1,
        fontWeight: 400,
    },
    guiaHeader: {
        flexDirection: 'column',
        paddingRight: 0, 
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        width: '100%'
    }, 
    guiaNumber: {
        fontSize: 10,
        paddingHorizontal: 2,
        paddingTop: 4,
        backgroundColor: '#000000',
        color: '#FFFFFF',
        justifyContent: 'center',
    }

})