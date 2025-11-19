# Parcial – Desarrollo de API en Node.js con Express y JSON

## Problema: "La Gran Logia de Alquimistas"

Tu tarea es desarrollar una API para administrar la prestigiosa Logia de Alquimistas, donde los aprendices realizan experimentos, transmutan materiales y compiten para alcanzar el rango de Maestro.

Toda la información debe almacenarse en un único archivo JSON.  
No se permite usar bases de datos reales.

---

## 1. Contexto General

En este sistema, los Alquimistas gastan "Maná" para realizar experimentos basados en Fórmulas Antiguas. El éxito depende de su Rango y de los elementos que conozcan.

Debes desarrollar una API que permita:

1. Administrar Alquimistas (creación, consulta, modificación).
2. Administrar Fórmulas (recetas alquímicas).
3. Ejecutar Experimentos (lógica de éxito/fallo y consumo de recursos).
4. Realizar Torneos de Transmutación (duelos entre alquimistas).
5. Gestionar el ascenso de Rangos basado en "Puntos de Sabiduría" (PS).

Toda la información se almacenará en un archivo llamado `alchemy.json` con estructura inicial:

```json
{
  "alchemists": [],
  "formulas": [],
  "tournaments": []
}
```

---

## 2. Reglas del Sistema

### 2.1 Alquimistas

Un Alquimista posee:

- id
- name
- rank (inicia en 1)
- wisdomPoints (PS, inicia en 0)
- mana (inicia en 150)
- knownElements (array de strings, ej: ["Fuego", "Mercurio"])
- artifacts (array de objetos { name, purity })

### 2.2 Regla de Ascenso de Rango

Cada vez que los `wisdomPoints` (PS) cambien, se debe evaluar si el alquimista sube de rango.

**Fórmula de ascenso:**

```text
PS necesarios = rank * 100

Si wisdomPoints >= (rank * 100):
    subir un rango (rank++)
    wisdomPoints = wisdomPoints - (rank * 100)
```

_Nota: Al igual que en el ejercicio anterior, si sobran muchos puntos, el alquimista puede subir varios rangos de una sola vez._

### 2.3 Fórmulas (Recetas)

Cada fórmula posee:

- id
- name
- toxicity (1 a 10)
- manaCost
- impactFormula (string con una operación matemática)
- requiredElement (string)

Ejemplos de `impactFormula`:

- "toxicity \* 5 + manaCost"
- "toxicity \* manaCost / 2"

**Restricción:** La fórmula debe interpretarse y calcularse en el servicio. No se permite usar `eval`.

---

## 3. Realizar Experimento

Cuando un alquimista intenta realizar una fórmula:

1. **Validación de Maná:** Debe tener suficiente maná (`alchemist.mana >= manaCost`).

2. **Validación de Conocimiento:** Debe tener el `requiredElement` en su lista de `knownElements`.

3. **Consumo:** Se descuenta el maná inmediatamente.

```text
alchemist.mana -= manaCost
```

4. **Cálculo de Resultado:** Se evalúa la `impactFormula` para determinar cuántos PS (Puntos de Sabiduría) otorga el experimento.

5. **Factor de Riesgo (Lógica de Fallo):** Si la `toxicity` de la fórmula es mayor que el `rank` actual del alquimista:

   - El experimento explota.
   - El alquimista **NO** gana PS.
   - Recibe una penalización de maná adicional:

   ```text
   daño = toxicity * 5
   alchemist.mana -= daño
   ```

   _(El maná no puede ser negativo, si baja de 0, queda en 0)._

   - Se registra el experimento como "failed".

6. **Éxito:**

   - Si no explota, el alquimista gana los PS calculados por la `impactFormula`.
   - Se verifica si sube de rango (regla 2.2).
   - Se registra el experimento como "success".

---

## 4. Torneos de Transmutación (Duelos)

Un torneo enfrenta a dos alquimistas. Para determinar el ganador, se calcula el **Poder Alquímico** de cada uno:

```text
Poder = (rank * 10) + (wisdomPoints / 2) + mana + sum(artifacts.purity)
```

**Reglas del Torneo:**

1. Ambos participantes consumen 20 puntos de maná por el esfuerzo (se descuenta antes de calcular el ganador).

2. Gana quien tenga mayor Poder Alquímico.

3. **Premios:** El ganador obtiene PS basados en la pureza de sus propios artefactos:

   ```text
   bonificacion = sum(artifacts.purity)

   Si bonificacion < 10 → Gana 30 PS
   Si bonificacion >= 10 y < 50 → Gana 60 PS
   Si bonificacion >= 50 → Gana 100 PS
   ```

4. Se aplica la lógica de ascenso de rango al ganador.

5. El torneo se guarda en el historial `tournaments`.

---

## 5. Consignas de Implementación

### 5.1 Requisitos Técnicos

La API debe utilizar:

- **Node.js** con **Express**.
- **fs.promises** para la persistencia en JSON.
- **Arquitectura en Capas:**
  - `routes`: Definición de endpoints.
  - `controllers`: Manejo de request/response y códigos HTTP.
  - `services`: Lógica de negocio (cálculos, validaciones, reglas de juego).
  - `repositories`: Lectura y escritura del archivo JSON.
- Manejo de errores (try/catch) y middleware de errores.
- Validaciones de datos de entrada (que no falten campos obligatorios).

### 5.2 Endpoints Requeridos

#### Alquimistas

- `POST /alchemists`: Crear un nuevo alquimista.
- `GET /alchemists`: Listar todos (Soporte query params: `?minRank=X` para filtrar por rango).
- `PATCH /alchemists/:id/artifacts`: Agregar un nuevo artefacto al inventario.

#### Fórmulas

- `POST /formulas`: Crear una nueva fórmula.
- `POST /formulas/:id/experiment`: Un alquimista (pasado en el body o query) intenta ejecutar esta fórmula.

#### Torneos

- `POST /tournaments`: Ejecutar un duelo entre dos alquimistas (IDs en el body).
- `GET /tournaments`: Listar historial de duelos (Soporte query param `?winnerId=X` para ver victorias de alguien específico).

---

## 6. Criterios de Evaluación

1. **Separación de Responsabilidades:** Los controladores no deben tener lógica matemática ni lógica de lectura de archivos.
2. **Manejo de Asincronismo:** Uso correcto de `async/await`.
3. **Lógica de Negocio:** Implementación correcta de las fórmulas, bucles de nivel y manejo de condiciones de fallo.
4. **Calidad de Código:** Nombres de variables claros, código limpio y organizado.
5. **Seguridad:** No uso de `eval`.

```

```
