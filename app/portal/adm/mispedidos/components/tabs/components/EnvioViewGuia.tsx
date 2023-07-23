'use client';

import {useState} from 'react';
import { SafePedido } from "@/app/types";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
    BlobProvider,
    Svg,
    G,
    Polygon,
    PDFDownloadLink,
    Font
  } from "@react-pdf/renderer";

interface EnvioViewGuiaProps {
 data?: SafePedido;
}

const EnvioViewGuia: React.FC<EnvioViewGuiaProps> = ({
 data
}) => {

    const styles = StyleSheet.create({
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

    const handleCallback = async (val: any) => {

    }
    const guiaDoc = (
        <Document onRender={(blob) => handleCallback('renderizado...')}>
            <Page size="LETTER" style={styles.page}  key={1}>
                <View style={styles.container}>
                                                
                    <Text >Guia PDF</Text>
                </View>
            </Page>
        </Document>
    );

    const GuiaDocument = () => (
        guiaDoc
        );

    
 return (
  <div className='m-4'>
    hola
     <PDFViewer style={{width: '100%', height: '95vh'}} showToolbar={false}>
        <GuiaDocument />
    </PDFViewer>
  </div>
 );
}

export default EnvioViewGuia;