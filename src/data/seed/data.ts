import { UserModel } from "../mongo/models/user.model";
import { CategoryModel } from "../mongo/models/category.model";
import { ProductModel } from "../mongo/models/product.model";
import { bcryptAdapter } from "../../config";

export const seedData = async () => {
    try {
        console.log('🌱 Iniciando seed de datos...');

        // Limpiar base de datos
        await Promise.all([
            UserModel.deleteMany({}),
            CategoryModel.deleteMany({}),
            ProductModel.deleteMany({})
        ]);

        console.log('🗑️  Base de datos limpiada');

        // 1. Crear usuarios
        const usersData = [
            {
                name: 'Admin User',
                email: 'admin@gmail.com',
                password: await bcryptAdapter.encrypt('123456'),
                emailVerified: true,
                role: ['admin'],
                img: 'https://randomuser.me/api/portraits/men/1.jpg'
            },
            {
                name: 'John Doe',
                email: 'john@gmail.com',
                password: await bcryptAdapter.encrypt('123456'),
                emailVerified: true,
                role: ['user'],
                img: 'https://randomuser.me/api/portraits/men/2.jpg'
            },
            {
                name: 'Jane Smith',
                email: 'jane@gmail.com',
                password: await bcryptAdapter.encrypt('123456'),
                emailVerified: true,
                role: ['user'],
                img: 'https://randomuser.me/api/portraits/women/1.jpg'
            },
            {
                name: 'Maria Rodriguez',
                email: 'maria@gmail.com',
                password: await bcryptAdapter.encrypt('123456'),
                emailVerified: false,
                role: ['user'],
                img: 'https://randomuser.me/api/portraits/women/2.jpg'
            }
        ];

        const users = await UserModel.insertMany(usersData);
        console.log(`👥 ${users.length} usuarios creados`);

        // 2. Crear categorías
        const categoriesData = [
            {
                name: 'Electronics',
                description: 'Electronic devices and gadgets',
                available: true,
                user: users[0]._id // Admin user
            },
            {
                name: 'Clothing',
                description: 'Fashion and apparel',
                available: true,
                user: users[0]._id
            },
            {
                name: 'Books',
                description: 'Books and literature',
                available: true,
                user: users[1]._id // John Doe
            },
            {
                name: 'Home & Garden',
                description: 'Home decor and gardening supplies',
                available: true,
                user: users[1]._id
            },
            {
                name: 'Sports',
                description: 'Sports equipment and accessories',
                available: false,
                user: users[2]._id // Jane Smith
            },
            {
                name: 'Toys',
                description: 'Toys and games for children',
                available: true,
                user: users[2]._id
            }
        ];

        const categories = await CategoryModel.insertMany(categoriesData);
        console.log(`📂 ${categories.length} categorías creadas`);

        // 3. Crear productos
        const productsData = [
            // Electronics
            {
                name: 'iPhone 15 Pro',
                description: 'Latest Apple smartphone with advanced features',
                price: 999.99,
                inStock: 25,
                category: categories[0]._id,
                user: users[0]._id,
                available: true
            },
            {
                name: 'Samsung Galaxy S24',
                description: 'Premium Android smartphone',
                price: 849.99,
                inStock: 30,
                category: categories[0]._id,
                user: users[1]._id,
                available: true
            },
            {
                name: 'MacBook Air M3',
                description: 'Lightweight laptop with M3 chip',
                price: 1299.99,
                inStock: 15,
                category: categories[0]._id,
                user: users[0]._id,
                available: true
            },
            {
                name: 'AirPods Pro',
                description: 'Wireless earbuds with noise cancellation',
                price: 249.99,
                inStock: 50,
                category: categories[0]._id,
                user: users[2]._id,
                available: true
            },

            // Clothing
            {
                name: 'Nike Air Force 1',
                description: 'Classic white sneakers',
                price: 90.00,
                inStock: 40,
                category: categories[1]._id,
                user: users[1]._id,
                available: true
            },
            {
                name: 'Levi\'s 501 Jeans',
                description: 'Original fit blue jeans',
                price: 89.50,
                inStock: 35,
                category: categories[1]._id,
                user: users[2]._id,
                available: true
            },
            {
                name: 'Adidas Hoodie',
                description: 'Comfortable cotton hoodie',
                price: 65.00,
                inStock: 20,
                category: categories[1]._id,
                user: users[0]._id,
                available: false
            },

            // Books
            {
                name: 'Clean Code',
                description: 'A Handbook of Agile Software Craftsmanship',
                price: 42.99,
                inStock: 12,
                category: categories[2]._id,
                user: users[1]._id,
                available: true
            },
            {
                name: 'JavaScript: The Good Parts',
                description: 'Essential JavaScript programming guide',
                price: 29.99,
                inStock: 18,
                category: categories[2]._id,
                user: users[2]._id,
                available: true
            },
            {
                name: 'Design Patterns',
                description: 'Elements of Reusable Object-Oriented Software',
                price: 54.95,
                inStock: 8,
                category: categories[2]._id,
                user: users[0]._id,
                available: true
            },

            // Home & Garden
            {
                name: 'Philips Air Fryer',
                description: 'Healthy cooking with little to no oil',
                price: 199.99,
                inStock: 22,
                category: categories[3]._id,
                user: users[1]._id,
                available: true
            },
            {
                name: 'Dyson V15 Vacuum',
                description: 'Cordless vacuum with laser detection',
                price: 449.99,
                inStock: 10,
                category: categories[3]._id,
                user: users[2]._id,
                available: true
            },

            // Toys
            {
                name: 'LEGO Creator Set',
                description: '3-in-1 building set for creative play',
                price: 79.99,
                inStock: 25,
                category: categories[5]._id,
                user: users[2]._id,
                available: true
            },
            {
                name: 'Nintendo Switch',
                description: 'Hybrid gaming console',
                price: 299.99,
                inStock: 15,
                category: categories[5]._id,
                user: users[0]._id,
                available: true
            },

            // Sports (categoría no disponible)
            {
                name: 'Nike Football',
                description: 'Official size football',
                price: 25.99,
                inStock: 0,
                category: categories[4]._id,
                user: users[2]._id,
                available: false
            }
        ];

        const products = await ProductModel.insertMany(productsData);
        console.log(`🛍️  ${products.length} productos creados`);

        console.log('✅ Seed completado exitosamente!');
        console.log('\n📊 Resumen:');
        console.log(`   • ${users.length} usuarios`);
        console.log(`   • ${categories.length} categorías`);
        console.log(`   • ${products.length} productos`);
        console.log('\n🔐 Usuarios de prueba:');
        console.log('   • admin@gmail.com / 123456 (Admin)');
        console.log('   • john@gmail.com / 123456 (User)');
        console.log('   • jane@gmail.com / 123456 (User)');
        console.log('   • maria@gmail.com / 123456 (User - Email no verificado)');

        return {
            users: users.length,
            categories: categories.length,
            products: products.length
        };

    } catch (error) {
        console.error('❌ Error en seed:', error);
        throw error;
    }
}