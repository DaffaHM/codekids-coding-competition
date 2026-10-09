'use client';

import React from 'react';
import { Document, Page, Image, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CERTIFICATE_LAYOUT, calculateAdaptiveFontSize } from '@/lib/certificateLayout';

interface CertificatePDFProps {
  studentName: string;
  courseName: string;
  completionDate: string;
}

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    width: CERTIFICATE_LAYOUT.page.width,
    height: CERTIFICATE_LAYOUT.page.height,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CERTIFICATE_LAYOUT.page.width,
    height: CERTIFICATE_LAYOUT.page.height,
  },
  nameBox: {
    position: 'absolute',
    top: CERTIFICATE_LAYOUT.name.y,
    left: CERTIFICATE_LAYOUT.name.x,
    width: CERTIFICATE_LAYOUT.name.width,
    height: CERTIFICATE_LAYOUT.name.height,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    color: CERTIFICATE_LAYOUT.name.color,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  courseBox: {
    position: 'absolute',
    top: CERTIFICATE_LAYOUT.course.y,
    left: CERTIFICATE_LAYOUT.course.x,
    width: CERTIFICATE_LAYOUT.course.width,
    height: CERTIFICATE_LAYOUT.course.height,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseText: {
    color: CERTIFICATE_LAYOUT.course.color,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  dateBox: {
    position: 'absolute',
    top: CERTIFICATE_LAYOUT.date.y,
    left: CERTIFICATE_LAYOUT.date.x,
    width: CERTIFICATE_LAYOUT.date.width,
    height: CERTIFICATE_LAYOUT.date.height,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: CERTIFICATE_LAYOUT.date.color,
    fontFamily: 'Helvetica-Bold',
    fontSize: CERTIFICATE_LAYOUT.date.fontSize,
    textAlign: 'center',
  },
});

export const CertificatePDF: React.FC<CertificatePDFProps> = ({
  studentName,
  courseName,
  completionDate,
}) => {
  const nameFontSize = calculateAdaptiveFontSize(
    studentName,
    CERTIFICATE_LAYOUT.name.defaultFontSize,
    CERTIFICATE_LAYOUT.name.minFontSize,
    18
  );

  const courseFontSize = calculateAdaptiveFontSize(
    courseName,
    CERTIFICATE_LAYOUT.course.defaultFontSize,
    CERTIFICATE_LAYOUT.course.minFontSize,
    25
  );

  return (
    <Document title={`CodeKids ${courseName} Certificate - ${studentName}`}>
      <Page
        size={{
          width: CERTIFICATE_LAYOUT.page.width,
          height: CERTIFICATE_LAYOUT.page.height,
        }}
        style={styles.page}
      >
        {/* Background Template Image */}
        <Image
          src={CERTIFICATE_LAYOUT.templateUrl}
          style={styles.backgroundImage}
        />

        {/* Dynamic Name Text */}
        <View style={styles.nameBox}>
          <Text style={[styles.nameText, { fontSize: nameFontSize }]}>
            {studentName}
          </Text>
        </View>

        {/* Dynamic Course Name Text */}
        <View style={styles.courseBox}>
          <Text style={[styles.courseText, { fontSize: courseFontSize }]}>
            {courseName}
          </Text>
        </View>

        {/* Dynamic Completion Date Text */}
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>
            {completionDate}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
