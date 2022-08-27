import bcrypt from 'bcryptjs'

const data ={

    users:[

        {
            name: 'Devop',
            email: 'administrator@example.com',
            password: bcrypt.hashSync('administrator'),
            isAdmin: true
        },
        {
            name: 'user',
            email: 'usertwo@example.com',
            password: bcrypt.hashSync('administrator'),
            isAdmin: false,
        }

    ],

    products: [
        {
            //_id:'1',
            name: 'stylish spring',
            slug: 'stylish-spring',
            category: 'bouquet',
            image:'/images/p1.jpg', //679px X 829px
            price: 120,
            countInStock: 10,
            rating: 4.5,
            Reviews: 10,
            description: 'best quality'
        },
        {
            //_id:'2',
            name: 'Mellow Yellow',
            slug: 'Mellow-yellow',
            category: 'bouquet',
            image:'/images/p1.jpg',
            price: 120,
            countInStock: 10,
            rating: 4.5,
            Reviews: 10,
            description: 'best quality',
        },
        {
            //_id:'3',
            name: 'Red Rose',
            slug: 'Red-rose',
            category: 'bouquet',
            image:'/images/p1.jpg',
            price: 120,
            countInStock: 10,
            rating: 4.5,
            Reviews: 10,
            description: 'best quality'
        },
        {
            //_id:'4',
            name: 'My Beautiful Pastel',
            slug: 'My Beautiful Pastel',
            category: 'box',
            image:'/images/p1.jpg',
            price: 120,
            countInStock: 10,
            rating: 4.5,
            Reviews: 10,
            description: 'best quality'
        },
        {
            //_id:'5',
            name: 'Mellow Box',
            slug: 'Mellow-Box',
            category: 'box',
            image:'/images/p1.jpg',
            price: 120,
            countInStock: 10,
            rating: 4.5,
            Reviews: 10,
            description: 'best quality'
        },
        {
            //_id:'6',
            name: 'Glory box',
            slug: 'Glory-box',
            category: 'box',
            image:'/images/p1.jpg',
            price: 120,
            countInStock: 10,
            rating: 4.5,
            Reviews: 10,
            description: 'best quality'
        },
    ],
}
export default data