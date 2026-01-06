import React from "react";
import type { Employee } from "./EmployeeTable";
import { Document, Page, Text, View, Image, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  image: { width: 100, height: 100 },
});

type Props = {
  employee: Employee | null;
};

const EmployeePrint = ({ employee }: Props) => {
  if (!employee) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Employee Details</Text>
        </View>
        <View style={styles.section}>
          <Image src={employee.profileImage} style={styles.image} />
        </View>
        <View style={styles.section}>
          <Text>ID: {employee.id}</Text>
          <Text>Name: {employee.fullName}</Text>
          <Text>Gender: {employee.gender}</Text>
          <Text>DOB: {employee.dob}</Text>
          <Text>State: {employee.state}</Text>
          <Text>Status: {employee.isActive ? "Active" : "Inactive"}</Text>
        </View>
      </Page>
    </Document>
  );
};

const EmployeePDFDownload = ({ employee }: Props) => (
  <PDFDownloadLink
    document={<EmployeePrint employee={employee} />}
    className="py-3 px-8 bg-cyan-800 rounded-xl text-white!"
    fileName="employee-details.pdf"
  >
    {({ loading }) => (loading ? "Loading document..." : "Print")}
  </PDFDownloadLink>
);

export default React.memo(EmployeePDFDownload);
