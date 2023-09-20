"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = [
    {
        name: "Camiseta 'Distorsión'",
        description: "Camiseta de algodón con estampado abstracto y colores contrastantes.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 29.99,
        categoria: "Remeras"
    },
    {
        name: "Pantalones 'Caos'",
        description: "Pantalones de mezclilla con cortes asimétricos y detalles desgarrados.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 59.99,
        categoria: "Pantalones"
    },
    {
        name: "Chaqueta 'Estructura'",
        description: "Chaqueta de cuero con formas geométricas y cierres metálicos.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 89.99,
        categoria: "Camperas"
    },
    {
        name: "Vestido 'Abstracción'",
        description: "Vestido corto con estampado abstracto y silueta asimétrica.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 49.99,
        categoria: "Vestidos"
    },
    {
        name: "Gorra 'Vanguardia'",
        description: "Gorra de estilo vanguardista con formas angulares y colores llamativos.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 24.99,
        categoria: "Gorras"
    },
    {
        name: "Blusa 'Asimetría'",
        description: "Blusa de manga larga con diseño asimétrico y detalles desgarrados.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 39.99,
        categoria: "Remeras"
    },
    {
        name: "Falda 'Distorsión'",
        description: "Falda corta con estampado abstracto y cintura elástica.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 34.99,
        categoria: "Vestidos"
    },
    {
        name: "Sudadera 'Caos'",
        description: "Sudadera de algodón con capucha y estampado caótico.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 44.99,
        categoria: "Camperas"
    },
    {
        name: "Pantalones cortos 'Estructura'",
        description: "Pantalones cortos de tela resistente con detalles estructurados.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 29.99,
        categoria: "Pantalones"
    },
    {
        name: "Vestido 'Rebelión'",
        description: "Vestido largo con estampado rebelde y silueta ajustada.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 54.99,
        categoria: "Vestidos"
    },
    {
        name: "Chamarra 'Anarquía'",
        description: "Chamarra de cuero con detalles anarquistas y tachuelas.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 79.99,
        categoria: "Camperas"
    },
    {
        name: "Camisa 'Caótica'",
        description: "Camisa de manga larga con estampado caótico y cuello desestructurado.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 49.99,
        categoria: "Camisas"
    },
    {
        name: "Jeans 'Distorsionados'",
        description: "Jeans desgarrados con efecto de distorsión y parches personalizados.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 69.99,
        categoria: "Pantalones"
    },
    {
        name: "Vestido 'Ecléctico'",
        description: "Vestido de estilo ecléctico con combinación de texturas y detalles metálicos.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 59.99,
        categoria: "Vestidos"
    },
    {
        name: "Gorra 'Rebelde'",
        description: "Gorra con visera desgastada y bordado de símbolos rebeldes.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 24.99,
        categoria: "Gorras"
    },
    {
        name: "Sudadera 'Anarquía'",
        description: "Sudadera con capucha y estampado de símbolos anarquistas.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 39.99,
        categoria: "Camperas"
    },
    {
        name: "Pantalones 'Distorsión'",
        description: "Pantalones de estilo desgarrado y efecto de distorsión.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 49.99,
        categoria: "Pantalones"
    },
    {
        name: "Chaqueta 'Caos'",
        description: "Chaqueta con diseño caótico y detalles desestructurados.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 79.99,
        categoria: "Camperas"
    },
    {
        name: "Vestido 'Rebelde'",
        description: "Vestido con estampado rebelde y silueta vanguardista.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 59.99,
        categoria: "Vestidos"
    },
    {
        name: "Gorra 'Vanguardia'",
        description: "Gorra con diseño vanguardista y colores llamativos.",
        image: "https://i.pinimg.com/564x/9a/39/56/9a3956d44ac04a059bf4d16b70a2db2c.jpg",
        price: 24.99,
        categoria: "Gorras"
    }
];
exports.default = data;
