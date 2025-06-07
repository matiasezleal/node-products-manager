# Seed Data

Este módulo permite poblar la base de datos con datos de prueba.

## 🚀 Uso

### Opción 1: Terminal (Script)
```bash
npm run seed
```

### Opción 2: API Endpoint
```bash
POST http://localhost:3000/api/seed
```

## 📊 Datos que se crean

### Usuarios (4)
- **admin@gmail.com** / 123456 (Admin)
- **john@gmail.com** / 123456 (User)  
- **jane@gmail.com** / 123456 (User)
- **maria@gmail.com** / 123456 (User - Email no verificado)

### Categorías (6)
- Electronics
- Clothing  
- Books
- Home & Garden
- Sports (no disponible)
- Toys

### Productos (15)
- iPhone 15 Pro, Samsung Galaxy S24, MacBook Air M3, AirPods Pro
- Nike Air Force 1, Levi's 501 Jeans, Adidas Hoodie
- Clean Code, JavaScript: The Good Parts, Design Patterns
- Philips Air Fryer, Dyson V15 Vacuum
- LEGO Creator Set, Nintendo Switch
- Nike Football (sin stock)

## ⚠️ Importante

- **Elimina todos los datos existentes** antes de crear los nuevos
- Las contraseñas están hasheadas con bcrypt
- Se crean relaciones válidas entre usuarios, categorías y productos 