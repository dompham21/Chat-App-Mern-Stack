const transMail = {
    subject: 'Chat app: Xác nhận kích hoạt tài khoản',
    template: (linkVerify)=>{
       return `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <style></style>
      </head>
      <body>
        <h2>Welcome to Chat app</h3>
        <h3>Bạn nhận được email này vì đã đăng ký tài khoản trên web Chat app</h3>
        <h4>Vui lòng click <a href="${linkVerify}">vào đây</a> để xác nhận tài khoản!</h4>
        <p>Nếu tin rằng email này là nhầm lẫn, hãy bỏ qua nó. Trân trọng!</p>
      </body>
    </html>`
    }
}

module.exports = transMail;