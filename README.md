# 🚀 Portfolio Dinámico - Andrés Almeida

Portfolio profesional desarrollado con **React + TypeScript**, **Firebase** y **Gemini AI**, diseñado para mostrar experiencia en análisis de datos, desarrollo web y gestión de proyectos.

## ✨ Características Principales

### 🎯 **Sistema Dinámico**
- **Gestión de contenido** con Firebase Firestore
- **Panel de administración** completo con autenticación
- **Sistema de traducciones** dinámico (ES/EN)
- **Migración automática** de datos JSON a Firebase

### 🤖 **Chatbot Inteligente (AndyChat)**
- Integración con **Gemini AI** para respuestas contextuales
- **Generación dinámica de CV** personalizado por perfil profesional
- **Analytics inteligentes** para filtrar conversaciones relevantes
- Respuestas especializadas en análisis de datos y BI

### 📊 **Dashboard Profesional**
- **KPIs en tiempo real** de interacciones
- **Gráficos interactivos** con Chart.js
- **Análisis de conversaciones** con IA
- **Métricas de engagement** del portfolio

### 🔧 **Arquitectura Técnica**
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Firebase (Firestore + Hosting)
- **Styling**: Tailwind CSS + Componentes personalizados
- **AI**: Google Gemini API
- **Deployment**: Firebase Hosting + Vercel (admin panel)

## 🛠️ Tecnologías Utilizadas

```json
{
  "frontend": ["React", "TypeScript", "Vite", "Tailwind CSS"],
  "backend": ["Firebase", "Firestore", "Firebase Auth"],
  "ai": ["Google Gemini API", "Conversational AI"],
  "tools": ["EmailJS", "jsPDF", "Chart.js", "Marked"],
  "deployment": ["Firebase Hosting", "Vercel"]
}
```

## 🚀 Instalación y Configuración

### 1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/miportafolio.git
cd miportafolio/project
```

### 2. **Instalar dependencias**
```bash
npm install
```

### 3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Completar las variables en `.env`:
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_GEMINI_API_KEY=tu_gemini_api_key
VITE_EMAILJS_SERVICE_ID=tu_emailjs_service
VITE_ADMIN_PASSWORD=tu_password_admin
```

### 4. **Ejecutar en desarrollo**
```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
miportafolio/
├── project/
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── App.tsx              # Página principal
│   │   │   ├── Admin.tsx            # Panel de administración
│   │   │   └── ProfessionalDashboard.tsx # Dashboard con KPIs
│   │   ├── components/
│   │   │   ├── AndyChat.tsx         # Chatbot con IA
│   │   │   ├── CertificationsSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── UnifiedContactSection.tsx
│   │   ├── utils/
│   │   │   ├── firebaseErrorHandler.ts
│   │   │   ├── dynamicTranslations.ts
│   │   │   └── dataManager.ts
│   │   └── data/
│   │       ├── cv-data.json         # Datos base del CV
│   │       └── personality-config.json # Config del chatbot
│   ├── firebase.json               # Configuración Firebase
│   └── vercel.json                 # Configuración Vercel
├── firestore.rules                 # Reglas de seguridad
└── README.md
```

## 🎯 Funcionalidades Destacadas

### **1. Chatbot Inteligente**
- Respuestas contextuales sobre experiencia profesional
- Generación automática de CV personalizado
- Integración con Gemini AI para conversaciones naturales

### **2. Panel de Administración**
- Gestión completa de certificaciones, proyectos y experiencias
- Sistema de autenticación seguro
- Interface intuitiva para actualizaciones en tiempo real

### **3. Sistema de Traducciones**
- Soporte completo ES/EN
- Traducciones dinámicas de contenido Firebase
- Persistencia de preferencia de idioma

### **4. Analytics Avanzados**
- Tracking de interacciones del chatbot
- Análisis de conversaciones con IA
- Métricas de engagement y conversión

## 🔐 Seguridad

- **Firestore Rules** configuradas para acceso público de lectura y autenticado de escritura
- **Autenticación** por contraseña para panel admin
- **Variables de entorno** para claves sensibles
- **CSP Headers** configurados para Vercel

## 🚀 Deployment

### **Portfolio Público (Firebase)**
```bash
npm run build
firebase deploy
```

### **Panel Admin (Vercel)**
```bash
vercel --prod
```

## 📊 Métricas del Proyecto

- **+4,500 líneas** de código TypeScript/React
- **39 archivos** modificados en última actualización
- **16% reducción** de código mediante cleanup
- **100% responsive** design
- **Bilingüe** (ES/EN) completo

## 🤝 Contribuciones

Este es un proyecto personal de portfolio, pero las sugerencias y feedback son bienvenidos.

## 📧 Contacto

**Andrés Almeida** - Analista de Datos & Desarrollador Web
- 📧 Email: [tu-email@ejemplo.com]
- 💼 LinkedIn: [tu-linkedin]
- 🌐 Portfolio: [tu-dominio.com]

---

*Desarrollado con ❤️ usando React, TypeScript y Firebase*