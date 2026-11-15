# Call Center Training

Simulador sencillo en Angular para practicar llamadas de FedEx y TXU Energy, con una pantalla similar a las imágenes de referencia: empresa, escenario, datos de cliente, Answer / Hold / End y notas.

## Ejecutar

Node.js 22.12+ (rama 22) o Node 24 y npm.

```sh
npm install
npm start
```

Abre http://localhost:4200. En PowerShell puedes usar `npm.cmd` si la política de scripts bloquea `npm`.

```sh
npm test
npm run build
```

## Agregar escenarios

Abre **Escenarios de práctica**, pulsa **Descargar plantilla**, edita el archivo en el Bloc de notas y guárdalo como `.txt` (UTF-8). Después pulsa **Cargar .txt**, revisa la vista previa y elige **Agregar escenario**.

Ejemplo disponible en `public/plantilla-escenario.txt`:

```text
Empresa: FedEx
Escenario: Address correction
Cliente: Sarah Miller
Resumen: Customer needs to correct the delivery address
Referencia: 7946 2108 5632
Estado: In transit
Detalle: The customer noticed an incorrect apartment number. Review the available options without guaranteeing a change.
```

Empresa admite `FedEx` o `TXU Energy`. Los primeros seis campos son obligatorios. `Detalle` es opcional y puede ocupar varias líneas al final del archivo. Usa un caso por archivo (máximo 64 KB; 100 escenarios importados por navegador).

El archivo rellena los datos del caso; no genera una conversación con IA. Para usar un PDF, copia la información del caso a la plantilla. No hay importación automática de PDF. El contenido del archivo se trata como texto, no como código o instrucciones para la aplicación.

## Práctica

- Cinco escenarios iniciales basados en los materiales proporcionados.
- Logo de la empresa seleccionada, con acentos morados y naranjas para FedEx y azules y verdes para TXU Energy. Los archivos se incluyen en `public/brands/`.
- Diseño adaptable: panel de hasta 1600 px, datos y notas en dos columnas desde 1100 px y una sola columna en tabletas y móviles. Texto escalable y controles de al menos 44 px.
- Answer conecta la llamada simulada, Hold pausa el temporizador y End termina la práctica y guarda las notas.
- Retry prepara el mismo caso otra vez.
- Las notas se guardan por escenario. Al cambiar de escenario también se guardan automáticamente.
- La sección **Ver información del caso** permite consultar los datos para practicar en pareja o responder en voz alta.
- No hay IA, grabación, micrófono, conversación automática, evaluación ni llamadas reales. Las pantallas de vocabulario, entrevista, historial y conversación guiada se retiraron de la interfaz.
- Los casos importados y notas se guardan únicamente en ese navegador; no se sincronizan entre dispositivos. Borrar los datos del sitio los elimina.

## Netlify

`netlify.toml` ya configura el despliegue:

- Build command: `npm run build`
- Publish directory: `dist/training/browser`

Conecta [Bvent97/call-center](https://github.com/Bvent97/call-center) en Netlify y selecciona la rama `main`. No requiere variables de entorno.

Para un despliegue manual, ejecuta `npm run build` y arrastra la carpeta `dist/training/browser` a Netlify Drop. En la carpeta local original también está `output/callroom-netlify.zip`; los ZIP y las capturas no se guardan en Git. No se ha publicado un sitio remoto desde este proyecto.

La caché de Angular está desactivada para evitar un fallo nativo observado en Windows/OneDrive. Las dependencias del CLI tienen avisos moderados de auditoría; no uses `npm audit fix --force` sin revisar los cambios de versión. La auditoría de las dependencias de producción no reportó vulnerabilidades durante la creación inicial.

Material educativo independiente. Datos y procedimientos ficticios, sin conexión a sistemas de TELUS, FedEx ni TXU Energy.
