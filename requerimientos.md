# Requerimientos — Clínica Salud Integral

## 1. Entidades principales

### Especialidades (Specialty)

| Atributo | Tipo aproximado | Notas                              |
| -------- | --------------- | ---------------------------------- |
| id       | Entero          | [PK], obligatorio, autoincremental |
| name     | Texto           | Obligatorio, único                 |

### Médicos (Doctor)

| Atributo    | Tipo aproximado | Notas                              |
| ----------- | --------------- | ---------------------------------- |
| id          | Entero          | [PK], obligatorio, autoincremental |
| name        | Texto           | Obligatorio                        |
| specialtyId | Entero          | [FK], obligatorio                  |

### Pacientes (Patient)

| Atributo  | Tipo aproximado | Notas                              |
| --------- | --------------- | ---------------------------------- |
| id        | Entero          | [PK], obligatorio, autoincremental |
| name      | Texto           | Obligatorio                        |
| email     | Texto           | Obligatorio, único                 |
| birthDate | Fecha           | Obligatorio                        |

### Citas (Appointment)

| Atributo    | Tipo aproximado | Notas                               |
| ----------- | --------------- | ----------------------------------- |
| id          | Entero          | [PK], obligatorio, autoincremental  |
| scheduledAt | Fecha y hora    | Obligatorio                         |
| status      | Enum            | Obligatorio, por defecto PROGRAMADA |
| patientId   | Entero          | [FK], obligatorio                   |
| doctorId    | Entero          | [FK], obligatorio                   |

El campo `status` solo podrá contener estos valores:

- PROGRAMADA
- COMPLETADA
- CANCELADA

## 2. Relaciones entre entidades

- Una especialidad puede tener muchos médicos, pero cada médico pertenece a una sola especialidad.
- Un médico puede atender muchas citas, pero cada cita corresponde a un solo médico.
- Un paciente puede tener muchas citas, pero cada cita pertenece a un solo paciente.
- Cada cita relaciona un paciente con un médico.

## 3. Consideraciones del diseño

1. **Especialidades como entidad independiente:** se crea una tabla propia para evitar repetir el nombre de la especialidad en cada médico. Esto también permite que gerencia consulte todas las especialidades existentes, incluso aquellas que todavía no tienen médicos asignados.

2. **Relaciones entre médicos, pacientes y citas:** las citas permiten relacionar a un paciente con un médico específico. De esta manera se puede consultar el historial de citas de cada paciente y la agenda de cada médico.
