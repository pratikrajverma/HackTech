exports.passwordUpdated = (email, name) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }

            #logo{
				text-align: center;
				font-size: 30px;
				font-family: Arial, Helvetica, sans-serif;
				color: rgb(255, 255, 255);
				font-weight: bold;
				border: 1px solid rgb(164, 164, 164);
				width: fit-content;
				margin: auto;
				padding: 10px 25px 10px 25px;
				background-color: #000000;
				border-radius: 10px;
			}
        </style>
    
    </head>
    
    <body>
        <div class="container">
             <p id="logo">HackTech</p>  
            <div class="message">Password Update Confirmation</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>Your password has been successfully updated for the email <span class="highlight">${email}</span>.
                </p>
                <p>If you did not request this password change, please contact us immediately to secure your account.</p>
            </div>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                at
                <a href="hacktech.startup@gmail.com">	hacktech.startup@gmail.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};