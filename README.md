![Screenshot 2025-05-12 at 4 47 29 PM](https://github.com/user-attachments/assets/0a4ef9ec-9b76-497e-afaf-b14cffbc8c2d)# Crypto Tracker - Seguimiento de Criptomonedas 📈

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)


Aplicación móvil para rastrear precios y estadísticas de criptomonedas en tiempo real.

## Características principales ✨

- 📊 Listado completo de criptomonedas con precios actualizados
- Detalle de criptomoneda
- 🔍 Búsqueda en tiempo real

## Tecnologías utilizadas 🛠️

| Capa           | Tecnologías                     |
|----------------|---------------------------------|
| Frontend       | React Native, TypeScript        |
| Estado         | Context API + Hooks             |
| Estilos        | Styled Components               |
| Testing        | Jest, React Testing Library     |
| API            | CoinGecko/CoinLore              |

## Instalación 🚀

### Requisitos previos
- Node.js v16+
- npm/yarn
- Android Studio/Xcode (para emuladores)
- CLI de React Native

### Estructura del proyecto
src/
├── core/
│   ├── domain/          # Modelos y lógica de negocio
│   ├── presentation/    # Componentes UI
│   └── data/           # API y almacenamiento
├── assets/             # Recursos multimedia
├── utils/              # Funciones helpers
└── App.tsx             # Entrada principal

### Pasos para ejecutar

1. Clonar el repositorio:
```   
git clone https://github.com/danielCDuarte/crypto-tracker.git
cd crypto-tracker
```

2. Instalar dependencias
```
npm install
```

3. Inicializar expo
```
npx expo start --clear
```
![Screenshot 2025-05-12 at 4 47 29 PM](https://github.com/user-attachments/assets/4d712241-4614-4157-8b29-3ff13469d274)
- Presionar i para abrir la app en IOS.
- Presionar a para abrir la app en Android.

4. Testing : Pruebas unitarias del proyecto
```
npm test
```
![Screenshot 2025-05-12 at 4 47 02 PM](https://github.com/user-attachments/assets/16ade3bc-851c-4dcb-a998-f809cb324804)
```
pm test - --coverage
```
![Screenshot 2025-05-12 at 4 51 46 PM](https://github.com/user-attachments/assets/4a6f063e-bce8-4714-98a1-c14b246c318b)

