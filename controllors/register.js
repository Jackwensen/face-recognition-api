const handleRegister = (req,res,db,bcrypt) => {
    const { name, email, password} = req.body;
    const hash = bcrypt.hashSync(password);
    db('users')
      .insert({
        name: name,
        hash: hash,
        email: email,
        joined: new Date()
    })
      .then(user => {
        db.select('*').from('users')
            .where('id' , user)
            .then(response => {
                res.json(response[0])
            })
            // .where('id' , user)
            // .then(response => res.json(response[user]))
    })
      .catch(err => res.status(400).json('email already exists'))
}

module.exports = {
    handleRegister
}