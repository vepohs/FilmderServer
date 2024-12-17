import cron from 'node-cron';
import {createUserService} from "../../factories/ClassFactory";
import nodemailer from 'nodemailer';

const userService = createUserService();

const minutes = 10;
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function checkInactiveUsers() {

    const inactiveUsers = await userService.getAllInactiveUser(minutes);

    console.log(`Utilisateurs inactifs depuis ${minutes} minutes :`, inactiveUsers);


    for (const user of inactiveUsers) {
        if (user.email) {
            await sendInactivityEmail(user.email, user.firstName);
        }
    }
}

async function sendInactivityEmail(email: string, firstName: string) {
    console.log(process.env.EMAIL_USER);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Nous avons remarqué votre absence !",
        text: `Bonjour ${firstName},\n\nNous avons remarqué que vous n'avez pas utilisé notre service depuis un certain temps. Nous serions ravis de vous revoir !`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email envoyé avec succès à : ${email}`);
    } catch (error) {
        console.error(`Erreur lors de l'envoi de l'email à ${email} :`, error);
    }
}

cron.schedule('*/10 * * * *', async () => {
    console.log('Vérification des utilisateurs inactifs...');
    await checkInactiveUsers();
});
