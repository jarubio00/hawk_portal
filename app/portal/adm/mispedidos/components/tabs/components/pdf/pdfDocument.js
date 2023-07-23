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
import {styles} from "./styles"
 


const handleCallback = async (val) => {

}

export const guiaDoc = (
    <Document onRender={(blob) => handleCallback('renderizado...')}>
        <Page size={{width: 4*72, height: 6*72}} style={styles.page}  key={1}>
            <View style={styles.container}>
                                            
                <Text >Guia PDF</Text>
            </View>
        </Page>
    </Document>
);