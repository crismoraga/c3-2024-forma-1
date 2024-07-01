import request from 'supertest'
import { server, app } from '../../../src/index'

/**
 * El objetivo de este test de integración es probar
 * el endpoint para evaluar si la aplicación responde
 */
describe('GET /health', () => {
    afterAll(() => {
        server.close()
    })

    test('should respond ok message', async () => {
        const response = await request(app.callback()).get('/health')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'ok' })
    })
})

describe('consulta GET /api/cities/by_country/:country', () => {
    test('Debería devolver un arreglo de ciudades al ingresar un parámetro válido', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/Chile')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })
    
    test('Debería devolver un arreglo vacío de ciudades al ingresar un parámetro válido pero no existente', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/Tel335Landia')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'No se encontraron ciudades para el país ingresado' })
    })
    
    test('Debería devolver el mensaje "Solo se aceptan caracteres no numéricos" al ingresar un número', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/12345')
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' })
        expect(response.status).toBe(400)
    })
    test('Debería devolver el mensaje "Solo se aceptan caracteres no numéricos" al ingresar un número con letras', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/1a2b3c4d5e')
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' })
        expect(response.status).toBe(400)
    })
    test('Debería devolver el mensaje "El país/ciudad ingresado debe tener al menos 3 caracteres" al ingresar un país o ciudad con menos de 3 carácteres', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/AB')
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: 'El país/ciudad ingresado debe tener al menos 3 caracteres' })
    })
})
