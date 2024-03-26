// no momento mockada para testes
// api.js

export function getProductData(id) {
    switch (id) {
        case "0":
            return {
                id: "0",
                title: "Vans Shoes",
                image: "https://socalskateshop.com/mm5/graphics/00000001/39/Santa-Cruz-stone-ls-flannel-shirt-blackbrown-1_280x280.jpg",
                price: 79.99,
                quantity: 1
            };
        case "1":
            return {
                id: "1",
                title: "Black frog",
                image: "https://socalskateshop.com/mm5/graphics/00000001/38/Dickies-Vincent-Alvarez-Block-Collar-Short-Sleeve-Work-Shirt-Gulf-Blue-1_280x280.jpg",
                price: 19.99,
                quantity: 1
            };
        case "2":
            return {
                id: "2",
                title: "Tylers Shape",
                image: "https://socalskateshop.com/mm5/graphics/00000001/36/Alien-Workshop-Skateboards-Visitor-Window-Button-Down-Shirt-Perriwinkle-White-1_280x280.jpg",
                price: 69.99,
                quantity: 1
            };
        default:
            return {
                id: "3",
                title: "Hat Khaki",
                image: "https://socalskateshop.com/mm5/graphics/00000001/40/Black-Label-Skateboards-5-Flame-5-Panel-Snapback-Hat-Khaki-1_280x280.jpg",
                price: 29.95,
                quantity: 1
            };
    }
}
