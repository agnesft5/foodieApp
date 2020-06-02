# Valoración Nutricional de un producto según su _barcode_

## **Descripción**

El fin de este proyecto es proporcionar al usuario los _valores nutricionales_ para un producto
de su interés. Para ello hace una petición a la api **Open food facts** y imprime los datos de cada
producto según el número de su código de barras. Dicho código es proporcionado por el usuario mediante un input en la primera pantalla que se visualiza.

## **Features**

- La versión actual del proyecto muestra al usuario los macronutrientes, el valor energético, la sal que este contiene y una imágen del producto.

## **How does it work?**

El usuario introduce su código y este cambia el link de la api a la cuál estamos haciendo la petición. De ese modo se imprimen los valores designados en nuestra función callback extraidos del objeto que obtenemos de un JSON parseado. A partir de aquí, seleccionamos los valores que son de nuestro interés (carbohidratos, valor energético, proteinas...) a partir de las claves de nuestro objeto. 

## **Stack**

- Para realizar este proyecto se ha usado la versión 4.0 de **Bootstrap**.

## **How to use**

Para trabajar en este proyecto hay que hacer un clone del repositorio remoto que podéis encontrar en <a href = https://github.com/agnesft5/firstAJAX>aquí</a>. 
Para ello hay que crear una carpeta en local y hacerle un **git init**.
A continuación crear el link **git remote add origin "_link de nuestro repositorio remoto_"** y hacer un pull **git pull origin master**.
Una vez hecho el clone, deberéis crear una **branch** y empezar a trabajar en ella.
Ahora ya lo tienes :thumbsup:

## Future improvements

Es de nuestro interés aumentar la cantidad de datos que proporcionamos a nuestros usuarios. Por ello vamos a introducir algunas funcionalidades:

- Añadir la valoración nutricional del producto _para una cantidad_ de producto.
- Establecer una cantidad por ración _adaptable_ al usuario.
- Añadir el listado de _alérgenos_.
- Añadir los _ingredientes_.

## **Licéncia**

GNU GENERAL PUBLIC LICENSE - Version 3, 29 June 2007
