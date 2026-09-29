const express = require('express')
const auth = require('../../../lib/auth')
const { friendlyFirebaseError } = require('../../../lib/errors')

const router = express.Router()

router.post('/', async (req, res) => {
  const { gmail } = req.body
  if (!gmail || !gmail.includes('@') || !gmail.includes('.')) {
    return res.status(400).json({ success: false, message: 'email gak valid.' })
  }
  const em = gmail.trim().toLowerCase()
  const r = await auth.link(em)
  if (!r.ok) {
    return res.status(400).json({ success: false, message: friendlyFirebaseError(r.why), code: r.why })
  }
  return res.json({ success: true, email: em, message: `link dikirim ke ${em}. cek inbox / spam.` })
})

module.exports = router
