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
    container: {
        flexWrap: 'wrap',
        marginLeft: 40,
        paddingLeft: 2,
        marginTop: 24,
        marginRight: 5,
        borderLeftWidth: 3,
        borderColor: '#A6A6A6',
    }
})