import jsPDF from 'jspdf';
import cvProfiles from '../data/cv-profiles.json';

export const generateDynamicCV = (profileType: keyof typeof cvProfiles.profiles): void => {
  const profile = cvProfiles.profiles[profileType];
  if (!profile) return;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let yPosition = 30;

  // Encabezado
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('ANDRÉS ALMEIDA', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('(+34) 633-084828 • Madrid, España • soyandresalmeida@gmail.com', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Perfil Profesional
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('PERFIL PROFESIONAL', margin, yPosition);
  yPosition += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const profileText = doc.splitTextToSize(profile.description, pageWidth - 2 * margin);
  doc.text(profileText, margin, yPosition);
  yPosition += profileText.length * 4 + 10;

  // Experiencia
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('EXPERIENCIA PROFESIONAL', margin, yPosition);
  yPosition += 10;

  // Banesco Seguros
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Especialista de Control y Gestión del Dato', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Mar 2025 – Jun 2025', pageWidth - margin - 40, yPosition);
  yPosition += 5;
  
  doc.setFont('helvetica', 'italic');
  doc.text('Banesco Seguros', margin, yPosition);
  yPosition += 6;

  const items = [
    '• Automatización reportes actuariales con R e IA',
    '• Dashboards Power BI (costos, ventas, cobranzas)',
    '• Mejoras en arquitectura de datos',
    '• Integración áreas actuariales'
  ];
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  items.forEach(item => {
    doc.text(item, margin + 5, yPosition);
    yPosition += 4;
  });

  // Competencias enfocadas
  yPosition += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('COMPETENCIAS CLAVE', margin, yPosition);
  yPosition += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  profile.skills_focus.forEach(skill => {
    doc.text(`• ${skill}`, margin, yPosition);
    yPosition += 5;
  });

  const filename = `CV_AndresAlmeida_${profileType}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
};