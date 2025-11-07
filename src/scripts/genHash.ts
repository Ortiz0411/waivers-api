import bcrypt from 'bcrypt'

const password = process.argv[2]
if (!password) {
  console.error('Uso: ts-node scripts/make-hash.ts <password>')
  process.exit(1)
}
bcrypt.hash(password, 12).then(h => {
  console.log(h)
})