import { status } from 'koa/lib/response'
import citiesRepository from '../repository/worldCitiesRespository'

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository();
    if (ctx.params.country.length < 3 || ctx.params.city.length < 3) {
        ctx.status = 400;
        ctx.body = { "message": "El país/ciudad ingresado debe tener al menos 3 caracteres" };
    } else {
        ctx.status = 200;
    }
    return ctx;
}

exports.getCitiesByCountryUseCase = (ctx) => {
    ctx.body = citiesRepository.searchCitiesByCountryName(ctx.params.country);
    var regex = /^[A-Za-z]+$/;

    if (!regex.test(ctx.params.country)){
        if(Number.isInteger(parseInt(ctx.params.country))){
        ctx.status = 400;
        ctx.body = { "message": "Solo se aceptan caracteres no numéricos" };
        return ctx;
        }
    } else if (ctx.params.country.length < 3) {
        ctx.status = 400;
        ctx.body = { "message": "El país/ciudad ingresado debe tener al menos 3 caracteres" };
        return ctx;
    } else if (ctx.body.length === 0) {
        ctx.status = 200;
        ctx.body = { "message": "No se encontraron ciudades para el país ingresado" };
        return ctx;
    } else {
        ctx.status = 200;
    }
    return ctx;
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    ctx.body = citiesRepository.searchCityByCityNameAndCountry(ctx.params.city, ctx.params.country);
    if (ctx.params.country.length < 3 || ctx.params.city.length < 3) {
        ctx.status = 400;
        ctx.body = { "message": "El país/ciudad ingresado debe tener al menos 3 caracteres" };
    } else {
        ctx.status = 200;
    }
    return ctx;
}