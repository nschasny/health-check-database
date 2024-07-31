const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: 60, max: 180 }; 

const data = {
    labels: ['Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024'],
    datasets: [
        {
            label: 'Systolic',
            data: [120, 118, 160, 110, 160, 155, 160, 180],
            fill: false,
            borderColor: 'rgba(255, 9, 107, 1)',
            backgroundColor: 'rgba(255, 9, 107, 1)',
            tension: 0.4,
            pointRadius: 9
        },
        {
            label: 'Diastolic',
            data: [110, 65, 85, 75, 70, 65, 78],
            fill: false,
            borderColor: 'rgba(107, 107, 255,1)',
            backgroundColor: 'rgba(107, 107, 255,1)',
            tension: 0.4,
            pointRadius: 9
        }
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right', 
                labels: {
                    usePointStyle: true, 
                    pointStyle: 'circle'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 60 
            }
        }
    }
};

const ctx = document.getElementById('bloodPressureChart').getContext('2d');
const bloodPressureChart = new Chart(ctx, config);


const actions = [
    {
        name: 'Update Data',
        handler: (chart) => {
            chart.data.datasets[0].data = [130, 120, 170, 115, 165, 160, 170, 190]; 
            chart.update();
        }
    },
    {
        name: 'Change Colors',
        handler: (chart) => {
            chart.data.datasets[0].borderColor = 'rgba(0, 255, 0, 1)'; 
            chart.data.datasets[1].borderColor = 'rgba(0, 0, 255, 1)'; 
            chart.update();
        }
    }
];


const actionsContainer = document.getElementById('actionsContainer');
actions.forEach(action => {
    const button = document.createElement('button');
    button.innerText = action.name;
    button.onclick = () => action.handler(bloodPressureChart);
    actionsContainer.appendChild(button);
});


    
    const apiUrl = 'https://api.coalitiontechnologies.com/patient-data';

    
    async function fetchPatientData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            const patient = data[0];

            
            document.getElementById('profile-picture').src = patient.profile_picture;
            document.getElementById('patient-name').textContent = patient.name;
            document.getElementById('date-of-birth').textContent = new Date(patient.date_of_birth).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
            document.getElementById('gender').textContent = patient.gender;
            document.getElementById('phone-number').textContent = patient.phone_number;
            document.getElementById('emergency-contact').textContent = patient.emergency_contact;
            document.getElementById('insurance-type').textContent = patient.insurance_type;

        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    }
    
    document.addEventListener('DOMContentLoaded', fetchPatientData);
