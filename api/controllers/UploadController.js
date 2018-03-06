const upload = async function (req, res) {
    console.log('files: ', req.files);
    // res.send(req.files);
    // res.json({'test': 'test'})
    return ReS(res, {
        message: 'Successfully uploaded files.',
        body: req.files
    }, 201);
    
    // res.setHeader('Content-Type', 'application/json');
    // const body = req.body;

    // let err, content;

    // console.log('body: ', JSON.stringify(body));
    // [err, content] = await to(authService.createContent(body));

    // if (err) return ReE(res, err, 422);

    // console.log('content.json: ', content);
    // content = JSON.stringify(content);
    // console.log('content.string: ', content);
    // return ReS(res, {
    //     message: 'Successfully created new content data.',
    //     body: content,
    // }, 201);
}
module.exports.upload = upload;