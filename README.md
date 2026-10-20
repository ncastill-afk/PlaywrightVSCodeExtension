# Proyecto de Automatización QA con Playwright

## Descripción

Proyecto de práctica de **QA Automation** desarrollado con **JavaScript
y Playwright Test** en Visual Studio Code. El objetivo es automatizar
pruebas funcionales del sitio de demostración OrangeHRM utilizando el
patrón **Page Object Model (POM)** para separar los localizadores y
acciones de las páginas de los casos de prueba.

## Tecnologías utilizadas

-   **JavaScript**
-   **Playwright Test Version 1.59.1** para la automatización de pruebas web y mobile
-   **Node.js v24.25.0 y npm 11.12.1** para ejecutar el proyecto y administrar
    dependencias
-   **Visual Studio Code Versión 1.141.0** como editor
-   **JSON** para almacenar datos de prueba
-   **File System (`fs`)** para leer y escribir archivos durante la
    ejecución

## Sitio bajo prueba

-   **OrangeHRM Demo:** https://opensource-demo.orangehrmlive.com/

Las pruebas usan el sitio de demostración. Su disponibilidad o interfaz
puede cambiar.

## Estructura del proyecto

La estructura puede variar según la organización de las carpetas del
proyecto. Los archivos utilizados en esta automatización incluyen:

``` text
PlaywrightVSCodeExtention/
├── data/
│   ├── employeeData.json
│   └── employeeDetalleData.json
├── pages/
│   ├── loginOrangePOM.js
│   ├── employeePOM.js
│   ├── employeeDetallePOM.js
│   └── listEmployeePOM.js
├── tests/
│   └── demo/
│       └── orangeSitePOM.spec.js
├── playwright.config.js
├── package.json
└── README.md
```

**Descripción de los archivos principales:**

-   `loginOrangePOM.js`: reúne las acciones para abrir la página de
    inicio de sesión, ingresar las credenciales y validar el acceso.
-   `employeePOM.js`: contiene acciones relacionadas con el módulo PIM y
    el registro de empleados.
-   `employeeDetallePOM.js`: contiene acciones para completar o
    actualizar los datos personales del empleado y gestionar archivos
    adjuntos.
-   `orangeSitePOM.spec.js`: contiene el caso o los casos de prueba que
    coordinan el flujo automatizado.
-   `employeeData.json`: almacena los datos utilizados para registrar al
    empleado.
-   `employeeDetalleData.json`: almacena los datos utilizados para
    completar los detalles del empleado.
-    `listEmployeePOM.js`: contiene los localizadores y métodos para acceder a Employee List, buscar empleados por ID o nombre y validar los resultados de la búsqueda.
-   `playwright.config.js`: configura la ejecución de Playwright, los
    navegadores y los proyectos definidos.

> Si las carpetas `pages`, `tests` o `data` tienen otro nombre o
> ubicación en tu proyecto, actualiza este árbol para que coincida con
> la estructura real.

## Flujo automatizado

El flujo principal de OrangeHRM contempla estas acciones, según la
implementación actual:

1.  Abrir OrangeHRM Demo.
2.  Iniciar sesión con las credenciales de prueba.
3.  Validar que el inicio de sesión haya sido exitoso.
4.  Entrar al módulo **PIM**.
5.  Abrir **Add Employee** y registrar los datos del empleado.
6.  Recuperar el identificador del empleado para utilizarlo en el flujo.
7.  Validar que se muestre la sección **Personal Details**.
8.  Completar o actualizar información personal y, cuando corresponda,
    adjuntar un archivo.
9.  Buscar al empleado en **Employee List** usando los datos
    disponibles.

El flujo exacto depende de los pasos que estén habilitados en el archivo
de pruebas y de los datos configurados.

## Requisitos previos

Antes de ejecutar el proyecto, instala:

-   [Node.js](https://nodejs.org/) (incluye npm).
-   [Visual Studio Code](https://code.visualstudio.com/).
-   Las dependencias definidas en `package.json`.
-   Los navegadores que utiliza la configuración de Playwright.

## Instalación

1.  Abre el proyecto en Visual Studio Code.

2.  Abre la terminal integrada desde **Terminal → New Terminal**.

3.  Ubícate en la carpeta del proyecto. Por ejemplo, si está en la ruta
    indicada:

    ``` powershell
    cd C:\PlaywrightVSCodeExtention
    ```

4.  Instala las dependencias:

    ``` powershell
    npm install
    ```

5.  Instala los navegadores requeridos por Playwright:

    ``` powershell
    npx playwright install
    ```

## Ejecución de las pruebas

Ejecuta los comandos desde la carpeta raíz del proyecto, donde se
encuentra `package.json`.
Si ejecutas el proyecto varias veces, se debe modificar el **username** que está dentro del formulario  **Add Employee**, luego presionas Save y la prueba continuará con su flujo automatizado.

### Ejecutar un archivo de pruebas en Chrome

Si está dentro de una carpeta, indica la ruta relativa real. Por
ejemplo:

``` powershell
npx playwright test tests/demo/orangeSitePOM.spec.js --project=chromium --headed
```

### Ejecutar un archivo de pruebas en varios navegadores incluyendo Mobile

``` powershell
npx playwright test tests/demo/orangeSitePOM.spec.js --headed
```

### Abrir el informe HTML

Después de una ejecución, puedes abrir el informe con:

``` powershell
npx playwright show-report
```

## Datos de prueba y archivos adjuntos

Los datos de empleado se almacenan en archivos JSON para evitar escribir
todos los valores directamente en el caso de prueba.

## Buenas prácticas aplicadas

-   Separación entre los casos de prueba y los objetos de página
    mediante POM.
-   Uso de localizadores de Playwright, como `getByRole()` y
    `locator()`.
-   Reutilización de datos de prueba mediante archivos JSON.
-   Validaciones con `expect`.
-   Ejecución configurable para distintos navegadores o tamaños de
    pantalla, según `playwright.config.js`.

## Estado del proyecto

Proyecto de aprendizaje y práctica de automatización QA para Nadia Castillo, Analista QA.
