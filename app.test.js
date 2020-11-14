const app = require('./app');

test('Give Invalid Lat and Long', () => {
    app.latitude = 100;
    app.longitude = 190;    
    app.getWeather();

  expect(app.response).toBe("Something went wrong");
});


test('Give valid Lat and invalid Long', () => {
    app.latitude = 30;
    app.longitude = 190;    
    app.getWeather();

  expect(app.response).toBe("Something went wrong");
});