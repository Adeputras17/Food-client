import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Ade',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Putra',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
    ],

    products: [
        {
            //_id: '1',
            name: 'Burger extra',
            slug: 'Burger-extra',
            category: 'Burger',
            image: '/images/bm1.jpg', // 679px × 829px
            price: 20000,
            countInStock: 10,
            brand: 'MC Donald',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality burger',
        },
        {
            //_id: '2',
            name: 'Burger medium',
            slug: 'Burger-medium',
            category: 'Burger',
            image: 'images/bm2.jpg', // 679px × 829px
            price: 15000,
            countInStock: 10,
            brand: 'MC Donald',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality burger',
        },
        {
            //_id: '3',
            name: 'Burger small',
            slug: 'Burger-small',
            category: 'Burger',
            image: '/images/bm3.jpg', // 679px × 829px
            price: 10000,
            countInStock: 0,
            brand: 'MC Donald',
            rating: 1,
            numReviews: 10,
            description: 'high quality burger',
        },
        {
            //_id: '4',
            name: 'Pizza extra',
            slug: 'Pizza-extra',
            category: 'Pizza',
            image: '/images/pm1.jpg', // 679px × 829px
            price: 100000,
            countInStock: 10,
            brand: 'KFC',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality pizza',
        },
        {
            // _id: '5',
            name: 'Pizza medium',
            slug: 'Pizza-medium',
            category: 'Pizza',
            image: '/images/pm2.jpg', // 679px × 829px
            price: 75000,
            countInStock: 10,
            brand: 'KFC',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality pizza',
        },
        {
            //_id: '6',
            name: 'Pizza small',
            slug: 'Pizza-small',
            category: 'Pizza',
            image: '/images/pm3.jpg', // 679px × 829px
            price: 50000,
            countInStock: 10,
            brand: 'KFC',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality pizza',
        }
    ]
}

export default data