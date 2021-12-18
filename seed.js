const mongoose = require('mongoose');
const Food = require('./models/food');
const foods = [{
        name: 'Burger',
        price: 60.00,
        desc: 'American Burger loaded with extra cheese.',
        image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/abstract-1238247__340.jpg'

    },
    {
        name: 'Panner Tikka',
        price: 250.00,
        desc: 'Smooth and Delicious Paneer grilled to Perfection',
        image: 'https://thumbs.dreamstime.com/b/tandoori-paneer-tikka-marinated-cheese-cubes-spices-yogurt-indian-dish-188315528.jpg'
    },
    {
        name: 'Pizza',
        price: 450.00,
        desc: 'Smooth and Delicious Mexican Style Pizza',
        image: 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395__480.jpg'
    },
    {
        name: 'Pasta',
        price: 150.00,
        desc: 'Smooth and extra-creamy Pasta seasoned with french spices',
        image: 'https://media.gettyimages.com/photos/bolognese-pens-picture-id155433174?k=20&m=155433174&s=612x612&w=0&h=bqioG8Y22UHA5GzBv9h39dsIFANkdWHWEE01KRjJhrk='
    },
    {
        name: 'Noodles',
        price: 125.00,
        desc: 'Soupy and Extra Spicy chineese noodles',
        image: 'https://media.istockphoto.com/photos/lanzhou-stretched-noodles-picture-id1293674026?b=1&k=20&m=1293674026&s=170667a&w=0&h=SCRwBJLQjDj3qwq25Bk0pb2COJSoZmctjAyhkKp9SJk='
    },
    {
        name: 'Coke',
        price: 40.00,
        desc: ' sweet, carbonated cola with little mouthfeel or aftertaste.',
        image: 'https://images.pexels.com/photos/2668306/pexels-photo-2668306.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
        name: 'French Fries',
        price: 80.00,
        desc: 'Peri Peri French Fries with mexican spices',
        image: 'https://media.gettyimages.com/photos/closeup-of-fries-in-plate-on-table-picture-id1216372806?k=20&m=1216372806&s=612x612&w=0&h=cCF53eys7eSLjgmeoy51UBJzfWiC3UDB-M4J2iZEAgw='
    },



];

const seedDb = async () => {

    await Food.deleteMany({});
    await Food.insertMany(foods);
    console.log('Database seeded');
}

module.exports = seedDb;