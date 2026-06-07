function registerEmailTemplate(name) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body{
                font-family: Arial, sans-serif;
                background-color:#f4f4f4;
                padding:20px;
            }

            .container{
                max-width:600px;
                margin:auto;
                background:white;
                border-radius:10px;
                overflow:hidden;
                box-shadow:0 2px 10px rgba(0,0,0,0.1);
            }

            .header{
                background:#2563eb;
                color:white;
                text-align:center;
                padding:20px;
            }

            .content{
                padding:30px;
            }

            .footer{
                text-align:center;
                padding:15px;
                color:#666;
                font-size:12px;
                background:#f8f8f8;
            }

            .button{
                display:inline-block;
                background:#2563eb;
                color:white;
                padding:12px 24px;
                text-decoration:none;
                border-radius:5px;
            }
        </style>
    </head>

    <body>
        <div class="container">

            <div class="header">
                <h1>YYY Banking Services</h1>
            </div>

            <div class="content">
                <h2>Welcome ${name} 👋</h2>

                <p>
                    Thank you for registering with YYY Banking Services.
                </p>

                <p>
                    Your account has been created successfully.
                </p>

                <p>
                    We are excited to have you with us.
                </p>

                <br>

                <a href="#" class="button">
                    Visit Dashboard
                </a>

                <br><br>

                <p>
                    If you have any questions, feel free to contact our support team.
                </p>

                <p>
                    Regards,<br>
                    YYY Banking Services Team
                </p>
            </div>

            <div class="footer">
                © 2026 YYY Banking Services. All Rights Reserved.
            </div>

        </div>
    </body>
    </html>
    `;
}

module.exports = registerEmailTemplate;