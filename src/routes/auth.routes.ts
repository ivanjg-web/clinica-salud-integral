import { Router } from "express";
import { register, login } from "../controllers/auth.controller.ts";
import { verifyToken } from "../middlewares/auth.middleware.ts";
import { authorize } from "../middlewares/authorize.middleware.ts";
import { validateRegister } from "../middlewares/validate-auth.ts";

const router = Router();

router.post(
  "/register",
  verifyToken,
  authorize("GERENCIA"),
  validateRegister,
  (req, res) => {
    /*
      #swagger.tags = ['Autenticación']
      #swagger.summary = 'Registrar un usuario'
      #swagger.description = 'Permite a GERENCIA registrar usuarios. Requiere autenticación JWT. Para usuarios MEDICO, doctorId es obligatorio y debe corresponder a un médico existente.'
      #swagger.security = [{ "bearerAuth": [] }]

      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password", "role"],
              properties: {
                email: {
                  type: "string",
                  example: "medico@clinica.com"
                },
                password: {
                  type: "string",
                  example: "123456"
                },
                role: {
                  type: "string",
                  enum: ["RECEPCIONISTA", "MEDICO", "GERENCIA"],
                  example: "MEDICO"
                },
                doctorId: {
                  type: "integer",
                  example: 1
                }
              }
            }
          }
        }
      }

      #swagger.responses[201] = { description: 'Usuario registrado correctamente' }
      #swagger.responses[400] = { description: 'Datos inválidos o referencia al médico no válida' }
      #swagger.responses[401] = { description: 'Token no proporcionado o inválido' }
      #swagger.responses[403] = { description: 'No tienes permiso para registrar usuarios' }
      #swagger.responses[404] = { description: 'El médico indicado no existe' }
      #swagger.responses[409] = { description: 'Correo electrónico ya registrado' }
      #swagger.responses[500] = { description: 'Error al registrar el usuario' }
    */

    return register(req, res);
  },
);

router.post("/login", (req, res) => {
  /*
    #swagger.tags = ['Autenticación']
    #swagger.summary = 'Iniciar sesión'
    #swagger.description = 'Autentica un usuario y devuelve un token JWT.'

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: {
                type: "string",
                example: "medico@clinica.com"
              },
              password: {
                type: "string",
                example: "123456"
              }
            }
          }
        }
      }
    }

    #swagger.responses[200] = { description: 'Inicio de sesión exitoso' }
    #swagger.responses[401] = { description: 'Credenciales inválidas' }
    #swagger.responses[500] = { description: 'Error al iniciar sesión' }
  */

  return login(req, res);
});

export default router;
