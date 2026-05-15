import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts if needed, but standard ones are okay for now.
// For a professional Moroccan look, we might want a clean sans-serif.

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    borderBottom: 1,
    borderBottomColor: '#eee',
    paddingBottom: 20,
  },
  companyInfo: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb', // blue-600
    marginBottom: 4,
  },
  companyDetails: {
    fontSize: 9,
    color: '#666',
    lineHeight: 1.4,
  },
  documentTitle: {
    fontSize: 24,
    fontWeight: 'heavy',
    textAlign: 'right',
    textTransform: 'uppercase',
    color: '#1e293b',
  },
  documentMeta: {
    textAlign: 'right',
    marginTop: 10,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  metaLabel: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#666',
  },
  metaValue: {
    color: '#000',
  },
  addressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  addressBox: {
    width: '45%',
  },
  addressTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#2563eb',
    marginBottom: 8,
    borderBottom: 1,
    borderBottomColor: '#dbeafe',
    paddingBottom: 2,
  },
  addressText: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 8,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 8,
    minHeight: 30,
    alignItems: 'center',
  },
  colDesc: { width: '50%' },
  colQty: { width: '10%', textAlign: 'center' },
  colPrice: { width: '15%', textAlign: 'right' },
  colVat: { width: '10%', textAlign: 'center' },
  colTotal: { width: '15%', textAlign: 'right' },
  
  totalsSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  totalsBox: {
    width: '40%',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2563eb',
    color: '#fff',
    borderRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 8,
  },
  legalText: {
    marginTop: 40,
    fontSize: 9,
    fontStyle: 'italic',
    color: '#64748b',
  }
});

export interface DocumentItem {
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
}

export interface DocumentData {
  type: 'DEVIS' | 'FACTURE';
  number: string;
  date: string;
  expiryDate?: string;
  client: {
    name: string;
    address: string;
    ice?: string;
  };
  company: {
    name: string;
    address: string;
    phone: string;
    email: string;
    ice: string;
    rc?: string;
    if?: string;
    patent?: string;
  };
  items: DocumentItem[];
  notes?: string;
}

export const DocumentTemplate: React.FC<{ data: DocumentData }> = ({ data }) => {
  const calculateTotalHT = () => data.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  const calculateTotalTVA = () => data.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice * (item.vatRate / 100)), 0);
  const totalTTC = calculateTotalHT() + calculateTotalTVA();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{data.company.name}</Text>
            <Text style={styles.companyDetails}>{data.company.address}</Text>
            <Text style={styles.companyDetails}>Tél: {data.company.phone}</Text>
            <Text style={styles.companyDetails}>{data.company.email}</Text>
            <Text style={styles.companyDetails}>ICE: {data.company.ice}</Text>
          </View>
          <View>
            <Text style={styles.documentTitle}>{data.type}</Text>
            <View style={styles.documentMeta}>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Numéro:</Text>
                <Text style={styles.metaValue}>{data.number}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Date:</Text>
                <Text style={styles.metaValue}>{data.date}</Text>
              </View>
              {data.expiryDate && (
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Valide jusqu'au:</Text>
                  <Text style={styles.metaValue}>{data.expiryDate}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Addresses */}
        <View style={styles.addressSection}>
          <View style={styles.addressBox}>
            <Text style={styles.addressTitle}>De:</Text>
            <Text style={styles.addressText}>{data.company.name}</Text>
            <Text style={styles.addressText}>{data.company.address}</Text>
          </View>
          <View style={styles.addressBox}>
            <Text style={styles.addressTitle}>Facturé à:</Text>
            <Text style={styles.addressText}>{data.client.name}</Text>
            <Text style={styles.addressText}>{data.client.address}</Text>
            {data.client.ice && <Text style={styles.addressText}>ICE: {data.client.ice}</Text>}
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDesc}>Désignation</Text>
            <Text style={styles.colQty}>Qté</Text>
            <Text style={styles.colPrice}>P.U HT</Text>
            <Text style={styles.colVat}>TVA</Text>
            <Text style={styles.colTotal}>Total TTC</Text>
          </View>
          {data.items.map((item, index) => {
            const itemHT = item.quantity * item.unitPrice;
            const itemTTC = itemHT * (1 + item.vatRate / 100);
            return (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.colDesc}>{item.description}</Text>
                <Text style={styles.colQty}>{item.quantity}</Text>
                <Text style={styles.colPrice}>{item.unitPrice.toFixed(2)}</Text>
                <Text style={styles.colVat}>{item.vatRate}%</Text>
                <Text style={styles.colTotal}>{itemTTC.toFixed(2)}</Text>
              </View>
            );
          })}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsBox}>
            <View style={styles.totalRow}>
              <Text style={styles.metaLabel}>Total HT</Text>
              <Text>{calculateTotalHT().toFixed(2)} DH</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.metaLabel}>TVA</Text>
              <Text>{calculateTotalTVA().toFixed(2)} DH</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={{ fontWeight: 'bold' }}>Total TTC</Text>
              <Text style={{ fontWeight: 'bold' }}>{totalTTC.toFixed(2)} DH</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        {data.notes && (
          <View style={{ marginTop: 40 }}>
            <Text style={styles.addressTitle}>Observations</Text>
            <Text style={styles.addressText}>{data.notes}</Text>
          </View>
        )}

        <View style={styles.legalText}>
          <Text>Arrêté la présente {data.type === 'DEVIS' ? 'offre' : 'facture'} à la somme de: {(totalTTC).toFixed(2)} Dirhams.</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            {data.company.name} - ICE: {data.company.ice} {data.company.rc ? `- RC: ${data.company.rc}` : ''} {data.company.if ? `- IF: ${data.company.if}` : ''}
          </Text>
          <Text>{data.company.address}</Text>
          <Text>Email: {data.company.email} | Tél: {data.company.phone}</Text>
        </View>
      </Page>
    </Document>
  );
};
