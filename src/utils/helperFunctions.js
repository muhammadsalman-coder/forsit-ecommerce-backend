exports.generateRandomString = () => {
  // Generate three random uppercase letters
  const letters = Array.from({ length: 4 }, () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  ).join("")
  // Generate three random digits
  const digits = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 10)
  ).join("")
  const randomString = `${letters}-${digits}`
  return randomString
}
