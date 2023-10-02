function inputCheck(req, res, next) {
    const { title, status, desc, } = req.body;

    // Check if all required fields are present
    if (!title || !status || !desc) {
        return res.status(400).json({ msg: "All required fields must be provided" });
    }

    next();
}

module.exports = { inputCheck };
