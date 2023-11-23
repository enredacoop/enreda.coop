---
layout: noticia.html
title: Cooperación a través de la red mediante OwnCloud
image: https://ik.imagekit.io/enreda/noticias/enredablogOwncloud.png?updatedAt=1699966148908
date: "2016-02-24"
firstParagraph: >
  Aunque el incremento a la hora de usar el cloud para compartir ficheros y trabajar de una forma más organizada aumenta día a día, son todavía muchas las empresas que no conocen esta forma de colaborar.
---

Aunque el incremento a la hora de usar el cloud para compartir ficheros y trabajar de una forma más organizada aumenta día a día, son todavía muchas las empresas que no conocen esta forma de colaborar.

## ¿Por qué compartir los ficheros en una empresa?

La primera ventaja y la que más puede sonar es que la eficiencia a la hora de trabajar aumenta considerablemente. El 81% de la información de la empresa, se envía a través del correo. Si evitamos que este suceso ocurra, ahorraremos una gran cantidad de tiempo mirando miles de correos. 

También, al trabajar sobre un fichero en la nube ayudaremos a que la colaboración entre empleados sea más óptima. Los cambios se hacen sincronamente según se modifique el fichero, por lo que no hace falta avisar de cambios a última hora. Además esto hace que tengamos la versión correcta del fichero y no andar con varias versiones en el aire.

El orden también importa. Porque acceder a un fichero no es igual en dos equipos diferentes, por eso el homogeneizar la estructura de los ficheros ayuda a agilizar el proceso de búsqueda.

Y si piensas que puede haber algún cafre que rompa el trabajo de horas y horas, puedes hacer un paso atrás con su control de versiones ( si la herramienta lo permite).

## ¿Que herramientas usar?

Podemos agruparlas por dos categorias, las de empresas  que se dedican a servirlas y las que podemos montar nosotros mismos.

A las herramientas que nos ofrecen las empresas gratis(limitadas) o bajo suscripción, nos encontraremos a Dropbox o Google Drive, entre otras. Pero estas dos son las mas usadas. Microsoft lo intentó pero no pudo( y lo sigue intentado).

Diferencias hay muchas entre las dos. La más significante es que Dropbox es solo para almacenamiento y Google Drive para la colaboración mas directa con su edición de documentos concurrente via web. Eso si, Google Drive aún no tiene soporte oficial para todas las plataformas.


En el otro grupo nos encontramos a las que podemos montar en nuestros propios servidores, Seafile o Owncloud.

La diferencia entre ambas es la misma que la que hay en Dropbox y Google Drive, siendo Owncloud parecida a Google Drive y Seafile a Dropbox.


## Comparativa: Dropbox vs Owncloud

En esta parte voy a ser subjetivo a la vez de objetivo. Subjetivo porque voy a elegir dos herramientas según mi experiencia con ellas y objetivos porque al enfrentarlas saldrá una victoriosa según parámetros reales.

Aunque parezca un tópico, la licencia de una aplicación es muy importante. El que sea open source ayuda mucho a la hora de la integración según necesidades. Por eso el ganador en este aspecto es Owncloud. 

### ¿Quién maneja los datos?
Pensándolo fríamente, hay alguien que se encarga de administrar esos servidores donde se almacenarán la información. Confiar en alguien ajeno cuesta mucho y mas si no lo conocemos.

### ¿Cómo son las leyes donde manejan los datos?
Las leyes en otros paises son muy diferentes y más si sales del continente. Antes de seguir dejo este enlace que detalla el nuevo pacto entre UE y US después de romper el Safe Harbor http://hipertextual.com/2016/02/eu-us-privacy-shield
Viendo como está el paronama de la información entre continentes, ¿quién gana en este aspecto? creo que Dropbox no, porque si no sabemos donde se aloja lo descubrirás en la siguiente palabra, Amazon(US).


### ¿Qué funcionalidad pueden tener cada una?
He dado una idea antes, pero redundando las palabras diré que Dropbox es solamente almacenamiento y nada más. Mientras que Owncloud permite multiples aplicaciones como tener un webmail, un gestor de notas, una edición de texto concurrente (como el de Google Drive)... y muchas apliaciones desarrollada por la comunidad accesible por todos. Además es posible desarrollar aplicación bajo demanda. De nuevo la balanza cae en el lado de Owncloud.

Por cierto, Owncloud también tiene un cliente para sincronizar 

### Alguna Desventaja

Pero, ¿no tiene desventajas Owncloud? Si, tienes que tener un servidor contratado y una persona que lo administre, pero a la hora de hablar de información empresarial cualquier gasto es insuficiente. Recuerda que la información es lo más preciado de nuestra empresa.

### Apostamos por esta metodología
Nosotros mismo sabemos que el cloud es el futuro de las empresas y por eso hemos implementado un piloto en el lugar donde solemos estar y también trabajar.
El servidor lo tenemos en la red local y tienen proxmox con una máquina virtual donde tendremos Owncloud. 

En seguridad, hemos cifrado la comunicación con el servidor via http. Además hemos cifrado los datos en el lado del servidor por si algún cracker malvado nos rompe nuestros métodos de acceso }:)
También generamos backups diarios con retroceso de hasta dos días. Esos backups se replican a otro nodo que tenemos. Aunque en el que está también tenemos RAID 1. La información esta asegurada.



El piloto de Owncloud lo usarán todos los proyectos alojados en [EspacioRes](http://espaciores.org/) y tendrá una configuración inicial de:

* Tantos grupos como proyectos haya
* Una cuenta administradora de cada grupo          con 10Gb
* Cada cuenta por componente tendrá 1Gb
* Las aplicaciones se podrán instalar bajo             demanda si las hubiere

![Captura piloto Owncloud](https://ik.imagekit.io/enreda/noticias/owncloud.png?updatedAt=1699966337633)

Como hemos avisado, es un piloto y como tal tiene su limitación. De momento el almacenamiento es poco pero se puede aumentar facilmente añadiendo almacenamiento al servidor. Y también el cuello de botella en subida de ficheros fuera de la red local. Ojala la simetría en velocidad fuera un hecho y no un mito.

¿Hace falta servidores propios?

No no y no. En España hay proveedores de servidores virtuales en el cual nos asegura nuestro servidor (mediante un SLA) este activo 24x7.


Y por último comentar que si has llegado hasta aquí es porque el interés es obvio, por eso si quieres mas información no dudes en contactar con nosotros. 

Aquí dejo la una imagen de la píldora que hice en RES contando lo mismo.


<blockquote class="twitter-tweet" data-lang="es"><p lang="es" dir="ltr">Ahora en <a href="https://twitter.com/espacio_RES">@espacio_RES</a>, ¡Píldora formativa! Por <a href="https://twitter.com/enreda">@enreda</a> ! <a href="https://twitter.com/hashtag/Sevillahoy?src=hash">#Sevillahoy</a> <a href="https://t.co/LYieg9JtQ0">pic.twitter.com/LYieg9JtQ0</a></p>&mdash; Sandra (@Sandra21RM) <a href="https://twitter.com/Sandra21RM/status/696668416145559553">febrero 8, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>