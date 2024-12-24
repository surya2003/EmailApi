const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'surya@gkdtechsolutions.com',
        pass: 'your-app-password'
    }
});

app.post('/sendEmail', async (req, res) => {
    const { name, email, message, type } = req.body;
    
    const mailOptions = {
        from: 'surya@gkdtechsolutions.com',
        to: 'surya@gkdtechsolutions.com',
        subject: type === 'contact' ? 
            `New Contact Form Submission from ${name}` : 
            `New Build/Repair Service Request from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
