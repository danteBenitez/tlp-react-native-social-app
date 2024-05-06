# Mini-Proyecto de React Native con Expo: Simulación de red social

El presente proyecto es una simulación de red social en el que los usuarios pueden ponerse un nombre, una foto de perfil, y postear.
Los posts son públicos para que todos los usuarios puedan verlos.

La aplicación requiere de un servidor corriendo en un host. Puede configurar la dirección del servidor con la variable de entorno `EXPO_PUBLIC_API_URL`. El código del servidor se presenta en la subcarpeta `/server`.

## Inicialización del servidor

- Navegue a la subcarpeta `/server`
- Instale las dependencias:

```bash
$ npm install
```

- Inicie el servidor:

```bash
$ node index.js
```

## Inicialización del proyecto

- Navegue al directorio raíz.

- Cree un archivo .env, especificando:

```bash
EXPO_PUBLIC_API_URL=             # La URL del servidor de publicaciones.
```

- Instale las dependencias:

```bash
$ npm install
```

- Inicie la ejecución de la aplicación con Expo Go:

```bash
$ npm run start
```

## Uso de navegación

- La aplicación implementa dos navegadores propios de `react-navigation`:
    - Un `StackNavigator` general, para pantallas que pueden sobreponerse a las pestañas.
    - Un `TabNavigator` para las pantallas principales.
- Puede ver manejo de estado entre pantallas, por ejemplo, en la parte de configuración del usuario. Al subir una imagen de foto de perfil, el AppHeader se actualiza automáticamente para incluir dicha foto.

## Implementación de fetching de datos

- La aplicación carga publicaciones de ejemplo consultando una API de usuarios y otra de citas aleatorias. La implementación de dicha petición puede leerse en el archivo `src/services/posts.js`. La carga de datos se encuentra en el contexto `src/context/PostContext.js`, y el renderizado en `src/components/Feed.js`.