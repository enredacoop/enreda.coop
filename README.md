# ¿Cómo publicar proyectos?

Ve a la carpeta `src/proyectos/` y crea un nuevo archivo `.md` con el nombre del proyecto en formato de URL.

Añade las cabeceras. Para los proyectos estas son:

```
---
layout: proyecto.html
title: Titulo del proyecto
image: URL de la imágen principal
subtitle: Subtitulo del proyecto
client: Nombre del cliente
ods: Listado de ods entre corchetes. E.g. [1, 3, 17]
categories: Listado de servicios con los que está relacionado entre corchetes y con comillas. E.g. ["Diseño y desarrollo", "Sostenibilidad"]
summary: Resumen del proyecto, pueden ser varias lineas
---
```

Las `categories` son las relaciones de ese proyecto con los servicios que ofrece Enreda. Es un listado de estos posibles valores:

- Participación ciudadana
- Software de participación
- Diseño y desarrollo
- Transparencia
- Sostenibilidad

Los `ods` son el listado de números de los Objetivos de Desarrollo Sostenible con los que se relaciona un proyecto:

1. Fin de la pobreza
2. Hambre cero
3. Salud y bienestar
4. Educación de calidad
5. Igualdad de género
6. Agua limpia y saneamiento
7. Energía asequible y no contaminante
8. Trabajo decente y crecimiento económico
9. Industria, innovación e infraestructuras
10. Reducción de las desigualdades
11. Ciudades y comunidades sostenibles
12. Producción y consumo responsables
13. Acción por el clima
14. Vida submarina
15. Vida de ecosistemas terrestres
16. Paz, justicias e instituciones sólidas
17. Alianzas para lograr objetivos

# ¿Cómo publicar noticias?

Ve a la carpeta `src/noticias/` y crea un nuevo archivo `.md` con el nombre de la noticia en formato de URL.

Añade las cabeceras. Para las noticias estas son:

```
---
layout: noticia.html
title: Título de la noticia
image: URL de la imagen principal
date: YYYY-MM-DD
firstParagraph: Texto de resumen (normalmente el primer párrafo) que se podrá leer en el listado de noticias
---
```

# ¿Cómo subir imágenes?

Las imágenes hay que subirlas a este CDN https://imagekit.io/ y obtener su URL.

1. Inicia sesión en https://imagekit.io/
2. En el menú, clica en `Media libaray`
3. Clica en New y sube la imágen
4. Una vez subida, aparecera en el listado. Haz click derecho y clica en `Copy URL`
5. Pega esa URL donde quieras usar esa imagen.

# Markdown

Los elementos básicos a utilizar en el contenido de los proyectos y noticias son los siguientes:

| elemento | markdown                                                             | resultado                                                          |
| -------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| negrita  | `**negrita**`                                                        | **negrita**                                                        |
| cursiva  | `*cursiva*`                                                        | *cursiva*                                                          |
| link     | `[Web de Enreda](https://enreda.coop/)`                              | [Web de Enreda](https://enreda.coop/)                              |
| imagen   | `![Logo de Enreda](https://enreda.coop/assets/img/enreda-black.png)` | ![Logo de Enreda](https://enreda.coop/assets/img/enreda-black.png) |

mejoras ux