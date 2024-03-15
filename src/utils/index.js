export function formatPrice(price) {
    if (typeof price !== 'number') {
        return 'Harga tidak valid'
    }

    return price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    })
}
