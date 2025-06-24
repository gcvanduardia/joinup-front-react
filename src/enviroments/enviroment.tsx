const production = {
    production: true,
    apiUrl: 'https://miplataforma-api.azurewebsites.net',
    apiKey: 'joinupadventureAuthKey'
}

const local = {
    production: false,
    apiUrl: 'http://localhost:3000',
    apiKey: 'joinupadventureAuthKey'
}

const use = production;

export const environment = {
    production: true,
    apiUrl: use.apiUrl,
    apiKey: use.apiKey,
};