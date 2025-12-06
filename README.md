# ShopHub - E-commerce con Astro Islands Architecture

Implementación de un e-commerce funcional utilizando **Astro** con **Islands Architecture** como parte de una investigación comparativa de métodos de renderizado web modernos.

## 📋 Sobre el Proyecto

Este proyecto forma parte de una tesis de investigación titulada **"Análisis comparativo de los métodos de renderizado web PRR, Islands y Resumability para la elaboración de un e-commerce en 2025"**.

ShopHub es una tienda en línea completa que implementa el patrón de **Islands Architecture** de Astro, enfocándose en optimizar el rendimiento mediante hidratación selectiva de componentes interactivos.

## 🎯 Objetivo de la Investigación

Evaluar el rendimiento de tres métodos modernos de renderizado web:
- **Partial Pre-rendering (PPR)** - Next.js
- **Islands Architecture** - Astro ← *Este proyecto*
- **Resumability** - Qwik

### Métricas Evaluadas
- **LCP** (Largest Contentful Paint)
- **INP** (Interaction to Next Paint)
- **CLS** (Cumulative Layout Shift)
- **SI** (Speed Index)
- **TBT** (Total Blocking Time)

## 🏗️ Arquitectura

### Islands Architecture
Este proyecto utiliza el patrón de **Islands Architecture** de Astro, que permite:
- HTML estático por defecto
- Hidratación selectiva de componentes interactivos ("islas")
- Carga paralela de componentes sin bloqueo mutuo
- Control granular de cuándo hidratar componentes

### Directivas de Cliente Utilizadas
```astro
<!-- Hidratar cuando la página carga -->
<Component client:load />

<!-- Hidratar cuando el navegador está inactivo -->
<Component client:idle />

<!-- Hidratar cuando el componente es visible -->
<Component client:visible />
```

## 🚀 Características

### Funcionalidades Principales
- ✅ Catálogo de productos con filtrado y búsqueda
- ✅ Páginas de detalle de producto
- ✅ Carrito de compras interactivo
- ✅ Proceso de checkout completo
- ✅ Sistema de autenticación (demo)
- ✅ Historial de órdenes
- ✅ Diseño responsive (móvil y escritorio)

### Páginas Implementadas
1. **Home** (`/`) - Página principal con productos destacados
2. **Productos** (`/products`) - Catálogo completo con filtros
3. **Detalle** (`/product/[id]`) - Información detallada del producto
4. **Checkout** (`/checkout`) - Proceso de compra
5. **Órdenes** (`/orders`) - Historial de compras
6. **Auth** (`/auth`) - Login/Registro

## 🛠️ Stack Tecnológico

- **Framework**: Astro 4.15.10
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.17
- **Components**: shadcn/ui
- **API**: Fake Store API
- **Storage**: LocalStorage (cliente)
- **TypeScript**: 5.8.3

## 📦 Instalación
```bash
# Clonar el repositorio
git clone https://github.com/frankramirezsoto/ecommerce-thesis-astro-islands.git

# Navegar al directorio
cd ecommerce-thesis-astro-islands

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🌐 Deploy

El proyecto está desplegado en Vercel:
- **URL**: https://ecommerce-thesis-astro-islands.vercel.app/

## 📁 Estructura del Proyecto
```
src/
├── components/          # Componentes React estáticos
│   ├── ui/             # Componentes shadcn/ui
│   ├── CartDrawer.tsx  # Drawer del carrito
│   ├── Navbar.tsx      # Navegación principal
│   └── ProductCard.tsx # Tarjeta de producto
├── islands/            # Componentes interactivos (Islands)
│   ├── AuthIsland.tsx
│   ├── CheckoutIsland.tsx
│   ├── HomeFeatured.tsx
│   ├── OrdersIsland.tsx
│   ├── ProductDetailIsland.tsx
│   ├── ProductsIsland.tsx
│   └── Toasts.tsx
├── layouts/            # Layouts de Astro
│   └── BaseLayout.astro
├── pages/             # Páginas (routing)
│   ├── index.astro
│   ├── products.astro
│   ├── checkout.astro
│   ├── orders.astro
│   ├── auth.astro
│   └── product/[id].astro
├── lib/               # Utilidades y lógica
│   ├── api.ts         # Cliente API
│   ├── cart.ts        # Gestión del carrito
│   └── storage.ts     # LocalStorage wrapper
└── types/             # Definiciones TypeScript
```

## 🔑 Características de Islands Architecture

### Ventajas Implementadas
1. **HTML Estático por Defecto**: La mayoría del contenido se sirve como HTML estático
2. **Hidratación Selectiva**: Solo los componentes interactivos se hidratan
3. **Carga Paralela**: Las islas se cargan de forma independiente
4. **Optimización de JavaScript**: Reduce el JS enviado al cliente

### Componentes Island
- `HomeFeatured`: Productos destacados con interactividad
- `ProductsIsland`: Catálogo con filtros y búsqueda
- `ProductDetailIsland`: Detalles y acciones del producto
- `CheckoutIsland`: Formulario y proceso de compra
- `OrdersIsland`: Historial de órdenes
- `AuthIsland`: Autenticación de usuario

## 📊 Resultados de Rendimiento

Este proyecto fue evaluado junto con implementaciones equivalentes en Next.js (PPR) y Qwik (Resumability). Los resultados completos se encuentran en el documento de investigación.

### Hallazgos Principales
- Excelente rendimiento en TBT (Total Blocking Time)
- Buena estabilidad en métricas Core Web Vitals
- Rendimiento consistente entre móvil y escritorio

## 🎓 Contexto Académico

**Universidad**: Universidad Latinoamericana de Ciencia y Tecnología (ULACIT)  
**Programa**: Bachillerato en Ingeniería Informática  
**Autor**: Franklin Josué Ramírez Soto  
**Año**: 2025

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos como parte de un trabajo de investigación.

## 🔗 Enlaces Relacionados

- **Repositorio Next.js (PPR)**: https://github.com/frankramirezsoto/ecommerce-thesis-nextjs-ppr
- **Repositorio Qwik (Resumability)**: https://github.com/frankramirezsoto/ecommerce-thesis-qwik-resumable
- **Demo en vivo**: https://ecommerce-thesis-astro-islands.vercel.app/

## 📞 Contacto

Para preguntas sobre la implementación o la investigación, contactar al autor a través del repositorio de GitHub.

---

**Nota**: Este proyecto utiliza Fake Store API para datos de demostración. La autenticación y las órdenes se almacenan localmente en el navegador.