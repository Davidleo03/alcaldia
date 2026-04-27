# 🏛️ Gobernanza Digital - Departamento de Compras

Sistema de Automatización Logística y Control de Inventario para Municipalidades

## 📋 Descripción General

Plataforma centralizada que implementa los **4 pilares operativos** de Gobernanza Digital:

### Pilar 1: Automatización del Flujo Logístico
- Digitaliza el ciclo completo de suministros
- Desde ingreso al almacén hasta despacho final
- Elimina el uso de libros de actas y registros manuales
- Trazabilidad completa de cada solicitud

### Pilar 2: Control de Inventario en Tiempo Real
- Gestión del catálogo de bienes con actualización instantánea
- Motor de alertas automáticas (stock crítico/bajo)
- Notificaciones en tiempo real
- Punto de reorden configurableautomático

### Pilar 3: Auditoría y Trazabilidad Inmutable
- Registro histórico protegido criptográficamente (SHA-256)
- Almacena: quién, cuándo, qué y cómo se modificó
- Protege datos sensibles (precios, proveedores)
- Cumplimiento normativo con Contraloría garantizado
- Imposible modificar sin ser detectado

### Pilar 4: Inteligencia Administrativa
- Generación inmediata de reportes PDF
- Análisis de consumo y tendencias
- Optimización de ejecución presupuestaria
- Reducción de margen de error humano

## 🚀 Características Principales

### Seguridad Criptográfica
- **SHA-256**: Hash único para cada registro
- **Cadena de Integridad**: Cada registro enlaza con el anterior
- **Imposible de alterar**: Cualquier cambio es detectado
- **Auditoría Inmutable**: Histórico completo protegido

### Automatización
- Motor de alertas que notifica automáticamente
- Solicitudes de compra generadas automáticamente
- Estados de flujo completamente digitalizados
- Notificaciones en tiempo real a usuarios relevantes

### Análisis y Reportería
- Dashboards con KPIs en tiempo real
- Gráficos de tendencias mensuales
- Análisis de ejecución presupuestaria
- Reportes exportables en PDF

### Gestión de Usuarios
- Roles configurables (Comprador, Almacenista, Aprobador, Auditor, Administrador)
- Control de acceso por coordinación
- Auditoría de acciones de cada usuario
- Trazabilidad de operaciones

## 📊 Módulos del Sistema

### 1. Tablero de Control (Dashboard)
`/` - Vista general de los 4 pilares con estadísticas principales

### 2. Automatización Logística
- `/solicitudes` - Todas las solicitudes de compra
- `/solicitudes/nueva` - Crear nueva solicitud
- `/mis-solicitudes` - Mis solicitudes personales
- `/aprobaciones` - Solicitudes pendientes de aprobación
- `/completadas` - Solicitudes distribuidas y completadas

### 3. Control de Inventario
- `/inventario` - Tabla completa de productos
- `/alertas` - Centro de alertas y notificaciones

### 4. Auditoría
- `/auditoria` - Registro inmutable con verificación de integridad SHA-256

### 5. Inteligencia Administrativa
- `/reportes` - Gráficos, análisis y estadísticas

### 6. Configuración
- `/configuracion` - Preferencias y configuración del sistema

## 🏗️ Estructura de Datos

### SolicitudCompra
- `numero`: Identificador único
- `titulo`, `descripcion`: Detalles
- `estado`: solicitado, aprobado, rechazado, en_almacen, distribuido, completado
- `prioridad`: baja, media, alta, crítica
- `historialEstados`: Trazabilidad completa de cambios
- Montos presupuestados y aprobados

### ProductoInventario
- `codigo`: Código único
- `stockActual`, `stockMinimo`, `stockMaximo`
- `precioUnitario`: Dato sensible auditado
- `enAlerta`: Generador automático de alertas
- `movimientos`: Historial de ingresos/egresos

### RegistroAuditoria (SHA-256)
- `timestamp`: Fecha y hora exacta
- `usuario`: Quién hizo el cambio
- `entidad`: Qué se modificó
- `accion`: Crear, actualizar, eliminar, aprobar
- `detallesCambios`: Valores anteriores y nuevos
- `hashSHA256`: Firma criptográfica
- `hashAnterior`: Cadena de integridad

## 🔐 Sistema Criptográfico

### Generación de Hash SHA-256
```typescript
const hash = await generarHashSHA256(datos);
// Resultado: string hexadecimal de 64 caracteres
```

### Verificación de Integridad
```typescript
const valido = await verificarIntegridad(datosOriginales, hashEsperado);
// true si no ha sido alterado
```

### Cadena Inmutable
- Cada registro contiene hash del anterior
- Imposible cambiar registro antiguo sin ser detectado
- Detecta intentos de alteración automáticamente

## 📈 KPIs del Sistema

### Pilar 1: Logística
- Total de solicitudes
- Solicitudes completadas / en proceso
- Tiempo promedio de atención
- Tasa de rechazo

### Pilar 2: Inventario
- Productos en alerta
- Stock en niveles críticos
- Valor total de inventario
- Rotación de productos

### Pilar 3: Auditoría
- Total de registros auditados
- Registros del mes
- Integridad verificada

### Pilar 4: Administrativo
- Ejecución presupuestaria (%)
- Gasto programado vs ejecutado
- Análisis de consumo mensual

## 🛠️ Stack Tecnológico

- **Frontend**: React 19, Next.js 16
- **Styling**: Tailwind CSS v4
- **Componentes**: shadcn/ui
- **Gráficos**: Recharts
- **Criptografía**: Web Crypto API (SHA-256)
- **Formularios**: react-hook-form + Zod
- **Iconos**: lucide-react

## 📝 Convenciones

- Interfaces en español: `SolicitudCompra`, `ProductoInventario`, `RegistroAuditoria`
- Estados en minúsculas snake_case: `en_almacen`, `en_proceso`
- Prioridades: `baja`, `media`, `alta`, `critica`
- Todos los cambios auditados automáticamente

## 🚦 Estados del Flujo Logístico

```
solicitado → aprobado → en_almacen → distribuido → completado
     ↓
  rechazado (terminal)
```

## 📞 Soporte y Documentación

Para más información sobre los 4 pilares y cómo usarlos:
- Ver `/configuracion` para resumen del sistema
- Ver `/auditoria` para entender la criptografía SHA-256
- Ver `/reportes` para análisis y estadísticas
- Consultar el historial de auditoría para cualquier cambio

## ✅ Cumplimiento Normativo

- ✓ Normas de Contraloría
- ✓ Registro inmutable de cambios
- ✓ Protección de datos sensibles
- ✓ Imposibilidad de alteración
- ✓ Trazabilidad completa (quién, cuándo, qué)

---

**Versión**: 3.0 - Gobernanza Digital  
**Última actualización**: 2024
