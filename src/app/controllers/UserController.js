import passwordGenerator from 'password-generator';
// import Mail from '../lib/Mail';
import Queue from '../lib/Queue';

export default {
    async store(req, res) {
        const { name, email } = req.body;

        const user = {
            name,
            email,
            password: passwordGenerator(15, false)
        };

        // await Mail.sendMail({
        //     from: 'Edu <contato@edu.com>',
        //     to: `${name} <${email}>`,
        //     subject: 'Cadastro de usuário',
        //     html: `Olá, ${name}, bem-vindo aqui!`
        // })

        await Queue.add('RegistrationMail', { user })

        return res.json(user);
    }
}