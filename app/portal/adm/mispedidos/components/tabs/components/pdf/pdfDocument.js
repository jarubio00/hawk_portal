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
  Font,
} from "@react-pdf/renderer";
import { styles } from "./styles";

const logo =
  "https://firebasestorage.googleapis.com/v0/b/hawk-admin.appspot.com/o/portal%2Fimages%2Flmguia.png?alt=media&token=d6d0bad2-8d1f-4954-9caf-e786ffbfc810";

const handleCallback = async (val) => {};

export const guiaDoc = (p) => {
  console.log(p);

  return (
    <Document onRender={(blob) => handleCallback("renderizado...")}>
      <Page
        size={{ width: 4 * 72, height: 3 * 72 }}
        style={styles.page}
        key={1}
      >
        <View style={styles.rowContainer}>
          <View style={styles.simpleRow}>
            <Image style={styles.logo} src={logo} />
            <View style={styles.columnContainer}>
              <Text style={styles.addrText}>
                {p.recoleccion.contactoNombre}
              </Text>
              <Text style={styles.addrText}>
                {p.recoleccion.calle} {p.recoleccion.numero}{" "}
                {p.recoleccion.numeroInt}
              </Text>
              <Text style={styles.addrText}>
                {p.recoleccion.colonia} {p.recoleccion.municipio.municipio}
              </Text>
              <Text style={styles.addrText}>
                {p.recoleccion.cpId}, Tel. {p.recoleccion.contactoTel}
              </Text>
              <Text style={styles.addrTextRef}>
                {p.recoleccion.referencias}
              </Text>
            </View>
          </View>
          <View style={styles.guiaHeader}>
            <Text style={styles.guiaNumber}>{p.id}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
