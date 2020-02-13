const express = require('express')
const router = express.Router()
const multer = require('multer')
const { ensureLoggedIn } = require('connect-ensure-login')
const Ticket = require('../models/Ticket')
const Comment = require('../models/Comment')
const upload = multer({ dest: './public/uploads' })

// GET TICKET LIST
router.get('/list', (req, res) => {
  Ticket.find({})
    .populate('creatorId')
    .exec()
    .then((data) => {
      const tickets = data.map((ticket) => {
        const image = `${process.env.API_UPLOADS}${ticket.image}`
        const newTicket = Object.assign(ticket, { image })

        return newTicket
      })
      console.log('TICKETS LIST: ', tickets)
      res.json(tickets)
    })
    .catch(err => console.log(err))
})

//  Show template form adding
router.get('/new', (req, res, next) => {
  // res.status(200).send('ticket/new')
})

const storagePhoto = multer.diskStorage({
  destination (req, file, callback) {
    callback(null, './public/uploads')
  },
  filename (req, file, callback) {
    const image = req.body.imageUrl
    const imageUrl = image.split(`blob:${process.env.APP_WEB}`)
    callback(null, imageUrl[1])
  }
})

const uploadPhoto = multer({ storage: storagePhoto }).single('photo')

router.post('/new', (req, res) => {
  uploadPhoto(req, res, (err) => {
    if (err) {
      return res.end('Error uploading file!')
    }

    let image
    let imageUrl = req.body.imageUrl || ''
    const { title, content, tags } = req.body

    if (req.file && imageUrl) {
      image = req.file
      imageUrl = req.body.imageUrl.replace(`blob:${process.env.APP_WEB}`, '')
    } else {
      image = { filename: 'nofile' }
      imageUrl = ''
    }

    const ticket = new Ticket({
      title,
      content,
      tags,
      image,
      imageUrl,
      creatorId: '5e26f691358276336845a086' // IMPORTANT USER ID LOGGED IN
    })

    console.log('TICKET:::::::', ticket)

    ticket.save((err, ticket) => {
      if (err) {
        console.log('errorrrrr', err)
        const { statusCode } = err
        if (statusCode >= 100 && statusCode < 600) { res.status(statusCode) } else { res.status(500) }
      }
      res.redirect('/')
    })
  })
})

// Detail TICKET VIEW ->  IT IS NOT NECESSARY LOGIN TO VISIT THE VIEW
router.get('/:id', (req, res, next) => {
  Ticket.findById(req.params.id).populate('creatorId').exec()
    .then((ticket) => {
      // res.render('ticket/detail', {
      //   ticket: ticket
      // });
      // if(ticket) return ticket;

      // NEW
      console.log('get ticket--->', ticket)

      if (!ticket) {
        res.json('No ticket found')
      }

      if (ticket.image.filename !== 'nofile') {
        const imageUrl = `${process.env.API_UPLOADS}${ticket.imageUrl}`
        const newTicket = Object.assign(ticket, { imageUrl })
        res.json(newTicket)
      } else {
        res.json(ticket)
      }
    })
    .catch(err => console.log(err))
})

// EDIT ticket - goes to the EDIT view
router.get('/:id/edit', ensureLoggedIn('auth/login'), (req, res, next) => {
  Ticket.findById(req.params.id, (err, ticket) => {
    if (err) {
      return next(err)
    } else {
      res.json({ ticket })
    }
  })
})

// UPDATE TICKET
router.post('/:id', upload.single('editPhoto'), ensureLoggedIn('auth/login'), (req, res, next) => {
  let image
  if (req.file) { image = req.file.filename } else { image = 'nofile' }

  const updates = {
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    image
  }

  Ticket.findByIdAndUpdate(req.params.id, updates, (err, ticket) => {
    if (err) {
      res.status(400).json({ ticket, errors: ticket.errors })
    }
    res.redirect(`/ticket/${ticket._id}`)
  })
})

router.get('/:id/delete', ensureLoggedIn('auth/login'), function (req, res, next) {
  const id = req.params.id
  Ticket.findByIdAndRemove(id, (err, obj) => {
    if (err) { return next(err) }
    res.redirect('/')
  })
})

// READ comments of the ticket
router.get('/comment/:id', (req, res, next) => {
  const id = req.params.id
  Comment.find({ ticket_rel: id })
    .populate('creatorCommentId')
    .exec()
    .then((comments) => {
      const comms = comments.map((comment) => {
        if (comment.image !== 'nofile') {
          const image = `${process.env.API}/uploads/${comment.image}`
          const newComment = Object.assign(comment, { image })
          return newComment
        }

        return comment
      })

      res.json(comms)
    })
    .catch(err => console.log(err))
})

// REMOVE WHEN ADD QUILL EDITOR IMAGE
const storage = multer.diskStorage({
  destination (req, file, callback) {
    callback(null, './public/uploads')
  },
  filename (req, file, callback) {
    console.log(file)
    callback(null, file.fieldname + '-' + Date.now())
  }
})

const uploadPhotoComment = multer({ storage }).single('photoComment')

router.post('/comment/:id', (req, res) => {
  uploadPhotoComment(req, res, (err) => {
    console.log(req.file, 'req----------', req.body)

    if (err) {
      return res.end('Error uploading file!')
    }

    let image
    if (req.file) { image = req.file.filename } else { image = 'nofile' }

    console.log(image)

    const comment = new Comment({
      content: req.body.content,
      image,
      ticket_rel: req.params.id,
      creatorCommentId: '5e26f691358276336845a086', // req.user._id,
      solved: false,
      votes: []
    })

    console.log('NEW COMMENT', comment)

    comment.save((err, obj) => {
      // res.redirect(`/ticket/${obj.ticket_rel}`);
      if (obj) { return res.json(obj) } else if (err) { return res.json(err) }
    })
  })
})

module.exports = router
