import { fetchApi } from "./fetch.js";

let citys = []
let temperatures = []

const rgbaBlueColor = 'rgba(0, 0, 255, 0.8)'
const rgbaRedColor = 'rgba(255, 99, 132, 0.8)'
const rgbRedColor = 'rgba(255, 99, 132)'
const rgbOrangeColor = 'rgba(255, 159, 64)'

async function renderData() {

    const weathers = await fetchApi('https://api.gael.cloud/general/public/clima/')

    citys = weathers.map(weather => weather.Estacion)
    temperatures = weathers.map(weather => weather.Temp)

    const backgroundColors = temperatures.map(temperature => temperature < 0 ? rgbaBlueColor : rgbaRedColor) 
    
    const borderColors = temperatures.map(temperature => temperature > 0 ? rgbRedColor : rgbOrangeColor)

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: citys,
            datasets: [{
                label: 'Temperatura de Hoy',
                data: temperatures,
                borderWidth: 1,
                backgroundColor: backgroundColors,
                borderColor: borderColors
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';

                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += + context.parsed.y
                    }
                    return label;
                }
            }
        }
    });
}
renderData()