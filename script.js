import { fetchApi } from "./fetch.js";

let citys = []
let temperatures = []



async function renderData() {

    const weathers = await fetchApi('https://api.gael.cloud/general/public/clima/')

    citys = weathers.map(weather => weather.Estacion)
    temperatures = weathers.map(weather => weather.Temp)
    
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: citys,
            datasets: [{
                label: 'Temperatura de las Cuidades de Chile Hoy',
                data: temperatures,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
renderData()