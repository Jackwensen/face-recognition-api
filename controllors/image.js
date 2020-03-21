const handleImage = (req,res,db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .then(() => {
        db.select('entries').from('users').where({id})
        .then(entries => {
            res.json(entries[0].entries)
        })
    })
    .catch(err => res.status(400).json('could not get user entries'))
}

module.exports = {
    handleImage
}