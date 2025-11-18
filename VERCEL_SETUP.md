# 🚀 SETUP VERCEL PARA ADMIN PANEL

## 📋 PASOS PARA DESPLEGAR EN VERCEL

### 1. **Crear Repositorio GitHub**
```bash
# En la carpeta project/
git init
git add .
git commit -m "Initial commit - Portfolio with Admin"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/portfolio-admin.git
git push -u origin main
```

### 2. **Conectar con Vercel**
1. Ve a https://vercel.com
2. Sign up/Login con GitHub
3. Click "New Project"
4. Selecciona tu repositorio `portfolio-admin`
5. Framework: **Vite**
6. Root Directory: **project**
7. Build Command: `npm run build`
8. Output Directory: `dist`

### 3. **Variables de Entorno en Vercel**
En Vercel Dashboard → Settings → Environment Variables:

```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### 4. **Configuración Firebase**
Actualizar `firebase.ts` para usar variables de entorno:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## 🎯 RESULTADO ESPERADO

- **Portafolio**: Firebase Hosting (público)
- **Admin Panel**: Vercel (sin restricciones CSP)
- **Base de Datos**: Firebase Firestore (compartida)

## 🔗 URLs FINALES

- **Portafolio**: https://andresalmeida-portafolio.web.app
- **Admin**: https://tu-proyecto.vercel.app/admin
- **Dashboard**: https://tu-proyecto.vercel.app/dashboard

## ✅ VENTAJAS DE VERCEL

- ✅ Sin CSP restrictivo automático
- ✅ Deploy automático desde GitHub
- ✅ Soporte completo para React/Vite
- ✅ eval() permitido sin problemas
- ✅ Gratis para proyectos personales