# Parcial – Desarrollo de API en Node.js con Express y JSON

## Problema: "La Red Neural de Neo-Tokyo"

Tu tarea es desarrollar una API para gestionar una red de **Netrunners** (hackers), **Servidores Corporativos** (objetivos) y **Batallas de Protocolo**.

Toda la información debe almacenarse en un único archivo JSON (`network.json`).
No se permite usar bases de datos reales.

---

## 1\. Contexto General

En el futuro distópico de Neo-Tokyo, los Netrunners compiten por robar datos ("Data") de los servidores corporativos para aumentar su reputación en el bajo mundo.

Debes desarrollar una API que permita:

1.  Administrar Netrunners.
2.  Administrar Servidores (Targets).
3.  Ejecutar Hackeos a servidores aplicando reglas de criptografía (lógica matemática).
4.  Ejecutar Batallas de Protocolo entre Netrunners.
5.  Controlar RAM (energía), Reputación (nivel) y Data (XP).

Toda la información se almacenará en `network.json` con la estructura:

```json
{
  "netrunners": [],
  "servers": [],
  "battles": []
}
```

---

## 2\. Reglas del Sistema

### 2.1 Netrunners

Un Netrunner posee:

- `id` (único)
- `alias` (string)
- `reputation` (nivel, inicia en 1)
- `data` (xp, inicia en 0)
- `ram` (energía, inicia en 128)
- `programs` (array de strings, ej: ["BruteForce", "Stealth"])
- `hardware` (array de objetos `{ model, clockSpeed }`)

### 2.2 Fórmula de Reputación (Nivel)

Cada vez que la `data` (XP) de un Netrunner cambie, se debe evaluar si sube de reputación.

**Fórmula de ascenso:**

```text
Data necesaria para subir = reputation * 150

Si data >= (reputation * 150):
    subir 1 punto de reputation
    data = data - (reputation * 150)
    // Bonus: Al subir de nivel, se restaura la RAM al máximo (128)
```

_Nota: Pueden ocurrir múltiples subidas de nivel si la data acumulada es mucha._

### 2.3 Servidores (Desafíos)

Cada servidor posee:

- `id`
- `hostname` (nombre del servidor)
- `firewallDensity` (dificultad, 1 a 100)
- `ramCost` (costo de energía para atacar)
- `dataYieldFormula` (string con una fórmula matemática)
- `requiredProgram` (string, el programa necesario para hackearlo)

Ejemplos de fórmulas de recompensa (`dataYieldFormula`):

- "firewallDensity \* 2 + ramCost"
- "(firewallDensity / 2) \* 10"

La fórmula debe evaluarse de forma segura (Mathjs o similar). **No se permite usar `eval` nativo**.

---

## 3\. Intento de Hackeo

Cuando un Netrunner intenta hackear un servidor:

1.  **Validación de recursos:** Debe tener suficiente `ram`.

2.  **Validación de herramienta:** Debe poseer el `requiredProgram` en su lista de `programs`.

3.  **Consumo:** Se descuenta la RAM:

    ```javascript
    netrunner.ram -= server.ramCost;
    ```

4.  **Cálculo de recompensa:** Se evalúa la `dataYieldFormula` para saber cuánta `data` ganaría.

5.  **Condición de Fallo Crítico:**
    Si la `firewallDensity` del servidor es mayor que `reputation * 10`:

    - El hackeo falla automáticamente.
    - El Netrunner sufre una descarga:
      ```javascript
      damage = firewallDensity * 0.5;
      netrunner.ram -= damage;
      ```
    - No gana `data`.
    - Se registra el intento con estado "intercepted".

6.  **Éxito:**

    - Si no hay fallo crítico, el hackeo es exitoso.
    - El Netrunner gana la `data` calculada.
    - Se aplica la lógica de subida de reputación.
    - Se registra el intento con estado "breached".

---

## 4\. Batallas de Protocolo (Duelos)

Dos Netrunners pueden enfrentarse en una batalla lógica. Se calcula el **Processing Power** de cada uno:

```text
processingPower = (reputation * 10) + (data / 2) + ram + sum(hardware.clockSpeed)
```

El ganador es quien tenga mayor `processingPower`.

**Reglas de Post-Batalla:**

1.  Ambos pierden 20 unidades de `ram` por el esfuerzo (si quedan con RAM negativa, se ajusta a 0).
2.  El ganador roba `data` del perdedor basándose en la diferencia de poder (`gap`):

<!-- end list -->

```text
gap = abs(power1 - power2)

Si gap < 50  → Roba 10% de la data actual del perdedor.
Si gap >= 50 → Roba 30% de la data actual del perdedor.
```

_(El perdedor pierde esa cantidad de data, el ganador la suma)._

3.  Se verifica subida de nivel para el ganador (y bajada para el perdedor si fuera necesario, aunque el enunciado original no pedía bajar nivel, asume que solo suben, pero valida integridad de datos).
4.  La batalla se registra en `network.json`.

Ejemplo de registro:

```json
{
  "id": 101,
  "attackerId": 5,
  "defenderId": 8,
  "winnerId": 5,
  "powerAttacker": 450,
  "powerDefender": 320,
  "stolenData": 150,
  "date": "2025-12-01T10:00:00Z"
}
```

---

## 5\. Consignas de Implementación

### 5.1 Estructura del Proyecto

La arquitectura debe ser estricta por capas:

- **Routes:** Definición de endpoints.
- **Controllers:** Manejo de request/response y validación básica de entrada.
- **Services:** Toda la lógica de negocio (fórmulas, reglas, validaciones de juego).
- **Repositories:** Capa exclusiva para interactuar con `fs.promises` (leer/escribir JSON).
- **Utils:** Funciones auxiliares (ej: parseador de fórmulas).

### 5.2 Endpoints Obligatorios

#### Netrunners

- `POST /netrunners`: Crear un nuevo perfil.
- `GET /netrunners`: Listar todos (Filtros query params: `minReputation`, `hasProgram` (filtra quienes tengan X programa)).
- `PATCH /netrunners/:id/hardware`: Agregar hardware al inventario.
- `PATCH /netrunners/:id/ram`: Recargar RAM manualmente (solo admins, o sistema de items, lógica simple de sumar valor).

#### Servidores (Targets)

- `POST /servers`: Crear nuevo objetivo.
- `GET /servers`: Listar servidores disponibles.
- `POST /servers/:serverId/hack/:netrunnerId`: Ejecutar intento de hackeo.

#### Batallas

- `POST /battles`: Iniciar duelo entre dos IDs.
- `GET /battles`: Historial de batallas.

---

## 6\. Requisitos Técnicos

1.  **Prohibido `eval`**: Debes parsear las fórmulas manualmente o usar una librería segura/función utilitaria propia que reemplace variables.
2.  **Persistencia**: Uso obligatorio de `fs` con `async/await`.
3.  **Manejo de Errores**:
    - Si el Netrunner no existe -\> 404.
    - Si no tiene RAM suficiente -\> 400.
    - Try/Catch en todos los niveles asíncronos.
4.  **Logging**: Middleware que imprima método y URL de cada request.
5.  **Validaciones**: No se pueden crear Netrunners con el mismo alias.

---

## 7\. Criterios de Evaluación (Puntaje)

| Sección                    | Puntos  | Detalles                                                  |
| -------------------------- | ------- | --------------------------------------------------------- |
| **Arquitectura**           | 25      | Separación limpia Routes/Controller/Service/Repo.         |
| **Gestión Netrunners**     | 20      | CRUD, filtros y lógica de hardware.                       |
| **Lógica de Hackeo**       | 25      | Fórmulas, validación de programas, penalización.          |
| **Batallas (Duelos)**      | 20      | Cálculo de poder y robo porcentual de data.               |
| **Persistencia y Calidad** | 10      | JSON bien estructurado, código limpio, manejo de errores. |
| **Total**                  | **100** |                                                           |
