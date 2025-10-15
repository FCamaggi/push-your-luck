# 🎯 Push Your Luck - Despliegue en Render

## 📦 Preparación para Render

### Opción 1: Deploy del Backend en Render

1. **Crear cuenta en Render**: https://render.com

2. **Crear nuevo Web Service**:
   - Conecta tu repositorio de GitHub
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment: Node
   - Plan: Free

3. **Configurar Variables de Entorno** (opcional):
   ```
   PORT=10000
   ```

4. **Deploy**: Render automáticamente desplegará tu backend

5. **Obtén la URL**: Ejemplo `https://push-your-luck.onrender.com`

### Opción 2: Deploy del Frontend en Vercel/Netlify

**Frontend en Vercel:**

1. Instala Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Desde la raíz del proyecto:
   ```bash
   vercel
   ```

3. Configura la variable de entorno:
   ```
   VITE_API_URL=https://tu-backend.onrender.com
   ```

**Frontend en Netlify:**

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Environment variable:
   ```
   VITE_API_URL=https://tu-backend.onrender.com
   ```

## 🏠 Deploy Local (Ambos en tu computadora)

### 1. Instalar dependencias

**Backend:**
```bash
cd server
npm install
cd ..
```

**Frontend:**
```bash
npm install
```

### 2. Configurar Variables de Entorno

**Backend (`server/.env`):**
```
PORT=3001
```

**Frontend (`.env`):**
```
VITE_API_URL=http://localhost:3001
```

### 3. Ejecutar

**Opción A: Dos terminales**

Terminal 1:
```bash
cd server
npm start
```

Terminal 2:
```bash
npm run dev
```

**Opción B: Script único**

Crea `package.json` en la raíz con:
```json
{
  "scripts": {
    "dev:server": "cd server && npm start",
    "dev:client": "npm run dev",
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\""
  }
}
```

Luego:
```bash
npm install -g concurrently
npm run dev
```

## 🌐 Compartir en Red Local

Para que otros dispositivos en tu WiFi accedan:

1. **Obtén tu IP local:**
   ```bash
   # Linux/Mac
   hostname -I
   # Windows
   ipconfig
   ```
   Ejemplo: `192.168.1.10`

2. **Inicia el frontend con --host:**
   ```bash
   npm run dev -- --host
   ```

3. **Configura CORS en el servidor** para aceptar tu IP:
   Ya está configurado para aceptar todas las conexiones con `cors()`

4. **Los jugadores acceden a:**
   ```
   http://192.168.1.10:5173
   ```

## ⚠️ Notas Importantes para Render (Free Tier)

1. **El servidor se duerme después de 15 minutos de inactividad**
   - Primera petición después de dormir toma ~30 segundos
   - Solución: Hacer un "ping" cada 10 minutos

2. **Persistencia de datos**:
   - Los datos en `scores.json` se pierden en cada deploy
   - Para persistencia real, considera usar una base de datos gratuita:
     - MongoDB Atlas (Free tier)
     - PostgreSQL de Render (Free tier)
     - Supabase (Free tier)

3. **HTTPS automático**: Render proporciona HTTPS gratis

## 🔄 Actualizar después de cambios

**Backend en Render:**
- Commit y push a GitHub
- Render detecta cambios y re-deploya automáticamente

**Frontend:**
- Vercel/Netlify detectan cambios y re-deployean automáticamente

## 📊 Monitoreo

**Logs del servidor en Render:**
- Dashboard → Tu servicio → Logs

**Ver puntajes en tiempo real:**
```bash
curl https://tu-backend.onrender.com/api/ranking
```

## 🆘 Troubleshooting

### Error: "Cannot connect to server"
- Verifica que el backend esté corriendo
- Verifica que la URL en `.env` sea correcta
- Si usas Render, espera ~30 segundos en la primera petición

### Backend en Render no responde
- Revisa los logs en Render Dashboard
- Verifica que el Start Command sea correcto: `node server.js`

### Datos se pierden en Render
- Normal en Free tier al re-deployar
- Usa una base de datos para persistencia real

## 🎮 El Día del Evento

Si usas Render Free:
1. Haz una petición 5 minutos antes para "despertar" el servidor
2. Considera hacer pings cada 10 minutos para mantenerlo activo
3. O mejor: usa deploy local en tu computadora

Si usas deploy local:
1. Conecta tu laptop a corriente
2. Desactiva modo de suspensión
3. Comparte tu IP local con los jugadores
4. Mantén ambos servidores corriendo durante todo el evento
