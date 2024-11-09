const userSchema = require("../models/User");
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { email, password } = req.body;
    userSchema.findOne({ email, password })
        .then((data) => {
            if (data) {
                const token = jwt.sign({ email, password }, process.env.SECRET_KEY);
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        }
    );
}

exports.createUser = (req, res) => {
    const user = userSchema(req.body);
    user.save()
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((error) => {
            res.status(400).json(error);
        }
    );
}

exports.getAllUsers = (req, res) => {
    userSchema.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        }
    );
}

exports.getUserById = (req, res) => {
    const { id } = req.params;
    userSchema.findById(id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(404).json(error);
        }
    );
}

exports.updateUserById = (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    userSchema.updatedOne({ _id: id}, {$set: { name, email, age }})
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(404).json(error);
        }
    );
}

exports.deleteUserById = (req, res) => {
    const { id } = req.params;
    userSchema.deleteOne({ _id: id })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(404).json(error);
        }
    );
}