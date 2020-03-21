const handleSignin = (req,res, db, bcrypt) => {
    const {email, password} = req.body;
    db.select('email', 'hash').from('users')
        .where('email',email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to login1'))
            } else {
                res.status(400).json('wrong password')
            }
        })
        .catch(err => res.status(400).json('wrong email'))
}

module.exports = {
    handleSignin
}