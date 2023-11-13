# ¿Cómo publicar proyectos?

Ve a la carpeta `src/proyectos/` y crea un nuevo archivo `.md` con el nombre del proyecto en formato de URL.

Añade las cabeceras. Para los proyectos estas son:

```
---
layout: proyecto.html
title: <Titulo del proyecto>
image: <URL de la imágen principal>
subtitle: <Subtitulo del proyecto>
client: <Nombre del cliente>
ods: <Listado de ods. E.g. ["1", "17"]>
categories: <Listado de servicios con los que está relacionado. E.g. ["Diseño y desarrollo", "Sostenibilidad"]>
summary: <Resumen del proyecto, pueden ser varias lineas>
---
```

Las `categories` son las relaciones de ese proyecto con los servicios que ofrece Enreda. Es un listado de estos posibles valores:

- Participación ciudadana
- Software de participación
- Diseño y desarrollo
- Transparencia
- Sostenibilidad

La imágen principal hay que subirla a este CDN https://imagekit.io/ y obtener su URL.

1. Inicia sesión en https://imagekit.io/
2. En el menú, clica en `Media libaray`
3. Clica en New y sube la imágen
4. Una vez subida, aparecera en el listado. Haz click derecho y clica en `Copy URL`
5. Pega esa URL en el campo `image`

