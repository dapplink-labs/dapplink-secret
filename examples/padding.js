// Padding Length Workbook
// Help understand questions about padding raised in https://github.com/grempe/secrets.js/issues/7

var secrets = require("../secrets.js")

let z, a, b, sz, sa, sb, padLength

z = secrets.random(64) // 64 bits == 8 bytes == 16 hex
a = secrets.random(256) // 256 bits == 32 bytes == 64 hex
b = secrets.random(512) // 512 bits == 64 bytes == 128 hex

console.log("secret z.length", z.length) // 16 hex == 8 bytes == 64 bits
console.log("secret a.length", a.length) // 64 hex == 32 bytes == 256 bits
console.log("secret b.length", b.length) // 128 hex == 64 bytes == 512 bits

console.log("")

// NOTE : Passing null, 0, or 128 as the padding multiple arg are equivalent

console.log("null padding")
sz = secrets.share(z, 10, 5)
sa = secrets.share(a, 10, 5)
sb = secrets.share(b, 10, 5)
console.log(secrets.extractShareComponents(sz[0]).data.length) // 32 hex == 16 bytes == 128 bits (1x multiple of 128 bits pad) : 64 bits larger than original bit length
console.log(secrets.extractShareComponents(sa[0]).data.length) // 96 hex == 48 bytes == 384 bits (3x multiple of 128 bits pad) : 128 bits larger than original bit length
console.log(secrets.extractShareComponents(sb[0]).data.length) // 160 hex == 80 bytes == 640 bits (5x multiple of 128 bits pad) : 128 bits larger than original bit length

console.log("")

console.log("0 padding")
padLength = 0
sz = secrets.share(z, 10, 5, padLength)
sa = secrets.share(a, 10, 5, padLength)
sb = secrets.share(b, 10, 5, padLength)
console.log(secrets.extractShareComponents(sz[0]).data.length) // 32 hex == 16 bytes == 128 bits (1x multiple of 128 bits pad) : 64 bits larger than original bit length
console.log(secrets.extractShareComponents(sa[0]).data.length) // 96 hex == 48 bytes == 384 bits (3x multiple of 128 bits pad) : 128 bits larger than original bit length
console.log(secrets.extractShareComponents(sb[0]).data.length) // 160 hex == 80 bytes == 640 bits (5x multiple of 128 bits pad) : 128 bits larger than original bit length

console.log("")

console.log("128 padding")
padLength = 128
sz = secrets.share(z, 10, 5, padLength)
sa = secrets.share(a, 10, 5, padLength)
sb = secrets.share(b, 10, 5, padLength)
console.log(secrets.extractShareComponents(sz[0]).data.length) // 32 hex == 16 bytes == 128 bits (1x multiple of 128 bits pad) : 64 bits larger than original bit length
console.log(secrets.extractShareComponents(sa[0]).data.length) // 96 hex == 48 bytes == 384 bits (3x multiple of 128 bits pad) : 128 bits larger than original bit length
console.log(secrets.extractShareComponents(sb[0]).data.length) // 160 hex == 80 bytes == 640 bits (5x multiple of 128 bits pad) : 128 bits larger than original bit length

console.log("")

console.log("256 padding")
padLength = 256
sz = secrets.share(z, 10, 5, padLength)
sa = secrets.share(a, 10, 5, padLength)
sb = secrets.share(b, 10, 5, padLength)
console.log(secrets.extractShareComponents(sz[0]).data.length) // 64 hex == 32 bytes == 256 bits (1x multiple of 256 bits pad) : 192 bits (3x) larger than original bit length
console.log(secrets.extractShareComponents(sa[0]).data.length) // 128 hex == 64 bytes == 512 bits (2x multiple of 256 bits pad) : 256 bits (2x) larger than original bit length
console.log(secrets.extractShareComponents(sb[0]).data.length) // 192 hex == 96 bytes == 768 bits (3x multiple of 256 bits pad) : 256 bits (0.5x) larger than original bit length

console.log("")

console.log("1024 padding")
padLength = 1024
sz = secrets.share(z, 10, 5, padLength)
sa = secrets.share(a, 10, 5, padLength)
sb = secrets.share(b, 10, 5, padLength)
console.log(secrets.extractShareComponents(sz[0]).data.length) // 256 hex == 128 bytes == 1024 bits : 960 bits (15x) larger than original bit length
console.log(secrets.extractShareComponents(sa[0]).data.length) // 256 hex == 128 bytes == 1024 bits : 768 bits (3x) larger than original bit length
console.log(secrets.extractShareComponents(sb[0]).data.length) // 256 hex == 128 bytes == 1024 bits : 512 bits (2x) larger than original bit length
