# Parcial – Desarrollo de API en Node.js con Express y JSON
## Problema: "El Torneo de los Guardianes Lógicos"

Tu tarea es desarrollar una API para administrar un sistema estratégico de Guardianes. Los Guardianes realizan desafíos, compiten en duelos y progresan según reglas lógicas específicas.

Toda la información debe almacenarse en un único archivo JSON.  
No se permite usar bases de datos reales.

---

## 1. Contexto General

En el mundo ficticio de Aritmia existe un torneo donde distintos Guardianes compiten para ascender niveles, recuperar energía y superar desafíos lógicos.

Debes desarrollar una API que permita:

1. Administrar Guardianes.  
2. Administrar Desafíos.  
3. Permitir que los Guardianes intenten desafíos aplicando reglas matemáticas.  
4. Ejecutar duelos entre Guardianes usando fórmulas.  
5. Controlar energía, niveles, experiencia y penalizaciones.  

Toda la información se almacenará en un archivo llamado `game.json` con estructura inicial:

```json
{
  "guardians": [],
  "challenges": [],
  "duels": []
}
```

---

## 2. Reglas del Sistema

### 2.1 Guardianes

Un Guardián posee:

- id  
- name  
- level (inicia en 1)  
- xp (inicia en 0)  
- energy (inicia en 100)  
- skills (array de palabras)  
- items (array de objetos { name, power })

### 2.2 Fórmula de Nivel

Cada vez que la XP de un guardián cambie, se debe evaluar:

```
XP necesaria para subir = level * 75

Si xp >= (level * 75):
    subir un nivel
    xp = xp - (level * 75)
```

Pueden ocurrir múltiples subidas de nivel si la XP es suficiente.

### 2.3 Desafíos

Cada desafío posee:

- id  
- title  
- difficulty (1 a 10)  
- energyCost  
- rewardFormula (string con una fórmula matemática)  
- requiredSkill (palabra clave)

Ejemplos de fórmulas:

- "difficulty * 8 + energyCost * 2"  
- "difficulty^2 + energyCost"  

La fórmula debe evaluarse de forma segura. No se permite usar eval.

---

## 3. Intento de Desafío

Cuando un guardián intenta un desafío:

1. Debe tener suficiente energía.  
2. Debe poseer la skill requerida.  
3. Se descuenta la energía del guardián:  
   ```
   guardian.energy -= energyCost
   ```
4. Se calcula la XP otorgada evaluando la fórmula del desafío.  
5. Si la dificultad del desafío es mayor que el doble del nivel del guardián:  
   - El guardián falla el desafío.  
   - Pierde energía adicional:  
     ```
     penalizacion = difficulty * 3
     guardian.energy -= penalizacion
     ```
   - No gana XP.  
   - Se registra intento con estado "failed".  

6. Si el desafío se completa con éxito:  
   - El guardián gana la XP calculada.  
   - Se aplica la fórmula de subida de nivel.  
   - Se registra intento con estado "success".

---

## 4. Sistema de Duelos

Un duelo enfrenta a dos guardianes utilizando la siguiente fórmula de poder lógico:

```
power = level^2 + (xp / 5) + energy + sum(items.power)
```

El ganador es el que tenga mayor poder.

Reglas adicionales:

- Ambos guardianes pierden 10 puntos de energía después del duelo.  
- El ganador recibe XP según la diferencia de poder:

```
diferencia = abs(power1 - power2)

Si diferencia <= 10 → gana 20 XP
Si diferencia <= 25 → gana 50 XP
Si diferencia <= 50 → gana 80 XP
Si diferencia > 50 → gana 120 XP
```

- Luego se aplica la fórmula de subida de nivel.  
- El duelo debe registrarse en el JSON.

Ejemplo de registro:

```json
{
  "id": 3,
  "guardian1": 1,
  "guardian2": 4,
  "winner": 1,
  "power1": 134,
  "power2": 120,
  "timestamp": "2025-11-13T14:00:00.000Z"
}
```

---

## 5. Consignas de Implementación

### 5.1 Estructura del Proyecto

La API debe utilizar:

- Node.js  
- Express  
- fs.promises para lectura y escritura del JSON  
- Middleware global de logging  
- Manejo de errores centralizado  
- Arquitectura separada en capas:
  - routes  
  - controllers  
  - services  
  - repositories  

No se permite duplicar lógica entre controllers y services.

### 5.2 Endpoints Obligatorios

#### Guardianes

- POST `/guardians`  
- GET `/guardians` (con filtros opcionales: skill, fragmento de nombre, rango de nivel)  
- PATCH `/guardians/:id/energy`  
- PATCH `/guardians/:id/items` (agregar o quitar items)

#### Desafíos

- POST `/challenges`  
- GET `/challenges` (con filtros)  
- POST `/challenges/:challengeId/attempt/:guardianId`

#### Duelos

- POST `/duels`  
- GET `/duels` (con filtros por ganador, fecha, diferencia mínima de poder)

---

## 6. Requisitos Técnicos

- No se permite usar eval para fórmulas.  
- No se permiten console.log en la entrega final.  
- La lógica matemática debe estar en los services.  
- Se debe crear al menos una función utilitaria para cálculos.  
- El sistema debe manejar el caso en que el JSON esté corrupto.  

---

## 7. Puntaje Sugerido

| Sección | Puntos |
|--------|--------|
| Arquitectura y modularización | 20 |
| Gestión de Guardianes | 20 |
| Gestión de Desafíos | 25 |
| Intento de desafío con lógica | 15 |
| Duelos y reglas matemáticas | 15 |
| Calidad del código y errores | 5 |
| Total | 100 |
